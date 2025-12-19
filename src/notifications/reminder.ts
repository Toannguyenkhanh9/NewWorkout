// src/notifications/reminder.ts
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
  AndroidVisibility,
} from '@notifee/react-native';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHANNEL_ID = 'workout';
const DAILY_REMINDER_ID = 'daily-workout-reminder';
const INACTIVE_REMINDER_ID = 'inactive-workout-reminder';
const LAST_WORKOUT_KEY = 'workout:lastAt';

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

/** Gọi 1 lần trong App.tsx */
export async function initNotifications() {
  // Android 13+ & iOS: xin quyền
  try {
    await notifee.requestPermission();
  } catch {}

  // Tạo channel Android
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Workout Reminders',
      importance: AndroidImportance.DEFAULT,
      visibility: AndroidVisibility.PUBLIC,
      // smallIcon: 'ic_notification', // nếu bạn có icon nhỏ riêng
    });
  }
}

/** Lên lịch nhắc giờ hằng ngày (VD: 20:00) */
export async function scheduleDailyReminder(hour: number, minute: number) {
  // Hủy lịch cũ
  try {
    await notifee.cancelNotification(DAILY_REMINDER_ID);
  } catch {}
  try {
    await notifee.cancelTriggerNotification(DAILY_REMINDER_ID);
  } catch {}

  const now = new Date();
  const fire = new Date();
  fire.setHours(hour, minute, 0, 0);

  if (fire.getTime() <= now.getTime()) {
    fire.setDate(fire.getDate() + 1);
  }

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: fire.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: { allowWhileIdle: true },
  };

  await notifee.createTriggerNotification(
    {
      id: DAILY_REMINDER_ID,
      title: "It's practice time! 💪",
      body: "Open Insanity Deluxe Edition and complete today's session.",
      android: {
        channelId: CHANNEL_ID,
        pressAction: { id: 'default' },
      },
      ios: {},
    },
    trigger
  );
}

/** Hủy nhắc hằng ngày */
export async function cancelDailyReminder() {
  try {
    await notifee.cancelNotification(DAILY_REMINDER_ID);
  } catch {}
  try {
    await notifee.cancelTriggerNotification(DAILY_REMINDER_ID);
  } catch {}
}

/** Ghi nhận user vừa tập xong / bắt đầu tập */
export async function markWorkoutActivity() {
  const now = Date.now();
  await AsyncStorage.setItem(LAST_WORKOUT_KEY, String(now));

  // Mỗi lần user tập -> reset lịch nhắc 3 ngày không tập
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
export async function scheduleInactiveWorkoutReminder() {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + THREE_DAYS_MS,
    alarmManager: { allowWhileIdle: true },
  };

  await notifee.createTriggerNotification(
    {
      id: INACTIVE_REMINDER_ID,
      title: 'We miss you 💪',
      body: "You haven't worked out for 3 days. Open Insanity Deluxe Edition and continue your training.",
      android: {
        channelId: CHANNEL_ID,
        pressAction: { id: 'default' },
      },
      ios: {},
    },
    trigger
  );
}