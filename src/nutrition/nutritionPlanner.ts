// FILE: src/nutrition/nutritionPlanner.ts
import { ProfileInput } from '../recommendation/programRecommender';

export type NutritionPlan = {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  waterLiters: number;
  meals: string[];
  tips: string[];
};

function calcBMR(profile: ProfileInput) {
  const weight = profile.weightKg ?? 70;
  const height = profile.heightCm ?? 170;
  const age = profile.age ?? 30;

  if (profile.gender === 'female') {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return 10 * weight + 6.25 * height - 5 * age + 5;
}

export function buildNutritionPlan(profile: ProfileInput | null | undefined): NutritionPlan | null {
  if (!profile?.weightKg || !profile?.heightCm) return null;

  const weight = profile.weightKg;
  const bmr = calcBMR(profile);
  const maintenance = Math.round(bmr * 1.35);

  let calories = maintenance;
  switch (profile.goal) {
    case 'lose_weight':
      calories = Math.round(maintenance - 400);
      break;
    case 'build_muscle':
      calories = Math.round(maintenance + 250);
      break;
    case 'recomp':
      calories = Math.round(maintenance - 150);
      break;
    case 'endurance':
      calories = Math.round(maintenance + 150);
      break;
    default:
      calories = maintenance;
  }

  let proteinPerKg = 1.6;
  switch (profile.goal) {
    case 'lose_weight':
      proteinPerKg = 1.8;
      break;
    case 'build_muscle':
      proteinPerKg = 2.0;
      break;
    case 'recomp':
      proteinPerKg = 2.0;
      break;
    case 'endurance':
      proteinPerKg = 1.6;
      break;
    case 'flexibility':
      proteinPerKg = 1.4;
      break;
    default:
      proteinPerKg = 1.6;
  }

  const proteinG = Math.round(weight * proteinPerKg);
  const fatsG = Math.round(weight * 0.8);
  const proteinCalories = proteinG * 4;
  const fatCalories = fatsG * 9;
  const carbsG = Math.max(50, Math.round((calories - proteinCalories - fatCalories) / 4));
  const waterLiters = +(weight * 0.035).toFixed(1);

  const goal = profile.goal ?? 'maintain';

  const mealsByGoal: Record<string, string[]> = {
    lose_weight: [
      'Breakfast: Greek yogurt + berries + oats',
      'Lunch: Grilled chicken salad + olive oil dressing',
      'Snack: Apple + a handful of almonds',
      'Dinner: Fish + steamed vegetables + sweet potato',
    ],
    build_muscle: [
      'Breakfast: Eggs + oats + banana',
      'Lunch: Chicken rice bowl + vegetables',
      'Snack: Protein shake + peanut butter toast',
      'Dinner: Beef or tofu + rice + vegetables',
    ],
    maintain: [
      'Breakfast: Yogurt + fruit + oats',
      'Lunch: Lean protein + rice/quinoa + greens',
      'Snack: Nuts or boiled eggs',
      'Dinner: Fish/chicken + vegetables + complex carbs',
    ],
    recomp: [
      'Breakfast: Eggs + toast + fruit',
      'Lunch: Turkey or tofu bowl + vegetables',
      'Snack: Protein yogurt',
      'Dinner: Lean protein + potatoes + salad',
    ],
    endurance: [
      'Breakfast: Oatmeal + banana + yogurt',
      'Lunch: Rice + chicken + vegetables',
      'Snack: Fruit + granola bar',
      'Dinner: Pasta/rice + protein + greens',
    ],
    flexibility: [
      'Breakfast: Smoothie + oats',
      'Lunch: Light protein bowl + vegetables',
      'Snack: Fruit + nuts',
      'Dinner: Fish/tofu + greens + brown rice',
    ],
  };

  const tipsByGoal: Record<string, string[]> = {
    lose_weight: [
      'Prioritize protein and fiber at each meal.',
      'Keep liquid calories low.',
      'Aim for steady progress, not extreme restriction.',
    ],
    build_muscle: [
      'Distribute protein across 3–4 meals.',
      'Eat enough carbs around workouts.',
      'Do not skip recovery meals after training.',
    ],
    maintain: [
      'Keep meals balanced and consistent.',
      'Use hunger levels to guide portion size.',
      'Stay active even on non-workout days.',
    ],
    recomp: [
      'Keep protein high and strength training consistent.',
      'Use a small calorie deficit instead of aggressive cutting.',
      'Track waist and strength, not only body weight.',
    ],
    endurance: [
      'Fuel workouts with enough carbs.',
      'Stay hydrated throughout the day.',
      'Add electrolytes after long sweaty sessions if needed.',
    ],
    flexibility: [
      'Keep meals light but nutritious.',
      'Do not under-eat on active days.',
      'Pair mobility work with good hydration and sleep.',
    ],
  };

  return {
    calories,
    proteinG,
    carbsG,
    fatsG,
    waterLiters,
    meals: mealsByGoal[goal] ?? mealsByGoal.maintain,
    tips: tipsByGoal[goal] ?? tipsByGoal.maintain,
  };
}