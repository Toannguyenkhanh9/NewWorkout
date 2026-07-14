// FILE: src/services/gymCalendar.ts
import type {
  SmartGymDay,
  TrainingDaysPerWeek,
} from '../data/gymSmartPlan';

import type {
  GymWorkoutHistoryEntry,
} from '../store/gymProgress';

export type GymCalendarStatus =
  | 'workout'
  | 'completed'
  | 'missed'
  | 'rest'
  | 'today';

export type GymCalendarItem = {
  date: number;
  weekday: number;
  weekdayLabel: string;
  dayLabel: string;
  status: GymCalendarStatus;
  workoutDay?: SmartGymDay | null;
};

const WEEKDAY_LABELS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

const SCHEDULE_BY_DAYS: Record<number, number[]> = {
  2: [1, 4],
  3: [1, 3, 5],
  4: [1, 2, 4, 5],
  5: [1, 2, 3, 4, 5],
  6: [1, 2, 3, 4, 5, 6],
};

export const getWeekStart = (time = Date.now()) => {
  const d = new Date(time);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);

  return d.getTime();
};

export const addDays = (
  time: number,
  days: number,
) => {
  const d = new Date(time);
  d.setDate(d.getDate() + days);

  return d.getTime();
};

const isSameDay = (
  a: number,
  b: number,
) => {
  const da = new Date(a);
  const db = new Date(b);

  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
};

const isBeforeToday = (time: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return time < today.getTime();
};

const getScheduledDay = (
  days: SmartGymDay[],
  daysPerWeek: TrainingDaysPerWeek,
  weekday: number,
) => {
  const schedule =
    SCHEDULE_BY_DAYS[daysPerWeek] || SCHEDULE_BY_DAYS[4];

  const index = schedule.indexOf(weekday);

  if (index < 0) return null;

  return days[index % days.length] || null;
};

export const buildGymCalendarWeek = ({
  planId,
  days,
  daysPerWeek,
  history,
  weekStart = getWeekStart(),
}: {
  planId: string;
  days: SmartGymDay[];
  daysPerWeek: TrainingDaysPerWeek;
  history: GymWorkoutHistoryEntry[];
  weekStart?: number;
}): GymCalendarItem[] => {
  return Array.from({
    length: 7,
  }).map((_, index) => {
    const date = addDays(weekStart, index);
    const d = new Date(date);
    const weekday = d.getDay();

    const workoutDay = getScheduledDay(
      days,
      daysPerWeek,
      weekday,
    );

    const completed = workoutDay
      ? history.some(entry => {
          return (
            entry.programId === planId &&
            entry.dayId === workoutDay.id &&
            isSameDay(entry.completedAt, date)
          );
        })
      : false;

    let status: GymCalendarStatus = 'rest';

    if (workoutDay && completed) {
      status = 'completed';
    } else if (workoutDay && isSameDay(date, Date.now())) {
      status = 'today';
    } else if (workoutDay && isBeforeToday(date)) {
      status = 'missed';
    } else if (workoutDay) {
      status = 'workout';
    }

    return {
      date,
      weekday,
      weekdayLabel: WEEKDAY_LABELS[weekday],
      dayLabel: `${d.getDate()}/${d.getMonth() + 1}`,
      status,
      workoutDay,
    };
  });
};