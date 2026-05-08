// FILE: src/data/programCatalog.ts
import { WorkoutProgram } from './programs';

export type ProgramLevel = 'beginner' | 'intermediate' | 'advanced';
export type ProgramGoalTag =
  | 'lose_weight'
  | 'build_muscle'
  | 'cardio'
  | 'core'
  | 'mobility';

export type ProgramEquipmentNeed = 'with_equipment' | 'no_equipment';
export type ProgramDurationBucket = 'short' | 'medium' | 'long';

export type ProgramCatalogMeta = {
  level: ProgramLevel;
  goals: ProgramGoalTag[];
  equipment: ProgramEquipmentNeed;
};

export const PROGRAM_CATALOG: Record<string, ProgramCatalogMeta> = {
  insanity: {
    level: 'advanced',
    goals: ['lose_weight', 'cardio', 'core'],
    equipment: 'no_equipment',
  },
  max30: {
    level: 'intermediate',
    goals: ['lose_weight', 'cardio', 'core'],
    equipment: 'no_equipment',
  },
  focust25: {
    level: 'beginner',
    goals: ['lose_weight', 'cardio', 'core', 'mobility'],
    equipment: 'no_equipment',
  },
  P90X1: {
    level: 'advanced',
    goals: ['build_muscle', 'core'],
    equipment: 'with_equipment',
  },
  P90X2: {
    level: 'advanced',
    goals: ['build_muscle', 'core', 'mobility'],
    equipment: 'with_equipment',
  },
  HipHopAbs: {
    level: 'beginner',
    goals: ['lose_weight', 'cardio', 'core', 'mobility'],
    equipment: 'no_equipment',
  },
  FourWeeksOfThePrep: {
    level: 'intermediate',
    goals: ['build_muscle', 'cardio', 'core', 'mobility'],
    equipment: 'with_equipment',
  },
  SixWeeksOfTheWork: {
    level: 'advanced',
    goals: ['build_muscle', 'cardio', 'core'],
    equipment: 'with_equipment',
  },
  Transform20: {
    level: 'beginner',
    goals: ['lose_weight', 'cardio', 'core'],
    equipment: 'with_equipment',
  },
  TheAsylum1: {
    level: 'advanced',
    goals: ['cardio', 'core', 'build_muscle'],
    equipment: 'with_equipment',
  },
  TheAsylum2: {
    level: 'advanced',
    goals: ['cardio', 'core', 'build_muscle'],
    equipment: 'with_equipment',
  },
  TheAsyluminsanity: {
    level: 'advanced',
    goals: ['lose_weight', 'cardio', 'core'],
    equipment: 'with_equipment',
  },
  TheAsylump90x: {
    level: 'advanced',
    goals: ['build_muscle', 'cardio', 'core'],
    equipment: 'with_equipment',
  },
};

export function getProgramCatalogMeta(programId: string): ProgramCatalogMeta {
  return (
    PROGRAM_CATALOG[programId] || {
      level: 'intermediate',
      goals: ['cardio', 'core'],
      equipment: 'no_equipment',
    }
  );
}

export function getAverageWorkoutDuration(program: WorkoutProgram): number {
  const workoutDays = (program.plan || []).filter(
    (item) => item.type === 'workout'
  ) as Array<{ durationMin: number }>;

  if (!workoutDays.length) return 0;

  const total = workoutDays.reduce((sum, item) => sum + (item.durationMin || 0), 0);
  return Math.round(total / workoutDays.length);
}

export function getProgramDurationBucket(
  program: WorkoutProgram
): ProgramDurationBucket {
  const avg = getAverageWorkoutDuration(program);

  if (avg <= 30) return 'short';
  if (avg <= 45) return 'medium';
  return 'long';
}