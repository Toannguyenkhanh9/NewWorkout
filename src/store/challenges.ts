// FILE: src/store/challenges.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWorkoutHistory } from './workoutHistory';

const ACTIVE_CHALLENGE_KEY = 'challenge:active';

export type ChallengeId = 'starter_7' | 'consistency_30';

export type ChallengeDefinition = {
  id: ChallengeId;
  title: string;
  description: string;
  target: number;
  durationDays: number;
};

export type ActiveChallenge = {
  id: ChallengeId;
  startedAt: number;
};

export type ActiveChallengeState = {
  definition: ChallengeDefinition | null;
  progress: number;
  target: number;
  daysLeft: number;
  completed: boolean;
};

export const CHALLENGES: Record<ChallengeId, ChallengeDefinition> = {
  starter_7: {
    id: 'starter_7',
    title: '7-Day Starter Challenge',
    description: 'Complete 5 workouts in 7 days.',
    target: 5,
    durationDays: 7,
  },
  consistency_30: {
    id: 'consistency_30',
    title: '30-Day Consistency Challenge',
    description: 'Complete 20 workouts in 30 days.',
    target: 20,
    durationDays: 30,
  },
};

export async function startChallenge(id: ChallengeId) {
  const payload: ActiveChallenge = {
    id,
    startedAt: Date.now(),
  };
  await AsyncStorage.setItem(ACTIVE_CHALLENGE_KEY, JSON.stringify(payload));
}

export async function clearChallenge() {
  await AsyncStorage.removeItem(ACTIVE_CHALLENGE_KEY);
}

export async function getActiveChallenge(): Promise<ActiveChallenge | null> {
  try {
    const raw = await AsyncStorage.getItem(ACTIVE_CHALLENGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function getActiveChallengeState(): Promise<ActiveChallengeState | null> {
  const active = await getActiveChallenge();
  if (!active) return null;

  const definition = CHALLENGES[active.id];
  if (!definition) return null;

  const history = await getWorkoutHistory();
  const endAt = active.startedAt + definition.durationDays * 24 * 60 * 60 * 1000;
  const now = Date.now();

  const progress = history.filter(
    (x) => x.completedAt >= active.startedAt && x.completedAt <= endAt
  ).length;

  const daysLeft = Math.max(
    0,
    Math.ceil((endAt - now) / (24 * 60 * 60 * 1000))
  );

  const completed = progress >= definition.target;

  return {
    definition,
    progress,
    target: definition.target,
    daysLeft,
    completed,
  };
}