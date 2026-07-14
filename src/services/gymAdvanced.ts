// FILE: src/services/gymAdvanced.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  SmartGymDay,
  SmartGymExercise,
  UserGymProfile,
} from '../data/gymSmartPlan';

import {
  loadGymPersonalRecords,
  loadGymWorkoutHistory,
} from '../store/gymProgress';

const BODY_MEASUREMENT_KEY = 'gym:bodyMeasurements:v1';
const PROGRESS_PHOTO_KEY = 'gym:progressPhotos:v1';
const EQUIPMENT_MODE_KEY = 'gym:equipmentMode:v1';
const MISSED_WORKOUT_DISMISS_KEY = 'gym:missedWorkoutDismiss:v1';

const CDN_BASE = 'https://insanity-workouts-cdn.b-cdn.net/Gym';

export type GymEquipmentMode =
  | 'full_gym'
  | 'dumbbell_only'
  | 'machines'
  | 'no_barbell'
  | 'home';

export type QuickWorkoutTarget =
  | 'full_body'
  | 'chest'
  | 'back'
  | 'legs'
  | 'arms'
  | 'core'
  | 'fat_burn';

export type BodyMeasurementEntry = {
  id: string;
  createdAt: number;
  weightKg?: string;
  chestCm?: string;
  waistCm?: string;
  hipsCm?: string;
  thighCm?: string;
  armCm?: string;
  note?: string;
};

export type ProgressPhotoEntry = {
  id: string;
  createdAt: number;
  uri: string;
  pose: 'front' | 'side' | 'back' | 'other';
  note?: string;
};

export type GymWeeklyRecap = {
  weekStart: number;
  weekEnd: number;
  workoutsCompleted: number;
  totalSets: number;
  totalReps: number;
  totalVolumeKg: number;
  prCount: number;
  topMuscleGroup: string;
};

export type GymAchievement = {
  id: string;
  title: string;
  desc: string;
  unlocked: boolean;
  progress: number;
  target: number;
};

export type MuscleRecoveryItem = {
  muscleGroup: string;
  lastTrainedAt?: number | null;
  hoursSince: number;
  recoveryHours: number;
  percent: number;
  status: 'ready' | 'recovering' | 'fresh';
};

const now = () => Date.now();

const makeId = () => {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const parseNumber = (value?: string | number | null) => {
  if (value === null || value === undefined) return 0;

  const n = Number(String(value).replace(',', '.').replace(/[^\d.]/g, ''));

  return Number.isFinite(n) ? n : 0;
};

const getMondayStart = (time = Date.now()) => {
  const d = new Date(time);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);

  return d.getTime();
};

const getWeekEnd = (weekStart: number) => {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);

  return d.getTime();
};

const inferMuscleGroup = (
  exerciseId = '',
  exerciseName = '',
): string => {
  const raw = `${exerciseId} ${exerciseName}`.toLowerCase();

  if (
    raw.includes('squat') ||
    raw.includes('leg') ||
    raw.includes('lunge') ||
    raw.includes('hip') ||
    raw.includes('deadlift')
  ) {
    return 'legs';
  }

  if (
    raw.includes('bench') ||
    raw.includes('chest') ||
    raw.includes('press')
  ) {
    return 'chest';
  }

  if (
    raw.includes('row') ||
    raw.includes('pull') ||
    raw.includes('lat')
  ) {
    return 'back';
  }

  if (
    raw.includes('shoulder') ||
    raw.includes('lateral')
  ) {
    return 'shoulders';
  }

  if (
    raw.includes('curl') ||
    raw.includes('triceps') ||
    raw.includes('arm')
  ) {
    return 'arms';
  }

  if (
    raw.includes('plank') ||
    raw.includes('crunch') ||
    raw.includes('core') ||
    raw.includes('dead bug')
  ) {
    return 'core';
  }

  return 'full body';
};

export const loadGymEquipmentMode = async (): Promise<GymEquipmentMode> => {
  const raw = await AsyncStorage.getItem(EQUIPMENT_MODE_KEY);

  if (
    raw === 'full_gym' ||
    raw === 'dumbbell_only' ||
    raw === 'machines' ||
    raw === 'no_barbell' ||
    raw === 'home'
  ) {
    return raw;
  }

  return 'full_gym';
};

export const saveGymEquipmentMode = async (
  mode: GymEquipmentMode,
) => {
  await AsyncStorage.setItem(EQUIPMENT_MODE_KEY, mode);
};

export const buildWeeklyRecap = async (): Promise<GymWeeklyRecap> => {
  const [history, records] = await Promise.all([
    loadGymWorkoutHistory(),
    loadGymPersonalRecords(),
  ]);

  const weekStart = getMondayStart();
  const weekEnd = getWeekEnd(weekStart);

  const weekHistory = history.filter(item => {
    return item.completedAt >= weekStart && item.completedAt <= weekEnd;
  });

  let totalSets = 0;
  let totalReps = 0;
  let totalVolumeKg = 0;

  const muscleCount: Record<string, number> = {};

  weekHistory.forEach(entry => {
    entry.exercises.forEach(exercise => {
      const muscle = inferMuscleGroup(
        exercise.exerciseId,
        exercise.exerciseName,
      );

      muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;

      exercise.sets.forEach(set => {
        if (!set.completed) return;

        const reps = parseNumber(set.reps);
        const weight = parseNumber(set.weightKg);

        totalSets += 1;
        totalReps += reps;
        totalVolumeKg += weight * reps;
      });
    });
  });

  const prCount = records.filter(item => {
    return item.achievedAt >= weekStart && item.achievedAt <= weekEnd;
  }).length;

  const topMuscleGroup =
    Object.entries(muscleCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    'none';

  return {
    weekStart,
    weekEnd,
    workoutsCompleted: weekHistory.length,
    totalSets,
    totalReps,
    totalVolumeKg: Math.round(totalVolumeKg),
    prCount,
    topMuscleGroup,
  };
};

export const buildGymAchievements = async (): Promise<GymAchievement[]> => {
  const [history, records] = await Promise.all([
    loadGymWorkoutHistory(),
    loadGymPersonalRecords(),
  ]);

  const totalWorkouts = history.length;
  const totalPr = records.length;

  const weekStart = getMondayStart();
  const workoutsThisWeek = history.filter(
    item => item.completedAt >= weekStart,
  ).length;

  const totalSets = history.reduce((sum, entry) => {
    return (
      sum +
      entry.exercises.reduce((s, exercise) => {
        return s + exercise.sets.filter(set => set.completed).length;
      }, 0)
    );
  }, 0);

  return [
    {
      id: 'first_gym_workout',
      title: 'First Gym Workout',
      desc: 'Complete your first gym workout.',
      unlocked: totalWorkouts >= 1,
      progress: Math.min(totalWorkouts, 1),
      target: 1,
    },
    {
      id: 'gym_10_workouts',
      title: '10 Gym Workouts',
      desc: 'Complete 10 gym workouts.',
      unlocked: totalWorkouts >= 10,
      progress: Math.min(totalWorkouts, 10),
      target: 10,
    },
    {
      id: 'weekly_3_days',
      title: '3 Days This Week',
      desc: 'Train at least 3 days this week.',
      unlocked: workoutsThisWeek >= 3,
      progress: Math.min(workoutsThisWeek, 3),
      target: 3,
    },
    {
      id: 'first_pr',
      title: 'First Personal Record',
      desc: 'Break your first personal record.',
      unlocked: totalPr >= 1,
      progress: Math.min(totalPr, 1),
      target: 1,
    },
    {
      id: 'hundred_sets',
      title: '100 Sets Logged',
      desc: 'Complete 100 gym sets.',
      unlocked: totalSets >= 100,
      progress: Math.min(totalSets, 100),
      target: 100,
    },
  ];
};

export const getMissedWorkoutSuggestion = async (
  plannedDaysPerWeek: number,
) => {
  const dismissedRaw = await AsyncStorage.getItem(MISSED_WORKOUT_DISMISS_KEY);
  const dismissedAt = Number(dismissedRaw || 0);

  if (dismissedAt && now() - dismissedAt < 24 * 60 * 60 * 1000) {
    return {
      missed: false,
      title: '',
      text: '',
    };
  }

  const history = await loadGymWorkoutHistory();
  const latest = history.slice().sort((a, b) => b.completedAt - a.completedAt)[0];

  if (!latest) {
    return {
      missed: false,
      title: 'Start your first gym workout',
      text: 'Choose a gym day or start a quick workout today.',
    };
  }

  const daysSince =
    (now() - latest.completedAt) / (1000 * 60 * 60 * 24);

  const expectedGap = Math.max(1, Math.floor(7 / plannedDaysPerWeek));

  if (daysSince > expectedGap + 1) {
    return {
      missed: true,
      title: 'Missed workout detected',
      text: `You have not trained for ${Math.floor(
        daysSince,
      )} days. You can train today, skip it, or continue your weekly plan.`,
    };
  }

  return {
    missed: false,
    title: '',
    text: '',
  };
};

export const dismissMissedWorkoutToday = async () => {
  await AsyncStorage.setItem(MISSED_WORKOUT_DISMISS_KEY, String(Date.now()));
};

export const loadBodyMeasurements = async (): Promise<
  BodyMeasurementEntry[]
> => {
  try {
    const raw = await AsyncStorage.getItem(BODY_MEASUREMENT_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const addBodyMeasurement = async (
  entry: Omit<BodyMeasurementEntry, 'id' | 'createdAt'>,
) => {
  const current = await loadBodyMeasurements();

  const next = [
    {
      ...entry,
      id: makeId(),
      createdAt: Date.now(),
    },
    ...current,
  ].slice(0, 200);

  await AsyncStorage.setItem(BODY_MEASUREMENT_KEY, JSON.stringify(next));

  return next;
};

export const deleteBodyMeasurement = async (id: string) => {
  const current = await loadBodyMeasurements();
  const next = current.filter(item => item.id !== id);

  await AsyncStorage.setItem(BODY_MEASUREMENT_KEY, JSON.stringify(next));

  return next;
};

export const loadProgressPhotos = async (): Promise<
  ProgressPhotoEntry[]
> => {
  try {
    const raw = await AsyncStorage.getItem(PROGRESS_PHOTO_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const addProgressPhoto = async (
  entry: Omit<ProgressPhotoEntry, 'id' | 'createdAt'>,
) => {
  const current = await loadProgressPhotos();

  const next = [
    {
      ...entry,
      id: makeId(),
      createdAt: Date.now(),
    },
    ...current,
  ].slice(0, 300);

  await AsyncStorage.setItem(PROGRESS_PHOTO_KEY, JSON.stringify(next));

  return next;
};

export const deleteProgressPhoto = async (id: string) => {
  const current = await loadProgressPhotos();
  const next = current.filter(item => item.id !== id);

  await AsyncStorage.setItem(PROGRESS_PHOTO_KEY, JSON.stringify(next));

  return next;
};

export const buildMuscleRecoveryMap = async (): Promise<
  MuscleRecoveryItem[]
> => {
  const history = await loadGymWorkoutHistory();

  const groups = [
    'chest',
    'back',
    'legs',
    'shoulders',
    'arms',
    'core',
    'full body',
  ];

  const latestMap: Record<string, number> = {};

  history.forEach(entry => {
    entry.exercises.forEach(exercise => {
      const group = inferMuscleGroup(
        exercise.exerciseId,
        exercise.exerciseName,
      );

      latestMap[group] = Math.max(
        latestMap[group] || 0,
        entry.completedAt,
      );
    });
  });

  return groups.map(group => {
    const lastTrainedAt = latestMap[group] || null;
    const recoveryHours =
      group === 'legs' || group === 'back' ? 48 : 36;

    const hoursSince = lastTrainedAt
      ? Math.floor((Date.now() - lastTrainedAt) / (1000 * 60 * 60))
      : 999;

    const percent = Math.min(
      100,
      Math.round((hoursSince / recoveryHours) * 100),
    );

    const status =
      !lastTrainedAt
        ? 'fresh'
        : percent >= 100
          ? 'ready'
          : 'recovering';

    return {
      muscleGroup: group,
      lastTrainedAt,
      hoursSince,
      recoveryHours,
      percent,
      status,
    };
  });
};

const exercise = (
  data: Partial<SmartGymExercise> & {
    id: string;
    name: string;
    muscleGroup: any;
  },
): SmartGymExercise => {
  return {
    sets: 3,
    reps: '8-12',
    restSeconds: 90,
    note: 'Use controlled form and stop if you feel pain.',
    demoUrl: `${CDN_BASE}/${data.id}.mp4`,
    ...data,
  } as SmartGymExercise;
};

const QUICK_EXERCISES: Record<string, SmartGymExercise> = {
  bench_press: exercise({
    id: 'bench_press',
    name: 'Bench Press',
    muscleGroup: 'chest',
    sets: 4,
    reps: '6-10',
    restSeconds: 120,
    note: 'Keep shoulder blades tight and control the bar.',
  }),
  dumbbell_press: exercise({
    id: 'dumbbell_press',
    name: 'Dumbbell Chest Press',
    muscleGroup: 'chest',
    sets: 3,
    reps: '8-12',
    restSeconds: 90,
  }),
  machine_chest_press: exercise({
    id: 'machine_chest_press',
    name: 'Machine Chest Press',
    muscleGroup: 'chest',
    sets: 3,
    reps: '10-12',
    restSeconds: 75,
  }),
  lat_pulldown: exercise({
    id: 'lat_pulldown',
    name: 'Lat Pulldown',
    muscleGroup: 'back',
    sets: 4,
    reps: '8-12',
    restSeconds: 90,
  }),
  seated_row: exercise({
    id: 'seated_row',
    name: 'Seated Row',
    muscleGroup: 'back',
    sets: 3,
    reps: '10-12',
    restSeconds: 90,
  }),
  dumbbell_row: exercise({
    id: 'dumbbell_row',
    name: 'One-arm Dumbbell Row',
    muscleGroup: 'back',
    sets: 3,
    reps: '10-12',
    restSeconds: 75,
  }),
  squat: exercise({
    id: 'squat',
    name: 'Squat',
    muscleGroup: 'legs',
    sets: 4,
    reps: '6-10',
    restSeconds: 150,
  }),
  goblet_squat: exercise({
    id: 'goblet_squat',
    name: 'Goblet Squat',
    muscleGroup: 'legs',
    sets: 3,
    reps: '10-12',
    restSeconds: 90,
  }),
  leg_press: exercise({
    id: 'leg_press',
    name: 'Leg Press',
    muscleGroup: 'legs',
    sets: 4,
    reps: '10-12',
    restSeconds: 120,
  }),
  hip_thrust: exercise({
    id: 'hip_thrust',
    name: 'Hip Thrust',
    muscleGroup: 'legs',
    sets: 3,
    reps: '10-12',
    restSeconds: 90,
  }),
  shoulder_press: exercise({
    id: 'shoulder_press',
    name: 'Dumbbell Shoulder Press',
    muscleGroup: 'shoulders',
    sets: 3,
    reps: '8-12',
    restSeconds: 90,
  }),
  lateral_raise: exercise({
    id: 'lateral_raise',
    name: 'Lateral Raise',
    muscleGroup: 'shoulders',
    sets: 3,
    reps: '12-15',
    restSeconds: 60,
  }),
  dumbbell_curl: exercise({
    id: 'dumbbell_curl',
    name: 'Dumbbell Curl',
    muscleGroup: 'biceps',
    sets: 3,
    reps: '10-12',
    restSeconds: 60,
  }),
  triceps_pushdown: exercise({
    id: 'triceps_pushdown',
    name: 'Triceps Pushdown',
    muscleGroup: 'triceps',
    sets: 3,
    reps: '10-12',
    restSeconds: 60,
  }),
  plank: exercise({
    id: 'plank',
    name: 'Plank',
    muscleGroup: 'core',
    sets: 3,
    reps: '30-60s',
    restSeconds: 60,
  }),
  cable_crunch: exercise({
    id: 'cable_crunch',
    name: 'Cable Crunch',
    muscleGroup: 'core',
    sets: 3,
    reps: '12-15',
    restSeconds: 60,
  }),
  treadmill_walk: exercise({
    id: 'treadmill_walk',
    name: 'Incline Treadmill Walk',
    muscleGroup: 'core',
    sets: 1,
    reps: '10-20 min',
    restSeconds: 60,
  }),
};

export const replaceExerciseForEquipment = (
  item: SmartGymExercise,
  mode: GymEquipmentMode,
): SmartGymExercise => {
  if (mode === 'full_gym') return item;

  const id = item.id.toLowerCase();

  if (mode === 'dumbbell_only' || mode === 'home') {
    if (id.includes('bench') || id.includes('machine_chest')) {
      return QUICK_EXERCISES.dumbbell_press;
    }

    if (id.includes('lat') || id.includes('row')) {
      return QUICK_EXERCISES.dumbbell_row;
    }

    if (id.includes('squat') || id.includes('leg_press')) {
      return QUICK_EXERCISES.goblet_squat;
    }

    if (id.includes('triceps')) {
      return {
        ...QUICK_EXERCISES.triceps_pushdown,
        id: 'dumbbell_triceps_extension',
        name: 'Dumbbell Triceps Extension',
      };
    }

    return item;
  }

  if (mode === 'machines') {
    if (id.includes('bench') || id.includes('dumbbell_press')) {
      return QUICK_EXERCISES.machine_chest_press;
    }

    if (id.includes('squat') || id.includes('goblet')) {
      return QUICK_EXERCISES.leg_press;
    }

    return item;
  }

  if (mode === 'no_barbell') {
    if (id.includes('bench')) {
      return QUICK_EXERCISES.dumbbell_press;
    }

    if (id.includes('squat')) {
      return QUICK_EXERCISES.leg_press;
    }

    return item;
  }

  return item;
};

export const applyEquipmentToGymDay = (
  day: SmartGymDay,
  mode: GymEquipmentMode,
): SmartGymDay => {
  return {
    ...day,
    exercises: day.exercises.map(item =>
      replaceExerciseForEquipment(item, mode),
    ),
  };
};

export const applyEquipmentToPlan = <T extends { days: SmartGymDay[] }>(
  plan: T,
  mode: GymEquipmentMode,
): T => {
  return {
    ...plan,
    days: plan.days.map(day => applyEquipmentToGymDay(day, mode)),
  };
};

export const buildQuickGymDay = (
  target: QuickWorkoutTarget,
  equipmentMode: GymEquipmentMode,
  profile?: UserGymProfile | null,
): SmartGymDay => {
  const injured = !!profile?.injured;

  const library: Record<QuickWorkoutTarget, SmartGymExercise[]> = {
    full_body: [
      QUICK_EXERCISES.goblet_squat,
      QUICK_EXERCISES.dumbbell_press,
      QUICK_EXERCISES.lat_pulldown,
      QUICK_EXERCISES.shoulder_press,
      QUICK_EXERCISES.plank,
    ],
    chest: [
      QUICK_EXERCISES.bench_press,
      QUICK_EXERCISES.dumbbell_press,
      QUICK_EXERCISES.machine_chest_press,
      QUICK_EXERCISES.lateral_raise,
      QUICK_EXERCISES.triceps_pushdown,
    ],
    back: [
      QUICK_EXERCISES.lat_pulldown,
      QUICK_EXERCISES.seated_row,
      QUICK_EXERCISES.dumbbell_row,
      QUICK_EXERCISES.dumbbell_curl,
      QUICK_EXERCISES.plank,
    ],
    legs: [
      injured ? QUICK_EXERCISES.leg_press : QUICK_EXERCISES.squat,
      QUICK_EXERCISES.goblet_squat,
      QUICK_EXERCISES.hip_thrust,
      QUICK_EXERCISES.plank,
    ],
    arms: [
      QUICK_EXERCISES.dumbbell_curl,
      QUICK_EXERCISES.triceps_pushdown,
      QUICK_EXERCISES.lateral_raise,
      QUICK_EXERCISES.plank,
    ],
    core: [
      QUICK_EXERCISES.plank,
      QUICK_EXERCISES.cable_crunch,
      QUICK_EXERCISES.treadmill_walk,
    ],
    fat_burn: [
      QUICK_EXERCISES.goblet_squat,
      QUICK_EXERCISES.dumbbell_press,
      QUICK_EXERCISES.lat_pulldown,
      QUICK_EXERCISES.treadmill_walk,
      QUICK_EXERCISES.plank,
    ],
  };

  const exercises = library[target].map(item =>
    replaceExerciseForEquipment(item, equipmentMode),
  );

  const titleMap: Record<QuickWorkoutTarget, string> = {
    full_body: 'Quick Full Body',
    chest: 'Quick Chest',
    back: 'Quick Back',
    legs: 'Quick Legs',
    arms: 'Quick Arms',
    core: 'Quick Core',
    fat_burn: 'Quick Fat Burn',
  };

const quickDay = {
  id: `quick-${target}`,
  dayNumber: 1,
  title: titleMap[target],
  focus: 'Quick gym session',
  durationMin: target === 'fat_burn' ? 45 : 35,
  intensity: injured ? 'Moderate' : 'Medium',
  exercises,
};

return quickDay as unknown as SmartGymDay;
};