// FILE: src/services/gymOnboarding.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  TrainingDaysPerWeek,
} from '../data/gymSmartPlan';

import type {
  GymEquipmentMode,
} from './gymAdvanced';

const GYM_ONBOARDING_KEY = 'gym:onboarding:v1';
const USER_PROFILE_KEY = 'user:profile';

export type GymGoal =
  | 'muscle_gain'
  | 'fat_loss'
  | 'tone'
  | 'strength'
  | 'beginner';

export type GymOnboardingData = {
  goal: GymGoal;
  daysPerWeek: TrainingDaysPerWeek;
  equipmentMode: GymEquipmentMode;
  injured: boolean;
  injuryNote?: string;
  completedAt: number;
};

export const loadGymOnboarding =
  async (): Promise<GymOnboardingData | null> => {
    try {
      const raw = await AsyncStorage.getItem(GYM_ONBOARDING_KEY);

      if (!raw) return null;

      const parsed = JSON.parse(raw);

      if (!parsed?.completedAt) return null;

      return parsed;
    } catch {
      return null;
    }
  };

export const saveGymOnboarding = async (
  data: GymOnboardingData,
) => {
  await AsyncStorage.setItem(
    GYM_ONBOARDING_KEY,
    JSON.stringify(data),
  );
};

export const resetGymOnboarding = async () => {
  await AsyncStorage.removeItem(GYM_ONBOARDING_KEY);
};

export const applyGymOnboardingToUserProfile = async (
  data: GymOnboardingData,
) => {
  try {
    const raw = await AsyncStorage.getItem(USER_PROFILE_KEY);
    const current = raw ? JSON.parse(raw) : {};

    const next = {
      ...current,
      injured: data.injured,
      injuryNote: data.injuryNote || current.injuryNote || '',
      healthNote:
        data.injured && data.injuryNote
          ? data.injuryNote
          : current.healthNote || '',
    };

    await AsyncStorage.setItem(
      USER_PROFILE_KEY,
      JSON.stringify(next),
    );
  } catch {
    // ignore profile patch error
  }
};

export const getRecommendedDaysForGoal = (
  goal: GymGoal,
): TrainingDaysPerWeek => {
  if (goal === 'beginner') return 3;
  if (goal === 'strength') return 4;
  if (goal === 'fat_loss') return 5;
  if (goal === 'tone') return 4;

  return 4;
};