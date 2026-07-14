// FILE: src/services/gymCoach.ts
import type {
  SmartGymExercise,
  UserGymProfile,
  TrainingDaysPerWeek,
} from '../data/gymSmartPlan';
import type {
  GymWorkoutHistoryEntry,
  GymExerciseSetLog,
} from '../store/gymProgress';

const parseNumber = (value?: string | number | null) => {
  if (value === null || value === undefined) return 0;

  const n = Number(String(value).replace(',', '.').replace(/[^\d.]/g, ''));

  return Number.isFinite(n) ? n : 0;
};

const parseTargetHighReps = (reps: string) => {
  const matches = String(reps).match(/\d+/g);

  if (!matches || matches.length === 0) {
    return 10;
  }

  return Number(matches[matches.length - 1]) || 10;
};

const isUpperBody = (exercise: SmartGymExercise) => {
  return [
    'chest',
    'back',
    'shoulders',
    'biceps',
    'triceps',
  ].includes(exercise.muscleGroup);
};

const isLowerBody = (exercise: SmartGymExercise) => {
  return exercise.muscleGroup === 'legs';
};

const getCompletedSets = (sets: GymExerciseSetLog[]) => {
  return sets.filter(item => item.completed);
};

const getBestCompletedWeight = (sets: GymExerciseSetLog[]) => {
  return getCompletedSets(sets).reduce((best, item) => {
    const weight = parseNumber(item.weightKg);
    return Math.max(best, weight);
  }, 0);
};

const getAverageCompletedReps = (sets: GymExerciseSetLog[]) => {
  const completed = getCompletedSets(sets);

  if (completed.length === 0) {
    return 0;
  }

  const total = completed.reduce((sum, item) => {
    return sum + parseNumber(item.reps);
  }, 0);

  return total / completed.length;
};

const findLatestHistoryForExercise = (
  history: GymWorkoutHistoryEntry[],
  exerciseId: string,
) => {
  return history
    .slice()
    .sort((a, b) => b.completedAt - a.completedAt)
    .find(entry =>
      entry.exercises.some(item => item.exerciseId === exerciseId),
    );
};

export const getSuggestedWeightForExercise = (
  history: GymWorkoutHistoryEntry[],
  exercise: SmartGymExercise,
) => {
  const latest = findLatestHistoryForExercise(history, exercise.id);

  if (!latest) {
    return {
      text: 'Start light and focus on technique.',
      suggestedWeightKg: '',
      reason: 'No previous workout data yet.',
    };
  }

  const exerciseLog = latest.exercises.find(
    item => item.exerciseId === exercise.id,
  );

  if (!exerciseLog) {
    return {
      text: 'Start light and focus on technique.',
      suggestedWeightKg: '',
      reason: 'No previous workout data yet.',
    };
  }

  const sets = exerciseLog.sets || [];
  const completedSets = getCompletedSets(sets);
  const bestWeight = getBestCompletedWeight(sets);
  const avgReps = getAverageCompletedReps(sets);
  const targetHigh = parseTargetHighReps(exercise.reps);

  if (!bestWeight || completedSets.length === 0) {
    return {
      text: 'Use a comfortable weight today.',
      suggestedWeightKg: '',
      reason: 'Previous workout was not fully recorded.',
    };
  }

  const allSetsDone = completedSets.length >= exercise.sets;
  const hitTarget = avgReps >= targetHigh;

  let increase = 0;

  if (allSetsDone && hitTarget) {
    increase = isLowerBody(exercise) ? 5 : isUpperBody(exercise) ? 2.5 : 1;
  }

  if (allSetsDone && !hitTarget) {
    return {
      text: `Repeat ${bestWeight}kg today.`,
      suggestedWeightKg: String(bestWeight),
      reason: 'You completed the sets, but reps were not high enough to increase weight.',
    };
  }

  if (!allSetsDone) {
    return {
      text: `Stay around ${bestWeight}kg or reduce slightly.`,
      suggestedWeightKg: String(bestWeight),
      reason: 'Last session was not fully completed.',
    };
  }

  const nextWeight = bestWeight + increase;

  return {
    text: increase > 0
      ? `Try ${nextWeight}kg today.`
      : `Repeat ${bestWeight}kg today.`,
    suggestedWeightKg: increase > 0 ? String(nextWeight) : String(bestWeight),
    reason: increase > 0
      ? 'You completed all sets and reached the target reps.'
      : 'Keep the same load and focus on control.',
  };
};

export const getExerciseSwapSuggestion = (
  exercise: SmartGymExercise,
  profile?: UserGymProfile | null,
) => {
  if (!profile) return null;

  const age = Number(profile.age || 0);
  const injuryText = String(
    profile.injuryNote ||
      profile.healthNote ||
      '',
  ).toLowerCase();

  const injured = !!profile.injured || injuryText.length > 0;

  if (!injured && age < 45) {
    return null;
  }

  if (
    injuryText.includes('knee') ||
    injuryText.includes('đầu gối') ||
    injuryText.includes('gối')
  ) {
    if (
      exercise.id.includes('squat') ||
      exercise.id.includes('leg-press')
    ) {
      return {
        title: 'Joint-friendly option',
        text: 'Because knee issue is noted, use lighter weight, shorter range of motion, or swap to controlled leg press.',
      };
    }
  }

  if (
    injuryText.includes('back') ||
    injuryText.includes('lưng') ||
    injuryText.includes('spine')
  ) {
    if (
      exercise.id.includes('deadlift') ||
      exercise.id.includes('squat')
    ) {
      return {
        title: 'Back-safe option',
        text: 'Because back issue is noted, use a lighter load or swap to machine-based exercise.',
      };
    }
  }

  if (
    injuryText.includes('shoulder') ||
    injuryText.includes('vai')
  ) {
    if (
      exercise.muscleGroup === 'shoulders' ||
      exercise.id.includes('press')
    ) {
      return {
        title: 'Shoulder-safe option',
        text: 'Because shoulder issue is noted, reduce range of motion or swap to machine press with light weight.',
      };
    }
  }

  if (age >= 45) {
    return {
      title: 'Controlled tempo recommended',
      text: 'Use moderate weight, slower tempo and longer rest to reduce joint stress.',
    };
  }

  return null;
};

export const getRecommendedProgramWeeks = (
  daysPerWeek: TrainingDaysPerWeek,
  profile?: UserGymProfile | null,
) => {
  const age = Number(profile?.age || 0);
  const injured = !!profile?.injured;

  if (injured || age >= 45 || daysPerWeek <= 3) {
    return 8;
  }

  return 12;
};

export const getProgramPhaseLabel = (
  week: number,
  totalWeeks: number,
) => {
  if (totalWeeks <= 8) {
    if (week <= 2) return 'Foundation';
    if (week <= 6) return 'Build';
    return 'Peak';
  }

  if (week <= 4) return 'Foundation';
  if (week <= 8) return 'Build';
  return 'Intensify';
};

export const getWeekTrainingAdvice = (
  week: number,
  totalWeeks: number,
) => {
  const phase = getProgramPhaseLabel(week, totalWeeks);

  if (phase === 'Foundation') {
    return 'Focus on technique, stable form and controlled reps.';
  }

  if (phase === 'Build') {
    return 'Increase weight slowly when all sets are completed with good form.';
  }

  return 'Push harder, but keep form clean and avoid training through pain.';
};