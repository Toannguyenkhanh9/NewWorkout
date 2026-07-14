// FILE: src/services/gymToday.ts
import type {
  SmartGymDay,
  TrainingDaysPerWeek,
} from '../data/gymSmartPlan';

import type {
  GymWorkoutHistoryEntry,
} from '../store/gymProgress';

export type TodayGymStatus =
  | 'workout'
  | 'completed'
  | 'rest';

export type TodayGymWorkoutInfo = {
  status: TodayGymStatus;
  todayLabel: string;
  title: string;
  subtitle: string;
  scheduledDay?: SmartGymDay | null;
  nextDay?: SmartGymDay | null;
  nextLabel?: string;
};

const WEEKDAY_LABELS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const SCHEDULE_BY_DAYS: Record<number, number[]> = {
  2: [1, 4],
  3: [1, 3, 5],
  4: [1, 2, 4, 5],
  5: [1, 2, 3, 4, 5],
  6: [1, 2, 3, 4, 5, 6],
};

const isSameDay = (a: number, b: number) => {
  const da = new Date(a);
  const db = new Date(b);

  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
};

const getScheduledDayForWeekday = (
  days: SmartGymDay[],
  daysPerWeek: number,
  weekday: number,
) => {
  const schedule = SCHEDULE_BY_DAYS[daysPerWeek] || SCHEDULE_BY_DAYS[4];
  const index = schedule.indexOf(weekday);

  if (index < 0) {
    return null;
  }

  return days[index % days.length] || null;
};

const findNextWorkout = (
  days: SmartGymDay[],
  daysPerWeek: number,
) => {
  const now = new Date();
  const today = now.getDay();

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextWeekday = (today + offset) % 7;
    const nextDay = getScheduledDayForWeekday(
      days,
      daysPerWeek,
      nextWeekday,
    );

    if (nextDay) {
      return {
        day: nextDay,
        label: WEEKDAY_LABELS[nextWeekday],
      };
    }
  }

  return {
    day: days[0] || null,
    label: '',
  };
};

export const buildTodayGymWorkout = ({
  planId,
  days,
  daysPerWeek,
  history,
}: {
  planId: string;
  days: SmartGymDay[];
  daysPerWeek: TrainingDaysPerWeek;
  history: GymWorkoutHistoryEntry[];
}): TodayGymWorkoutInfo => {
  const now = Date.now();
  const weekday = new Date(now).getDay();
  const todayLabel = WEEKDAY_LABELS[weekday];

  const scheduledDay = getScheduledDayForWeekday(
    days,
    daysPerWeek,
    weekday,
  );

  const next = findNextWorkout(days, daysPerWeek);

  if (!scheduledDay) {
    return {
      status: 'rest',
      todayLabel,
      title: 'Recovery day',
      subtitle: next.day
        ? `Next workout: ${next.day.title} on ${next.label}`
        : 'No workout scheduled today.',
      scheduledDay: null,
      nextDay: next.day,
      nextLabel: next.label,
    };
  }

  const completedToday = history.some(entry => {
    return (
      entry.programId === planId &&
      entry.dayId === scheduledDay.id &&
      isSameDay(entry.completedAt, now)
    );
  });

  if (completedToday) {
    return {
      status: 'completed',
      todayLabel,
      title: 'Workout completed today',
      subtitle: `${scheduledDay.title} is done. Great job!`,
      scheduledDay,
      nextDay: next.day,
      nextLabel: next.label,
    };
  }

  return {
    status: 'workout',
    todayLabel,
    title: scheduledDay.title,
    subtitle: `${scheduledDay.durationMin} min • ${scheduledDay.exercises.length} exercises • ${scheduledDay.intensity}`,
    scheduledDay,
    nextDay: next.day,
    nextLabel: next.label,
  };
};