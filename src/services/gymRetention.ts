// FILE: src/services/gymRetention.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  loadGymWorkoutHistory,
} from '../store/gymProgress';

const READINESS_KEY = 'gymforge:readiness:latest';

const DAY_MS = 24 * 60 * 60 * 1000;

export type GymReadinessLevel =
  | 'normal'
  | 'light'
  | 'recovery';

export type GymReadiness = {
  energy: number;
  sleep: number;
  soreness: number;
  score: number;
  level: GymReadinessLevel;
  weightMultiplier: number;
  restMultiplier: number;
  messageKey: string;
  createdAt: number;
};

export type WeeklyRetentionStats = {
  target: number;
  completed: number;
  percent: number;
  remaining: number;
  weekStreak: number;
};

export type LastExercisePerformance = {
  completedAt: number;
  weightKg: number;
  reps: number;
  sets: number;
} | null;

export type GymWorkoutSummary = {
  dayTitle: string;
  durationSec: number;
  totalSets: number;
  totalReps: number;
  totalVolumeKg: number;
  sessionRpe: number;
  newRecords: Array<{
    exerciseName?: string;
    weightKg?: number | string;
    reps?: number | string;
  }>;
  weekly: WeeklyRetentionStats;
  readiness?: GymReadiness | null;
};

const parseNumber = (
  value: unknown,
): number => {
  const n = Number.parseFloat(
    String(value ?? '')
      .replace(',', '.'),
  );

  return Number.isFinite(n)
    ? n
    : 0;
};

const startOfMonday = (
  input: Date,
): number => {
  const d = new Date(input);
  d.setHours(0, 0, 0, 0);

  const day = d.getDay();
  const offset =
    day === 0
      ? -6
      : 1 - day;

  d.setDate(d.getDate() + offset);

  return d.getTime();
};

const countCompletedWorkouts = (
  history: any[],
  start: number,
  end: number,
) => {
  return history.filter(item => {
    const time =
      Number(item?.completedAt) || 0;

    return (
      time >= start &&
      time < end
    );
  }).length;
};

export const getReadinessRecommendation = ({
  energy,
  sleep,
  soreness,
}: {
  energy: number;
  sleep: number;
  soreness: number;
}): GymReadiness => {
  /**
   * Soreness 1 = ít đau, 5 = đau nhiều.
   * Vì vậy đảo chiều soreness khi tính điểm sẵn sàng.
   */
  const sorenessReadiness =
    6 - soreness;

  const score =
    Math.round(
      (
        energy +
        sleep +
        sorenessReadiness
      ) /
        3 *
        10,
    ) / 10;

  if (score <= 2.4) {
    return {
      energy,
      sleep,
      soreness,
      score,
      level: 'recovery',
      weightMultiplier: 0.8,
      restMultiplier: 1.3,
      messageKey:
        'retention.readinessRecoveryMessage',
      createdAt: Date.now(),
    };
  }

  if (score <= 3.4) {
    return {
      energy,
      sleep,
      soreness,
      score,
      level: 'light',
      weightMultiplier: 0.9,
      restMultiplier: 1.15,
      messageKey:
        'retention.readinessLightMessage',
      createdAt: Date.now(),
    };
  }

  return {
    energy,
    sleep,
    soreness,
    score,
    level: 'normal',
    weightMultiplier: 1,
    restMultiplier: 1,
    messageKey:
      'retention.readinessNormalMessage',
    createdAt: Date.now(),
  };
};

export const saveGymReadiness = async (
  readiness: GymReadiness,
) => {
  await AsyncStorage.setItem(
    READINESS_KEY,
    JSON.stringify(readiness),
  );
};

export const loadLatestGymReadiness =
  async (): Promise<GymReadiness | null> => {
    try {
      const raw =
        await AsyncStorage.getItem(
          READINESS_KEY,
        );

      if (!raw) {
        return null;
      }

      const parsed =
        JSON.parse(raw);

      return parsed &&
        typeof parsed === 'object'
        ? parsed as GymReadiness
        : null;
    } catch {
      return null;
    }
  };

export const adjustSuggestedWeight = (
  value: string | number | undefined,
  readiness?: GymReadiness | null,
): string => {
  const weight =
    parseNumber(value);

  if (!weight) {
    return '';
  }

  const multiplier =
    readiness?.weightMultiplier ?? 1;

  const adjusted =
    weight * multiplier;

  /**
   * Làm tròn theo nấc 0.5 kg.
   */
  const rounded =
    Math.round(adjusted * 2) / 2;

  return String(rounded);
};

export const getLastExercisePerformanceFromHistory = (
  history: any[],
  exerciseId: string,
): LastExercisePerformance => {
  const sorted = [...history].sort(
    (a, b) =>
      Number(b?.completedAt || 0) -
      Number(a?.completedAt || 0),
  );

  for (const workout of sorted) {
    const exercise =
      workout?.exercises?.find(
        (item: any) =>
          item?.exerciseId ===
          exerciseId,
      );

    if (!exercise) {
      continue;
    }

    const completedSets =
      (exercise.sets || []).filter(
        (item: any) =>
          item?.completed,
      );

    if (!completedSets.length) {
      continue;
    }

    const best = [...completedSets]
      .sort(
        (a: any, b: any) =>
          parseNumber(b?.weightKg) -
          parseNumber(a?.weightKg),
      )[0];

    return {
      completedAt:
        Number(
          workout.completedAt,
        ) || Date.now(),
      weightKg:
        parseNumber(
          best?.weightKg,
        ),
      reps:
        Math.round(
          parseNumber(
            best?.reps,
          ),
        ),
      sets:
        completedSets.length,
    };
  }

  return null;
};

export const loadWeeklyRetentionStats =
  async (
    targetDays = 4,
  ): Promise<WeeklyRetentionStats> => {
    const history =
      await loadGymWorkoutHistory();

    const target =
      Math.max(
        1,
        Math.round(targetDays),
      );

    const now = new Date();
    const thisWeekStart =
      startOfMonday(now);
    const thisWeekEnd =
      thisWeekStart +
      7 * DAY_MS;

    const completed =
      countCompletedWorkouts(
        history,
        thisWeekStart,
        thisWeekEnd,
      );

    let weekStreak = 0;

    /**
     * Nếu tuần hiện tại đã đạt mục tiêu,
     * chuỗi bắt đầu từ tuần hiện tại.
     * Nếu chưa đạt, vẫn giữ chuỗi của các tuần
     * hoàn thành liên tiếp trước đó.
     */
    let cursorStart =
      completed >= target
        ? thisWeekStart
        : thisWeekStart -
          7 * DAY_MS;

    for (
      let i = 0;
      i < 104;
      i += 1
    ) {
      const count =
        countCompletedWorkouts(
          history,
          cursorStart,
          cursorStart +
            7 * DAY_MS,
        );

      if (count < target) {
        break;
      }

      weekStreak += 1;
      cursorStart -=
        7 * DAY_MS;
    }

    return {
      target,
      completed,
      percent:
        Math.min(
          100,
          Math.round(
            completed /
              target *
              100,
          ),
        ),
      remaining:
        Math.max(
          0,
          target -
            completed,
        ),
      weekStreak,
    };
  };

export const buildGymWorkoutSummary =
  async ({
    entry,
    newRecords,
    durationSec,
    targetDays,
    readiness,
  }: {
    entry: any;
    newRecords: any[];
    durationSec: number;
    targetDays?: number;
    readiness?: GymReadiness | null;
  }): Promise<GymWorkoutSummary> => {
    let totalSets = 0;
    let totalReps = 0;
    let totalVolumeKg = 0;

    (entry?.exercises || []).forEach(
      (exercise: any) => {
        (exercise?.sets || []).forEach(
          (set: any) => {
            if (!set?.completed) {
              return;
            }

            const reps =
              parseNumber(
                set?.reps,
              );
            const weight =
              parseNumber(
                set?.weightKg,
              );

            totalSets += 1;
            totalReps +=
              Math.round(reps);
            totalVolumeKg +=
              weight * reps;
          },
        );
      },
    );

    const weekly =
      await loadWeeklyRetentionStats(
        targetDays || 4,
      );

    return {
      dayTitle:
        String(
          entry?.dayTitle ||
            '',
        ),
      durationSec:
        Math.max(
          1,
          Math.round(
            durationSec,
          ),
        ),
      totalSets,
      totalReps,
      totalVolumeKg:
        Math.round(
          totalVolumeKg,
        ),
      sessionRpe:
        Number(
          entry?.sessionRpe,
        ) || 0,
      newRecords:
        Array.isArray(
          newRecords,
        )
          ? newRecords
          : [],
      weekly,
      readiness:
        readiness || null,
    };
  };
