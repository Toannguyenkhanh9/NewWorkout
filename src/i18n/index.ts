import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANG_KEY = 'app:lang';

const base = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Main",
    "nutrition": "Nutrition",
    "guide": "Guide",
    "premium": "Premium",
    "settings": "Settings",
    "workout": "Workout",
    "more": "More",
    "program": "Program",
    "profile": "User Profile",
    "weightChart": "Weight Chart"
  },
  "home": {
    "title": "Choose your workout plan",
    "subtitle": "Pick a program and train daily",
    "program60": "60-Day Fat Burn Program",
    "program90": "90-Day Full Body Program",
    "daysSuffix": "{{count}} days",
    "health_overview": "Health overview",
    "activeTitle": "Practicing",
    "noActive": "There is no program currently training."
  },
  "program": {
    "daysPrefix": "Day {{day}} • {{weekday}}",
    "weekTitle": "Week {{n}}",
    "completed": "Completed",
    "todayWorkout": "Workout: {{name}}"
  },
  "workouts": {
    "rest": "Recovery / Rest",
    "hiit": "Full-body HIIT",
    "upper": "Chest - Shoulder - Arms",
    "lower": "Glutes - Legs",
    "core": "Abs & Core",
    "pickOne": "Choose a lesson plan to get started",
    "day": "days",
    "heroTitle": "Your daily workout plan",
    "matchingResults": "Matching results",
    "days": "days"
  },
  "guide": {
    "title": "How to Use PulseFit",
    "subtitle": "Follow these simple steps to start your workout journey.",
    "steps": {
      "step1": {
        "badge": "Step 1",
        "title": "Enter your personal information",
        "desc": "Fill in your height, weight, health condition, goals, and other basic information. The app will calculate your BMI and provide health advice to help you get started safely."
      },
      "step2": {
        "badge": "Step 2",
        "title": "Choose a suitable workout program",
        "desc": "Browse the available workout programs and pick the one that best matches your fitness level, goals, and preferences."
      },
      "step3": {
        "badge": "Step 3",
        "title": "Select your workout day",
        "desc": "Open the selected program and choose the training day you want to follow. You can continue step by step based on the workout schedule."
      },
      "step4": {
        "badge": "Step 4",
        "title": "Train with the video",
        "desc": "Follow the workout video to exercise correctly. You can rotate your phone horizontally to watch the video in full screen for a better experience."
      }
    },
    "noteTitle": "Note",
    "note": "Stay consistent with your training schedule to achieve the best results."
  },
  "premium": {
    "title": "Upgrade Premium",
    "removeAds": "Remove ads",
    "allPrograms": "Unlock the full experience",
    "active": "Premium is active",
    "restore": "Restore purchases",
    "restoreTitle": "Restore purchases",
    "restoreSuccess": "Premium restored successfully.",
    "restoreEmpty": "No Premium purchase found.",
    "errorTitle": "Purchase failed",
    "errorText": "Unable to complete purchase.",
    "productUnavailable": "Premium product not found. Please check Play Console / App Store setup.",
    "subUnavailable": "Monthly subscription not found. Please check Play Console / App Store setup.",
    "loading": "Loading...",
    "monthlyTitle": "Monthly Premium",
    "monthlyDesc": "Auto-renews every month to keep Premium active",
    "subscribeMonthly": "Subscribe monthly",
    "lifetimeTitle": "Lifetime Premium",
    "lifetimeDesc": "One-time payment, keep Premium forever",
    "buyLifetime": "Buy lifetime"
  },
  "video": {
    "loading": "Loading video...",
    "play": "Start workout",
    "error": "Unable to play video. Please try again."
  },
  "settings": {
    "title": "Settings",
    "language": "Language",
    "choose": "Choose a language",
    "general": "General",
    "dailyReminder": "Daily Reminder",
    "tapToToggleReminder": "Tap to toggle daily reminder 20:00/07:00",
    "accountAndTraining": "Account & Training",
    workoutReminderKicker: 'WORKOUT REMINDER',
chooseWorkoutReminderTime: 'Choose reminder time',
workoutReminderDesc:
  'Select the time you want to be reminded to train every day.',
hour: 'Hour',
minute: 'Minute',
saveReminder: 'Save',
disableReminder: 'Disable',
reminderOffText: 'Off • tap to choose time',
dailyReminderTitle: "It's practice time! 💪",
dailyReminderBody:
  "Open Insanity Deluxe Edition and complete today's session.",
  },
  "onboard": {
    "title": "Let’s get started 👋",
    "subtitle": "Enter a few details so we can suggest a suitable plan",
    "name": "Full name *",
    "age": "Age *",
    "gender": "Gender *",
    "gender_male": "Male",
    "gender_female": "Female",
    "gender_other": "Other",
    "health": "Health condition",
    "height": "Height (cm) *",
    "weight": "Weight (kg) *",
    "injured_q": "Any injury?",
    "injury_note": "Injury description",
    "goal": "Current goal *",
    "goals": {
      "lose_weight": "Lose weight",
      "build_muscle": "Build muscle",
      "maintain": "Maintain",
      "recomp": "Recomp (lose fat + build muscle)",
      "endurance": "Endurance",
      "flexibility": "Flexibility"
    },
    "tip_title": "Quick tips",
    "tip_1": "If injured, start with low-impact exercises and increase gradually.",
    "tip_2": "Update your weight every 3 days to track progress.",
    "back": "Back",
    "next": "Next",
    "finish": "Finish",
    "saving": "Saving...",
    "bmi": "BMI",
    "bmi_result_title": "Health overview",
    "bmi_label_under": "Underweight",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Overweight",
    "bmi_label_obese": "Obese",
    "advice_intro": "• Your BMI: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Focus on gaining lean mass: full-body/upper-lower at moderate intensity; increase load; adequate protein and calories.",
    "advice_bmi_normal": "• Maintain: mix strength + moderate cardio (2–3 days/week); prioritize technique and sleep.",
    "advice_bmi_over": "• Fat loss: moderate cardio/light HIIT 2–3 days + full-body strength; slight calorie deficit.",
    "advice_bmi_obese": "• Safe fat loss: brisk walk/low-impact cardio + basic strength; monitor HR, increase intensity gradually.",
    "advice_goal_lose_weight": "• Goal: Lose weight → track calories, 1.6–2.2g/kg protein, 7–8h sleep.",
    "advice_goal_build_muscle": "• Goal: Build muscle → progressive overload 3–5 days/week, 1.6–2.2g/kg protein, slight surplus.",
    "advice_goal_maintain": "• Goal: Maintain → 3 days/week, balanced strength + cardio, weigh-in weekly.",
    "advice_goal_recomp": "• Goal: Recomp → basic lifting + high protein, slight deficit, sleep well.",
    "advice_goal_endurance": "• Goal: Endurance → zone 2 + intervals; fuel with carbs pre-workout.",
    "advice_goal_flexibility": "• Goal: Flexibility → daily mobility/ROM 10–20’, add light strength.",
    "advice_injured": "• Injury note: low-impact, pain-free ROM; progress gradually; consult coach/doctor as needed.",
    "advice_healthnote": "• Monitor noted health conditions and adjust intensity accordingly.",
    "start_training": "Start training"
  },
  "weight": {
    "prompt_title": "Update weight",
    "prompt_desc": "Enter your current weight (kg)",
    "prompt_placeholder": "e.g. 65.5",
    "later": "Later",
    "save": "Save",
    "chart_title": "Weight tracking",
    "chart_empty": "No data yet. The app will periodically remind you to log your weight."
  },
  "UserProfile": {
    "title": "User Profile",
    "subtitle": "Enter your info to get personalized workout recommendations",
    "name_label": "Full name *",
    "name_ph": "e.g., John Doe",
    "age_label": "Age",
    "age_ph": "e.g., 28",
    "gender_label": "Gender",
    "gender_male": "Male",
    "gender_female": "Female",
    "gender_other": "Other",
    "height_label": "Height (cm)",
    "height_ph": "e.g., 170",
    "weight_label": "Weight (kg)",
    "weight_ph": "e.g., 65",
    "bmi": "BMI",
    "bmi_label_under": "Underweight",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Overweight",
    "bmi_label_obese": "Obese",
    "health_label": "Health status",
    "health_ph": "e.g., Blood pressure stable, sleeping well, returning to training…",
    "injured_q": "Any injuries?",
    "injury_label": "Injury details",
    "injury_ph": "e.g., Left knee pain, limit deep squats; shoulder pain during press…",
    "hint_fill_hw": "Enter height & weight to get suggestions.",
    "rec_injured": "Recommendation: prioritize light CORE/Upper sessions with more Rest days.",
    "rec_overweight": "Recommendation: Fat-loss plan (light → moderate HIIT) alternating with Lower/Core.",
    "rec_general": "Recommendation: Full-body plan (foundational strength + Core).",
    "loading": "Loading…",
    "save_success_title": "Saved",
    "save_error_title": "Error",
    "save_error_msg": "Couldn't save your data. Please try again.",
    "btn_delete": "Delete",
    "btn_save": "Save"
  },
  "dashboard": {
    "title": "Progress Dashboard",
    "streak": "Streak",
    "thisWeek": "This week",
    "total": "Total",
    "completedPrograms": "Completed",
    "lastWorkout": "Last workout"
  },
  "recommend": {
    "title": "Recommended for you",
    "start": "Start this plan"
  },
  "nutrition": {
    "title": "Nutrition",
    "subtitle": "The app suggests calories, water and nutrition ratios based on your personal goal.",
    "noProfileTitle": "Complete your profile first",
    "noProfileText": "Add your height, weight and goal to get personalized calories, macros and water targets.",
    "targets": "Daily targets",
    "calories": "Calories",
    "water": "Water",
    "macros": "Macro split",
    "protein": "Protein",
    "carbs": "Carbs",
    "fats": "Fats",
    "sampleMeals": "Sample meals",
    "tips": "Advice",
    "advancedTitle": "Professional nutrition analysis",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Adjustment",
    "kcalPerDay": "kcal/day",
    "mealSplit": "Meal calorie split",
    "hydration": "Hydration schedule",
    "note": "Important note",
    "screenTitle": "Nutrition",
    "heroStep": "3",
    "heroTitleLine1": "Personalized",
    "heroTitleLine2": "nutrition plan",
    "dailyGoal": "Daily goals",
    "edit": "Edit",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Macro ratio",
    "carb": "Carb",
    "fat": "Fat",
    "viewAll": "View all",
    "breakfast": "Breakfast",
    "lunch": "Lunch",
    "dinner": "Dinner",
    "snack": "Snack",
    "mealPlan": "Meal suggestions",
    "tipFallback": "Drink enough water and prioritize protein-rich foods to support muscle recovery.",
    "footer1": "From today,",
    "footer2": "a better version of you",
    "science": "Science",
    "effective": "Effective",
    "sustainable": "Sustainable",
    "advancedMode": "ADVANCED MODE",
    "pro": "PRO",
    advancedMealPlan: 'Advanced meal plan',
advancedMealPlanKicker: 'MEAL OPTIONS',
advancedMealPlanDesc:
  'Choose from multiple meals for each time of day. Calories and macros are estimated for easier planning.',

mealGroups: {
  breakfast: 'Breakfast options',
  lunch: 'Lunch options',
  dinner: 'Dinner options',
  snack: 'Snack options',
},

goals: {
  lose_weight: 'Fat loss',
  build_muscle: 'Build muscle',
  maintain: 'Maintain',
  recomp: 'Body recomposition',
  endurance: 'Endurance',
  flexibility: 'General wellness',
},

activity: {
  sedentary: 'Sedentary',
  light: 'Light activity',
  moderate: 'Moderate activity',
  active: 'Active',
  very_active: 'Very active',
},

bmiLabels: {
  under: 'Underweight',
  normal: 'Normal',
  over: 'Overweight',
  obese: 'Obese',
},

simpleMeal: {
  breakfast: '{{meal}} • about {{calories}} kcal',
  lunch: '{{meal}} • about {{calories}} kcal',
  dinner: '{{meal}} • about {{calories}} kcal',
  snack: '{{meal}} • about {{calories}} kcal',
},

hydrationSchedule: {
  morning: 'Morning: 500ml after waking up',
  beforeWorkout: 'Before workout: 300–500ml',
  duringWorkout: 'During workout: small sips every 10–15 minutes',
  evening: 'Evening: finish remaining water target',
},

dynamicTips: {
  protein:
    'Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.',
  water:
    'Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.',
  fiber:
    'Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.',
  lose_weight:
    'Keep a moderate calorie deficit. Avoid cutting calories too aggressively.',
  build_muscle:
    'Combine a small calorie surplus with progressive strength training.',
  recomp:
    'Prioritize protein and consistency. Body recomposition works best with steady training.',
  injured:
    'Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.',
  healthNote:
    'You added a health note. Treat this plan as general guidance and adjust carefully.',
},

warnings: {
  lowCalories:
    'Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.',
  lowBmi: 'BMI is low. A fat-loss goal may not be suitable.',
  injured:
    'Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.',
  healthNote: 'Health note detected: this plan is not medical advice.',
},

summary:
  '{{goalLabel}} plan: {{calories}} kcal/day, {{proteinG}}g protein, {{carbsG}}g carbs, {{fatsG}}g fats. Estimated BMR {{bmr}}, TDEE {{tdee}}.',

mealOptions: {
  bf_1: {
    title: 'Oatmeal with banana and peanut butter',
    desc: 'Oats, banana, peanut butter and milk',
  },
  bf_2: {
    title: 'Eggs, whole grain toast and avocado',
    desc: 'Eggs, whole grain toast, avocado and vegetables',
  },
  bf_3: {
    title: 'Greek yogurt bowl',
    desc: 'Greek yogurt, berries, banana and granola',
  },
  bf_4: {
    title: 'Protein smoothie',
    desc: 'Whey protein, banana, oats, milk and peanut butter',
  },

  ln_1: {
    title: 'Grilled chicken rice bowl',
    desc: 'Chicken breast, rice, broccoli and olive oil',
  },
  ln_2: {
    title: 'Beef and sweet potato plate',
    desc: 'Lean beef, sweet potato and mixed vegetables',
  },
  ln_3: {
    title: 'Tofu quinoa salad',
    desc: 'Tofu, quinoa, greens, tomatoes and avocado',
  },
  ln_4: {
    title: 'Turkey wrap combo',
    desc: 'Turkey wrap, vegetables and yogurt dip',
  },

  dn_1: {
    title: 'Salmon with potatoes and salad',
    desc: 'Salmon, boiled potatoes and green salad',
  },
  dn_2: {
    title: 'Lean beef with rice and vegetables',
    desc: 'Lean beef, rice and vegetables',
  },
  dn_3: {
    title: 'White fish and steamed vegetables',
    desc: 'White fish, vegetables and a small rice portion',
  },
  dn_4: {
    title: 'Chicken pasta',
    desc: 'Chicken breast, whole wheat pasta and tomato sauce',
  },

  sn_1: {
    title: 'Protein yogurt and nuts',
    desc: 'Greek yogurt, almonds and berries',
  },
  sn_2: {
    title: 'Protein shake and banana',
    desc: 'Whey protein shake with banana',
  },
  sn_3: {
    title: 'Apple with peanut butter',
    desc: 'Apple slices with peanut butter',
  },
  sn_4: {
    title: 'Cottage cheese cup',
    desc: 'Cottage cheese with fruit',
  },
},
  customTargetKicker: 'CUSTOM TARGET',
editDailyGoals: 'Edit daily goals',
editDailyGoalsDesc:
  'Change calories or water target. The app will recalculate macros and meal suggestions automatically.',
resetAuto: 'Auto',
waterReminderKicker: 'HYDRATION',
waterReminder: 'Water reminder',
waterReminderDesc:
  'Get gentle reminders during the day based on your water target.',
waterReminderOn: 'On',
waterReminderOff: 'Off',
waterTarget: 'Water target',
reminderTime: 'Reminder time',
reminderInterval: 'Reminder interval',
waterReminderTitle: 'Time to drink water',
waterReminderBody: 'Drink about {{amount}}ml of water to stay hydrated.',
  },
  "beginner": {
    "modeTitle": "Beginner mode",
    "modeDesc": "Simple explanations and quick guidance for new users.",
    "glossaryTitle": "Beginner guide",
    "terms": {
      "restDay": {
        "title": "Rest day",
        "desc": "A recovery day. Your body rests and rebuilds, so do not skip it."
      },
      "warmUp": {
        "title": "Warm-up",
        "desc": "Light movement before training to prepare your body and reduce injury risk."
      },
      "cooldown": {
        "title": "Cooldown",
        "desc": "Easy movement or stretching after training to help your body recover."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "High-Intensity Interval Training: short bursts of hard work followed by short rest."
      },
      "rep": {
        "title": "Rep",
        "desc": "One complete movement of an exercise. Example: one squat = one rep."
      },
      "set": {
        "title": "Set",
        "desc": "A group of reps. Example: 10 squats done together = 1 set."
      }
    }
  },
  "todayWorkout": {
    "title": "Today's workout",
    "fallback": "Workout",
    "startNow": "Start now",
    "restTitle": "Today is a recovery day",
    "restText": "Take a break, stretch gently, drink water, and get ready for your next workout."
  },
  "common": {
    "on": "ON",
    "off": "OFF",
    "cancel": "Cancel",
    "edit": "Edit",
    "viewAll": "View all"
  },
  "history": {
    "title": "Workout History",
    "screenTitle": "Workout History",
    "thisWeek": "This week",
    "minutes": "Minutes",
    "totalWorkouts": "Workouts",
    "empty": "No completed workouts yet.",
    "viewAll": "View all",
    "filter7": "7 days",
    "filter30": "30 days",
    "filterAll": "All"
  },
  "achievements": {
    "title": "Achievements"
  },
  "challenges": {
    "title": "Challenges",
    "start7": "Start 7-day challenge",
    "start30": "Start 30-day challenge",
    "complete": "Challenge completed",
    "daysLeft": "{{count}} day(s) left",
    "starter7Title": "7-Day Starter Challenge",
    "starter7Desc": "Complete 5 workouts in 7 days.",
    "consistency30Title": "30-Day Consistency Challenge",
    "consistency30Desc": "Complete 20 workouts in 30 days."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "{{goalLabel}} plan: {{calories}} kcal/day, {{proteinG}}g protein, {{carbsG}}g carbs, {{fatsG}}g fats. Estimated BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Fat loss",
      "build_muscle": "Build muscle",
      "maintain": "Maintain",
      "recomp": "Body recomposition",
      "endurance": "Endurance",
      "flexibility": "General wellness"
    },
    "activity": {
      "sedentary": "Sedentary",
      "light": "Light activity",
      "moderate": "Moderate activity",
      "active": "Active",
      "very_active": "Very active"
    },
    "bmi": {
      "under": "Underweight",
      "normal": "Normal",
      "over": "Overweight",
      "obese": "Obese"
    },
    "hydration": {
      "morning": "Morning: 500ml after waking up",
      "beforeWorkout": "Before workout: 300–500ml",
      "duringWorkout": "During workout: small sips every 10–15 minutes",
      "evening": "Evening: finish remaining water target"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const vi = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Chính",
    "nutrition": "Dinh dưỡng",
    "guide": "Hướng dẫn",
    "premium": "Cao cấp",
    "settings": "Cài đặt",
    "workout": "Bài tập",
    "more": "Thêm",
    "program": "Chương trình",
    "profile": "Hồ sơ người dùng",
    "weightChart": "Biểu đồ cân nặng"
  },
  "home": {
    "title": "Chọn chương trình tập",
    "subtitle": "Chọn 1 giáo án và luyện tập mỗi ngày",
    "program60": "Giáo án Giảm mỡ 60 ngày",
    "program90": "Giáo án Toàn thân 90 ngày",
    "daysSuffix": "{{count}} ngày",
    "health_overview": "Tổng quan sức khỏe",
    "activeTitle": "Đang tập luyện",
    "noActive": "Hiện chưa có chương trình đang tập."
  },
  "program": {
    "daysPrefix": "Ngày {{day}} • {{weekday}}",
    "weekTitle": "Tuần {{n}}",
    "completed": "Đã hoàn thành",
    "todayWorkout": "Bài tập: {{name}}"
  },
  "workouts": {
    "rest": "Phục hồi / Nghỉ ngơi",
    "hiit": "HIIT toàn thân",
    "upper": "Ngực - Vai - Tay",
    "lower": "Mông - Đùi",
    "core": "Bụng & Core",
    "pickOne": "Chọn một giáo án để bắt đầu",
    "days": "ngày",
    "day": "ngày",
    "heroTitle": "Kế hoạch tập luyện hằng ngày",
    "matchingResults": "Kết quả phù hợp"
  },
  "guide": {
    "title": "Hướng dẫn sử dụng PulseFit",
    "subtitle": "Làm theo các bước đơn giản sau để bắt đầu hành trình tập luyện của bạn.",
    "steps": {
      "step1": {
        "badge": "Bước 1",
        "title": "Nhập thông tin cá nhân",
        "desc": "Điền chiều cao, cân nặng, tình trạng sức khỏe, mục tiêu và các thông tin cơ bản khác. Ứng dụng sẽ tính chỉ số BMI và đưa ra lời khuyên về sức khỏe để bạn bắt đầu an toàn hơn."
      },
      "step2": {
        "badge": "Bước 2",
        "title": "Chọn chương trình luyện tập phù hợp",
        "desc": "Xem danh sách các chương trình luyện tập và chọn chương trình phù hợp nhất với thể trạng, mục tiêu và sở thích của bạn."
      },
      "step3": {
        "badge": "Bước 3",
        "title": "Chọn ngày tập",
        "desc": "Mở chương trình đã chọn và chọn ngày tập mà bạn muốn thực hiện. Bạn có thể tập lần lượt theo lịch trình đã sắp xếp."
      },
      "step4": {
        "badge": "Bước 4",
        "title": "Tập luyện theo video",
        "desc": "Làm theo video hướng dẫn để tập đúng động tác. Bạn có thể xoay ngang màn hình điện thoại để xem video toàn màn hình rõ hơn."
      }
    },
    "noteTitle": "Chú ý",
    "note": "Hãy duy trì tập luyện đều đặn để đạt kết quả tốt nhất."
  },
  "premium": {
    "title": "Nâng cấp Premium",
    "removeAds": "Xóa quảng cáo",
    "allPrograms": "Mở khóa toàn bộ trải nghiệm",
    "active": "Premium đang hoạt động",
    "restore": "Khôi phục giao dịch",
    "restoreTitle": "Khôi phục giao dịch",
    "restoreSuccess": "Đã khôi phục Premium thành công.",
    "restoreEmpty": "Không tìm thấy giao dịch Premium.",
    "errorTitle": "Mua hàng thất bại",
    "errorText": "Không thể hoàn tất giao dịch.",
    "productUnavailable": "Không tìm thấy sản phẩm Premium. Vui lòng kiểm tra Play Console / App Store.",
    "subUnavailable": "Không tìm thấy gói thuê bao tháng. Vui lòng kiểm tra Play Console / App Store.",
    "loading": "Đang tải...",
    "monthlyTitle": "Premium theo tháng",
    "monthlyDesc": "Tự động gia hạn mỗi tháng để duy trì Premium",
    "subscribeMonthly": "Đăng ký theo tháng",
    "lifetimeTitle": "Premium trọn đời",
    "lifetimeDesc": "Thanh toán một lần, sử dụng Premium mãi mãi",
    "buyLifetime": "Mua trọn đời"
  },
  "video": {
    "loading": "Đang tải video...",
    "play": "Bắt đầu tập",
    "error": "Không thể phát video. Vui lòng thử lại."
  },
settings: {
  title: 'Cài đặt',
  language: 'Ngôn ngữ',
  choose: 'Chọn ngôn ngữ',
  chooseLanguage: 'Chọn ngôn ngữ ứng dụng',
  general: 'Chung',
  dailyReminder: 'Nhắc nhở hằng ngày',
  tapToToggleReminder: 'Nhấn để đổi nhắc nhở',
  accountAndTraining: 'Tài khoản & Tập luyện',
  workoutReminderKicker: 'NHẮC TẬP LUYỆN',
chooseWorkoutReminderTime: 'Chọn giờ nhắc',
workoutReminderDesc:
  'Chọn thời gian bạn muốn ứng dụng nhắc tập luyện mỗi ngày.',
hour: 'Giờ',
minute: 'Phút',
saveReminder: 'Lưu',
disableReminder: 'Tắt',
reminderOffText: 'Đang tắt • nhấn để chọn giờ',
dailyReminderTitle: 'Đến giờ tập luyện rồi! 💪',
dailyReminderBody:
  'Mở Insanity Deluxe Edition và hoàn thành buổi tập hôm nay.',
},
  "onboard": {
    "title": "Cùng bắt đầu nào 👋",
    "subtitle": "Nhập một vài thông tin để chúng tôi gợi ý kế hoạch phù hợp",
    "name": "Họ và tên *",
    "age": "Tuổi *",
    "gender": "Giới tính *",
    "gender_male": "Nam",
    "gender_female": "Nữ",
    "gender_other": "Khác",
    "health": "Tình trạng sức khỏe",
    "height": "Chiều cao (cm) *",
    "weight": "Cân nặng (kg) *",
    "injured_q": "Bạn có chấn thương không?",
    "injury_note": "Mô tả chấn thương",
    "goal": "Mục tiêu hiện tại *",
    "goals": {
      "lose_weight": "Giảm cân",
      "build_muscle": "Tăng cơ",
      "maintain": "Duy trì",
      "recomp": "Tăng cơ giảm mỡ (Recomp)",
      "endurance": "Tăng sức bền",
      "flexibility": "Tăng độ dẻo dai"
    },
    "tip_title": "Mẹo nhanh",
    "tip_1": "Nếu có chấn thương, hãy bắt đầu với các bài tập nhẹ nhàng và tăng dần cường độ.",
    "tip_2": "Cập nhật cân nặng mỗi 3 ngày để theo dõi tiến độ.",
    "back": "Quay lại",
    "next": "Tiếp theo",
    "finish": "Hoàn tất",
    "saving": "Đang lưu...",
    "bmi": "BMI",
    "bmi_result_title": "Tổng quan sức khỏe",
    "bmi_label_under": "Thiếu cân",
    "bmi_label_normal": "Bình thường",
    "bmi_label_over": "Thừa cân",
    "bmi_label_obese": "Béo phì",
    "advice_intro": "• BMI của bạn: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Tập trung tăng khối lượng nạc: tập toàn thân/thân trên-dưới với cường độ vừa phải; tăng mức tạ; nạp đủ protein và calo.",
    "advice_bmi_normal": "• Duy trì: kết hợp tập sức mạnh + cardio vừa phải (2–3 ngày/tuần); ưu tiên kỹ thuật và giấc ngủ.",
    "advice_bmi_over": "• Giảm mỡ: cardio vừa phải/HIIT nhẹ 2–3 ngày + tập sức mạnh toàn thân; thâm hụt calo nhẹ.",
    "advice_bmi_obese": "• Giảm mỡ an toàn: đi bộ nhanh/cardio tác động thấp + tập sức mạnh cơ bản; theo dõi nhịp tim, tăng cường độ dần dần.",
    "advice_goal_lose_weight": "• Mục tiêu: Giảm cân → theo dõi calo, 1.6–2.2g/kg protein, ngủ 7–8 tiếng.",
    "advice_goal_build_muscle": "• Mục tiêu: Tăng cơ → quá tải lũy tiến (progressive overload) 3–5 ngày/tuần, 1.6–2.2g/kg protein, thặng dư calo nhẹ.",
    "advice_goal_maintain": "• Mục tiêu: Duy trì → 3 ngày/tuần, cân bằng sức mạnh + cardio, cân mỗi tuần.",
    "advice_goal_recomp": "• Mục tiêu: Recomp → tập tạ cơ bản + protein cao, thâm hụt calo nhẹ, ngủ đủ giấc.",
    "advice_goal_endurance": "• Mục tiêu: Sức bền → tập vùng zone 2 + biến tốc (intervals); nạp carb trước khi tập.",
    "advice_goal_flexibility": "• Mục tiêu: Dẻo dai → tập vận động (mobility)/ROM hàng ngày 10–20 phút, thêm tập sức mạnh nhẹ.",
    "advice_injured": "• Ghi chú chấn thương: tập tác động thấp, trong phạm vi không đau (ROM); tiến bộ dần dần; tham khảo ý kiến HLV/bác sĩ khi cần.",
    "advice_healthnote": "• Theo dõi các tình trạng sức khỏe đã ghi chú và điều chỉnh cường độ phù hợp.",
    "start_training": "Bắt đầu tập luyện"
  },
  "weight": {
    "prompt_title": "Cập nhật cân nặng",
    "prompt_desc": "Nhập cân nặng hiện tại (kg)",
    "prompt_placeholder": "vd: 65.5",
    "later": "Để sau",
    "save": "Lưu",
    "chart_title": "Theo dõi cân nặng",
    "chart_empty": "Chưa có dữ liệu. Ứng dụng sẽ định kỳ nhắc bạn ghi lại cân nặng."
  },
  "UserProfile": {
    "title": "Hồ sơ người dùng",
    "subtitle": "Nhập thông tin để nhận gợi ý bài tập được cá nhân hóa",
    "name_label": "Họ và tên *",
    "name_ph": "vd: Nguyễn Văn A",
    "age_label": "Tuổi",
    "age_ph": "vd: 28",
    "gender_label": "Giới tính",
    "gender_male": "Nam",
    "gender_female": "Nữ",
    "gender_other": "Khác",
    "height_label": "Chiều cao (cm)",
    "height_ph": "vd: 170",
    "weight_label": "Cân nặng (kg)",
    "weight_ph": "vd: 65",
    "bmi": "BMI",
    "bmi_label_under": "Thiếu cân",
    "bmi_label_normal": "Bình thường",
    "bmi_label_over": "Thừa cân",
    "bmi_label_obese": "Béo phì",
    "health_label": "Tình trạng sức khỏe",
    "health_ph": "vd: Huyết áp ổn định, ngủ ngon, mới tập lại...",
    "injured_q": "Có chấn thương không?",
    "injury_label": "Chi tiết chấn thương",
    "injury_ph": "vd: Đau đầu gối trái, hạn chế squat sâu; đau vai khi đẩy...",
    "hint_fill_hw": "Nhập chiều cao & cân nặng để nhận gợi ý.",
    "rec_injured": "Khuyến nghị: ưu tiên các buổi tập Bụng/Thân trên nhẹ nhàng với nhiều ngày nghỉ hơn.",
    "rec_overweight": "Khuyến nghị: Kế hoạch giảm mỡ (HIIT nhẹ → vừa) xen kẽ với Thân dưới/Bụng.",
    "rec_general": "Khuyến nghị: Kế hoạch toàn thân (sức mạnh nền tảng + Bụng).",
    "loading": "Đang tải...",
    "save_success_title": "Đã lưu",
    "save_error_title": "Lỗi",
    "save_error_msg": "Không thể lưu dữ liệu. Vui lòng thử lại.",
    "btn_delete": "Xóa",
    "btn_save": "Lưu"
  },
  "dashboard": {
    "title": "Bảng tiến độ",
    "streak": "Chuỗi liên tiếp",
    "thisWeek": "Tuần này",
    "total": "Tổng cộng",
    "completedPrograms": "Đã hoàn thành",
    "lastWorkout": "Buổi tập gần nhất"
  },
  "recommend": {
    "title": "Gợi ý cho bạn",
    "start": "Bắt đầu giáo án này"
  },
  "nutrition": {
    "title": "Dinh dưỡng",
    "subtitle": "Ứng dụng tự gợi ý calo, nước và tỷ lệ dinh dưỡng theo mục tiêu của bạn.",
    "noProfileTitle": "Hoàn tất hồ sơ trước",
    "noProfileText": "Thêm chiều cao, cân nặng và mục tiêu để nhận gợi ý calo, macro và lượng nước phù hợp.",
    "targets": "Mục tiêu hằng ngày",
    "calories": "Calo",
    "water": "Nước",
    "macros": "Tỷ lệ macro",
    "protein": "Đạm",
    "carbs": "Carb",
    "fats": "Chất béo",
    "sampleMeals": "Thực đơn mẫu",
    "tips": "Lời khuyên",
    "advancedTitle": "Phân tích dinh dưỡng chuyên nghiệp",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Điều chỉnh",
    "kcalPerDay": "kcal/ngày",
    "mealSplit": "Chia calo theo bữa",
    "hydration": "Lịch uống nước",
    "note": "Lưu ý quan trọng",
    "screenTitle": "Dinh dưỡng",
    "heroStep": "3",
    "heroTitleLine1": "Kế hoạch dinh dưỡng",
    "heroTitleLine2": "cá nhân",
    "dailyGoal": "Mục tiêu hằng ngày",
    "edit": "Chỉnh sửa",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Tỷ lệ macro",
    "carb": "Carb",
    "fat": "Chất béo",
    "viewAll": "Xem tất cả",
    "breakfast": "Bữa sáng",
    "lunch": "Bữa trưa",
    "dinner": "Bữa tối",
    "snack": "Bữa phụ",
    "mealPlan": "Gợi ý bữa ăn",
    "tipFallback": "Uống đủ nước và ưu tiên thực phẩm giàu protein để hỗ trợ phục hồi cơ bắp.",
    "footer1": "Từ hôm nay,",
    "footer2": "phiên bản tốt hơn của bạn",
    "science": "Khoa học",
    "effective": "Hiệu quả",
    "sustainable": "Bền vững",
    "advancedMode": "CHẾ ĐỘ NÂNG CAO",
    "pro": "PRO",
    advancedMealPlan: 'Thực đơn mẫu chuyên sâu',
advancedMealPlanKicker: 'LỰA CHỌN BỮA ĂN',
advancedMealPlanDesc:
  'Chọn nhiều món khác nhau cho từng bữa trong ngày. Calo và macro được ước tính để bạn dễ lên kế hoạch hơn.',

mealGroups: {
  breakfast: 'Lựa chọn bữa sáng',
  lunch: 'Lựa chọn bữa trưa',
  dinner: 'Lựa chọn bữa tối',
  snack: 'Lựa chọn bữa phụ',

},

goals: {
  lose_weight: 'Giảm mỡ',
  build_muscle: 'Tăng cơ',
  maintain: 'Duy trì',
  recomp: 'Tăng cơ giảm mỡ',
  endurance: 'Tăng sức bền',
  flexibility: 'Sức khỏe tổng quát',
},

activity: {
  sedentary: 'Ít vận động',
  light: 'Vận động nhẹ',
  moderate: 'Vận động vừa',
  active: 'Vận động nhiều',
  very_active: 'Vận động rất nhiều',
},

bmiLabels: {
  under: 'Thiếu cân',
  normal: 'Bình thường',
  over: 'Thừa cân',
  obese: 'Béo phì',
},

simpleMeal: {
  breakfast: '{{meal}} • khoảng {{calories}} kcal',
  lunch: '{{meal}} • khoảng {{calories}} kcal',
  dinner: '{{meal}} • khoảng {{calories}} kcal',
  snack: '{{meal}} • khoảng {{calories}} kcal',
},

hydrationSchedule: {
  morning: 'Buổi sáng: uống 500ml sau khi thức dậy',
  beforeWorkout: 'Trước khi tập: uống 300–500ml',
  duringWorkout: 'Trong lúc tập: uống từng ngụm nhỏ mỗi 10–15 phút',
  evening: 'Buổi tối: uống phần nước còn lại để đủ mục tiêu trong ngày',
},

dynamicTips: {
  protein:
    'Mục tiêu khoảng {{proteinG}}g đạm mỗi ngày, nên chia đều trong 3–4 bữa.',
  water:
    'Uống khoảng {{waterLiters}}L nước mỗi ngày. Ngày nóng hoặc tập nặng nên uống thêm.',
  fiber:
    'Cố gắng đạt ít nhất {{fiberG}}g chất xơ từ rau, trái cây, đậu và ngũ cốc nguyên hạt.',
  lose_weight:
    'Giữ mức thâm hụt calo vừa phải, không nên cắt calo quá mạnh.',
  build_muscle:
    'Kết hợp thặng dư calo nhẹ với tập sức mạnh tăng dần.',
  recomp:
    'Ưu tiên đạm và sự đều đặn. Tăng cơ giảm mỡ cần kiên trì theo thời gian.',
  injured:
    'Bạn có đánh dấu chấn thương, nên ưu tiên phục hồi và không ăn kiêng quá gắt.',
  healthNote:
    'Bạn có ghi chú sức khỏe, hãy xem kế hoạch này như gợi ý chung và điều chỉnh cẩn thận.',
},

warnings: {
  lowCalories:
    'Mức calo mục tiêu khá thấp. Hãy đảm bảo vẫn đủ đạm, vi chất và thời gian phục hồi.',
  lowBmi: 'BMI đang thấp. Mục tiêu giảm mỡ có thể không phù hợp.',
  injured:
    'Có đánh dấu chấn thương: ưu tiên phục hồi, ngủ đủ, uống đủ nước và tập nhẹ hơn.',
  healthNote: 'Có ghi chú sức khỏe: kế hoạch này không thay thế tư vấn y tế.',
},

summary:
  'Kế hoạch {{goalLabel}}: {{calories}} kcal/ngày, {{proteinG}}g đạm, {{carbsG}}g carb, {{fatsG}}g chất béo. Ước tính BMR {{bmr}}, TDEE {{tdee}}.',

mealOptions: {
  bf_1: {
    title: 'Yến mạch với chuối và bơ đậu phộng',
    desc: 'Yến mạch, chuối, bơ đậu phộng và sữa',
  },
  bf_2: {
    title: 'Trứng, bánh mì nguyên cám và bơ',
    desc: 'Trứng, bánh mì nguyên cám, bơ và rau xanh',
  },
  bf_3: {
    title: 'Sữa chua Hy Lạp với trái cây',
    desc: 'Sữa chua Hy Lạp, quả mọng, chuối và granola',
  },
  bf_4: {
    title: 'Sinh tố protein',
    desc: 'Whey protein, chuối, yến mạch, sữa và bơ đậu phộng',
  },

  ln_1: {
    title: 'Cơm gà nướng',
    desc: 'Ức gà, cơm, bông cải xanh và dầu ô liu',
  },
  ln_2: {
    title: 'Bò nạc với khoai lang',
    desc: 'Thịt bò nạc, khoai lang và rau củ',
  },
  ln_3: {
    title: 'Salad đậu phụ quinoa',
    desc: 'Đậu phụ, quinoa, rau xanh, cà chua và bơ',
  },
  ln_4: {
    title: 'Cuốn gà tây',
    desc: 'Gà tây cuốn, rau củ và sốt sữa chua',
  },

  dn_1: {
    title: 'Cá hồi với khoai tây và salad',
    desc: 'Cá hồi, khoai tây luộc và salad xanh',
  },
  dn_2: {
    title: 'Bò nạc với cơm và rau',
    desc: 'Thịt bò nạc, cơm và rau xanh',
  },
  dn_3: {
    title: 'Cá trắng và rau hấp',
    desc: 'Cá trắng, rau hấp và một phần cơm nhỏ',
  },
  dn_4: {
    title: 'Mì Ý gà',
    desc: 'Ức gà, mì nguyên cám và sốt cà chua',
  },

  sn_1: {
    title: 'Sữa chua protein và hạt',
    desc: 'Sữa chua Hy Lạp, hạnh nhân và quả mọng',
  },
  sn_2: {
    title: 'Protein shake và chuối',
    desc: 'Whey protein shake với chuối',
  },
  sn_3: {
    title: 'Táo với bơ đậu phộng',
    desc: 'Táo cắt lát ăn kèm bơ đậu phộng',
  },
  sn_4: {
    title: 'Phô mai tươi với trái cây',
    desc: 'Phô mai tươi ăn kèm trái cây',
  },
},
  customTargetKicker: 'MỤC TIÊU TÙY CHỈNH',
editDailyGoals: 'Chỉnh sửa mục tiêu hằng ngày',
editDailyGoalsDesc:
  'Thay đổi calo hoặc lượng nước. Ứng dụng sẽ tự tính lại macro và gợi ý bữa ăn.',
resetAuto: 'Tự động',
waterReminderKicker: 'UỐNG NƯỚC',
waterReminder: 'Nhắc nhở uống nước',
waterReminderDesc:
  'Nhận nhắc nhở nhẹ nhàng trong ngày dựa trên mục tiêu uống nước của bạn.',
waterReminderOn: 'Bật',
waterReminderOff: 'Tắt',
waterTarget: 'Mục tiêu nước',
reminderTime: 'Thời gian nhắc',
reminderInterval: 'Chu kỳ nhắc',
waterReminderTitle: 'Đến giờ uống nước',
waterReminderBody: 'Hãy uống khoảng {{amount}}ml nước để giữ cơ thể đủ nước.',
  },
  "filters": {
    "title": "Bộ lọc thông minh",
    "all": "Tất cả",
    "levelTitle": "Cấp độ",
    "level": {
      "beginner": "Người mới",
      "intermediate": "Trung cấp",
      "advanced": "Nâng cao"
    },
    "goalTitle": "Mục tiêu",
    "goal": {
      "lose_weight": "Giảm cân",
      "build_muscle": "Tăng cơ",
      "cardio": "Cardio",
      "core": "Core",
      "mobility": "Linh hoạt"
    },
    "equipmentTitle": "Dụng cụ",
    "equipment": {
      "no_equipment": "Không dụng cụ",
      "with_equipment": "Có dụng cụ"
    },
    "durationTitle": "Thời lượng",
    "duration": {
      "short": "Ngắn",
      "medium": "Vừa",
      "long": "Dài"
    },
    "noResultsTitle": "Không có chương trình phù hợp",
    "noResultsText": "Hãy thử đổi một hoặc nhiều bộ lọc."
  },
  "beginner": {
    "modeTitle": "Chế độ người mới",
    "modeDesc": "Giải thích đơn giản và hướng dẫn nhanh cho người dùng mới.",
    "glossaryTitle": "Hướng dẫn cho người mới",
    "terms": {
      "restDay": {
        "title": "Ngày nghỉ",
        "desc": "Đây là ngày phục hồi. Cơ thể của bạn nghỉ ngơi và tái tạo, vì vậy đừng bỏ qua."
      },
      "warmUp": {
        "title": "Khởi động",
        "desc": "Các động tác nhẹ trước khi tập để chuẩn bị cơ thể và giảm nguy cơ chấn thương."
      },
      "cooldown": {
        "title": "Thả lỏng",
        "desc": "Các động tác nhẹ hoặc giãn cơ sau khi tập để giúp cơ thể phục hồi tốt hơn."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "Bài tập cường độ cao ngắt quãng: những khoảng tập nặng ngắn xen kẽ với thời gian nghỉ ngắn."
      },
      "rep": {
        "title": "Rep",
        "desc": "Một lần thực hiện hoàn chỉnh của một động tác. Ví dụ: 1 lần squat = 1 rep."
      },
      "set": {
        "title": "Set",
        "desc": "Một nhóm rep. Ví dụ: 10 lần squat thực hiện liên tiếp = 1 set."
      }
    }
  },
  "todayWorkout": {
    "title": "Buổi tập hôm nay",
    "fallback": "Bài tập",
    "startNow": "Bắt đầu ngay",
    "restTitle": "Hôm nay là ngày phục hồi",
    "restText": "Hãy nghỉ ngơi, giãn cơ nhẹ, uống nước và chuẩn bị cho buổi tập tiếp theo."
  },
  "common": {
    "on": "BẬT",
    "off": "TẮT",
    "cancel": "Hủy",
    "edit": "Chỉnh sửa",
    "viewAll": "Xem tất cả"
  },
  "history": {
    "title": "Lịch sử tập luyện",
    "screenTitle": "Lịch sử tập luyện",
    "thisWeek": "Tuần này",
    "minutes": "Phút",
    "totalWorkouts": "Buổi tập",
    "empty": "Chưa có buổi tập nào hoàn thành.",
    "viewAll": "Xem tất cả",
    "filter7": "7 ngày",
    "filter30": "30 ngày",
    "filterAll": "Tất cả"
  },
  "achievements": {
    "title": "Thành tích",
    "firstWorkout": "Buổi tập đầu tiên",
    "tenWorkouts": "10 buổi tập",
    "twentyfiveWorkouts": "25 buổi tập",
    "streak3": "Chuỗi 3 ngày",
    "streak7": "Chuỗi 7 ngày",
    "week4": "4 buổi tập trong tuần này",
    "finishProgram": "Hoàn thành 1 chương trình"
  },
  "challenges": {
    "title": "Thử thách",
    "intro": "Bắt đầu một thử thách ngắn để duy trì sự đều đặn.",
    "start7": "Bắt đầu thử thách 7 ngày",
    "start30": "Bắt đầu thử thách 30 ngày",
    "complete": "Đã hoàn thành thử thách",
    "daysLeft": "Còn {{count}} ngày",
    "starter7Title": "Thử thách khởi động 7 ngày",
    "starter7Desc": "Hoàn thành 5 buổi tập trong 7 ngày.",
    "consistency30Title": "Thử thách duy trì 30 ngày",
    "consistency30Desc": "Hoàn thành 20 buổi tập trong 30 ngày."
  },
  "nutritionPlanner": {
    "aboutCalories": "khoảng {{calories}} kcal",
    "summary": "Kế hoạch {{goalLabel}}: {{calories}} kcal/ngày, {{proteinG}}g đạm, {{carbsG}}g carb, {{fatsG}}g chất béo. Ước tính BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Giảm mỡ",
      "build_muscle": "Tăng cơ",
      "maintain": "Duy trì",
      "recomp": "Tăng cơ giảm mỡ",
      "endurance": "Tăng sức bền",
      "flexibility": "Sức khỏe tổng quát"
    },
    "activity": {
      "sedentary": "Ít vận động",
      "light": "Vận động nhẹ",
      "moderate": "Vận động vừa",
      "active": "Vận động nhiều",
      "very_active": "Vận động rất nhiều"
    },
    "bmi": {
      "under": "Thiếu cân",
      "normal": "Bình thường",
      "over": "Thừa cân",
      "obese": "Béo phì"
    },
    "hydration": {
      "morning": "Buổi sáng: uống 500ml sau khi thức dậy",
      "beforeWorkout": "Trước khi tập: uống 300–500ml",
      "duringWorkout": "Trong lúc tập: uống từng ngụm nhỏ mỗi 10–15 phút",
      "evening": "Buổi tối: uống phần nước còn lại để đủ mục tiêu trong ngày"
    },
    "tips": {
      "protein": "Mục tiêu khoảng {{proteinG}}g đạm mỗi ngày, nên chia đều trong 3–4 bữa.",
      "water": "Uống khoảng {{waterLiters}}L nước mỗi ngày. Ngày nóng hoặc tập nặng nên uống thêm.",
      "fiber": "Cố gắng đạt ít nhất {{fiberG}}g chất xơ từ rau, trái cây, đậu và ngũ cốc nguyên hạt.",
      "lose_weight": "Giữ mức thâm hụt calo vừa phải, không nên cắt calo quá mạnh.",
      "build_muscle": "Kết hợp thặng dư calo nhẹ với tập sức mạnh tăng dần.",
      "recomp": "Ưu tiên đạm và sự đều đặn. Tăng cơ giảm mỡ cần kiên trì theo thời gian.",
      "injured": "Bạn có đánh dấu chấn thương, nên ưu tiên phục hồi và không ăn kiêng quá gắt.",
      "healthNote": "Bạn có ghi chú sức khỏe, hãy xem kế hoạch này như gợi ý chung và điều chỉnh cẩn thận."
    },
    "warnings": {
      "lowCalories": "Mức calo mục tiêu khá thấp. Hãy đảm bảo vẫn đủ đạm, vi chất và thời gian phục hồi.",
      "lowBmi": "BMI đang thấp. Mục tiêu giảm mỡ có thể không phù hợp.",
      "injured": "Có đánh dấu chấn thương: ưu tiên phục hồi, ngủ đủ, uống đủ nước và tập nhẹ hơn.",
      "healthNote": "Có ghi chú sức khỏe: kế hoạch này không thay thế tư vấn y tế."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "sữa chua Hy Lạp, trái cây mọng, hạt chia và cà phê đen",
        "lunch": "ức gà nướng, quinoa, bông cải xanh và bơ",
        "dinner": "cá hồi hoặc đậu phụ, rau xanh và khoai lang",
        "snack": "trứng luộc, protein shake hoặc phô mai tươi"
      },
      "build_muscle": {
        "breakfast": "trứng, yến mạch, chuối và bơ đậu phộng",
        "lunch": "thịt gà, cơm, rau xanh và dầu ô liu",
        "dinner": "thịt bò nạc hoặc cá, khoai tây và salad",
        "snack": "protein shake, sữa chua hoặc các loại hạt"
      },
      "recomp": {
        "breakfast": "yến mạch giàu đạm với trái cây",
        "lunch": "nguồn đạm nạc, cơm hoặc quinoa và rau xanh",
        "dinner": "cá, trứng hoặc đậu phụ ăn kèm rau xanh",
        "snack": "sữa chua, trái cây hoặc protein shake"
      },
      "endurance": {
        "breakfast": "yến mạch, chuối, sữa chua và mật ong",
        "lunch": "cơm hoặc mì, đạm nạc và rau xanh",
        "dinner": "khoai tây, cá hoặc gà và salad",
        "snack": "trái cây, sinh tố hoặc thanh năng lượng"
      },
      "general": {
        "breakfast": "trứng hoặc sữa chua với trái cây và ngũ cốc nguyên hạt",
        "lunch": "đạm nạc, rau xanh và tinh bột phức hợp",
        "dinner": "đạm, rau xanh và chất béo tốt",
        "snack": "trái cây, các loại hạt hoặc sữa chua"
      }
    }
  }
};

const es = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Principal",
    "nutrition": "Nutrição",
    "guide": "Guia",
    "premium": "Premium",
    "settings": "Configurações",
    "workout": "Treino",
    "more": "Mais",
    "program": "Programa",
    "profile": "Perfil do Usuário",
    "weightChart": "Gráfico de Peso"
  },
  "home": {
    "title": "Escolha seu plano de treino",
    "subtitle": "Escolha um programa e treine diariamente",
    "program60": "Programa de Queima de Gordura 60 Dias",
    "program90": "Programa de Corpo Inteiro 90 Dias",
    "daysSuffix": "{{count}} dias",
    "health_overview": "Visão geral da saúde",
    "activeTitle": "Em andamento",
    "noActive": "Não há nenhum programa em treinamento no momento."
  },
  "program": {
    "daysPrefix": "Dia {{day}} • {{weekday}}",
    "weekTitle": "Semana {{n}}",
    "completed": "Concluído",
    "todayWorkout": "Treino: {{name}}"
  },
  "workouts": {
    "rest": "Recuperação / Descanso",
    "hiit": "HIIT de corpo inteiro",
    "upper": "Peito - Ombros - Braços",
    "lower": "Glúteos - Pernas",
    "core": "Abdômen & Core",
    "pickOne": "Escolha um plano para começar",
    "days": "Día",
    "day": "Día",
    "heroTitle": "Tu plan de entrenamiento diario",
    "matchingResults": "Resultados coincidentes"
  },
  "guide": {
    "title": "Cómo usar PulseFit",
    "subtitle": "Sigue estos sencillos pasos para comenzar tu rutina de entrenamiento.",
    "steps": {
      "step1": {
        "badge": "Paso 1",
        "title": "Introduce tu información personal",
        "desc": "Completa tu altura, peso, estado de salud, objetivos y otra información básica. La aplicación calculará tu IMC y te dará consejos de salud para ayudarte a comenzar de forma segura."
      },
      "step2": {
        "badge": "Paso 2",
        "title": "Elige un programa de entrenamiento adecuado",
        "desc": "Explora los programas disponibles y elige el que mejor se adapte a tu nivel físico, objetivos y preferencias."
      },
      "step3": {
        "badge": "Paso 3",
        "title": "Selecciona tu día de entrenamiento",
        "desc": "Abre el programa elegido y selecciona el día de entrenamiento que deseas seguir. Puedes avanzar paso a paso según el calendario del programa."
      },
      "step4": {
        "badge": "Paso 4",
        "title": "Entrena con el video",
        "desc": "Sigue el video de entrenamiento para ejercitarte correctamente. Puedes girar el teléfono horizontalmente para ver el video en pantalla completa y tener una mejor experiencia."
      }
    },
    "noteTitle": "Nota",
    "note": "Mantén la constancia en tu entrenamiento para obtener los mejores resultados."
  },
  "premium": {
    "title": "Actualizar a Premium",
    "removeAds": "Eliminar anuncios",
    "allPrograms": "Desbloquea la experiencia completa",
    "active": "Premium está activo",
    "restore": "Restaurar compras",
    "restoreTitle": "Restaurar compras",
    "restoreSuccess": "Premium restaurado correctamente.",
    "restoreEmpty": "No se encontró ninguna compra Premium.",
    "errorTitle": "Compra fallida",
    "errorText": "No se pudo completar la compra.",
    "productUnavailable": "No se encontró el producto Premium. Verifica la configuración de Play Console / App Store.",
    "subUnavailable": "No se encontró la suscripción mensual. Verifica la configuración de Play Console / App Store.",
    "loading": "Cargando...",
    "monthlyTitle": "Premium mensual",
    "monthlyDesc": "Se renueva automáticamente cada mes para mantener Premium activo",
    "subscribeMonthly": "Suscribirse mensualmente",
    "lifetimeTitle": "Premium de por vida",
    "lifetimeDesc": "Pago único, mantén Premium para siempre",
    "buyLifetime": "Comprar de por vida"
  },
  "video": {
    "loading": "Carregando vídeo...",
    "play": "Iniciar treino",
    "error": "Não foi possível reproduzir. Tente novamente."
  },
// es
settings: {
  title: 'Configuración',
  language: 'Idioma',
  choose: 'Elige un idioma',
  chooseLanguage: 'Elige el idioma de la aplicación',
  general: 'General',
  dailyReminder: 'Recordatorio diario',
  tapToToggleReminder: 'Toca para cambiar el recordatorio',
  accountAndTraining: 'Cuenta y entrenamiento',
  // es
workoutReminderKicker: 'RECORDATORIO DE ENTRENAMIENTO',
chooseWorkoutReminderTime: 'Elegir hora del recordatorio',
workoutReminderDesc:
  'Selecciona la hora a la que quieres que la app te recuerde entrenar cada día.',
hour: 'Hora',
minute: 'Minuto',
saveReminder: 'Guardar',
disableReminder: 'Desactivar',
reminderOffText: 'Desactivado • toca para elegir hora',
dailyReminderTitle: '¡Es hora de entrenar! 💪',
dailyReminderBody:
  'Abre Insanity Deluxe Edition y completa la sesión de hoy.',
},
  "onboard": {
    "title": "Vamos começar 👋",
    "subtitle": "Insira alguns detalhes para sugerirmos o plano ideal",
    "name": "Nome completo *",
    "age": "Idade *",
    "gender": "Gênero *",
    "gender_male": "Masculino",
    "gender_female": "Feminino",
    "gender_other": "Outro",
    "health": "Condição de saúde",
    "height": "Altura (cm) *",
    "weight": "Peso (kg) *",
    "injured_q": "Alguma lesão?",
    "injury_note": "Descrição da lesão",
    "goal": "Objetivo atual *",
    "goals": {
      "lose_weight": "Perder peso",
      "build_muscle": "Ganhar massa muscular",
      "maintain": "Manter peso",
      "recomp": "Recomposição (perder gordura + ganhar músculo)",
      "endurance": "Resistência",
      "flexibility": "Flexibilidade"
    },
    "tip_title": "Dicas rápidas",
    "tip_1": "Se estiver lesionado, comece com exercícios de baixo impacto e aumente gradualmente.",
    "tip_2": "Atualize seu peso a cada 3 dias para acompanhar o progresso.",
    "back": "Voltar",
    "next": "Próximo",
    "finish": "Concluir",
    "saving": "Salvando...",
    "bmi": "IMC",
    "bmi_result_title": "Visão geral da saúde",
    "bmi_label_under": "Abaixo do peso",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Sobrepeso",
    "bmi_label_obese": "Obesidade",
    "advice_intro": "• Seu IMC: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Foco em ganhar massa magra: treino de corpo inteiro/superior-inferior com intensidade moderada; aumente a carga; proteína e calorias adequadas.",
    "advice_bmi_normal": "• Manter: misture força + cardio moderado (2–3 dias/sem); priorize técnica e sono.",
    "advice_bmi_over": "• Perda de gordura: cardio moderado/HIIT leve 2–3 dias + força total; leve déficit calórico.",
    "advice_bmi_obese": "• Perda segura: caminhada rápida/cardio de baixo impacto + força básica; monitore a FC, aumente a intensidade gradualmente.",
    "advice_goal_lose_weight": "• Objetivo: Perder peso → monitore calorias, 1.6–2.2g/kg de proteína, 7–8h de sono.",
    "advice_goal_build_muscle": "• Objetivo: Músculos → sobrecarga progressiva 3–5 dias/sem, 1.6–2.2g/kg de proteína, leve superávit calórico.",
    "advice_goal_maintain": "• Objetivo: Manter → 3 dias/sem, equilíbrio entre força + cardio, pese-se semanalmente.",
    "advice_goal_recomp": "• Objetivo: Recomposição → musculação básica + alta proteína, leve déficit, durma bem.",
    "advice_goal_endurance": "• Objetivo: Resistência → zona 2 + intervalos; consuma carboidratos antes do treino.",
    "advice_goal_flexibility": "• Objetivo: Flexibilidade → mobilidade diária/ADM 10–20 min, adicione força leve.",
    "advice_injured": "• Nota sobre lesão: baixo impacto, ADM sem dor; progrida gradualmente; consulte um médico/treinador se necessário.",
    "advice_healthnote": "• Monitore as condições de saúde anotadas e ajuste a intensidade de acordo.",
    "start_training": "Começar treino"
  },
  "weight": {
    "prompt_title": "Atualizar peso",
    "prompt_desc": "Insira seu peso atual (kg)",
    "prompt_placeholder": "ex: 65.5",
    "later": "Depois",
    "save": "Salvar",
    "chart_title": "Acompanhamento de peso",
    "chart_empty": "Sem dados ainda. O app lembrará você periodicamente de registrar seu peso."
  },
  "UserProfile": {
    "title": "Perfil do Usuário",
    "subtitle": "Insira seus dados para obter recomendações personalizadas",
    "name_label": "Nome completo *",
    "name_ph": "ex: João Silva",
    "age_label": "Idade",
    "age_ph": "ex: 28",
    "gender_label": "Gênero",
    "gender_male": "Masculino",
    "gender_female": "Feminino",
    "gender_other": "Outro",
    "height_label": "Altura (cm)",
    "height_ph": "ex: 170",
    "weight_label": "Peso (kg)",
    "weight_ph": "ex: 65",
    "bmi": "IMC",
    "bmi_label_under": "Abaixo do peso",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Sobrepeso",
    "bmi_label_obese": "Obesidade",
    "health_label": "Estado de saúde",
    "health_ph": "ex: Pressão estável, dormindo bem, retornando aos treinos...",
    "injured_q": "Alguma lesão?",
    "injury_label": "Detalhes da lesão",
    "injury_ph": "ex: Dor no joelho esquerdo, evitar agachamento profundo; dor no ombro...",
    "hint_fill_hw": "Insira altura e peso para ver sugestões.",
    "rec_injured": "Recomendação: priorize sessões leves de Core/Superior com mais dias de descanso.",
    "rec_overweight": "Recomendação: Plano de perda de gordura (HIIT leve → moderado) alternando com Inferior/Core.",
    "rec_general": "Recomendação: Plano de corpo inteiro (força fundamental + Core).",
    "loading": "Carregando...",
    "save_success_title": "Salvo",
    "save_error_title": "Erro",
    "save_error_msg": "Não foi possível salvar seus dados. Tente novamente.",
    "btn_delete": "Excluir",
    "btn_save": "Salvar"
  },
  "dashboard": {
    "title": "Panel de progreso",
    "streak": "Racha",
    "thisWeek": "Esta semana",
    "total": "Total",
    "completedPrograms": "Completado",
    "lastWorkout": "Último entrenamiento"
  },
  "recommend": {
    "title": "Recomendado para ti",
    "start": "Comenzar este plan"
  },
  "nutrition": {
    "title": "Nutrición",
    "subtitle": "La app sugiere calorías, agua y proporciones nutricionales según tu objetivo.",
    "noProfileTitle": "Completa tu perfil primero",
    "noProfileText": "Agrega altura, peso y objetivo para recibir recomendaciones de calorías, macros y agua.",
    "targets": "Objetivos diarios",
    "calories": "Calorías",
    "water": "Agua",
    "macros": "Distribución de macros",
    "protein": "Proteína",
    "carbs": "Carbohidratos",
    "fats": "Grasas",
    "sampleMeals": "Comidas ejemplo",
    "tips": "Consejos",
    "screenTitle": "Nutrición",
    "heroStep": "3",
    "heroTitleLine1": "Plan de nutrición",
    "heroTitleLine2": "personalizado",
    "dailyGoal": "Objetivos diarios",
    "edit": "Editar",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Ratio de macros",
    "carb": "Carb",
    "fat": "Grasa",
    "viewAll": "Ver todo",
    "breakfast": "Desayuno",
    "lunch": "Almuerzo",
    "dinner": "Cena",
    "snack": "Snack",
    "mealPlan": "Sugerencias de comida",
    "tipFallback": "Bebe suficiente agua y prioriza alimentos ricos en proteína.",
    "footer1": "Desde hoy,",
    "footer2": "una mejor versión de ti",
    "science": "Ciencia",
    "effective": "Efectivo",
    "sustainable": "Sostenible",
    "advancedMode": "MODO AVANZADO",
    "pro": "PRO",
    "advancedTitle": "Análisis nutricional profesional",
    "bmi": "IMC",
    "bmr": "TMB",
    "tdee": "GETD",
    "adjustment": "Ajuste",
    "kcalPerDay": "kcal/día",
    "mealSplit": "Distribución de calorías por comida",
    "hydration": "Horario de hidratación",
    "note": "Nota importante",
    customTargetKicker: 'OBJETIVO PERSONALIZADO',
editDailyGoals: 'Editar objetivos diarios',
editDailyGoalsDesc:
  'Cambia el objetivo de calorías o agua. La app recalculará automáticamente macros y sugerencias de comidas.',
resetAuto: 'Auto',
// es
waterReminderKicker: 'HIDRATACIÓN',
waterReminder: 'Recordatorio de agua',
waterReminderDesc:
  'Recibe recordatorios suaves durante el día según tu objetivo de agua.',
waterReminderOn: 'Activado',
waterReminderOff: 'Desactivado',
waterTarget: 'Objetivo de agua',
reminderTime: 'Hora del recordatorio',
reminderInterval: 'Intervalo',
waterReminderTitle: 'Hora de beber agua',
waterReminderBody: 'Bebe unos {{amount}}ml de agua para mantenerte hidratado.',
  },
  "beginner": {
    "modeTitle": "Modo principiante",
    "modeDesc": "Explicaciones sencillas y guía rápida para nuevos usuarios.",
    "glossaryTitle": "Guía para principiantes",
    "terms": {
      "restDay": {
        "title": "Día de descanso",
        "desc": "Es un día de recuperación. Tu cuerpo descansa y se reconstruye, así que no lo omitas."
      },
      "warmUp": {
        "title": "Calentamiento",
        "desc": "Movimiento ligero antes de entrenar para preparar tu cuerpo y reducir el riesgo de lesiones."
      },
      "cooldown": {
        "title": "Vuelta a la calma",
        "desc": "Movimiento suave o estiramientos después de entrenar para ayudar a tu cuerpo a recuperarse."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "Entrenamiento de intervalos de alta intensidad: ráfagas cortas de trabajo intenso seguidas de descansos breves."
      },
      "rep": {
        "title": "Repetición",
        "desc": "Un movimiento completo de un ejercicio. Ejemplo: una sentadilla = una repetición."
      },
      "set": {
        "title": "Serie",
        "desc": "Un grupo de repeticiones. Ejemplo: 10 sentadillas seguidas = 1 serie."
      }
    }
  },
  "todayWorkout": {
    "title": "Entrenamiento de hoy",
    "fallback": "Entrenamiento",
    "startNow": "Empezar ahora",
    "restTitle": "Hoy es un día de recuperación",
    "restText": "Tómate un descanso, estira suavemente, bebe agua y prepárate para tu próximo entrenamiento."
  },
  "common": {
    "on": "ACTIVADO",
    "off": "DESACTIVADO",
    "cancel": "Cancelar",
    "edit": "Editar",
    "viewAll": "Ver todo"
  },
  "history": {
    "title": "Historial de entrenamiento",
    "screenTitle": "Historial de entrenamiento",
    "thisWeek": "Esta semana",
    "minutes": "Minutos",
    "totalWorkouts": "Entrenamientos",
    "empty": "Aún no hay entrenamientos completados.",
    "viewAll": "Ver todo",
    "filter7": "7 días",
    "filter30": "30 días",
    "filterAll": "Todos"
  },
  "achievements": {
    "title": "Logros",
    "firstWorkout": "Primer entrenamiento",
    "tenWorkouts": "10 entrenamientos",
    "twentyfiveWorkouts": "25 entrenamientos",
    "streak3": "Racha de 3 días",
    "streak7": "Racha de 7 días",
    "week4": "4 entrenamientos esta semana",
    "finishProgram": "Completa 1 programa"
  },
  "challenges": {
    "title": "Desafíos",
    "intro": "Empieza un desafío corto para mantener la constancia.",
    "start7": "Iniciar desafío de 7 días",
    "start30": "Iniciar desafío de 30 días",
    "complete": "Desafío completado",
    "daysLeft": "Quedan {{count}} día(s)",
    "starter7Title": "Desafío inicial de 7 días",
    "starter7Desc": "Completa 5 entrenamientos en 7 días.",
    "consistency30Title": "Desafío de constancia de 30 días",
    "consistency30Desc": "Completa 20 entrenamientos en 30 días."
  },
  "filters": {
    "all": "Todos",
    "levelTitle": "Nivel",
    "level": {
      "beginner": "Principiante",
      "intermediate": "Intermedio",
      "advanced": "Avanzado"
    },
    "goalTitle": "Enfoque",
    "goal": {
      "lose_weight": "Perder peso",
      "build_muscle": "Ganar músculo",
      "cardio": "Cardio",
      "core": "Core",
      "mobility": "Movilidad"
    },
    "equipmentTitle": "Equipo",
    "equipment": {
      "no_equipment": "Sin equipo",
      "with_equipment": "Con equipo"
    },
    "durationTitle": "Duración",
    "duration": {
      "short": "Corta",
      "medium": "Media",
      "long": "Larga"
    },
    "noResultsTitle": "No hay programas coincidentes",
    "noResultsText": "Prueba cambiar uno o más filtros."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "Plan de {{goalLabel}}: {{calories}} kcal/día, {{proteinG}}g proteína, {{carbsG}}g carbohidratos, {{fatsG}}g grasa. BMR estimado {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Pérdida de grasa",
      "build_muscle": "Ganar músculo",
      "maintain": "Mantener",
      "recomp": "Recomposición corporal",
      "endurance": "Resistencia",
      "flexibility": "Bienestar general"
    },
    "activity": {
      "sedentary": "Sedentario",
      "light": "Actividad ligera",
      "moderate": "Actividad moderada",
      "active": "Activo",
      "very_active": "Muy activo"
    },
    "bmi": {
      "under": "Bajo peso",
      "normal": "Normal",
      "over": "Sobrepeso",
      "obese": "Obesidad"
    },
    "hydration": {
      "morning": "Mañana: 500ml al despertar",
      "beforeWorkout": "Antes de entrenar: 300–500ml",
      "duringWorkout": "Durante el entrenamiento: pequeños sorbos cada 10–15 minutos",
      "evening": "Noche: termina el agua restante del objetivo"
    },
    "tips": {
      "protein": "Apunta a {{proteinG}}g de proteína al día, repartidos en 3–4 comidas.",
      "water": "Bebe alrededor de {{waterLiters}}L de agua al día. Añade más en días calurosos o entrenamientos intensos.",
      "fiber": "Busca al menos {{fiberG}}g de fibra de verduras, frutas, legumbres y cereales integrales.",
      "lose_weight": "Mantén un déficit calórico moderado. Evita recortar calorías demasiado.",
      "build_muscle": "Combina un pequeño superávit calórico con entrenamiento de fuerza progresivo.",
      "recomp": "Prioriza proteína y constancia. La recomposición requiere tiempo.",
      "injured": "Como marcaste una lesión, evita déficits agresivos y prioriza la recuperación.",
      "healthNote": "Añadiste una nota de salud. Usa este plan como guía general."
    },
    "warnings": {
      "lowCalories": "Tu objetivo de calorías es bajo. Asegúrate de obtener proteína, micronutrientes y recuperación suficientes.",
      "lowBmi": "El IMC es bajo. Perder grasa puede no ser adecuado.",
      "injured": "Lesión marcada: prioriza recuperación, sueño, hidratación y entrenamiento amigable con articulaciones.",
      "healthNote": "Nota de salud detectada: este plan no es consejo médico."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const fr = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Accueil",
    "nutrition": "Nutrition",
    "guide": "Guide",
    "premium": "Premium",
    "settings": "Paramètres",
    "workout": "Entraînement",
    "more": "Plus",
    "program": "Programme",
    "profile": "Profil utilisateur",
    "weightChart": "Graphique de poids"
  },
  "home": {
    "title": "Choisissez votre plan d’entraînement",
    "subtitle": "Sélectionnez un programme et entraînez-vous chaque jour",
    "program60": "Programme Brûle-graisse 60 jours",
    "program90": "Programme Corps complet 90 jours",
    "daysSuffix": "{{count}} jours",
    "health_overview": "Bilan santé",
    "activeTitle": "En cours",
    "noActive": "Aucun programme n’est suivi actuellement."
  },
  "program": {
    "daysPrefix": "Jour {{day}} • {{weekday}}",
    "weekTitle": "Semaine {{n}}",
    "completed": "Terminé",
    "todayWorkout": "Entraînement : {{name}}"
  },
  "workouts": {
    "rest": "Récupération / Repos",
    "hiit": "HIIT Corps complet",
    "upper": "Haut du corps : Pecs - Épaules - Bras",
    "lower": "Bas du corps : Fessiers - Jambes",
    "core": "Abdos & Gainage",
    "pickOne": "Choisissez un programme pour commencer",
    "days": "Jour",
    "day": "Jour",
    "heroTitle": "Votre plan d’entraînement quotidien",
    "matchingResults": "Résultats correspondants"
  },
  "guide": {
    "title": "Cómo usar PulseFit",
    "subtitle": "Sigue estos sencillos pasos para comenzar tu rutina de entrenamiento.",
    "steps": {
      "step1": {
        "badge": "Paso 1",
        "title": "Introduce tu información personal",
        "desc": "Completa tu altura, peso, estado de salud, objetivos y otra información básica. La aplicación calculará tu IMC y te dará consejos de salud para ayudarte a comenzar de forma segura."
      },
      "step2": {
        "badge": "Paso 2",
        "title": "Elige un programa de entrenamiento adecuado",
        "desc": "Explora los programas disponibles y elige el que mejor se adapte a tu nivel físico, objetivos y preferencias."
      },
      "step3": {
        "badge": "Paso 3",
        "title": "Selecciona tu día de entrenamiento",
        "desc": "Abre el programa elegido y selecciona el día de entrenamiento que deseas seguir. Puedes avanzar paso a paso según el calendario del programa."
      },
      "step4": {
        "badge": "Paso 4",
        "title": "Entrena con el video",
        "desc": "Sigue el video de entrenamiento para ejercitarte correctamente. Puedes girar el teléfono horizontalmente para ver el video en pantalla completa y tener una mejor experiencia."
      }
    },
    "noteTitle": "Nota",
    "note": "Mantén la constancia en tu entrenamiento para obtener los mejores resultados."
  },
  "premium": {
    "title": "Passer à Premium",
    "removeAds": "Supprimer les publicités",
    "allPrograms": "Débloquez l’expérience complète",
    "active": "Premium est actif",
    "restore": "Restaurer les achats",
    "restoreTitle": "Restaurer les achats",
    "restoreSuccess": "Premium restauré avec succès.",
    "restoreEmpty": "Aucun achat Premium trouvé.",
    "errorTitle": "Échec de l’achat",
    "errorText": "Impossible de finaliser l’achat.",
    "productUnavailable": "Produit Premium introuvable. Veuillez vérifier la configuration de Play Console / App Store.",
    "subUnavailable": "Abonnement mensuel introuvable. Veuillez vérifier la configuration de Play Console / App Store.",
    "loading": "Chargement...",
    "monthlyTitle": "Premium mensuel",
    "monthlyDesc": "Renouvellement automatique chaque mois pour garder Premium actif",
    "subscribeMonthly": "S’abonner mensuellement",
    "lifetimeTitle": "Premium à vie",
    "lifetimeDesc": "Paiement unique, gardez Premium pour toujours",
    "buyLifetime": "Acheter à vie"
  },
  "video": {
    "loading": "Chargement...",
    "play": "Commencer l’entraînement",
    "error": "Impossible de lire la vidéo. Veuillez réessayer."
  },
// fr
settings: {
  title: 'Paramètres',
  language: 'Langue',
  choose: 'Choisir une langue',
  chooseLanguage: 'Choisissez la langue de l’application',
  general: 'Général',
  dailyReminder: 'Rappel quotidien',
  tapToToggleReminder: 'Touchez pour changer le rappel',
  accountAndTraining: 'Compte et entraînement',
  // fr
workoutReminderKicker: 'RAPPEL D’ENTRAÎNEMENT',
chooseWorkoutReminderTime: 'Choisir l’heure du rappel',
workoutReminderDesc:
  'Sélectionnez l’heure à laquelle vous souhaitez être rappelé de vous entraîner chaque jour.',
hour: 'Heure',
minute: 'Minute',
saveReminder: 'Enregistrer',
disableReminder: 'Désactiver',
reminderOffText: 'Désactivé • touchez pour choisir l’heure',
dailyReminderTitle: 'C’est l’heure de s’entraîner ! 💪',
dailyReminderBody:
  'Ouvrez Insanity Deluxe Edition et terminez la séance du jour.',
},
  "onboard": {
    "title": "C’est parti 👋",
    "subtitle": "Entrez quelques détails pour un plan adapté",
    "name": "Nom complet *",
    "age": "Âge *",
    "gender": "Sexe *",
    "gender_male": "Homme",
    "gender_female": "Femme",
    "gender_other": "Autre",
    "health": "État de santé",
    "height": "Taille (cm) *",
    "weight": "Poids (kg) *",
    "injured_q": "Avez-vous une blessure ?",
    "injury_note": "Description de la blessure",
    "goal": "Objectif actuel *",
    "goals": {
      "lose_weight": "Perdre du poids",
      "build_muscle": "Prendre du muscle",
      "maintain": "Maintenir",
      "recomp": "Recomposition (perdre gras + prendre muscle)",
      "endurance": "Endurance",
      "flexibility": "Souplesse"
    },
    "tip_title": "Conseils rapides",
    "tip_1": "En cas de blessure, commencez par des exercices à faible impact et augmentez progressivement.",
    "tip_2": "Mettez à jour votre poids tous les 3 jours pour suivre vos progrès.",
    "back": "Retour",
    "next": "Suivant",
    "finish": "Terminer",
    "saving": "Enregistrement...",
    "bmi": "IMC",
    "bmi_result_title": "Bilan santé",
    "bmi_label_under": "Insuffisance pondérale",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Surpoids",
    "bmi_label_obese": "Obésité",
    "advice_intro": "• Votre IMC : {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Focus prise de masse : corps complet/haut-bas à intensité modérée ; augmenter la charge ; protéines et calories adéquates.",
    "advice_bmi_normal": "• Maintien : mix force + cardio modéré (2–3 j/sem) ; priorité à la technique et au sommeil.",
    "advice_bmi_over": "• Perte de gras : cardio modéré/HIIT léger 2–3 j + force corps complet ; léger déficit calorique.",
    "advice_bmi_obese": "• Perte sûre : marche rapide/cardio faible impact + force base ; surveiller FC, augmenter intensité progressivement.",
    "advice_goal_lose_weight": "• Objectif : Perdre poids → suivre calories, 1.6–2.2g/kg protéine, 7–8h sommeil.",
    "advice_goal_build_muscle": "• Objectif : Muscle → surcharge progressive 3–5 j/sem, 1.6–2.2g/kg protéine, léger surplus.",
    "advice_goal_maintain": "• Objectif : Maintien → 3 j/sem, équilibre force + cardio, pesée hebdomadaire.",
    "advice_goal_recomp": "• Objectif : Recomp → muscu base + haute protéine, léger déficit, bien dormir.",
    "advice_goal_endurance": "• Objectif : Endurance → zone 2 + intervalles ; glucides avant l’effort.",
    "advice_goal_flexibility": "• Objectif : Souplesse → mobilité quotidienne/amplitude 10–20 min, ajouter force légère.",
    "advice_injured": "• Note blessure : faible impact, amplitude sans douleur ; progrès graduel ; consulter coach/médecin si besoin.",
    "advice_healthnote": "• Surveillez les problèmes de santé notés et ajustez l’intensité en conséquence.",
    "start_training": "Commencer l’entraînement"
  },
  "weight": {
    "prompt_title": "Mise à jour du poids",
    "prompt_desc": "Entrez votre poids actuel (kg)",
    "prompt_placeholder": "ex : 65.5",
    "later": "Plus tard",
    "save": "Enregistrer",
    "chart_title": "Suivi du poids",
    "chart_empty": "Pas encore de données. L’appli vous rappellera périodiquement de noter votre poids."
  },
  "UserProfile": {
    "title": "Profil utilisateur",
    "subtitle": "Entrez vos infos pour des recommandations personnalisées",
    "name_label": "Nom complet *",
    "name_ph": "ex : Jean Dupont",
    "age_label": "Âge",
    "age_ph": "ex : 28",
    "gender_label": "Sexe",
    "gender_male": "Homme",
    "gender_female": "Femme",
    "gender_other": "Autre",
    "height_label": "Taille (cm)",
    "height_ph": "ex : 170",
    "weight_label": "Poids (kg)",
    "weight_ph": "ex : 65",
    "bmi": "IMC",
    "bmi_label_under": "Insuffisance pondérale",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Surpoids",
    "bmi_label_obese": "Obésité",
    "health_label": "État de santé",
    "health_ph": "ex : Tension stable, bon sommeil, reprise du sport...",
    "injured_q": "Des blessures ?",
    "injury_label": "Détails de la blessure",
    "injury_ph": "ex : Douleur genou gauche, éviter squats profonds ; épaule...",
    "hint_fill_hw": "Entrez taille & poids pour voir les suggestions.",
    "rec_injured": "Recommandation : prioriser séances Gainage/Haut légères avec plus de repos.",
    "rec_overweight": "Recommandation : Plan perte de gras (HIIT léger → modéré) alterné avec Bas/Gainage.",
    "rec_general": "Recommandation : Plan corps complet (force fondamentale + Gainage).",
    "loading": "Chargement...",
    "save_success_title": "Enregistré",
    "save_error_title": "Erreur",
    "save_error_msg": "Impossible d'enregistrer. Veuillez réessayer.",
    "btn_delete": "Supprimer",
    "btn_save": "Enregistrer"
  },
  "dashboard": {
    "title": "Tableau de progression",
    "streak": "Série",
    "thisWeek": "Cette semaine",
    "total": "Total",
    "completedPrograms": "Terminés",
    "lastWorkout": "Dernier entraînement"
  },
  "recommend": {
    "title": "Recommandé pour vous",
    "start": "Commencer ce programme"
  },
  "nutrition": {
    "title": "Nutrition",
    "subtitle": "L’application suggère calories, eau et ratios nutritionnels selon votre objectif.",
    "noProfileTitle": "Complétez d’abord votre profil",
    "noProfileText": "Ajoutez taille, poids et objectif pour obtenir des recommandations personnalisées.",
    "targets": "Objectifs quotidiens",
    "calories": "Calories",
    "water": "Eau",
    "macros": "Répartition des macros",
    "protein": "Protéines",
    "carbs": "Glucides",
    "fats": "Lipides",
    "sampleMeals": "Repas exemples",
    "tips": "Conseils",
    "screenTitle": "Nutrition",
    "heroStep": "3",
    "heroTitleLine1": "Plan nutritionnel",
    "heroTitleLine2": "personnalisé",
    "dailyGoal": "Objectifs quotidiens",
    "edit": "Modifier",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Ratio macro",
    "carb": "Glucides",
    "fat": "Lipides",
    "viewAll": "Tout voir",
    "breakfast": "Petit-déjeuner",
    "lunch": "Déjeuner",
    "dinner": "Dîner",
    "snack": "Collation",
    "mealPlan": "Suggestions de repas",
    "tipFallback": "Buvez suffisamment d’eau et privilégiez les aliments riches en protéines.",
    "footer1": "Dès aujourd’hui,",
    "footer2": "une meilleure version de vous",
    "science": "Science",
    "effective": "Efficace",
    "sustainable": "Durable",
    "advancedMode": "MODE AVANCÉ",
    "pro": "PRO",
    "advancedTitle": "Analyse nutritionnelle professionnelle",
    "bmi": "IMC",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Ajustement",
    "kcalPerDay": "kcal/jour",
    "mealSplit": "Répartition des calories par repas",
    "hydration": "Programme d’hydratation",
    "note": "Note importante",
    // fr
customTargetKicker: 'OBJECTIF PERSONNALISÉ',
editDailyGoals: 'Modifier les objectifs quotidiens',
editDailyGoalsDesc:
  'Modifiez l’objectif de calories ou d’eau. L’application recalculera automatiquement les macros et les suggestions de repas.',
resetAuto: 'Auto',
// fr
waterReminderKicker: 'HYDRATATION',
waterReminder: 'Rappel d’eau',
waterReminderDesc:
  'Recevez des rappels doux pendant la journée selon votre objectif d’eau.',
waterReminderOn: 'Activé',
waterReminderOff: 'Désactivé',
waterTarget: 'Objectif d’eau',
reminderTime: 'Heure du rappel',
reminderInterval: 'Intervalle',
waterReminderTitle: 'Il est temps de boire de l’eau',
waterReminderBody: 'Buvez environ {{amount}}ml d’eau pour rester hydraté.',
  },
  "beginner": {
    "modeTitle": "Mode débutant",
    "modeDesc": "Des explications simples et un guide rapide pour les nouveaux utilisateurs.",
    "glossaryTitle": "Guide du débutant",
    "terms": {
      "restDay": {
        "title": "Jour de repos",
        "desc": "C’est un jour de récupération. Votre corps se repose et se reconstruit, alors ne le sautez pas."
      },
      "warmUp": {
        "title": "Échauffement",
        "desc": "Mouvements légers avant l’entraînement pour préparer votre corps et réduire le risque de blessure."
      },
      "cooldown": {
        "title": "Retour au calme",
        "desc": "Mouvements faciles ou étirements après l’entraînement pour aider votre corps à récupérer."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "Entraînement fractionné à haute intensité : de courtes phases d’effort intense suivies de courtes pauses."
      },
      "rep": {
        "title": "Répétition",
        "desc": "Un mouvement complet d’un exercice. Exemple : un squat = une répétition."
      },
      "set": {
        "title": "Série",
        "desc": "Un groupe de répétitions. Exemple : 10 squats effectués ensemble = 1 série."
      }
    }
  },
  "todayWorkout": {
    "title": "Entraînement du jour",
    "fallback": "Entraînement",
    "startNow": "Commencer maintenant",
    "restTitle": "Aujourd’hui est un jour de récupération",
    "restText": "Faites une pause, étirez-vous doucement, buvez de l’eau et préparez-vous pour votre prochain entraînement."
  },
  "common": {
    "on": "ACTIVÉ",
    "off": "DÉSACTIVÉ",
    "cancel": "Annuler",
    "edit": "Modifier",
    "viewAll": "Tout voir"
  },
  "history": {
    "title": "Historique d'entraînement",
    "screenTitle": "Historique d'entraînement",
    "thisWeek": "Cette semaine",
    "minutes": "Minutes",
    "totalWorkouts": "Entraînements",
    "empty": "Aucun entraînement terminé pour l'instant.",
    "viewAll": "Voir tout",
    "filter7": "7 jours",
    "filter30": "30 jours",
    "filterAll": "Tous"
  },
  "achievements": {
    "title": "Succès",
    "firstWorkout": "Premier entraînement",
    "tenWorkouts": "10 entraînements",
    "twentyfiveWorkouts": "25 entraînements",
    "streak3": "Série de 3 jours",
    "streak7": "Série de 7 jours",
    "week4": "4 entraînements cette semaine",
    "finishProgram": "Terminer 1 programme"
  },
  "challenges": {
    "title": "Défis",
    "intro": "Commencez un défi court pour rester régulier.",
    "start7": "Commencer le défi de 7 jours",
    "start30": "Commencer le défi de 30 jours",
    "complete": "Défi terminé",
    "daysLeft": "Il reste {{count}} jour(s)",
    "starter7Title": "Défi débutant de 7 jours",
    "starter7Desc": "Terminez 5 entraînements en 7 jours.",
    "consistency30Title": "Défi régularité de 30 jours",
    "consistency30Desc": "Terminez 20 entraînements en 30 jours."
  },
  "filters": {
    "all": "Tous",
    "levelTitle": "Niveau",
    "level": {
      "beginner": "Débutant",
      "intermediate": "Intermédiaire",
      "advanced": "Avancé"
    },
    "goalTitle": "Objectif",
    "goal": {
      "lose_weight": "Perte de poids",
      "build_muscle": "Prise de muscle",
      "cardio": "Cardio",
      "core": "Abdos",
      "mobility": "Mobilité"
    },
    "equipmentTitle": "Équipement",
    "equipment": {
      "no_equipment": "Sans équipement",
      "with_equipment": "Avec équipement"
    },
    "durationTitle": "Durée",
    "duration": {
      "short": "Courte",
      "medium": "Moyenne",
      "long": "Longue"
    },
    "noResultsTitle": "Aucun programme correspondant",
    "noResultsText": "Essayez de modifier un ou plusieurs filtres."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "Plan {{goalLabel}} : {{calories}} kcal/jour, {{proteinG}}g de protéines, {{carbsG}}g de glucides, {{fatsG}}g de lipides. BMR estimé {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Perte de gras",
      "build_muscle": "Prise de muscle",
      "maintain": "Maintien",
      "recomp": "Recomposition corporelle",
      "endurance": "Endurance",
      "flexibility": "Bien-être général"
    },
    "activity": {
      "sedentary": "Sédentaire",
      "light": "Activité légère",
      "moderate": "Activité modérée",
      "active": "Actif",
      "very_active": "Très actif"
    },
    "bmi": {
      "under": "Insuffisance pondérale",
      "normal": "Normal",
      "over": "Surpoids",
      "obese": "Obésité"
    },
    "hydration": {
      "morning": "Matin : 500ml au réveil",
      "beforeWorkout": "Avant l’entraînement : 300–500ml",
      "duringWorkout": "Pendant l’entraînement : petites gorgées toutes les 10–15 minutes",
      "evening": "Soir : terminer le reste de l’objectif d’eau"
    },
    "tips": {
      "protein": "Visez environ {{proteinG}}g de protéines par jour, réparties sur 3–4 repas.",
      "water": "Buvez environ {{waterLiters}}L d’eau par jour. Ajoutez-en les jours chauds ou intenses.",
      "fiber": "Visez au moins {{fiberG}}g de fibres via légumes, fruits, légumineuses et céréales complètes.",
      "lose_weight": "Gardez un déficit calorique modéré. Évitez les coupes trop agressives.",
      "build_muscle": "Combinez un léger surplus calorique avec un entraînement progressif.",
      "recomp": "Priorisez protéines et régularité. La recomposition demande du temps.",
      "injured": "Blessure indiquée : évitez les déficits agressifs et priorisez la récupération.",
      "healthNote": "Note santé ajoutée. Utilisez ce plan comme guide général."
    },
    "warnings": {
      "lowCalories": "Votre objectif calorique est bas. Assurez-vous d’avoir protéines, micronutriments et récupération.",
      "lowBmi": "L’IMC est bas. Un objectif de perte de gras peut ne pas convenir.",
      "injured": "Blessure indiquée : priorité à récupération, sommeil, hydratation et entraînement doux.",
      "healthNote": "Note santé détectée : ce plan n’est pas un avis médical."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const de = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Start",
    "nutrition": "Ernährung",
    "guide": "Anleitung",
    "premium": "Premium",
    "settings": "Einstellungen",
    "workout": "Training",
    "more": "Mehr",
    "program": "Programm",
    "profile": "Benutzerprofil",
    "weightChart": "Gewichtsverlauf"
  },
  "home": {
    "title": "Wähle deinen Trainingsplan",
    "subtitle": "Wähle ein Programm und trainiere täglich",
    "program60": "60-Tage Fettverbrennungs-Programm",
    "program90": "90-Tage Ganzkörper-Programm",
    "daysSuffix": "{{count}} Tage",
    "health_overview": "Gesundheitsübersicht",
    "activeTitle": "In Arbeit",
    "noActive": "Derzeit wird kein Programm trainiert."
  },
  "program": {
    "daysPrefix": "Tag {{day}} • {{weekday}}",
    "weekTitle": "Woche {{n}}",
    "completed": "Abgeschlossen",
    "todayWorkout": "Training: {{name}}"
  },
  "workouts": {
    "rest": "Erholung / Pause",
    "hiit": "Ganzkörper-HIIT",
    "upper": "Brust - Schulter - Arme",
    "lower": "Gesäß - Beine",
    "core": "Bauch & Rumpf",
    "pickOne": "Wähle einen Plan, um zu starten",
    "days": "Tag",
    "day": "Tag",
    "heroTitle": "Dein täglicher Trainingsplan",
    "matchingResults": "Passende Ergebnisse"
  },
  "guide": {
    "title": "So verwendest du PulseFit",
    "subtitle": "Folge diesen einfachen Schritten, um mit deinem Training zu beginnen.",
    "steps": {
      "step1": {
        "badge": "Schritt 1",
        "title": "Gib deine persönlichen Daten ein",
        "desc": "Trage Größe, Gewicht, Gesundheitszustand, Ziele und weitere grundlegende Informationen ein. Die App berechnet deinen BMI und gibt dir Gesundheitstipps für einen sicheren Start."
      },
      "step2": {
        "badge": "Schritt 2",
        "title": "Wähle ein passendes Trainingsprogramm",
        "desc": "Sieh dir die verfügbaren Programme an und wähle das aus, das am besten zu deinem Fitnesslevel, deinen Zielen und deinen Vorlieben passt."
      },
      "step3": {
        "badge": "Schritt 3",
        "title": "Wähle deinen Trainingstag",
        "desc": "Öffne das ausgewählte Programm und wähle den Trainingstag, dem du folgen möchtest. Du kannst den Plan Schritt für Schritt abarbeiten."
      },
      "step4": {
        "badge": "Schritt 4",
        "title": "Trainiere mit dem Video",
        "desc": "Folge dem Trainingsvideo, um korrekt zu trainieren. Du kannst dein Handy ins Querformat drehen, um das Video im Vollbild anzusehen."
      }
    },
    "noteTitle": "Hinweis",
    "note": "Bleibe konsequent bei deinem Trainingsplan, um die besten Ergebnisse zu erzielen."
  },
  "premium": {
    "title": "Auf Premium upgraden",
    "removeAds": "Werbung entfernen",
    "allPrograms": "Das volle Erlebnis freischalten",
    "active": "Premium ist aktiv",
    "restore": "Käufe wiederherstellen",
    "restoreTitle": "Käufe wiederherstellen",
    "restoreSuccess": "Premium erfolgreich wiederhergestellt.",
    "restoreEmpty": "Kein Premium-Kauf gefunden.",
    "errorTitle": "Kauf fehlgeschlagen",
    "errorText": "Der Kauf konnte nicht abgeschlossen werden.",
    "productUnavailable": "Premium-Produkt nicht gefunden. Bitte prüfen Sie die Play Console / App Store-Konfiguration.",
    "subUnavailable": "Monatliches Abo nicht gefunden. Bitte prüfen Sie die Play Console / App Store-Konfiguration.",
    "loading": "Wird geladen...",
    "monthlyTitle": "Monatliches Premium",
    "monthlyDesc": "Verlängert sich jeden Monat automatisch, um Premium aktiv zu halten",
    "subscribeMonthly": "Monatlich abonnieren",
    "lifetimeTitle": "Premium auf Lebenszeit",
    "lifetimeDesc": "Einmalige Zahlung, Premium für immer behalten",
    "buyLifetime": "Lebenslang kaufen"
  },
  "video": {
    "loading": "Video lädt...",
    "play": "Training starten",
    "error": "Video kann nicht abgespielt werden. Bitte versuche es erneut."
  },
// de
settings: {
  title: 'Einstellungen',
  language: 'Sprache',
  choose: 'Sprache wählen',
  chooseLanguage: 'App-Sprache auswählen',
  general: 'Allgemein',
  dailyReminder: 'Tägliche Erinnerung',
  tapToToggleReminder: 'Tippen, um die Erinnerung 20:00/07:00 zu wechseln',
  accountAndTraining: 'Konto & Training',
  // de
workoutReminderKicker: 'TRAININGSERINNERUNG',
chooseWorkoutReminderTime: 'Erinnerungszeit wählen',
workoutReminderDesc:
  'Wähle die Uhrzeit aus, zu der dich die App täglich ans Training erinnern soll.',
hour: 'Stunde',
minute: 'Minute',
saveReminder: 'Speichern',
disableReminder: 'Deaktivieren',
reminderOffText: 'Aus • tippen, um eine Zeit zu wählen',
dailyReminderTitle: 'Zeit fürs Training! 💪',
dailyReminderBody:
  'Öffne Insanity Deluxe Edition und absolviere deine heutige Einheit.',
},
  "onboard": {
    "title": "Lass uns starten 👋",
    "subtitle": "Gib ein paar Details ein, damit wir den passenden Plan finden",
    "name": "Vollständiger Name *",
    "age": "Alter *",
    "gender": "Geschlecht *",
    "gender_male": "Männlich",
    "gender_female": "Weiblich",
    "gender_other": "Divers",
    "health": "Gesundheitszustand",
    "height": "Größe (cm) *",
    "weight": "Gewicht (kg) *",
    "injured_q": "Verletzungen?",
    "injury_note": "Beschreibung der Verletzung",
    "goal": "Aktuelles Ziel *",
    "goals": {
      "lose_weight": "Abnehmen",
      "build_muscle": "Muskelaufbau",
      "maintain": "Gewicht halten",
      "recomp": "Rekomposition (Fettabbau + Muskelaufbau)",
      "endurance": "Ausdauer",
      "flexibility": "Beweglichkeit"
    },
    "tip_title": "Schnelle Tipps",
    "tip_1": "Bei Verletzungen: Beginne mit schonenden Übungen und steigere dich langsam.",
    "tip_2": "Aktualisiere dein Gewicht alle 3 Tage, um den Fortschritt zu sehen.",
    "back": "Zurück",
    "next": "Weiter",
    "finish": "Fertig",
    "saving": "Speichern...",
    "bmi": "BMI",
    "bmi_result_title": "Gesundheitsübersicht",
    "bmi_label_under": "Untergewicht",
    "bmi_label_normal": "Normalgewicht",
    "bmi_label_over": "Übergewicht",
    "bmi_label_obese": "Adipositas",
    "advice_intro": "• Dein BMI: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Fokus Muskelaufbau: Ganzkörper/Ober-Unterkörper bei moderater Intensität; Last steigern; ausreichend Protein & Kalorien.",
    "advice_bmi_normal": "• Erhalten: Mix aus Kraft + moderatem Cardio (2–3 Tage/Woche); Priorität auf Technik und Schlaf.",
    "advice_bmi_over": "• Fettabbau: Moderates Cardio/leichtes HIIT 2–3 Tage + Ganzkörperkrafttraining; leichtes Kaloriendefizit.",
    "advice_bmi_obese": "• Sicherer Abbau: Zügiges Gehen/schonendes Cardio + Basiskraft; Puls überwachen, Intensität langsam steigern.",
    "advice_goal_lose_weight": "• Ziel: Abnehmen → Kalorien tracken, 1.6–2.2g/kg Protein, 7–8h Schlaf.",
    "advice_goal_build_muscle": "• Ziel: Muskelaufbau → Progressive Überlastung 3–5 Tage/Woche, 1.6–2.2g/kg Protein, leichter Überschuss.",
    "advice_goal_maintain": "• Ziel: Halten → 3 Tage/Woche, Balance Kraft + Cardio, wöchentlich wiegen.",
    "advice_goal_recomp": "• Ziel: Rekomp → Basis-Krafttraining + viel Protein, leichtes Defizit, gut schlafen.",
    "advice_goal_endurance": "• Ziel: Ausdauer → Zone 2 + Intervalle; Kohlenhydrate vor dem Training.",
    "advice_goal_flexibility": "• Ziel: Beweglichkeit → Tägliche Mobilität/ROM 10–20 Min., leichtes Krafttraining ergänzen.",
    "advice_injured": "• Hinweis Verletzung: Geringe Belastung, schmerzfreier Radius; langsam steigern; bei Bedarf Arzt/Trainer fragen.",
    "advice_healthnote": "• Beachte die notierten gesundheitlichen Bedingungen und passe die Intensität an.",
    "start_training": "Training starten"
  },
  "weight": {
    "prompt_title": "Gewicht aktualisieren",
    "prompt_desc": "Aktuelles Gewicht eingeben (kg)",
    "prompt_placeholder": "z. B. 65,5",
    "later": "Später",
    "save": "Speichern",
    "chart_title": "Gewichtsverlauf",
    "chart_empty": "Noch keine Daten. Die App erinnert dich regelmäßig daran, dein Gewicht zu loggen."
  },
  "UserProfile": {
    "title": "Benutzerprofil",
    "subtitle": "Gib deine Infos ein für personalisierte Empfehlungen",
    "name_label": "Vollständiger Name *",
    "name_ph": "z. B. Max Mustermann",
    "age_label": "Alter",
    "age_ph": "z. B. 28",
    "gender_label": "Geschlecht",
    "gender_male": "Männlich",
    "gender_female": "Weiblich",
    "gender_other": "Divers",
    "height_label": "Größe (cm)",
    "height_ph": "z. B. 170",
    "weight_label": "Gewicht (kg)",
    "weight_ph": "z. B. 65",
    "bmi": "BMI",
    "bmi_label_under": "Untergewicht",
    "bmi_label_normal": "Normalgewicht",
    "bmi_label_over": "Übergewicht",
    "bmi_label_obese": "Adipositas",
    "health_label": "Gesundheitsstatus",
    "health_ph": "z. B. Blutdruck stabil, guter Schlaf, Wiedereinstieg...",
    "injured_q": "Verletzungen?",
    "injury_label": "Details zur Verletzung",
    "injury_ph": "z. B. Schmerzen im linken Knie, keine tiefen Kniebeugen...",
    "hint_fill_hw": "Größe & Gewicht eingeben für Vorschläge.",
    "rec_injured": "Empfehlung: Priorisiere leichte Rumpf/Oberkörper-Einheiten mit mehr Ruhetagen.",
    "rec_overweight": "Empfehlung: Fettabbau-Plan (leichtes → moderates HIIT) im Wechsel mit Unterkörper/Rumpf.",
    "rec_general": "Empfehlung: Ganzkörper-Plan (Grundkraft + Rumpf).",
    "loading": "Lädt...",
    "save_success_title": "Gespeichert",
    "save_error_title": "Fehler",
    "save_error_msg": "Daten konnten nicht gespeichert werden. Bitte erneut versuchen.",
    "btn_delete": "Löschen",
    "btn_save": "Speichern"
  },
  "dashboard": {
    "title": "Fortschrittsübersicht",
    "streak": "Serie",
    "thisWeek": "Diese Woche",
    "total": "Gesamt",
    "completedPrograms": "Abgeschlossen",
    "lastWorkout": "Letztes Training"
  },
  "recommend": {
    "title": "Empfohlen für dich",
    "start": "Diesen Plan starten"
  },
  "nutrition": {
    "title": "Ernährung",
    "subtitle": "Die App empfiehlt Kalorien, Wasser und Nährstoffverteilung passend zu deinem Ziel.",
    "noProfileTitle": "Profil zuerst vervollständigen",
    "noProfileText": "Füge Größe, Gewicht und Ziel hinzu, um Empfehlungen zu erhalten.",
    "targets": "Tagesziele",
    "calories": "Kalorien",
    "water": "Wasser",
    "macros": "Makroverteilung",
    "protein": "Protein",
    "carbs": "Kohlenhydrate",
    "fats": "Fette",
    "sampleMeals": "Beispielmahlzeiten",
    "tips": "Tipps",
    "screenTitle": "Ernährung",
    "heroStep": "3",
    "heroTitleLine1": "Personalisierter",
    "heroTitleLine2": "Ernährungsplan",
    "dailyGoal": "Tagesziele",
    "edit": "Bearbeiten",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Makro-Verhältnis",
    "carb": "Kohlenhydrate",
    "fat": "Fett",
    "viewAll": "Alle ansehen",
    "breakfast": "Frühstück",
    "lunch": "Mittagessen",
    "dinner": "Abendessen",
    "snack": "Snack",
    "mealPlan": "Essensvorschläge",
    "tipFallback": "Trinke genug Wasser und bevorzuge proteinreiche Lebensmittel.",
    "footer1": "Ab heute,",
    "footer2": "eine bessere Version von dir",
    "science": "Wissenschaft",
    "effective": "Effektiv",
    "sustainable": "Nachhaltig",
    "advancedMode": "ERWEITERTER MODUS",
    "pro": "PRO",
    "advancedTitle": "Professionelle Ernährungsanalyse",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Anpassung",
    "kcalPerDay": "kcal/Tag",
    "mealSplit": "Kalorienverteilung pro Mahlzeit",
    "hydration": "Trinkplan",
    "note": "Wichtiger Hinweis",
    // de
customTargetKicker: 'BENUTZERDEFINIERTES ZIEL',
editDailyGoals: 'Tagesziele bearbeiten',
editDailyGoalsDesc:
  'Ändere das Kalorien- oder Wasserziel. Die App berechnet Makros und Mahlzeitenvorschläge automatisch neu.',
resetAuto: 'Auto',
// de
waterReminderKicker: 'HYDRATION',
waterReminder: 'Wasser-Erinnerung',
waterReminderDesc:
  'Erhalte sanfte Erinnerungen im Tagesverlauf basierend auf deinem Wasserziel.',
waterReminderOn: 'Ein',
waterReminderOff: 'Aus',
waterTarget: 'Wasserziel',
reminderTime: 'Erinnerungszeit',
reminderInterval: 'Intervall',
waterReminderTitle: 'Zeit, Wasser zu trinken',
waterReminderBody: 'Trinke etwa {{amount}}ml Wasser, um hydriert zu bleiben.',
  },
  "beginner": {
    "modeTitle": "Anfängermodus",
    "modeDesc": "Einfache Erklärungen und schnelle Hilfe für neue Nutzer.",
    "glossaryTitle": "Anfängerleitfaden",
    "terms": {
      "restDay": {
        "title": "Ruhetag",
        "desc": "Ein Erholungstag. Dein Körper ruht sich aus und baut sich wieder auf, also überspringe ihn nicht."
      },
      "warmUp": {
        "title": "Aufwärmen",
        "desc": "Leichte Bewegung vor dem Training, um deinen Körper vorzubereiten und das Verletzungsrisiko zu verringern."
      },
      "cooldown": {
        "title": "Abkühlen",
        "desc": "Leichte Bewegung oder Dehnen nach dem Training, damit sich dein Körper besser erholen kann."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "Hochintensives Intervalltraining: kurze Phasen harter Belastung, gefolgt von kurzen Pausen."
      },
      "rep": {
        "title": "Wiederholung",
        "desc": "Eine vollständige Ausführung einer Übung. Beispiel: eine Kniebeuge = eine Wiederholung."
      },
      "set": {
        "title": "Satz",
        "desc": "Eine Gruppe von Wiederholungen. Beispiel: 10 Kniebeugen am Stück = 1 Satz."
      }
    }
  },
  "todayWorkout": {
    "title": "Heutiges Training",
    "fallback": "Training",
    "startNow": "Jetzt starten",
    "restTitle": "Heute ist ein Erholungstag",
    "restText": "Mach eine Pause, dehne dich leicht, trinke Wasser und bereite dich auf dein nächstes Training vor."
  },
  "common": {
    "on": "EIN",
    "off": "AUS",
    "cancel": "Abbrechen",
    "edit": "Bearbeiten",
    "viewAll": "Alle ansehen"
  },
  "history": {
    "title": "Trainingsverlauf",
    "screenTitle": "Trainingsverlauf",
    "thisWeek": "Diese Woche",
    "minutes": "Minuten",
    "totalWorkouts": "Workouts",
    "empty": "Noch keine abgeschlossenen Workouts.",
    "viewAll": "Alle anzeigen",
    "filter7": "7 Tage",
    "filter30": "30 Tage",
    "filterAll": "Alle"
  },
  "achievements": {
    "title": "Erfolge",
    "firstWorkout": "Erstes Workout",
    "tenWorkouts": "10 Workouts",
    "twentyfiveWorkouts": "25 Workouts",
    "streak3": "3-Tage-Serie",
    "streak7": "7-Tage-Serie",
    "week4": "4 Workouts diese Woche",
    "finishProgram": "1 Programm abschließen"
  },
  "challenges": {
    "title": "Challenges",
    "intro": "Starte eine kurze Challenge, um dranzubleiben.",
    "start7": "7-Tage-Challenge starten",
    "start30": "30-Tage-Challenge starten",
    "complete": "Challenge abgeschlossen",
    "daysLeft": "{{count}} Tag(e) übrig",
    "starter7Title": "7-Tage-Starter-Challenge",
    "starter7Desc": "Schließe 5 Workouts in 7 Tagen ab.",
    "consistency30Title": "30-Tage-Konstanz-Challenge",
    "consistency30Desc": "Schließe 20 Workouts in 30 Tagen ab."
  },
  "filters": {
    "all": "Alle",
    "levelTitle": "Niveau",
    "level": {
      "beginner": "Anfänger",
      "intermediate": "Mittelstufe",
      "advanced": "Fortgeschritten"
    },
    "goalTitle": "Fokus",
    "goal": {
      "lose_weight": "Abnehmen",
      "build_muscle": "Muskeln aufbauen",
      "cardio": "Cardio",
      "core": "Core",
      "mobility": "Mobilität"
    },
    "equipmentTitle": "Ausrüstung",
    "equipment": {
      "no_equipment": "Ohne Geräte",
      "with_equipment": "Mit Geräten"
    },
    "durationTitle": "Dauer",
    "duration": {
      "short": "Kurz",
      "medium": "Mittel",
      "long": "Lang"
    },
    "noResultsTitle": "Keine passenden Programme",
    "noResultsText": "Versuchen Sie, einen oder mehrere Filter zu ändern."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "{{goalLabel}}-Plan: {{calories}} kcal/Tag, {{proteinG}}g Protein, {{carbsG}}g Kohlenhydrate, {{fatsG}}g Fett. Geschätzter BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Fettabbau",
      "build_muscle": "Muskelaufbau",
      "maintain": "Halten",
      "recomp": "Körperrekomposition",
      "endurance": "Ausdauer",
      "flexibility": "Allgemeines Wohlbefinden"
    },
    "activity": {
      "sedentary": "Sitzend",
      "light": "Leichte Aktivität",
      "moderate": "Moderate Aktivität",
      "active": "Aktiv",
      "very_active": "Sehr aktiv"
    },
    "bmi": {
      "under": "Untergewicht",
      "normal": "Normal",
      "over": "Übergewicht",
      "obese": "Adipositas"
    },
    "hydration": {
      "morning": "Morgens: 500ml nach dem Aufwachen",
      "beforeWorkout": "Vor dem Training: 300–500ml",
      "duringWorkout": "Während des Trainings: alle 10–15 Minuten kleine Schlucke",
      "evening": "Abends: restliches Wasserziel erreichen"
    },
    "tips": {
      "protein": "Ziele auf ca. {{proteinG}}g Protein pro Tag, verteilt auf 3–4 Mahlzeiten.",
      "water": "Trinke etwa {{waterLiters}}L Wasser täglich. An heißen oder intensiven Tagen mehr.",
      "fiber": "Ziele auf mindestens {{fiberG}}g Ballaststoffe aus Gemüse, Obst, Bohnen und Vollkorn.",
      "lose_weight": "Halte ein moderates Kaloriendefizit. Schneide Kalorien nicht zu aggressiv.",
      "build_muscle": "Kombiniere kleinen Kalorienüberschuss mit progressivem Krafttraining.",
      "recomp": "Priorisiere Protein und Konstanz. Rekomposition braucht Zeit.",
      "injured": "Bei Verletzung: keine aggressiven Defizite, Erholung priorisieren.",
      "healthNote": "Gesundheitsnotiz vorhanden. Nutze den Plan als allgemeine Orientierung."
    },
    "warnings": {
      "lowCalories": "Dein Kalorienziel ist niedrig. Achte auf Protein, Mikronährstoffe und Erholung.",
      "lowBmi": "Der BMI ist niedrig. Fettabbau ist möglicherweise nicht passend.",
      "injured": "Verletzung markiert: Erholung, Schlaf, Hydration und gelenkschonendes Training priorisieren.",
      "healthNote": "Gesundheitsnotiz erkannt: Dies ist keine medizinische Beratung."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const zh = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "主页",
    "nutrition": "营养",
    "guide": "指南",
    "premium": "高级版",
    "settings": "设置",
    "workout": "锻炼",
    "more": "更多",
    "program": "计划",
    "profile": "用户个人资料",
    "weightChart": "体重图表"
  },
  "home": {
    "title": "选择你的训练计划",
    "subtitle": "选择课程并每日训练",
    "program60": "60天燃脂计划",
    "program90": "90天全身计划",
    "daysSuffix": "{{count}} 天",
    "health_overview": "健康概览",
    "activeTitle": "Practicing",
    "noActive": "There is no program currently training."
  },
  "program": {
    "daysPrefix": "第 {{day}} 天 • {{weekday}}",
    "weekTitle": "第 {{n}} 周",
    "completed": "已完成",
    "todayWorkout": "今日训练: {{name}}"
  },
  "workouts": {
    "rest": "恢复 / 休息",
    "hiit": "全身 HIIT",
    "upper": "胸 - 肩 - 手臂",
    "lower": "臀部 - 腿部",
    "core": "腹肌 & 核心",
    "pickOne": "选择一个计划开始",
    "days": "天",
    "day": "天",
    "heroTitle": "你的每日训练计划",
    "matchingResults": "匹配结果"
  },
  "guide": {
    "title": "如何使用 PulseFit",
    "subtitle": "按照以下简单步骤开始你的训练之旅。",
    "steps": {
      "step1": {
        "badge": "步骤 1",
        "title": "输入个人信息",
        "desc": "填写你的身高、体重、健康状况、目标以及其他基本信息。应用会计算你的 BMI，并提供健康建议，帮助你更安全地开始训练。"
      },
      "step2": {
        "badge": "步骤 2",
        "title": "选择适合的训练计划",
        "desc": "浏览可用的训练计划，选择最适合你的体能水平、目标和偏好的计划。"
      },
      "step3": {
        "badge": "步骤 3",
        "title": "选择训练日",
        "desc": "打开已选择的训练计划，并选择你要进行的训练日。你可以按照训练安排逐步完成。"
      },
      "step4": {
        "badge": "步骤 4",
        "title": "跟随视频训练",
        "desc": "按照训练视频正确完成动作。你可以将手机横屏，以全屏方式观看视频，获得更好的体验。"
      }
    },
    "noteTitle": "注意",
    "note": "请坚持规律训练，以获得最佳效果。"
  },
  "premium": {
    "title": "升级到高级版",
    "removeAds": "移除广告",
    "allPrograms": "解锁完整体验",
    "active": "高级版已激活",
    "restore": "恢复购买",
    "restoreTitle": "恢复购买",
    "restoreSuccess": "高级版恢复成功。",
    "restoreEmpty": "未找到高级版购买记录。",
    "errorTitle": "购买失败",
    "errorText": "无法完成购买。",
    "productUnavailable": "未找到高级版产品。请检查 Play Console / App Store 设置。",
    "subUnavailable": "未找到月度订阅。请检查 Play Console / App Store 设置。",
    "loading": "加载中...",
    "monthlyTitle": "月度高级版",
    "monthlyDesc": "每月自动续订以保持高级版状态",
    "subscribeMonthly": "按月订阅",
    "lifetimeTitle": "终身高级版",
    "lifetimeDesc": "一次性付款，永久享受高级版",
    "buyLifetime": "购买终身版"
  },
  "video": {
    "loading": "视频加载中...",
    "play": "开始训练",
    "error": "无法播放视频。请重试。"
  },
// zh
settings: {
  title: '设置',
  language: '语言',
  choose: '选择语言',
  chooseLanguage: '选择应用语言',
  general: '通用',
  dailyReminder: '每日提醒',
  tapToToggleReminder: '点击切换每日提醒 20:00/07:00',
  accountAndTraining: '账户与训练',
  // zh
workoutReminderKicker: '训练提醒',
chooseWorkoutReminderTime: '选择提醒时间',
workoutReminderDesc:
  '选择你希望应用每天提醒你训练的时间。',
hour: '小时',
minute: '分钟',
saveReminder: '保存',
disableReminder: '关闭',
reminderOffText: '已关闭 • 点击选择时间',
dailyReminderTitle: '该训练了！💪',
dailyReminderBody:
  '打开 Insanity Deluxe Edition，完成今天的训练。',
},
  "onboard": {
    "title": "让我们开始吧 👋",
    "subtitle": "输入一些信息，以便我们为您推荐合适的计划",
    "name": "全名 *",
    "age": "年龄 *",
    "gender": "性别 *",
    "gender_male": "男",
    "gender_female": "女",
    "gender_other": "其他",
    "health": "健康状况",
    "height": "身高 (cm) *",
    "weight": "体重 (kg) *",
    "injured_q": "是否有伤病?",
    "injury_note": "伤病描述",
    "goal": "当前目标 *",
    "goals": {
      "lose_weight": "减重",
      "build_muscle": "增肌",
      "maintain": "保持",
      "recomp": "身体重组 (减脂 + 增肌)",
      "endurance": "耐力",
      "flexibility": "柔韧性"
    },
    "tip_title": "小贴士",
    "tip_1": "如果有伤病，请从低冲击运动开始，并逐渐增加强度。",
    "tip_2": "每 3 天更新一次体重以追踪进度。",
    "back": "返回",
    "next": "下一步",
    "finish": "完成",
    "saving": "保存中...",
    "bmi": "BMI",
    "bmi_result_title": "健康概览",
    "bmi_label_under": "体重过轻",
    "bmi_label_normal": "正常",
    "bmi_label_over": "超重",
    "bmi_label_obese": "肥胖",
    "advice_intro": "• 您的 BMI: {{bmi}} ({{label}})。",
    "advice_bmi_under": "• 侧重增加瘦体重：中等强度的全身/上下肢分化训练；增加负重；摄入充足蛋白质和热量。",
    "advice_bmi_normal": "• 保持：力量训练 + 中等有氧 (每周 2–3 天)；注重动作质量和睡眠。",
    "advice_bmi_over": "• 减脂：中等有氧/轻度 HIIT (每周 2–3 天) + 全身力量训练；轻微热量缺口。",
    "advice_bmi_obese": "• 安全减脂：快走/低冲击有氧 + 基础力量训练；监测心率，循序渐进增加强度。",
    "advice_goal_lose_weight": "• 目标：减重 → 控制热量，1.6–2.2克/公斤蛋白质，7–8小时睡眠。",
    "advice_goal_build_muscle": "• 目标：增肌 → 渐进式超负荷 (每周 3–5 天)，1.6–2.2克/公斤蛋白质，轻微热量盈余。",
    "advice_goal_maintain": "• 目标：保持 → 每周 3 天，平衡力量 + 有氧，每周称重。",
    "advice_goal_recomp": "• 目标：身体重组 → 基础举铁 + 高蛋白，轻微热量缺口，睡个好觉。",
    "advice_goal_endurance": "• 目标：耐力 → 二区训练 (Zone 2) + 间歇跑；练前补充碳水。",
    "advice_goal_flexibility": "• 目标：柔韧性 → 每日灵活性/关节活动度 (ROM) 10–20分钟，增加轻重量力量训练。",
    "advice_injured": "• 伤病提示：低冲击，无痛活动范围；循序渐进；必要时咨询教练/医生。",
    "advice_healthnote": "• 留意已记录的健康状况，并相应调整强度。",
    "start_training": "开始训练"
  },
  "weight": {
    "prompt_title": "更新体重",
    "prompt_desc": "输入当前体重 (kg)",
    "prompt_placeholder": "例如：65.5",
    "later": "稍后",
    "save": "保存",
    "chart_title": "体重追踪",
    "chart_empty": "暂无数据。应用会定期提醒您记录体重。"
  },
  "UserProfile": {
    "title": "个人资料",
    "subtitle": "输入信息以获取个性化训练建议",
    "name_label": "全名 *",
    "name_ph": "例如：张三",
    "age_label": "年龄",
    "age_ph": "例如：28",
    "gender_label": "性别",
    "gender_male": "男",
    "gender_female": "女",
    "gender_other": "其他",
    "height_label": "身高 (cm)",
    "height_ph": "例如：170",
    "weight_label": "体重 (kg)",
    "weight_ph": "例如：65",
    "bmi": "BMI",
    "bmi_label_under": "体重过轻",
    "bmi_label_normal": "正常",
    "bmi_label_over": "超重",
    "bmi_label_obese": "肥胖",
    "health_label": "健康状况",
    "health_ph": "例如：血压稳定，睡眠良好，恢复训练中...",
    "injured_q": "有伤病吗?",
    "injury_label": "伤病详情",
    "injury_ph": "例如：左膝疼痛，避免深蹲；推举时肩痛...",
    "hint_fill_hw": "输入身高和体重以获取建议。",
    "rec_injured": "建议：优先进行轻度核心/上肢训练，增加休息日。",
    "rec_overweight": "建议：减脂计划 (轻度 → 中度 HIIT) 与下肢/核心训练交替进行。",
    "rec_general": "建议：全身计划 (基础力量 + 核心)。",
    "loading": "加载中...",
    "save_success_title": "已保存",
    "save_error_title": "错误",
    "save_error_msg": "无法保存数据。请重试。",
    "btn_delete": "删除",
    "btn_save": "保存"
  },
  "dashboard": {
    "title": "进度面板",
    "streak": "连续天数",
    "thisWeek": "本周",
    "total": "总计",
    "completedPrograms": "已完成",
    "lastWorkout": "上次训练"
  },
  "recommend": {
    "title": "为你推荐",
    "start": "开始此计划"
  },
  "nutrition": {
    "title": "营养",
    "subtitle": "应用会根据你的目标推荐热量、水分和营养比例。",
    "noProfileTitle": "请先完成个人资料",
    "noProfileText": "添加身高、体重和目标后即可获得个性化营养建议。",
    "targets": "每日目标",
    "calories": "热量",
    "water": "水",
    "macros": "宏量营养分配",
    "protein": "蛋白质",
    "carbs": "碳水",
    "fats": "脂肪",
    "sampleMeals": "示例餐单",
    "tips": "建议",
    "screenTitle": "营养",
    "heroStep": "3",
    "heroTitleLine1": "个性化",
    "heroTitleLine2": "营养计划",
    "dailyGoal": "每日目标",
    "edit": "编辑",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "宏量营养比例",
    "carb": "碳水",
    "fat": "脂肪",
    "viewAll": "查看全部",
    "breakfast": "早餐",
    "lunch": "午餐",
    "dinner": "晚餐",
    "snack": "加餐",
    "mealPlan": "餐食建议",
    "tipFallback": "多喝水，并优先选择高蛋白食物以帮助肌肉恢复。",
    "footer1": "从今天开始，",
    "footer2": "成为更好的自己",
    "science": "科学",
    "effective": "有效",
    "sustainable": "可持续",
    "advancedMode": "高级模式",
    "pro": "PRO",
    "advancedTitle": "专业营养分析",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "调整",
    "kcalPerDay": "kcal/天",
    "mealSplit": "每餐热量分配",
    "hydration": "饮水计划",
    "note": "重要提示",
    // zh
customTargetKicker: '自定义目标',
editDailyGoals: '编辑每日目标',
editDailyGoalsDesc:
  '更改热量或饮水目标。应用会自动重新计算宏量营养和餐食建议。',
resetAuto: '自动',
// zh
waterReminderKicker: '补水',
waterReminder: '喝水提醒',
waterReminderDesc:
  '根据你的饮水目标，在一天中温和提醒你喝水。',
waterReminderOn: '开启',
waterReminderOff: '关闭',
waterTarget: '饮水目标',
reminderTime: '提醒时间',
reminderInterval: '提醒间隔',
waterReminderTitle: '该喝水了',
waterReminderBody: '喝大约 {{amount}}ml 水，保持身体水分充足。',
  },
  "beginner": {
    "modeTitle": "新手模式",
    "modeDesc": "为新用户提供简单说明和快速指导。",
    "glossaryTitle": "新手指南",
    "terms": {
      "restDay": {
        "title": "休息日",
        "desc": "这是恢复日。你的身体会休息并重建，所以不要跳过。"
      },
      "warmUp": {
        "title": "热身",
        "desc": "训练前进行轻度活动，以帮助身体做好准备并降低受伤风险。"
      },
      "cooldown": {
        "title": "放松",
        "desc": "训练后进行轻度活动或拉伸，帮助身体恢复。"
      },
      "hiit": {
        "title": "HIIT",
        "desc": "高强度间歇训练：短时间高强度训练后接短暂休息。"
      },
      "rep": {
        "title": "次数",
        "desc": "一次完整的动作。例子：一次深蹲 = 1 次。"
      },
      "set": {
        "title": "组",
        "desc": "一组次数。例子：连续做 10 次深蹲 = 1 组。"
      }
    }
  },
  "todayWorkout": {
    "title": "今日训练",
    "fallback": "训练",
    "startNow": "立即开始",
    "restTitle": "今天是恢复日",
    "restText": "休息一下，轻柔拉伸，喝点水，为下一次训练做好准备。"
  },
  "common": {
    "on": "开",
    "off": "关",
    "cancel": "取消",
    "edit": "编辑",
    "viewAll": "查看全部"
  },
  "history": {
    "title": "训练历史",
    "screenTitle": "训练历史",
    "thisWeek": "本周",
    "minutes": "分钟",
    "totalWorkouts": "训练次数",
    "empty": "还没有已完成的训练。",
    "viewAll": "查看全部",
    "filter7": "7 天",
    "filter30": "30 天",
    "filterAll": "全部"
  },
  "achievements": {
    "title": "成就",
    "firstWorkout": "首次训练",
    "tenWorkouts": "10 次训练",
    "twentyfiveWorkouts": "25 次训练",
    "streak3": "连续 3 天",
    "streak7": "连续 7 天",
    "week4": "本周 4 次训练",
    "finishProgram": "完成 1 个计划"
  },
  "challenges": {
    "title": "挑战",
    "intro": "开始一个短期挑战来保持规律。",
    "start7": "开始 7 天挑战",
    "start30": "开始 30 天挑战",
    "complete": "挑战已完成",
    "daysLeft": "还剩 {{count}} 天",
    "starter7Title": "7 天入门挑战",
    "starter7Desc": "在 7 天内完成 5 次训练。",
    "consistency30Title": "30 天坚持挑战",
    "consistency30Desc": "在 30 天内完成 20 次训练。"
  },
  "filters": {
    "all": "全部",
    "levelTitle": "难度",
    "level": {
      "beginner": "初级",
      "intermediate": "中级",
      "advanced": "高级"
    },
    "goalTitle": "重点",
    "goal": {
      "lose_weight": "减脂",
      "build_muscle": "增肌",
      "cardio": "有氧",
      "core": "核心",
      "mobility": "灵活性"
    },
    "equipmentTitle": "器械",
    "equipment": {
      "no_equipment": "无器械",
      "with_equipment": "有器械"
    },
    "durationTitle": "时长",
    "duration": {
      "short": "短",
      "medium": "中",
      "long": "长"
    },
    "noResultsTitle": "没有匹配的训练计划",
    "noResultsText": "请尝试更改一个或多个筛选条件。"
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "{{goalLabel}}计划：{{calories}} kcal/天，{{proteinG}}g 蛋白质，{{carbsG}}g 碳水，{{fatsG}}g 脂肪。估算 BMR {{bmr}}，TDEE {{tdee}}。",
    "goal": {
      "lose_weight": "减脂",
      "build_muscle": "增肌",
      "maintain": "维持",
      "recomp": "身体重组",
      "endurance": "耐力",
      "flexibility": "综合健康"
    },
    "activity": {
      "sedentary": "久坐",
      "light": "轻度活动",
      "moderate": "中等活动",
      "active": "活跃",
      "very_active": "非常活跃"
    },
    "bmi": {
      "under": "偏瘦",
      "normal": "正常",
      "over": "超重",
      "obese": "肥胖"
    },
    "hydration": {
      "morning": "早上：醒来后喝 500ml",
      "beforeWorkout": "训练前：300–500ml",
      "duringWorkout": "训练中：每 10–15 分钟小口饮水",
      "evening": "晚上：完成剩余饮水目标"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const ja = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "ホーム",
    "nutrition": "栄養",
    "guide": "ガイド",
    "premium": "プレミアム",
    "settings": "設定",
    "workout": "ワークアウト",
    "more": "その他",
    "program": "プログラム",
    "profile": "プロフィール",
    "weightChart": "体重グラフ"
  },
  "home": {
    "title": "プランを選択",
    "subtitle": "プログラムを選んで、毎日トレーニング",
    "program60": "60日間脂肪燃焼プログラム",
    "program90": "90日間全身プログラム",
    "daysSuffix": "{{count}} 日間",
    "health_overview": "健康状態",
    "activeTitle": "進行中",
    "noActive": "現在、進行中のプログラムはありません。"
  },
  "program": {
    "daysPrefix": "{{day}}日目 • {{weekday}}",
    "weekTitle": "{{n}}週目",
    "completed": "完了",
    "todayWorkout": "今日のワークアウト: {{name}}"
  },
  "workouts": {
    "rest": "回復 / 休息日",
    "hiit": "全身HIIT",
    "upper": "胸・肩・腕",
    "lower": "お尻・脚",
    "core": "腹筋 & 体幹",
    "pickOne": "開始するプランを選択",
    "days": "日",
    "day": "日",
    "heroTitle": "毎日のワークアウトプラン",
    "matchingResults": "一致する結果"
  },
  "guide": {
    "title": "PulseFit の使い方",
    "subtitle": "次の簡単な手順に従って、トレーニングを始めましょう。",
    "steps": {
      "step1": {
        "badge": "ステップ 1",
        "title": "個人情報を入力する",
        "desc": "身長、体重、健康状態、目標などの基本情報を入力します。アプリが BMI を計算し、安全に始めるための健康アドバイスを表示します。"
      },
      "step2": {
        "badge": "ステップ 2",
        "title": "自分に合ったトレーニングプログラムを選ぶ",
        "desc": "利用可能なプログラムを確認し、自分の体力レベル、目標、好みに最も合ったものを選びます。"
      },
      "step3": {
        "badge": "ステップ 3",
        "title": "トレーニング日を選ぶ",
        "desc": "選択したプログラムを開き、実行したいトレーニング日を選びます。スケジュールに沿って順番に進められます。"
      },
      "step4": {
        "badge": "ステップ 4",
        "title": "動画に合わせてトレーニングする",
        "desc": "トレーニング動画に従って正しく運動しましょう。より見やすくするために、スマートフォンを横向きにして全画面で視聴できます。"
      }
    },
    "noteTitle": "注意",
    "note": "最良の結果を得るために、継続してトレーニングを行いましょう。"
  },
  "premium": {
    "title": "プレミアムにアップグレード",
    "removeAds": "広告を削除",
    "allPrograms": "すべての機能を解放",
    "active": "プレミアムは有効です",
    "restore": "購入を復元",
    "restoreTitle": "購入を復元",
    "restoreSuccess": "プレミアムを正常に復元しました。",
    "restoreEmpty": "プレミアム購入が見つかりませんでした。",
    "errorTitle": "購入に失敗しました",
    "errorText": "購入を完了できませんでした。",
    "productUnavailable": "プレミアム商品が見つかりません。Play Console / App Store の設定を確認してください。",
    "subUnavailable": "月額サブスクリプションが見つかりません。Play Console / App Store の設定を確認してください。",
    "loading": "読み込み中...",
    "monthlyTitle": "月額プレミアム",
    "monthlyDesc": "プレミアムを有効に保つため毎月自動更新されます",
    "subscribeMonthly": "月額で登録",
    "lifetimeTitle": "永久プレミアム",
    "lifetimeDesc": "一度の支払いで永久にプレミアムを利用",
    "buyLifetime": "永久版を購入"
  },
  "video": {
    "loading": "動画を読み込み中...",
    "play": "ワークアウト開始",
    "error": "動画を再生できません。再試行してください。"
  },
// ja
settings: {
  title: '設定',
  language: '言語',
  choose: '言語を選択',
  chooseLanguage: 'アプリの言語を選択',
  general: '一般',
  dailyReminder: '毎日のリマインダー',
  tapToToggleReminder: 'タップしてリマインダーを20:00/07:00に切り替え',
  accountAndTraining: 'アカウントとトレーニング',
  // ja
workoutReminderKicker: 'ワークアウト通知',
chooseWorkoutReminderTime: '通知時間を選択',
workoutReminderDesc:
  '毎日トレーニングを通知する時間を選択してください。',
hour: '時',
minute: '分',
saveReminder: '保存',
disableReminder: 'オフにする',
reminderOffText: 'オフ • タップして時間を選択',
dailyReminderTitle: 'トレーニングの時間です！💪',
dailyReminderBody:
  'Insanity Deluxe Edition を開いて、今日のセッションを完了しましょう。',
},
  "onboard": {
    "title": "さあ、始めましょう 👋",
    "subtitle": "最適なプランを提案するために、詳細を入力してください",
    "name": "氏名 *",
    "age": "年齢 *",
    "gender": "性別 *",
    "gender_male": "男性",
    "gender_female": "女性",
    "gender_other": "その他",
    "health": "健康状態",
    "height": "身長 (cm) *",
    "weight": "体重 (kg) *",
    "injured_q": "怪我をしていますか？",
    "injury_note": "怪我の詳細",
    "goal": "現在の目標 *",
    "goals": {
      "lose_weight": "減量 (ダイエット)",
      "build_muscle": "筋力アップ",
      "maintain": "現状維持",
      "recomp": "リコンプ (脂肪燃焼 + 筋肥大)",
      "endurance": "持久力アップ",
      "flexibility": "柔軟性アップ"
    },
    "tip_title": "ヒント",
    "tip_1": "怪我をしている場合は、負荷の低い運動から始め、徐々に強度を上げてください。",
    "tip_2": "進捗を確認するため、3日ごとに体重を更新しましょう。",
    "back": "戻る",
    "next": "次へ",
    "finish": "完了",
    "saving": "保存中...",
    "bmi": "BMI",
    "bmi_result_title": "健康状態の概要",
    "bmi_label_under": "低体重",
    "bmi_label_normal": "普通",
    "bmi_label_over": "肥満気味",
    "bmi_label_obese": "肥満",
    "advice_intro": "• あなたのBMI: {{bmi}} ({{label}})。",
    "advice_bmi_under": "• 除脂肪体重の増加に集中：中強度の全身/上下分割法。負荷を増やし、十分なタンパク質とカロリーを摂取。",
    "advice_bmi_normal": "• 維持：筋トレ + 適度な有酸素運動 (週2–3日)。フォームと睡眠を優先。",
    "advice_bmi_over": "• 脂肪燃焼：適度な有酸素/軽いHIIT (週2–3日) + 全身筋トレ。わずかなカロリー不足状態を作る。",
    "advice_bmi_obese": "• 安全な減量：早歩き/低負荷の有酸素 + 基礎筋トレ。心拍数を確認し、徐々に強度を上げる。",
    "advice_goal_lose_weight": "• 目標：減量 → カロリー管理、タンパク質1.6–2.2g/kg、睡眠7–8時間。",
    "advice_goal_build_muscle": "• 目標：筋肥大 → 漸進性過負荷 (週3–5日)、タンパク質1.6–2.2g/kg、わずかなカロリー余剰。",
    "advice_goal_maintain": "• 目標：維持 → 週3日、筋トレと有酸素のバランス、毎週体重測定。",
    "advice_goal_recomp": "• 目標：リコンプ → 基礎的な筋トレ + 高タンパク質、わずかなカロリー不足、質の高い睡眠。",
    "advice_goal_endurance": "• 目標：持久力 → ゾーン2 + インターバル走。運動前に炭水化物を摂取。",
    "advice_goal_flexibility": "• 目標：柔軟性 →毎日のモビリティ/可動域 (ROM) 10–20分、軽い筋トレを追加。",
    "advice_injured": "• 怪我に関する注意：低負荷、痛みのない可動域で。徐々に進める。必要に応じて医師やトレーナーに相談。",
    "advice_healthnote": "• 記録された健康状態に注意し、それに応じて強度を調整してください。",
    "start_training": "トレーニングを開始"
  },
  "weight": {
    "prompt_title": "体重の更新",
    "prompt_desc": "現在の体重を入力 (kg)",
    "prompt_placeholder": "例: 65.5",
    "later": "後で",
    "save": "保存",
    "chart_title": "体重の推移",
    "chart_empty": "データがまだありません。定期的に体重を記録するようアプリが通知します。"
  },
  "UserProfile": {
    "title": "プロフィール",
    "subtitle": "パーソナライズされた提案を受け取るために情報を入力してください",
    "name_label": "氏名 *",
    "name_ph": "例: 山田 太郎",
    "age_label": "年齢",
    "age_ph": "例: 28",
    "gender_label": "性別",
    "gender_male": "男性",
    "gender_female": "女性",
    "gender_other": "その他",
    "height_label": "身長 (cm)",
    "height_ph": "例: 170",
    "weight_label": "体重 (kg)",
    "weight_ph": "例: 65",
    "bmi": "BMI",
    "bmi_label_under": "低体重",
    "bmi_label_normal": "普通",
    "bmi_label_over": "肥満気味",
    "bmi_label_obese": "肥満",
    "health_label": "健康状態",
    "health_ph": "例: 血圧安定、睡眠良好、トレーニング再開...",
    "injured_q": "怪我はありますか？",
    "injury_label": "怪我の詳細",
    "injury_ph": "例: 左膝の痛み、深いスクワットは避ける。プレスの際に肩が痛む...",
    "hint_fill_hw": "身長と体重を入力して提案を表示。",
    "rec_injured": "推奨：休息日を多めにし、軽い体幹/上半身のセッションを優先。",
    "rec_overweight": "推奨：脂肪燃焼プラン (軽度〜中強度のHIIT) と下半身/体幹トレーニングを交互に行う。",
    "rec_general": "推奨：全身プラン (基礎的な筋力 + 体幹)。",
    "loading": "読み込み中...",
    "save_success_title": "保存しました",
    "save_error_title": "エラー",
    "save_error_msg": "データを保存できませんでした。再試行してください。",
    "btn_delete": "削除",
    "btn_save": "保存"
  },
  "dashboard": {
    "title": "進捗ダッシュボード",
    "streak": "連続記録",
    "thisWeek": "今週",
    "total": "合計",
    "completedPrograms": "完了済み",
    "lastWorkout": "前回のトレーニング"
  },
  "recommend": {
    "title": "あなたへのおすすめ",
    "start": "このプランを始める"
  },
  "nutrition": {
    "title": "栄養",
    "subtitle": "目標に合わせてカロリー、水分、栄養バランスを提案します。",
    "noProfileTitle": "先にプロフィールを完成してください",
    "noProfileText": "身長、体重、目標を入力すると栄養プランを作成できます。",
    "targets": "毎日の目標",
    "calories": "カロリー",
    "water": "水分",
    "macros": "マクロ配分",
    "protein": "タンパク質",
    "carbs": "炭水化物",
    "fats": "脂質",
    "sampleMeals": "食事例",
    "tips": "アドバイス",
    "screenTitle": "栄養",
    "heroStep": "3",
    "heroTitleLine1": "パーソナル",
    "heroTitleLine2": "栄養プラン",
    "dailyGoal": "毎日の目標",
    "edit": "編集",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "マクロ比率",
    "carb": "炭水化物",
    "fat": "脂質",
    "viewAll": "すべて表示",
    "breakfast": "朝食",
    "lunch": "昼食",
    "dinner": "夕食",
    "snack": "間食",
    "mealPlan": "食事提案",
    "tipFallback": "十分な水分と高タンパク食品を意識しましょう。",
    "footer1": "今日から、",
    "footer2": "より良い自分へ",
    "science": "科学的",
    "effective": "効果的",
    "sustainable": "継続可能",
    "advancedMode": "詳細モード",
    "pro": "PRO",
    "advancedTitle": "専門的な栄養分析",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "調整",
    "kcalPerDay": "kcal/日",
    "mealSplit": "食事別カロリー配分",
    "hydration": "水分補給スケジュール",
    "note": "重要な注意",
    // ja
customTargetKicker: 'カスタム目標',
editDailyGoals: '毎日の目標を編集',
editDailyGoalsDesc:
  'カロリーまたは水分目標を変更します。アプリがマクロと食事提案を自動で再計算します。',
resetAuto: '自動',
// ja
waterReminderKicker: '水分補給',
waterReminder: '水分リマインダー',
waterReminderDesc:
  '水分目標に合わせて、日中にやさしく通知します。',
waterReminderOn: 'オン',
waterReminderOff: 'オフ',
waterTarget: '水分目標',
reminderTime: '通知時間',
reminderInterval: '通知間隔',
waterReminderTitle: '水分補給の時間です',
waterReminderBody: '水分補給のために約{{amount}}mlの水を飲みましょう。',
  },
  "beginner": {
    "modeTitle": "初心者モード",
    "modeDesc": "新しいユーザー向けのシンプルな説明とクイックガイドです。",
    "glossaryTitle": "初心者ガイド",
    "terms": {
      "restDay": {
        "title": "休息日",
        "desc": "回復のための日です。体は休みながら再構築されるので、飛ばさないようにしましょう。"
      },
      "warmUp": {
        "title": "ウォームアップ",
        "desc": "トレーニング前の軽い動きで、体を準備し、ケガのリスクを減らします。"
      },
      "cooldown": {
        "title": "クールダウン",
        "desc": "トレーニング後の軽い動きやストレッチで、体の回復を助けます。"
      },
      "hiit": {
        "title": "HIIT",
        "desc": "高強度インターバルトレーニング：短い高強度運動と短い休憩を繰り返す方法です。"
      },
      "rep": {
        "title": "レップ",
        "desc": "1回の完全な動作のことです。例：スクワット1回 = 1レップ。"
      },
      "set": {
        "title": "セット",
        "desc": "レップのまとまりです。例：スクワット10回をまとめて行う = 1セット。"
      }
    }
  },
  "todayWorkout": {
    "title": "今日のワークアウト",
    "fallback": "ワークアウト",
    "startNow": "今すぐ始める",
    "restTitle": "今日は回復日です",
    "restText": "少し休んで、軽くストレッチし、水分をとって、次のワークアウトに備えましょう。"
  },
  "common": {
    "on": "オン",
    "off": "オフ",
    "cancel": "キャンセル",
    "edit": "編集",
    "viewAll": "すべて表示"
  },
  "history": {
    "title": "トレーニング履歴",
    "screenTitle": "トレーニング履歴",
    "thisWeek": "今週",
    "minutes": "分",
    "totalWorkouts": "ワークアウト",
    "empty": "まだ完了したワークアウトはありません。",
    "viewAll": "すべて見る",
    "filter7": "7日",
    "filter30": "30日",
    "filterAll": "すべて"
  },
  "achievements": {
    "title": "実績",
    "firstWorkout": "初回ワークアウト",
    "tenWorkouts": "10回のワークアウト",
    "twentyfiveWorkouts": "25回のワークアウト",
    "streak3": "3日連続",
    "streak7": "7日連続",
    "week4": "今週4回のワークアウト",
    "finishProgram": "1つのプログラムを完了"
  },
  "challenges": {
    "title": "チャレンジ",
    "intro": "継続するために短いチャレンジを始めましょう。",
    "start7": "7日チャレンジを開始",
    "start30": "30日チャレンジを開始",
    "complete": "チャレンジ完了",
    "daysLeft": "残り{{count}}日",
    "starter7Title": "7日スターターチャレンジ",
    "starter7Desc": "7日間で5回のワークアウトを完了しましょう。",
    "consistency30Title": "30日継続チャレンジ",
    "consistency30Desc": "30日間で20回のワークアウトを完了しましょう。"
  },
  "filters": {
    "all": "すべて",
    "levelTitle": "レベル",
    "level": {
      "beginner": "初心者",
      "intermediate": "中級",
      "advanced": "上級"
    },
    "goalTitle": "目的",
    "goal": {
      "lose_weight": "減量",
      "build_muscle": "筋力アップ",
      "cardio": "有酸素",
      "core": "体幹",
      "mobility": "柔軟性"
    },
    "equipmentTitle": "器具",
    "equipment": {
      "no_equipment": "器具なし",
      "with_equipment": "器具あり"
    },
    "durationTitle": "時間",
    "duration": {
      "short": "短い",
      "medium": "普通",
      "long": "長い"
    },
    "noResultsTitle": "一致するプログラムがありません",
    "noResultsText": "1つ以上のフィルターを変更してみてください。"
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "{{goalLabel}}プラン：{{calories}} kcal/日、タンパク質{{proteinG}}g、炭水化物{{carbsG}}g、脂質{{fatsG}}g。推定BMR {{bmr}}、TDEE {{tdee}}。",
    "goal": {
      "lose_weight": "脂肪減少",
      "build_muscle": "筋肉増強",
      "maintain": "維持",
      "recomp": "体組成改善",
      "endurance": "持久力",
      "flexibility": "総合ウェルネス"
    },
    "activity": {
      "sedentary": "座りがち",
      "light": "軽い活動",
      "moderate": "中程度の活動",
      "active": "活動的",
      "very_active": "非常に活動的"
    },
    "bmi": {
      "under": "低体重",
      "normal": "標準",
      "over": "過体重",
      "obese": "肥満"
    },
    "hydration": {
      "morning": "朝：起床後に500ml",
      "beforeWorkout": "運動前：300–500ml",
      "duringWorkout": "運動中：10–15分ごとに少しずつ",
      "evening": "夜：残りの水分目標を達成"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const ko = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "홈",
    "nutrition": "영양",
    "guide": "가이드",
    "premium": "프리미엄",
    "settings": "설정",
    "workout": "운동",
    "more": "더보기",
    "program": "프로그램",
    "profile": "프로필",
    "weightChart": "체중 그래프"
  },
  "home": {
    "title": "운동 플랜 선택",
    "subtitle": "프로그램을 선택하고 매일 운동하세요",
    "program60": "60일 체지방 연소",
    "program90": "90일 전신 운동",
    "daysSuffix": "{{count}}일",
    "health_overview": "건강 상태",
    "activeTitle": "진행 중",
    "noActive": "현재 진행 중인 프로그램이 없습니다."
  },
  "program": {
    "daysPrefix": "{{day}}일차 • {{weekday}}",
    "weekTitle": "{{n}}주차",
    "completed": "완료됨",
    "todayWorkout": "오늘의 운동: {{name}}"
  },
  "workouts": {
    "rest": "회복 / 휴식",
    "hiit": "전신 HIIT",
    "upper": "상체: 가슴 - 어깨 - 팔",
    "lower": "하체: 엉덩이 - 다리",
    "core": "복근 & 코어",
    "pickOne": "시작할 플랜을 선택하세요",
    "days": "일",
    "day": "일",
    "heroTitle": "나의 일일 운동 계획",
    "matchingResults": "맞는 결과"
  },
  "guide": {
    "title": "PulseFit 사용 방법",
    "subtitle": "다음의 간단한 단계에 따라 운동을 시작하세요.",
    "steps": {
      "step1": {
        "badge": "1단계",
        "title": "개인 정보를 입력하세요",
        "desc": "키, 몸무게, 건강 상태, 목표 및 기타 기본 정보를 입력하세요. 앱이 BMI를 계산하고 더 안전하게 시작할 수 있도록 건강 조언을 제공합니다."
      },
      "step2": {
        "badge": "2단계",
        "title": "적합한 운동 프로그램을 선택하세요",
        "desc": "사용 가능한 운동 프로그램을 살펴보고 자신의 체력 수준, 목표, 선호도에 가장 잘 맞는 프로그램을 선택하세요."
      },
      "step3": {
        "badge": "3단계",
        "title": "운동할 날짜를 선택하세요",
        "desc": "선택한 프로그램을 열고 따라 하고 싶은 운동 날짜를 선택하세요. 일정에 따라 차근차근 진행할 수 있습니다."
      },
      "step4": {
        "badge": "4단계",
        "title": "영상과 함께 운동하세요",
        "desc": "운동 영상을 보며 올바르게 따라 하세요. 더 좋은 시청 경험을 위해 휴대폰을 가로로 돌려 전체 화면으로 볼 수 있습니다."
      }
    },
    "noteTitle": "참고",
    "note": "최고의 결과를 얻으려면 꾸준히 운동을 계속하세요."
  },
  "premium": {
    "title": "프리미엄으로 업그레이드",
    "removeAds": "광고 제거",
    "allPrograms": "전체 경험 잠금 해제",
    "active": "프리미엄이 활성화되었습니다",
    "restore": "구매 복원",
    "restoreTitle": "구매 복원",
    "restoreSuccess": "프리미엄이 성공적으로 복원되었습니다.",
    "restoreEmpty": "프리미엄 구매 내역을 찾을 수 없습니다.",
    "errorTitle": "구매 실패",
    "errorText": "구매를 완료할 수 없습니다.",
    "productUnavailable": "프리미엄 상품을 찾을 수 없습니다. Play Console / App Store 설정을 확인하세요.",
    "subUnavailable": "월간 구독 상품을 찾을 수 없습니다. Play Console / App Store 설정을 확인하세요.",
    "loading": "로딩 중...",
    "monthlyTitle": "월간 프리미엄",
    "monthlyDesc": "프리미엄을 유지하기 위해 매월 자동 갱신됩니다",
    "subscribeMonthly": "월간 구독",
    "lifetimeTitle": "평생 프리미엄",
    "lifetimeDesc": "한 번 결제로 평생 프리미엄 이용",
    "buyLifetime": "평생 이용 구매"
  },
  "video": {
    "loading": "동영상 로딩 중...",
    "play": "운동 시작",
    "error": "동영상을 재생할 수 없습니다. 다시 시도해주세요."
  },
// ko
settings: {
  title: '설정',
  language: '언어',
  choose: '언어 선택',
  chooseLanguage: '앱 언어 선택',
  general: '일반',
  dailyReminder: '일일 알림',
  tapToToggleReminder: '탭하여 20:00/07:00 알림 전환',
  accountAndTraining: '계정 및 운동',
  // ko
workoutReminderKicker: '운동 알림',
chooseWorkoutReminderTime: '알림 시간 선택',
workoutReminderDesc:
  '매일 운동 알림을 받을 시간을 선택하세요.',
hour: '시',
minute: '분',
saveReminder: '저장',
disableReminder: '끄기',
reminderOffText: '꺼짐 • 탭하여 시간 선택',
dailyReminderTitle: '운동할 시간이에요! 💪',
dailyReminderBody:
  'Insanity Deluxe Edition을 열고 오늘의 운동을 완료하세요.',
},
  "onboard": {
    "title": "시작해 볼까요 👋",
    "subtitle": "최적의 플랜을 추천하기 위해 몇 가지 정보를 입력해주세요",
    "name": "이름 *",
    "age": "나이 *",
    "gender": "성별 *",
    "gender_male": "남성",
    "gender_female": "여성",
    "gender_other": "기타",
    "health": "건강 상태",
    "height": "키 (cm) *",
    "weight": "몸무게 (kg) *",
    "injured_q": "부상 부위가 있나요?",
    "injury_note": "부상 상세 설명",
    "goal": "현재 목표 *",
    "goals": {
      "lose_weight": "체중 감량",
      "build_muscle": "근육 증량",
      "maintain": "유지",
      "recomp": "리컴프 (체지방 감소 + 근육 증가)",
      "endurance": "지구력 강화",
      "flexibility": "유연성 기르기"
    },
    "tip_title": "간단 팁",
    "tip_1": "부상이 있다면 충격이 적은 운동부터 시작하고 서서히 강도를 높이세요.",
    "tip_2": "진행 상황을 확인하려면 3일마다 몸무게를 업데이트하세요.",
    "back": "이전",
    "next": "다음",
    "finish": "완료",
    "saving": "저장 중...",
    "bmi": "BMI",
    "bmi_result_title": "건강 개요",
    "bmi_label_under": "저체중",
    "bmi_label_normal": "정상",
    "bmi_label_over": "과체중",
    "bmi_label_obese": "비만",
    "advice_intro": "• 당신의 BMI: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• 근육량 증가에 집중: 중강도의 전신/상하체 분할 운동; 중량 늘리기; 충분한 단백질과 칼로리 섭취.",
    "advice_bmi_normal": "• 유지: 근력 운동 + 적당한 유산소 (주 2~3회); 자세와 수면 우선순위.",
    "advice_bmi_over": "• 체지방 감량: 적당한 유산소/가벼운 HIIT (주 2~3회) + 전신 근력 운동; 약간의 칼로리 부족 유지.",
    "advice_bmi_obese": "• 안전한 감량: 빠르게 걷기/저강도 유산소 + 기초 근력 운동; 심박수 체크, 서서히 강도 높이기.",
    "advice_goal_lose_weight": "• 목표: 감량 → 칼로리 기록, 단백질 1.6~2.2g/kg, 7~8시간 수면.",
    "advice_goal_build_muscle": "• 목표: 증량 → 점진적 과부하 (주 3~5회), 단백질 1.6~2.2g/kg, 약간의 칼로리 잉여.",
    "advice_goal_maintain": "• 목표: 유지 → 주 3회, 근력 + 유산소 균형, 매주 체중 측정.",
    "advice_goal_recomp": "• 목표: 리컴프 → 기초 웨이트 + 고단백, 약간의 칼로리 부족, 숙면.",
    "advice_goal_endurance": "• 목표: 지구력 → 존2(Zone 2) 훈련 + 인터벌; 운동 전 탄수화물 섭취.",
    "advice_goal_flexibility": "• 목표: 유연성 → 매일 가동성(Mobility)/ROM 훈련 10~20분, 가벼운 근력 운동 추가.",
    "advice_injured": "• 부상 주의: 충격 적게, 통증 없는 가동 범위 내에서; 점진적 진행; 필요 시 코치/의사와 상담.",
    "advice_healthnote": "• 기록된 건강 상태를 주의 깊게 살피고 그에 따라 강도를 조절하세요.",
    "start_training": "운동 시작하기"
  },
  "weight": {
    "prompt_title": "몸무게 업데이트",
    "prompt_desc": "현재 몸무게 입력 (kg)",
    "prompt_placeholder": "예: 65.5",
    "later": "나중에",
    "save": "저장",
    "chart_title": "체중 기록",
    "chart_empty": "아직 데이터가 없습니다. 주기적으로 몸무게를 기록하도록 알림을 보냅니다."
  },
  "UserProfile": {
    "title": "프로필",
    "subtitle": "맞춤형 운동 추천을 받으려면 정보를 입력하세요",
    "name_label": "이름 *",
    "name_ph": "예: 김철수",
    "age_label": "나이",
    "age_ph": "예: 28",
    "gender_label": "성별",
    "gender_male": "남성",
    "gender_female": "여성",
    "gender_other": "기타",
    "height_label": "키 (cm)",
    "height_ph": "예: 170",
    "weight_label": "몸무게 (kg)",
    "weight_ph": "예: 65",
    "bmi": "BMI",
    "bmi_label_under": "저체중",
    "bmi_label_normal": "정상",
    "bmi_label_over": "과체중",
    "bmi_label_obese": "비만",
    "health_label": "건강 상태",
    "health_ph": "예: 혈압 안정, 수면 양호, 운동 복귀...",
    "injured_q": "부상 부위가 있나요?",
    "injury_label": "부상 상세 내용",
    "injury_ph": "예: 왼쪽 무릎 통증, 깊은 스쿼트 자제; 프레스 시 어깨 통증...",
    "hint_fill_hw": "키와 몸무게를 입력하면 추천이 표시됩니다.",
    "rec_injured": "추천: 휴식일을 늘리고 가벼운 코어/상체 세션을 우선하세요.",
    "rec_overweight": "추천: 체지방 감량 플랜 (가벼운 → 중간 강도 HIIT)과 하체/코어 운동 병행.",
    "rec_general": "추천: 전신 플랜 (기초 근력 + 코어).",
    "loading": "로딩 중...",
    "save_success_title": "저장됨",
    "save_error_title": "오류",
    "save_error_msg": "데이터를 저장할 수 없습니다. 다시 시도해주세요.",
    "btn_delete": "삭제",
    "btn_save": "저장"
  },
  "dashboard": {
    "title": "진행 대시보드",
    "streak": "연속 기록",
    "thisWeek": "이번 주",
    "total": "전체",
    "completedPrograms": "완료됨",
    "lastWorkout": "최근 운동"
  },
  "recommend": {
    "title": "추천 프로그램",
    "start": "이 플랜 시작하기"
  },
  "nutrition": {
    "title": "영양",
    "subtitle": "목표에 따라 칼로리, 수분, 영양 비율을 추천합니다.",
    "noProfileTitle": "먼저 프로필을 완성하세요",
    "noProfileText": "키, 체중, 목표를 입력하면 맞춤 영양 계획을 제공합니다.",
    "targets": "일일 목표",
    "calories": "칼로리",
    "water": "물",
    "macros": "매크로 분배",
    "protein": "단백질",
    "carbs": "탄수화물",
    "fats": "지방",
    "sampleMeals": "샘플 식단",
    "tips": "조언",
    "screenTitle": "영양",
    "heroStep": "3",
    "heroTitleLine1": "개인 맞춤",
    "heroTitleLine2": "영양 계획",
    "dailyGoal": "일일 목표",
    "edit": "수정",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "매크로 비율",
    "carb": "탄수화물",
    "fat": "지방",
    "viewAll": "전체 보기",
    "breakfast": "아침",
    "lunch": "점심",
    "dinner": "저녁",
    "snack": "간식",
    "mealPlan": "식단 제안",
    "tipFallback": "충분한 수분과 단백질 섭취를 우선하세요.",
    "footer1": "오늘부터,",
    "footer2": "더 나은 나",
    "science": "과학적",
    "effective": "효과적",
    "sustainable": "지속 가능",
    "advancedMode": "고급 모드",
    "pro": "PRO",
    "advancedTitle": "전문 영양 분석",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "조정",
    "kcalPerDay": "kcal/일",
    "mealSplit": "식사별 칼로리 분배",
    "hydration": "수분 섭취 일정",
    "note": "중요 안내",
    // ko
customTargetKicker: '맞춤 목표',
editDailyGoals: '일일 목표 수정',
editDailyGoalsDesc:
  '칼로리 또는 물 목표를 변경하세요. 앱이 매크로와 식단 제안을 자동으로 다시 계산합니다.',
resetAuto: '자동',
// ko
waterReminderKicker: '수분 섭취',
waterReminder: '물 마시기 알림',
waterReminderDesc:
  '물 섭취 목표에 맞춰 하루 동안 부드럽게 알려줍니다.',
waterReminderOn: '켜짐',
waterReminderOff: '꺼짐',
waterTarget: '물 목표',
reminderTime: '알림 시간',
reminderInterval: '알림 간격',
waterReminderTitle: '물을 마실 시간이에요',
waterReminderBody: '수분 유지를 위해 약 {{amount}}ml의 물을 마셔보세요.',
  },
  "beginner": {
    "modeTitle": "초보자 모드",
    "modeDesc": "새로운 사용자를 위한 간단한 설명과 빠른 안내입니다.",
    "glossaryTitle": "초보자 가이드",
    "terms": {
      "restDay": {
        "title": "휴식일",
        "desc": "회복을 위한 날입니다. 몸이 쉬면서 다시 회복되므로 건너뛰지 마세요."
      },
      "warmUp": {
        "title": "워밍업",
        "desc": "운동 전에 가벼운 움직임으로 몸을 준비하고 부상 위험을 줄입니다."
      },
      "cooldown": {
        "title": "쿨다운",
        "desc": "운동 후 가벼운 움직임이나 스트레칭으로 몸이 회복되도록 돕습니다."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "고강도 인터벌 트레이닝: 짧은 시간 강하게 운동하고 짧게 쉬는 방식입니다."
      },
      "rep": {
        "title": "반복",
        "desc": "운동 동작 1회를 의미합니다. 예: 스쿼트 1번 = 1회."
      },
      "set": {
        "title": "세트",
        "desc": "반복의 묶음입니다. 예: 스쿼트 10회를 연속으로 하면 1세트입니다."
      }
    }
  },
  "todayWorkout": {
    "title": "오늘의 운동",
    "fallback": "운동",
    "startNow": "지금 시작",
    "restTitle": "오늘은 회복하는 날입니다",
    "restText": "잠시 쉬고, 가볍게 스트레칭하고, 물을 마시며 다음 운동을 준비하세요."
  },
  "common": {
    "on": "켜짐",
    "off": "꺼짐",
    "cancel": "취소",
    "edit": "수정",
    "viewAll": "전체 보기"
  },
  "history": {
    "title": "운동 기록",
    "screenTitle": "운동 기록",
    "thisWeek": "이번 주",
    "minutes": "분",
    "totalWorkouts": "운동",
    "empty": "아직 완료한 운동이 없습니다.",
    "viewAll": "전체 보기",
    "filter7": "7일",
    "filter30": "30일",
    "filterAll": "전체"
  },
  "achievements": {
    "title": "업적",
    "firstWorkout": "첫 운동",
    "tenWorkouts": "운동 10회",
    "twentyfiveWorkouts": "운동 25회",
    "streak3": "3일 연속",
    "streak7": "7일 연속",
    "week4": "이번 주 운동 4회",
    "finishProgram": "프로그램 1개 완료"
  },
  "challenges": {
    "title": "챌린지",
    "intro": "꾸준함을 유지하기 위해 짧은 챌린지를 시작하세요.",
    "start7": "7일 챌린지 시작",
    "start30": "30일 챌린지 시작",
    "complete": "챌린지 완료",
    "daysLeft": "{{count}}일 남음",
    "starter7Title": "7일 스타터 챌린지",
    "starter7Desc": "7일 동안 운동 5회를 완료하세요.",
    "consistency30Title": "30일 꾸준함 챌린지",
    "consistency30Desc": "30일 동안 운동 20회를 완료하세요."
  },
  "filters": {
    "all": "전체",
    "levelTitle": "레벨",
    "level": {
      "beginner": "초급",
      "intermediate": "중급",
      "advanced": "고급"
    },
    "goalTitle": "목표",
    "goal": {
      "lose_weight": "체중 감량",
      "build_muscle": "근육 증가",
      "cardio": "유산소",
      "core": "코어",
      "mobility": "유연성"
    },
    "equipmentTitle": "장비",
    "equipment": {
      "no_equipment": "장비 없음",
      "with_equipment": "장비 있음"
    },
    "durationTitle": "시간",
    "duration": {
      "short": "짧음",
      "medium": "중간",
      "long": "김"
    },
    "noResultsTitle": "일치하는 프로그램이 없습니다",
    "noResultsText": "하나 이상의 필터를 변경해 보세요."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "{{goalLabel}} 계획: {{calories}} kcal/일, 단백질 {{proteinG}}g, 탄수화물 {{carbsG}}g, 지방 {{fatsG}}g. 예상 BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "체지방 감량",
      "build_muscle": "근육 증가",
      "maintain": "유지",
      "recomp": "체성분 개선",
      "endurance": "지구력",
      "flexibility": "전반적 웰니스"
    },
    "activity": {
      "sedentary": "좌식 생활",
      "light": "가벼운 활동",
      "moderate": "보통 활동",
      "active": "활동적",
      "very_active": "매우 활동적"
    },
    "bmi": {
      "under": "저체중",
      "normal": "정상",
      "over": "과체중",
      "obese": "비만"
    },
    "hydration": {
      "morning": "아침: 기상 후 500ml",
      "beforeWorkout": "운동 전: 300–500ml",
      "duringWorkout": "운동 중: 10–15분마다 조금씩",
      "evening": "저녁: 남은 물 목표 채우기"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const ru = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Главная",
    "nutrition": "Питание",
    "guide": "Гайд",
    "premium": "Премиум",
    "settings": "Настройки",
    "workout": "Тренировки",
    "more": "Ещё",
    "program": "Программа",
    "profile": "Профиль",
    "weightChart": "График веса"
  },
  "home": {
    "title": "Выберите план тренировок",
    "subtitle": "Выберите программу и тренируйтесь ежедневно",
    "program60": "Сжигание жира: 60 дней",
    "program90": "Всё тело за 90 дней",
    "daysSuffix": "{{count}} дн.",
    "health_overview": "Обзор здоровья",
    "activeTitle": "Текущая",
    "noActive": "Нет активных программ."
  },
  "program": {
    "daysPrefix": "День {{day}} • {{weekday}}",
    "weekTitle": "Неделя {{n}}",
    "completed": "Выполнено",
    "todayWorkout": "Тренировка: {{name}}"
  },
  "workouts": {
    "rest": "Восстановление / Отдых",
    "hiit": "HIIT на все тело",
    "upper": "Грудь - Плечи - Руки",
    "lower": "Ягодицы - Ноги",
    "core": "Пресс и Кор",
    "pickOne": "Выберите план, чтобы начать",
    "days": "день",
    "day": "день",
    "heroTitle": "Ваш ежедневный план тренировок",
    "matchingResults": "Подходящие результаты"
  },
  "guide": {
    "title": "Как пользоваться PulseFit",
    "subtitle": "Следуйте этим простым шагам, чтобы начать свой тренировочный путь.",
    "steps": {
      "step1": {
        "badge": "Шаг 1",
        "title": "Введите личную информацию",
        "desc": "Укажите свой рост, вес, состояние здоровья, цели и другие основные данные. Приложение рассчитает ваш ИМТ и даст рекомендации по здоровью, чтобы вы могли начать безопасно."
      },
      "step2": {
        "badge": "Шаг 2",
        "title": "Выберите подходящую программу тренировок",
        "desc": "Просмотрите доступные программы и выберите ту, которая лучше всего соответствует вашему уровню подготовки, целям и предпочтениям."
      },
      "step3": {
        "badge": "Шаг 3",
        "title": "Выберите день тренировки",
        "desc": "Откройте выбранную программу и выберите тренировочный день, который хотите выполнить. Вы можете двигаться шаг за шагом по расписанию программы."
      },
      "step4": {
        "badge": "Шаг 4",
        "title": "Тренируйтесь по видео",
        "desc": "Следуйте видео, чтобы выполнять упражнения правильно. Вы можете повернуть телефон горизонтально, чтобы смотреть видео в полноэкранном режиме."
      }
    },
    "noteTitle": "Примечание",
    "note": "Тренируйтесь регулярно, чтобы достичь наилучших результатов."
  },
  "premium": {
    "title": "Перейти на Premium",
    "removeAds": "Убрать рекламу",
    "allPrograms": "Открыть полный доступ",
    "active": "Premium активен",
    "restore": "Восстановить покупки",
    "restoreTitle": "Восстановить покупки",
    "restoreSuccess": "Premium успешно восстановлен.",
    "restoreEmpty": "Покупка Premium не найдена.",
    "errorTitle": "Ошибка покупки",
    "errorText": "Не удалось завершить покупку.",
    "productUnavailable": "Продукт Premium не найден. Проверьте настройки Play Console / App Store.",
    "subUnavailable": "Месячная подписка не найдена. Проверьте настройки Play Console / App Store.",
    "loading": "Загрузка...",
    "monthlyTitle": "Ежемесячный Premium",
    "monthlyDesc": "Автоматически продлевается каждый месяц, чтобы Premium оставался активным",
    "subscribeMonthly": "Подписаться на месяц",
    "lifetimeTitle": "Premium навсегда",
    "lifetimeDesc": "Разовая оплата, Premium навсегда",
    "buyLifetime": "Купить навсегда"
  },
  "video": {
    "loading": "Загрузка видео...",
    "play": "Начать тренировку",
    "error": "Не удалось воспроизвести видео. Попробуйте снова."
  },
// ru
settings: {
  title: 'Настройки',
  language: 'Язык',
  choose: 'Выберите язык',
  chooseLanguage: 'Выберите язык приложения',
  general: 'Общие',
  dailyReminder: 'Ежедневное напоминание',
  tapToToggleReminder: 'Нажмите, чтобы переключить напоминание 20:00/07:00',
  accountAndTraining: 'Аккаунт и тренировки',
  // ru
workoutReminderKicker: 'НАПОМИНАНИЕ О ТРЕНИРОВКЕ',
chooseWorkoutReminderTime: 'Выберите время напоминания',
workoutReminderDesc:
  'Выберите время, когда приложение будет ежедневно напоминать вам о тренировке.',
hour: 'Час',
minute: 'Минута',
saveReminder: 'Сохранить',
disableReminder: 'Отключить',
reminderOffText: 'Отключено • нажмите, чтобы выбрать время',
dailyReminderTitle: 'Пора тренироваться! 💪',
dailyReminderBody:
  'Откройте Insanity Deluxe Edition и завершите сегодняшнюю тренировку.',
},
  "onboard": {
    "title": "Давайте начнем 👋",
    "subtitle": "Введите данные, чтобы мы подобрали идеальный план",
    "name": "ФИО *",
    "age": "Возраст *",
    "gender": "Пол *",
    "gender_male": "Мужской",
    "gender_female": "Женский",
    "gender_other": "Другой",
    "health": "Состояние здоровья",
    "height": "Рост (см) *",
    "weight": "Вес (кг) *",
    "injured_q": "Есть травмы?",
    "injury_note": "Описание травмы",
    "goal": "Текущая цель *",
    "goals": {
      "lose_weight": "Похудение",
      "build_muscle": "Набор мышечной массы",
      "maintain": "Поддержание формы",
      "recomp": "Рекомпозиция (жиросжигание + мышцы)",
      "endurance": "Выносливость",
      "flexibility": "Гибкость"
    },
    "tip_title": "Советы",
    "tip_1": "При травмах начинайте с упражнений с низкой нагрузкой и повышайте интенсивность постепенно.",
    "tip_2": "Обновляйте вес каждые 3 дня, чтобы следить за прогрессом.",
    "back": "Назад",
    "next": "Далее",
    "finish": "Готово",
    "saving": "Сохранение...",
    "bmi": "ИМТ",
    "bmi_result_title": "Обзор здоровья",
    "bmi_label_under": "Дефицит массы",
    "bmi_label_normal": "Норма",
    "bmi_label_over": "Избыточный вес",
    "bmi_label_obese": "Ожирение",
    "advice_intro": "• Ваш ИМТ: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Фокус на набор мышечной массы: фулбоди/сплит верх-низ со средней интенсивностью; повышайте веса; достаточно белка и калорий.",
    "advice_bmi_normal": "• Поддержание: микс силы + умеренного кардио (2–3 дня/нед.); приоритет на технику и сон.",
    "advice_bmi_over": "• Жиросжигание: умеренное кардио/легкий HIIT (2–3 дня) + силовые на все тело; небольшой дефицит калорий.",
    "advice_bmi_obese": "• Безопасное похудение: быстрая ходьба/кардио без прыжков + базовые силовые; следите за пульсом, повышайте нагрузку плавно.",
    "advice_goal_lose_weight": "• Цель: Похудение → считать калории, 1.6–2.2 г/кг белка, сон 7–8 ч.",
    "advice_goal_build_muscle": "• Цель: Мышцы → прогрессивная перегрузка (3–5 дней/нед.), 1.6–2.2 г/кг белка, профицит калорий.",
    "advice_goal_maintain": "• Цель: Поддержание → 3 дня/нед., баланс силы и кардио, взвешивание раз в неделю.",
    "advice_goal_recomp": "• Цель: Рекомпозиция → база + много белка, легкий дефицит, хороший сон.",
    "advice_goal_endurance": "• Цель: Выносливость → зона 2 + интервалы; углеводы перед тренировкой.",
    "advice_goal_flexibility": "• Цель: Гибкость → мобильность/растяжка 10–20 мин ежедневно, добавить легкие силовые.",
    "advice_injured": "• При травме: низкая ударная нагрузка, работа в безболевой амплитуде; постепенный прогресс; при необходимости к врачу.",
    "advice_healthnote": "• Учитывайте указанные проблемы со здоровьем и корректируйте нагрузку.",
    "start_training": "Начать тренировку"
  },
  "weight": {
    "prompt_title": "Обновить вес",
    "prompt_desc": "Введите текущий вес (кг)",
    "prompt_placeholder": "напр. 65.5",
    "later": "Позже",
    "save": "Сохранить",
    "chart_title": "График веса",
    "chart_empty": "Нет данных. Приложение будет периодически напоминать вам взвешиваться."
  },
  "UserProfile": {
    "title": "Профиль",
    "subtitle": "Заполните данные для персональных рекомендаций",
    "name_label": "ФИО *",
    "name_ph": "напр. Иван Петров",
    "age_label": "Возраст",
    "age_ph": "напр. 28",
    "gender_label": "Пол",
    "gender_male": "Мужской",
    "gender_female": "Женский",
    "gender_other": "Другой",
    "height_label": "Рост (см)",
    "height_ph": "напр. 170",
    "weight_label": "Вес (кг)",
    "weight_ph": "напр. 65",
    "bmi": "ИМТ",
    "bmi_label_under": "Дефицит массы",
    "bmi_label_normal": "Норма",
    "bmi_label_over": "Избыточный вес",
    "bmi_label_obese": "Ожирение",
    "health_label": "Статус здоровья",
    "health_ph": "напр. Давление в норме, сон хороший, возвращаюсь к спорту...",
    "injured_q": "Есть травмы?",
    "injury_label": "Детали травмы",
    "injury_ph": "напр. Боль в левом колене, избегать глубоких приседов; плечо...",
    "hint_fill_hw": "Введите рост и вес для получения советов.",
    "rec_injured": "Рекомендация: приоритет на легкие тренировки Кора/Верха с большим отдыхом.",
    "rec_overweight": "Рекомендация: План жиросжигания (легкий → средний HIIT), чередуя с Низом/Кором.",
    "rec_general": "Рекомендация: Программа на все тело (базовая сила + Кор).",
    "loading": "Загрузка...",
    "save_success_title": "Сохранено",
    "save_error_title": "Ошибка",
    "save_error_msg": "Не удалось сохранить данные. Попробуйте снова.",
    "btn_delete": "Удалить",
    "btn_save": "Сохранить"
  },
  "dashboard": {
    "title": "Панель прогресса",
    "streak": "Серия",
    "thisWeek": "На этой неделе",
    "total": "Всего",
    "completedPrograms": "Завершено",
    "lastWorkout": "Последняя тренировка"
  },
  "recommend": {
    "title": "Рекомендовано для вас",
    "start": "Начать этот план"
  },
  "nutrition": {
    "title": "Питание",
    "subtitle": "Приложение подбирает калории, воду и нутриенты под вашу цель.",
    "noProfileTitle": "Сначала заполните профиль",
    "noProfileText": "Добавьте рост, вес и цель, чтобы получить рекомендации.",
    "targets": "Дневные цели",
    "calories": "Калории",
    "water": "Вода",
    "macros": "Баланс макро",
    "protein": "Белок",
    "carbs": "Углеводы",
    "fats": "Жиры",
    "sampleMeals": "Примеры блюд",
    "tips": "Советы",
    "screenTitle": "Питание",
    "heroStep": "3",
    "heroTitleLine1": "Персональный",
    "heroTitleLine2": "план питания",
    "dailyGoal": "Дневные цели",
    "edit": "Изменить",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Баланс макро",
    "carb": "Углеводы",
    "fat": "Жиры",
    "viewAll": "Смотреть все",
    "breakfast": "Завтрак",
    "lunch": "Обед",
    "dinner": "Ужин",
    "snack": "Перекус",
    "mealPlan": "Рекомендации",
    "tipFallback": "Пейте достаточно воды и выбирайте продукты с высоким содержанием белка.",
    "footer1": "С сегодняшнего дня,",
    "footer2": "лучшая версия вас",
    "science": "Наука",
    "effective": "Эффективно",
    "sustainable": "Устойчиво",
    "advancedMode": "РАСШИРЕННЫЙ РЕЖИМ",
    "pro": "PRO",
    "advancedTitle": "Профессиональный анализ питания",
    "bmi": "ИМТ",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Коррекция",
    "kcalPerDay": "ккал/день",
    "mealSplit": "Распределение калорий по приемам пищи",
    "hydration": "График воды",
    "note": "Важное примечание",
    // ru
customTargetKicker: 'ПОЛЬЗОВАТЕЛЬСКАЯ ЦЕЛЬ',
editDailyGoals: 'Изменить дневные цели',
editDailyGoalsDesc:
  'Измените цель по калориям или воде. Приложение автоматически пересчитает макроэлементы и рекомендации по питанию.',
resetAuto: 'Авто',
// ru
waterReminderKicker: 'ГИДРАТАЦИЯ',
waterReminder: 'Напоминание о воде',
waterReminderDesc:
  'Получайте мягкие напоминания в течение дня согласно вашей цели по воде.',
waterReminderOn: 'Вкл',
waterReminderOff: 'Выкл',
waterTarget: 'Цель по воде',
reminderTime: 'Время напоминания',
reminderInterval: 'Интервал',
waterReminderTitle: 'Пора выпить воды',
waterReminderBody: 'Выпейте около {{amount}}мл воды, чтобы поддерживать гидратацию.',
  },
  "beginner": {
    "modeTitle": "Режим для новичков",
    "modeDesc": "Простые объяснения и быстрые подсказки для новых пользователей.",
    "glossaryTitle": "Гид для новичков",
    "terms": {
      "restDay": {
        "title": "День отдыха",
        "desc": "Это день восстановления. Ваше тело отдыхает и восстанавливается, поэтому не пропускайте его."
      },
      "warmUp": {
        "title": "Разминка",
        "desc": "Лёгкие движения перед тренировкой, чтобы подготовить тело и снизить риск травм."
      },
      "cooldown": {
        "title": "Заминка",
        "desc": "Лёгкие движения или растяжка после тренировки, чтобы помочь телу восстановиться."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "Высокоинтенсивная интервальная тренировка: короткие периоды тяжёлой нагрузки с коротким отдыхом."
      },
      "rep": {
        "title": "Повтор",
        "desc": "Одно полное выполнение упражнения. Пример: один присед = один повтор."
      },
      "set": {
        "title": "Подход",
        "desc": "Группа повторений. Пример: 10 приседаний подряд = 1 подход."
      }
    }
  },
  "todayWorkout": {
    "title": "Тренировка на сегодня",
    "fallback": "Тренировка",
    "startNow": "Начать сейчас",
    "restTitle": "Сегодня день восстановления",
    "restText": "Отдохните, слегка потянитесь, попейте воды и подготовьтесь к следующей тренировке."
  },
  "common": {
    "on": "ВКЛ",
    "off": "ВЫКЛ",
    "cancel": "Отмена",
    "edit": "Изменить",
    "viewAll": "Смотреть все"
  },
  "history": {
    "title": "История тренировок",
    "screenTitle": "История тренировок",
    "thisWeek": "На этой неделе",
    "minutes": "Минуты",
    "totalWorkouts": "Тренировки",
    "empty": "Пока нет завершённых тренировок.",
    "viewAll": "Показать всё",
    "filter7": "7 дней",
    "filter30": "30 дней",
    "filterAll": "Все"
  },
  "achievements": {
    "title": "Достижения",
    "firstWorkout": "Первая тренировка",
    "tenWorkouts": "10 тренировок",
    "twentyfiveWorkouts": "25 тренировок",
    "streak3": "Серия 3 дня",
    "streak7": "Серия 7 дней",
    "week4": "4 тренировки на этой неделе",
    "finishProgram": "Завершить 1 программу"
  },
  "challenges": {
    "title": "Испытания",
    "intro": "Начните короткое испытание, чтобы сохранять регулярность.",
    "start7": "Начать испытание на 7 дней",
    "start30": "Начать испытание на 30 дней",
    "complete": "Испытание завершено",
    "daysLeft": "Осталось {{count}} дн.",
    "starter7Title": "Стартовое испытание на 7 дней",
    "starter7Desc": "Выполните 5 тренировок за 7 дней.",
    "consistency30Title": "Испытание на 30 дней",
    "consistency30Desc": "Выполните 20 тренировок за 30 дней."
  },
  "filters": {
    "all": "Все",
    "levelTitle": "Уровень",
    "level": {
      "beginner": "Начальный",
      "intermediate": "Средний",
      "advanced": "Продвинутый"
    },
    "goalTitle": "Фокус",
    "goal": {
      "lose_weight": "Похудение",
      "build_muscle": "Набор мышц",
      "cardio": "Кардио",
      "core": "Кор",
      "mobility": "Мобильность"
    },
    "equipmentTitle": "Оборудование",
    "equipment": {
      "no_equipment": "Без оборудования",
      "with_equipment": "С оборудованием"
    },
    "durationTitle": "Длительность",
    "duration": {
      "short": "Короткая",
      "medium": "Средняя",
      "long": "Длинная"
    },
    "noResultsTitle": "Подходящих программ не найдено",
    "noResultsText": "Попробуйте изменить один или несколько фильтров."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "План {{goalLabel}}: {{calories}} kcal/день, белок {{proteinG}}g, углеводы {{carbsG}}g, жиры {{fatsG}}g. Расчет BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Сжигание жира",
      "build_muscle": "Набор мышц",
      "maintain": "Поддержание",
      "recomp": "Рекомпозиция тела",
      "endurance": "Выносливость",
      "flexibility": "Общее здоровье"
    },
    "activity": {
      "sedentary": "Малоподвижный",
      "light": "Легкая активность",
      "moderate": "Умеренная активность",
      "active": "Активный",
      "very_active": "Очень активный"
    },
    "bmi": {
      "under": "Недостаточный вес",
      "normal": "Норма",
      "over": "Избыточный вес",
      "obese": "Ожирение"
    },
    "hydration": {
      "morning": "Утро: 500ml после пробуждения",
      "beforeWorkout": "Перед тренировкой: 300–500ml",
      "duringWorkout": "Во время тренировки: небольшие глотки каждые 10–15 минут",
      "evening": "Вечер: доберите оставшуюся норму воды"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const ar = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "الرئيسية",
    "nutrition": "التغذية",
    "guide": "الدليل",
    "premium": "متميز",
    "settings": "الإعدادات",
    "workout": "التمارين",
    "more": "المزيد",
    "program": "البرنامج",
    "profile": "الملف الشخصي",
    "weightChart": "مخطط الوزن"
  },
  "home": {
    "title": "اختر خطة التمرين",
    "subtitle": "اختر برنامجاً وتدرب يومياً",
    "program60": "حرق الدهون في 60 يوماً",
    "program90": "تمرين شامل لمدة 90 يوماً",
    "daysSuffix": "{{count}} يوم",
    "health_overview": "نظرة عامة على الصحة",
    "activeTitle": "قيد التنفيذ",
    "noActive": "لا يوجد برنامج نشط حالياً."
  },
  "program": {
    "daysPrefix": "اليوم {{day}} • {{weekday}}",
    "weekTitle": "الأسبوع {{n}}",
    "completed": "مكتمل",
    "todayWorkout": "تمرين اليوم: {{name}}"
  },
  "workouts": {
    "rest": "استشفاء / راحة",
    "hiit": "HIIT لكامل الجسم",
    "upper": "صدر - أكتاف - ذراعين",
    "lower": "أرداف - أرجل",
    "core": "عضلات البطن والجذع",
    "pickOne": "اختر خطة للبدء",
    "days": "days",
    "day": "days",
    "heroTitle": "خطة تمرينك اليومية",
    "matchingResults": "النتائج المطابقة"
  },
  "guide": {
    "title": "كيفية استخدام PulseFit",
    "subtitle": "اتبع هذه الخطوات البسيطة لبدء رحلتك الرياضية.",
    "steps": {
      "step1": {
        "badge": "الخطوة 1",
        "title": "أدخل معلوماتك الشخصية",
        "desc": "أدخل الطول والوزن والحالة الصحية والأهداف وغيرها من المعلومات الأساسية. سيحسب التطبيق مؤشر كتلة الجسم ويقدم لك نصائح صحية لمساعدتك على البدء بأمان."
      },
      "step2": {
        "badge": "الخطوة 2",
        "title": "اختر برنامج تمرين مناسب",
        "desc": "تصفح برامج التمرين المتاحة واختر البرنامج الأنسب لمستوى لياقتك وأهدافك وتفضيلاتك."
      },
      "step3": {
        "badge": "الخطوة 3",
        "title": "اختر يوم التمرين",
        "desc": "افتح البرنامج الذي اخترته وحدد يوم التمرين الذي تريد اتباعه. يمكنك التقدم خطوة بخطوة وفقًا لجدول التمرين."
      },
      "step4": {
        "badge": "الخطوة 4",
        "title": "تمرن مع الفيديو",
        "desc": "اتبع فيديو التمرين لأداء التمارين بشكل صحيح. يمكنك تدوير الهاتف أفقيًا لمشاهدة الفيديو بملء الشاشة للحصول على تجربة أفضل."
      }
    },
    "noteTitle": "ملاحظة",
    "note": "حافظ على التمرين المنتظم لتحقيق أفضل النتائج."
  },
  "premium": {
    "title": "الترقية إلى بريميوم",
    "removeAds": "إزالة الإعلانات",
    "allPrograms": "افتح التجربة الكاملة",
    "active": "بريميوم مفعل",
    "restore": "استعادة المشتريات",
    "restoreTitle": "استعادة المشتريات",
    "restoreSuccess": "تمت استعادة بريميوم بنجاح.",
    "restoreEmpty": "لم يتم العثور على أي عملية شراء لبريميوم.",
    "errorTitle": "فشل الشراء",
    "errorText": "تعذر إكمال عملية الشراء.",
    "productUnavailable": "لم يتم العثور على منتج بريميوم. يرجى التحقق من إعدادات Play Console / App Store.",
    "subUnavailable": "لم يتم العثور على الاشتراك الشهري. يرجى التحقق من إعدادات Play Console / App Store.",
    "loading": "جارٍ التحميل...",
    "monthlyTitle": "بريميوم الشهري",
    "monthlyDesc": "يتجدد تلقائيًا كل شهر للحفاظ على تفعيل بريميوم",
    "subscribeMonthly": "اشترك شهريًا",
    "lifetimeTitle": "بريميوم مدى الحياة",
    "lifetimeDesc": "دفعة واحدة، واحصل على بريميوم مدى الحياة",
    "buyLifetime": "اشترِ مدى الحياة"
  },
  "video": {
    "loading": "جاري تحميل الفيديو...",
    "play": "ابدأ التمرين",
    "error": "تعذر تشغيل الفيديو. يرجى المحاولة مرة أخرى."
  },
// ar
settings: {
  title: 'الإعدادات',
  language: 'اللغة',
  choose: 'اختر لغة',
  chooseLanguage: 'اختر لغة التطبيق',
  general: 'عام',
  dailyReminder: 'تذكير يومي',
  tapToToggleReminder: 'اضغط لتبديل التذكير بين 20:00/07:00',
  accountAndTraining: 'الحساب والتمارين',
  // ar
workoutReminderKicker: 'تذكير التمرين',
chooseWorkoutReminderTime: 'اختر وقت التذكير',
workoutReminderDesc:
  'اختر الوقت الذي تريد أن يذكرك فيه التطبيق بالتمرين يوميًا.',
hour: 'الساعة',
minute: 'الدقيقة',
saveReminder: 'حفظ',
disableReminder: 'إيقاف',
reminderOffText: 'متوقف • اضغط لاختيار الوقت',
dailyReminderTitle: 'حان وقت التمرين! 💪',
dailyReminderBody:
  'افتح Insanity Deluxe Edition وأكمل تمرين اليوم.',
},
  "onboard": {
    "title": "لنبدأ الآن 👋",
    "subtitle": "أدخل بعض التفاصيل لنقترح عليك الخطة المناسبة",
    "name": "الاسم الكامل *",
    "age": "العمر *",
    "gender": "الجنس *",
    "gender_male": "ذكر",
    "gender_female": "أنثى",
    "gender_other": "آخر",
    "health": "الحالة الصحية",
    "height": "الطول (سم) *",
    "weight": "الوزن (كجم) *",
    "injured_q": "هل لديك إصابة؟",
    "injury_note": "وصف الإصابة",
    "goal": "الهدف الحالي *",
    "goals": {
      "lose_weight": "إنقاص الوزن",
      "build_muscle": "بناء العضلات",
      "maintain": "الحفاظ على الوزن",
      "recomp": "إعادة تشكيل الجسم (حرق دهون + بناء عضلات)",
      "endurance": "التحمل",
      "flexibility": "المرونة"
    },
    "tip_title": "نصائح سريعة",
    "tip_1": "في حال وجود إصابة، ابدأ بتمارين منخفضة التأثير وزد الكثافة تدريجياً.",
    "tip_2": "حدث وزنك كل 3 أيام لتتبع التقدم.",
    "back": "رجوع",
    "next": "التالي",
    "finish": "إنهاء",
    "saving": "جاري الحفظ...",
    "bmi": "مؤشر كتلة الجسم (BMI)",
    "bmi_result_title": "نظرة عامة على الصحة",
    "bmi_label_under": "نقص في الوزن",
    "bmi_label_normal": "وزن طبيعي",
    "bmi_label_over": "زيادة في الوزن",
    "bmi_label_obese": "سمنة",
    "advice_intro": "• مؤشر كتلة جسمك: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• التركيز على زيادة الكتلة العضلية: تمرين كامل الجسم/علوي-سفلي بكثافة متوسطة؛ زيادة الأوزان؛ بروتين وسعرات حرارية كافية.",
    "advice_bmi_normal": "• الحفاظ: مزيج من القوة + كارديو متوسط (2-3 أيام/أسبوع)؛ الأولوية للأداء الصحيح والنوم.",
    "advice_bmi_over": "• حرق الدهون: كارديو متوسط/HIIT خفيف (2-3 أيام) + تمرين قوة لكامل الجسم؛ عجز بسيط في السعرات.",
    "advice_bmi_obese": "• فقدان آمن للوزن: مشي سريع/كارديو منخفض التأثير + تمارين قوة أساسية؛ مراقبة نبضات القلب، زيادة الكثافة تدريجياً.",
    "advice_goal_lose_weight": "• الهدف: إنقاص الوزن ← تتبع السعرات، 1.6–2.2 جم/كجم بروتين، نوم 7–8 ساعات.",
    "advice_goal_build_muscle": "• الهدف: بناء العضلات ← زيادة الأحمال تدريجياً (3–5 أيام/أسبوع)، 1.6–2.2 جم/كجم بروتين، فائض بسيط في السعرات.",
    "advice_goal_maintain": "• الهدف: الحفاظ ← 3 أيام/أسبوع، توازن بين القوة والكارديو، قياس الوزن أسبوعياً.",
    "advice_goal_recomp": "• الهدف: إعادة التشكيل ← رفع أوزان أساسي + بروتين عالٍ، عجز بسيط في السعرات، نوم جيد.",
    "advice_goal_endurance": "• الهدف: التحمل ← المنطقة 2 (Zone 2) + فترات متقطعة (Intervals)؛ تناول الكربوهيدرات قبل التمرين.",
    "advice_goal_flexibility": "• الهدف: المرونة ← تمارين حركية يومية/مدى حركي 10–20 دقيقة، إضافة تمارين قوة خفيفة.",
    "advice_injured": "• ملاحظة الإصابة: تأثير منخفض، مدى حركي بدون ألم؛ تقدم تدريجي؛ استشر مدرباً/طبيباً عند الحاجة.",
    "advice_healthnote": "• راقب الحالات الصحية المسجلة واضبط الكثافة وفقاً لذلك.",
    "start_training": "ابدأ التمرين"
  },
  "weight": {
    "prompt_title": "تحديث الوزن",
    "prompt_desc": "أدخل وزنك الحالي (كجم)",
    "prompt_placeholder": "مثال: 65.5",
    "later": "لاحقاً",
    "save": "حفظ",
    "chart_title": "تتبع الوزن",
    "chart_empty": "لا توجد بيانات بعد. سيقوم التطبيق بتذكيرك دورياً بتسجيل وزنك."
  },
  "UserProfile": {
    "title": "الملف الشخصي",
    "subtitle": "أدخل معلوماتك للحصول على توصيات تمارين مخصصة",
    "name_label": "الاسم الكامل *",
    "name_ph": "مثال: أحمد محمد",
    "age_label": "العمر",
    "age_ph": "مثال: 28",
    "gender_label": "الجنس",
    "gender_male": "ذكر",
    "gender_female": "أنثى",
    "gender_other": "آخر",
    "height_label": "الطول (سم)",
    "height_ph": "مثال: 170",
    "weight_label": "الوزن (كجم)",
    "weight_ph": "مثال: 65",
    "bmi": "مؤشر كتلة الجسم (BMI)",
    "bmi_label_under": "نقص في الوزن",
    "bmi_label_normal": "وزن طبيعي",
    "bmi_label_over": "زيادة في الوزن",
    "bmi_label_obese": "سمنة",
    "health_label": "الحالة الصحية",
    "health_ph": "مثال: ضغط الدم مستقر، النوم جيد، العودة للتدريب...",
    "injured_q": "هل لديك أي إصابات؟",
    "injury_label": "تفاصيل الإصابة",
    "injury_ph": "مثال: ألم في الركبة اليسرى، تجنب القرفصاء العميق؛ ألم الكتف عند الدفع...",
    "hint_fill_hw": "أدخل الطول والوزن للحصول على الاقتراحات.",
    "rec_injured": "توصية: الأولوية لتمارين الجذع/الجزء العلوي الخفيفة مع أيام راحة أكثر.",
    "rec_overweight": "توصية: خطة حرق الدهون (HIIT خفيف ← متوسط) بالتناوب مع الجزء السفلي/الجذع.",
    "rec_general": "توصية: خطة كامل الجسم (قوة أساسية + جذع).",
    "loading": "جاري التحميل...",
    "save_success_title": "تم الحفظ",
    "save_error_title": "خطأ",
    "save_error_msg": "تعذر حفظ البيانات. يرجى المحاولة مرة أخرى.",
    "btn_delete": "حذف",
    "btn_save": "حفظ"
  },
  "dashboard": {
    "title": "لوحة التقدم",
    "streak": "سلسلة الأيام",
    "thisWeek": "هذا الأسبوع",
    "total": "الإجمالي",
    "completedPrograms": "المكتمل",
    "lastWorkout": "آخر تمرين"
  },
  "recommend": {
    "title": "موصى به لك",
    "start": "ابدأ هذه الخطة"
  },
  "nutrition": {
    "title": "التغذية",
    "subtitle": "يقترح التطبيق السعرات والماء ونسب التغذية حسب هدفك.",
    "noProfileTitle": "أكمل ملفك أولاً",
    "noProfileText": "أضف الطول والوزن والهدف للحصول على توصيات.",
    "targets": "الأهداف اليومية",
    "calories": "السعرات",
    "water": "الماء",
    "macros": "توزيع الماكرو",
    "protein": "بروتين",
    "carbs": "كربوهيدرات",
    "fats": "دهون",
    "sampleMeals": "وجبات نموذجية",
    "tips": "نصائح",
    "screenTitle": "التغذية",
    "heroStep": "3",
    "heroTitleLine1": "خطة تغذية",
    "heroTitleLine2": "شخصية",
    "dailyGoal": "الأهداف اليومية",
    "edit": "تعديل",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "نسبة الماكرو",
    "carb": "كربوهيدرات",
    "fat": "دهون",
    "viewAll": "عرض الكل",
    "breakfast": "فطور",
    "lunch": "غداء",
    "dinner": "عشاء",
    "snack": "وجبة خفيفة",
    "mealPlan": "اقتراحات الوجبات",
    "tipFallback": "اشرب كمية كافية من الماء وركز على الأطعمة الغنية بالبروتين.",
    "footer1": "من اليوم،",
    "footer2": "نسخة أفضل منك",
    "science": "علمي",
    "effective": "فعال",
    "sustainable": "مستدام",
    "advancedMode": "الوضع المتقدم",
    "pro": "PRO",
    "advancedTitle": "تحليل تغذية احترافي",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "تعديل",
    "kcalPerDay": "kcal/يوم",
    "mealSplit": "تقسيم السعرات حسب الوجبة",
    "hydration": "جدول شرب الماء",
    "note": "ملاحظة مهمة",
    // ar
customTargetKicker: 'هدف مخصص',
editDailyGoals: 'تعديل الأهداف اليومية',
editDailyGoalsDesc:
  'غيّر هدف السعرات أو الماء. سيعيد التطبيق حساب الماكرو واقتراحات الوجبات تلقائيًا.',
resetAuto: 'تلقائي',
// ar
waterReminderKicker: 'الترطيب',
waterReminder: 'تذكير شرب الماء',
waterReminderDesc:
  'احصل على تذكيرات لطيفة خلال اليوم بناءً على هدفك من الماء.',
waterReminderOn: 'تشغيل',
waterReminderOff: 'إيقاف',
waterTarget: 'هدف الماء',
reminderTime: 'وقت التذكير',
reminderInterval: 'الفاصل الزمني',
waterReminderTitle: 'حان وقت شرب الماء',
waterReminderBody: 'اشرب حوالي {{amount}}ml من الماء للحفاظ على الترطيب.',
  },
  "beginner": {
    "modeTitle": "وضع المبتدئين",
    "modeDesc": "شروحات بسيطة وإرشادات سريعة للمستخدمين الجدد.",
    "glossaryTitle": "دليل المبتدئين",
    "terms": {
      "restDay": {
        "title": "يوم الراحة",
        "desc": "إنه يوم للتعافي. يرتاح جسمك ويعيد بناء نفسه، لذلك لا تتجاهله."
      },
      "warmUp": {
        "title": "الإحماء",
        "desc": "حركة خفيفة قبل التمرين لتحضير الجسم وتقليل خطر الإصابة."
      },
      "cooldown": {
        "title": "التهدئة",
        "desc": "حركة سهلة أو تمارين إطالة بعد التمرين لمساعدة الجسم على التعافي."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "تدريب الفترات عالي الشدة: فترات قصيرة من الجهد القوي تتبعها راحات قصيرة."
      },
      "rep": {
        "title": "تكرار",
        "desc": "حركة كاملة واحدة للتمرين. مثال: قرفصاء واحدة = تكرار واحد."
      },
      "set": {
        "title": "مجموعة",
        "desc": "مجموعة من التكرارات. مثال: 10 مرات قرفصاء متتالية = مجموعة واحدة."
      }
    }
  },
  "todayWorkout": {
    "title": "تمرين اليوم",
    "fallback": "تمرين",
    "startNow": "ابدأ الآن",
    "restTitle": "اليوم هو يوم تعافٍ",
    "restText": "خذ قسطًا من الراحة، وتمدد بلطف، واشرب الماء، واستعد لتمرينك التالي."
  },
  "common": {
    "on": "تشغيل",
    "off": "إيقاف",
    "cancel": "إلغاء",
    "edit": "تعديل",
    "viewAll": "عرض الكل"
  },
  "history": {
    "title": "سجل التمارين",
    "screenTitle": "سجل التمارين",
    "thisWeek": "هذا الأسبوع",
    "minutes": "دقائق",
    "totalWorkouts": "التمارين",
    "empty": "لا توجد تمارين مكتملة حتى الآن.",
    "viewAll": "عرض الكل",
    "filter7": "7 أيام",
    "filter30": "30 يومًا",
    "filterAll": "الكل"
  },
  "achievements": {
    "title": "الإنجازات",
    "firstWorkout": "أول تمرين",
    "tenWorkouts": "10 تمارين",
    "twentyfiveWorkouts": "25 تمرينًا",
    "streak3": "سلسلة 3 أيام",
    "streak7": "سلسلة 7 أيام",
    "week4": "4 تمارين هذا الأسبوع",
    "finishProgram": "إكمال برنامج واحد"
  },
  "challenges": {
    "title": "التحديات",
    "intro": "ابدأ تحديًا قصيرًا للحفاظ على الاستمرارية.",
    "start7": "ابدأ تحدي 7 أيام",
    "start30": "ابدأ تحدي 30 يومًا",
    "complete": "تم إكمال التحدي",
    "daysLeft": "متبقي {{count}} يوم",
    "starter7Title": "تحدي البداية لمدة 7 أيام",
    "starter7Desc": "أكمل 5 تمارين خلال 7 أيام.",
    "consistency30Title": "تحدي الاستمرارية لمدة 30 يومًا",
    "consistency30Desc": "أكمل 20 تمرينًا خلال 30 يومًا."
  },
  "filters": {
    "all": "الكل",
    "levelTitle": "المستوى",
    "level": {
      "beginner": "مبتدئ",
      "intermediate": "متوسط",
      "advanced": "متقدم"
    },
    "goalTitle": "التركيز",
    "goal": {
      "lose_weight": "إنقاص الوزن",
      "build_muscle": "بناء العضلات",
      "cardio": "كارديو",
      "core": "العضلات الأساسية",
      "mobility": "المرونة"
    },
    "equipmentTitle": "المعدات",
    "equipment": {
      "no_equipment": "بدون معدات",
      "with_equipment": "مع معدات"
    },
    "durationTitle": "المدة",
    "duration": {
      "short": "قصيرة",
      "medium": "متوسطة",
      "long": "طويلة"
    },
    "noResultsTitle": "لا توجد برامج مطابقة",
    "noResultsText": "حاول تغيير عامل تصفية واحد أو أكثر."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "خطة {{goalLabel}}: {{calories}} kcal/يوم، {{proteinG}}g بروتين، {{carbsG}}g كربوهيدرات، {{fatsG}}g دهون. BMR {{bmr}}، TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "خسارة الدهون",
      "build_muscle": "بناء العضلات",
      "maintain": "الحفاظ",
      "recomp": "إعادة تركيب الجسم",
      "endurance": "التحمل",
      "flexibility": "صحة عامة"
    },
    "activity": {
      "sedentary": "قليل الحركة",
      "light": "نشاط خفيف",
      "moderate": "نشاط متوسط",
      "active": "نشط",
      "very_active": "نشط جداً"
    },
    "bmi": {
      "under": "نقص وزن",
      "normal": "طبيعي",
      "over": "زيادة وزن",
      "obese": "سمنة"
    },
    "hydration": {
      "morning": "الصباح: 500ml بعد الاستيقاظ",
      "beforeWorkout": "قبل التمرين: 300–500ml",
      "duringWorkout": "أثناء التمرين: رشفات صغيرة كل 10–15 دقيقة",
      "evening": "المساء: إكمال هدف الماء المتبقي"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const hi = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "होम",
    "nutrition": "पोषण",
    "guide": "गाइड",
    "premium": "प्रीमियम",
    "settings": "सेटिंग्स",
    "workout": "वर्कआउट",
    "more": "अधिक",
    "program": "प्रोग्राम",
    "profile": "प्रोफ़ाइल",
    "weightChart": "वजन चार्ट"
  },
  "home": {
    "title": "अपना वर्कआउट प्लान चुनें",
    "subtitle": "एक प्रोग्राम चुनें और रोज़ ट्रेनिंग करें",
    "program60": "60-दिवसीय फैट बर्न",
    "program90": "90-दिवसीय फुल बॉडी",
    "daysSuffix": "{{count}} दिन",
    "health_overview": "स्वास्थ्य अवलोकन",
    "activeTitle": "जारी है",
    "noActive": "वर्तमान में कोई प्रोग्राम सक्रिय नहीं है"
  },
  "program": {
    "daysPrefix": "दिन {{day}} • {{weekday}}",
    "weekTitle": "सप्ताह {{n}}",
    "completed": "पूरा हुआ",
    "todayWorkout": "आज का वर्कआउट: {{name}}"
  },
  "workouts": {
    "rest": "रिकवरी / आराम",
    "hiit": "फुल-बॉडी HIIT",
    "upper": "छाती - कंधे - बाहें",
    "lower": "कूल्हे - पैर",
    "core": "एब्स (Abs) और कोर",
    "pickOne": "शुरू करने के लिए एक प्लान चुनें",
    "days": "दिन",
    "day": "दिन",
    "heroTitle": "आपकी दैनिक वर्कआउट योजना",
    "matchingResults": "मेल खाते परिणाम"
  },
  "guide": {
    "title": "PulseFit का उपयोग कैसे करें",
    "subtitle": "अपनी वर्कआउट यात्रा शुरू करने के लिए इन आसान चरणों का पालन करें।",
    "steps": {
      "step1": {
        "badge": "चरण 1",
        "title": "अपनी व्यक्तिगत जानकारी दर्ज करें",
        "desc": "अपनी लंबाई, वजन, स्वास्थ्य स्थिति, लक्ष्य और अन्य बुनियादी जानकारी भरें। ऐप आपका BMI निकालेगा और आपको सुरक्षित शुरुआत के लिए स्वास्थ्य सलाह देगा।"
      },
      "step2": {
        "badge": "चरण 2",
        "title": "उपयुक्त वर्कआउट प्रोग्राम चुनें",
        "desc": "उपलब्ध वर्कआउट प्रोग्राम देखें और अपने फिटनेस स्तर, लक्ष्यों और पसंद के अनुसार सबसे उपयुक्त प्रोग्राम चुनें।"
      },
      "step3": {
        "badge": "चरण 3",
        "title": "अपना वर्कआउट दिन चुनें",
        "desc": "चुने गए प्रोग्राम को खोलें और वह दिन चुनें जिसे आप करना चाहते हैं। आप शेड्यूल के अनुसार चरण दर चरण आगे बढ़ सकते हैं।"
      },
      "step4": {
        "badge": "चरण 4",
        "title": "वीडियो के साथ वर्कआउट करें",
        "desc": "सही तरीके से अभ्यास करने के लिए वर्कआउट वीडियो का पालन करें। बेहतर अनुभव के लिए आप अपना फोन क्षैतिज घुमा कर वीडियो को फुल स्क्रीन में देख सकते हैं।"
      }
    },
    "noteTitle": "नोट",
    "note": "सबसे अच्छे परिणाम पाने के लिए नियमित रूप से अभ्यास करते रहें।"
  },
  "premium": {
    "title": "प्रीमियम में अपग्रेड करें",
    "removeAds": "विज्ञापन हटाएँ",
    "allPrograms": "पूरा अनुभव अनलॉक करें",
    "active": "प्रीमियम सक्रिय है",
    "restore": "खरीदारी पुनर्स्थापित करें",
    "restoreTitle": "खरीदारी पुनर्स्थापित करें",
    "restoreSuccess": "प्रीमियम सफलतापूर्वक पुनर्स्थापित हो गया।",
    "restoreEmpty": "कोई प्रीमियम खरीद नहीं मिली।",
    "errorTitle": "खरीद विफल रही",
    "errorText": "खरीद पूरी नहीं हो सकी।",
    "productUnavailable": "प्रीमियम प्रोडक्ट नहीं मिला। कृपया Play Console / App Store सेटअप जाँचें।",
    "subUnavailable": "मासिक सदस्यता नहीं मिली। कृपया Play Console / App Store सेटअप जाँचें।",
    "loading": "लोड हो रहा है...",
    "monthlyTitle": "मासिक प्रीमियम",
    "monthlyDesc": "प्रीमियम सक्रिय रखने के लिए हर महीने अपने आप नवीनीकृत होता है",
    "subscribeMonthly": "मासिक सदस्यता लें",
    "lifetimeTitle": "आजीवन प्रीमियम",
    "lifetimeDesc": "एक बार भुगतान करें, हमेशा के लिए प्रीमियम पाएँ",
    "buyLifetime": "आजीवन खरीदें"
  },
  "video": {
    "loading": "वीडियो लोड हो रहा है...",
    "play": "वर्कआउट शुरू करें",
    "error": "वीडियो चलाने में असमर्थ। कृपया पुनः प्रयास करें।"
  },
// hi
settings: {
  title: 'सेटिंग्स',
  language: 'भाषा',
  choose: 'भाषा चुनें',
  chooseLanguage: 'ऐप की भाषा चुनें',
  general: 'सामान्य',
  dailyReminder: 'दैनिक रिमाइंडर',
  tapToToggleReminder: '20:00/07:00 रिमाइंडर बदलने के लिए टैप करें',
  accountAndTraining: 'खाता और प्रशिक्षण',
  // hi
workoutReminderKicker: 'वर्कआउट रिमाइंडर',
chooseWorkoutReminderTime: 'रिमाइंडर का समय चुनें',
workoutReminderDesc:
  'वह समय चुनें जब ऐप आपको हर दिन ट्रेनिंग की याद दिलाए।',
hour: 'घंटा',
minute: 'मिनट',
saveReminder: 'सेव करें',
disableReminder: 'बंद करें',
reminderOffText: 'बंद • समय चुनने के लिए टैप करें',
dailyReminderTitle: 'वर्कआउट का समय हो गया! 💪',
dailyReminderBody:
  'Insanity Deluxe Edition खोलें और आज का सेशन पूरा करें।',
},
  "onboard": {
    "title": "चलिए शुरू करते हैं 👋",
    "subtitle": "कुछ विवरण दर्ज करें ताकि हम आपके लिए सही प्लान सुझा सकें",
    "name": "पूरा नाम *",
    "age": "उम्र *",
    "gender": "लिंग *",
    "gender_male": "पुरुष",
    "gender_female": "महिला",
    "gender_other": "अन्य",
    "health": "स्वास्थ्य स्थिति",
    "height": "कद (cm) *",
    "weight": "वजन (kg) *",
    "injured_q": "क्या कोई चोट (Injury) है?",
    "injury_note": "चोट का विवरण",
    "goal": "वर्तमान लक्ष्य *",
    "goals": {
      "lose_weight": "वजन घटाएं",
      "build_muscle": "मसल्स (Muscle) बनाएं",
      "maintain": "वजन बनाए रखें",
      "recomp": "रिकॉम्प (फैट लॉस + मसल गेन)",
      "endurance": "स्टैमिना बढ़ाएं",
      "flexibility": "लचीलापन (Flexibility)"
    },
    "tip_title": "क्विक टिप्स",
    "tip_1": "यदि चोट लगी है, तो कम प्रभाव (Low-impact) वाले व्यायाम से शुरू करें और धीरे-धीरे तीव्रता बढ़ाएं।",
    "tip_2": "प्रगति ट्रैक करने के लिए हर 3 दिन में अपना वजन अपडेट करें।",
    "back": "पीछे",
    "next": "आगे",
    "finish": "समाप्त",
    "saving": "सेव हो रहा है...",
    "bmi": "BMI",
    "bmi_result_title": "स्वास्थ्य अवलोकन",
    "bmi_label_under": "कम वजन (Underweight)",
    "bmi_label_normal": "सामान्य",
    "bmi_label_over": "अधिक वजन (Overweight)",
    "bmi_label_obese": "मोटापा (Obese)",
    "advice_intro": "• आपका BMI: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• लीन मास (Lean Mass) बढ़ाने पर ध्यान दें: मध्यम तीव्रता पर फुल-बॉडी/अपर-लोअर वर्कआउट; वजन बढ़ाएं; पर्याप्त प्रोटीन और कैलोरी लें।",
    "advice_bmi_normal": "• बनाए रखें (Maintain): स्ट्रेंथ + मध्यम कार्डियो (सप्ताह में 2-3 दिन); तकनीक और नींद को प्राथमिकता दें।",
    "advice_bmi_over": "• फैट लॉस: मध्यम कार्डियो/हल्का HIIT (2-3 दिन) + फुल-बॉडी स्ट्रेंथ; कैलोरी में थोड़ी कमी (Deficit) रखें।",
    "advice_bmi_obese": "• सुरक्षित फैट लॉस: तेज चलना/लो-इम्पैक्ट कार्डियो + बेसिक स्ट्रेंथ; हार्ट रेट पर नज़र रखें, धीरे-धीरे तीव्रता बढ़ाएं।",
    "advice_goal_lose_weight": "• लक्ष्य: वजन घटाना → कैलोरी ट्रैक करें, 1.6–2.2g/kg प्रोटीन, 7–8 घंटे की नींद।",
    "advice_goal_build_muscle": "• लक्ष्य: मसल्स बनाना → प्रोग्रेसिव ओवरलोड (सप्ताह में 3-5 दिन), 1.6–2.2g/kg प्रोटीन, कैलोरी में थोड़ी बढ़ोतरी।",
    "advice_goal_maintain": "• लक्ष्य: बनाए रखना → सप्ताह में 3 दिन, स्ट्रेंथ + कार्डियो का संतुलन, साप्ताहिक वजन करें।",
    "advice_goal_recomp": "• लक्ष्य: रिकॉम्प → बेसिक लिफ्टिंग + उच्च प्रोटीन, कैलोरी में थोड़ी कमी, अच्छी नींद।",
    "advice_goal_endurance": "• लक्ष्य: एंड्योरेंस → जोन 2 + इंटरवल; वर्कआउट से पहले कार्ब्स लें।",
    "advice_goal_flexibility": "• लक्ष्य: फ्लेक्सिबिलिटी → रोज़ाना मोबिलिटी/ROM 10–20 मिनट, हल्की स्ट्रेंथ ट्रेनिंग जोड़ें।",
    "advice_injured": "• चोट नोट: लो-इम्पैक्ट, बिना दर्द वाली रेंज में करें; धीरे-धीरे आगे बढ़ें; ज़रूरत पड़ने पर कोच/डॉक्टर से सलाह लें।",
    "advice_healthnote": "• नोट की गई स्वास्थ्य स्थितियों पर नज़र रखें और उसके अनुसार तीव्रता को समायोजित करें।",
    "start_training": "ट्रेनिंग शुरू करें"
  },
  "weight": {
    "prompt_title": "वजन अपडेट करें",
    "prompt_desc": "अपना वर्तमान वजन दर्ज करें (kg)",
    "prompt_placeholder": "जैसे: 65.5",
    "later": "बाद में",
    "save": "सेव करें",
    "chart_title": "वजन ट्रैकिंग",
    "chart_empty": "अभी कोई डेटा नहीं है। ऐप आपको समय-समय पर वजन लॉग करने के लिए याद दिलाएगा।"
  },
  "UserProfile": {
    "title": "यूज़र प्रोफ़ाइल",
    "subtitle": "पर्सनलाइज़्ड वर्कआउट सुझाव पाने के लिए अपनी जानकारी दर्ज करें",
    "name_label": "पूरा नाम *",
    "name_ph": "जैसे: राहुल शर्मा",
    "age_label": "उम्र",
    "age_ph": "जैसे: 28",
    "gender_label": "लिंग",
    "gender_male": "पुरुष",
    "gender_female": "महिला",
    "gender_other": "अन्य",
    "height_label": "कद (cm)",
    "height_ph": "जैसे: 170",
    "weight_label": "वजन (kg)",
    "weight_ph": "जैसे: 65",
    "bmi": "BMI",
    "bmi_label_under": "कम वजन",
    "bmi_label_normal": "सामान्य",
    "bmi_label_over": "अधिक वजन",
    "bmi_label_obese": "मोटापा",
    "health_label": "स्वास्थ्य स्थिति",
    "health_ph": "जैसे: बीपी (BP) सामान्य, नींद अच्छी, ट्रेनिंग पर वापसी...",
    "injured_q": "क्या कोई चोट है?",
    "injury_label": "चोट का विवरण",
    "injury_ph": "जैसे: बाएं घुटने में दर्द, गहरे स्क्वैट्स (Squats) से बचें; शोल्डर पेन...",
    "hint_fill_hw": "सुझाव पाने के लिए कद और वजन दर्ज करें।",
    "rec_injured": "सुझाव: अधिक आराम के दिनों के साथ हल्के कोर/अपर बॉडी सेशन को प्राथमिकता दें।",
    "rec_overweight": "सुझाव: फैट-लॉस प्लान (हल्का → मध्यम HIIT) और लोअर/कोर को बदल-बदल कर करें।",
    "rec_general": "सुझाव: फुल-बॉडी प्लान (बुनियादी स्ट्रेंथ + कोर)।",
    "loading": "लोड हो रहा है...",
    "save_success_title": "सेव कर लिया गया",
    "save_error_title": "त्रुटि (Error)",
    "save_error_msg": "आपका डेटा सेव नहीं हो सका। कृपया पुनः प्रयास करें।",
    "btn_delete": "हटाएं",
    "btn_save": "सेव करें"
  },
  "dashboard": {
    "title": "प्रगति डैशबोर्ड",
    "streak": "लगातार दिन",
    "thisWeek": "इस सप्ताह",
    "total": "कुल",
    "completedPrograms": "पूर्ण",
    "lastWorkout": "पिछला वर्कआउट"
  },
  "recommend": {
    "title": "आपके लिए सुझाया गया",
    "start": "यह प्लान शुरू करें"
  },
  "nutrition": {
    "title": "पोषण",
    "subtitle": "ऐप आपके लक्ष्य के अनुसार कैलोरी, पानी और पोषण अनुपात सुझाता है।",
    "noProfileTitle": "पहले प्रोफ़ाइल पूरी करें",
    "noProfileText": "ऊंचाई, वजन और लक्ष्य जोड़ें ताकि सुझाव मिल सकें।",
    "targets": "दैनिक लक्ष्य",
    "calories": "कैलोरी",
    "water": "पानी",
    "macros": "मैक्रो वितरण",
    "protein": "प्रोटीन",
    "carbs": "कार्ब",
    "fats": "वसा",
    "sampleMeals": "नमूना भोजन",
    "tips": "सलाह",
    "screenTitle": "पोषण",
    "heroStep": "3",
    "heroTitleLine1": "व्यक्तिगत",
    "heroTitleLine2": "पोषण योजना",
    "dailyGoal": "दैनिक लक्ष्य",
    "edit": "संपादित करें",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "मैक्रो अनुपात",
    "carb": "कार्ब",
    "fat": "वसा",
    "viewAll": "सभी देखें",
    "breakfast": "नाश्ता",
    "lunch": "दोपहर का भोजन",
    "dinner": "रात का भोजन",
    "snack": "स्नैक",
    "mealPlan": "भोजन सुझाव",
    "tipFallback": "पर्याप्त पानी पिएं और मांसपेशियों की रिकवरी के लिए प्रोटीन को प्राथमिकता दें।",
    "footer1": "आज से,",
    "footer2": "आपका बेहतर संस्करण",
    "science": "वैज्ञानिक",
    "effective": "प्रभावी",
    "sustainable": "टिकाऊ",
    "advancedMode": "उन्नत मोड",
    "pro": "PRO",
    "advancedTitle": "पेशेवर पोषण विश्लेषण",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "समायोजन",
    "kcalPerDay": "kcal/दिन",
    "mealSplit": "भोजन अनुसार कैलोरी विभाजन",
    "hydration": "पानी पीने का समय",
    "note": "महत्वपूर्ण नोट",
    // hi
customTargetKicker: 'कस्टम लक्ष्य',
editDailyGoals: 'दैनिक लक्ष्य संपादित करें',
editDailyGoalsDesc:
  'कैलोरी या पानी का लक्ष्य बदलें। ऐप मैक्रो और भोजन सुझावों की गणना अपने आप फिर से करेगा।',
resetAuto: 'ऑटो',
// hi
waterReminderKicker: 'हाइड्रेशन',
waterReminder: 'पानी पीने का रिमाइंडर',
waterReminderDesc:
  'अपने पानी के लक्ष्य के आधार पर दिन भर हल्के रिमाइंडर पाएं।',
waterReminderOn: 'चालू',
waterReminderOff: 'बंद',
waterTarget: 'पानी का लक्ष्य',
reminderTime: 'रिमाइंडर समय',
reminderInterval: 'अंतराल',
waterReminderTitle: 'पानी पीने का समय',
waterReminderBody: 'हाइड्रेटेड रहने के लिए लगभग {{amount}}ml पानी पिएं।',
  },
  "beginner": {
    "modeTitle": "बिगिनर मोड",
    "modeDesc": "नए उपयोगकर्ताओं के लिए आसान समझ और त्वरित मार्गदर्शन।",
    "glossaryTitle": "शुरुआती गाइड",
    "terms": {
      "restDay": {
        "title": "आराम का दिन",
        "desc": "यह रिकवरी का दिन है। आपका शरीर आराम करता है और खुद को दोबारा बनाता है, इसलिए इसे न छोड़ें।"
      },
      "warmUp": {
        "title": "वार्म-अप",
        "desc": "वर्कआउट से पहले हल्की गतिविधि ताकि शरीर तैयार हो जाए और चोट का जोखिम कम हो।"
      },
      "cooldown": {
        "title": "कूलडाउन",
        "desc": "वर्कआउट के बाद हल्की गतिविधि या स्ट्रेचिंग जिससे शरीर को रिकवरी में मदद मिले।"
      },
      "hiit": {
        "title": "HIIT",
        "desc": "हाई-इंटेंसिटी इंटरवल ट्रेनिंग: थोड़े समय की तेज मेहनत के बाद छोटा आराम।"
      },
      "rep": {
        "title": "रेप",
        "desc": "किसी व्यायाम की एक पूरी चाल। उदाहरण: एक स्क्वाट = एक रेप।"
      },
      "set": {
        "title": "सेट",
        "desc": "रेप्स का एक समूह। उदाहरण: 10 स्क्वाट लगातार करना = 1 सेट।"
      }
    }
  },
  "todayWorkout": {
    "title": "आज का वर्कआउट",
    "fallback": "वर्कआउट",
    "startNow": "अभी शुरू करें",
    "restTitle": "आज रिकवरी का दिन है",
    "restText": "थोड़ा आराम करें, हल्का स्ट्रेच करें, पानी पिएं और अपने अगले वर्कआउट के लिए तैयार हों।"
  },
  "common": {
    "on": "चालू",
    "off": "बंद",
    "cancel": "रद्द करें",
    "edit": "संपादित करें",
    "viewAll": "सभी देखें"
  },
  "history": {
    "title": "वर्कआउट इतिहास",
    "screenTitle": "वर्कआउट इतिहास",
    "thisWeek": "इस सप्ताह",
    "minutes": "मिनट",
    "totalWorkouts": "वर्कआउट",
    "empty": "अभी तक कोई पूरा वर्कआउट नहीं है।",
    "viewAll": "सभी देखें",
    "filter7": "7 दिन",
    "filter30": "30 दिन",
    "filterAll": "सभी"
  },
  "achievements": {
    "title": "उपलब्धियाँ",
    "firstWorkout": "पहला वर्कआउट",
    "tenWorkouts": "10 वर्कआउट",
    "twentyfiveWorkouts": "25 वर्कआउट",
    "streak3": "3-दिन की लगातार श्रृंखला",
    "streak7": "7-दिन की लगातार श्रृंखला",
    "week4": "इस सप्ताह 4 वर्कआउट",
    "finishProgram": "1 प्रोग्राम पूरा करें"
  },
  "challenges": {
    "title": "चैलेंज",
    "intro": "नियमित बने रहने के लिए एक छोटा चैलेंज शुरू करें।",
    "start7": "7-दिन का चैलेंज शुरू करें",
    "start30": "30-दिन का चैलेंज शुरू करें",
    "complete": "चैलेंज पूरा हुआ",
    "daysLeft": "{{count}} दिन बाकी",
    "starter7Title": "7-दिन शुरुआती चैलेंज",
    "starter7Desc": "7 दिनों में 5 वर्कआउट पूरे करें।",
    "consistency30Title": "30-दिन नियमितता चैलेंज",
    "consistency30Desc": "30 दिनों में 20 वर्कआउट पूरे करें।"
  },
  "filters": {
    "all": "सभी",
    "levelTitle": "स्तर",
    "level": {
      "beginner": "शुरुआती",
      "intermediate": "मध्यम",
      "advanced": "उन्नत"
    },
    "goalTitle": "फोकस",
    "goal": {
      "lose_weight": "वजन घटाना",
      "build_muscle": "मांसपेशी बढ़ाना",
      "cardio": "कार्डियो",
      "core": "कोर",
      "mobility": "लचीलापन"
    },
    "equipmentTitle": "उपकरण",
    "equipment": {
      "no_equipment": "बिना उपकरण",
      "with_equipment": "उपकरण के साथ"
    },
    "durationTitle": "अवधि",
    "duration": {
      "short": "कम",
      "medium": "मध्यम",
      "long": "लंबी"
    },
    "noResultsTitle": "कोई मेल खाने वाला प्रोग्राम नहीं मिला",
    "noResultsText": "एक या अधिक फ़िल्टर बदलकर देखें।"
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "{{goalLabel}} योजना: {{calories}} kcal/दिन, {{proteinG}}g प्रोटीन, {{carbsG}}g कार्ब, {{fatsG}}g वसा। अनुमानित BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "फैट लॉस",
      "build_muscle": "मसल बिल्ड",
      "maintain": "मेंटेन",
      "recomp": "बॉडी री-कम्प",
      "endurance": "एंड्योरेंस",
      "flexibility": "सामान्य स्वास्थ्य"
    },
    "activity": {
      "sedentary": "कम सक्रिय",
      "light": "हल्की गतिविधि",
      "moderate": "मध्यम गतिविधि",
      "active": "सक्रिय",
      "very_active": "बहुत सक्रिय"
    },
    "bmi": {
      "under": "कम वजन",
      "normal": "सामान्य",
      "over": "अधिक वजन",
      "obese": "मोटापा"
    },
    "hydration": {
      "morning": "सुबह: उठने के बाद 500ml",
      "beforeWorkout": "वर्कआउट से पहले: 300–500ml",
      "duringWorkout": "वर्कआउट के दौरान: हर 10–15 मिनट छोटे घूंट",
      "evening": "शाम: बचे हुए पानी का लक्ष्य पूरा करें"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const th = {
  "tabs": {
    "main": "หน้าหลัก",
    "nutrition": "โภชนาการ",
    "guide": "คำแนะนำ",
    "premium": "พรีเมียม",
    "settings": "การตั้งค่า",
    "workout": "ออกกำลังกาย",
    "more": "เพิ่มเติม",
    "program": "โปรแกรม",
    "profile": "โปรไฟล์",
    "weightChart": "กราฟน้ำหนัก"
  },
  "home": {
    "title": "เลือกแผนการออกกำลังกาย",
    "subtitle": "เลือกโปรแกรมและฝึกซ้อมทุกวัน",
    "program60": "เบิร์นไขมัน 60 วัน",
    "program90": "บริหารทั่วร่างกาย 90 วัน",
    "daysSuffix": "{{count}} วัน",
    "health_overview": "ภาพรวมสุขภาพ",
    "activeTitle": "กำลังดำเนินการ",
    "noActive": "ไม่มีโปรแกรมที่กำลังฝึกในขณะนี้"
  },
  "program": {
    "daysPrefix": "วันที่ {{day}} • {{weekday}}",
    "weekTitle": "สัปดาห์ที่ {{n}}",
    "completed": "เสร็จสิ้น",
    "todayWorkout": "การฝึกวันนี้: {{name}}"
  },
  "workouts": {
    "rest": "ฟื้นฟูร่างกาย / พักผ่อน",
    "hiit": "HIIT ทั่วร่างกาย",
    "upper": "อก - ไหล่ - แขน",
    "lower": "ก้น - ขา",
    "core": "หน้าท้อง & แกนกลางลำตัว",
    "pickOne": "เลือกแผนการฝึกเพื่อเริ่มต้น",
    "days": "วัน",
    "day": "วัน",
    "heroTitle": "แผนออกกำลังกายประจำวัน",
    "matchingResults": "ผลลัพธ์ที่ตรงกัน"
  },
  "guide": {
    "title": "วิธีใช้ PulseFit",
    "subtitle": "ทำตามขั้นตอนง่าย ๆ เหล่านี้เพื่อเริ่มต้นการออกกำลังกายของคุณ",
    "steps": {
      "step1": {
        "badge": "ขั้นตอนที่ 1",
        "title": "กรอกข้อมูลส่วนตัว",
        "desc": "กรอกส่วนสูง น้ำหนัก สถานะสุขภาพ เป้าหมาย และข้อมูลพื้นฐานอื่น ๆ แอปจะคำนวณค่า BMI และให้คำแนะนำด้านสุขภาพเพื่อช่วยให้คุณเริ่มต้นได้อย่างปลอดภัย"
      },
      "step2": {
        "badge": "ขั้นตอนที่ 2",
        "title": "เลือกโปรแกรมออกกำลังกายที่เหมาะสม",
        "desc": "ดูโปรแกรมออกกำลังกายที่มีอยู่และเลือกโปรแกรมที่เหมาะกับระดับความฟิต เป้าหมาย และความชอบของคุณมากที่สุด"
      },
      "step3": {
        "badge": "ขั้นตอนที่ 3",
        "title": "เลือกวันออกกำลังกาย",
        "desc": "เปิดโปรแกรมที่เลือกแล้วเลือกวันที่คุณต้องการฝึก คุณสามารถทำตามตารางทีละขั้นตอนได้"
      },
      "step4": {
        "badge": "ขั้นตอนที่ 4",
        "title": "ออกกำลังกายตามวิดีโอ",
        "desc": "ทำตามวิดีโอออกกำลังกายเพื่อฝึกได้อย่างถูกต้อง คุณสามารถหมุนหน้าจอเป็นแนวนอนเพื่อดูวิดีโอแบบเต็มหน้าจอได้"
      }
    },
    "noteTitle": "หมายเหตุ",
    "note": "ออกกำลังกายอย่างสม่ำเสมอเพื่อให้ได้ผลลัพธ์ที่ดีที่สุด"
  },
  "video": {
    "loading": "กำลังโหลดวิดีโอ...",
    "play": "เริ่มการฝึก",
    "error": "ไม่สามารถเล่นวิดีโอได้ โปรดลองอีกครั้ง"
  },
// th
settings: {
  title: 'การตั้งค่า',
  language: 'ภาษา',
  choose: 'เลือกภาษา',
  chooseLanguage: 'เลือกภาษาของแอป',
  general: 'ทั่วไป',
  dailyReminder: 'การแจ้งเตือนรายวัน',
  tapToToggleReminder: 'แตะเพื่อสลับการแจ้งเตือน 20:00/07:00',
  accountAndTraining: 'บัญชีและการฝึก',
  // th
workoutReminderKicker: 'แจ้งเตือนการฝึก',
chooseWorkoutReminderTime: 'เลือกเวลาแจ้งเตือน',
workoutReminderDesc:
  'เลือกเวลาที่คุณต้องการให้แอปแจ้งเตือนให้ออกกำลังกายทุกวัน',
hour: 'ชั่วโมง',
minute: 'นาที',
saveReminder: 'บันทึก',
disableReminder: 'ปิด',
reminderOffText: 'ปิดอยู่ • แตะเพื่อเลือกเวลา',
dailyReminderTitle: 'ถึงเวลาออกกำลังกายแล้ว! 💪',
dailyReminderBody:
  'เปิด Insanity Deluxe Edition และทำเซสชันของวันนี้ให้เสร็จ',
},
  "onboard": {
    "title": "มาเริ่มกันเลย 👋",
    "subtitle": "กรอกข้อมูลเล็กน้อย เพื่อให้เราแนะนำแผนที่เหมาะสมกับคุณ",
    "name": "ชื่อ-นามสกุล *",
    "age": "อายุ *",
    "gender": "เพศ *",
    "gender_male": "ชาย",
    "gender_female": "หญิง",
    "gender_other": "อื่นๆ",
    "health": "ปัญหาสุขภาพ",
    "height": "ส่วนสูง (ซม.) *",
    "weight": "น้ำหนัก (กก.) *",
    "injured_q": "มีอาการบาดเจ็บหรือไม่?",
    "injury_note": "รายละเอียดอาการบาดเจ็บ",
    "goal": "เป้าหมายปัจจุบัน *",
    "goals": {
      "lose_weight": "ลดน้ำหนัก",
      "build_muscle": "สร้างกล้ามเนื้อ",
      "maintain": "รักษารูปร่าง",
      "recomp": "ปรับรูปร่าง (ลดไขมัน + สร้างกล้ามเนื้อ)",
      "endurance": "เพิ่มความอึด (Endurance)",
      "flexibility": "เพิ่มความยืดหยุ่น"
    },
    "tip_title": "เคล็ดลับด่วน",
    "tip_1": "หากมีอาการบาดเจ็บ ให้เริ่มจากท่าที่แรงกระแทกต่ำ (Low-impact) และค่อยๆ เพิ่มความหนัก",
    "tip_2": "อัปเดตน้ำหนักทุก 3 วันเพื่อติดตามความคืบหน้า",
    "back": "ย้อนกลับ",
    "next": "ถัดไป",
    "finish": "เสร็จสิ้น",
    "saving": "กำลังบันทึก...",
    "bmi": "BMI",
    "bmi_result_title": "ภาพรวมสุขภาพ",
    "bmi_label_under": "น้ำหนักต่ำกว่าเกณฑ์",
    "bmi_label_normal": "สมส่วน",
    "bmi_label_over": "น้ำหนักเกิน",
    "bmi_label_obese": "โรคอ้วน",
    "advice_intro": "• ค่า BMI ของคุณ: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• เน้นเพิ่มมวลกล้ามเนื้อ: ฝึกทั่วร่างกาย/บน-ล่าง ความหนักปานกลาง; เพิ่มน้ำหนักที่ยก; กินโปรตีนและแคลอรี่ให้เพียงพอ",
    "advice_bmi_normal": "• รักษาหุ่น: เวทเทรนนิ่ง + คาร์ดิโอปานกลาง (2–3 วัน/สัปดาห์); ให้ความสำคัญกับท่าที่ถูกต้องและการนอนหลับ",
    "advice_bmi_over": "• ลดไขมัน: คาร์ดิโอปานกลาง/HIIT เบาๆ 2–3 วัน + เวทเทรนนิ่งทั่วร่างกาย; กินให้น้อยกว่าที่ใช้เล็กน้อย (Calorie Deficit)",
    "advice_bmi_obese": "• ลดอย่างปลอดภัย: เดินเร็ว/คาร์ดิโอแรงกระแทกต่ำ + เวทเทรนนิ่งพื้นฐาน; คุมอัตราการเต้นหัวใจ, ค่อยๆ เพิ่มความหนัก",
    "advice_goal_lose_weight": "• เป้าหมาย: ลดน้ำหนัก → นับแคลอรี่, โปรตีน 1.6–2.2 ก./กก., นอน 7–8 ชม.",
    "advice_goal_build_muscle": "• เป้าหมาย: สร้างกล้ามเนื้อ → เพิ่มความหนักต่อเนื่อง (Progressive Overload) 3–5 วัน/สัปดาห์, โปรตีน 1.6–2.2 ก./กก., กินเกินเล็กน้อย",
    "advice_goal_maintain": "• เป้าหมาย: รักษารูปร่าง → 3 วัน/สัปดาห์, สมดุลเวท+คาร์ดิโอ, ชั่งน้ำหนักรายสัปดาห์",
    "advice_goal_recomp": "• เป้าหมาย: ปรับรูปร่าง (Recomp) → ยกเวทพื้นฐาน + โปรตีนสูง, กินน้อยกว่าใช้เล็กน้อย, นอนให้พอ",
    "advice_goal_endurance": "• เป้าหมาย: ความอึด → โซน 2 + อินเทอร์วัล; กินคาร์บก่อนฝึก",
    "advice_goal_flexibility": "• เป้าหมาย: ความยืดหยุ่น → ยืดเหยียด/เคลื่อนไหวข้อต่อ (ROM) ทุกวัน 10–20 นาที, เพิ่มเวทเบาๆ",
    "advice_injured": "• บันทึกอาการบาดเจ็บ: เน้นแรงกระแทกต่ำ, ทำในระยะที่ไม่เจ็บ; ค่อยๆ พัฒนา; ปรึกษาโค้ช/หมอเมื่อจำเป็น",
    "advice_healthnote": "• ระวังปัญหาสุขภาพที่บันทึกไว้ และปรับความหนักให้เหมาะสม",
    "start_training": "เริ่มการฝึก"
  },
  "weight": {
    "prompt_title": "อัปเดตน้ำหนัก",
    "prompt_desc": "ใส่น้ำหนักปัจจุบัน (กก.)",
    "prompt_placeholder": "เช่น 65.5",
    "later": "ไว้ทีหลัง",
    "save": "บันทึก",
    "chart_title": "ติดตามน้ำหนัก",
    "chart_empty": "ยังไม่มีข้อมูล แอปจะเตือนให้คุณบันทึกน้ำหนักเป็นระยะๆ"
  },
  "UserProfile": {
    "title": "โปรไฟล์ผู้ใช้",
    "subtitle": "กรอกข้อมูลของคุณเพื่อรับคำแนะนำการออกกำลังกายเฉพาะบุคคล",
    "name_label": "ชื่อ-นามสกุล *",
    "name_ph": "เช่น สมชาย ใจดี",
    "age_label": "อายุ",
    "age_ph": "เช่น 28",
    "gender_label": "เพศ",
    "gender_male": "ชาย",
    "gender_female": "หญิง",
    "gender_other": "อื่นๆ",
    "height_label": "ส่วนสูง (ซม.)",
    "height_ph": "เช่น 170",
    "weight_label": "น้ำหนัก (กก.)",
    "weight_ph": "เช่น 65",
    "bmi": "BMI",
    "bmi_label_under": "น้ำหนักต่ำกว่าเกณฑ์",
    "bmi_label_normal": "สมส่วน",
    "bmi_label_over": "น้ำหนักเกิน",
    "bmi_label_obese": "โรคอ้วน",
    "health_label": "สถานะสุขภาพ",
    "health_ph": "เช่น ความดันปกติ, นอนหลับดี, เพิ่งกลับมาฝึก...",
    "injured_q": "มีอาการบาดเจ็บหรือไม่?",
    "injury_label": "รายละเอียดอาการบาดเจ็บ",
    "injury_ph": "เช่น เจ็บเข่าซ้าย เลี่ยงท่านั่งยอง (Squat) ลึก; เจ็บไหล่ตอนดัน...",
    "hint_fill_hw": "กรอกส่วนสูง & น้ำหนัก เพื่อดูคำแนะนำ",
    "rec_injured": "คำแนะนำ: เน้นช่วงแกนกลาง/ลำตัวส่วนบนแบบเบาๆ และพักผ่อนให้มากขึ้น",
    "rec_overweight": "คำแนะนำ: แผนลดไขมัน (HIIT เบา → ปานกลาง) สลับกับช่วงล่าง/แกนกลาง",
    "rec_general": "คำแนะนำ: แผนทั่วร่างกาย (ความแข็งแรงพื้นฐาน + แกนกลาง)",
    "loading": "กำลังโหลด...",
    "save_success_title": "บันทึกแล้ว",
    "save_error_title": "ผิดพลาด",
    "save_error_msg": "ไม่สามารถบันทึกข้อมูลได้ โปรดลองอีกครั้ง",
    "btn_delete": "ลบ",
    "btn_save": "บันทึก"
  },
  "dashboard": {
    "title": "แดชบอร์ดความคืบหน้า",
    "streak": "สถิติต่อเนื่อง",
    "thisWeek": "สัปดาห์นี้",
    "total": "รวม",
    "completedPrograms": "เสร็จแล้ว",
    "lastWorkout": "การออกกำลังกายล่าสุด"
  },
  "recommend": {
    "title": "แนะนำสำหรับคุณ",
    "start": "เริ่มแผนนี้"
  },
  "nutrition": {
    "title": "โภชนาการ",
    "subtitle": "แอปแนะนำแคลอรี น้ำ และสัดส่วนสารอาหารตามเป้าหมายของคุณ",
    "noProfileTitle": "กรุณากรอกโปรไฟล์ก่อน",
    "noProfileText": "เพิ่มส่วนสูง น้ำหนัก และเป้าหมายเพื่อรับคำแนะนำ",
    "targets": "เป้าหมายรายวัน",
    "calories": "แคลอรี",
    "water": "น้ำ",
    "macros": "สัดส่วนมาโคร",
    "protein": "โปรตีน",
    "carbs": "คาร์บ",
    "fats": "ไขมัน",
    "sampleMeals": "เมนูตัวอย่าง",
    "tips": "คำแนะนำ",
    "screenTitle": "โภชนาการ",
    "heroStep": "3",
    "heroTitleLine1": "แผนโภชนาการ",
    "heroTitleLine2": "เฉพาะคุณ",
    "dailyGoal": "เป้าหมายรายวัน",
    "edit": "แก้ไข",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "สัดส่วนมาโคร",
    "carb": "คาร์บ",
    "fat": "ไขมัน",
    "viewAll": "ดูทั้งหมด",
    "breakfast": "มื้อเช้า",
    "lunch": "มื้อกลางวัน",
    "dinner": "มื้อเย็น",
    "snack": "ของว่าง",
    "mealPlan": "คำแนะนำมื้ออาหาร",
    "tipFallback": "ดื่มน้ำให้เพียงพอและเน้นอาหารโปรตีนสูง",
    "footer1": "ตั้งแต่วันนี้",
    "footer2": "เป็นตัวคุณที่ดีขึ้น",
    "science": "วิทยาศาสตร์",
    "effective": "มีประสิทธิภาพ",
    "sustainable": "ยั่งยืน",
    "advancedMode": "โหมดขั้นสูง",
    "pro": "PRO",
    "advancedTitle": "การวิเคราะห์โภชนาการแบบมืออาชีพ",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "การปรับค่า",
    "kcalPerDay": "kcal/วัน",
    "mealSplit": "แบ่งแคลอรีตามมื้อ",
    "hydration": "ตารางดื่มน้ำ",
    "note": "หมายเหตุสำคัญ",
    // th
customTargetKicker: 'เป้าหมายกำหนดเอง',
editDailyGoals: 'แก้ไขเป้าหมายรายวัน',
editDailyGoalsDesc:
  'เปลี่ยนเป้าหมายแคลอรีหรือน้ำ แอปจะคำนวณมาโครและคำแนะนำมื้ออาหารใหม่โดยอัตโนมัติ',
resetAuto: 'อัตโนมัติ',
// th
waterReminderKicker: 'การดื่มน้ำ',
waterReminder: 'แจ้งเตือนดื่มน้ำ',
waterReminderDesc:
  'รับการแจ้งเตือนเบา ๆ ระหว่างวันตามเป้าหมายการดื่มน้ำของคุณ',
waterReminderOn: 'เปิด',
waterReminderOff: 'ปิด',
waterTarget: 'เป้าหมายน้ำ',
reminderTime: 'เวลาแจ้งเตือน',
reminderInterval: 'ช่วงเวลาแจ้งเตือน',
waterReminderTitle: 'ถึงเวลาดื่มน้ำแล้ว',
waterReminderBody: 'ดื่มน้ำประมาณ {{amount}}ml เพื่อให้ร่างกายไม่ขาดน้ำ',
  },
  "premium": {
    "title": "อัปเกรดเป็นพรีเมียม",
    "removeAds": "ลบโฆษณา",
    "allPrograms": "ปลดล็อกประสบการณ์ทั้งหมด",
    "active": "พรีเมียมเปิดใช้งานแล้ว",
    "restore": "กู้คืนการซื้อ",
    "restoreTitle": "กู้คืนการซื้อ",
    "restoreSuccess": "กู้คืนพรีเมียมสำเร็จแล้ว",
    "restoreEmpty": "ไม่พบการซื้อพรีเมียม",
    "errorTitle": "การซื้อไม่สำเร็จ",
    "errorText": "ไม่สามารถดำเนินการซื้อให้เสร็จสิ้นได้",
    "productUnavailable": "ไม่พบสินค้า Premium กรุณาตรวจสอบการตั้งค่า Play Console / App Store",
    "subUnavailable": "ไม่พบแพ็กเกจสมัครสมาชิกรายเดือน กรุณาตรวจสอบการตั้งค่า Play Console / App Store",
    "loading": "กำลังโหลด...",
    "monthlyTitle": "พรีเมียมรายเดือน",
    "monthlyDesc": "ต่ออายุอัตโนมัติทุกเดือนเพื่อคงสถานะพรีเมียม",
    "subscribeMonthly": "สมัครรายเดือน",
    "lifetimeTitle": "พรีเมียมตลอดชีพ",
    "lifetimeDesc": "จ่ายครั้งเดียว ใช้งานพรีเมียมได้ตลอดไป",
    "buyLifetime": "ซื้อตลอดชีพ"
  },
  "filters": {
    "all": "ทั้งหมด",
    "levelTitle": "ระดับ",
    "level": {
      "beginner": "ผู้เริ่มต้น",
      "intermediate": "ปานกลาง",
      "advanced": "ขั้นสูง"
    },
    "goalTitle": "เป้าหมาย",
    "goal": {
      "lose_weight": "ลดน้ำหนัก",
      "build_muscle": "สร้างกล้ามเนื้อ",
      "cardio": "คาร์ดิโอ",
      "core": "แกนกลางลำตัว",
      "mobility": "ความยืดหยุ่น"
    },
    "equipmentTitle": "อุปกรณ์",
    "equipment": {
      "no_equipment": "ไม่ใช้อุปกรณ์",
      "with_equipment": "ใช้อุปกรณ์"
    },
    "durationTitle": "ระยะเวลา",
    "duration": {
      "short": "สั้น",
      "medium": "ปานกลาง",
      "long": "ยาว"
    },
    "noResultsTitle": "ไม่พบโปรแกรมที่ตรงกัน",
    "noResultsText": "ลองเปลี่ยนตัวกรองอย่างน้อยหนึ่งรายการ"
  },
  "beginner": {
    "modeTitle": "โหมดผู้เริ่มต้น",
    "modeDesc": "คำอธิบายง่าย ๆ และคำแนะนำแบบรวดเร็วสำหรับผู้ใช้ใหม่",
    "glossaryTitle": "คู่มือสำหรับผู้เริ่มต้น",
    "terms": {
      "restDay": {
        "title": "วันพัก",
        "desc": "เป็นวันฟื้นฟู ร่างกายของคุณจะได้พักและซ่อมแซมตัวเอง ดังนั้นอย่าข้ามวันพัก"
      },
      "warmUp": {
        "title": "วอร์มอัป",
        "desc": "การเคลื่อนไหวเบา ๆ ก่อนออกกำลังกาย เพื่อเตรียมร่างกายและลดความเสี่ยงการบาดเจ็บ"
      },
      "cooldown": {
        "title": "คูลดาวน์",
        "desc": "การเคลื่อนไหวเบา ๆ หรือการยืดเหยียดหลังออกกำลังกาย เพื่อช่วยให้ร่างกายฟื้นตัว"
      },
      "hiit": {
        "title": "HIIT",
        "desc": "การออกกำลังกายแบบเข้มข้นเป็นช่วง ๆ: ช่วงสั้น ๆ ที่ออกแรงหนักสลับกับการพักสั้น ๆ"
      },
      "rep": {
        "title": "ครั้ง",
        "desc": "การทำท่าออกกำลังกายครบหนึ่งครั้ง ตัวอย่าง: สควอต 1 ครั้ง = 1 rep"
      },
      "set": {
        "title": "เซต",
        "desc": "กลุ่มของจำนวนครั้ง ตัวอย่าง: สควอต 10 ครั้งต่อเนื่อง = 1 เซต"
      }
    }
  },
  "todayWorkout": {
    "title": "การออกกำลังกายวันนี้",
    "fallback": "การออกกำลังกาย",
    "startNow": "เริ่มเลย",
    "restTitle": "วันนี้เป็นวันฟื้นฟูร่างกาย",
    "restText": "พักสักหน่อย ยืดเหยียดเบา ๆ ดื่มน้ำ และเตรียมพร้อมสำหรับการออกกำลังกายครั้งถัดไป"
  },
  "common": {
    "on": "เปิด",
    "off": "ปิด",
    "cancel": "ยกเลิก",
    "edit": "แก้ไข",
    "viewAll": "ดูทั้งหมด"
  },
  "history": {
    "title": "ประวัติการออกกำลังกาย",
    "screenTitle": "ประวัติการออกกำลังกาย",
    "thisWeek": "สัปดาห์นี้",
    "minutes": "นาที",
    "totalWorkouts": "การออกกำลังกาย",
    "empty": "ยังไม่มีการออกกำลังกายที่เสร็จสิ้น",
    "viewAll": "ดูทั้งหมด",
    "filter7": "7 วัน",
    "filter30": "30 วัน",
    "filterAll": "ทั้งหมด"
  },
  "achievements": {
    "title": "ความสำเร็จ",
    "firstWorkout": "การออกกำลังกายครั้งแรก",
    "tenWorkouts": "ออกกำลังกาย 10 ครั้ง",
    "twentyfiveWorkouts": "ออกกำลังกาย 25 ครั้ง",
    "streak3": "ต่อเนื่อง 3 วัน",
    "streak7": "ต่อเนื่อง 7 วัน",
    "week4": "ออกกำลังกาย 4 ครั้งในสัปดาห์นี้",
    "finishProgram": "จบ 1 โปรแกรม"
  },
  "challenges": {
    "title": "ชาเลนจ์",
    "intro": "เริ่มชาเลนจ์สั้น ๆ เพื่อรักษาความสม่ำเสมอ",
    "start7": "เริ่มชาเลนจ์ 7 วัน",
    "start30": "เริ่มชาเลนจ์ 30 วัน",
    "complete": "ทำชาเลนจ์สำเร็จแล้ว",
    "daysLeft": "เหลืออีก {{count}} วัน",
    "starter7Title": "ชาเลนจ์เริ่มต้น 7 วัน",
    "starter7Desc": "ออกกำลังกายให้ครบ 5 ครั้งใน 7 วัน",
    "consistency30Title": "ชาเลนจ์ความสม่ำเสมอ 30 วัน",
    "consistency30Desc": "ออกกำลังกายให้ครบ 20 ครั้งใน 30 วัน"
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "แผน {{goalLabel}}: {{calories}} kcal/วัน, โปรตีน {{proteinG}}g, คาร์บ {{carbsG}}g, ไขมัน {{fatsG}}g. ประมาณ BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "ลดไขมัน",
      "build_muscle": "เพิ่มกล้ามเนื้อ",
      "maintain": "คงสภาพ",
      "recomp": "ปรับองค์ประกอบร่างกาย",
      "endurance": "ความทนทาน",
      "flexibility": "สุขภาพโดยรวม"
    },
    "activity": {
      "sedentary": "นั่งเป็นส่วนใหญ่",
      "light": "กิจกรรมเบา",
      "moderate": "กิจกรรมปานกลาง",
      "active": "ค่อนข้างแอคทีฟ",
      "very_active": "แอคทีฟมาก"
    },
    "bmi": {
      "under": "น้ำหนักน้อย",
      "normal": "ปกติ",
      "over": "น้ำหนักเกิน",
      "obese": "อ้วน"
    },
    "hydration": {
      "morning": "เช้า: 500ml หลังตื่นนอน",
      "beforeWorkout": "ก่อนออกกำลังกาย: 300–500ml",
      "duringWorkout": "ระหว่างออกกำลังกาย: จิบน้ำทุก 10–15 นาที",
      "evening": "เย็น: ดื่มน้ำส่วนที่เหลือให้ครบเป้าหมาย"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  },
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "พัฒนาโดย {{name}}"
  }
};

const id = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Beranda",
    "nutrition": "Nutrisi",
    "guide": "Panduan",
    "premium": "Premium",
    "settings": "Pengaturan",
    "workout": "Latihan",
    "more": "Lainnya",
    "program": "Program",
    "profile": "Profil",
    "weightChart": "Grafik Berat"
  },
  "home": {
    "title": "Pilih rencana latihanmu",
    "subtitle": "Pilih program dan berlatih setiap hari",
    "program60": "Bakar Lemak 60 Hari",
    "program90": "Latihan Seluruh Tubuh 90 Hari",
    "daysSuffix": "{{count}} hari",
    "health_overview": "Ringkasan Kesehatan",
    "activeTitle": "Sedang Berjalan",
    "noActive": "Tidak ada program yang sedang berjalan."
  },
  "program": {
    "daysPrefix": "Hari {{day}} • {{weekday}}",
    "weekTitle": "Minggu {{n}}",
    "completed": "Selesai",
    "todayWorkout": "Latihan: {{name}}"
  },
  "workouts": {
    "rest": "Pemulihan / Istirahat",
    "hiit": "HIIT Seluruh Tubuh",
    "upper": "Dada - Bahu - Lengan",
    "lower": "Glute - Kaki",
    "core": "Perut & Core",
    "pickOne": "Pilih rencana latihan untuk memulai",
    "days": "Hari",
    "day": "Hari",
    "heroTitle": "Rencana latihan harianmu",
    "matchingResults": "Hasil yang cocok"
  },
  "guide": {
    "title": "Cara Menggunakan PulseFit",
    "subtitle": "Ikuti langkah-langkah sederhana ini untuk memulai perjalanan latihan Anda.",
    "steps": {
      "step1": {
        "badge": "Langkah 1",
        "title": "Masukkan informasi pribadi Anda",
        "desc": "Isi tinggi badan, berat badan, kondisi kesehatan, tujuan, dan informasi dasar lainnya. Aplikasi akan menghitung BMI Anda dan memberikan saran kesehatan agar Anda bisa memulai dengan aman."
      },
      "step2": {
        "badge": "Langkah 2",
        "title": "Pilih program latihan yang sesuai",
        "desc": "Telusuri program latihan yang tersedia dan pilih yang paling sesuai dengan tingkat kebugaran, tujuan, dan preferensi Anda."
      },
      "step3": {
        "badge": "Langkah 3",
        "title": "Pilih hari latihan",
        "desc": "Buka program yang dipilih dan pilih hari latihan yang ingin Anda ikuti. Anda dapat melanjutkan langkah demi langkah sesuai jadwal latihan."
      },
      "step4": {
        "badge": "Langkah 4",
        "title": "Berlatih dengan video",
        "desc": "Ikuti video latihan agar berolahraga dengan benar. Anda dapat memutar ponsel secara horizontal untuk menonton video dalam layar penuh agar pengalaman lebih baik."
      }
    },
    "noteTitle": "Catatan",
    "note": "Berlatihlah secara konsisten untuk mendapatkan hasil terbaik."
  },
  "premium": {
    "title": "Upgrade ke Premium",
    "removeAds": "Hapus iklan",
    "allPrograms": "Buka pengalaman penuh",
    "active": "Premium aktif",
    "restore": "Pulihkan pembelian",
    "restoreTitle": "Pulihkan pembelian",
    "restoreSuccess": "Premium berhasil dipulihkan.",
    "restoreEmpty": "Tidak ada pembelian Premium yang ditemukan.",
    "errorTitle": "Pembelian gagal",
    "errorText": "Tidak dapat menyelesaikan pembelian.",
    "productUnavailable": "Produk Premium tidak ditemukan. Silakan periksa pengaturan Play Console / App Store.",
    "subUnavailable": "Langganan bulanan tidak ditemukan. Silakan periksa pengaturan Play Console / App Store.",
    "loading": "Memuat...",
    "monthlyTitle": "Premium Bulanan",
    "monthlyDesc": "Diperpanjang otomatis setiap bulan agar Premium tetap aktif",
    "subscribeMonthly": "Berlangganan bulanan",
    "lifetimeTitle": "Premium Seumur Hidup",
    "lifetimeDesc": "Bayar sekali, nikmati Premium selamanya",
    "buyLifetime": "Beli seumur hidup"
  },
  "video": {
    "loading": "Memuat video...",
    "play": "Mulai latihan",
    "error": "Tidak dapat memutar video. Silakan coba lagi."
  },
// id
settings: {
  title: 'Pengaturan',
  language: 'Bahasa',
  choose: 'Pilih bahasa',
  chooseLanguage: 'Pilih bahasa aplikasi',
  general: 'Umum',
  dailyReminder: 'Pengingat harian',
  tapToToggleReminder: 'Ketuk untuk mengganti pengingat 20:00/07:00',
  accountAndTraining: 'Akun & Latihan',
  // id
workoutReminderKicker: 'PENGINGAT LATIHAN',
chooseWorkoutReminderTime: 'Pilih waktu pengingat',
workoutReminderDesc:
  'Pilih waktu yang kamu inginkan agar aplikasi mengingatkan latihan setiap hari.',
hour: 'Jam',
minute: 'Menit',
saveReminder: 'Simpan',
disableReminder: 'Nonaktifkan',
reminderOffText: 'Nonaktif • ketuk untuk memilih waktu',
dailyReminderTitle: 'Saatnya latihan! 💪',
dailyReminderBody:
  'Buka Insanity Deluxe Edition dan selesaikan sesi hari ini.',
},
  "onboard": {
    "title": "Mari kita mulai 👋",
    "subtitle": "Masukkan beberapa detail agar kami dapat menyarankan rencana yang sesuai",
    "name": "Nama lengkap *",
    "age": "Usia *",
    "gender": "Jenis kelamin *",
    "gender_male": "Laki-laki",
    "gender_female": "Perempuan",
    "gender_other": "Lainnya",
    "health": "Kondisi kesehatan",
    "height": "Tinggi badan (cm) *",
    "weight": "Berat badan (kg) *",
    "injured_q": "Apakah ada cedera?",
    "injury_note": "Deskripsi cedera",
    "goal": "Tujuan saat ini *",
    "goals": {
      "lose_weight": "Menurunkan berat badan",
      "build_muscle": "Membangun otot",
      "maintain": "Menjaga berat badan",
      "recomp": "Rekomp (bakar lemak + bangun otot)",
      "endurance": "Ketahanan (Endurance)",
      "flexibility": "Fleksibilitas"
    },
    "tip_title": "Tips singkat",
    "tip_1": "Jika cedera, mulailah dengan latihan berdampak rendah (low-impact) dan tingkatkan secara bertahap.",
    "tip_2": "Perbarui berat badan Anda setiap 3 hari untuk memantau kemajuan.",
    "back": "Kembali",
    "next": "Lanjut",
    "finish": "Selesai",
    "saving": "Menyimpan...",
    "bmi": "IMT",
    "bmi_result_title": "Ringkasan kesehatan",
    "bmi_label_under": "Kurus (Berat badan kurang)",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Gemuk (Kelebihan berat)",
    "bmi_label_obese": "Obesitas",
    "advice_intro": "• IMT Anda: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Fokus pada massa otot tanpa lemak: latihan seluruh tubuh/upper-lower dengan intensitas sedang; tingkatkan beban; protein dan kalori yang cukup.",
    "advice_bmi_normal": "• Menjaga: kombinasi kekuatan + kardio sedang (2–3 hari/minggu); prioritaskan teknik dan tidur.",
    "advice_bmi_over": "• Membakar lemak: kardio sedang/HIIT ringan 2–3 hari + kekuatan seluruh tubuh; sedikit defisit kalori.",
    "advice_bmi_obese": "• Penurunan lemak yang aman: jalan cepat/kardio dampak rendah + kekuatan dasar; pantau detak jantung, tingkatkan intensitas secara bertahap.",
    "advice_goal_lose_weight": "• Tujuan: Menurunkan berat badan → pantau kalori, protein 1.6–2.2g/kg, tidur 7–8 jam.",
    "advice_goal_build_muscle": "• Tujuan: Membangun otot → kelebihan beban bertahap 3–5 hari/minggu, protein 1.6–2.2g/kg, sedikit surplus kalori.",
    "advice_goal_maintain": "• Tujuan: Menjaga → 3 hari/minggu, keseimbangan kekuatan + kardio, timbang berat badan mingguan.",
    "advice_goal_recomp": "• Tujuan: Rekomp → angkat beban dasar + protein tinggi, sedikit defisit, tidur yang cukup.",
    "advice_goal_endurance": "• Tujuan: Ketahanan → zona 2 + interval; isi tenaga dengan karbohidrat sebelum latihan.",
    "advice_goal_flexibility": "• Tujuan: Fleksibilitas → mobilitas harian/ROM 10–20 menit, tambahkan latihan kekuatan ringan.",
    "advice_injured": "• Catatan cedera: dampak rendah, rentang gerak tanpa nyeri; progres secara bertahap; konsultasikan dengan pelatih/dokter jika perlu.",
    "advice_healthnote": "• Pantau kondisi kesehatan yang dicatat dan sesuaikan intensitasnya.",
    "start_training": "Mulai latihan"
  },
  "weight": {
    "prompt_title": "Perbarui berat badan",
    "prompt_desc": "Masukkan berat badan saat ini (kg)",
    "prompt_placeholder": "misalnya 65.5",
    "later": "Nanti",
    "save": "Simpan",
    "chart_title": "Pelacakan berat badan",
    "chart_empty": "Belum ada data. Aplikasi akan secara berkala mengingatkan Anda untuk mencatat berat badan."
  },
  "UserProfile": {
    "title": "Profil Pengguna",
    "subtitle": "Masukkan info Anda untuk mendapatkan rekomendasi latihan pribadi",
    "name_label": "Nama lengkap *",
    "name_ph": "misalnya Budi Santoso",
    "age_label": "Usia",
    "age_ph": "misalnya 28",
    "gender_label": "Jenis kelamin",
    "gender_male": "Laki-laki",
    "gender_female": "Perempuan",
    "gender_other": "Lainnya",
    "height_label": "Tinggi badan (cm)",
    "height_ph": "misalnya 170",
    "weight_label": "Berat badan (kg)",
    "weight_ph": "misalnya 65",
    "bmi": "IMT",
    "bmi_label_under": "Kurus",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Gemuk",
    "bmi_label_obese": "Obesitas",
    "health_label": "Status kesehatan",
    "health_ph": "misalnya Tekanan darah stabil, tidur nyenyak, kembali berlatih...",
    "injured_q": "Ada cedera?",
    "injury_label": "Detail cedera",
    "injury_ph": "misalnya Nyeri lutut kiri, batasi squat dalam; nyeri bahu saat press...",
    "hint_fill_hw": "Masukkan tinggi & berat badan untuk saran.",
    "rec_injured": "Rekomendasi: prioritaskan sesi Core/Upper ringan dengan lebih banyak hari istirahat.",
    "rec_overweight": "Rekomendasi: Rencana bakar lemak (HIIT ringan → sedang) bergantian dengan Lower/Core.",
    "rec_general": "Rekomendasi: Rencana seluruh tubuh (kekuatan dasar + Core).",
    "loading": "Memuat...",
    "save_success_title": "Tersimpan",
    "save_error_title": "Kesalahan",
    "save_error_msg": "Tidak dapat menyimpan data Anda. Silakan coba lagi.",
    "btn_delete": "Hapus",
    "btn_save": "Simpan"
  },
  "dashboard": {
    "title": "Dasbor progres",
    "streak": "Streak",
    "thisWeek": "Minggu ini",
    "total": "Total",
    "completedPrograms": "Selesai",
    "lastWorkout": "Latihan terakhir"
  },
  "recommend": {
    "title": "Rekomendasi untuk Anda",
    "start": "Mulai rencana ini"
  },
  "nutrition": {
    "title": "Nutrisi",
    "subtitle": "Aplikasi menyarankan kalori, air, dan rasio nutrisi sesuai tujuanmu.",
    "noProfileTitle": "Lengkapi profil dulu",
    "noProfileText": "Tambahkan tinggi, berat, dan tujuan untuk mendapatkan rekomendasi.",
    "targets": "Target harian",
    "calories": "Kalori",
    "water": "Air",
    "macros": "Rasio makro",
    "protein": "Protein",
    "carbs": "Karbo",
    "fats": "Lemak",
    "sampleMeals": "Contoh menu",
    "tips": "Saran",
    "screenTitle": "Nutrisi",
    "heroStep": "3",
    "heroTitleLine1": "Rencana nutrisi",
    "heroTitleLine2": "personal",
    "dailyGoal": "Target harian",
    "edit": "Edit",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Rasio makro",
    "carb": "Karbo",
    "fat": "Lemak",
    "viewAll": "Lihat semua",
    "breakfast": "Sarapan",
    "lunch": "Makan siang",
    "dinner": "Makan malam",
    "snack": "Camilan",
    "mealPlan": "Saran makanan",
    "tipFallback": "Minum cukup air dan pilih makanan tinggi protein untuk pemulihan otot.",
    "footer1": "Mulai hari ini,",
    "footer2": "versi terbaik dirimu",
    "science": "Ilmiah",
    "effective": "Efektif",
    "sustainable": "Berkelanjutan",
    "advancedMode": "MODE LANJUTAN",
    "pro": "PRO",
    "advancedTitle": "Analisis nutrisi profesional",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Penyesuaian",
    "kcalPerDay": "kcal/hari",
    "mealSplit": "Pembagian kalori per makan",
    "hydration": "Jadwal hidrasi",
    "note": "Catatan penting",
    // id
customTargetKicker: 'TARGET KHUSUS',
editDailyGoals: 'Edit target harian',
editDailyGoalsDesc:
  'Ubah target kalori atau air. Aplikasi akan menghitung ulang makro dan saran makanan secara otomatis.',
resetAuto: 'Otomatis',
// id
waterReminderKicker: 'HIDRASI',
waterReminder: 'Pengingat minum air',
waterReminderDesc:
  'Dapatkan pengingat ringan sepanjang hari berdasarkan target air minummu.',
waterReminderOn: 'Aktif',
waterReminderOff: 'Nonaktif',
waterTarget: 'Target air',
reminderTime: 'Waktu pengingat',
reminderInterval: 'Interval',
waterReminderTitle: 'Saatnya minum air',
waterReminderBody: 'Minum sekitar {{amount}}ml air agar tetap terhidrasi.',
  },
  "beginner": {
    "modeTitle": "Mode pemula",
    "modeDesc": "Penjelasan sederhana dan panduan cepat untuk pengguna baru.",
    "glossaryTitle": "Panduan pemula",
    "terms": {
      "restDay": {
        "title": "Hari istirahat",
        "desc": "Ini adalah hari pemulihan. Tubuh Anda beristirahat dan membangun kembali dirinya, jadi jangan dilewatkan."
      },
      "warmUp": {
        "title": "Pemanasan",
        "desc": "Gerakan ringan sebelum latihan untuk mempersiapkan tubuh dan mengurangi risiko cedera."
      },
      "cooldown": {
        "title": "Pendinginan",
        "desc": "Gerakan ringan atau peregangan setelah latihan untuk membantu tubuh pulih."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "Latihan interval intensitas tinggi: ledakan kerja keras singkat diikuti dengan istirahat singkat."
      },
      "rep": {
        "title": "Repetisi",
        "desc": "Satu gerakan lengkap dari sebuah latihan. Contoh: satu squat = satu repetisi."
      },
      "set": {
        "title": "Set",
        "desc": "Sekelompok repetisi. Contoh: 10 squat yang dilakukan bersama = 1 set."
      }
    }
  },
  "todayWorkout": {
    "title": "Latihan hari ini",
    "fallback": "Latihan",
    "startNow": "Mulai sekarang",
    "restTitle": "Hari ini adalah hari pemulihan",
    "restText": "Beristirahatlah, lakukan peregangan ringan, minum air, dan bersiaplah untuk latihan berikutnya."
  },
  "common": {
    "on": "AKTIF",
    "off": "NONAKTIF",
    "cancel": "Batal",
    "edit": "Edit",
    "viewAll": "Lihat semua"
  },
  "history": {
    "title": "Riwayat latihan",
    "screenTitle": "Riwayat latihan",
    "thisWeek": "Minggu ini",
    "minutes": "Menit",
    "totalWorkouts": "Latihan",
    "empty": "Belum ada latihan yang selesai.",
    "viewAll": "Lihat semua",
    "filter7": "7 hari",
    "filter30": "30 hari",
    "filterAll": "Semua"
  },
  "achievements": {
    "title": "Pencapaian",
    "firstWorkout": "Latihan pertama",
    "tenWorkouts": "10 latihan",
    "twentyfiveWorkouts": "25 latihan",
    "streak3": "Streak 3 hari",
    "streak7": "Streak 7 hari",
    "week4": "4 latihan minggu ini",
    "finishProgram": "Selesaikan 1 program"
  },
  "challenges": {
    "title": "Tantangan",
    "intro": "Mulai tantangan singkat agar tetap konsisten.",
    "start7": "Mulai tantangan 7 hari",
    "start30": "Mulai tantangan 30 hari",
    "complete": "Tantangan selesai",
    "daysLeft": "{{count}} hari tersisa",
    "starter7Title": "Tantangan pemula 7 hari",
    "starter7Desc": "Selesaikan 5 latihan dalam 7 hari.",
    "consistency30Title": "Tantangan konsistensi 30 hari",
    "consistency30Desc": "Selesaikan 20 latihan dalam 30 hari."
  },
  "filters": {
    "all": "Semua",
    "levelTitle": "Level",
    "level": {
      "beginner": "Pemula",
      "intermediate": "Menengah",
      "advanced": "Lanjutan"
    },
    "goalTitle": "Fokus",
    "goal": {
      "lose_weight": "Menurunkan berat badan",
      "build_muscle": "Membangun otot",
      "cardio": "Kardio",
      "core": "Core",
      "mobility": "Mobilitas"
    },
    "equipmentTitle": "Peralatan",
    "equipment": {
      "no_equipment": "Tanpa peralatan",
      "with_equipment": "Dengan peralatan"
    },
    "durationTitle": "Durasi",
    "duration": {
      "short": "Pendek",
      "medium": "Sedang",
      "long": "Panjang"
    },
    "noResultsTitle": "Tidak ada program yang cocok",
    "noResultsText": "Coba ubah satu atau lebih filter."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "Rencana {{goalLabel}}: {{calories}} kcal/hari, {{proteinG}}g protein, {{carbsG}}g karbo, {{fatsG}}g lemak. Estimasi BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Turun lemak",
      "build_muscle": "Bangun otot",
      "maintain": "Menjaga",
      "recomp": "Rekomposisi tubuh",
      "endurance": "Daya tahan",
      "flexibility": "Kesehatan umum"
    },
    "activity": {
      "sedentary": "Sedentari",
      "light": "Aktivitas ringan",
      "moderate": "Aktivitas sedang",
      "active": "Aktif",
      "very_active": "Sangat aktif"
    },
    "bmi": {
      "under": "Berat kurang",
      "normal": "Normal",
      "over": "Berat berlebih",
      "obese": "Obesitas"
    },
    "hydration": {
      "morning": "Pagi: 500ml setelah bangun",
      "beforeWorkout": "Sebelum latihan: 300–500ml",
      "duringWorkout": "Saat latihan: teguk kecil tiap 10–15 menit",
      "evening": "Malam: selesaikan target air tersisa"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const ms = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Utama",
    "nutrition": "Nutrisi",
    "guide": "Panduan",
    "premium": "Premium",
    "settings": "Tetapan",
    "workout": "Senaman",
    "more": "Lagi",
    "program": "Program",
    "profile": "Profil",
    "weightChart": "Carta Berat"
  },
  "home": {
    "title": "Pilih pelan senaman anda",
    "subtitle": "Pilih program dan berlatih setiap hari",
    "program60": "Bakar Lemak 60 Hari",
    "program90": "Seluruh Badan 90 Hari",
    "daysSuffix": "{{count}} hari",
    "health_overview": "Ringkasan Kesihatan",
    "activeTitle": "Sedang Berjalan",
    "noActive": "Tiada program yang sedang berjalan."
  },
  "program": {
    "daysPrefix": "Hari {{day}} • {{weekday}}",
    "weekTitle": "Minggu {{n}}",
    "completed": "Selesai",
    "todayWorkout": "Senaman: {{name}}"
  },
  "workouts": {
    "rest": "Pemulihan / Rehat",
    "hiit": "HIIT Seluruh Badan",
    "upper": "Dada - Bahu - Lengan",
    "lower": "Punggung - Kaki",
    "core": "Perut & Teras",
    "pickOne": "Pilih pelan senaman untuk bermula",
    "days": "days",
    "day": "days",
    "heroTitle": "Pelan senaman harian anda",
    "matchingResults": "Keputusan sepadan"
  },
  "guide": {
    "title": "Cara Menggunakan PulseFit",
    "subtitle": "Ikuti langkah mudah ini untuk memulakan perjalanan senaman anda.",
    "steps": {
      "step1": {
        "badge": "Langkah 1",
        "title": "Masukkan maklumat peribadi anda",
        "desc": "Isi tinggi, berat, keadaan kesihatan, matlamat dan maklumat asas lain. Aplikasi akan mengira BMI anda dan memberi nasihat kesihatan untuk membantu anda bermula dengan selamat."
      },
      "step2": {
        "badge": "Langkah 2",
        "title": "Pilih program senaman yang sesuai",
        "desc": "Lihat program senaman yang tersedia dan pilih yang paling sesuai dengan tahap kecergasan, matlamat dan pilihan anda."
      },
      "step3": {
        "badge": "Langkah 3",
        "title": "Pilih hari senaman",
        "desc": "Buka program yang dipilih dan pilih hari senaman yang ingin anda ikuti. Anda boleh meneruskan langkah demi langkah mengikut jadual latihan."
      },
      "step4": {
        "badge": "Langkah 4",
        "title": "Bersenam mengikut video",
        "desc": "Ikuti video senaman untuk melakukan latihan dengan betul. Anda boleh memusingkan telefon secara melintang untuk menonton video dalam skrin penuh bagi pengalaman yang lebih baik."
      }
    },
    "noteTitle": "Nota",
    "note": "Kekalkan latihan secara konsisten untuk mendapatkan hasil yang terbaik."
  },
  "premium": {
    "title": "Naik taraf ke Premium",
    "removeAds": "Buang iklan",
    "allPrograms": "Buka pengalaman penuh",
    "active": "Premium aktif",
    "restore": "Pulihkan pembelian",
    "restoreTitle": "Pulihkan pembelian",
    "restoreSuccess": "Premium berjaya dipulihkan.",
    "restoreEmpty": "Tiada pembelian Premium ditemui.",
    "errorTitle": "Pembelian gagal",
    "errorText": "Tidak dapat melengkapkan pembelian.",
    "productUnavailable": "Produk Premium tidak ditemui. Sila semak tetapan Play Console / App Store.",
    "subUnavailable": "Langganan bulanan tidak ditemui. Sila semak tetapan Play Console / App Store.",
    "loading": "Memuatkan...",
    "monthlyTitle": "Premium Bulanan",
    "monthlyDesc": "Diperbaharui secara automatik setiap bulan untuk mengekalkan Premium aktif",
    "subscribeMonthly": "Langgan bulanan",
    "lifetimeTitle": "Premium Sepanjang Hayat",
    "lifetimeDesc": "Bayar sekali, nikmati Premium selamanya",
    "buyLifetime": "Beli sepanjang hayat"
  },
  "video": {
    "loading": "Memuatkan video...",
    "play": "Mula senaman",
    "error": "Tidak dapat memainkan video. Sila cuba lagi."
  },
// ms
settings: {
  title: 'Tetapan',
  language: 'Bahasa',
  choose: 'Pilih bahasa',
  chooseLanguage: 'Pilih bahasa aplikasi',
  general: 'Umum',
  dailyReminder: 'Peringatan harian',
  tapToToggleReminder: 'Ketik untuk tukar peringatan 20:00/07:00',
  accountAndTraining: 'Akaun & Latihan',
  // ms
workoutReminderKicker: 'PERINGATAN LATIHAN',
chooseWorkoutReminderTime: 'Pilih masa peringatan',
workoutReminderDesc:
  'Pilih masa yang anda mahu aplikasi ingatkan untuk bersenam setiap hari.',
hour: 'Jam',
minute: 'Minit',
saveReminder: 'Simpan',
disableReminder: 'Matikan',
reminderOffText: 'Mati • ketik untuk pilih masa',
dailyReminderTitle: 'Masa untuk bersenam! 💪',
dailyReminderBody:
  'Buka Insanity Deluxe Edition dan lengkapkan sesi hari ini.',
},
  "onboard": {
    "title": "Mari bermula 👋",
    "subtitle": "Masukkan butiran anda supaya kami dapat mencadangkan pelan yang sesuai",
    "name": "Nama penuh *",
    "age": "Umur *",
    "gender": "Jantina *",
    "gender_male": "Lelaki",
    "gender_female": "Perempuan",
    "gender_other": "Lain-lain",
    "health": "Tahap kesihatan",
    "height": "Tinggi (cm) *",
    "weight": "Berat (kg) *",
    "injured_q": "Ada kecederaan?",
    "injury_note": "Butiran kecederaan",
    "goal": "Matlamat sekarang *",
    "goals": {
      "lose_weight": "Turunkan berat badan",
      "build_muscle": "Bina otot",
      "maintain": "Kekalkan berat badan",
      "recomp": "Rekomp (bakar lemak + bina otot)",
      "endurance": "Ketahanan (Endurance)",
      "flexibility": "Kelenturan"
    },
    "tip_title": "Tip pantas",
    "tip_1": "Jika cedera, mulakan dengan senaman impak rendah dan tingkatkan secara beransur-ansur.",
    "tip_2": "Kemas kini berat badan anda setiap 3 hari untuk memantau kemajuan.",
    "back": "Kembali",
    "next": "Seterusnya",
    "finish": "Selesai",
    "saving": "Menyimpan...",
    "bmi": "BMI",
    "bmi_result_title": "Ringkasan kesihatan",
    "bmi_label_under": "Kurang berat badan",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Berlebihan berat badan",
    "bmi_label_obese": "Obesiti",
    "advice_intro": "• BMI anda: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Fokus bina jisim otot: senaman seluruh badan/atas-bawah dengan intensiti sederhana; tambah beban; protein dan kalori mencukupi.",
    "advice_bmi_normal": "• Kekalkan: gabungan kekuatan + kardio sederhana (2–3 hari/minggu); utamakan teknik dan tidur.",
    "advice_bmi_over": "• Bakar lemak: kardio sederhana/HIIT ringan 2–3 hari + kekuatan seluruh badan; sedikit defisit kalori.",
    "advice_bmi_obese": "• Penurunan lemak selamat: jalan laju/kardio impak rendah + kekuatan asas; pantau kadar jantung, tingkatkan intensiti perlahan-lahan.",
    "advice_goal_lose_weight": "• Matlamat: Turun berat badan → pantau kalori, 1.6–2.2g/kg protein, tidur 7–8 jam.",
    "advice_goal_build_muscle": "• Matlamat: Bina otot → lebihan beban progresif 3–5 hari/minggu, 1.6–2.2g/kg protein, sedikit lebihan kalori.",
    "advice_goal_maintain": "• Matlamat: Kekalkan → 3 hari/minggu, keseimbangan kekuatan + kardio, timbang berat setiap minggu.",
    "advice_goal_recomp": "• Matlamat: Rekomp → latihan bebanan asas + protein tinggi, sedikit defisit, tidur yang cukup.",
    "advice_goal_endurance": "• Matlamat: Ketahanan → zon 2 + selang masa (intervals); ambil karbohidrat sebelum senaman.",
    "advice_goal_flexibility": "• Matlamat: Kelenturan → mobiliti harian/ROM 10–20 minit, tambah latihan kekuatan ringan.",
    "advice_injured": "• Nota kecederaan: impak rendah, julat pergerakan tanpa sakit; kemajuan beransur-ansur; rujuk jurulatih/doktor jika perlu.",
    "advice_healthnote": "• Pantau tahap kesihatan yang dicatatkan dan selaraskan intensiti senaman.",
    "start_training": "Mula latihan"
  },
  "weight": {
    "prompt_title": "Kemas kini berat",
    "prompt_desc": "Masukkan berat badan sekarang (kg)",
    "prompt_placeholder": "cth. 65.5",
    "later": "Nanti",
    "save": "Simpan",
    "chart_title": "Laporan berat badan",
    "chart_empty": "Tiada data lagi. Aplikasi akan mengingatkan anda untuk merekodkan berat badan secara berkala."
  },
  "UserProfile": {
    "title": "Profil Pengguna",
    "subtitle": "Masukkan maklumat anda untuk cadangan senaman yang diperibadikan",
    "name_label": "Nama penuh *",
    "name_ph": "cth. Ahmad Ali",
    "age_label": "Umur",
    "age_ph": "cth. 28",
    "gender_label": "Jantina",
    "gender_male": "Lelaki",
    "gender_female": "Perempuan",
    "gender_other": "Lain-lain",
    "height_label": "Tinggi (cm)",
    "height_ph": "cth. 170",
    "weight_label": "Berat (kg)",
    "weight_ph": "cth. 65",
    "bmi": "BMI",
    "bmi_label_under": "Kurang berat",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Lebih berat",
    "bmi_label_obese": "Obesiti",
    "health_label": "Status kesihatan",
    "health_ph": "cth. Tekanan darah stabil, tidur nyenyak, kembali berlatih...",
    "injured_q": "Ada kecederaan?",
    "injury_label": "Butiran kecederaan",
    "injury_ph": "cth. Sakit lutut kiri, hadkan squat dalam; sakit bahu...",
    "hint_fill_hw": "Masukkan tinggi & berat untuk cadangan.",
    "rec_injured": "Cadangan: utamakan sesi Teras/Atas yang ringan dengan lebih banyak hari rehat.",
    "rec_overweight": "Cadangan: Pelan bakar lemak (HIIT ringan → sederhana) berselang-seli dengan Bawah/Teras.",
    "rec_general": "Cadangan: Pelan seluruh badan (kekuatan asas + Teras).",
    "loading": "Memuatkan...",
    "save_success_title": "Disimpan",
    "save_error_title": "Ralat",
    "save_error_msg": "Gagal menyimpan data. Sila cuba lagi.",
    "btn_delete": "Padam",
    "btn_save": "Simpan"
  },
  "dashboard": {
    "title": "Papan pemantauan kemajuan",
    "streak": "Rentetan",
    "thisWeek": "Minggu ini",
    "total": "Jumlah",
    "completedPrograms": "Selesai",
    "lastWorkout": "Senaman terakhir"
  },
  "recommend": {
    "title": "Disyorkan untuk anda",
    "start": "Mulakan pelan ini"
  },
  "nutrition": {
    "title": "Nutrisi",
    "subtitle": "Aplikasi mencadangkan kalori, air dan nisbah nutrisi mengikut matlamat anda.",
    "noProfileTitle": "Lengkapkan profil dahulu",
    "noProfileText": "Tambah tinggi, berat dan matlamat untuk cadangan.",
    "targets": "Sasaran harian",
    "calories": "Kalori",
    "water": "Air",
    "macros": "Nisbah makro",
    "protein": "Protein",
    "carbs": "Karbo",
    "fats": "Lemak",
    "sampleMeals": "Contoh hidangan",
    "tips": "Nasihat",
    "screenTitle": "Nutrisi",
    "heroStep": "3",
    "heroTitleLine1": "Pelan nutrisi",
    "heroTitleLine2": "peribadi",
    "dailyGoal": "Sasaran harian",
    "edit": "Edit",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Nisbah makro",
    "carb": "Karbo",
    "fat": "Lemak",
    "viewAll": "Lihat semua",
    "breakfast": "Sarapan",
    "lunch": "Makan tengah hari",
    "dinner": "Makan malam",
    "snack": "Snek",
    "mealPlan": "Cadangan makanan",
    "tipFallback": "Minum air secukupnya dan utamakan makanan tinggi protein.",
    "footer1": "Mulai hari ini,",
    "footer2": "versi lebih baik diri anda",
    "science": "Sains",
    "effective": "Berkesan",
    "sustainable": "Mampan",
    "advancedMode": "MOD LANJUTAN",
    "pro": "PRO",
    "advancedTitle": "Analisis nutrisi profesional",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Pelarasan",
    "kcalPerDay": "kcal/hari",
    "mealSplit": "Pembahagian kalori mengikut hidangan",
    "hydration": "Jadual minum air",
    "note": "Nota penting",
    // ms
customTargetKicker: 'SASARAN TERSUAI',
editDailyGoals: 'Edit sasaran harian',
editDailyGoalsDesc:
  'Tukar sasaran kalori atau air. Aplikasi akan mengira semula makro dan cadangan makanan secara automatik.',
resetAuto: 'Auto',
// ms
waterReminderKicker: 'HIDRASI',
waterReminder: 'Peringatan minum air',
waterReminderDesc:
  'Terima peringatan lembut sepanjang hari berdasarkan sasaran air anda.',
waterReminderOn: 'Hidup',
waterReminderOff: 'Mati',
waterTarget: 'Sasaran air',
reminderTime: 'Masa peringatan',
reminderInterval: 'Selang masa',
waterReminderTitle: 'Masa untuk minum air',
waterReminderBody: 'Minum kira-kira {{amount}}ml air untuk kekal hidrat.',
  },
  "beginner": {
    "modeTitle": "Mod pemula",
    "modeDesc": "Penerangan ringkas dan panduan cepat untuk pengguna baharu.",
    "glossaryTitle": "Panduan pemula",
    "terms": {
      "restDay": {
        "title": "Hari rehat",
        "desc": "Ini ialah hari pemulihan. Badan anda berehat dan membina semula dirinya, jadi jangan abaikannya."
      },
      "warmUp": {
        "title": "Pemanasan",
        "desc": "Pergerakan ringan sebelum bersenam untuk menyediakan badan dan mengurangkan risiko kecederaan."
      },
      "cooldown": {
        "title": "Bertenang",
        "desc": "Pergerakan mudah atau regangan selepas bersenam untuk membantu badan anda pulih."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "Latihan Selang Intensiti Tinggi: tempoh singkat kerja berat diikuti dengan rehat singkat."
      },
      "rep": {
        "title": "Ulangan",
        "desc": "Satu pergerakan penuh bagi sesuatu senaman. Contoh: satu squat = satu ulangan."
      },
      "set": {
        "title": "Set",
        "desc": "Sekumpulan ulangan. Contoh: 10 squat yang dilakukan bersama = 1 set."
      }
    }
  },
  "todayWorkout": {
    "title": "Senaman hari ini",
    "fallback": "Senaman",
    "startNow": "Mula sekarang",
    "restTitle": "Hari ini ialah hari pemulihan",
    "restText": "Berehatlah, lakukan regangan ringan, minum air dan bersedia untuk senaman anda yang seterusnya."
  },
  "common": {
    "on": "HIDUP",
    "off": "MATI",
    "cancel": "Batal",
    "edit": "Edit",
    "viewAll": "Lihat semua"
  },
  "history": {
    "title": "Sejarah senaman",
    "screenTitle": "Sejarah senaman",
    "thisWeek": "Minggu ini",
    "minutes": "Minit",
    "totalWorkouts": "Senaman",
    "empty": "Belum ada senaman yang selesai.",
    "viewAll": "Lihat semua",
    "filter7": "7 hari",
    "filter30": "30 hari",
    "filterAll": "Semua"
  },
  "achievements": {
    "title": "Pencapaian",
    "firstWorkout": "Senaman pertama",
    "tenWorkouts": "10 senaman",
    "twentyfiveWorkouts": "25 senaman",
    "streak3": "Rentetan 3 hari",
    "streak7": "Rentetan 7 hari",
    "week4": "4 senaman minggu ini",
    "finishProgram": "Lengkapkan 1 program"
  },
  "challenges": {
    "title": "Cabaran",
    "intro": "Mulakan cabaran pendek untuk kekal konsisten.",
    "start7": "Mulakan cabaran 7 hari",
    "start30": "Mulakan cabaran 30 hari",
    "complete": "Cabaran selesai",
    "daysLeft": "{{count}} hari lagi",
    "starter7Title": "Cabaran permulaan 7 hari",
    "starter7Desc": "Lengkapkan 5 senaman dalam 7 hari.",
    "consistency30Title": "Cabaran konsisten 30 hari",
    "consistency30Desc": "Lengkapkan 20 senaman dalam 30 hari."
  },
  "filters": {
    "all": "Semua",
    "levelTitle": "Tahap",
    "level": {
      "beginner": "Permulaan",
      "intermediate": "Pertengahan",
      "advanced": "Lanjutan"
    },
    "goalTitle": "Fokus",
    "goal": {
      "lose_weight": "Turun berat badan",
      "build_muscle": "Bina otot",
      "cardio": "Kardio",
      "core": "Teras",
      "mobility": "Mobiliti"
    },
    "equipmentTitle": "Peralatan",
    "equipment": {
      "no_equipment": "Tanpa peralatan",
      "with_equipment": "Dengan peralatan"
    },
    "durationTitle": "Tempoh",
    "duration": {
      "short": "Pendek",
      "medium": "Sederhana",
      "long": "Panjang"
    },
    "noResultsTitle": "Tiada program yang sepadan",
    "noResultsText": "Cuba ubah satu atau lebih penapis."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "Pelan {{goalLabel}}: {{calories}} kcal/hari, {{proteinG}}g protein, {{carbsG}}g karbo, {{fatsG}}g lemak. Anggaran BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Kurang lemak",
      "build_muscle": "Bina otot",
      "maintain": "Kekal",
      "recomp": "Rekomposisi badan",
      "endurance": "Daya tahan",
      "flexibility": "Kesihatan umum"
    },
    "activity": {
      "sedentary": "Kurang aktif",
      "light": "Aktiviti ringan",
      "moderate": "Aktiviti sederhana",
      "active": "Aktif",
      "very_active": "Sangat aktif"
    },
    "bmi": {
      "under": "Kurang berat",
      "normal": "Normal",
      "over": "Berat berlebihan",
      "obese": "Obesiti"
    },
    "hydration": {
      "morning": "Pagi: 500ml selepas bangun",
      "beforeWorkout": "Sebelum latihan: 300–500ml",
      "duringWorkout": "Semasa latihan: teguk kecil setiap 10–15 minit",
      "evening": "Malam: cukupkan baki sasaran air"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const fil = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Home",
    "nutrition": "Nutrisyon",
    "guide": "Gabay",
    "premium": "Premium",
    "settings": "Mga Setting",
    "workout": "Ehersisyo",
    "more": "Iba pa",
    "program": "Programa",
    "profile": "Profile",
    "weightChart": "Tsart ng Timbang"
  },
  "home": {
    "title": "Piliin ang iyong plano",
    "subtitle": "Pumili ng programa at mag-ensayo araw-araw",
    "program60": "60-Araw na Pagsusunog ng Taba",
    "program90": "90-Araw para sa Buong Katawan",
    "daysSuffix": "{{count}} na araw",
    "health_overview": "Lagay ng Kalusugan",
    "activeTitle": "Kasalukuyang Ginagawa",
    "noActive": "Walang kasalukuyang programang ginagawa."
  },
  "program": {
    "daysPrefix": "Araw {{day}} • {{weekday}}",
    "weekTitle": "Linggo {{n}}",
    "completed": "Tapos na",
    "todayWorkout": "Workout: {{name}}"
  },
  "workouts": {
    "rest": "Recovery / Pahinga",
    "hiit": "Full-body HIIT",
    "upper": "Chest - Shoulder - Arms",
    "lower": "Glutes - Binti",
    "core": "Abs & Core",
    "pickOne": "Pumili ng lesson plan para makapagsimula",
    "days": "Araw",
    "day": "Araw",
    "heroTitle": "Daily workout plan mo",
    "matchingResults": "Matching results"
  },
  "guide": {
    "title": "Paano Gamitin ang PulseFit",
    "subtitle": "Sundin ang mga simpleng hakbang na ito para simulan ang iyong workout journey.",
    "steps": {
      "step1": {
        "badge": "Hakbang 1",
        "title": "Ilagay ang iyong personal na impormasyon",
        "desc": "Ilagay ang iyong taas, timbang, kondisyon sa kalusugan, mga layunin, at iba pang pangunahing impormasyon. Kakalkulahin ng app ang iyong BMI at magbibigay ng payong pangkalusugan upang makatulong sa ligtas na pagsisimula."
      },
      "step2": {
        "badge": "Hakbang 2",
        "title": "Pumili ng angkop na workout program",
        "desc": "Tingnan ang mga available na workout program at piliin ang pinakaangkop sa iyong fitness level, layunin, at kagustuhan."
      },
      "step3": {
        "badge": "Hakbang 3",
        "title": "Piliin ang araw ng workout",
        "desc": "Buksan ang napiling programa at piliin ang araw ng workout na gusto mong sundan. Maaari kang magpatuloy nang paisa-isa ayon sa iskedyul."
      },
      "step4": {
        "badge": "Hakbang 4",
        "title": "Mag-workout gamit ang video",
        "desc": "Sundan ang workout video upang tama ang iyong pag-eehersisyo. Maaari mong i-rotate nang pahiga ang iyong telepono upang mapanood ang video sa full screen para sa mas magandang karanasan."
      }
    },
    "noteTitle": "Paalala",
    "note": "Panatilihing regular ang iyong pag-eehersisyo upang makuha ang pinakamagandang resulta."
  },
  "premium": {
    "title": "Mag-upgrade sa Premium",
    "removeAds": "Alisin ang mga ad",
    "allPrograms": "I-unlock ang buong karanasan",
    "active": "Aktibo ang Premium",
    "restore": "I-restore ang mga binili",
    "restoreTitle": "I-restore ang mga binili",
    "restoreSuccess": "Matagumpay na na-restore ang Premium.",
    "restoreEmpty": "Walang nakitang Premium purchase.",
    "errorTitle": "Nabigo ang pagbili",
    "errorText": "Hindi makumpleto ang pagbili.",
    "productUnavailable": "Hindi nakita ang Premium product. Pakisuri ang setup ng Play Console / App Store.",
    "subUnavailable": "Hindi nakita ang buwanang subscription. Pakisuri ang setup ng Play Console / App Store.",
    "loading": "Naglo-load...",
    "monthlyTitle": "Buwanang Premium",
    "monthlyDesc": "Awtomatikong nagre-renew bawat buwan para manatiling aktibo ang Premium",
    "subscribeMonthly": "Mag-subscribe buwan-buwan",
    "lifetimeTitle": "Habambuhay na Premium",
    "lifetimeDesc": "Isang bayad lang, Premium habambuhay",
    "buyLifetime": "Bilhin habambuhay"
  },
  "video": {
    "loading": "Naglo-load ng video...",
    "play": "Simulan ang workout",
    "error": "Hindi ma-play ang video. Pakisubukan muli."
  },
// fil
settings: {
  title: 'Settings',
  language: 'Wika',
  choose: 'Pumili ng wika',
  chooseLanguage: 'Piliin ang wika ng app',
  general: 'Pangkalahatan',
  dailyReminder: 'Araw-araw na paalala',
  tapToToggleReminder: 'I-tap para palitan ang paalala 20:00/07:00',
  accountAndTraining: 'Account at Training',
  // fil
workoutReminderKicker: 'WORKOUT REMINDER',
chooseWorkoutReminderTime: 'Pumili ng oras ng reminder',
workoutReminderDesc:
  'Piliin ang oras kung kailan ka papaalalahanan ng app na mag-training araw-araw.',
hour: 'Oras',
minute: 'Minuto',
saveReminder: 'I-save',
disableReminder: 'I-disable',
reminderOffText: 'Off • i-tap para pumili ng oras',
dailyReminderTitle: 'Oras na para mag-workout! 💪',
dailyReminderBody:
  'Buksan ang Insanity Deluxe Edition at tapusin ang session mo ngayon.',
},
  "onboard": {
    "title": "Simulan na natin 👋",
    "subtitle": "Maglagay ng ilang detalye para makapag-suggest kami ng angkop na plan",
    "name": "Buong pangalan *",
    "age": "Edad *",
    "gender": "Kasarian *",
    "gender_male": "Lalaki",
    "gender_female": "Babae",
    "gender_other": "Iba pa",
    "health": "Kondisyon ng kalusugan",
    "height": "Height (cm) *",
    "weight": "Weight (kg) *",
    "injured_q": "May injury ka ba?",
    "injury_note": "Deskripsyon ng injury",
    "goal": "Kasalukuyang goal *",
    "goals": {
      "lose_weight": "Magbawas ng timbang",
      "build_muscle": "Magpalaki ng muscles",
      "maintain": "I-maintain ang timbang",
      "recomp": "Recomp (bawas taba + dagdag muscle)",
      "endurance": "Endurance",
      "flexibility": "Flexibility"
    },
    "tip_title": "Quick tips",
    "tip_1": "Kung may injury, magsimula sa low-impact exercises at dahan-dahang dagdagan ang intensity.",
    "tip_2": "I-update ang iyong weight kada 3 araw para ma-track ang progress.",
    "back": "Bumalik",
    "next": "Susunod",
    "finish": "Tapusin",
    "saving": "Sini-save...",
    "bmi": "BMI",
    "bmi_result_title": "Health overview",
    "bmi_label_under": "Underweight",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Overweight",
    "bmi_label_obese": "Obese",
    "advice_intro": "• Ang iyong BMI: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Focus sa pag-gain ng lean mass: full-body/upper-lower sa moderate intensity; dagdagan ang load; sapat na protein at calories.",
    "advice_bmi_normal": "• Maintain: mix ng strength + moderate cardio (2–3 araw/linggo); unahin ang technique at sapat na tulog.",
    "advice_bmi_over": "• Fat loss: moderate cardio/light HIIT 2–3 araw + full-body strength; konting bawas sa calories.",
    "advice_bmi_obese": "• Safe fat loss: mabilis na lakad/low-impact cardio + basic strength; bantayan ang heart rate, dahan-dahang dagdagan ang intensity.",
    "advice_goal_lose_weight": "• Goal: Lose weight → i-track ang calories, 1.6–2.2g/kg protein, 7–8 oras na tulog.",
    "advice_goal_build_muscle": "• Goal: Build muscle → progressive overload 3–5 araw/linggo, 1.6–2.2g/kg protein, konting dagdag sa calories.",
    "advice_goal_maintain": "• Goal: Maintain → 3 araw/linggo, balanse sa strength + cardio, mag-timbang linggu-linggo.",
    "advice_goal_recomp": "• Goal: Recomp → basic lifting + high protein, konting bawas sa calories, matulog nang maayos.",
    "advice_goal_endurance": "• Goal: Endurance → zone 2 + intervals; kumain ng carbs bago mag-workout.",
    "advice_goal_flexibility": "• Goal: Flexibility → araw-araw na mobility/ROM 10–20 min, magdagdag ng light strength.",
    "advice_injured": "• Injury note: low-impact, walang sakit sa ROM; dahan-dahang progress; kumonsulta sa coach o doktor kung kailangan.",
    "advice_healthnote": "• Bantayan ang mga naitalang health conditions at i-adjust ang intensity ayon dito.",
    "start_training": "Simulan ang training"
  },
  "weight": {
    "prompt_title": "I-update ang timbang",
    "prompt_desc": "Ilagay ang iyong kasalukuyang timbang (kg)",
    "prompt_placeholder": "hal. 65.5",
    "later": "Mamaya na",
    "save": "I-save",
    "chart_title": "Weight tracking",
    "chart_empty": "Wala pang data. Paaalalahanan ka ng app paminsan-minsan na i-log ang iyong weight."
  },
  "UserProfile": {
    "title": "User Profile",
    "subtitle": "Ilagay ang iyong info para sa personalized workout recommendations",
    "name_label": "Buong pangalan *",
    "name_ph": "hal. Juan Dela Cruz",
    "age_label": "Edad",
    "age_ph": "hal. 28",
    "gender_label": "Kasarian",
    "gender_male": "Lalaki",
    "gender_female": "Babae",
    "gender_other": "Iba pa",
    "height_label": "Height (cm)",
    "height_ph": "hal. 170",
    "weight_label": "Weight (kg)",
    "weight_ph": "hal. 65",
    "bmi": "BMI",
    "bmi_label_under": "Underweight",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Overweight",
    "bmi_label_obese": "Obese",
    "health_label": "Health status",
    "health_ph": "hal. Stable ang blood pressure, maayos ang tulog, nagbabalik sa training...",
    "injured_q": "May mga injury ba?",
    "injury_label": "Detalye ng injury",
    "injury_ph": "hal. Masakit ang kaliwang tuhod, iwas sa deep squats; masakit ang bahagi của balikat...",
    "hint_fill_hw": "Ilagay ang height & weight para sa mga suggestion.",
    "rec_injured": "Recommendation: unahin ang light CORE/Upper sessions na may mas maraming rest days.",
    "rec_overweight": "Recommendation: Fat-loss plan (light → moderate HIIT) na salit-salit sa Lower/Core.",
    "rec_general": "Recommendation: Full-body plan (foundational strength + Core).",
    "loading": "Naglo-load...",
    "save_success_title": "Na-save na",
    "save_error_title": "Error",
    "save_error_msg": "Hindi ma-save ang iyong data. Pakisubukan muli.",
    "btn_delete": "I-delete",
    "btn_save": "I-save"
  },
  "dashboard": {
    "title": "Dashboard ng progreso",
    "streak": "Sunod-sunod na araw",
    "thisWeek": "Ngayong linggo",
    "total": "Kabuuan",
    "completedPrograms": "Natapos",
    "lastWorkout": "Huling workout"
  },
  "recommend": {
    "title": "Inirerekomenda para sa iyo",
    "start": "Simulan ang planong ito"
  },
  "nutrition": {
    "title": "Nutrisyon",
    "subtitle": "Nagmumungkahi ang app ng calories, tubig at nutrition ratio batay sa goal mo.",
    "noProfileTitle": "Kumpletuhin muna ang profile",
    "noProfileText": "Ilagay ang height, weight at goal para sa rekomendasyon.",
    "targets": "Daily goals",
    "calories": "Calories",
    "water": "Tubig",
    "macros": "Macro split",
    "protein": "Protein",
    "carbs": "Carb",
    "fats": "Fat",
    "sampleMeals": "Sample meals",
    "tips": "Advice",
    "screenTitle": "Nutrisyon",
    "heroStep": "3",
    "heroTitleLine1": "Personal na",
    "heroTitleLine2": "nutrition plan",
    "dailyGoal": "Daily goals",
    "edit": "Edit",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Macro ratio",
    "carb": "Carb",
    "fat": "Fat",
    "viewAll": "View all",
    "breakfast": "Almusal",
    "lunch": "Tanghalian",
    "dinner": "Hapunan",
    "snack": "Snack",
    "mealPlan": "Meal suggestions",
    "tipFallback": "Uminom ng sapat na tubig at piliin ang pagkaing mataas sa protein.",
    "footer1": "Simula ngayon,",
    "footer2": "mas magandang bersyon mo",
    "science": "Science",
    "effective": "Effective",
    "sustainable": "Sustainable",
    "advancedMode": "ADVANCED MODE",
    "pro": "PRO",
    "advancedTitle": "Propesyonal na pagsusuri ng nutrisyon",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Adjustment",
    "kcalPerDay": "kcal/araw",
    "mealSplit": "Hati ng calories bawat meal",
    "hydration": "Iskedyul ng tubig",
    "note": "Mahalagang paalala",
    // fil
customTargetKicker: 'CUSTOM TARGET',
editDailyGoals: 'I-edit ang daily goals',
editDailyGoalsDesc:
  'Palitan ang calorie o water target. Awtomatikong kakalkulahin muli ng app ang macros at meal suggestions.',
resetAuto: 'Auto',
// fil
waterReminderKicker: 'HYDRATION',
waterReminder: 'Water reminder',
waterReminderDesc:
  'Makakuha ng gentle reminders sa buong araw batay sa water target mo.',
waterReminderOn: 'On',
waterReminderOff: 'Off',
waterTarget: 'Water target',
reminderTime: 'Reminder time',
reminderInterval: 'Interval',
waterReminderTitle: 'Oras na para uminom ng tubig',
waterReminderBody: 'Uminom ng mga {{amount}}ml na tubig para manatiling hydrated.',
  },
  "beginner": {
    "modeTitle": "Beginner mode",
    "modeDesc": "Mga simpleng paliwanag at mabilis na gabay para sa mga bagong user.",
    "glossaryTitle": "Gabay para sa baguhan",
    "terms": {
      "restDay": {
        "title": "Araw ng pahinga",
        "desc": "Ito ay araw ng recovery. Nagpapahinga at muling bumubuo ang iyong katawan, kaya huwag itong laktawan."
      },
      "warmUp": {
        "title": "Warm-up",
        "desc": "Magaan na galaw bago mag-ehersisyo upang ihanda ang katawan at mabawasan ang panganib ng injury."
      },
      "cooldown": {
        "title": "Cooldown",
        "desc": "Magaan na galaw o stretching pagkatapos mag-ehersisyo upang matulungan ang katawan na makabawi."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "High-Intensity Interval Training: maiikling bugso ng matinding trabaho na sinusundan ng maikling pahinga."
      },
      "rep": {
        "title": "Rep",
        "desc": "Isang kumpletong galaw ng ehersisyo. Halimbawa: isang squat = isang rep."
      },
      "set": {
        "title": "Set",
        "desc": "Isang grupo ng reps. Halimbawa: 10 squat na ginawa nang magkakasunod = 1 set."
      }
    }
  },
  "todayWorkout": {
    "title": "Workout ngayong araw",
    "fallback": "Workout",
    "startNow": "Simulan ngayon",
    "restTitle": "Ngayong araw ay araw ng recovery",
    "restText": "Magpahinga muna, mag-stretch nang marahan, uminom ng tubig, at maghanda para sa susunod mong workout."
  },
  "common": {
    "on": "ON",
    "off": "OFF",
    "cancel": "Cancel",
    "edit": "Edit",
    "viewAll": "View all"
  },
  "history": {
    "title": "Kasaysayan ng workout",
    "screenTitle": "Kasaysayan ng workout",
    "thisWeek": "Ngayong linggo",
    "minutes": "Minuto",
    "totalWorkouts": "Mga workout",
    "empty": "Wala pang natatapos na workout.",
    "viewAll": "Tingnan lahat",
    "filter7": "7 araw",
    "filter30": "30 araw",
    "filterAll": "Lahat"
  },
  "achievements": {
    "title": "Pencapaian",
    "firstWorkout": "Senaman pertama",
    "tenWorkouts": "10 senaman",
    "twentyfiveWorkouts": "25 senaman",
    "streak3": "Rentetan 3 hari",
    "streak7": "Rentetan 7 hari",
    "week4": "4 senaman minggu ini",
    "finishProgram": "Lengkapkan 1 program"
  },
  "challenges": {
    "title": "Cabaran",
    "intro": "Mulakan cabaran pendek untuk kekal konsisten.",
    "start7": "Mulakan cabaran 7 hari",
    "start30": "Mulakan cabaran 30 hari",
    "complete": "Cabaran selesai",
    "daysLeft": "{{count}} hari lagi",
    "starter7Title": "Cabaran permulaan 7 hari",
    "starter7Desc": "Lengkapkan 5 senaman dalam 7 hari.",
    "consistency30Title": "Cabaran konsisten 30 hari",
    "consistency30Desc": "Lengkapkan 20 senaman dalam 30 hari."
  },
  "filters": {
    "all": "Lahat",
    "levelTitle": "Antas",
    "level": {
      "beginner": "Baguhan",
      "intermediate": "Katamtaman",
      "advanced": "Advanced"
    },
    "goalTitle": "Pokús",
    "goal": {
      "lose_weight": "Magbawas ng timbang",
      "build_muscle": "Magpalaki ng kalamnan",
      "cardio": "Cardio",
      "core": "Core",
      "mobility": "Mobility"
    },
    "equipmentTitle": "Kagamitan",
    "equipment": {
      "no_equipment": "Walang kagamitan",
      "with_equipment": "May kagamitan"
    },
    "durationTitle": "Tagal",
    "duration": {
      "short": "Maikli",
      "medium": "Katamtaman",
      "long": "Mahaba"
    },
    "noResultsTitle": "Walang katugmang programa",
    "noResultsText": "Subukang baguhin ang isa o higit pang filter."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "{{goalLabel}} plan: {{calories}} kcal/araw, {{proteinG}}g protein, {{carbsG}}g carb, {{fatsG}}g fat. Estimated BMR {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Fat loss",
      "build_muscle": "Build muscle",
      "maintain": "Maintain",
      "recomp": "Body recomposition",
      "endurance": "Endurance",
      "flexibility": "General wellness"
    },
    "activity": {
      "sedentary": "Sedentary",
      "light": "Light activity",
      "moderate": "Moderate activity",
      "active": "Active",
      "very_active": "Very active"
    },
    "bmi": {
      "under": "Underweight",
      "normal": "Normal",
      "over": "Overweight",
      "obese": "Obese"
    },
    "hydration": {
      "morning": "Umaga: 500ml pagkagising",
      "beforeWorkout": "Bago mag-workout: 300–500ml",
      "duringWorkout": "Habang nagwo-workout: maliliit na lagok bawat 10–15 minuto",
      "evening": "Gabi: tapusin ang natitirang water target"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

const pt = {
  "appName": "WorkoutApp",
  "footer": {
    "devBy": "Developer by {{name}}"
  },
  "tabs": {
    "main": "Inicio",
    "nutrition": "Nutrición",
    "guide": "Guía",
    "premium": "Premium",
    "settings": "Ajustes",
    "workout": "Entrenamiento",
    "more": "Más",
    "program": "Programa",
    "profile": "Perfil",
    "weightChart": "Gráfico de peso"
  },
  "home": {
    "title": "Elige tu plan de entrenamiento",
    "subtitle": "Elige un programa y entrena a diario",
    "program60": "Quema de grasa en 60 días",
    "program90": "Cuerpo completo en 90 días",
    "daysSuffix": "{{count}} días",
    "health_overview": "Resumen de salud",
    "activeTitle": "En curso",
    "noActive": "No hay ningún programa activo actualmente."
  },
  "program": {
    "daysPrefix": "Día {{day}} • {{weekday}}",
    "weekTitle": "Semana {{n}}",
    "completed": "Completado",
    "todayWorkout": "Entrenamiento: {{name}}"
  },
  "workouts": {
    "rest": "Recuperación / Descanso",
    "hiit": "HIIT de cuerpo completo",
    "upper": "Pecho - Hombros - Brazos",
    "lower": "Glúteos - Piernas",
    "core": "Abdominales y Core",
    "pickOne": "Elige un plan para comenzar",
    "days": "Dia",
    "day": "Dia",
    "heroTitle": "Seu plano de treino diário",
    "matchingResults": "Resultados correspondentes"
  },
  "guide": {
    "title": "Como usar o PulseFit",
    "subtitle": "Siga estes passos simples para começar sua jornada de treino.",
    "steps": {
      "step1": {
        "badge": "Passo 1",
        "title": "Insira suas informações pessoais",
        "desc": "Preencha sua altura, peso, condição de saúde, objetivos e outras informações básicas. O aplicativo calculará seu IMC e fornecerá orientações de saúde para ajudá-lo a começar com segurança."
      },
      "step2": {
        "badge": "Passo 2",
        "title": "Escolha um programa de treino adequado",
        "desc": "Veja os programas disponíveis e escolha o que melhor se adapta ao seu nível de condicionamento, objetivos e preferências."
      },
      "step3": {
        "badge": "Passo 3",
        "title": "Escolha o dia do treino",
        "desc": "Abra o programa selecionado e escolha o dia de treino que deseja seguir. Você pode avançar passo a passo de acordo com o cronograma."
      },
      "step4": {
        "badge": "Passo 4",
        "title": "Treine com o vídeo",
        "desc": "Siga o vídeo de treino para se exercitar corretamente. Você pode girar o celular na horizontal para assistir ao vídeo em tela cheia e ter uma experiência melhor."
      }
    },
    "noteTitle": "Observação",
    "note": "Mantenha a consistência nos treinos para alcançar os melhores resultados."
  },
  "premium": {
    "title": "Atualizar para Premium",
    "removeAds": "Remover anúncios",
    "allPrograms": "Desbloquear a experiência completa",
    "active": "Premium está ativo",
    "restore": "Restaurar compras",
    "restoreTitle": "Restaurar compras",
    "restoreSuccess": "Premium restaurado com sucesso.",
    "restoreEmpty": "Nenhuma compra Premium encontrada.",
    "errorTitle": "Falha na compra",
    "errorText": "Não foi possível concluir a compra.",
    "productUnavailable": "Produto Premium não encontrado. Verifique a configuração do Play Console / App Store.",
    "subUnavailable": "Assinatura mensal não encontrada. Verifique a configuração do Play Console / App Store.",
    "loading": "Carregando...",
    "monthlyTitle": "Premium mensal",
    "monthlyDesc": "Renovação automática todos os meses para manter o Premium ativo",
    "subscribeMonthly": "Assinar mensalmente",
    "lifetimeTitle": "Premium vitalício",
    "lifetimeDesc": "Pagamento único, mantenha o Premium para sempre",
    "buyLifetime": "Comprar vitalício"
  },
  "video": {
    "loading": "Cargando video...",
    "play": "Iniciar entrenamiento",
    "error": "No se pudo reproducir el video. Inténtalo de nuevo."
  },
// pt
settings: {
  title: 'Configurações',
  language: 'Idioma',
  choose: 'Escolha um idioma',
  chooseLanguage: 'Escolha o idioma do aplicativo',
  general: 'Geral',
  dailyReminder: 'Lembrete diário',
  tapToToggleReminder: 'Toque para alternar o lembrete',
  accountAndTraining: 'Conta e treino',
  // pt
workoutReminderKicker: 'LEMBRETE DE TREINO',
chooseWorkoutReminderTime: 'Escolher horário do lembrete',
workoutReminderDesc:
  'Selecione o horário em que deseja ser lembrado de treinar todos os dias.',
hour: 'Hora',
minute: 'Minuto',
saveReminder: 'Salvar',
disableReminder: 'Desativar',
reminderOffText: 'Desligado • toque para escolher o horário',
dailyReminderTitle: 'Hora de treinar! 💪',
dailyReminderBody:
  'Abra o Insanity Deluxe Edition e complete a sessão de hoje.',
},
  "onboard": {
    "title": "¡Comencemos! 👋",
    "subtitle": "Ingresa algunos datos để que podamos sugerirte un plan adecuado",
    "name": "Nombre completo *",
    "age": "Edad *",
    "gender": "Género *",
    "gender_male": "Masculino",
    "gender_female": "Femenino",
    "gender_other": "Otro",
    "health": "Condición de salud",
    "height": "Altura (cm) *",
    "weight": "Peso (kg) *",
    "injured_q": "¿Tienes alguna lesión?",
    "injury_note": "Descripción de la lesión",
    "goal": "Objetivo actual *",
    "goals": {
      "lose_weight": "Perder peso",
      "build_muscle": "Ganar músculo",
      "maintain": "Mantener peso",
      "recomp": "Recomposición (perder grasa + ganar músculo)",
      "endurance": "Resistencia",
      "flexibility": "Flexibilidad"
    },
    "tip_title": "Consejos rápidos",
    "tip_1": "Si tienes una lesión, comienza con ejercicios de bajo impacto y aumenta gradualmente.",
    "tip_2": "Actualiza tu peso cada 3 días para seguir tu progreso.",
    "back": "Atrás",
    "next": "Siguiente",
    "finish": "Terminar",
    "saving": "Guardando...",
    "bmi": "IMC",
    "bmi_result_title": "Resumen de salud",
    "bmi_label_under": "Bajo peso",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Sobrepeso",
    "bmi_label_obese": "Obesidad",
    "advice_intro": "• Tu IMC: {{bmi}} ({{label}}).",
    "advice_bmi_under": "• Foco en ganar masa magra: entrenamiento de cuerpo completo/superior-inferior a intensidad moderada; aumentar cargas; proteína y calorías adecuadas.",
    "advice_bmi_normal": "• Mantener: mezcla fuerza + cardio moderado (2–3 días/sem); prioriza técnica y sueño.",
    "advice_bmi_over": "• Pérdida de grasa: cardio moderado/HIIT ligero 2–3 días + fuerza de cuerpo completo; ligero déficit calórico.",
    "advice_bmi_obese": "• Pérdida segura: caminata rápida/cardio de bajo impacto + fuerza básica; monitorear FC, aumentar intensidad gradualmente.",
    "advice_goal_lose_weight": "• Objetivo: Perder peso → contar calorías, 1.6–2.2g/kg de proteína, 7–8h de sueño.",
    "advice_goal_build_muscle": "• Objetivo: Ganar músculo → sobrecarga progresiva 3–5 días/sem, 1.6–2.2g/kg de proteína, ligero superávit.",
    "advice_goal_maintain": "• Objetivo: Mantener → 3 días/sem, equilibrio fuerza + cardio, pesarse semanalmente.",
    "advice_goal_recomp": "• Objetivo: Recomp → pesas básico + alta proteína, ligero déficit, dormir bien.",
    "advice_goal_endurance": "• Objetivo: Resistencia → zona 2 + intervalos; carbohidratos antes de entrenar.",
    "advice_goal_flexibility": "• Objetivo: Flexibilidad → movilidad diaria/ROM 10–20 min, añadir fuerza ligera.",
    "advice_injured": "• Nota sobre lesión: bajo impacto, ROM sin dolor; progreso gradual; consulta a un entrenador/médico si es necesario.",
    "advice_healthnote": "• Monitorea las condiciones de salud anotadas y ajusta la intensidad en consecuencia.",
    "start_training": "Empezar a entrenar"
  },
  "weight": {
    "prompt_title": "Actualizar peso",
    "prompt_desc": "Ingresa tu peso actual (kg)",
    "prompt_placeholder": "ej. 65.5",
    "later": "Más tarde",
    "save": "Guardar",
    "chart_title": "Seguimiento de peso",
    "chart_empty": "Aún no hay datos. La app te recordará periódicamente registrar tu peso."
  },
  "UserProfile": {
    "title": "Perfil de Usuario",
    "subtitle": "Ingresa tu información para recibir recomendaciones personalizadas",
    "name_label": "Nombre completo *",
    "name_ph": "ej. Juan Pérez",
    "age_label": "Edad",
    "age_ph": "ej. 28",
    "gender_label": "Género",
    "gender_male": "Masculino",
    "gender_female": "Femenino",
    "gender_other": "Otro",
    "height_label": "Altura (cm)",
    "height_ph": "ej. 170",
    "weight_label": "Peso (kg)",
    "weight_ph": "ej. 65",
    "bmi": "IMC",
    "bmi_label_under": "Bajo peso",
    "bmi_label_normal": "Normal",
    "bmi_label_over": "Sobrepeso",
    "bmi_label_obese": "Obesidad",
    "health_label": "Estado de salud",
    "health_ph": "ej. Presión estable, buen sueño, retomando entrenamientos...",
    "injured_q": "¿Tienes lesiones?",
    "injury_label": "Detalles de la lesión",
    "injury_ph": "ej. Dolor en rodilla izquierda, evitar sentadillas profundas; hombro...",
    "hint_fill_hw": "Ingresa altura y peso para obtener sugerencias.",
    "rec_injured": "Recomendación: prioriza sesiones ligeras de CORE/Superior con más días de descanso.",
    "rec_overweight": "Recomendación: Plan de pérdida de grasa (HIIT ligero → moderado) alternando con Inferior/Core.",
    "rec_general": "Recomendación: Plan de cuerpo completo (fuerza básica + Core).",
    "loading": "Cargando...",
    "save_success_title": "Guardado",
    "save_error_title": "Error",
    "save_error_msg": "No se pudieron guardar tus datos. Inténtalo de nuevo.",
    "btn_delete": "Eliminar",
    "btn_save": "Guardar"
  },
  "dashboard": {
    "title": "Painel de progresso",
    "streak": "Sequência",
    "thisWeek": "Esta semana",
    "total": "Total",
    "completedPrograms": "Concluídos",
    "lastWorkout": "Último treino"
  },
  "recommend": {
    "title": "Recomendado para você",
    "start": "Começar este plano"
  },
  "nutrition": {
    "title": "Nutrição",
    "subtitle": "O app sugere calorias, água e proporções nutricionais conforme seu objetivo.",
    "noProfileTitle": "Complete seu perfil primeiro",
    "noProfileText": "Adicione altura, peso e objetivo para receber recomendações.",
    "targets": "Metas diárias",
    "calories": "Calorias",
    "water": "Água",
    "macros": "Proporção macro",
    "protein": "Proteína",
    "carbs": "Carboidratos",
    "fats": "Gorduras",
    "sampleMeals": "Refeições exemplo",
    "tips": "Dicas",
    "screenTitle": "Nutrição",
    "heroStep": "3",
    "heroTitleLine1": "Plano nutricional",
    "heroTitleLine2": "personalizado",
    "dailyGoal": "Metas diárias",
    "edit": "Editar",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Proporção macro",
    "carb": "Carboidratos",
    "fat": "Gordura",
    "viewAll": "Ver tudo",
    "breakfast": "Café da manhã",
    "lunch": "Almoço",
    "dinner": "Jantar",
    "snack": "Lanche",
    "mealPlan": "Sugestões de refeições",
    "tipFallback": "Beba água suficiente e priorize alimentos ricos em proteína.",
    "footer1": "A partir de hoje,",
    "footer2": "uma versão melhor de você",
    "science": "Ciência",
    "effective": "Eficaz",
    "sustainable": "Sustentável",
    "advancedMode": "MODO AVANÇADO",
    "pro": "PRO",
    "advancedTitle": "Análise nutricional profissional",
    "bmi": "IMC",
    "bmr": "TMB",
    "tdee": "TDEE",
    "adjustment": "Ajuste",
    "kcalPerDay": "kcal/dia",
    "mealSplit": "Divisão de calorias por refeição",
    "hydration": "Cronograma de hidratação",
    "note": "Nota importante",
    // pt
customTargetKicker: 'META PERSONALIZADA',
editDailyGoals: 'Editar metas diárias',
editDailyGoalsDesc:
  'Altere a meta de calorias ou água. O app recalculará automaticamente macros e sugestões de refeições.',
resetAuto: 'Auto',
// pt
waterReminderKicker: 'HIDRATAÇÃO',
waterReminder: 'Lembrete de água',
waterReminderDesc:
  'Receba lembretes suaves durante o dia com base na sua meta de água.',
waterReminderOn: 'Ligado',
waterReminderOff: 'Desligado',
waterTarget: 'Meta de água',
reminderTime: 'Hora do lembrete',
reminderInterval: 'Intervalo',
waterReminderTitle: 'Hora de beber água',
waterReminderBody: 'Beba cerca de {{amount}}ml de água para se manter hidratado.',
  },
  "beginner": {
    "modeTitle": "Modo iniciante",
    "modeDesc": "Explicações simples e orientação rápida para novos usuários.",
    "glossaryTitle": "Guia para iniciantes",
    "terms": {
      "restDay": {
        "title": "Dia de descanso",
        "desc": "É um dia de recuperação. Seu corpo descansa e se reconstrói, então não pule esse dia."
      },
      "warmUp": {
        "title": "Aquecimento",
        "desc": "Movimentos leves antes do treino para preparar o corpo e reduzir o risco de lesões."
      },
      "cooldown": {
        "title": "Desaquecimento",
        "desc": "Movimentos leves ou alongamentos após o treino para ajudar o corpo a se recuperar."
      },
      "hiit": {
        "title": "HIIT",
        "desc": "Treinamento intervalado de alta intensidade: curtos períodos de esforço intenso seguidos de curtos descansos."
      },
      "rep": {
        "title": "Repetição",
        "desc": "Um movimento completo de um exercício. Exemplo: um agachamento = uma repetição."
      },
      "set": {
        "title": "Série",
        "desc": "Um grupo de repetições. Exemplo: 10 agachamentos feitos juntos = 1 série."
      }
    }
  },
  "todayWorkout": {
    "title": "Treino de hoje",
    "fallback": "Treino",
    "startNow": "Começar agora",
    "restTitle": "Hoje é um dia de recuperação",
    "restText": "Faça uma pausa, alongue-se suavemente, beba água e prepare-se para o seu próximo treino."
  },
  "common": {
    "on": "LIGADO",
    "off": "DESLIGADO",
    "cancel": "Cancelar",
    "edit": "Editar",
    "viewAll": "Ver tudo"
  },
  "history": {
    "title": "Histórico de treinos",
    "screenTitle": "Histórico de treinos",
    "thisWeek": "Esta semana",
    "minutes": "Minutos",
    "totalWorkouts": "Treinos",
    "empty": "Ainda não há treinos concluídos.",
    "viewAll": "Ver tudo",
    "filter7": "7 dias",
    "filter30": "30 dias",
    "filterAll": "Todos"
  },
  "achievements": {
    "title": "Conquistas",
    "firstWorkout": "Primeiro treino",
    "tenWorkouts": "10 treinos",
    "twentyfiveWorkouts": "25 treinos",
    "streak3": "Sequência de 3 dias",
    "streak7": "Sequência de 7 dias",
    "week4": "4 treinos esta semana",
    "finishProgram": "Concluir 1 programa"
  },
  "challenges": {
    "title": "Desafios",
    "intro": "Comece um desafio curto para manter a consistência.",
    "start7": "Começar desafio de 7 dias",
    "start30": "Começar desafio de 30 dias",
    "complete": "Desafio concluído",
    "daysLeft": "Faltam {{count}} dia(s)",
    "starter7Title": "Desafio inicial de 7 dias",
    "starter7Desc": "Conclua 5 treinos em 7 dias.",
    "consistency30Title": "Desafio de consistência de 30 dias",
    "consistency30Desc": "Conclua 20 treinos em 30 dias."
  },
  "filters": {
    "all": "Todos",
    "levelTitle": "Nível",
    "level": {
      "beginner": "Iniciante",
      "intermediate": "Intermediário",
      "advanced": "Avançado"
    },
    "goalTitle": "Foco",
    "goal": {
      "lose_weight": "Perder peso",
      "build_muscle": "Ganhar massa muscular",
      "cardio": "Cardio",
      "core": "Core",
      "mobility": "Mobilidade"
    },
    "equipmentTitle": "Equipamento",
    "equipment": {
      "no_equipment": "Sem equipamento",
      "with_equipment": "Com equipamento"
    },
    "durationTitle": "Duração",
    "duration": {
      "short": "Curta",
      "medium": "Média",
      "long": "Longa"
    },
    "noResultsTitle": "Nenhum programa correspondente",
    "noResultsText": "Tente alterar um ou mais filtros."
  },
  "nutritionPlanner": {
    "aboutCalories": "~{{calories}} kcal",
    "summary": "Plano de {{goalLabel}}: {{calories}} kcal/dia, {{proteinG}}g proteína, {{carbsG}}g carboidratos, {{fatsG}}g gordura. BMR estimado {{bmr}}, TDEE {{tdee}}.",
    "goal": {
      "lose_weight": "Perda de gordura",
      "build_muscle": "Ganho muscular",
      "maintain": "Manutenção",
      "recomp": "Recomposição corporal",
      "endurance": "Resistência",
      "flexibility": "Bem-estar geral"
    },
    "activity": {
      "sedentary": "Sedentário",
      "light": "Atividade leve",
      "moderate": "Atividade moderada",
      "active": "Ativo",
      "very_active": "Muito ativo"
    },
    "bmi": {
      "under": "Abaixo do peso",
      "normal": "Normal",
      "over": "Sobrepeso",
      "obese": "Obesidade"
    },
    "hydration": {
      "morning": "Manhã: 500ml ao acordar",
      "beforeWorkout": "Antes do treino: 300–500ml",
      "duringWorkout": "Durante o treino: pequenos goles a cada 10–15 minutos",
      "evening": "Noite: complete o restante da meta de água"
    },
    "tips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "meals": {
      "lose_weight": {
        "breakfast": "Greek yogurt, berries, chia seeds and black coffee",
        "lunch": "grilled chicken breast, quinoa, broccoli and avocado",
        "dinner": "salmon or tofu, green vegetables and sweet potato",
        "snack": "boiled eggs, protein shake or cottage cheese"
      },
      "build_muscle": {
        "breakfast": "eggs, oats, banana and peanut butter",
        "lunch": "chicken, rice, vegetables and olive oil",
        "dinner": "lean beef or fish, potatoes and salad",
        "snack": "protein shake, yogurt or nuts"
      },
      "recomp": {
        "breakfast": "high-protein oats with fruit",
        "lunch": "lean protein, rice/quinoa and vegetables",
        "dinner": "fish, eggs or tofu with vegetables",
        "snack": "yogurt, fruit or protein shake"
      },
      "endurance": {
        "breakfast": "oats, banana, yogurt and honey",
        "lunch": "rice/pasta, lean protein and vegetables",
        "dinner": "potatoes, fish/chicken and salad",
        "snack": "fruit, smoothie or energy bar"
      },
      "general": {
        "breakfast": "eggs or yogurt with fruit and whole grains",
        "lunch": "lean protein, vegetables and complex carbs",
        "dinner": "protein, vegetables and healthy fats",
        "snack": "fruit, nuts or yogurt"
      }
    }
  }
};

type Dict = Record<string, any>;
function deepMerge<T extends Dict>(baseObj: T, overrideObj: Dict): T {
  const result: Dict = { ...baseObj };
  Object.keys(overrideObj || {}).forEach((key) => {
    const baseValue = result[key];
    const overrideValue = overrideObj[key];
    if (
      baseValue &&
      overrideValue &&
      typeof baseValue === 'object' &&
      typeof overrideValue === 'object' &&
      !Array.isArray(baseValue) &&
      !Array.isArray(overrideValue)
    ) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  });
  return result as T;
}

const nutritionI18nPatch = {
  "en": {
    "title": "Nutrition",
    "subtitle": "The app suggests calories, water and nutrition ratios based on your personal goal.",
    "noProfileTitle": "Complete your profile first",
    "noProfileText": "Add your height, weight and goal to get personalized calories, macros and water targets.",
    "targets": "Daily targets",
    "calories": "Calories",
    "water": "Water",
    "macros": "Macro split",
    "protein": "Protein",
    "carbs": "Carbs",
    "fats": "Fats",
    "sampleMeals": "Sample meals",
    "tips": "Advice",
    "advancedTitle": "Professional nutrition analysis",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Adjustment",
    "kcalPerDay": "kcal/day",
    "mealSplit": "Meal calorie split",
    "hydration": "Hydration schedule",
    "note": "Important note",
    "screenTitle": "Nutrition",
    "heroStep": "3",
    "heroTitleLine1": "Personalized",
    "heroTitleLine2": "nutrition plan",
    "dailyGoal": "Daily goals",
    "edit": "Edit",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Macro ratio",
    "carb": "Carb",
    "fat": "Fat",
    "viewAll": "View all",
    "breakfast": "Breakfast",
    "lunch": "Lunch",
    "dinner": "Dinner",
    "snack": "Snack",
    "mealPlan": "Meal suggestions",
    "tipFallback": "Drink enough water and prioritize protein-rich foods to support muscle recovery.",
    "footer1": "From today,",
    "footer2": "a better version of you",
    "science": "Science",
    "effective": "Effective",
    "sustainable": "Sustainable",
    "advancedMode": "ADVANCED MODE",
    "pro": "PRO",
    "advancedMealPlan": "Advanced meal plan",
    "advancedMealPlanKicker": "MEAL OPTIONS",
    "advancedMealPlanDesc": "Choose from multiple meals for each time of day. Calories and macros are estimated for easier planning.",
    "mealGroups": {
      "breakfast": "Breakfast options",
      "lunch": "Lunch options",
      "dinner": "Dinner options",
      "snack": "Snack options"
    },
    "goals": {
      "lose_weight": "Fat loss",
      "build_muscle": "Build muscle",
      "maintain": "Maintain",
      "recomp": "Body recomposition",
      "endurance": "Endurance",
      "flexibility": "General wellness"
    },
    "activity": {
      "sedentary": "Sedentary",
      "light": "Light activity",
      "moderate": "Moderate activity",
      "active": "Active",
      "very_active": "Very active"
    },
    "bmiLabels": {
      "under": "Underweight",
      "normal": "Normal",
      "over": "Overweight",
      "obese": "Obese"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • about {{calories}} kcal",
      "lunch": "{{meal}} • about {{calories}} kcal",
      "dinner": "{{meal}} • about {{calories}} kcal",
      "snack": "{{meal}} • about {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "Morning: 500ml after waking up",
      "beforeWorkout": "Before workout: 300–500ml",
      "duringWorkout": "During workout: small sips every 10–15 minutes",
      "evening": "Evening: finish remaining water target"
    },
    "dynamicTips": {
      "protein": "Aim for about {{proteinG}}g protein per day and spread it across 3–4 meals.",
      "water": "Drink around {{waterLiters}}L water daily. Add more on hot days or intense workout days.",
      "fiber": "Target at least {{fiberG}}g fiber from vegetables, fruit, beans and whole grains.",
      "lose_weight": "Keep a moderate calorie deficit. Avoid cutting calories too aggressively.",
      "build_muscle": "Combine a small calorie surplus with progressive strength training.",
      "recomp": "Prioritize protein and consistency. Body recomposition works best with steady training.",
      "injured": "Because you marked an injury, avoid aggressive deficits and prioritize recovery foods.",
      "healthNote": "You added a health note. Treat this plan as general guidance and adjust carefully."
    },
    "warnings": {
      "lowCalories": "Your target calories are low. Make sure you still get enough protein, micronutrients and recovery.",
      "lowBmi": "BMI is low. A fat-loss goal may not be suitable.",
      "injured": "Injury marked: prioritize recovery, sleep, hydration and joint-friendly training.",
      "healthNote": "Health note detected: this plan is not medical advice."
    },
    "summary": "{{goalLabel}} plan: {{calories}} kcal/day, {{proteinG}}g protein, {{carbsG}}g carbs, {{fatsG}}g fats. Estimated BMR {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Oatmeal with banana and peanut butter",
        "desc": "Oats, banana, peanut butter and milk"
      },
      "bf_2": {
        "title": "Eggs, whole grain toast and avocado",
        "desc": "Eggs, whole grain toast, avocado and vegetables"
      },
      "bf_3": {
        "title": "Greek yogurt bowl",
        "desc": "Greek yogurt, berries, banana and granola"
      },
      "bf_4": {
        "title": "Protein smoothie",
        "desc": "Whey protein, banana, oats, milk and peanut butter"
      },
      "ln_1": {
        "title": "Grilled chicken rice bowl",
        "desc": "Chicken breast, rice, broccoli and olive oil"
      },
      "ln_2": {
        "title": "Beef and sweet potato plate",
        "desc": "Lean beef, sweet potato and mixed vegetables"
      },
      "ln_3": {
        "title": "Tofu quinoa salad",
        "desc": "Tofu, quinoa, greens, tomatoes and avocado"
      },
      "ln_4": {
        "title": "Turkey wrap combo",
        "desc": "Turkey wrap, vegetables and yogurt dip"
      },
      "dn_1": {
        "title": "Salmon with potatoes and salad",
        "desc": "Salmon, boiled potatoes and green salad"
      },
      "dn_2": {
        "title": "Lean beef with rice and vegetables",
        "desc": "Lean beef, rice and vegetables"
      },
      "dn_3": {
        "title": "White fish and steamed vegetables",
        "desc": "White fish, vegetables and a small rice portion"
      },
      "dn_4": {
        "title": "Chicken pasta",
        "desc": "Chicken breast, whole wheat pasta and tomato sauce"
      },
      "sn_1": {
        "title": "Protein yogurt and nuts",
        "desc": "Greek yogurt, almonds and berries"
      },
      "sn_2": {
        "title": "Protein shake and banana",
        "desc": "Whey protein shake with banana"
      },
      "sn_3": {
        "title": "Apple with peanut butter",
        "desc": "Apple slices with peanut butter"
      },
      "sn_4": {
        "title": "Cottage cheese cup",
        "desc": "Cottage cheese with fruit"
      }
    }
  },
  "vi": {
    "title": "Dinh dưỡng",
    "subtitle": "Ứng dụng tự gợi ý calo, nước và tỷ lệ dinh dưỡng theo mục tiêu của bạn.",
    "noProfileTitle": "Hoàn tất hồ sơ trước",
    "noProfileText": "Thêm chiều cao, cân nặng và mục tiêu để nhận gợi ý calo, macro và lượng nước phù hợp.",
    "targets": "Mục tiêu hằng ngày",
    "calories": "Calo",
    "water": "Nước",
    "macros": "Tỷ lệ macro",
    "protein": "Đạm",
    "carbs": "Carb",
    "fats": "Chất béo",
    "sampleMeals": "Thực đơn mẫu",
    "tips": "Lời khuyên",
    "advancedTitle": "Phân tích dinh dưỡng chuyên nghiệp",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Điều chỉnh",
    "kcalPerDay": "kcal/ngày",
    "mealSplit": "Chia calo theo bữa",
    "hydration": "Lịch uống nước",
    "note": "Lưu ý quan trọng",
    "screenTitle": "Dinh dưỡng",
    "heroStep": "3",
    "heroTitleLine1": "Kế hoạch dinh dưỡng",
    "heroTitleLine2": "cá nhân",
    "dailyGoal": "Mục tiêu hằng ngày",
    "edit": "Chỉnh sửa",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Tỷ lệ macro",
    "carb": "Carb",
    "fat": "Chất béo",
    "viewAll": "Xem tất cả",
    "breakfast": "Bữa sáng",
    "lunch": "Bữa trưa",
    "dinner": "Bữa tối",
    "snack": "Bữa phụ",
    "mealPlan": "Gợi ý bữa ăn",
    "tipFallback": "Uống đủ nước và ưu tiên thực phẩm giàu protein để hỗ trợ phục hồi cơ bắp.",
    "footer1": "Từ hôm nay,",
    "footer2": "phiên bản tốt hơn của bạn",
    "science": "Khoa học",
    "effective": "Hiệu quả",
    "sustainable": "Bền vững",
    "advancedMode": "CHẾ ĐỘ NÂNG CAO",
    "pro": "PRO",
    "advancedMealPlan": "Thực đơn mẫu chuyên sâu",
    "advancedMealPlanKicker": "LỰA CHỌN BỮA ĂN",
    "advancedMealPlanDesc": "Chọn nhiều món khác nhau cho từng bữa trong ngày. Calo và macro được ước tính để bạn dễ lên kế hoạch hơn.",
    "mealGroups": {
      "breakfast": "Lựa chọn bữa sáng",
      "lunch": "Lựa chọn bữa trưa",
      "dinner": "Lựa chọn bữa tối",
      "snack": "Lựa chọn bữa phụ"
    },
    "goals": {
      "lose_weight": "Giảm mỡ",
      "build_muscle": "Tăng cơ",
      "maintain": "Duy trì",
      "recomp": "Tăng cơ giảm mỡ",
      "endurance": "Tăng sức bền",
      "flexibility": "Sức khỏe tổng quát"
    },
    "activity": {
      "sedentary": "Ít vận động",
      "light": "Vận động nhẹ",
      "moderate": "Vận động vừa",
      "active": "Vận động nhiều",
      "very_active": "Vận động rất nhiều"
    },
    "bmiLabels": {
      "under": "Thiếu cân",
      "normal": "Bình thường",
      "over": "Thừa cân",
      "obese": "Béo phì"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • khoảng {{calories}} kcal",
      "lunch": "{{meal}} • khoảng {{calories}} kcal",
      "dinner": "{{meal}} • khoảng {{calories}} kcal",
      "snack": "{{meal}} • khoảng {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "Buổi sáng: uống 500ml sau khi thức dậy",
      "beforeWorkout": "Trước khi tập: uống 300–500ml",
      "duringWorkout": "Trong lúc tập: uống từng ngụm nhỏ mỗi 10–15 phút",
      "evening": "Buổi tối: uống phần nước còn lại để đủ mục tiêu trong ngày"
    },
    "dynamicTips": {
      "protein": "Mục tiêu khoảng {{proteinG}}g đạm mỗi ngày, nên chia đều trong 3–4 bữa.",
      "water": "Uống khoảng {{waterLiters}}L nước mỗi ngày. Ngày nóng hoặc tập nặng nên uống thêm.",
      "fiber": "Cố gắng đạt ít nhất {{fiberG}}g chất xơ từ rau, trái cây, đậu và ngũ cốc nguyên hạt.",
      "lose_weight": "Giữ mức thâm hụt calo vừa phải, không nên cắt calo quá mạnh.",
      "build_muscle": "Kết hợp thặng dư calo nhẹ với tập sức mạnh tăng dần.",
      "recomp": "Ưu tiên đạm và sự đều đặn. Tăng cơ giảm mỡ cần kiên trì theo thời gian.",
      "injured": "Bạn có đánh dấu chấn thương, nên ưu tiên phục hồi và không ăn kiêng quá gắt.",
      "healthNote": "Bạn có ghi chú sức khỏe, hãy xem kế hoạch này như gợi ý chung và điều chỉnh cẩn thận."
    },
    "warnings": {
      "lowCalories": "Mức calo mục tiêu khá thấp. Hãy đảm bảo vẫn đủ đạm, vi chất và thời gian phục hồi.",
      "lowBmi": "BMI đang thấp. Mục tiêu giảm mỡ có thể không phù hợp.",
      "injured": "Có đánh dấu chấn thương: ưu tiên phục hồi, ngủ đủ, uống đủ nước và tập nhẹ hơn.",
      "healthNote": "Có ghi chú sức khỏe: kế hoạch này không thay thế tư vấn y tế."
    },
    "summary": "Kế hoạch {{goalLabel}}: {{calories}} kcal/ngày, {{proteinG}}g đạm, {{carbsG}}g carb, {{fatsG}}g chất béo. Ước tính BMR {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Yến mạch với chuối và bơ đậu phộng",
        "desc": "Yến mạch, chuối, bơ đậu phộng và sữa"
      },
      "bf_2": {
        "title": "Trứng, bánh mì nguyên cám và bơ",
        "desc": "Trứng, bánh mì nguyên cám, bơ và rau xanh"
      },
      "bf_3": {
        "title": "Sữa chua Hy Lạp với trái cây",
        "desc": "Sữa chua Hy Lạp, quả mọng, chuối và granola"
      },
      "bf_4": {
        "title": "Sinh tố protein",
        "desc": "Whey protein, chuối, yến mạch, sữa và bơ đậu phộng"
      },
      "ln_1": {
        "title": "Cơm gà nướng",
        "desc": "Ức gà, cơm, bông cải xanh và dầu ô liu"
      },
      "ln_2": {
        "title": "Bò nạc với khoai lang",
        "desc": "Thịt bò nạc, khoai lang và rau củ"
      },
      "ln_3": {
        "title": "Salad đậu phụ quinoa",
        "desc": "Đậu phụ, quinoa, rau xanh, cà chua và bơ"
      },
      "ln_4": {
        "title": "Cuốn gà tây",
        "desc": "Gà tây cuốn, rau củ và sốt sữa chua"
      },
      "dn_1": {
        "title": "Cá hồi với khoai tây và salad",
        "desc": "Cá hồi, khoai tây luộc và salad xanh"
      },
      "dn_2": {
        "title": "Bò nạc với cơm và rau",
        "desc": "Thịt bò nạc, cơm và rau xanh"
      },
      "dn_3": {
        "title": "Cá trắng và rau hấp",
        "desc": "Cá trắng, rau hấp và một phần cơm nhỏ"
      },
      "dn_4": {
        "title": "Mì Ý gà",
        "desc": "Ức gà, mì nguyên cám và sốt cà chua"
      },
      "sn_1": {
        "title": "Sữa chua protein và hạt",
        "desc": "Sữa chua Hy Lạp, hạnh nhân và quả mọng"
      },
      "sn_2": {
        "title": "Protein shake và chuối",
        "desc": "Whey protein shake với chuối"
      },
      "sn_3": {
        "title": "Táo với bơ đậu phộng",
        "desc": "Táo cắt lát ăn kèm bơ đậu phộng"
      },
      "sn_4": {
        "title": "Phô mai tươi với trái cây",
        "desc": "Phô mai tươi ăn kèm trái cây"
      }
    }
  },
  "es": {
    "title": "Nutrición",
    "subtitle": "La app sugiere calorías, agua y proporciones nutricionales según tu objetivo.",
    "noProfileTitle": "Completa tu perfil primero",
    "noProfileText": "Agrega altura, peso y objetivo para recibir recomendaciones de calorías, macros y agua.",
    "targets": "Objetivos diarios",
    "calories": "Calorías",
    "water": "Agua",
    "macros": "Distribución de macros",
    "protein": "Proteína",
    "carbs": "Carbohidratos",
    "fats": "Grasas",
    "sampleMeals": "Comidas ejemplo",
    "tips": "Consejos",
    "advancedTitle": "Análisis nutricional profesional",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Ajuste",
    "kcalPerDay": "kcal/día",
    "mealSplit": "Distribución de calorías por comida",
    "hydration": "Horario de hidratación",
    "note": "Nota importante",
    "screenTitle": "Nutrición",
    "heroStep": "3",
    "heroTitleLine1": "Plan de nutrición",
    "heroTitleLine2": "personalizado",
    "dailyGoal": "Objetivos diarios",
    "edit": "Editar",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Ratio de macros",
    "carb": "Carb",
    "fat": "Grasa",
    "viewAll": "Ver todo",
    "breakfast": "Desayuno",
    "lunch": "Almuerzo",
    "dinner": "Cena",
    "snack": "Snack",
    "mealPlan": "Sugerencias de comida",
    "tipFallback": "Bebe suficiente agua y prioriza alimentos ricos en proteína.",
    "footer1": "Desde hoy,",
    "footer2": "una mejor versión de ti",
    "science": "Ciencia",
    "effective": "Efectivo",
    "sustainable": "Sostenible",
    "advancedMode": "MODO AVANZADO",
    "pro": "PRO",
    "advancedMealPlan": "Plan de comidas avanzado",
    "advancedMealPlanKicker": "OPCIONES DE COMIDA",
    "advancedMealPlanDesc": "Elige varias comidas para cada momento del día. Las calorías y macros son estimadas para planificar mejor.",
    "mealGroups": {
      "breakfast": "Opciones de desayuno",
      "lunch": "Opciones de almuerzo",
      "dinner": "Opciones de cena",
      "snack": "Opciones de snack"
    },
    "goals": {
      "lose_weight": "Pérdida de grasa",
      "build_muscle": "Ganar músculo",
      "maintain": "Mantener",
      "recomp": "Recomposición corporal",
      "endurance": "Resistencia",
      "flexibility": "Bienestar general"
    },
    "activity": {
      "sedentary": "Sedentario",
      "light": "Actividad ligera",
      "moderate": "Actividad moderada",
      "active": "Activo",
      "very_active": "Muy activo"
    },
    "bmiLabels": {
      "under": "Bajo peso",
      "normal": "Normal",
      "over": "Sobrepeso",
      "obese": "Obesidad"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • aprox. {{calories}} kcal",
      "lunch": "{{meal}} • aprox. {{calories}} kcal",
      "dinner": "{{meal}} • aprox. {{calories}} kcal",
      "snack": "{{meal}} • aprox. {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "Mañana: 500ml al despertar",
      "beforeWorkout": "Antes de entrenar: 300–500ml",
      "duringWorkout": "Durante el entrenamiento: pequeños sorbos cada 10–15 minutos",
      "evening": "Noche: completa el agua restante del objetivo"
    },
    "dynamicTips": {
      "protein": "Apunta a unos {{proteinG}}g de proteína al día y repártela en 3–4 comidas.",
      "water": "Bebe alrededor de {{waterLiters}}L de agua al día. Añade más en días calurosos o entrenamientos intensos.",
      "fiber": "Busca al menos {{fiberG}}g de fibra de verduras, frutas, legumbres y cereales integrales.",
      "lose_weight": "Mantén un déficit calórico moderado. Evita reducir calorías de forma extrema.",
      "build_muscle": "Combina un pequeño superávit calórico con entrenamiento de fuerza progresivo.",
      "recomp": "Prioriza proteína y constancia. La recomposición corporal requiere tiempo.",
      "injured": "Como marcaste una lesión, evita déficits agresivos y prioriza alimentos de recuperación.",
      "healthNote": "Añadiste una nota de salud. Usa este plan como guía general y ajusta con cuidado."
    },
    "warnings": {
      "lowCalories": "Tu objetivo de calorías es bajo. Asegúrate de cubrir proteína, micronutrientes y recuperación.",
      "lowBmi": "El IMC es bajo. Un objetivo de pérdida de grasa puede no ser adecuado.",
      "injured": "Lesión marcada: prioriza recuperación, sueño, hidratación y entrenamiento suave.",
      "healthNote": "Hay una nota de salud: este plan no sustituye el consejo médico."
    },
    "summary": "Plan de {{goalLabel}}: {{calories}} kcal/día, {{proteinG}}g proteína, {{carbsG}}g carbohidratos, {{fatsG}}g grasas. BMR estimado {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Avena con banana y mantequilla de maní",
        "desc": "Avena, banana, mantequilla de maní y leche"
      },
      "bf_2": {
        "title": "Huevos, tostada integral y aguacate",
        "desc": "Huevos, pan integral, aguacate y verduras"
      },
      "bf_3": {
        "title": "Bowl de yogur griego",
        "desc": "Yogur griego, frutos rojos, banana y granola"
      },
      "bf_4": {
        "title": "Batido de proteína",
        "desc": "Proteína whey, banana, avena, leche y mantequilla de maní"
      },
      "ln_1": {
        "title": "Bowl de arroz con pollo a la parrilla",
        "desc": "Pechuga de pollo, arroz, brócoli y aceite de oliva"
      },
      "ln_2": {
        "title": "Carne magra con batata",
        "desc": "Carne magra, batata y verduras mixtas"
      },
      "ln_3": {
        "title": "Ensalada de tofu y quinoa",
        "desc": "Tofu, quinoa, hojas verdes, tomate y aguacate"
      },
      "ln_4": {
        "title": "Wrap de pavo",
        "desc": "Wrap de pavo, verduras y salsa de yogur"
      },
      "dn_1": {
        "title": "Salmón con papas y ensalada",
        "desc": "Salmón, papas hervidas y ensalada verde"
      },
      "dn_2": {
        "title": "Carne magra con arroz y verduras",
        "desc": "Carne magra, arroz y verduras"
      },
      "dn_3": {
        "title": "Pescado blanco y verduras al vapor",
        "desc": "Pescado blanco, verduras y una pequeña porción de arroz"
      },
      "dn_4": {
        "title": "Pasta con pollo",
        "desc": "Pechuga de pollo, pasta integral y salsa de tomate"
      },
      "sn_1": {
        "title": "Yogur proteico y frutos secos",
        "desc": "Yogur griego, almendras y frutos rojos"
      },
      "sn_2": {
        "title": "Batido de proteína y banana",
        "desc": "Batido de whey con banana"
      },
      "sn_3": {
        "title": "Manzana con mantequilla de maní",
        "desc": "Rodajas de manzana con mantequilla de maní"
      },
      "sn_4": {
        "title": "Copa de requesón",
        "desc": "Requesón con fruta"
      }
    }
  },
  "fr": {
    "title": "Nutrition",
    "subtitle": "L’application suggère calories, eau et ratios nutritionnels selon votre objectif.",
    "noProfileTitle": "Complétez d’abord votre profil",
    "noProfileText": "Ajoutez taille, poids et objectif pour obtenir calories, macros et hydratation personnalisées.",
    "targets": "Objectifs quotidiens",
    "calories": "Calories",
    "water": "Eau",
    "macros": "Répartition des macros",
    "protein": "Protéines",
    "carbs": "Glucides",
    "fats": "Lipides",
    "sampleMeals": "Repas exemples",
    "tips": "Conseils",
    "advancedTitle": "Analyse nutritionnelle professionnelle",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Ajustement",
    "kcalPerDay": "kcal/jour",
    "mealSplit": "Répartition des calories par repas",
    "hydration": "Programme d’hydratation",
    "note": "Note importante",
    "screenTitle": "Nutrition",
    "heroStep": "3",
    "heroTitleLine1": "Plan nutritionnel",
    "heroTitleLine2": "personnalisé",
    "dailyGoal": "Objectifs quotidiens",
    "edit": "Modifier",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Ratio macro",
    "carb": "Glucides",
    "fat": "Lipides",
    "viewAll": "Tout voir",
    "breakfast": "Petit-déjeuner",
    "lunch": "Déjeuner",
    "dinner": "Dîner",
    "snack": "Collation",
    "mealPlan": "Suggestions de repas",
    "tipFallback": "Buvez suffisamment d’eau et privilégiez les aliments riches en protéines.",
    "footer1": "Dès aujourd’hui,",
    "footer2": "une meilleure version de vous",
    "science": "Science",
    "effective": "Efficace",
    "sustainable": "Durable",
    "advancedMode": "MODE AVANCÉ",
    "pro": "PRO",
    "advancedMealPlan": "Plan de repas avancé",
    "advancedMealPlanKicker": "OPTIONS DE REPAS",
    "advancedMealPlanDesc": "Choisissez plusieurs repas pour chaque moment de la journée. Les calories et macros sont estimées pour mieux planifier.",
    "mealGroups": {
      "breakfast": "Options de petit-déjeuner",
      "lunch": "Options de déjeuner",
      "dinner": "Options de dîner",
      "snack": "Options de collation"
    },
    "goals": {
      "lose_weight": "Perte de graisse",
      "build_muscle": "Prise de muscle",
      "maintain": "Maintien",
      "recomp": "Recomposition corporelle",
      "endurance": "Endurance",
      "flexibility": "Bien-être général"
    },
    "activity": {
      "sedentary": "Sédentaire",
      "light": "Activité légère",
      "moderate": "Activité modérée",
      "active": "Actif",
      "very_active": "Très actif"
    },
    "bmiLabels": {
      "under": "Insuffisance pondérale",
      "normal": "Normal",
      "over": "Surpoids",
      "obese": "Obésité"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • env. {{calories}} kcal",
      "lunch": "{{meal}} • env. {{calories}} kcal",
      "dinner": "{{meal}} • env. {{calories}} kcal",
      "snack": "{{meal}} • env. {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "Matin : 500ml après le réveil",
      "beforeWorkout": "Avant l’entraînement : 300–500ml",
      "duringWorkout": "Pendant l’entraînement : petites gorgées toutes les 10–15 minutes",
      "evening": "Soir : terminez le reste de votre objectif d’eau"
    },
    "dynamicTips": {
      "protein": "Visez environ {{proteinG}}g de protéines par jour, réparties sur 3–4 repas.",
      "water": "Buvez environ {{waterLiters}}L d’eau par jour. Ajoutez-en plus par temps chaud ou entraînement intense.",
      "fiber": "Visez au moins {{fiberG}}g de fibres via légumes, fruits, légumineuses et céréales complètes.",
      "lose_weight": "Gardez un déficit calorique modéré. Évitez de couper trop fortement les calories.",
      "build_muscle": "Associez un léger surplus calorique à un entraînement de force progressif.",
      "recomp": "Priorisez les protéines et la régularité. La recomposition demande du temps.",
      "injured": "Comme vous avez indiqué une blessure, évitez les déficits agressifs et priorisez la récupération.",
      "healthNote": "Vous avez ajouté une note de santé. Considérez ce plan comme une guidance générale."
    },
    "warnings": {
      "lowCalories": "Votre objectif calorique est bas. Assurez-vous d’avoir assez de protéines, micronutriments et récupération.",
      "lowBmi": "L’IMC est bas. Un objectif de perte de graisse peut ne pas être adapté.",
      "injured": "Blessure indiquée : priorisez récupération, sommeil, hydratation et entraînement doux.",
      "healthNote": "Note de santé détectée : ce plan ne remplace pas un avis médical."
    },
    "summary": "Plan {{goalLabel}} : {{calories}} kcal/jour, {{proteinG}}g protéines, {{carbsG}}g glucides, {{fatsG}}g lipides. BMR estimé {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Flocons d’avoine avec banane et beurre de cacahuète",
        "desc": "Avoine, banane, beurre de cacahuète et lait"
      },
      "bf_2": {
        "title": "Œufs, pain complet et avocat",
        "desc": "Œufs, pain complet, avocat et légumes"
      },
      "bf_3": {
        "title": "Bol de yaourt grec",
        "desc": "Yaourt grec, fruits rouges, banane et granola"
      },
      "bf_4": {
        "title": "Smoothie protéiné",
        "desc": "Whey, banane, avoine, lait et beurre de cacahuète"
      },
      "ln_1": {
        "title": "Bol riz et poulet grillé",
        "desc": "Blanc de poulet, riz, brocoli et huile d’olive"
      },
      "ln_2": {
        "title": "Bœuf maigre et patate douce",
        "desc": "Bœuf maigre, patate douce et légumes"
      },
      "ln_3": {
        "title": "Salade tofu quinoa",
        "desc": "Tofu, quinoa, verdure, tomates et avocat"
      },
      "ln_4": {
        "title": "Wrap de dinde",
        "desc": "Wrap de dinde, légumes et sauce yaourt"
      },
      "dn_1": {
        "title": "Saumon, pommes de terre et salade",
        "desc": "Saumon, pommes de terre bouillies et salade verte"
      },
      "dn_2": {
        "title": "Bœuf maigre avec riz et légumes",
        "desc": "Bœuf maigre, riz et légumes"
      },
      "dn_3": {
        "title": "Poisson blanc et légumes vapeur",
        "desc": "Poisson blanc, légumes et petite portion de riz"
      },
      "dn_4": {
        "title": "Pâtes au poulet",
        "desc": "Blanc de poulet, pâtes complètes et sauce tomate"
      },
      "sn_1": {
        "title": "Yaourt protéiné et noix",
        "desc": "Yaourt grec, amandes et fruits rouges"
      },
      "sn_2": {
        "title": "Shake protéiné et banane",
        "desc": "Shake whey avec banane"
      },
      "sn_3": {
        "title": "Pomme au beurre de cacahuète",
        "desc": "Tranches de pomme avec beurre de cacahuète"
      },
      "sn_4": {
        "title": "Bol de cottage cheese",
        "desc": "Cottage cheese avec fruit"
      }
    }
  },
  "de": {
    "title": "Ernährung",
    "subtitle": "Die App empfiehlt Kalorien, Wasser und Nährstoffverteilung passend zu deinem Ziel.",
    "noProfileTitle": "Bitte zuerst Profil vervollständigen",
    "noProfileText": "Gib Größe, Gewicht und Ziel ein, um personalisierte Kalorien-, Makro- und Wasserziele zu erhalten.",
    "targets": "Tagesziele",
    "calories": "Kalorien",
    "water": "Wasser",
    "macros": "Makroverteilung",
    "protein": "Protein",
    "carbs": "Kohlenhydrate",
    "fats": "Fette",
    "sampleMeals": "Beispielmahlzeiten",
    "tips": "Tipps",
    "advancedTitle": "Professionelle Ernährungsanalyse",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Anpassung",
    "kcalPerDay": "kcal/Tag",
    "mealSplit": "Kalorienverteilung pro Mahlzeit",
    "hydration": "Trinkplan",
    "note": "Wichtiger Hinweis",
    "screenTitle": "Ernährung",
    "heroStep": "3",
    "heroTitleLine1": "Personalisierter",
    "heroTitleLine2": "Ernährungsplan",
    "dailyGoal": "Tagesziele",
    "edit": "Bearbeiten",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Makro-Verhältnis",
    "carb": "Kohlenhydrate",
    "fat": "Fett",
    "viewAll": "Alle ansehen",
    "breakfast": "Frühstück",
    "lunch": "Mittagessen",
    "dinner": "Abendessen",
    "snack": "Snack",
    "mealPlan": "Mahlzeitenvorschläge",
    "tipFallback": "Trinke genug Wasser und bevorzuge proteinreiche Lebensmittel.",
    "footer1": "Ab heute,",
    "footer2": "eine bessere Version von dir",
    "science": "Wissenschaft",
    "effective": "Effektiv",
    "sustainable": "Nachhaltig",
    "advancedMode": "ERWEITERTER MODUS",
    "pro": "PRO",
    "advancedMealPlan": "Erweiterter Ernährungsplan",
    "advancedMealPlanKicker": "MAHLZEITENOPTIONEN",
    "advancedMealPlanDesc": "Wähle mehrere Mahlzeiten für jede Tageszeit. Kalorien und Makros sind geschätzt.",
    "mealGroups": {
      "breakfast": "Frühstücksoptionen",
      "lunch": "Mittagsoptionen",
      "dinner": "Abendessen-Optionen",
      "snack": "Snack-Optionen"
    },
    "goals": {
      "lose_weight": "Fettabbau",
      "build_muscle": "Muskelaufbau",
      "maintain": "Erhalten",
      "recomp": "Körperrekomposition",
      "endurance": "Ausdauer",
      "flexibility": "Allgemeines Wohlbefinden"
    },
    "activity": {
      "sedentary": "Sitzend",
      "light": "Leichte Aktivität",
      "moderate": "Moderate Aktivität",
      "active": "Aktiv",
      "very_active": "Sehr aktiv"
    },
    "bmiLabels": {
      "under": "Untergewicht",
      "normal": "Normal",
      "over": "Übergewicht",
      "obese": "Adipositas"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • ca. {{calories}} kcal",
      "lunch": "{{meal}} • ca. {{calories}} kcal",
      "dinner": "{{meal}} • ca. {{calories}} kcal",
      "snack": "{{meal}} • ca. {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "Morgens: 500ml nach dem Aufstehen",
      "beforeWorkout": "Vor dem Training: 300–500ml",
      "duringWorkout": "Während des Trainings: kleine Schlucke alle 10–15 Minuten",
      "evening": "Abends: restliches Wasserziel erreichen"
    },
    "dynamicTips": {
      "protein": "Ziele auf etwa {{proteinG}}g Protein pro Tag, verteilt auf 3–4 Mahlzeiten.",
      "water": "Trinke etwa {{waterLiters}}L Wasser täglich. An heißen oder intensiven Trainingstagen mehr.",
      "fiber": "Ziele auf mindestens {{fiberG}}g Ballaststoffe aus Gemüse, Obst, Hülsenfrüchten und Vollkorn.",
      "lose_weight": "Halte ein moderates Kaloriendefizit. Kürze Kalorien nicht zu aggressiv.",
      "build_muscle": "Kombiniere einen kleinen Kalorienüberschuss mit progressivem Krafttraining.",
      "recomp": "Priorisiere Protein und Konstanz. Körperrekomposition braucht Zeit.",
      "injured": "Da du eine Verletzung markiert hast, vermeide aggressive Defizite und priorisiere Erholung.",
      "healthNote": "Du hast eine Gesundheitsnotiz hinzugefügt. Nutze diesen Plan als allgemeine Orientierung."
    },
    "warnings": {
      "lowCalories": "Dein Kalorienziel ist niedrig. Achte auf genug Protein, Mikronährstoffe und Erholung.",
      "lowBmi": "Der BMI ist niedrig. Fettabbau ist möglicherweise nicht geeignet.",
      "injured": "Verletzung markiert: Erholung, Schlaf, Hydration und gelenkschonendes Training priorisieren.",
      "healthNote": "Gesundheitsnotiz erkannt: Dieser Plan ersetzt keine medizinische Beratung."
    },
    "summary": "{{goalLabel}}-Plan: {{calories}} kcal/Tag, {{proteinG}}g Protein, {{carbsG}}g Kohlenhydrate, {{fatsG}}g Fette. Geschätzter BMR {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Haferflocken mit Banane und Erdnussbutter",
        "desc": "Hafer, Banane, Erdnussbutter und Milch"
      },
      "bf_2": {
        "title": "Eier, Vollkorntoast und Avocado",
        "desc": "Eier, Vollkorntoast, Avocado und Gemüse"
      },
      "bf_3": {
        "title": "Griechischer Joghurt-Bowl",
        "desc": "Griechischer Joghurt, Beeren, Banane und Granola"
      },
      "bf_4": {
        "title": "Protein-Smoothie",
        "desc": "Whey, Banane, Hafer, Milch und Erdnussbutter"
      },
      "ln_1": {
        "title": "Reis-Bowl mit gegrilltem Hähnchen",
        "desc": "Hähnchenbrust, Reis, Brokkoli und Olivenöl"
      },
      "ln_2": {
        "title": "Mageres Rind mit Süßkartoffel",
        "desc": "Mageres Rind, Süßkartoffel und Gemüse"
      },
      "ln_3": {
        "title": "Tofu-Quinoa-Salat",
        "desc": "Tofu, Quinoa, Grünzeug, Tomaten und Avocado"
      },
      "ln_4": {
        "title": "Puten-Wrap",
        "desc": "Puten-Wrap, Gemüse und Joghurt-Dip"
      },
      "dn_1": {
        "title": "Lachs mit Kartoffeln und Salat",
        "desc": "Lachs, gekochte Kartoffeln und grüner Salat"
      },
      "dn_2": {
        "title": "Mageres Rind mit Reis und Gemüse",
        "desc": "Mageres Rind, Reis und Gemüse"
      },
      "dn_3": {
        "title": "Weißfisch und gedämpftes Gemüse",
        "desc": "Weißfisch, Gemüse und kleine Reisportion"
      },
      "dn_4": {
        "title": "Hähnchen-Pasta",
        "desc": "Hähnchenbrust, Vollkornpasta und Tomatensoße"
      },
      "sn_1": {
        "title": "Protein-Joghurt und Nüsse",
        "desc": "Griechischer Joghurt, Mandeln und Beeren"
      },
      "sn_2": {
        "title": "Proteinshake und Banane",
        "desc": "Whey-Shake mit Banane"
      },
      "sn_3": {
        "title": "Apfel mit Erdnussbutter",
        "desc": "Apfelscheiben mit Erdnussbutter"
      },
      "sn_4": {
        "title": "Hüttenkäse-Becher",
        "desc": "Hüttenkäse mit Obst"
      }
    }
  },
  "zh": {
    "title": "营养",
    "subtitle": "应用会根据你的目标推荐热量、水分和营养比例。",
    "noProfileTitle": "请先完善个人资料",
    "noProfileText": "添加身高、体重和目标后即可获得个性化热量、宏量营养和饮水目标。",
    "targets": "每日目标",
    "calories": "热量",
    "water": "水",
    "macros": "宏量营养分配",
    "protein": "蛋白质",
    "carbs": "碳水",
    "fats": "脂肪",
    "sampleMeals": "示例餐单",
    "tips": "建议",
    "advancedTitle": "专业营养分析",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "调整",
    "kcalPerDay": "kcal/天",
    "mealSplit": "每餐热量分配",
    "hydration": "饮水计划",
    "note": "重要提示",
    "screenTitle": "营养",
    "heroStep": "3",
    "heroTitleLine1": "个性化",
    "heroTitleLine2": "营养计划",
    "dailyGoal": "每日目标",
    "edit": "编辑",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "宏量比例",
    "carb": "碳水",
    "fat": "脂肪",
    "viewAll": "查看全部",
    "breakfast": "早餐",
    "lunch": "午餐",
    "dinner": "晚餐",
    "snack": "加餐",
    "mealPlan": "餐食建议",
    "tipFallback": "多喝水，并优先选择高蛋白食物以帮助肌肉恢复。",
    "footer1": "从今天开始，",
    "footer2": "成为更好的自己",
    "science": "科学",
    "effective": "有效",
    "sustainable": "可持续",
    "advancedMode": "高级模式",
    "pro": "PRO",
    "advancedMealPlan": "高级餐单计划",
    "advancedMealPlanKicker": "餐食选项",
    "advancedMealPlanDesc": "为每天不同时间选择多种餐食。热量和宏量营养为估算值，便于规划。",
    "mealGroups": {
      "breakfast": "早餐选项",
      "lunch": "午餐选项",
      "dinner": "晚餐选项",
      "snack": "加餐选项"
    },
    "goals": {
      "lose_weight": "减脂",
      "build_muscle": "增肌",
      "maintain": "维持",
      "recomp": "身体重组",
      "endurance": "耐力",
      "flexibility": "综合健康"
    },
    "activity": {
      "sedentary": "久坐",
      "light": "轻度活动",
      "moderate": "中等活动",
      "active": "活跃",
      "very_active": "非常活跃"
    },
    "bmiLabels": {
      "under": "偏瘦",
      "normal": "正常",
      "over": "超重",
      "obese": "肥胖"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • 约 {{calories}} kcal",
      "lunch": "{{meal}} • 约 {{calories}} kcal",
      "dinner": "{{meal}} • 约 {{calories}} kcal",
      "snack": "{{meal}} • 约 {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "早上：醒来后喝500ml水",
      "beforeWorkout": "训练前：喝300–500ml水",
      "duringWorkout": "训练中：每10–15分钟小口喝水",
      "evening": "晚上：完成剩余饮水目标"
    },
    "dynamicTips": {
      "protein": "每天目标约 {{proteinG}}g 蛋白质，分配到3–4餐。",
      "water": "每天喝约 {{waterLiters}}L 水。炎热或高强度训练日可增加。",
      "fiber": "从蔬菜、水果、豆类和全谷物中摄入至少 {{fiberG}}g 膳食纤维。",
      "lose_weight": "保持适度热量缺口，避免过度节食。",
      "build_muscle": "将小幅热量盈余与渐进式力量训练结合。",
      "recomp": "优先蛋白质和坚持，身体重组需要时间。",
      "injured": "你标记了伤病，请避免激进热量缺口并优先恢复饮食。",
      "healthNote": "你添加了健康备注，请将本计划作为一般参考并谨慎调整。"
    },
    "warnings": {
      "lowCalories": "你的目标热量较低，请确保足够蛋白质、微量营养和恢复。",
      "lowBmi": "BMI偏低，减脂目标可能不适合。",
      "injured": "已标记伤病：优先恢复、睡眠、补水和低冲击训练。",
      "healthNote": "检测到健康备注：本计划不能替代医疗建议。"
    },
    "summary": "{{goalLabel}}计划：{{calories}} kcal/天，{{proteinG}}g蛋白质，{{carbsG}}g碳水，{{fatsG}}g脂肪。估算BMR {{bmr}}，TDEE {{tdee}}。",
    "mealOptions": {
      "bf_1": {
        "title": "香蕉花生酱燕麦",
        "desc": "燕麦、香蕉、花生酱和牛奶"
      },
      "bf_2": {
        "title": "鸡蛋、全麦吐司和牛油果",
        "desc": "鸡蛋、全麦吐司、牛油果和蔬菜"
      },
      "bf_3": {
        "title": "希腊酸奶碗",
        "desc": "希腊酸奶、浆果、香蕉和格兰诺拉"
      },
      "bf_4": {
        "title": "蛋白奶昔",
        "desc": "乳清蛋白、香蕉、燕麦、牛奶和花生酱"
      },
      "ln_1": {
        "title": "烤鸡米饭碗",
        "desc": "鸡胸肉、米饭、西兰花和橄榄油"
      },
      "ln_2": {
        "title": "瘦牛肉配红薯",
        "desc": "瘦牛肉、红薯和混合蔬菜"
      },
      "ln_3": {
        "title": "豆腐藜麦沙拉",
        "desc": "豆腐、藜麦、绿叶菜、番茄和牛油果"
      },
      "ln_4": {
        "title": "火鸡肉卷",
        "desc": "火鸡肉卷、蔬菜和酸奶酱"
      },
      "dn_1": {
        "title": "三文鱼配土豆和沙拉",
        "desc": "三文鱼、水煮土豆和绿色沙拉"
      },
      "dn_2": {
        "title": "瘦牛肉配米饭和蔬菜",
        "desc": "瘦牛肉、米饭和蔬菜"
      },
      "dn_3": {
        "title": "白鱼和蒸蔬菜",
        "desc": "白鱼、蔬菜和少量米饭"
      },
      "dn_4": {
        "title": "鸡肉意面",
        "desc": "鸡胸肉、全麦意面和番茄酱"
      },
      "sn_1": {
        "title": "高蛋白酸奶和坚果",
        "desc": "希腊酸奶、杏仁和浆果"
      },
      "sn_2": {
        "title": "蛋白奶昔和香蕉",
        "desc": "乳清蛋白奶昔配香蕉"
      },
      "sn_3": {
        "title": "苹果配花生酱",
        "desc": "苹果片配花生酱"
      },
      "sn_4": {
        "title": "茅屋奶酪杯",
        "desc": "茅屋奶酪配水果"
      }
    }
  },
  "ja": {
    "title": "栄養",
    "subtitle": "目標に合わせてカロリー、水分、栄養バランスを提案します。",
    "noProfileTitle": "先にプロフィールを完成してください",
    "noProfileText": "身長、体重、目標を入力すると、カロリー・マクロ・水分目標を提案します。",
    "targets": "毎日の目標",
    "calories": "カロリー",
    "water": "水分",
    "macros": "マクロ配分",
    "protein": "タンパク質",
    "carbs": "炭水化物",
    "fats": "脂質",
    "sampleMeals": "食事例",
    "tips": "アドバイス",
    "advancedTitle": "専門的な栄養分析",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "調整",
    "kcalPerDay": "kcal/日",
    "mealSplit": "食事ごとのカロリー配分",
    "hydration": "水分補給スケジュール",
    "note": "重要な注意",
    "screenTitle": "栄養",
    "heroStep": "3",
    "heroTitleLine1": "パーソナル",
    "heroTitleLine2": "栄養プラン",
    "dailyGoal": "毎日の目標",
    "edit": "編集",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "マクロ比率",
    "carb": "炭水化物",
    "fat": "脂質",
    "viewAll": "すべて表示",
    "breakfast": "朝食",
    "lunch": "昼食",
    "dinner": "夕食",
    "snack": "間食",
    "mealPlan": "食事提案",
    "tipFallback": "十分な水分と高タンパク食品を優先しましょう。",
    "footer1": "今日から、",
    "footer2": "より良い自分へ",
    "science": "科学的",
    "effective": "効果的",
    "sustainable": "継続可能",
    "advancedMode": "詳細モード",
    "pro": "PRO",
    "advancedMealPlan": "詳細食事プラン",
    "advancedMealPlanKicker": "食事オプション",
    "advancedMealPlanDesc": "1日の各時間帯に複数の食事候補を選べます。カロリーとマクロは目安です。",
    "mealGroups": {
      "breakfast": "朝食オプション",
      "lunch": "昼食オプション",
      "dinner": "夕食オプション",
      "snack": "間食オプション"
    },
    "goals": {
      "lose_weight": "脂肪減少",
      "build_muscle": "筋肉増量",
      "maintain": "維持",
      "recomp": "ボディリコンポジション",
      "endurance": "持久力",
      "flexibility": "総合的な健康"
    },
    "activity": {
      "sedentary": "座りがち",
      "light": "軽い活動",
      "moderate": "中程度の活動",
      "active": "活動的",
      "very_active": "非常に活動的"
    },
    "bmiLabels": {
      "under": "低体重",
      "normal": "標準",
      "over": "過体重",
      "obese": "肥満"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • 約 {{calories}} kcal",
      "lunch": "{{meal}} • 約 {{calories}} kcal",
      "dinner": "{{meal}} • 約 {{calories}} kcal",
      "snack": "{{meal}} • 約 {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "朝：起床後に500ml",
      "beforeWorkout": "運動前：300–500ml",
      "duringWorkout": "運動中：10–15分ごとに少しずつ",
      "evening": "夜：残りの水分目標を達成"
    },
    "dynamicTips": {
      "protein": "1日約 {{proteinG}}g のタンパク質を3〜4食に分けましょう。",
      "water": "1日約 {{waterLiters}}L の水分を摂りましょう。暑い日や強い運動の日は追加しましょう。",
      "fiber": "野菜、果物、豆類、全粒穀物から少なくとも {{fiberG}}g の食物繊維を目指しましょう。",
      "lose_weight": "適度なカロリー赤字を保ち、極端な制限は避けましょう。",
      "build_muscle": "小さなカロリー余剰と漸進的な筋力トレーニングを組み合わせましょう。",
      "recomp": "タンパク質と継続性を優先しましょう。体の再構成には時間が必要です。",
      "injured": "けがを記録しているため、無理な食事制限を避け、回復を優先しましょう。",
      "healthNote": "健康メモがあります。このプランは一般的な目安として慎重に調整してください。"
    },
    "warnings": {
      "lowCalories": "目標カロリーが低めです。タンパク質、微量栄養素、回復を確保してください。",
      "lowBmi": "BMIが低いです。脂肪減少目標は適さない可能性があります。",
      "injured": "けがあり：回復、睡眠、水分補給、関節にやさしい運動を優先してください。",
      "healthNote": "健康メモがあります。このプランは医療アドバイスではありません。"
    },
    "summary": "{{goalLabel}}プラン：{{calories}} kcal/日、タンパク質{{proteinG}}g、炭水化物{{carbsG}}g、脂質{{fatsG}}g。推定BMR {{bmr}}、TDEE {{tdee}}。",
    "mealOptions": {
      "bf_1": {
        "title": "バナナとピーナッツバターのオートミール",
        "desc": "オーツ、バナナ、ピーナッツバター、牛乳"
      },
      "bf_2": {
        "title": "卵・全粒トースト・アボカド",
        "desc": "卵、全粒パン、アボカド、野菜"
      },
      "bf_3": {
        "title": "ギリシャヨーグルトボウル",
        "desc": "ギリシャヨーグルト、ベリー、バナナ、グラノーラ"
      },
      "bf_4": {
        "title": "プロテインスムージー",
        "desc": "ホエイ、バナナ、オーツ、牛乳、ピーナッツバター"
      },
      "ln_1": {
        "title": "グリルチキンライスボウル",
        "desc": "鶏むね肉、米、ブロッコリー、オリーブオイル"
      },
      "ln_2": {
        "title": "赤身牛肉とさつまいも",
        "desc": "赤身牛肉、さつまいも、野菜"
      },
      "ln_3": {
        "title": "豆腐キヌアサラダ",
        "desc": "豆腐、キヌア、葉野菜、トマト、アボカド"
      },
      "ln_4": {
        "title": "ターキーラップ",
        "desc": "ターキーラップ、野菜、ヨーグルトディップ"
      },
      "dn_1": {
        "title": "サーモンとポテト、サラダ",
        "desc": "サーモン、ゆでじゃがいも、グリーンサラダ"
      },
      "dn_2": {
        "title": "赤身牛肉と米、野菜",
        "desc": "赤身牛肉、米、野菜"
      },
      "dn_3": {
        "title": "白身魚と蒸し野菜",
        "desc": "白身魚、野菜、少量の米"
      },
      "dn_4": {
        "title": "チキンパスタ",
        "desc": "鶏むね肉、全粒パスタ、トマトソース"
      },
      "sn_1": {
        "title": "プロテインヨーグルトとナッツ",
        "desc": "ギリシャヨーグルト、アーモンド、ベリー"
      },
      "sn_2": {
        "title": "プロテインシェイクとバナナ",
        "desc": "ホエイシェイクとバナナ"
      },
      "sn_3": {
        "title": "リンゴとピーナッツバター",
        "desc": "リンゴスライスとピーナッツバター"
      },
      "sn_4": {
        "title": "カッテージチーズカップ",
        "desc": "カッテージチーズと果物"
      }
    }
  },
  "ko": {
    "title": "영양",
    "subtitle": "목표에 따라 칼로리, 수분, 영양 비율을 추천합니다.",
    "noProfileTitle": "먼저 프로필을 완성하세요",
    "noProfileText": "키, 체중, 목표를 입력하면 맞춤 칼로리, 매크로, 수분 목표를 제공합니다.",
    "targets": "일일 목표",
    "calories": "칼로리",
    "water": "물",
    "macros": "매크로 분배",
    "protein": "단백질",
    "carbs": "탄수화물",
    "fats": "지방",
    "sampleMeals": "샘플 식단",
    "tips": "조언",
    "advancedTitle": "전문 영양 분석",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "조정",
    "kcalPerDay": "kcal/일",
    "mealSplit": "식사별 칼로리 분배",
    "hydration": "수분 섭취 일정",
    "note": "중요 안내",
    "screenTitle": "영양",
    "heroStep": "3",
    "heroTitleLine1": "개인 맞춤",
    "heroTitleLine2": "영양 계획",
    "dailyGoal": "일일 목표",
    "edit": "수정",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "매크로 비율",
    "carb": "탄수화물",
    "fat": "지방",
    "viewAll": "전체 보기",
    "breakfast": "아침",
    "lunch": "점심",
    "dinner": "저녁",
    "snack": "간식",
    "mealPlan": "식단 제안",
    "tipFallback": "충분한 물과 단백질이 풍부한 음식을 우선하세요.",
    "footer1": "오늘부터,",
    "footer2": "더 나은 나",
    "science": "과학적",
    "effective": "효과적",
    "sustainable": "지속 가능",
    "advancedMode": "고급 모드",
    "pro": "PRO",
    "advancedMealPlan": "고급 식단 계획",
    "advancedMealPlanKicker": "식사 옵션",
    "advancedMealPlanDesc": "하루 각 시간대별로 여러 식사를 선택하세요. 칼로리와 매크로는 계획을 돕기 위한 추정치입니다.",
    "mealGroups": {
      "breakfast": "아침 옵션",
      "lunch": "점심 옵션",
      "dinner": "저녁 옵션",
      "snack": "간식 옵션"
    },
    "goals": {
      "lose_weight": "체지방 감량",
      "build_muscle": "근육 증가",
      "maintain": "유지",
      "recomp": "바디 리컴프",
      "endurance": "지구력",
      "flexibility": "전반적 건강"
    },
    "activity": {
      "sedentary": "좌식",
      "light": "가벼운 활동",
      "moderate": "보통 활동",
      "active": "활동적",
      "very_active": "매우 활동적"
    },
    "bmiLabels": {
      "under": "저체중",
      "normal": "정상",
      "over": "과체중",
      "obese": "비만"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • 약 {{calories}} kcal",
      "lunch": "{{meal}} • 약 {{calories}} kcal",
      "dinner": "{{meal}} • 약 {{calories}} kcal",
      "snack": "{{meal}} • 약 {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "아침: 기상 후 500ml",
      "beforeWorkout": "운동 전: 300–500ml",
      "duringWorkout": "운동 중: 10–15분마다 조금씩 마시기",
      "evening": "저녁: 남은 수분 목표 채우기"
    },
    "dynamicTips": {
      "protein": "하루 약 {{proteinG}}g 단백질을 3–4끼로 나누어 섭취하세요.",
      "water": "하루 약 {{waterLiters}}L 물을 마시세요. 더운 날이나 강한 운동일에는 더 마시세요.",
      "fiber": "채소, 과일, 콩류, 통곡물에서 최소 {{fiberG}}g 식이섬유를 목표로 하세요.",
      "lose_weight": "적당한 칼로리 적자를 유지하고 과도한 제한은 피하세요.",
      "build_muscle": "작은 칼로리 흑자와 점진적 근력 훈련을 결합하세요.",
      "recomp": "단백질과 꾸준함을 우선하세요. 리컴프는 시간이 필요합니다.",
      "injured": "부상이 표시되어 있으므로 과도한 적자를 피하고 회복 식단을 우선하세요.",
      "healthNote": "건강 메모가 있습니다. 이 계획은 일반 가이드로 보고 조심스럽게 조정하세요."
    },
    "warnings": {
      "lowCalories": "목표 칼로리가 낮습니다. 단백질, 미량영양소, 회복을 충분히 챙기세요.",
      "lowBmi": "BMI가 낮습니다. 체지방 감량 목표가 적합하지 않을 수 있습니다.",
      "injured": "부상 표시: 회복, 수면, 수분, 관절 친화적 운동을 우선하세요.",
      "healthNote": "건강 메모가 감지되었습니다. 이 계획은 의료 조언이 아닙니다."
    },
    "summary": "{{goalLabel}} 계획: {{calories}} kcal/일, 단백질 {{proteinG}}g, 탄수화물 {{carbsG}}g, 지방 {{fatsG}}g. 예상 BMR {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "바나나와 땅콩버터 오트밀",
        "desc": "오트, 바나나, 땅콩버터, 우유"
      },
      "bf_2": {
        "title": "달걀, 통곡물 토스트와 아보카도",
        "desc": "달걀, 통곡물 토스트, 아보카도, 채소"
      },
      "bf_3": {
        "title": "그릭요거트 볼",
        "desc": "그릭요거트, 베리, 바나나, 그래놀라"
      },
      "bf_4": {
        "title": "단백질 스무디",
        "desc": "웨이, 바나나, 오트, 우유, 땅콩버터"
      },
      "ln_1": {
        "title": "그릴 치킨 라이스 볼",
        "desc": "닭가슴살, 밥, 브로콜리, 올리브오일"
      },
      "ln_2": {
        "title": "살코기 소고기와 고구마",
        "desc": "살코기 소고기, 고구마, 혼합 채소"
      },
      "ln_3": {
        "title": "두부 퀴노아 샐러드",
        "desc": "두부, 퀴노아, 채소, 토마토, 아보카도"
      },
      "ln_4": {
        "title": "터키 랩",
        "desc": "터키 랩, 채소, 요거트 딥"
      },
      "dn_1": {
        "title": "연어, 감자와 샐러드",
        "desc": "연어, 삶은 감자, 그린 샐러드"
      },
      "dn_2": {
        "title": "살코기 소고기, 밥과 채소",
        "desc": "살코기 소고기, 밥, 채소"
      },
      "dn_3": {
        "title": "흰살생선과 찐 채소",
        "desc": "흰살생선, 채소, 소량의 밥"
      },
      "dn_4": {
        "title": "치킨 파스타",
        "desc": "닭가슴살, 통밀 파스타, 토마토소스"
      },
      "sn_1": {
        "title": "단백질 요거트와 견과류",
        "desc": "그릭요거트, 아몬드, 베리"
      },
      "sn_2": {
        "title": "단백질 쉐이크와 바나나",
        "desc": "웨이 쉐이크와 바나나"
      },
      "sn_3": {
        "title": "사과와 땅콩버터",
        "desc": "사과 슬라이스와 땅콩버터"
      },
      "sn_4": {
        "title": "코티지치즈 컵",
        "desc": "코티지치즈와 과일"
      }
    }
  },
  "ru": {
    "title": "Питание",
    "subtitle": "Приложение подбирает калории, воду и нутриенты под вашу цель.",
    "noProfileTitle": "Сначала заполните профиль",
    "noProfileText": "Добавьте рост, вес и цель, чтобы получить персональные рекомендации.",
    "targets": "Дневные цели",
    "calories": "Калории",
    "water": "Вода",
    "macros": "Баланс макро",
    "protein": "Белок",
    "carbs": "Углеводы",
    "fats": "Жиры",
    "sampleMeals": "Примеры блюд",
    "tips": "Советы",
    "advancedTitle": "Профессиональный анализ питания",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Корректировка",
    "kcalPerDay": "ккал/день",
    "mealSplit": "Калории по приёмам пищи",
    "hydration": "График воды",
    "note": "Важное примечание",
    "screenTitle": "Питание",
    "heroStep": "3",
    "heroTitleLine1": "Персональный",
    "heroTitleLine2": "план питания",
    "dailyGoal": "Дневные цели",
    "edit": "Изменить",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Макро-соотношение",
    "carb": "Углеводы",
    "fat": "Жиры",
    "viewAll": "Смотреть все",
    "breakfast": "Завтрак",
    "lunch": "Обед",
    "dinner": "Ужин",
    "snack": "Перекус",
    "mealPlan": "Рекомендации блюд",
    "tipFallback": "Пейте достаточно воды и выбирайте продукты с высоким содержанием белка.",
    "footer1": "С сегодняшнего дня,",
    "footer2": "лучшая версия вас",
    "science": "Наука",
    "effective": "Эффективно",
    "sustainable": "Устойчиво",
    "advancedMode": "РАСШИРЕННЫЙ РЕЖИМ",
    "pro": "PRO",
    "advancedMealPlan": "Расширенный план питания",
    "advancedMealPlanKicker": "ВАРИАНТЫ БЛЮД",
    "advancedMealPlanDesc": "Выберите несколько блюд для каждого времени дня. Калории и макро рассчитаны примерно.",
    "mealGroups": {
      "breakfast": "Варианты завтрака",
      "lunch": "Варианты обеда",
      "dinner": "Варианты ужина",
      "snack": "Варианты перекуса"
    },
    "goals": {
      "lose_weight": "Снижение жира",
      "build_muscle": "Набор мышц",
      "maintain": "Поддержание",
      "recomp": "Рекомпозиция тела",
      "endurance": "Выносливость",
      "flexibility": "Общее здоровье"
    },
    "activity": {
      "sedentary": "Сидячий образ",
      "light": "Лёгкая активность",
      "moderate": "Умеренная активность",
      "active": "Активный",
      "very_active": "Очень активный"
    },
    "bmiLabels": {
      "under": "Недостаточный вес",
      "normal": "Норма",
      "over": "Избыточный вес",
      "obese": "Ожирение"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • около {{calories}} ккал",
      "lunch": "{{meal}} • около {{calories}} ккал",
      "dinner": "{{meal}} • около {{calories}} ккал",
      "snack": "{{meal}} • около {{calories}} ккал"
    },
    "hydrationSchedule": {
      "morning": "Утро: 500 мл после пробуждения",
      "beforeWorkout": "Перед тренировкой: 300–500 мл",
      "duringWorkout": "Во время тренировки: небольшие глотки каждые 10–15 минут",
      "evening": "Вечер: доберите оставшуюся норму воды"
    },
    "dynamicTips": {
      "protein": "Стремитесь к {{proteinG}}г белка в день, распределив на 3–4 приёма пищи.",
      "water": "Пейте около {{waterLiters}}л воды в день. В жару или при интенсивных тренировках — больше.",
      "fiber": "Цель — минимум {{fiberG}}г клетчатки из овощей, фруктов, бобовых и цельнозерновых.",
      "lose_weight": "Поддерживайте умеренный дефицит калорий. Не урезайте калории слишком резко.",
      "build_muscle": "Сочетайте небольшой профицит калорий с прогрессирующими силовыми тренировками.",
      "recomp": "Приоритет — белок и регулярность. Рекомпозиция требует времени.",
      "injured": "Так как отмечена травма, избегайте агрессивного дефицита и поддерживайте восстановление.",
      "healthNote": "Есть заметка о здоровье. Используйте план как общую рекомендацию."
    },
    "warnings": {
      "lowCalories": "Цель по калориям низкая. Убедитесь, что достаточно белка, микроэлементов и восстановления.",
      "lowBmi": "BMI низкий. Цель снижения жира может быть неподходящей.",
      "injured": "Отмечена травма: приоритет — восстановление, сон, вода и щадящие тренировки.",
      "healthNote": "Обнаружена заметка о здоровье: план не является медицинской рекомендацией."
    },
    "summary": "План {{goalLabel}}: {{calories}} ккал/день, белок {{proteinG}}г, углеводы {{carbsG}}г, жиры {{fatsG}}г. Оценка BMR {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Овсянка с бананом и арахисовой пастой",
        "desc": "Овёс, банан, арахисовая паста и молоко"
      },
      "bf_2": {
        "title": "Яйца, цельнозерновой тост и авокадо",
        "desc": "Яйца, цельнозерновой тост, авокадо и овощи"
      },
      "bf_3": {
        "title": "Боул с греческим йогуртом",
        "desc": "Греческий йогурт, ягоды, банан и гранола"
      },
      "bf_4": {
        "title": "Протеиновый смузи",
        "desc": "Сывороточный протеин, банан, овёс, молоко и арахисовая паста"
      },
      "ln_1": {
        "title": "Рис с курицей гриль",
        "desc": "Куриная грудка, рис, брокколи и оливковое масло"
      },
      "ln_2": {
        "title": "Постная говядина с бататом",
        "desc": "Постная говядина, батат и овощи"
      },
      "ln_3": {
        "title": "Салат с тофу и киноа",
        "desc": "Тофу, киноа, зелень, помидоры и авокадо"
      },
      "ln_4": {
        "title": "Ролл с индейкой",
        "desc": "Ролл с индейкой, овощи и йогуртовый соус"
      },
      "dn_1": {
        "title": "Лосось с картофелем и салатом",
        "desc": "Лосось, отварной картофель и зелёный салат"
      },
      "dn_2": {
        "title": "Постная говядина с рисом и овощами",
        "desc": "Постная говядина, рис и овощи"
      },
      "dn_3": {
        "title": "Белая рыба и овощи на пару",
        "desc": "Белая рыба, овощи и небольшая порция риса"
      },
      "dn_4": {
        "title": "Паста с курицей",
        "desc": "Куриная грудка, цельнозерновая паста и томатный соус"
      },
      "sn_1": {
        "title": "Протеиновый йогурт и орехи",
        "desc": "Греческий йогурт, миндаль и ягоды"
      },
      "sn_2": {
        "title": "Протеиновый шейк и банан",
        "desc": "Сывороточный шейк с бананом"
      },
      "sn_3": {
        "title": "Яблоко с арахисовой пастой",
        "desc": "Дольки яблока с арахисовой пастой"
      },
      "sn_4": {
        "title": "Творожный стакан",
        "desc": "Творог с фруктами"
      }
    }
  },
  "ar": {
    "title": "التغذية",
    "subtitle": "يقترح التطبيق السعرات والماء ونسب التغذية حسب هدفك.",
    "noProfileTitle": "أكمل ملفك أولاً",
    "noProfileText": "أضف الطول والوزن والهدف للحصول على أهداف مخصصة للسعرات والماكرو والماء.",
    "targets": "الأهداف اليومية",
    "calories": "السعرات",
    "water": "الماء",
    "macros": "توزيع الماكرو",
    "protein": "بروتين",
    "carbs": "كربوهيدرات",
    "fats": "دهون",
    "sampleMeals": "وجبات نموذجية",
    "tips": "نصائح",
    "advancedTitle": "تحليل تغذية احترافي",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "التعديل",
    "kcalPerDay": "سعرة/يوم",
    "mealSplit": "تقسيم السعرات حسب الوجبة",
    "hydration": "جدول شرب الماء",
    "note": "ملاحظة مهمة",
    "screenTitle": "التغذية",
    "heroStep": "3",
    "heroTitleLine1": "خطة تغذية",
    "heroTitleLine2": "شخصية",
    "dailyGoal": "الأهداف اليومية",
    "edit": "تعديل",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "نسبة الماكرو",
    "carb": "كربوهيدرات",
    "fat": "دهون",
    "viewAll": "عرض الكل",
    "breakfast": "فطور",
    "lunch": "غداء",
    "dinner": "عشاء",
    "snack": "وجبة خفيفة",
    "mealPlan": "اقتراحات الوجبات",
    "tipFallback": "اشرب ماءً كافيًا وركّز على الأطعمة الغنية بالبروتين.",
    "footer1": "من اليوم،",
    "footer2": "نسخة أفضل منك",
    "science": "علمي",
    "effective": "فعال",
    "sustainable": "مستدام",
    "advancedMode": "الوضع المتقدم",
    "pro": "PRO",
    "advancedMealPlan": "خطة وجبات متقدمة",
    "advancedMealPlanKicker": "خيارات الوجبات",
    "advancedMealPlanDesc": "اختر عدة وجبات لكل وقت من اليوم. السعرات والماكرو تقديرية لتسهيل التخطيط.",
    "mealGroups": {
      "breakfast": "خيارات الفطور",
      "lunch": "خيارات الغداء",
      "dinner": "خيارات العشاء",
      "snack": "خيارات الوجبة الخفيفة"
    },
    "goals": {
      "lose_weight": "خسارة الدهون",
      "build_muscle": "بناء العضلات",
      "maintain": "الحفاظ",
      "recomp": "إعادة تشكيل الجسم",
      "endurance": "التحمل",
      "flexibility": "الصحة العامة"
    },
    "activity": {
      "sedentary": "قليل الحركة",
      "light": "نشاط خفيف",
      "moderate": "نشاط متوسط",
      "active": "نشط",
      "very_active": "نشط جدًا"
    },
    "bmiLabels": {
      "under": "نقص وزن",
      "normal": "طبيعي",
      "over": "زيادة وزن",
      "obese": "سمنة"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • حوالي {{calories}} kcal",
      "lunch": "{{meal}} • حوالي {{calories}} kcal",
      "dinner": "{{meal}} • حوالي {{calories}} kcal",
      "snack": "{{meal}} • حوالي {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "الصباح: 500مل بعد الاستيقاظ",
      "beforeWorkout": "قبل التمرين: 300–500مل",
      "duringWorkout": "أثناء التمرين: رشفات صغيرة كل 10–15 دقيقة",
      "evening": "المساء: أكمل الكمية المتبقية من هدف الماء"
    },
    "dynamicTips": {
      "protein": "استهدف حوالي {{proteinG}}غ بروتين يوميًا ووزعه على 3–4 وجبات.",
      "water": "اشرب حوالي {{waterLiters}} لتر ماء يوميًا. زد الكمية في الأيام الحارة أو التمارين الشديدة.",
      "fiber": "استهدف على الأقل {{fiberG}}غ ألياف من الخضار والفواكه والبقول والحبوب الكاملة.",
      "lose_weight": "حافظ على عجز سعرات معتدل وتجنب التقليل الشديد.",
      "build_muscle": "اجمع بين فائض سعرات بسيط وتدريب قوة تدريجي.",
      "recomp": "أعطِ الأولوية للبروتين والاستمرارية. إعادة تشكيل الجسم تحتاج وقتًا.",
      "injured": "بما أنك حددت إصابة، تجنب العجز القاسي وركز على أغذية التعافي.",
      "healthNote": "أضفت ملاحظة صحية. اعتبر الخطة إرشادًا عامًا وعدّل بحذر."
    },
    "warnings": {
      "lowCalories": "هدف السعرات منخفض. تأكد من كفاية البروتين والعناصر الدقيقة والتعافي.",
      "lowBmi": "مؤشر BMI منخفض. قد لا يكون هدف خسارة الدهون مناسبًا.",
      "injured": "تم تحديد إصابة: أعطِ الأولوية للتعافي والنوم والماء وتمارين لطيفة على المفاصل.",
      "healthNote": "تم العثور على ملاحظة صحية: هذه الخطة ليست نصيحة طبية."
    },
    "summary": "خطة {{goalLabel}}: {{calories}} سعرة/يوم، {{proteinG}}غ بروتين، {{carbsG}}غ كربوهيدرات، {{fatsG}}غ دهون. BMR تقديري {{bmr}}، TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "شوفان بالموز وزبدة الفول السوداني",
        "desc": "شوفان، موز، زبدة فول سوداني وحليب"
      },
      "bf_2": {
        "title": "بيض، توست حبوب كاملة وأفوكادو",
        "desc": "بيض، توست حبوب كاملة، أفوكادو وخضار"
      },
      "bf_3": {
        "title": "وعاء زبادي يوناني",
        "desc": "زبادي يوناني، توت، موز وغرانولا"
      },
      "bf_4": {
        "title": "سموثي بروتين",
        "desc": "واي بروتين، موز، شوفان، حليب وزبدة فول سوداني"
      },
      "ln_1": {
        "title": "وعاء أرز بالدجاج المشوي",
        "desc": "صدر دجاج، أرز، بروكلي وزيت زيتون"
      },
      "ln_2": {
        "title": "لحم بقري قليل الدهن مع بطاطا حلوة",
        "desc": "لحم قليل الدهن، بطاطا حلوة وخضار مشكلة"
      },
      "ln_3": {
        "title": "سلطة توفو وكينوا",
        "desc": "توفو، كينوا، خضار ورقية، طماطم وأفوكادو"
      },
      "ln_4": {
        "title": "راب ديك رومي",
        "desc": "راب ديك رومي، خضار وصوص زبادي"
      },
      "dn_1": {
        "title": "سلمون مع بطاطس وسلطة",
        "desc": "سلمون، بطاطس مسلوقة وسلطة خضراء"
      },
      "dn_2": {
        "title": "لحم قليل الدهن مع أرز وخضار",
        "desc": "لحم قليل الدهن، أرز وخضار"
      },
      "dn_3": {
        "title": "سمك أبيض وخضار مطهوة بالبخار",
        "desc": "سمك أبيض، خضار وكمية صغيرة من الأرز"
      },
      "dn_4": {
        "title": "باستا بالدجاج",
        "desc": "صدر دجاج، باستا قمح كامل وصلصة طماطم"
      },
      "sn_1": {
        "title": "زبادي بروتين ومكسرات",
        "desc": "زبادي يوناني، لوز وتوت"
      },
      "sn_2": {
        "title": "مخفوق بروتين وموز",
        "desc": "مخفوق واي مع موز"
      },
      "sn_3": {
        "title": "تفاح مع زبدة الفول السوداني",
        "desc": "شرائح تفاح مع زبدة فول سوداني"
      },
      "sn_4": {
        "title": "كوب جبن قريش",
        "desc": "جبن قريش مع فاكهة"
      }
    }
  },
  "hi": {
    "title": "पोषण",
    "subtitle": "ऐप आपके लक्ष्य के अनुसार कैलोरी, पानी और पोषण अनुपात सुझाता है।",
    "noProfileTitle": "पहले प्रोफ़ाइल पूरी करें",
    "noProfileText": "ऊंचाई, वजन और लक्ष्य जोड़ें ताकि व्यक्तिगत कैलोरी, मैक्रो और पानी लक्ष्य मिलें।",
    "targets": "दैनिक लक्ष्य",
    "calories": "कैलोरी",
    "water": "पानी",
    "macros": "मैक्रो विभाजन",
    "protein": "प्रोटीन",
    "carbs": "कार्ब्स",
    "fats": "वसा",
    "sampleMeals": "नमूना भोजन",
    "tips": "सलाह",
    "advancedTitle": "पेशेवर पोषण विश्लेषण",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "समायोजन",
    "kcalPerDay": "kcal/दिन",
    "mealSplit": "भोजन अनुसार कैलोरी विभाजन",
    "hydration": "पानी पीने का समय",
    "note": "महत्वपूर्ण नोट",
    "screenTitle": "पोषण",
    "heroStep": "3",
    "heroTitleLine1": "व्यक्तिगत",
    "heroTitleLine2": "पोषण योजना",
    "dailyGoal": "दैनिक लक्ष्य",
    "edit": "संपादित करें",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "मैक्रो अनुपात",
    "carb": "कार्ब",
    "fat": "वसा",
    "viewAll": "सभी देखें",
    "breakfast": "नाश्ता",
    "lunch": "दोपहर का भोजन",
    "dinner": "रात का भोजन",
    "snack": "स्नैक",
    "mealPlan": "भोजन सुझाव",
    "tipFallback": "पर्याप्त पानी पिएं और प्रोटीन युक्त भोजन को प्राथमिकता दें।",
    "footer1": "आज से,",
    "footer2": "आपका बेहतर संस्करण",
    "science": "वैज्ञानिक",
    "effective": "प्रभावी",
    "sustainable": "टिकाऊ",
    "advancedMode": "उन्नत मोड",
    "pro": "PRO",
    "advancedMealPlan": "उन्नत भोजन योजना",
    "advancedMealPlanKicker": "भोजन विकल्प",
    "advancedMealPlanDesc": "दिन के हर समय के लिए कई भोजन विकल्प चुनें। कैलोरी और मैक्रो अनुमानित हैं।",
    "mealGroups": {
      "breakfast": "नाश्ते के विकल्प",
      "lunch": "दोपहर के भोजन के विकल्प",
      "dinner": "रात के भोजन के विकल्प",
      "snack": "स्नैक विकल्प"
    },
    "goals": {
      "lose_weight": "वसा घटाना",
      "build_muscle": "मांसपेशी बनाना",
      "maintain": "बनाए रखना",
      "recomp": "बॉडी रिकम्पोज़िशन",
      "endurance": "सहनशक्ति",
      "flexibility": "सामान्य स्वास्थ्य"
    },
    "activity": {
      "sedentary": "कम सक्रिय",
      "light": "हल्की गतिविधि",
      "moderate": "मध्यम गतिविधि",
      "active": "सक्रिय",
      "very_active": "बहुत सक्रिय"
    },
    "bmiLabels": {
      "under": "कम वजन",
      "normal": "सामान्य",
      "over": "अधिक वजन",
      "obese": "मोटापा"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • लगभग {{calories}} kcal",
      "lunch": "{{meal}} • लगभग {{calories}} kcal",
      "dinner": "{{meal}} • लगभग {{calories}} kcal",
      "snack": "{{meal}} • लगभग {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "सुबह: उठने के बाद 500ml",
      "beforeWorkout": "वर्कआउट से पहले: 300–500ml",
      "duringWorkout": "वर्कआउट के दौरान: हर 10–15 मिनट छोटे घूंट",
      "evening": "शाम: पानी का बाकी लक्ष्य पूरा करें"
    },
    "dynamicTips": {
      "protein": "हर दिन लगभग {{proteinG}}g प्रोटीन लें और इसे 3–4 भोजन में बाँटें।",
      "water": "रोज़ लगभग {{waterLiters}}L पानी पिएँ। गर्म दिन या भारी वर्कआउट में अधिक लें।",
      "fiber": "सब्ज़ियों, फलों, दालों और साबुत अनाज से कम से कम {{fiberG}}g फाइबर लें।",
      "lose_weight": "मध्यम कैलोरी घाटा रखें। बहुत ज्यादा कैलोरी कम न करें।",
      "build_muscle": "हल्का कैलोरी अधिशेष और प्रोग्रेसिव स्ट्रेंथ ट्रेनिंग साथ रखें।",
      "recomp": "प्रोटीन और नियमितता को प्राथमिकता दें। बॉडी रिकम्पोज़िशन में समय लगता है।",
      "injured": "चोट दर्ज है, इसलिए आक्रामक डाइटिंग से बचें और रिकवरी भोजन को प्राथमिकता दें।",
      "healthNote": "आपने स्वास्थ्य नोट जोड़ा है। इस योजना को सामान्य मार्गदर्शन मानें।"
    },
    "warnings": {
      "lowCalories": "आपका कैलोरी लक्ष्य कम है। प्रोटीन, माइक्रोन्यूट्रिएंट्स और रिकवरी पर्याप्त रखें।",
      "lowBmi": "BMI कम है। फैट लॉस लक्ष्य उपयुक्त नहीं हो सकता।",
      "injured": "चोट दर्ज है: रिकवरी, नींद, पानी और जोड़ों के अनुकूल ट्रेनिंग को प्राथमिकता दें।",
      "healthNote": "स्वास्थ्य नोट मिला है: यह योजना चिकित्सा सलाह नहीं है।"
    },
    "summary": "{{goalLabel}} योजना: {{calories}} kcal/दिन, {{proteinG}}g प्रोटीन, {{carbsG}}g कार्ब्स, {{fatsG}}g वसा। अनुमानित BMR {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "केला और पीनट बटर वाली ओटमील",
        "desc": "ओट्स, केला, पीनट बटर और दूध"
      },
      "bf_2": {
        "title": "अंडे, होल ग्रेन टोस्ट और एवोकाडो",
        "desc": "अंडे, होल ग्रेन टोस्ट, एवोकाडो और सब्ज़ियाँ"
      },
      "bf_3": {
        "title": "ग्रीक योगर्ट बाउल",
        "desc": "ग्रीक योगर्ट, बेरी, केला और ग्रेनोला"
      },
      "bf_4": {
        "title": "प्रोटीन स्मूदी",
        "desc": "व्हे प्रोटीन, केला, ओट्स, दूध और पीनट बटर"
      },
      "ln_1": {
        "title": "ग्रिल्ड चिकन राइस बाउल",
        "desc": "चिकन ब्रेस्ट, चावल, ब्रोकली और ऑलिव ऑयल"
      },
      "ln_2": {
        "title": "लीन बीफ और शकरकंद प्लेट",
        "desc": "लीन बीफ, शकरकंद और मिश्रित सब्ज़ियाँ"
      },
      "ln_3": {
        "title": "टोफू क्विनोआ सलाद",
        "desc": "टोफू, क्विनोआ, हरी पत्तेदार सब्ज़ियाँ, टमाटर और एवोकाडो"
      },
      "ln_4": {
        "title": "टर्की रैप कॉम्बो",
        "desc": "टर्की रैप, सब्ज़ियाँ और योगर्ट डिप"
      },
      "dn_1": {
        "title": "सैल्मन, आलू और सलाद",
        "desc": "सैल्मन, उबले आलू और ग्रीन सलाद"
      },
      "dn_2": {
        "title": "लीन बीफ, चावल और सब्ज़ियाँ",
        "desc": "लीन बीफ, चावल और सब्ज़ियाँ"
      },
      "dn_3": {
        "title": "व्हाइट फिश और स्टीम्ड सब्ज़ियाँ",
        "desc": "व्हाइट फिश, सब्ज़ियाँ और थोड़े चावल"
      },
      "dn_4": {
        "title": "चिकन पास्ता",
        "desc": "चिकन ब्रेस्ट, होल व्हीट पास्ता और टोमैटो सॉस"
      },
      "sn_1": {
        "title": "प्रोटीन योगर्ट और नट्स",
        "desc": "ग्रीक योगर्ट, बादाम और बेरी"
      },
      "sn_2": {
        "title": "प्रोटीन शेक और केला",
        "desc": "व्हे शेक के साथ केला"
      },
      "sn_3": {
        "title": "सेब और पीनट बटर",
        "desc": "सेब के टुकड़े पीनट बटर के साथ"
      },
      "sn_4": {
        "title": "कॉटेज चीज़ कप",
        "desc": "कॉटेज चीज़ के साथ फल"
      }
    }
  },
  "th": {
    "title": "โภชนาการ",
    "subtitle": "แอปแนะนำแคลอรี น้ำ และสัดส่วนสารอาหารตามเป้าหมายของคุณ",
    "noProfileTitle": "กรุณากรอกโปรไฟล์ก่อน",
    "noProfileText": "เพิ่มส่วนสูง น้ำหนัก และเป้าหมายเพื่อรับคำแนะนำเฉพาะตัว",
    "targets": "เป้าหมายรายวัน",
    "calories": "แคลอรี",
    "water": "น้ำ",
    "macros": "สัดส่วนมาโคร",
    "protein": "โปรตีน",
    "carbs": "คาร์บ",
    "fats": "ไขมัน",
    "sampleMeals": "เมนูตัวอย่าง",
    "tips": "คำแนะนำ",
    "advancedTitle": "การวิเคราะห์โภชนาการแบบมืออาชีพ",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "การปรับ",
    "kcalPerDay": "kcal/วัน",
    "mealSplit": "แบ่งแคลอรีตามมื้อ",
    "hydration": "ตารางดื่มน้ำ",
    "note": "หมายเหตุสำคัญ",
    "screenTitle": "โภชนาการ",
    "heroStep": "3",
    "heroTitleLine1": "แผนโภชนาการ",
    "heroTitleLine2": "เฉพาะคุณ",
    "dailyGoal": "เป้าหมายรายวัน",
    "edit": "แก้ไข",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "สัดส่วนมาโคร",
    "carb": "คาร์บ",
    "fat": "ไขมัน",
    "viewAll": "ดูทั้งหมด",
    "breakfast": "มื้อเช้า",
    "lunch": "มื้อกลางวัน",
    "dinner": "มื้อเย็น",
    "snack": "ของว่าง",
    "mealPlan": "คำแนะนำมื้ออาหาร",
    "tipFallback": "ดื่มน้ำให้เพียงพอและเน้นอาหารโปรตีนสูง",
    "footer1": "ตั้งแต่วันนี้",
    "footer2": "เป็นตัวคุณที่ดีขึ้น",
    "science": "วิทยาศาสตร์",
    "effective": "มีประสิทธิภาพ",
    "sustainable": "ยั่งยืน",
    "advancedMode": "โหมดขั้นสูง",
    "pro": "PRO",
    "advancedMealPlan": "แผนมื้ออาหารขั้นสูง",
    "advancedMealPlanKicker": "ตัวเลือกมื้ออาหาร",
    "advancedMealPlanDesc": "เลือกเมนูหลายแบบสำหรับแต่ละช่วงของวัน แคลอรีและมาโครเป็นค่าประมาณ",
    "mealGroups": {
      "breakfast": "ตัวเลือกมื้อเช้า",
      "lunch": "ตัวเลือกมื้อกลางวัน",
      "dinner": "ตัวเลือกมื้อเย็น",
      "snack": "ตัวเลือกของว่าง"
    },
    "goals": {
      "lose_weight": "ลดไขมัน",
      "build_muscle": "เพิ่มกล้ามเนื้อ",
      "maintain": "คงสภาพ",
      "recomp": "ปรับองค์ประกอบร่างกาย",
      "endurance": "ความทนทาน",
      "flexibility": "สุขภาพโดยรวม"
    },
    "activity": {
      "sedentary": "นั่งเป็นส่วนใหญ่",
      "light": "กิจกรรมเบา",
      "moderate": "กิจกรรมปานกลาง",
      "active": "กระฉับกระเฉง",
      "very_active": "กระฉับกระเฉงมาก"
    },
    "bmiLabels": {
      "under": "น้ำหนักน้อย",
      "normal": "ปกติ",
      "over": "น้ำหนักเกิน",
      "obese": "อ้วน"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • ประมาณ {{calories}} kcal",
      "lunch": "{{meal}} • ประมาณ {{calories}} kcal",
      "dinner": "{{meal}} • ประมาณ {{calories}} kcal",
      "snack": "{{meal}} • ประมาณ {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "ตอนเช้า: ดื่ม 500ml หลังตื่นนอน",
      "beforeWorkout": "ก่อนออกกำลัง: 300–500ml",
      "duringWorkout": "ระหว่างออกกำลัง: จิบเล็กน้อยทุก 10–15 นาที",
      "evening": "ตอนเย็น: ดื่มน้ำที่เหลือให้ครบเป้าหมาย"
    },
    "dynamicTips": {
      "protein": "ตั้งเป้าโปรตีนประมาณ {{proteinG}}g ต่อวัน และแบ่งเป็น 3–4 มื้อ",
      "water": "ดื่มน้ำประมาณ {{waterLiters}}L ต่อวัน เพิ่มในวันที่ร้อนหรือออกกำลังหนัก",
      "fiber": "ตั้งเป้าไฟเบอร์อย่างน้อย {{fiberG}}g จากผัก ผลไม้ ถั่ว และธัญพืชเต็มเมล็ด",
      "lose_weight": "รักษาการขาดดุลแคลอรีแบบพอดี อย่าลดแคลอรีรุนแรงเกินไป",
      "build_muscle": "รวมแคลอรีเกินเล็กน้อยกับการฝึกแรงต้านแบบค่อยเป็นค่อยไป",
      "recomp": "ให้ความสำคัญกับโปรตีนและความสม่ำเสมอ การปรับองค์ประกอบร่างกายต้องใช้เวลา",
      "injured": "คุณระบุว่ามีอาการบาดเจ็บ ควรหลีกเลี่ยงการลดแคลอรีหนักและเน้นอาหารเพื่อฟื้นฟู",
      "healthNote": "คุณเพิ่มหมายเหตุสุขภาพ โปรดใช้แผนนี้เป็นคำแนะนำทั่วไปและปรับอย่างระมัดระวัง"
    },
    "warnings": {
      "lowCalories": "เป้าหมายแคลอรีค่อนข้างต่ำ โปรดให้เพียงพอทั้งโปรตีน สารอาหารรอง และการฟื้นตัว",
      "lowBmi": "BMI ต่ำ เป้าหมายลดไขมันอาจไม่เหมาะสม",
      "injured": "มีการระบุบาดเจ็บ: ให้ความสำคัญกับการฟื้นตัว การนอน น้ำ และการออกกำลังที่อ่อนโยนต่อข้อ",
      "healthNote": "พบหมายเหตุสุขภาพ: แผนนี้ไม่ใช่คำแนะนำทางการแพทย์"
    },
    "summary": "แผน {{goalLabel}}: {{calories}} kcal/วัน, โปรตีน {{proteinG}}g, คาร์บ {{carbsG}}g, ไขมัน {{fatsG}}g. BMR ประมาณ {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "ข้าวโอ๊ตกับกล้วยและเนยถั่ว",
        "desc": "ข้าวโอ๊ต กล้วย เนยถั่ว และนม"
      },
      "bf_2": {
        "title": "ไข่ ขนมปังโฮลเกรน และอะโวคาโด",
        "desc": "ไข่ ขนมปังโฮลเกรน อะโวคาโด และผัก"
      },
      "bf_3": {
        "title": "กรีกโยเกิร์ตโบวล์",
        "desc": "กรีกโยเกิร์ต เบอร์รี กล้วย และกราโนลา"
      },
      "bf_4": {
        "title": "สมูทตี้โปรตีน",
        "desc": "เวย์โปรตีน กล้วย ข้าวโอ๊ต นม และเนยถั่ว"
      },
      "ln_1": {
        "title": "ข้าวไก่ย่าง",
        "desc": "อกไก่ ข้าว บรอกโคลี และน้ำมันมะกอก"
      },
      "ln_2": {
        "title": "เนื้อไม่ติดมันกับมันหวาน",
        "desc": "เนื้อไม่ติดมัน มันหวาน และผักรวม"
      },
      "ln_3": {
        "title": "สลัดเต้าหู้ควินัว",
        "desc": "เต้าหู้ ควินัว ผักใบเขียว มะเขือเทศ และอะโวคาโด"
      },
      "ln_4": {
        "title": "แรปไก่งวง",
        "desc": "แรปไก่งวง ผัก และดิปโยเกิร์ต"
      },
      "dn_1": {
        "title": "แซลมอนกับมันฝรั่งและสลัด",
        "desc": "แซลมอน มันฝรั่งต้ม และสลัดผัก"
      },
      "dn_2": {
        "title": "เนื้อไม่ติดมันกับข้าวและผัก",
        "desc": "เนื้อไม่ติดมัน ข้าว และผัก"
      },
      "dn_3": {
        "title": "ปลาเนื้อขาวกับผักนึ่ง",
        "desc": "ปลาเนื้อขาว ผัก และข้าวปริมาณเล็กน้อย"
      },
      "dn_4": {
        "title": "พาสต้าไก่",
        "desc": "อกไก่ พาสต้าโฮลวีต และซอสมะเขือเทศ"
      },
      "sn_1": {
        "title": "โยเกิร์ตโปรตีนและถั่ว",
        "desc": "กรีกโยเกิร์ต อัลมอนด์ และเบอร์รี"
      },
      "sn_2": {
        "title": "โปรตีนเชคและกล้วย",
        "desc": "เวย์เชคกับกล้วย"
      },
      "sn_3": {
        "title": "แอปเปิลกับเนยถั่ว",
        "desc": "แอปเปิลหั่นกับเนยถั่ว"
      },
      "sn_4": {
        "title": "คอตเทจชีสกับผลไม้",
        "desc": "คอตเทจชีสกับผลไม้"
      }
    }
  },
  "id": {
    "title": "Nutrisi",
    "subtitle": "Aplikasi menyarankan kalori, air, dan rasio nutrisi sesuai tujuanmu.",
    "noProfileTitle": "Lengkapi profil dulu",
    "noProfileText": "Tambahkan tinggi, berat, dan tujuan untuk mendapatkan target kalori, makro, dan air.",
    "targets": "Target harian",
    "calories": "Kalori",
    "water": "Air",
    "macros": "Pembagian makro",
    "protein": "Protein",
    "carbs": "Karbo",
    "fats": "Lemak",
    "sampleMeals": "Contoh menu",
    "tips": "Saran",
    "advancedTitle": "Analisis nutrisi profesional",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Penyesuaian",
    "kcalPerDay": "kcal/hari",
    "mealSplit": "Pembagian kalori per makan",
    "hydration": "Jadwal minum air",
    "note": "Catatan penting",
    "screenTitle": "Nutrisi",
    "heroStep": "3",
    "heroTitleLine1": "Rencana nutrisi",
    "heroTitleLine2": "personal",
    "dailyGoal": "Target harian",
    "edit": "Edit",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Rasio makro",
    "carb": "Karbo",
    "fat": "Lemak",
    "viewAll": "Lihat semua",
    "breakfast": "Sarapan",
    "lunch": "Makan siang",
    "dinner": "Makan malam",
    "snack": "Camilan",
    "mealPlan": "Saran makanan",
    "tipFallback": "Minum cukup air dan prioritaskan makanan tinggi protein.",
    "footer1": "Mulai hari ini,",
    "footer2": "versi terbaik dirimu",
    "science": "Ilmiah",
    "effective": "Efektif",
    "sustainable": "Berkelanjutan",
    "advancedMode": "MODE LANJUTAN",
    "pro": "PRO",
    "advancedMealPlan": "Rencana makan lanjutan",
    "advancedMealPlanKicker": "PILIHAN MAKANAN",
    "advancedMealPlanDesc": "Pilih beberapa makanan untuk setiap waktu makan. Kalori dan makro adalah estimasi.",
    "mealGroups": {
      "breakfast": "Pilihan sarapan",
      "lunch": "Pilihan makan siang",
      "dinner": "Pilihan makan malam",
      "snack": "Pilihan camilan"
    },
    "goals": {
      "lose_weight": "Turun lemak",
      "build_muscle": "Bangun otot",
      "maintain": "Pertahankan",
      "recomp": "Rekomposisi tubuh",
      "endurance": "Daya tahan",
      "flexibility": "Kesehatan umum"
    },
    "activity": {
      "sedentary": "Sedentari",
      "light": "Aktivitas ringan",
      "moderate": "Aktivitas sedang",
      "active": "Aktif",
      "very_active": "Sangat aktif"
    },
    "bmiLabels": {
      "under": "Berat kurang",
      "normal": "Normal",
      "over": "Berat berlebih",
      "obese": "Obesitas"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • sekitar {{calories}} kcal",
      "lunch": "{{meal}} • sekitar {{calories}} kcal",
      "dinner": "{{meal}} • sekitar {{calories}} kcal",
      "snack": "{{meal}} • sekitar {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "Pagi: 500ml setelah bangun",
      "beforeWorkout": "Sebelum latihan: 300–500ml",
      "duringWorkout": "Saat latihan: minum sedikit setiap 10–15 menit",
      "evening": "Malam: selesaikan sisa target air"
    },
    "dynamicTips": {
      "protein": "Targetkan sekitar {{proteinG}}g protein per hari dan bagi dalam 3–4 kali makan.",
      "water": "Minum sekitar {{waterLiters}}L air per hari. Tambahkan saat cuaca panas atau latihan berat.",
      "fiber": "Targetkan minimal {{fiberG}}g serat dari sayur, buah, kacang-kacangan, dan gandum utuh.",
      "lose_weight": "Jaga defisit kalori sedang. Hindari memotong kalori terlalu ekstrem.",
      "build_muscle": "Gabungkan surplus kalori kecil dengan latihan kekuatan progresif.",
      "recomp": "Prioritaskan protein dan konsistensi. Rekomposisi tubuh membutuhkan waktu.",
      "injured": "Karena kamu menandai cedera, hindari defisit agresif dan prioritaskan makanan pemulihan.",
      "healthNote": "Kamu menambahkan catatan kesehatan. Gunakan rencana ini sebagai panduan umum."
    },
    "warnings": {
      "lowCalories": "Target kalorimu rendah. Pastikan protein, mikronutrien, dan pemulihan tetap cukup.",
      "lowBmi": "BMI rendah. Target turun lemak mungkin kurang sesuai.",
      "injured": "Cedera ditandai: prioritaskan pemulihan, tidur, hidrasi, dan latihan ramah sendi.",
      "healthNote": "Catatan kesehatan terdeteksi: rencana ini bukan saran medis."
    },
    "summary": "Rencana {{goalLabel}}: {{calories}} kcal/hari, {{proteinG}}g protein, {{carbsG}}g karbo, {{fatsG}}g lemak. Perkiraan BMR {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Oatmeal dengan pisang dan selai kacang",
        "desc": "Oat, pisang, selai kacang, dan susu"
      },
      "bf_2": {
        "title": "Telur, roti gandum, dan alpukat",
        "desc": "Telur, roti gandum, alpukat, dan sayuran"
      },
      "bf_3": {
        "title": "Mangkuk yogurt Yunani",
        "desc": "Yogurt Yunani, berry, pisang, dan granola"
      },
      "bf_4": {
        "title": "Smoothie protein",
        "desc": "Whey protein, pisang, oat, susu, dan selai kacang"
      },
      "ln_1": {
        "title": "Nasi ayam panggang",
        "desc": "Dada ayam, nasi, brokoli, dan minyak zaitun"
      },
      "ln_2": {
        "title": "Daging sapi tanpa lemak dan ubi",
        "desc": "Daging sapi tanpa lemak, ubi, dan sayuran campur"
      },
      "ln_3": {
        "title": "Salad tahu quinoa",
        "desc": "Tahu, quinoa, sayuran hijau, tomat, dan alpukat"
      },
      "ln_4": {
        "title": "Wrap kalkun",
        "desc": "Wrap kalkun, sayuran, dan saus yogurt"
      },
      "dn_1": {
        "title": "Salmon dengan kentang dan salad",
        "desc": "Salmon, kentang rebus, dan salad hijau"
      },
      "dn_2": {
        "title": "Daging sapi tanpa lemak dengan nasi dan sayur",
        "desc": "Daging sapi tanpa lemak, nasi, dan sayuran"
      },
      "dn_3": {
        "title": "Ikan putih dan sayuran kukus",
        "desc": "Ikan putih, sayuran, dan sedikit nasi"
      },
      "dn_4": {
        "title": "Pasta ayam",
        "desc": "Dada ayam, pasta gandum utuh, dan saus tomat"
      },
      "sn_1": {
        "title": "Yogurt protein dan kacang",
        "desc": "Yogurt Yunani, almond, dan berry"
      },
      "sn_2": {
        "title": "Protein shake dan pisang",
        "desc": "Whey shake dengan pisang"
      },
      "sn_3": {
        "title": "Apel dengan selai kacang",
        "desc": "Irisan apel dengan selai kacang"
      },
      "sn_4": {
        "title": "Cottage cheese cup",
        "desc": "Cottage cheese dengan buah"
      }
    }
  },
  "ms": {
    "title": "Nutrisi",
    "subtitle": "Aplikasi mencadangkan kalori, air dan nisbah nutrisi mengikut matlamat anda.",
    "noProfileTitle": "Lengkapkan profil dahulu",
    "noProfileText": "Tambah tinggi, berat dan matlamat untuk sasaran kalori, makro dan air.",
    "targets": "Sasaran harian",
    "calories": "Kalori",
    "water": "Air",
    "macros": "Pembahagian makro",
    "protein": "Protein",
    "carbs": "Karbo",
    "fats": "Lemak",
    "sampleMeals": "Contoh hidangan",
    "tips": "Nasihat",
    "advancedTitle": "Analisis nutrisi profesional",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Pelarasan",
    "kcalPerDay": "kcal/hari",
    "mealSplit": "Pembahagian kalori ikut hidangan",
    "hydration": "Jadual minum air",
    "note": "Nota penting",
    "screenTitle": "Nutrisi",
    "heroStep": "3",
    "heroTitleLine1": "Pelan nutrisi",
    "heroTitleLine2": "peribadi",
    "dailyGoal": "Sasaran harian",
    "edit": "Edit",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Nisbah makro",
    "carb": "Karbo",
    "fat": "Lemak",
    "viewAll": "Lihat semua",
    "breakfast": "Sarapan",
    "lunch": "Makan tengah hari",
    "dinner": "Makan malam",
    "snack": "Snek",
    "mealPlan": "Cadangan makanan",
    "tipFallback": "Minum air secukupnya dan utamakan makanan tinggi protein.",
    "footer1": "Mulai hari ini,",
    "footer2": "versi lebih baik diri anda",
    "science": "Sains",
    "effective": "Berkesan",
    "sustainable": "Mampan",
    "advancedMode": "MOD LANJUTAN",
    "pro": "PRO",
    "advancedMealPlan": "Pelan makan lanjutan",
    "advancedMealPlanKicker": "PILIHAN HIDANGAN",
    "advancedMealPlanDesc": "Pilih beberapa hidangan untuk setiap waktu makan. Kalori dan makro adalah anggaran.",
    "mealGroups": {
      "breakfast": "Pilihan sarapan",
      "lunch": "Pilihan tengah hari",
      "dinner": "Pilihan makan malam",
      "snack": "Pilihan snek"
    },
    "goals": {
      "lose_weight": "Kurang lemak",
      "build_muscle": "Bina otot",
      "maintain": "Kekal",
      "recomp": "Rekomposisi badan",
      "endurance": "Daya tahan",
      "flexibility": "Kesihatan umum"
    },
    "activity": {
      "sedentary": "Kurang bergerak",
      "light": "Aktiviti ringan",
      "moderate": "Aktiviti sederhana",
      "active": "Aktif",
      "very_active": "Sangat aktif"
    },
    "bmiLabels": {
      "under": "Kurang berat",
      "normal": "Normal",
      "over": "Berat berlebihan",
      "obese": "Obes"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • sekitar {{calories}} kcal",
      "lunch": "{{meal}} • sekitar {{calories}} kcal",
      "dinner": "{{meal}} • sekitar {{calories}} kcal",
      "snack": "{{meal}} • sekitar {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "Pagi: 500ml selepas bangun",
      "beforeWorkout": "Sebelum senaman: 300–500ml",
      "duringWorkout": "Semasa senaman: minum sedikit setiap 10–15 minit",
      "evening": "Malam: lengkapkan baki sasaran air"
    },
    "dynamicTips": {
      "protein": "Sasarkan sekitar {{proteinG}}g protein sehari dan bahagi kepada 3–4 hidangan.",
      "water": "Minum sekitar {{waterLiters}}L air sehari. Tambah pada hari panas atau senaman berat.",
      "fiber": "Sasarkan sekurang-kurangnya {{fiberG}}g serat daripada sayur, buah, kekacang dan bijirin penuh.",
      "lose_weight": "Kekalkan defisit kalori sederhana. Elakkan memotong kalori terlalu agresif.",
      "build_muscle": "Gabungkan lebihan kalori kecil dengan latihan kekuatan progresif.",
      "recomp": "Utamakan protein dan konsisten. Rekomposisi badan mengambil masa.",
      "injured": "Anda menandakan kecederaan, elakkan defisit agresif dan utamakan makanan pemulihan.",
      "healthNote": "Anda menambah nota kesihatan. Gunakan pelan ini sebagai panduan umum."
    },
    "warnings": {
      "lowCalories": "Sasaran kalori anda rendah. Pastikan protein, mikronutrien dan pemulihan mencukupi.",
      "lowBmi": "BMI rendah. Sasaran kurang lemak mungkin tidak sesuai.",
      "injured": "Kecederaan ditanda: utamakan pemulihan, tidur, hidrasi dan senaman mesra sendi.",
      "healthNote": "Nota kesihatan dikesan: pelan ini bukan nasihat perubatan."
    },
    "summary": "Pelan {{goalLabel}}: {{calories}} kcal/hari, {{proteinG}}g protein, {{carbsG}}g karbo, {{fatsG}}g lemak. Anggaran BMR {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Oat dengan pisang dan mentega kacang",
        "desc": "Oat, pisang, mentega kacang dan susu"
      },
      "bf_2": {
        "title": "Telur, roti bijirin penuh dan avokado",
        "desc": "Telur, roti bijirin penuh, avokado dan sayur"
      },
      "bf_3": {
        "title": "Mangkuk yogurt Greek",
        "desc": "Yogurt Greek, beri, pisang dan granola"
      },
      "bf_4": {
        "title": "Smoothie protein",
        "desc": "Whey protein, pisang, oat, susu dan mentega kacang"
      },
      "ln_1": {
        "title": "Nasi ayam panggang",
        "desc": "Dada ayam, nasi, brokoli dan minyak zaitun"
      },
      "ln_2": {
        "title": "Daging lembu tanpa lemak dan ubi keledek",
        "desc": "Daging lembu tanpa lemak, ubi keledek dan sayur campur"
      },
      "ln_3": {
        "title": "Salad tofu quinoa",
        "desc": "Tofu, quinoa, sayur hijau, tomato dan avokado"
      },
      "ln_4": {
        "title": "Wrap ayam belanda",
        "desc": "Wrap ayam belanda, sayur dan sos yogurt"
      },
      "dn_1": {
        "title": "Salmon dengan kentang dan salad",
        "desc": "Salmon, kentang rebus dan salad hijau"
      },
      "dn_2": {
        "title": "Daging lembu tanpa lemak dengan nasi dan sayur",
        "desc": "Daging lembu tanpa lemak, nasi dan sayur"
      },
      "dn_3": {
        "title": "Ikan putih dan sayur kukus",
        "desc": "Ikan putih, sayur dan sedikit nasi"
      },
      "dn_4": {
        "title": "Pasta ayam",
        "desc": "Dada ayam, pasta gandum penuh dan sos tomato"
      },
      "sn_1": {
        "title": "Yogurt protein dan kekacang",
        "desc": "Yogurt Greek, badam dan beri"
      },
      "sn_2": {
        "title": "Protein shake dan pisang",
        "desc": "Whey shake dengan pisang"
      },
      "sn_3": {
        "title": "Epal dengan mentega kacang",
        "desc": "Hirisan epal dengan mentega kacang"
      },
      "sn_4": {
        "title": "Cawan cottage cheese",
        "desc": "Cottage cheese dengan buah"
      }
    }
  },
  "fil": {
    "title": "Nutrisyon",
    "subtitle": "Nagmumungkahi ang app ng calories, tubig at nutrition ratio batay sa goal mo.",
    "noProfileTitle": "Kumpletuhin muna ang profile",
    "noProfileText": "Ilagay ang height, weight at goal para sa personalized calories, macros at water targets.",
    "targets": "Daily goals",
    "calories": "Calories",
    "water": "Tubig",
    "macros": "Macro split",
    "protein": "Protein",
    "carbs": "Carbs",
    "fats": "Fat",
    "sampleMeals": "Sample meals",
    "tips": "Advice",
    "advancedTitle": "Professional nutrition analysis",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Adjustment",
    "kcalPerDay": "kcal/day",
    "mealSplit": "Meal calorie split",
    "hydration": "Water schedule",
    "note": "Important note",
    "screenTitle": "Nutrisyon",
    "heroStep": "3",
    "heroTitleLine1": "Personal na",
    "heroTitleLine2": "nutrition plan",
    "dailyGoal": "Daily goals",
    "edit": "Edit",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Macro ratio",
    "carb": "Carb",
    "fat": "Fat",
    "viewAll": "View all",
    "breakfast": "Almusal",
    "lunch": "Tanghalian",
    "dinner": "Hapunan",
    "snack": "Snack",
    "mealPlan": "Meal suggestions",
    "tipFallback": "Uminom ng sapat na tubig at piliin ang pagkaing mataas sa protein.",
    "footer1": "Simula ngayon,",
    "footer2": "mas magandang bersyon mo",
    "science": "Science",
    "effective": "Effective",
    "sustainable": "Sustainable",
    "advancedMode": "ADVANCED MODE",
    "pro": "PRO",
    "advancedMealPlan": "Advanced meal plan",
    "advancedMealPlanKicker": "MEAL OPTIONS",
    "advancedMealPlanDesc": "Pumili ng maraming meal para sa bawat oras ng araw. Tinataya ang calories at macros para mas madaling magplano.",
    "mealGroups": {
      "breakfast": "Almusal options",
      "lunch": "Tanghalian options",
      "dinner": "Hapunan options",
      "snack": "Snack options"
    },
    "goals": {
      "lose_weight": "Fat loss",
      "build_muscle": "Build muscle",
      "maintain": "Maintain",
      "recomp": "Body recomposition",
      "endurance": "Endurance",
      "flexibility": "General wellness"
    },
    "activity": {
      "sedentary": "Sedentary",
      "light": "Light activity",
      "moderate": "Moderate activity",
      "active": "Active",
      "very_active": "Very active"
    },
    "bmiLabels": {
      "under": "Underweight",
      "normal": "Normal",
      "over": "Overweight",
      "obese": "Obese"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • mga {{calories}} kcal",
      "lunch": "{{meal}} • mga {{calories}} kcal",
      "dinner": "{{meal}} • mga {{calories}} kcal",
      "snack": "{{meal}} • mga {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "Umaga: 500ml pagkagising",
      "beforeWorkout": "Bago mag-workout: 300–500ml",
      "duringWorkout": "Habang nag-workout: maliliit na inom bawat 10–15 minuto",
      "evening": "Gabi: tapusin ang natitirang water target"
    },
    "dynamicTips": {
      "protein": "Targetin ang humigit-kumulang {{proteinG}}g protein bawat araw at hatiin ito sa 3–4 meals.",
      "water": "Uminom ng mga {{waterLiters}}L tubig araw-araw. Dagdagan sa mainit na araw o matinding workout.",
      "fiber": "Targetin ang hindi bababa sa {{fiberG}}g fiber mula sa gulay, prutas, beans at whole grains.",
      "lose_weight": "Panatilihin ang katamtamang calorie deficit. Iwasang sobrang bawasan ang calories.",
      "build_muscle": "Pagsamahin ang maliit na calorie surplus at progressive strength training.",
      "recomp": "Unahin ang protein at consistency. Kailangan ng oras ang body recomposition.",
      "injured": "Dahil may injury kang nilagay, iwasan ang aggressive deficit at unahin ang recovery foods.",
      "healthNote": "May health note ka. Gamitin ang planong ito bilang general guidance."
    },
    "warnings": {
      "lowCalories": "Mababa ang target calories mo. Siguraduhing sapat ang protein, micronutrients at recovery.",
      "lowBmi": "Mababa ang BMI. Maaaring hindi angkop ang fat-loss goal.",
      "injured": "May injury: unahin ang recovery, tulog, hydration at joint-friendly training.",
      "healthNote": "May health note: hindi ito medical advice."
    },
    "summary": "{{goalLabel}} plan: {{calories}} kcal/day, {{proteinG}}g protein, {{carbsG}}g carbs, {{fatsG}}g fat. Estimated BMR {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Oatmeal na may saging at peanut butter",
        "desc": "Oats, saging, peanut butter at gatas"
      },
      "bf_2": {
        "title": "Itlog, whole grain toast at avocado",
        "desc": "Itlog, whole grain toast, avocado at gulay"
      },
      "bf_3": {
        "title": "Greek yogurt bowl",
        "desc": "Greek yogurt, berries, saging at granola"
      },
      "bf_4": {
        "title": "Protein smoothie",
        "desc": "Whey protein, saging, oats, gatas at peanut butter"
      },
      "ln_1": {
        "title": "Grilled chicken rice bowl",
        "desc": "Chicken breast, kanin, broccoli at olive oil"
      },
      "ln_2": {
        "title": "Lean beef at kamote",
        "desc": "Lean beef, kamote at mixed vegetables"
      },
      "ln_3": {
        "title": "Tofu quinoa salad",
        "desc": "Tofu, quinoa, greens, kamatis at avocado"
      },
      "ln_4": {
        "title": "Turkey wrap combo",
        "desc": "Turkey wrap, gulay at yogurt dip"
      },
      "dn_1": {
        "title": "Salmon na may patatas at salad",
        "desc": "Salmon, pinakuluang patatas at green salad"
      },
      "dn_2": {
        "title": "Lean beef na may kanin at gulay",
        "desc": "Lean beef, kanin at gulay"
      },
      "dn_3": {
        "title": "White fish at steamed vegetables",
        "desc": "White fish, gulay at kaunting kanin"
      },
      "dn_4": {
        "title": "Chicken pasta",
        "desc": "Chicken breast, whole wheat pasta at tomato sauce"
      },
      "sn_1": {
        "title": "Protein yogurt at nuts",
        "desc": "Greek yogurt, almonds at berries"
      },
      "sn_2": {
        "title": "Protein shake at saging",
        "desc": "Whey shake na may saging"
      },
      "sn_3": {
        "title": "Mansanas na may peanut butter",
        "desc": "Hiwang mansanas na may peanut butter"
      },
      "sn_4": {
        "title": "Cottage cheese cup",
        "desc": "Cottage cheese na may prutas"
      }
    }
  },
  "pt": {
    "title": "Nutrição",
    "subtitle": "O app sugere calorias, água e proporções nutricionais conforme seu objetivo.",
    "noProfileTitle": "Complete seu perfil primeiro",
    "noProfileText": "Adicione altura, peso e objetivo para receber metas personalizadas de calorias, macros e água.",
    "targets": "Metas diárias",
    "calories": "Calorias",
    "water": "Água",
    "macros": "Distribuição de macros",
    "protein": "Proteína",
    "carbs": "Carboidratos",
    "fats": "Gorduras",
    "sampleMeals": "Refeições exemplo",
    "tips": "Dicas",
    "advancedTitle": "Análise nutricional profissional",
    "bmi": "BMI",
    "bmr": "BMR",
    "tdee": "TDEE",
    "adjustment": "Ajuste",
    "kcalPerDay": "kcal/dia",
    "mealSplit": "Divisão de calorias por refeição",
    "hydration": "Cronograma de hidratação",
    "note": "Nota importante",
    "screenTitle": "Nutrição",
    "heroStep": "3",
    "heroTitleLine1": "Plano nutricional",
    "heroTitleLine2": "personalizado",
    "dailyGoal": "Metas diárias",
    "edit": "Editar",
    "kcal": "kcal",
    "liter": "L",
    "macroRatio": "Proporção macro",
    "carb": "Carboidratos",
    "fat": "Gordura",
    "viewAll": "Ver tudo",
    "breakfast": "Café da manhã",
    "lunch": "Almoço",
    "dinner": "Jantar",
    "snack": "Lanche",
    "mealPlan": "Sugestões de refeições",
    "tipFallback": "Beba água suficiente e priorize alimentos ricos em proteína.",
    "footer1": "A partir de hoje,",
    "footer2": "uma versão melhor de você",
    "science": "Ciência",
    "effective": "Eficaz",
    "sustainable": "Sustentável",
    "advancedMode": "MODO AVANÇADO",
    "pro": "PRO",
    "advancedMealPlan": "Plano alimentar avançado",
    "advancedMealPlanKicker": "OPÇÕES DE REFEIÇÃO",
    "advancedMealPlanDesc": "Escolha várias refeições para cada momento do dia. Calorias e macros são estimados para facilitar o planejamento.",
    "mealGroups": {
      "breakfast": "Opções de café da manhã",
      "lunch": "Opções de almoço",
      "dinner": "Opções de jantar",
      "snack": "Opções de lanche"
    },
    "goals": {
      "lose_weight": "Perda de gordura",
      "build_muscle": "Ganho muscular",
      "maintain": "Manutenção",
      "recomp": "Recomposição corporal",
      "endurance": "Resistência",
      "flexibility": "Bem-estar geral"
    },
    "activity": {
      "sedentary": "Sedentário",
      "light": "Atividade leve",
      "moderate": "Atividade moderada",
      "active": "Ativo",
      "very_active": "Muito ativo"
    },
    "bmiLabels": {
      "under": "Abaixo do peso",
      "normal": "Normal",
      "over": "Sobrepeso",
      "obese": "Obesidade"
    },
    "simpleMeal": {
      "breakfast": "{{meal}} • cerca de {{calories}} kcal",
      "lunch": "{{meal}} • cerca de {{calories}} kcal",
      "dinner": "{{meal}} • cerca de {{calories}} kcal",
      "snack": "{{meal}} • cerca de {{calories}} kcal"
    },
    "hydrationSchedule": {
      "morning": "Manhã: 500ml ao acordar",
      "beforeWorkout": "Antes do treino: 300–500ml",
      "duringWorkout": "Durante o treino: pequenos goles a cada 10–15 minutos",
      "evening": "Noite: complete o restante da meta de água"
    },
    "dynamicTips": {
      "protein": "Mire cerca de {{proteinG}}g de proteína por dia e distribua em 3–4 refeições.",
      "water": "Beba cerca de {{waterLiters}}L de água por dia. Aumente em dias quentes ou treinos intensos.",
      "fiber": "Mire pelo menos {{fiberG}}g de fibras de vegetais, frutas, leguminosas e grãos integrais.",
      "lose_weight": "Mantenha um déficit calórico moderado. Evite cortar calorias de forma agressiva.",
      "build_muscle": "Combine um pequeno superávit calórico com treino de força progressivo.",
      "recomp": "Priorize proteína e consistência. Recomposição corporal leva tempo.",
      "injured": "Como você marcou lesão, evite déficits agressivos e priorize alimentos de recuperação.",
      "healthNote": "Você adicionou uma nota de saúde. Use este plano como orientação geral."
    },
    "warnings": {
      "lowCalories": "Sua meta de calorias é baixa. Garanta proteína, micronutrientes e recuperação suficientes.",
      "lowBmi": "O BMI está baixo. Uma meta de perda de gordura pode não ser adequada.",
      "injured": "Lesão marcada: priorize recuperação, sono, hidratação e treino amigável às articulações.",
      "healthNote": "Nota de saúde detectada: este plano não é aconselhamento médico."
    },
    "summary": "Plano de {{goalLabel}}: {{calories}} kcal/dia, {{proteinG}}g proteína, {{carbsG}}g carboidratos, {{fatsG}}g gorduras. BMR estimado {{bmr}}, TDEE {{tdee}}.",
    "mealOptions": {
      "bf_1": {
        "title": "Aveia com banana e pasta de amendoim",
        "desc": "Aveia, banana, pasta de amendoim e leite"
      },
      "bf_2": {
        "title": "Ovos, torrada integral e abacate",
        "desc": "Ovos, pão integral, abacate e vegetais"
      },
      "bf_3": {
        "title": "Bowl de iogurte grego",
        "desc": "Iogurte grego, frutas vermelhas, banana e granola"
      },
      "bf_4": {
        "title": "Smoothie de proteína",
        "desc": "Whey protein, banana, aveia, leite e pasta de amendoim"
      },
      "ln_1": {
        "title": "Bowl de arroz com frango grelhado",
        "desc": "Peito de frango, arroz, brócolis e azeite"
      },
      "ln_2": {
        "title": "Carne magra com batata-doce",
        "desc": "Carne magra, batata-doce e legumes"
      },
      "ln_3": {
        "title": "Salada de tofu e quinoa",
        "desc": "Tofu, quinoa, folhas verdes, tomate e abacate"
      },
      "ln_4": {
        "title": "Wrap de peru",
        "desc": "Wrap de peru, vegetais e molho de iogurte"
      },
      "dn_1": {
        "title": "Salmão com batatas e salada",
        "desc": "Salmão, batatas cozidas e salada verde"
      },
      "dn_2": {
        "title": "Carne magra com arroz e legumes",
        "desc": "Carne magra, arroz e legumes"
      },
      "dn_3": {
        "title": "Peixe branco e legumes no vapor",
        "desc": "Peixe branco, legumes e pequena porção de arroz"
      },
      "dn_4": {
        "title": "Macarrão com frango",
        "desc": "Peito de frango, massa integral e molho de tomate"
      },
      "sn_1": {
        "title": "Iogurte proteico e castanhas",
        "desc": "Iogurte grego, amêndoas e frutas vermelhas"
      },
      "sn_2": {
        "title": "Shake de proteína e banana",
        "desc": "Shake de whey com banana"
      },
      "sn_3": {
        "title": "Maçã com pasta de amendoim",
        "desc": "Fatias de maçã com pasta de amendoim"
      },
      "sn_4": {
        "title": "Copo de cottage",
        "desc": "Cottage com fruta"
      }
    }
  }
} as const;

const baseWithNutrition = deepMerge(base, {
  nutrition: nutritionI18nPatch.en,
});

const resources = {
  en: { translation: deepMerge(deepMerge(baseWithNutrition, base), { nutrition: nutritionI18nPatch.en }) },
  vi: { translation: deepMerge(deepMerge(baseWithNutrition, vi), { nutrition: nutritionI18nPatch.vi }) },
  es: { translation: deepMerge(deepMerge(baseWithNutrition, es), { nutrition: nutritionI18nPatch.es }) },
  fr: { translation: deepMerge(deepMerge(baseWithNutrition, fr), { nutrition: nutritionI18nPatch.fr }) },
  de: { translation: deepMerge(deepMerge(baseWithNutrition, de), { nutrition: nutritionI18nPatch.de }) },
  zh: { translation: deepMerge(deepMerge(baseWithNutrition, zh), { nutrition: nutritionI18nPatch.zh }) },
  ja: { translation: deepMerge(deepMerge(baseWithNutrition, ja), { nutrition: nutritionI18nPatch.ja }) },
  ko: { translation: deepMerge(deepMerge(baseWithNutrition, ko), { nutrition: nutritionI18nPatch.ko }) },
  ru: { translation: deepMerge(deepMerge(baseWithNutrition, ru), { nutrition: nutritionI18nPatch.ru }) },
  ar: { translation: deepMerge(deepMerge(baseWithNutrition, ar), { nutrition: nutritionI18nPatch.ar }) },
  hi: { translation: deepMerge(deepMerge(baseWithNutrition, hi), { nutrition: nutritionI18nPatch.hi }) },
  th: { translation: deepMerge(deepMerge(baseWithNutrition, th), { nutrition: nutritionI18nPatch.th }) },
  id: { translation: deepMerge(deepMerge(baseWithNutrition, id), { nutrition: nutritionI18nPatch.id }) },
  ms: { translation: deepMerge(deepMerge(baseWithNutrition, ms), { nutrition: nutritionI18nPatch.ms }) },
  fil: { translation: deepMerge(deepMerge(baseWithNutrition, fil), { nutrition: nutritionI18nPatch.fil }) },
  pt: { translation: deepMerge(deepMerge(baseWithNutrition, pt), { nutrition: nutritionI18nPatch.pt }) },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources,
  interpolation: { escapeValue: false },
});

(async () => {
  try {
    const saved = await AsyncStorage.getItem(LANG_KEY);
    if (saved) await i18n.changeLanguage(saved);
  } catch {}
})();

export { LANG_KEY };
export default i18n;