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
import i18n from '../i18n';

const CHANNEL_ID = 'workout';

const DAILY_REMINDER_ID = 'daily-workout-reminder';
const INACTIVE_REMINDER_ID = 'inactive-workout-reminder';

const LAST_WORKOUT_KEY = 'workout:lastAt';
const INACTIVE_REMINDER_SCHEDULED_AT_KEY = 'workout:inactiveReminderScheduledAt';

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

const getNextDailyTimestamp = (hour: number, minute: number) => {
  const fire = new Date();
  fire.setHours(hour, minute, 0, 0);

  if (fire.getTime() <= Date.now()) {
    fire.setDate(fire.getDate() + 1);
  }

  return fire.getTime();
};

/**
 * Gọi 1 lần khi app mở.
 * Hàm này sẽ:
 * - xin quyền notification
 * - tạo channel Android
 * - khôi phục nhắc hằng ngày nếu user đã bật
 * - đặt lịch nhắc nếu 3 ngày không tập
 */
export async function initNotifications() {
  await requestNotificationPermission();
  await ensureWorkoutChannel();

  const daily = await loadDailyReminderSettings();

  if (daily.enabled) {
    await scheduleDailyReminder(daily.hour, daily.minute);
  }

  await scheduleInactiveWorkoutReminder();
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

/**
 * Nhắc luyện tập hằng ngày theo giờ người dùng chọn.
 */
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
    id: INACTIVE_REMINDER_ID,
    title:
      text.title ||
      i18n.t(
        'settings.inactiveReminderTitle',
        DEFAULT_INACTIVE_TEXT.title,
      ),
    body:
      text.body ||
      i18n.t(
        'settings.inactiveReminderBody',
        DEFAULT_INACTIVE_TEXT.body,
      ),
    android: {
      channelId: CHANNEL_ID,
      pressAction: {
        id: 'default',
      },
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

/**
 * Gọi hàm này khi user hoàn thành bài tập.
 * Đây là phần quan trọng nhất.
 */
export async function markWorkoutActivity() {
  const now = Date.now();

  await AsyncStorage.setItem(LAST_WORKOUT_KEY, String(now));

  await cancelInactiveWorkoutReminder();
  await scheduleInactiveWorkoutReminder();
}

/**
 * Lấy thời gian tập gần nhất.
 */
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

/**
 * Hủy notification nhắc 3 ngày không tập.
 */
export async function cancelInactiveWorkoutReminder() {
  try {
    await notifee.cancelNotification(INACTIVE_REMINDER_ID);
  } catch {}

  try {
    await notifee.cancelTriggerNotification(INACTIVE_REMINDER_ID);
  } catch {}

  try {
    await AsyncStorage.removeItem(INACTIVE_REMINDER_SCHEDULED_AT_KEY);
  } catch {}
}

/**
 * Nếu user không tập 3 ngày thì gửi notification.
 *
 * Logic:
 * - Nếu đã có lastWorkoutAt → nhắc sau lastWorkoutAt + 3 ngày
 * - Nếu chưa có lastWorkoutAt → nhắc sau thời điểm hiện tại + 3 ngày
 * - Mỗi lần gọi sẽ hủy lịch cũ rồi đặt lịch mới để tránh bị trùng notification
 */
export async function scheduleInactiveWorkoutReminder(
  text: Partial<ReminderText> = {},
) {
  const granted = await requestNotificationPermission();

  if (!granted) {
    return false;
  }

  await ensureWorkoutChannel();

  try {
    await notifee.cancelNotification(INACTIVE_REMINDER_ID);
  } catch {}

  try {
    await notifee.cancelTriggerNotification(INACTIVE_REMINDER_ID);
  } catch {}

  const lastWorkoutAt = await getLastWorkoutAt();

  const baseTime = lastWorkoutAt || Date.now();

  let reminderAt = baseTime + THREE_DAYS_MS;

  /**
   * Trường hợp user mở app sau hơn 3 ngày nhưng notification chưa được schedule,
   * đặt nhắc sau 1 phút để tránh bắn notification ngay lập tức khi đang dùng app.
   */
  if (reminderAt <= Date.now()) {
    reminderAt = Date.now() + 60 * 1000;
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: reminderAt,
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
        pressAction: {
          id: 'default',
        },
      },
      ios: {},
    },
    trigger,
  );

  await AsyncStorage.setItem(
    INACTIVE_REMINDER_SCHEDULED_AT_KEY,
    String(reminderAt),
  );

  return true;
}

/**
 * Dùng để test nhanh, ví dụ nhắc sau 1 phút.
 */
export async function debugScheduleInactiveWorkoutReminderInMinutes(
  minutes: number,
) {
  const granted = await requestNotificationPermission();

  if (!granted) {
    return false;
  }

  await ensureWorkoutChannel();
  await cancelInactiveWorkoutReminder();

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + minutes * 60 * 1000,
    alarmManager: {
      allowWhileIdle: true,
    },
  };

  await notifee.createTriggerNotification(
    {
      id: INACTIVE_REMINDER_ID,
      title: DEFAULT_INACTIVE_TEXT.title,
      body: DEFAULT_INACTIVE_TEXT.body,
      android: {
        channelId: CHANNEL_ID,
        pressAction: {
          id: 'default',
        },
      },
      ios: {},
    },
    trigger,
  );

  return true;
}