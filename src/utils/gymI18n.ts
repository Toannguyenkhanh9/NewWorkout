import type {
  SmartGymDay,
  SmartGymExercise,
  UserGymProfile,
} from '../data/gymSmartPlan';

export type GymTranslate = (
  key: string,
  options?: Record<string, unknown>,
) => unknown;

const MISSING = '__GYM_I18N_MISSING__';

const unique = (items: Array<string | null | undefined>) => {
  return Array.from(new Set(items.filter(Boolean) as string[]));
};

/**
 * Chuyển chuỗi thành key ổn định dùng cho resource.
 * Ví dụ:
 * - "bench-press" -> "bench_press"
 * - "Chest • Shoulders • Triceps" -> "chest_shoulders_triceps"
 */
export const normalizeGymKey = (value?: string | null) => {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

const snakeToCamel = (value: string) => {
  return value.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());
};

const stripExerciseInstanceId = (exerciseId: string) => {
  return String(exerciseId || '')
    .replace(/__\d+$/g, '')
    .replace(/--\d+$/g, '')
    .replace(/-instance-\d+$/g, '');
};

const translateFirst = (
  t: GymTranslate,
  keys: string[],
  fallback: string,
  options: Record<string, unknown> = {},
) => {
  for (const key of unique(keys)) {
    const result = t(key, {
      ...options,
      defaultValue: MISSING,
    });

    if (
      typeof result === 'string' &&
      result !== MISSING &&
      result !== key
    ) {
      return result;
    }
  }

  return fallback;
};

const exerciseKeyCandidates = (
  exercise: Pick<SmartGymExercise, 'id' | 'name'> &
    Partial<Pick<SmartGymExercise, 'baseExerciseId'>>,
) => {
  const rawId =
    exercise.baseExerciseId || stripExerciseInstanceId(exercise.id);
  const normalizedId = normalizeGymKey(rawId);
  const normalizedName = normalizeGymKey(exercise.name);

  return unique([
    normalizedId,
    snakeToCamel(normalizedId),
    normalizedId.replace(/_/g, ''),
    normalizedName,
    snakeToCamel(normalizedName),
    normalizedName.replace(/_/g, ''),
  ]);
};

export const translateExerciseName = (
  exercise: Pick<SmartGymExercise, 'id' | 'name'> &
    Partial<Pick<SmartGymExercise, 'baseExerciseId'>>,
  t: GymTranslate,
) => {
  const ids = exerciseKeyCandidates(exercise);

  return translateFirst(
    t,
    ids.flatMap(id => [
      `gym.exerciseNames.${id}`,
      `gym.exercises.${id}.name`,
      `exerciseNames.${id}`,
    ]),
    exercise.name,
  );
};

export const translateExerciseNote = (
  exercise: SmartGymExercise,
  t: GymTranslate,
) => {
  const ids = exerciseKeyCandidates(exercise);

  const baseNote = translateFirst(
    t,
    ids.flatMap(id => [
      `gym.exerciseNotes.${id}`,
      `gym.exercises.${id}.note`,
      `exerciseNotes.${id}`,
    ]),
    exercise.note,
  );

  const extraNotes = (exercise.extraNoteKeys || [])
    .map(key => translateFirst(t, [key], ''))
    .filter(Boolean);

  return [baseNote, ...extraNotes].join(' ').trim();
};

export const translateGymDayTitle = (
  day: Pick<SmartGymDay, 'id' | 'title'>,
  t: GymTranslate,
) => {
  const titleKey = normalizeGymKey(day.title);
  const idKey = normalizeGymKey(day.id);

  return translateFirst(
    t,
    [
      `gym.dayTitles.${titleKey}`,
      `gym.days.${titleKey}.title`,
      `gym.days.${idKey}.title`,
    ],
    day.title,
  );
};

export const translateGymDayFocus = (
  day: Pick<SmartGymDay, 'id' | 'focus'>,
  t: GymTranslate,
) => {
  const focusKey = normalizeGymKey(day.focus);
  const idKey = normalizeGymKey(day.id);

  return translateFirst(
    t,
    [
      `gym.dayFocus.${focusKey}`,
      `gym.days.${idKey}.focus`,
    ],
    day.focus,
  );
};

export const translateGymIntensity = (
  intensity: SmartGymDay['intensity'] | string,
  t: GymTranslate,
) => {
  return translateFirst(
    t,
    [`gym.intensity.${normalizeGymKey(intensity)}`],
    String(intensity),
  );
};

export const translateGymPlanTitle = (
  title: string,
  daysPerWeek: number,
  t: GymTranslate,
) => {
  return translateFirst(
    t,
    [
      `gym.planTitles.${normalizeGymKey(title)}`,
      `gym.planTitles.days_${daysPerWeek}`,
    ],
    title,
    { days: daysPerWeek },
  );
};

export const translateGymPhase = (
  phase: string,
  t: GymTranslate,
) => {
  return translateFirst(
    t,
    [`gym.phases.${normalizeGymKey(phase)}`],
    phase,
  );
};

export const translateGymWeekAdvice = (
  phase: string,
  t: GymTranslate,
  fallback: string,
  values: Record<string, unknown> = {},
) => {
  return translateFirst(
    t,
    [
      `gym.weekAdvice.${normalizeGymKey(phase)}`,
      `gym.weekAdvice.${normalizeGymKey(fallback)}`,
    ],
    fallback,
    values,
  );
};

const calcBmi = (profile?: UserGymProfile | null) => {
  const heightCm = Number(profile?.heightCm || 0);
  const weightKg = Number(profile?.weightKg || 0);

  if (!heightCm || !weightKg) return null;

  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

export const translateGymPlanAdvice = ({
  t,
  fallback,
  currentWeek,
  daysPerWeek,
  profile,
}: {
  t: GymTranslate;
  fallback: string;
  currentWeek: number;
  daysPerWeek: number;
  profile?: UserGymProfile | null;
}) => {
  let key = 'balanced';

  if (!profile) {
    key = 'missing_profile';
  } else if (profile.injured) {
    key = 'injury';
  } else if (Number(profile.age || 0) >= 45) {
    key = 'age_45_plus';
  } else if ((calcBmi(profile) || 0) >= 30) {
    key = 'high_bmi';
  } else if (daysPerWeek >= 5) {
    key = 'high_frequency';
  }

  return translateFirst(
    t,
    [`gym.planAdvice.${key}`],
    fallback,
    {
      week: currentWeek,
      days: daysPerWeek,
    },
  );
};

export const translateEquipmentMode = (
  mode: string,
  t: GymTranslate,
  fallback = mode,
) => {
  return translateFirst(
    t,
    [`gym.equipment.${normalizeGymKey(mode)}`],
    fallback,
  );
};

export const translateQuickTarget = (
  target: string,
  t: GymTranslate,
  fallback = target,
) => {
  return translateFirst(
    t,
    [`gym.quickTargets.${normalizeGymKey(target)}`],
    fallback,
  );
};

export const translateGender = (
  gender: string,
  t: GymTranslate,
) => {
  return translateFirst(
    t,
    [
      `UserProfile.gender_${normalizeGymKey(gender)}`,
      `gym.gender.${normalizeGymKey(gender)}`,
    ],
    gender,
  );
};

export const translateMuscleGroup = (
  muscleGroup: string,
  t: GymTranslate,
) => {
  return translateFirst(
    t,
    [`gym.muscleGroups.${normalizeGymKey(muscleGroup)}`],
    muscleGroup,
  );
};

export const translateRecoveryStatus = (
  status: string,
  t: GymTranslate,
) => {
  return translateFirst(
    t,
    [`gym.recoveryStatus.${normalizeGymKey(status)}`],
    status,
  );
};

export const translateAchievementTitle = (
  id: string,
  fallback: string,
  t: GymTranslate,
) => {
  return translateFirst(
    t,
    [`gym.achievements.${normalizeGymKey(id)}.title`],
    fallback,
  );
};

export const translateAchievementDesc = (
  id: string,
  fallback: string,
  t: GymTranslate,
) => {
  return translateFirst(
    t,
    [`gym.achievements.${normalizeGymKey(id)}.desc`],
    fallback,
  );
};

export const translateGymDynamicText = (
  namespace: string,
  value: string,
  t: GymTranslate,
) => {
  return translateFirst(
    t,
    [`gym.${namespace}.${normalizeGymKey(value)}`],
    value,
  );
};