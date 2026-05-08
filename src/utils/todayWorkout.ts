// FILE: src/utils/todayWorkout.ts
import { WorkoutProgram, WorkoutDay, generateProgramDays } from '../data/programs';

export type TodayWorkout =
  | {
      kind: 'workout';
      program: WorkoutProgram;
      day: WorkoutDay;
    }
  | {
      kind: 'rest';
      program: WorkoutProgram;
      day: WorkoutDay;
    };

export function getTodayWorkoutFromActivePrograms(
  programs: WorkoutProgram[],
  completedMaps: Record<string, Record<string, boolean>>
): TodayWorkout | null {
  for (const program of programs) {
    const days = generateProgramDays(program);
    const completed = completedMaps[program.id] || {};

    // lấy item tiếp theo chưa hoàn thành, kể cả rest day
    const nextItem = days.find((day) => !completed[day.id]);

    if (nextItem) {
      if (nextItem.isRest) {
        return { kind: 'rest', program, day: nextItem };
      }
      return { kind: 'workout', program, day: nextItem };
    }

    // fallback nếu đã hoàn thành hết
    const fallbackWorkout = days.find((day) => !day.isRest);
    if (fallbackWorkout) {
      return { kind: 'workout', program, day: fallbackWorkout };
    }
  }

  return null;
}