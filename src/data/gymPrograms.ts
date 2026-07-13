// FILE: src/data/gymPrograms.ts

export type GymLevel = 'beginner' | 'intermediate' | 'advanced';

export type GymMuscleGroup =
  | 'chest'
  | 'back'
  | 'legs'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'core'
  | 'fullBody';

export type GymExercise = {
  id: string;
  nameKey: string;
  defaultName: string;
  muscleGroup: GymMuscleGroup;
  sets: number;
  reps: string;
  restSeconds: number;
  noteKey?: string;
  defaultNote?: string;
  videoUrl?: string;
  downloadUrl?: string;
};

export type GymWorkoutDay = {
  id: string;
  dayNumber: number;
  titleKey: string;
  defaultTitle: string;
  focusKey: string;
  defaultFocus: string;
  durationMin: number;
  exercises: GymExercise[];
};

export type GymProgram = {
  id: string;
  titleKey: string;
  defaultTitle: string;
  descKey: string;
  defaultDesc: string;
  level: GymLevel;
  weeks: number;
  daysPerWeek: number;
  premium?: boolean;
  days: GymWorkoutDay[];
};

export const GYM_PROGRAMS: GymProgram[] = [
  {
    id: 'gym-beginner-full-body',
    titleKey: 'gym.programs.beginnerFullBody.title',
    defaultTitle: 'Beginner Full Body',
    descKey: 'gym.programs.beginnerFullBody.desc',
    defaultDesc:
      'A simple 3-day gym plan to build strength, learn technique and train the whole body.',
    level: 'beginner',
    weeks: 8,
    daysPerWeek: 3,
    premium: false,
    days: [
      {
        id: 'full-body-a',
        dayNumber: 1,
        titleKey: 'gym.days.fullBodyA.title',
        defaultTitle: 'Full Body A',
        focusKey: 'gym.days.fullBodyA.focus',
        defaultFocus: 'Chest • Back • Legs',
        durationMin: 45,
        exercises: [
          {
            id: 'goblet-squat',
            nameKey: 'gym.exercises.gobletSquat.name',
            defaultName: 'Goblet Squat',
            muscleGroup: 'legs',
            sets: 3,
            reps: '10-12',
            restSeconds: 90,
            noteKey: 'gym.exercises.gobletSquat.note',
            defaultNote:
              'Keep your chest up, brace your core and control the descent.',
          },
          {
            id: 'machine-chest-press',
            nameKey: 'gym.exercises.machineChestPress.name',
            defaultName: 'Machine Chest Press',
            muscleGroup: 'chest',
            sets: 3,
            reps: '8-12',
            restSeconds: 90,
            noteKey: 'gym.exercises.machineChestPress.note',
            defaultNote:
              'Press with control and avoid locking your elbows aggressively.',
          },
          {
            id: 'lat-pulldown',
            nameKey: 'gym.exercises.latPulldown.name',
            defaultName: 'Lat Pulldown',
            muscleGroup: 'back',
            sets: 3,
            reps: '10-12',
            restSeconds: 75,
            noteKey: 'gym.exercises.latPulldown.note',
            defaultNote:
              'Pull your elbows down and squeeze your back at the bottom.',
          },
          {
            id: 'dumbbell-shoulder-press',
            nameKey: 'gym.exercises.dumbbellShoulderPress.name',
            defaultName: 'Dumbbell Shoulder Press',
            muscleGroup: 'shoulders',
            sets: 3,
            reps: '8-10',
            restSeconds: 75,
            noteKey: 'gym.exercises.dumbbellShoulderPress.note',
            defaultNote:
              'Keep your ribs down and press the dumbbells overhead smoothly.',
          },
          {
            id: 'plank',
            nameKey: 'gym.exercises.plank.name',
            defaultName: 'Plank',
            muscleGroup: 'core',
            sets: 3,
            reps: '30-45 sec',
            restSeconds: 60,
            noteKey: 'gym.exercises.plank.note',
            defaultNote:
              'Keep your body straight and avoid dropping your hips.',
          },
        ],
      },
      {
        id: 'full-body-b',
        dayNumber: 2,
        titleKey: 'gym.days.fullBodyB.title',
        defaultTitle: 'Full Body B',
        focusKey: 'gym.days.fullBodyB.focus',
        defaultFocus: 'Legs • Back • Arms',
        durationMin: 45,
        exercises: [
          {
            id: 'leg-press',
            nameKey: 'gym.exercises.legPress.name',
            defaultName: 'Leg Press',
            muscleGroup: 'legs',
            sets: 3,
            reps: '10-12',
            restSeconds: 90,
            noteKey: 'gym.exercises.legPress.note',
            defaultNote:
              'Keep your feet stable and do not let your knees collapse inward.',
          },
          {
            id: 'seated-row',
            nameKey: 'gym.exercises.seatedRow.name',
            defaultName: 'Seated Cable Row',
            muscleGroup: 'back',
            sets: 3,
            reps: '10-12',
            restSeconds: 75,
            noteKey: 'gym.exercises.seatedRow.note',
            defaultNote:
              'Pull toward your lower ribs and squeeze your shoulder blades.',
          },
          {
            id: 'dumbbell-bench-press',
            nameKey: 'gym.exercises.dumbbellBenchPress.name',
            defaultName: 'Dumbbell Bench Press',
            muscleGroup: 'chest',
            sets: 3,
            reps: '8-10',
            restSeconds: 90,
            noteKey: 'gym.exercises.dumbbellBenchPress.note',
            defaultNote:
              'Lower slowly and press up without bouncing.',
          },
          {
            id: 'dumbbell-curl',
            nameKey: 'gym.exercises.dumbbellCurl.name',
            defaultName: 'Dumbbell Curl',
            muscleGroup: 'biceps',
            sets: 2,
            reps: '10-12',
            restSeconds: 60,
            noteKey: 'gym.exercises.dumbbellCurl.note',
            defaultNote:
              'Keep your elbows close to your body and avoid swinging.',
          },
          {
            id: 'triceps-pushdown',
            nameKey: 'gym.exercises.tricepsPushdown.name',
            defaultName: 'Triceps Pushdown',
            muscleGroup: 'triceps',
            sets: 2,
            reps: '10-12',
            restSeconds: 60,
            noteKey: 'gym.exercises.tricepsPushdown.note',
            defaultNote:
              'Lock your elbows near your sides and fully extend with control.',
          },
        ],
      },
      {
        id: 'full-body-c',
        dayNumber: 3,
        titleKey: 'gym.days.fullBodyC.title',
        defaultTitle: 'Full Body C',
        focusKey: 'gym.days.fullBodyC.focus',
        defaultFocus: 'Strength • Core • Conditioning',
        durationMin: 50,
        exercises: [
          {
            id: 'romanian-deadlift',
            nameKey: 'gym.exercises.romanianDeadlift.name',
            defaultName: 'Romanian Deadlift',
            muscleGroup: 'legs',
            sets: 3,
            reps: '8-10',
            restSeconds: 90,
            noteKey: 'gym.exercises.romanianDeadlift.note',
            defaultNote:
              'Push your hips back, keep your back neutral and feel the hamstrings stretch.',
          },
          {
            id: 'incline-dumbbell-press',
            nameKey: 'gym.exercises.inclineDumbbellPress.name',
            defaultName: 'Incline Dumbbell Press',
            muscleGroup: 'chest',
            sets: 3,
            reps: '8-10',
            restSeconds: 90,
            noteKey: 'gym.exercises.inclineDumbbellPress.note',
            defaultNote:
              'Press upward with control and keep your shoulders stable.',
          },
          {
            id: 'assisted-pull-up',
            nameKey: 'gym.exercises.assistedPullUp.name',
            defaultName: 'Assisted Pull-up',
            muscleGroup: 'back',
            sets: 3,
            reps: '6-10',
            restSeconds: 90,
            noteKey: 'gym.exercises.assistedPullUp.note',
            defaultNote:
              'Pull your chest toward the bar and control the way down.',
          },
          {
            id: 'lateral-raise',
            nameKey: 'gym.exercises.lateralRaise.name',
            defaultName: 'Lateral Raise',
            muscleGroup: 'shoulders',
            sets: 3,
            reps: '12-15',
            restSeconds: 60,
            noteKey: 'gym.exercises.lateralRaise.note',
            defaultNote:
              'Raise with control and avoid shrugging your shoulders.',
          },
          {
            id: 'dead-bug',
            nameKey: 'gym.exercises.deadBug.name',
            defaultName: 'Dead Bug',
            muscleGroup: 'core',
            sets: 3,
            reps: '10 each side',
            restSeconds: 45,
            noteKey: 'gym.exercises.deadBug.note',
            defaultNote:
              'Keep your lower back close to the floor and move slowly.',
          },
        ],
      },
    ],
  },
  {
    id: 'gym-push-pull-legs',
    titleKey: 'gym.programs.pushPullLegs.title',
    defaultTitle: 'Push Pull Legs',
    descKey: 'gym.programs.pushPullLegs.desc',
    defaultDesc:
      'A 6-day split for muscle gain using push, pull and leg training days.',
    level: 'intermediate',
    weeks: 12,
    daysPerWeek: 6,
    premium: true,
    days: [
      {
        id: 'push-day',
        dayNumber: 1,
        titleKey: 'gym.days.push.title',
        defaultTitle: 'Push Day',
        focusKey: 'gym.days.push.focus',
        defaultFocus: 'Chest • Shoulders • Triceps',
        durationMin: 60,
        exercises: [
          {
            id: 'bench-press',
            nameKey: 'gym.exercises.benchPress.name',
            defaultName: 'Bench Press',
            muscleGroup: 'chest',
            sets: 4,
            reps: '6-8',
            restSeconds: 120,
            noteKey: 'gym.exercises.benchPress.note',
            defaultNote:
              'Keep your shoulder blades tight and press with control.',
          },
          {
            id: 'incline-dumbbell-press',
            nameKey: 'gym.exercises.inclineDumbbellPress.name',
            defaultName: 'Incline Dumbbell Press',
            muscleGroup: 'chest',
            sets: 3,
            reps: '8-10',
            restSeconds: 90,
          },
          {
            id: 'dumbbell-shoulder-press',
            nameKey: 'gym.exercises.dumbbellShoulderPress.name',
            defaultName: 'Dumbbell Shoulder Press',
            muscleGroup: 'shoulders',
            sets: 3,
            reps: '8-10',
            restSeconds: 90,
          },
          {
            id: 'lateral-raise',
            nameKey: 'gym.exercises.lateralRaise.name',
            defaultName: 'Lateral Raise',
            muscleGroup: 'shoulders',
            sets: 3,
            reps: '12-15',
            restSeconds: 60,
          },
          {
            id: 'triceps-pushdown',
            nameKey: 'gym.exercises.tricepsPushdown.name',
            defaultName: 'Triceps Pushdown',
            muscleGroup: 'triceps',
            sets: 3,
            reps: '10-12',
            restSeconds: 60,
          },
        ],
      },
      {
        id: 'pull-day',
        dayNumber: 2,
        titleKey: 'gym.days.pull.title',
        defaultTitle: 'Pull Day',
        focusKey: 'gym.days.pull.focus',
        defaultFocus: 'Back • Biceps',
        durationMin: 60,
        exercises: [
          {
            id: 'lat-pulldown',
            nameKey: 'gym.exercises.latPulldown.name',
            defaultName: 'Lat Pulldown',
            muscleGroup: 'back',
            sets: 4,
            reps: '8-10',
            restSeconds: 90,
          },
          {
            id: 'seated-row',
            nameKey: 'gym.exercises.seatedRow.name',
            defaultName: 'Seated Cable Row',
            muscleGroup: 'back',
            sets: 3,
            reps: '10-12',
            restSeconds: 75,
          },
          {
            id: 'assisted-pull-up',
            nameKey: 'gym.exercises.assistedPullUp.name',
            defaultName: 'Assisted Pull-up',
            muscleGroup: 'back',
            sets: 3,
            reps: '6-10',
            restSeconds: 90,
          },
          {
            id: 'dumbbell-curl',
            nameKey: 'gym.exercises.dumbbellCurl.name',
            defaultName: 'Dumbbell Curl',
            muscleGroup: 'biceps',
            sets: 3,
            reps: '10-12',
            restSeconds: 60,
          },
        ],
      },
      {
        id: 'legs-day',
        dayNumber: 3,
        titleKey: 'gym.days.legs.title',
        defaultTitle: 'Legs Day',
        focusKey: 'gym.days.legs.focus',
        defaultFocus: 'Quads • Hamstrings • Glutes',
        durationMin: 65,
        exercises: [
          {
            id: 'squat',
            nameKey: 'gym.exercises.squat.name',
            defaultName: 'Squat',
            muscleGroup: 'legs',
            sets: 4,
            reps: '6-8',
            restSeconds: 120,
            noteKey: 'gym.exercises.squat.note',
            defaultNote:
              'Brace your core, keep your chest up and drive through your feet.',
          },
          {
            id: 'romanian-deadlift',
            nameKey: 'gym.exercises.romanianDeadlift.name',
            defaultName: 'Romanian Deadlift',
            muscleGroup: 'legs',
            sets: 3,
            reps: '8-10',
            restSeconds: 90,
          },
          {
            id: 'leg-press',
            nameKey: 'gym.exercises.legPress.name',
            defaultName: 'Leg Press',
            muscleGroup: 'legs',
            sets: 3,
            reps: '10-12',
            restSeconds: 90,
          },
          {
            id: 'plank',
            nameKey: 'gym.exercises.plank.name',
            defaultName: 'Plank',
            muscleGroup: 'core',
            sets: 3,
            reps: '45 sec',
            restSeconds: 60,
          },
        ],
      },
    ],
  },
];