// FILE: src/data/gymSmartPlan.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TrainingDaysPerWeek = 3 | 4 | 5 | 6;

export type Gender = 'male' | 'female' | 'other';

export type UserGymProfile = {
  name?: string;
  age?: number;
  gender?: Gender;
  heightCm?: number;
  weightKg?: number;
  healthNote?: string;
  injured?: boolean;
  injuryNote?: string;
  goal?: string;
};

export type SmartGymExercise = {
  id: string;
  name: string;
  muscleGroup:
    | 'chest'
    | 'back'
    | 'legs'
    | 'shoulders'
    | 'biceps'
    | 'triceps'
    | 'core'
    | 'cardio';
  sets: number;
  reps: string;
  restSeconds: number;
  note: string;
  demoUrl?: string;
};

export type SmartGymDay = {
  id: string;
  dayNumber: number;
  title: string;
  focus: string;
  durationMin: number;
  intensity: 'light' | 'moderate' | 'hard';
  exercises: SmartGymExercise[];
};

export type SmartGymPlan = {
  id: string;
  daysPerWeek: TrainingDaysPerWeek;
  title: string;
  description: string;
  advice: string;
  days: SmartGymDay[];
};

const USER_PROFILE_KEY = 'user:profile';
const GYM_DAYS_KEY = 'gym:daysPerWeek';

const CDN_BASE = 'https://insanity-workouts-cdn.b-cdn.net/Gym';

const v = (file: string) => `${CDN_BASE}/${file}`;

/**
 * Tự đổi giáo án theo tuần.
 * Week 1 -> variant 0
 * Week 2 -> variant 1
 * Week 3 -> variant 2
 * Week 4 -> variant 3
 * Week 5 quay lại variant 0
 */
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const PROGRAM_ANCHOR = new Date('2026-01-05T00:00:00').getTime();

export const getAutoGymWeekNumber = () => {
  const diff = Date.now() - PROGRAM_ANCHOR;
  const week = Math.floor(diff / WEEK_MS);

  return ((week % 12) + 12) % 12 + 1;
};

export const getAutoGymWeekVariant = () => {
  return (getAutoGymWeekNumber() - 1) % 4;
};

const EXERCISES: Record<string, SmartGymExercise> = {
  // --------------------
  // LEGS
  // --------------------
  squat: {
    id: 'squat',
    name: 'Squat',
    muscleGroup: 'legs',
    sets: 4,
    reps: '6-10',
    restSeconds: 150,
    note: 'Brace your core, keep your chest up and push through your mid-foot.',
    demoUrl: v('squat.mp4'),
  },
  gobletSquat: {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    muscleGroup: 'legs',
    sets: 3,
    reps: '10-12',
    restSeconds: 90,
    note: 'Keep your chest up, brace your core and control the movement.',
    demoUrl: v('goblet_squat.mp4'),
  },
  hackSquat: {
    id: 'hack-squat',
    name: 'Hack Squat',
    muscleGroup: 'legs',
    sets: 4,
    reps: '8-12',
    restSeconds: 120,
    note: 'Keep your back against the pad and control the depth without bouncing.',
    demoUrl: v('hack_squat.mp4'),
  },
  legPress: {
    id: 'leg-press',
    name: 'Leg Press',
    muscleGroup: 'legs',
    sets: 3,
    reps: '10-12',
    restSeconds: 90,
    note: 'Keep your feet stable and do not let your knees collapse inward.',
    demoUrl: v('leg_press.mp4'),
  },
  romanianDeadlift: {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    muscleGroup: 'legs',
    sets: 3,
    reps: '8-10',
    restSeconds: 90,
    note: 'Push your hips back, keep your back neutral and feel your hamstrings stretch.',
    demoUrl: v('romanian_deadlift.mp4'),
  },
  hipThrust: {
    id: 'hip-thrust',
    name: 'Hip Thrust',
    muscleGroup: 'legs',
    sets: 3,
    reps: '10-12',
    restSeconds: 90,
    note: 'Drive through your heels and squeeze your glutes at the top.',
    demoUrl: v('hip_thrust.mp4'),
  },
  hipAbduction: {
    id: 'hip-abduction',
    name: 'Hip Abduction',
    muscleGroup: 'legs',
    sets: 3,
    reps: '12-15',
    restSeconds: 60,
    note: 'Control the movement and squeeze your glutes at the outer range.',
    demoUrl: v('hip_abduction.mp4'),
  },

  // --------------------
  // CHEST
  // --------------------
  machineChestPress: {
    id: 'machine-chest-press',
    name: 'Machine Chest Press',
    muscleGroup: 'chest',
    sets: 3,
    reps: '8-12',
    restSeconds: 90,
    note: 'Press with control and avoid locking your elbows aggressively.',
    demoUrl: v('machine_chest_press.mp4'),
  },
  benchPress: {
    id: 'bench-press',
    name: 'Bench Press',
    muscleGroup: 'chest',
    sets: 4,
    reps: '6-8',
    restSeconds: 120,
    note: 'Keep your shoulder blades tight and press with control.',
    demoUrl: v('bench_press.mp4'),
  },
  inclineBarbellBenchPress: {
    id: 'incline-bb-bench-press',
    name: 'Incline BB Bench Press',
    muscleGroup: 'chest',
    sets: 4,
    reps: '6-10',
    restSeconds: 120,
    note: 'Keep your upper back tight and press slightly upward with control.',
    demoUrl: v('incline_bb_bench_press.mp4'),
  },
  inclineDumbbellPress: {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'chest',
    sets: 3,
    reps: '8-10',
    restSeconds: 90,
    note: 'Press upward with control and keep your shoulders stable.',
    demoUrl: v('incline_dumbbell_press.mp4'),
  },
  upperCableFly: {
    id: 'upper-cable-fly',
    name: 'Upper Cable Fly',
    muscleGroup: 'chest',
    sets: 3,
    reps: '12-15',
    restSeconds: 60,
    note: 'Bring the handles upward and inward, focusing on upper chest squeeze.',
    demoUrl: v('upper_cable_fly.mp4'),
  },
  lowerCableFly: {
    id: 'lower-cable-fly',
    name: 'Lower Cable Fly',
    muscleGroup: 'chest',
    sets: 3,
    reps: '12-15',
    restSeconds: 60,
    note: 'Bring the handles downward and inward with slow control.',
    demoUrl: v('lower_cable_fly.mp4'),
  },

  // --------------------
  // BACK
  // --------------------
  latPulldown: {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    muscleGroup: 'back',
    sets: 3,
    reps: '10-12',
    restSeconds: 75,
    note: 'Pull your elbows down and squeeze your back at the bottom.',
    demoUrl: v('lat_pulldown.mp4'),
  },
  singleArmLatPulldown: {
    id: 'single-arm-lat-pulldown',
    name: 'Single Arm Lat Pull Down',
    muscleGroup: 'back',
    sets: 3,
    reps: '10-12 each side',
    restSeconds: 75,
    note: 'Pull your elbow toward your hip and feel one lat working at a time.',
    demoUrl: v('single_arm_lat_pull_down.mp4'),
  },
  seatedRow: {
    id: 'seated-row',
    name: 'Seated Cable Row',
    muscleGroup: 'back',
    sets: 3,
    reps: '10-12',
    restSeconds: 75,
    note: 'Pull toward your lower ribs and squeeze your shoulder blades.',
    demoUrl: v('seated_row.mp4'),
  },
  lowRow: {
    id: 'low-row',
    name: 'Low Row',
    muscleGroup: 'back',
    sets: 3,
    reps: '8-12',
    restSeconds: 90,
    note: 'Pull low toward your waist and keep your torso stable.',
    demoUrl: v('low_row.mp4'),
  },
  linearBentOverRow: {
    id: 'linear-bent-over-row',
    name: 'Linear Bent Over Row',
    muscleGroup: 'back',
    sets: 3,
    reps: '8-10',
    restSeconds: 90,
    note: 'Hinge at your hips, keep your spine neutral and row with control.',
    demoUrl: v('linear_bent_over_row.mp4'),
  },
  assistedPullUp: {
    id: 'assisted-pull-up',
    name: 'Assisted Pull-up',
    muscleGroup: 'back',
    sets: 3,
    reps: '6-10',
    restSeconds: 90,
    note: 'Pull your chest toward the bar and control the way down.',
    demoUrl: v('assisted_pull_up.mp4'),
  },

  // --------------------
  // SHOULDERS
  // --------------------
  dumbbellShoulderPress: {
    id: 'dumbbell-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    muscleGroup: 'shoulders',
    sets: 3,
    reps: '8-10',
    restSeconds: 90,
    note: 'Keep your ribs down and press the dumbbells overhead smoothly.',
    demoUrl: v('dumbbell_shoulder_press.mp4'),
  },
  lateralRaise: {
    id: 'lateral-raise',
    name: 'Lateral Raise',
    muscleGroup: 'shoulders',
    sets: 3,
    reps: '12-15',
    restSeconds: 60,
    note: 'Raise with control and avoid shrugging your shoulders.',
    demoUrl: v('lateral_raise.mp4'),
  },

  // --------------------
  // BICEPS
  // --------------------
  dumbbellCurl: {
    id: 'dumbbell-curl',
    name: 'Dumbbell Curl',
    muscleGroup: 'biceps',
    sets: 2,
    reps: '10-12',
    restSeconds: 60,
    note: 'Keep your elbows close to your body and avoid swinging.',
    demoUrl: v('dumbbell_curl.mp4'),
  },
  dbHammerCurl: {
    id: 'db-hammer-curl',
    name: 'DB Hammer Curl',
    muscleGroup: 'biceps',
    sets: 3,
    reps: '10-12',
    restSeconds: 60,
    note: 'Keep your palms facing each other and curl without swinging.',
    demoUrl: v('db_hammer_curl.mp4'),
  },
  normalGripEzBbCurl: {
    id: 'normal-grip-ez-bb-curl',
    name: 'Normal Grip EZ BB Curl',
    muscleGroup: 'biceps',
    sets: 3,
    reps: '8-12',
    restSeconds: 60,
    note: 'Use a shoulder-width grip and keep your elbows steady.',
    demoUrl: v('normal_grip_ez_bb_curl.mp4'),
  },
  ezBarCurlNarrowGrip: {
    id: 'ez-bar-curl-narrow-grip',
    name: 'EZ Bar Curl Narrow Grip',
    muscleGroup: 'biceps',
    sets: 3,
    reps: '10-12',
    restSeconds: 60,
    note: 'Use a narrow grip to emphasize the outer biceps and control the lowering phase.',
    demoUrl: v('ez_bar_curl_narrow_grip.mp4'),
  },

  // --------------------
  // TRICEPS
  // --------------------
  tricepsPushdown: {
    id: 'triceps-pushdown',
    name: 'Triceps Pushdown',
    muscleGroup: 'triceps',
    sets: 2,
    reps: '10-12',
    restSeconds: 60,
    note: 'Lock your elbows near your sides and fully extend with control.',
    demoUrl: v('triceps_pushdown.mp4'),
  },
  dbTricepsExtension: {
    id: 'db-triceps-extension',
    name: 'DB Triceps Extension',
    muscleGroup: 'triceps',
    sets: 3,
    reps: '10-12',
    restSeconds: 60,
    note: 'Keep your upper arm stable and extend the dumbbell with control.',
    demoUrl: v('db_triceps_extension.mp4'),
  },
  dbOverheadTricepsExtension: {
    id: 'db-overhead-triceps-extension',
    name: 'DB Overhead Triceps Extension',
    muscleGroup: 'triceps',
    sets: 3,
    reps: '10-12',
    restSeconds: 60,
    note: 'Keep elbows pointing forward and stretch the triceps at the bottom.',
    demoUrl: v('db_overhead_triceps_extension.mp4'),
  },

  // --------------------
  // CORE / CARDIO
  // --------------------
  plank: {
    id: 'plank',
    name: 'Plank',
    muscleGroup: 'core',
    sets: 3,
    reps: '30-45 sec',
    restSeconds: 60,
    note: 'Keep your body straight and avoid dropping your hips.',
    demoUrl: v('plank.mp4'),
  },
  deadBug: {
    id: 'dead-bug',
    name: 'Dead Bug',
    muscleGroup: 'core',
    sets: 3,
    reps: '10 each side',
    restSeconds: 45,
    note: 'Keep your lower back close to the floor and move slowly.',
    demoUrl: v('dead_bug.mp4'),
  },
  cableCrunch: {
    id: 'cable-crunch',
    name: 'Cable Crunch',
    muscleGroup: 'core',
    sets: 3,
    reps: '12-15',
    restSeconds: 60,
    note: 'Crunch with control and avoid pulling only with your arms.',
    demoUrl: v('cable_crunch.mp4'),
  },
  treadmillWalk: {
    id: 'treadmill-walk',
    name: 'Incline Treadmill Walk',
    muscleGroup: 'cardio',
    sets: 1,
    reps: '8-12 min',
    restSeconds: 30,
    note: 'Keep a steady pace. You should be able to talk but still feel challenged.',
    demoUrl: v('incline_treadmill_walk.mp4'),
  },
};

type ExerciseKey = keyof typeof EXERCISES;
type ExerciseSpec =
  | ExerciseKey
  | [ExerciseKey, Partial<SmartGymExercise>];

const cloneExercise = (
  key: ExerciseKey,
  override?: Partial<SmartGymExercise>,
): SmartGymExercise => ({
  ...EXERCISES[key],
  ...override,
});

const makeExercises = (
  specs: ExerciseSpec[],
): SmartGymExercise[] => {
  return specs.map((spec) => {
    if (Array.isArray(spec)) {
      return cloneExercise(spec[0], spec[1]);
    }

    return cloneExercise(spec);
  });
};

const weeklyExercises = (
  variants: ExerciseSpec[][],
  weekVariant: number,
): SmartGymExercise[] => {
  const selected = variants[weekVariant % variants.length];

  return makeExercises(selected);
};

export const loadUserGymProfile = async (): Promise<UserGymProfile | null> => {
  try {
    const raw = await AsyncStorage.getItem(USER_PROFILE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveGymDaysPerWeek = async (
  days: TrainingDaysPerWeek,
) => {
  await AsyncStorage.setItem(GYM_DAYS_KEY, String(days));
};

export const loadGymDaysPerWeek = async (): Promise<TrainingDaysPerWeek> => {
  const raw = await AsyncStorage.getItem(GYM_DAYS_KEY);
  const n = Number(raw);

  if (n === 3 || n === 4 || n === 5 || n === 6) {
    return n;
  }

  return 4;
};

const calcBmi = (profile?: UserGymProfile | null) => {
  if (!profile?.heightCm || !profile?.weightKg) {
    return null;
  }

  const h = profile.heightCm / 100;

  if (!h) {
    return null;
  }

  return profile.weightKg / (h * h);
};

const shouldUseLightPlan = (profile?: UserGymProfile | null) => {
  return !!profile?.injured || Number(profile?.age || 0) >= 45;
};

const shouldAddCardio = (profile?: UserGymProfile | null) => {
  const bmi = calcBmi(profile);
  const goal = String(profile?.goal || '').toLowerCase();

  return (
    (!!bmi && bmi >= 25) ||
    goal.includes('lose') ||
    goal.includes('fat') ||
    goal.includes('recomp')
  );
};

const personalizeExercise = (
  exercise: SmartGymExercise,
  profile?: UserGymProfile | null,
): SmartGymExercise => {
  const light = shouldUseLightPlan(profile);
  const bmi = calcBmi(profile);

  let next = { ...exercise };

  if (light) {
    next = {
      ...next,
      sets: Math.max(2, next.sets - 1),
      restSeconds: next.restSeconds + 15,
      note: `${next.note} Use a comfortable weight and avoid painful range of motion.`,
    };
  }

  if (bmi && bmi >= 30 && next.muscleGroup === 'legs') {
    next = {
      ...next,
      reps: next.reps.includes('6-8') ? '8-10' : next.reps,
      note: `${next.note} Keep the load moderate and prioritize joint-friendly control.`,
    };
  }

  return next;
};

const makeDay = (
  dayNumber: number,
  title: string,
  focus: string,
  durationMin: number,
  intensity: SmartGymDay['intensity'],
  exercises: SmartGymExercise[],
  profile?: UserGymProfile | null,
): SmartGymDay => {
  const personalized = exercises.map((item) =>
    personalizeExercise(item, profile),
  );

  return {
    id: `day-${dayNumber}`,
    dayNumber,
    title,
    focus,
    durationMin,
    intensity,
    exercises: personalized,
  };
};

const addCardioIfNeeded = (
  day: SmartGymDay,
  profile?: UserGymProfile | null,
): SmartGymDay => {
  if (!shouldAddCardio(profile)) {
    return day;
  }

  const hasCardio = day.exercises.some(
    (item) => item.muscleGroup === 'cardio',
  );

  if (hasCardio) {
    return day;
  }

  return {
    ...day,
    durationMin: day.durationMin + 10,
    exercises: [
      ...day.exercises,
      personalizeExercise(cloneExercise('treadmillWalk'), profile),
    ],
  };
};

export const getGymPlanAdvice = (
  daysPerWeek: TrainingDaysPerWeek,
  profile?: UserGymProfile | null,
) => {
  const age = Number(profile?.age || 0);
  const bmi = calcBmi(profile);
  const weekNumber = getAutoGymWeekNumber();

  if (!profile) {
    return `Week ${weekNumber}: Complete your profile to personalize this gym schedule.`;
  }

  if (profile.injured) {
    return `Week ${weekNumber}: Recommended ${daysPerWeek} days/week with lighter load, longer rest and joint-friendly exercise rotation.`;
  }

  if (age >= 45) {
    return `Week ${weekNumber}: Recommended ${daysPerWeek} days/week with moderate intensity, longer rest and controlled tempo.`;
  }

  if (bmi && bmi >= 30) {
    return `Week ${weekNumber}: Recommended ${daysPerWeek} days/week with strength training plus short cardio finishers for better fat-loss support.`;
  }

  if (daysPerWeek >= 5) {
    return `Week ${weekNumber}: Rotating exercises weekly to train each muscle group with enough recovery.`;
  }

  return `Week ${weekNumber}: Balanced plan for strength, muscle gain and recovery with weekly exercise variation.`;
};

export const buildSmartGymPlan = (
  daysPerWeek: TrainingDaysPerWeek,
  profile?: UserGymProfile | null,
): SmartGymPlan => {
  const light = shouldUseLightPlan(profile);
  const weekNumber = getAutoGymWeekNumber();
  const weekVariant = getAutoGymWeekVariant();

  let days: SmartGymDay[] = [];

  if (daysPerWeek === 3) {
    days = [
      makeDay(
        1,
        'Full Body A',
        'Chest • Back • Legs',
        light ? 40 : 50,
        light ? 'light' : 'moderate',
        weeklyExercises(
          [
            [
              light ? 'gobletSquat' : 'squat',
              light ? 'machineChestPress' : 'benchPress',
              'latPulldown',
              'seatedRow',
              'dumbbellCurl',
              'plank',
            ],
            [
              'hackSquat',
              light ? 'machineChestPress' : 'inclineBarbellBenchPress',
              'singleArmLatPulldown',
              'lowRow',
              'dbHammerCurl',
              'cableCrunch',
            ],
            [
              'legPress',
              'upperCableFly',
              'latPulldown',
              'linearBentOverRow',
              'normalGripEzBbCurl',
              'deadBug',
            ],
            [
              'gobletSquat',
              'machineChestPress',
              'seatedRow',
              'lowerCableFly',
              'dbOverheadTricepsExtension',
              'plank',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        2,
        'Full Body B',
        'Legs • Shoulders • Arms',
        light ? 40 : 50,
        light ? 'light' : 'moderate',
        weeklyExercises(
          [
            [
              'romanianDeadlift',
              'hipThrust',
              'hipAbduction',
              'dumbbellShoulderPress',
              'dbTricepsExtension',
              'deadBug',
            ],
            [
              light ? 'legPress' : 'squat',
              'legPress',
              'hipAbduction',
              'lateralRaise',
              'tricepsPushdown',
              'plank',
            ],
            [
              'hackSquat',
              'romanianDeadlift',
              'hipThrust',
              'dumbbellShoulderPress',
              'dbOverheadTricepsExtension',
              'cableCrunch',
            ],
            [
              'legPress',
              'gobletSquat',
              'hipAbduction',
              'lateralRaise',
              'ezBarCurlNarrowGrip',
              'deadBug',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        3,
        'Full Body C',
        'Strength • Core • Conditioning',
        light ? 45 : 55,
        light ? 'light' : 'moderate',
        weeklyExercises(
          [
            [
              'legPress',
              'inclineDumbbellPress',
              'singleArmLatPulldown',
              'lowRow',
              'hipThrust',
              'cableCrunch',
            ],
            [
              'hackSquat',
              'machineChestPress',
              'latPulldown',
              'linearBentOverRow',
              'dbHammerCurl',
              'plank',
            ],
            [
              light ? 'gobletSquat' : 'squat',
              'upperCableFly',
              'seatedRow',
              'lowerCableFly',
              'dbTricepsExtension',
              'deadBug',
            ],
            [
              'romanianDeadlift',
              light ? 'machineChestPress' : 'inclineBarbellBenchPress',
              'assistedPullUp',
              'lowRow',
              'dumbbellCurl',
              'cableCrunch',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
    ];
  }

  if (daysPerWeek === 4) {
    days = [
      makeDay(
        1,
        'Upper Body A',
        'Chest • Back • Shoulders',
        light ? 45 : 55,
        light ? 'light' : 'moderate',
        weeklyExercises(
          [
            [
              light ? 'machineChestPress' : 'benchPress',
              'latPulldown',
              'inclineDumbbellPress',
              'seatedRow',
              'lateralRaise',
              'plank',
            ],
            [
              light ? 'machineChestPress' : 'inclineBarbellBenchPress',
              'singleArmLatPulldown',
              'upperCableFly',
              'lowRow',
              'dumbbellShoulderPress',
              'cableCrunch',
            ],
            [
              'machineChestPress',
              'linearBentOverRow',
              'lowerCableFly',
              'latPulldown',
              'lateralRaise',
              'deadBug',
            ],
            [
              light ? 'machineChestPress' : 'benchPress',
              'assistedPullUp',
              'inclineDumbbellPress',
              'seatedRow',
              'dumbbellShoulderPress',
              'plank',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        2,
        'Lower Body A',
        'Quads • Hamstrings • Core',
        light ? 45 : 55,
        light ? 'light' : 'moderate',
        weeklyExercises(
          [
            [
              light ? 'gobletSquat' : 'squat',
              'romanianDeadlift',
              'legPress',
              'hipThrust',
              'deadBug',
            ],
            [
              'hackSquat',
              'legPress',
              'hipAbduction',
              'romanianDeadlift',
              'plank',
            ],
            [
              'legPress',
              'hipThrust',
              'gobletSquat',
              'hipAbduction',
              'cableCrunch',
            ],
            [
              light ? 'gobletSquat' : 'squat',
              'hackSquat',
              'romanianDeadlift',
              'hipThrust',
              'deadBug',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        3,
        'Upper Body B',
        'Back • Chest • Arms',
        light ? 45 : 55,
        light ? 'light' : 'moderate',
        weeklyExercises(
          [
            [
              'seatedRow',
              'machineChestPress',
              'latPulldown',
              'dumbbellShoulderPress',
              'dumbbellCurl',
              'tricepsPushdown',
            ],
            [
              'lowRow',
              'upperCableFly',
              'singleArmLatPulldown',
              'lateralRaise',
              'dbHammerCurl',
              'dbOverheadTricepsExtension',
            ],
            [
              'linearBentOverRow',
              light ? 'machineChestPress' : 'inclineBarbellBenchPress',
              'latPulldown',
              'lowerCableFly',
              'normalGripEzBbCurl',
              'dbTricepsExtension',
            ],
            [
              'seatedRow',
              'machineChestPress',
              'assistedPullUp',
              'dumbbellShoulderPress',
              'ezBarCurlNarrowGrip',
              'tricepsPushdown',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        4,
        'Lower Body B',
        'Glutes • Legs • Core',
        light ? 45 : 55,
        light ? 'light' : 'moderate',
        weeklyExercises(
          [
            [
              'legPress',
              'hipThrust',
              'romanianDeadlift',
              'gobletSquat',
              'cableCrunch',
            ],
            [
              'hackSquat',
              'hipAbduction',
              'legPress',
              'romanianDeadlift',
              'plank',
            ],
            [
              light ? 'gobletSquat' : 'squat',
              'hipThrust',
              'hipAbduction',
              'legPress',
              'deadBug',
            ],
            [
              'legPress',
              'romanianDeadlift',
              'hackSquat',
              'hipThrust',
              'cableCrunch',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
    ];
  }

  if (daysPerWeek === 5) {
    days = [
      makeDay(
        1,
        'Push Day',
        'Chest • Shoulders • Triceps',
        light ? 45 : 60,
        light ? 'moderate' : 'hard',
        weeklyExercises(
          [
            [
              light ? 'machineChestPress' : 'benchPress',
              'inclineDumbbellPress',
              'dumbbellShoulderPress',
              'lateralRaise',
              'tricepsPushdown',
            ],
            [
              light ? 'machineChestPress' : 'inclineBarbellBenchPress',
              'upperCableFly',
              'dumbbellShoulderPress',
              'dbOverheadTricepsExtension',
              'lateralRaise',
            ],
            [
              'machineChestPress',
              'lowerCableFly',
              'inclineDumbbellPress',
              'lateralRaise',
              'dbTricepsExtension',
            ],
            [
              light ? 'machineChestPress' : 'benchPress',
              'upperCableFly',
              'dumbbellShoulderPress',
              'tricepsPushdown',
              'dbOverheadTricepsExtension',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        2,
        'Pull Day',
        'Back • Biceps',
        light ? 45 : 60,
        light ? 'moderate' : 'hard',
        weeklyExercises(
          [
            [
              'latPulldown',
              'seatedRow',
              light ? 'latPulldown' : 'assistedPullUp',
              'dumbbellCurl',
              'plank',
            ],
            [
              'singleArmLatPulldown',
              'lowRow',
              'linearBentOverRow',
              'dbHammerCurl',
              'deadBug',
            ],
            [
              'latPulldown',
              'seatedRow',
              'lowRow',
              'normalGripEzBbCurl',
              'cableCrunch',
            ],
            [
              'assistedPullUp',
              'linearBentOverRow',
              'singleArmLatPulldown',
              'ezBarCurlNarrowGrip',
              'plank',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        3,
        'Legs Day',
        'Quads • Hamstrings • Glutes',
        light ? 45 : 60,
        light ? 'moderate' : 'hard',
        weeklyExercises(
          [
            [
              light ? 'gobletSquat' : 'squat',
              'romanianDeadlift',
              'legPress',
              'hipThrust',
              'deadBug',
            ],
            [
              'hackSquat',
              'legPress',
              'hipAbduction',
              'romanianDeadlift',
              'plank',
            ],
            [
              'legPress',
              'hipThrust',
              light ? 'gobletSquat' : 'squat',
              'hipAbduction',
              'cableCrunch',
            ],
            [
              'hackSquat',
              'romanianDeadlift',
              'legPress',
              'hipThrust',
              'deadBug',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        4,
        'Upper Hypertrophy',
        'Chest • Back • Arms',
        light ? 45 : 55,
        'moderate',
        weeklyExercises(
          [
            [
              'machineChestPress',
              'seatedRow',
              'inclineDumbbellPress',
              'latPulldown',
              'dumbbellCurl',
              'tricepsPushdown',
            ],
            [
              'upperCableFly',
              'lowRow',
              'singleArmLatPulldown',
              'lowerCableFly',
              'dbHammerCurl',
              'dbTricepsExtension',
            ],
            [
              light ? 'machineChestPress' : 'inclineBarbellBenchPress',
              'linearBentOverRow',
              'latPulldown',
              'lowerCableFly',
              'normalGripEzBbCurl',
              'dbOverheadTricepsExtension',
            ],
            [
              'machineChestPress',
              'seatedRow',
              'upperCableFly',
              'singleArmLatPulldown',
              'ezBarCurlNarrowGrip',
              'tricepsPushdown',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        5,
        'Lower + Core',
        'Legs • Glutes • Core',
        light ? 40 : 55,
        'moderate',
        weeklyExercises(
          [
            [
              'legPress',
              'hipThrust',
              'romanianDeadlift',
              'plank',
              'cableCrunch',
            ],
            [
              'hackSquat',
              'hipAbduction',
              'gobletSquat',
              'deadBug',
              'cableCrunch',
            ],
            [
              light ? 'gobletSquat' : 'squat',
              'legPress',
              'hipThrust',
              'plank',
              'deadBug',
            ],
            [
              'romanianDeadlift',
              'hipAbduction',
              'hackSquat',
              'cableCrunch',
              'plank',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
    ];
  }

  if (daysPerWeek === 6) {
    days = [
      makeDay(
        1,
        'Push A',
        'Chest • Shoulders • Triceps',
        light ? 45 : 55,
        light ? 'moderate' : 'hard',
        weeklyExercises(
          [
            [
              light ? 'machineChestPress' : 'benchPress',
              'inclineDumbbellPress',
              'dumbbellShoulderPress',
              'tricepsPushdown',
            ],
            [
              light ? 'machineChestPress' : 'inclineBarbellBenchPress',
              'upperCableFly',
              'dumbbellShoulderPress',
              'dbOverheadTricepsExtension',
            ],
            [
              'machineChestPress',
              'lowerCableFly',
              'lateralRaise',
              'dbTricepsExtension',
            ],
            [
              light ? 'machineChestPress' : 'benchPress',
              'upperCableFly',
              'lateralRaise',
              'tricepsPushdown',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        2,
        'Pull A',
        'Back • Biceps',
        light ? 45 : 55,
        light ? 'moderate' : 'hard',
        weeklyExercises(
          [
            [
              'latPulldown',
              'seatedRow',
              'assistedPullUp',
              'dumbbellCurl',
            ],
            [
              'singleArmLatPulldown',
              'lowRow',
              'linearBentOverRow',
              'dbHammerCurl',
            ],
            [
              'latPulldown',
              'seatedRow',
              'normalGripEzBbCurl',
              'deadBug',
            ],
            [
              'assistedPullUp',
              'linearBentOverRow',
              'ezBarCurlNarrowGrip',
              'plank',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        3,
        'Legs A',
        'Quads • Hamstrings',
        light ? 45 : 60,
        light ? 'moderate' : 'hard',
        weeklyExercises(
          [
            [
              light ? 'gobletSquat' : 'squat',
              'romanianDeadlift',
              'legPress',
              'plank',
            ],
            [
              'hackSquat',
              'legPress',
              'hipAbduction',
              'deadBug',
            ],
            [
              'legPress',
              'romanianDeadlift',
              'gobletSquat',
              'cableCrunch',
            ],
            [
              'hackSquat',
              'hipThrust',
              'romanianDeadlift',
              'plank',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        4,
        'Push B',
        'Chest • Shoulders',
        light ? 40 : 50,
        'moderate',
        weeklyExercises(
          [
            [
              'machineChestPress',
              'inclineDumbbellPress',
              'lateralRaise',
              'dbTricepsExtension',
            ],
            [
              'upperCableFly',
              'dumbbellShoulderPress',
              'lowerCableFly',
              'dbOverheadTricepsExtension',
            ],
            [
              light ? 'machineChestPress' : 'inclineBarbellBenchPress',
              'lateralRaise',
              'tricepsPushdown',
              'plank',
            ],
            [
              'machineChestPress',
              'upperCableFly',
              'dumbbellShoulderPress',
              'dbTricepsExtension',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        5,
        'Pull B',
        'Back • Arms',
        light ? 40 : 50,
        'moderate',
        weeklyExercises(
          [
            [
              'latPulldown',
              'seatedRow',
              'dumbbellCurl',
              'deadBug',
            ],
            [
              'singleArmLatPulldown',
              'lowRow',
              'dbHammerCurl',
              'plank',
            ],
            [
              'linearBentOverRow',
              'latPulldown',
              'normalGripEzBbCurl',
              'cableCrunch',
            ],
            [
              'seatedRow',
              'singleArmLatPulldown',
              'ezBarCurlNarrowGrip',
              'deadBug',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
      makeDay(
        6,
        'Legs B',
        'Glutes • Legs • Core',
        light ? 40 : 50,
        'moderate',
        weeklyExercises(
          [
            [
              'legPress',
              'hipThrust',
              'romanianDeadlift',
              'cableCrunch',
            ],
            [
              'hackSquat',
              'hipAbduction',
              'gobletSquat',
              'plank',
            ],
            [
              light ? 'gobletSquat' : 'squat',
              'hipThrust',
              'legPress',
              'deadBug',
            ],
            [
              'romanianDeadlift',
              'hipAbduction',
              'hackSquat',
              'cableCrunch',
            ],
          ],
          weekVariant,
        ),
        profile,
      ),
    ];
  }

  const finalDays = days.map((day, index) => {
    if (index % 2 === 0) {
      return addCardioIfNeeded(day, profile);
    }

    return day;
  });

  return {
    id: `smart-gym-${daysPerWeek}`,
    daysPerWeek,
    title: `${daysPerWeek}-Day Smart Gym Plan`,
    description:
      'Personalized gym schedule based on your profile, recovery and selected training frequency.',
    advice: getGymPlanAdvice(daysPerWeek, profile),
    days: finalDays,
  };
};