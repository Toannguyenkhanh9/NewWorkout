// FILE: src/notifications/reminder.ts
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
  AndroidVisibility,
  AuthorizationStatus,
} from '@notifee/react-native';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHANNEL_ID = 'workout';
const DAILY_REMINDER_ID = 'daily-workout-reminder';
const INACTIVE_REMINDER_ID = 'inactive-workout-reminder';
const LAST_WORKOUT_KEY = 'workout:lastAt';

export const DAILY_REMINDER_SETTINGS_KEY = 'workout:dailyReminderSettings';

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export type DailyReminderSettings = {
  enabled: boolean;
  hour: number;
  minute: number;
};

export type ReminderText = {
  title: string;
  body: string;
};

const DEFAULT_DAILY_REMINDER: DailyReminderSettings = {
  enabled: false,
  hour: 20,
  minute: 0,
};

const DEFAULT_DAILY_TEXT: ReminderText = {
  title: "It's practice time! 💪",
  body: "Open Insanity Deluxe Edition and complete today's session.",
};

const DEFAULT_INACTIVE_TEXT: ReminderText = {
  title: 'We miss you 💪',
  body: "You haven't worked out for 3 days. Open Insanity Deluxe Edition and continue your training.",
};

const clampHour = (value: number) => {
  if (!Number.isFinite(value)) return 20;
  return Math.max(0, Math.min(23, Math.round(value)));
};

const clampMinute = (value: number) => {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(59, Math.round(value)));
};

const normalizeDailySettings = (
  input?: Partial<DailyReminderSettings> | null,
): DailyReminderSettings => {
  return {
    enabled: !!input?.enabled,
    hour:
      typeof input?.hour === 'number'
        ? clampHour(input.hour)
        : DEFAULT_DAILY_REMINDER.hour,
    minute:
      typeof input?.minute === 'number'
        ? clampMinute(input.minute)
        : DEFAULT_DAILY_REMINDER.minute,
  };
};

const getNextDailyTimestamp = (hour: number, minute: number) => {
  const fire = new Date();
  fire.setHours(hour, minute, 0, 0);

  if (fire.getTime() <= Date.now()) {
    fire.setDate(fire.getDate() + 1);
  }

  return fire.getTime();
};

const requestNotificationPermission = async () => {
  try {
    const settings = await notifee.requestPermission();

    return (
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
    );
  } catch {
    return false;
  }
};

const ensureWorkoutChannel = async () => {
  if (Platform.OS !== 'android') return;

  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Workout Reminders',
    importance: AndroidImportance.DEFAULT,
    visibility: AndroidVisibility.PUBLIC,
  });
};

export async function initNotifications() {
  await requestNotificationPermission();
  await ensureWorkoutChannel();

  const daily = await loadDailyReminderSettings();

  if (daily.enabled) {
    await scheduleDailyReminder(daily.hour, daily.minute);
  }
}

export async function loadDailyReminderSettings(): Promise<DailyReminderSettings> {
  try {
    const raw = await AsyncStorage.getItem(DAILY_REMINDER_SETTINGS_KEY);

    if (!raw) {
      return DEFAULT_DAILY_REMINDER;
    }

    return normalizeDailySettings(JSON.parse(raw));
  } catch {
    return DEFAULT_DAILY_REMINDER;
  }
}

export async function saveDailyReminderSettings(
  settings: Partial<DailyReminderSettings>,
): Promise<DailyReminderSettings> {
  const next = normalizeDailySettings(settings);
  await AsyncStorage.setItem(DAILY_REMINDER_SETTINGS_KEY, JSON.stringify(next));
  return next;
}

/** Lên lịch nhắc giờ hằng ngày theo giờ người dùng chọn */
export async function scheduleDailyReminder(
  hour: number,
  minute: number,
  text: Partial<ReminderText> = {},
) {
  const granted = await requestNotificationPermission();

  if (!granted) {
    return false;
  }

  await ensureWorkoutChannel();
  await cancelDailyReminder(false);

  const safeHour = clampHour(hour);
  const safeMinute = clampMinute(minute);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: getNextDailyTimestamp(safeHour, safeMinute),
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  await notifee.createTriggerNotification(
    {
      id: DAILY_REMINDER_ID,
      title: text.title || DEFAULT_DAILY_TEXT.title,
      body: text.body || DEFAULT_DAILY_TEXT.body,
      android: {
        channelId: CHANNEL_ID,
        pressAction: { id: 'default' },
      },
      ios: {},
    },
    trigger,
  );

  await saveDailyReminderSettings({
    enabled: true,
    hour: safeHour,
    minute: safeMinute,
  });

  return true;
}

/** Hủy nhắc hằng ngày */
export async function cancelDailyReminder(saveDisabled = true) {
  try {
    await notifee.cancelNotification(DAILY_REMINDER_ID);
  } catch {}

  try {
    await notifee.cancelTriggerNotification(DAILY_REMINDER_ID);
  } catch {}

  if (saveDisabled) {
    const current = await loadDailyReminderSettings();

    await saveDailyReminderSettings({
      ...current,
      enabled: false,
    });
  }
}

/** Ghi nhận user vừa tập xong / bắt đầu tập */
export async function markWorkoutActivity() {
  const now = Date.now();
  await AsyncStorage.setItem(LAST_WORKOUT_KEY, String(now));

  await cancelInactiveWorkoutReminder();
  await scheduleInactiveWorkoutReminder();
}

/** Đọc thời điểm tập gần nhất */
export async function getLastWorkoutAt(): Promise<number | null> {
  try {
    const raw = await AsyncStorage.getItem(LAST_WORKOUT_KEY);
    if (!raw) return null;

    const ts = parseInt(raw, 10);
    return Number.isNaN(ts) ? null : ts;
  } catch {
    return null;
  }
}

/** Hủy nhắc khi user không tập trong 3 ngày */
export async function cancelInactiveWorkoutReminder() {
  try {
    await notifee.cancelNotification(INACTIVE_REMINDER_ID);
  } catch {}

  try {
    await notifee.cancelTriggerNotification(INACTIVE_REMINDER_ID);
  } catch {}
}

/** Lên lịch nhắc nếu user không vào tập trong 3 ngày */
export async function scheduleInactiveWorkoutReminder(
  text: Partial<ReminderText> = {},
) {
  const granted = await requestNotificationPermission();

  if (!granted) {
    return false;
  }

  await ensureWorkoutChannel();
  await cancelInactiveWorkoutReminder();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + THREE_DAYS_MS,
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  await notifee.createTriggerNotification(
    {
      id: INACTIVE_REMINDER_ID,
      title: text.title || DEFAULT_INACTIVE_TEXT.title,
      body: text.body || DEFAULT_INACTIVE_TEXT.body,
      android: {
        channelId: CHANNEL_ID,
        pressAction: { id: 'default' },
      },
      ios: {},
    },
    trigger,
  );

  return true;
}