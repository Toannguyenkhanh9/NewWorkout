// FILE: src/store/workoutHistory.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const WORKOUT_HISTORY_KEY = 'history:workouts';

export type WorkoutHistoryEntry = {
  id: string;
  programId: string;
  dayId: string;
  workoutName: string;
  durationMin?: number;
  completedAt: number;
};

async function readHistory(): Promise<WorkoutHistoryEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(WORKOUT_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function writeHistory(items: WorkoutHistoryEntry[]) {
  await AsyncStorage.setItem(WORKOUT_HISTORY_KEY, JSON.stringify(items));
}

export async function addWorkoutHistory(entry: Omit<WorkoutHistoryEntry, 'id' | 'completedAt'>) {
  const items = await readHistory();

  const exists = items.some(
    (x) => x.programId === entry.programId && x.dayId === entry.dayId
  );
  if (exists) return false;

  const next: WorkoutHistoryEntry = {
    ...entry,
    id: `${entry.programId}:${entry.dayId}`,
    completedAt: Date.now(),
  };

  const updated = [next, ...items];
  await writeHistory(updated);
  return true;
}

export async function getWorkoutHistory(limit?: number): Promise<WorkoutHistoryEntry[]> {
  const items = await readHistory();
  return typeof limit === 'number' ? items.slice(0, limit) : items;
}

export async function getWeeklyWorkoutCount(days = 7): Promise<number> {
  const items = await readHistory();
  const from = Date.now() - days * 24 * 60 * 60 * 1000;
  return items.filter((x) => x.completedAt >= from).length;
}

export async function getTotalWorkoutMinutes(days = 7): Promise<number> {
  const items = await readHistory();
  const from = Date.now() - days * 24 * 60 * 60 * 1000;
  return items
    .filter((x) => x.completedAt >= from)
    .reduce((sum, x) => sum + (x.durationMin || 0), 0);
}