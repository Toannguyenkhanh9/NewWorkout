// FILE: src/store/gymProgress.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const makeKey = (programId: string, dayId: string) => {
  return `gymProgress:${programId}:${dayId}`;
};

export type GymDayProgress = {
  completedExercises: Record<string, boolean>;
  completedAt?: number | null;
};

const defaultProgress = (): GymDayProgress => ({
  completedExercises: {},
  completedAt: null,
});

export const loadGymDayProgress = async (
  programId: string,
  dayId: string,
): Promise<GymDayProgress> => {
  try {
    const raw = await AsyncStorage.getItem(makeKey(programId, dayId));

    if (!raw) {
      return defaultProgress();
    }

    return {
      ...defaultProgress(),
      ...JSON.parse(raw),
    };
  } catch {
    return defaultProgress();
  }
};

export const saveGymDayProgress = async (
  programId: string,
  dayId: string,
  progress: GymDayProgress,
) => {
  await AsyncStorage.setItem(
    makeKey(programId, dayId),
    JSON.stringify(progress),
  );
};

export const toggleGymExercise = async (
  programId: string,
  dayId: string,
  exerciseId: string,
) => {
  const current = await loadGymDayProgress(programId, dayId);

  const next: GymDayProgress = {
    ...current,
    completedExercises: {
      ...current.completedExercises,
      [exerciseId]: !current.completedExercises[exerciseId],
    },
  };

  await saveGymDayProgress(programId, dayId, next);

  return next;
};

export const markGymDayCompleted = async (
  programId: string,
  dayId: string,
) => {
  const current = await loadGymDayProgress(programId, dayId);

  const next: GymDayProgress = {
    ...current,
    completedAt: Date.now(),
  };

  await saveGymDayProgress(programId, dayId, next);

  return next;
};