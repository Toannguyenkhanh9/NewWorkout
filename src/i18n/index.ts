import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// (Tùy bạn giữ RNLocalize hay không. Ở đây mình dùng Intl + AsyncStorage)
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANG_KEY = 'app:lang';

const base = {
  appName: 'WorkoutApp',
  footer: { devBy: 'Developer by {{name}}' },
  tabs: {
    main: 'Main',
    nutrition: 'Nutrition',
    guide: 'Guide',
    premium: 'Premium',
    settings: 'Settings',
    workout: 'Workout',
    more: 'More',
    program: 'Program',
    profile: 'User Profile',
    weightChart: 'Weight Chart',
  },
  home: {
    title: 'Choose your workout plan',
    subtitle: 'Pick a program and train daily',
    program60: '60-Day Fat Burn Program',
    program90: '90-Day Full Body Program',
    daysSuffix: '{{count}} days',
    health_overview: 'Health overview',
    activeTitle: 'Practicing',
    noActive: 'There is no program currently training.',
  },
  program: {
    daysPrefix: 'Day {{day}} • {{weekday}}',
    weekTitle: 'Week {{n}}',
    completed: 'Completed',
    todayWorkout: 'Workout: {{name}}',
  },
  workouts: {
    rest: 'Recovery / Rest',
    hiit: 'Full-body HIIT',
    upper: 'Chest - Shoulder - Arms',
    lower: 'Glutes - Legs',
    core: 'Abs & Core',
    pickOne: 'Choose a lesson plan to get started',
    day: 'days'
  },
  guide: {
    title: 'How to Use PulseFit',
    subtitle: 'Follow these simple steps to start your workout journey.',

    steps: {
      step1: {
        badge: 'Step 1',
        title: 'Enter your personal information',
        desc: 'Fill in your height, weight, health condition, goals, and other basic information. The app will calculate your BMI and provide health advice to help you get started safely.'
      },
      step2: {
        badge: 'Step 2',
        title: 'Choose a suitable workout program',
        desc: 'Browse the available workout programs and pick the one that best matches your fitness level, goals, and preferences.'
      },
      step3: {
        badge: 'Step 3',
        title: 'Select your workout day',
        desc: 'Open the selected program and choose the training day you want to follow. You can continue step by step based on the workout schedule.'
      },
      step4: {
        badge: 'Step 4',
        title: 'Train with the video',
        desc: 'Follow the workout video to exercise correctly. You can rotate your phone horizontally to watch the video in full screen for a better experience.'
      }
    },

    noteTitle: 'Note',
    note: 'Stay consistent with your training schedule to achieve the best results.'
  },
  premium: {
    title: 'Upgrade Premium',
    removeAds: 'Remove ads',
    allPrograms: 'Unlock the full experience',
    active: 'Premium is active',
    restore: 'Restore purchases',
    restoreTitle: 'Restore purchases',
    restoreSuccess: 'Premium restored successfully.',
    restoreEmpty: 'No Premium purchase found.',
    errorTitle: 'Purchase failed',
    errorText: 'Unable to complete purchase.',
    productUnavailable: 'Premium product not found. Please check Play Console / App Store setup.',
    subUnavailable: 'Monthly subscription not found. Please check Play Console / App Store setup.',
    loading: 'Loading...',

    monthlyTitle: 'Monthly Premium',
    monthlyDesc: 'Auto-renews every month to keep Premium active',
    subscribeMonthly: 'Subscribe monthly',

    lifetimeTitle: 'Lifetime Premium',
    lifetimeDesc: 'One-time payment, keep Premium forever',
    buyLifetime: 'Buy lifetime'
  },
  video: {
    loading: 'Loading video...',
    play: 'Start workout',
    error: 'Unable to play video. Please try again.',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    choose: 'Choose a language',
  },
  onboard: {
    title: 'Let’s get started 👋',
    subtitle: 'Enter a few details so we can suggest a suitable plan',
    name: 'Full name *',
    age: 'Age *',
    gender: 'Gender *',
    gender_male: 'Male',
    gender_female: 'Female',
    gender_other: 'Other',
    health: 'Health condition',
    height: 'Height (cm) *',
    weight: 'Weight (kg) *',
    injured_q: 'Any injury?',
    injury_note: 'Injury description',
    goal: 'Current goal *',
    goals: {
      lose_weight: 'Lose weight',
      build_muscle: 'Build muscle',
      maintain: 'Maintain',
      recomp: 'Recomp (lose fat + build muscle)',
      endurance: 'Endurance',
      flexibility: 'Flexibility',
    },
    tip_title: 'Quick tips',
    tip_1:
      'If injured, start with low-impact exercises and increase gradually.',
    tip_2: 'Update your weight every 3 days to track progress.',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    saving: 'Saving...',
    bmi: 'BMI',
    bmi_result_title: 'Health overview',
    bmi_label_under: 'Underweight',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Overweight',
    bmi_label_obese: 'Obese',
    advice_intro: '• Your BMI: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Focus on gaining lean mass: full-body/upper-lower at moderate intensity; increase load; adequate protein and calories.',
    advice_bmi_normal:
      '• Maintain: mix strength + moderate cardio (2–3 days/week); prioritize technique and sleep.',
    advice_bmi_over:
      '• Fat loss: moderate cardio/light HIIT 2–3 days + full-body strength; slight calorie deficit.',
    advice_bmi_obese:
      '• Safe fat loss: brisk walk/low-impact cardio + basic strength; monitor HR, increase intensity gradually.',
    advice_goal_lose_weight:
      '• Goal: Lose weight → track calories, 1.6–2.2g/kg protein, 7–8h sleep.',
    advice_goal_build_muscle:
      '• Goal: Build muscle → progressive overload 3–5 days/week, 1.6–2.2g/kg protein, slight surplus.',
    advice_goal_maintain:
      '• Goal: Maintain → 3 days/week, balanced strength + cardio, weigh-in weekly.',
    advice_goal_recomp:
      '• Goal: Recomp → basic lifting + high protein, slight deficit, sleep well.',
    advice_goal_endurance:
      '• Goal: Endurance → zone 2 + intervals; fuel with carbs pre-workout.',
    advice_goal_flexibility:
      '• Goal: Flexibility → daily mobility/ROM 10–20’, add light strength.',
    advice_injured:
      '• Injury note: low-impact, pain-free ROM; progress gradually; consult coach/doctor as needed.',
    advice_healthnote:
      '• Monitor noted health conditions and adjust intensity accordingly.',
    start_training: 'Start training',
  },
  weight: {
    prompt_title: 'Update weight',
    prompt_desc: 'Enter your current weight (kg)',
    prompt_placeholder: 'e.g. 65.5',
    later: 'Later',
    save: 'Save',
    chart_title: 'Weight tracking',
    chart_empty:
      'No data yet. The app will periodically remind you to log your weight.',
  },
  UserProfile: {
    title: 'User Profile',
    subtitle: 'Enter your info to get personalized workout recommendations',

    name_label: 'Full name *',
    name_ph: 'e.g., John Doe',

    age_label: 'Age',
    age_ph: 'e.g., 28',
    gender_label: 'Gender',
    gender_male: 'Male',
    gender_female: 'Female',
    gender_other: 'Other',
    height_label: 'Height (cm)',
    height_ph: 'e.g., 170',
    weight_label: 'Weight (kg)',
    weight_ph: 'e.g., 65',
    bmi: 'BMI',
    bmi_label_under: 'Underweight',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Overweight',
    bmi_label_obese: 'Obese',
    health_label: 'Health status',
    health_ph:
      'e.g., Blood pressure stable, sleeping well, returning to training…',

    injured_q: 'Any injuries?',
    injury_label: 'Injury details',
    injury_ph:
      'e.g., Left knee pain, limit deep squats; shoulder pain during press…',
    hint_fill_hw: 'Enter height & weight to get suggestions.',
    rec_injured:
      'Recommendation: prioritize light CORE/Upper sessions with more Rest days.',
    rec_overweight:
      'Recommendation: Fat-loss plan (light → moderate HIIT) alternating with Lower/Core.',
    rec_general:
      'Recommendation: Full-body plan (foundational strength + Core).',
    loading: 'Loading…',
    save_success_title: 'Saved',
    save_error_title: 'Error',
    save_error_msg: "Couldn't save your data. Please try again.",
    btn_delete: 'Delete',
    btn_save: 'Save',
  },
  dashboard: { title: 'Progress Dashboard', streak: 'Streak', thisWeek: 'This week', total: 'Total', completedPrograms: 'Completed', lastWorkout: 'Last workout' }, recommend: { title: 'Recommended for you', start: 'Start this plan' }, nutrition: { title: 'Nutrition', subtitle: 'Your daily targets are personalized based on your current profile and goal.', noProfileTitle: 'Complete your profile first', noProfileText: 'Add your height, weight and goal to get calorie, macro and hydration recommendations.', targets: 'Daily targets', calories: 'Calories', water: 'Water', macros: 'Macro split', protein: 'Protein', carbs: 'Carbs', fats: 'Fats', sampleMeals: 'Sample meal plan', tips: 'Tips' },
beginner: {
  modeTitle: 'Beginner mode',
  modeDesc: 'Simple explanations and quick guidance for new users.',
  glossaryTitle: 'Beginner guide',
  terms: {
    restDay: {
      title: 'Rest day',
      desc: 'A recovery day. Your body rests and rebuilds, so do not skip it.'
    },
    warmUp: {
      title: 'Warm-up',
      desc: 'Light movement before training to prepare your body and reduce injury risk.'
    },
    cooldown: {
      title: 'Cooldown',
      desc: 'Easy movement or stretching after training to help your body recover.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'High-Intensity Interval Training: short bursts of hard work followed by short rest.'
    },
    rep: {
      title: 'Rep',
      desc: 'One complete movement of an exercise. Example: one squat = one rep.'
    },
    set: {
      title: 'Set',
      desc: 'A group of reps. Example: 10 squats done together = 1 set.'
    }
  }
},
todayWorkout: {
  title: "Today's workout",
  fallback: 'Workout',
  startNow: 'Start now',
  restTitle: 'Today is a recovery day',
  restText: 'Take a break, stretch gently, drink water, and get ready for your next workout.'
},
common: {
  on: 'ON',
  off: 'OFF'
},
history: {
  title: 'Workout History',
  screenTitle: 'Workout History',
  thisWeek: 'This week',
  minutes: 'Minutes',
  totalWorkouts: 'Workouts',
  empty: 'No completed workouts yet.',
  viewAll: 'View all',
  filter7: '7 days',
  filter30: '30 days',
  filterAll: 'All'
},
achievements: {
  title: 'Achievements'
},
challenges: {
  title: 'Challenges',
  start7: 'Start 7-day challenge',
  start30: 'Start 30-day challenge',
  complete: 'Challenge completed',
  daysLeft: '{{count}} day(s) left',
  starter7Title: '7-Day Starter Challenge',
  starter7Desc: 'Complete 5 workouts in 7 days.',
  consistency30Title: '30-Day Consistency Challenge',
  consistency30Desc: 'Complete 20 workouts in 30 days.'
}
};

const vi = {
  appName: 'WorkoutApp',
  footer: { devBy: 'Developer by {{name}}' },
  tabs: {
    main: 'Chính',

    nutrition: 'Dinh dưỡng',

    guide: 'Hướng dẫn',

    premium: 'Cao cấp',

    settings: 'Cài đặt',

    workout: 'Bài tập',

    more: 'Thêm',

    program: 'Chương trình',

    profile: 'Hồ sơ người dùng',

    weightChart: 'Biểu đồ cân nặng',
  },
  home: {
    title: 'Chọn chương trình tập',
    subtitle: 'Chọn 1 giáo án và luyện tập mỗi ngày',
    program60: 'Giáo án Giảm mỡ 60 ngày',
    program90: 'Giáo án Toàn thân 90 ngày',
    daysSuffix: '{{count}} ngày',
    health_overview: 'Tổng quan sức khỏe',
    activeTitle: 'Đang tập luyện',
  },
  program: {
    daysPrefix: 'Ngày {{day}} • {{weekday}}',
    weekTitle: 'Tuần {{n}}',
    completed: 'Đã hoàn thành',
    todayWorkout: 'Bài tập: {{name}}',
  },
  workouts: {
    rest: 'Phục hồi / Nghỉ ngơi',
    hiit: 'HIIT toàn thân',
    upper: 'Ngực - Vai - Tay',
    lower: 'Mông - Đùi',
    core: 'Bụng & Core',
    pickOne: 'Chọn một giáo án để bắt đầu',
    days: 'ngày'
  },
  guide: {
    title: 'Hướng dẫn sử dụng PulseFit',
    subtitle: 'Làm theo các bước đơn giản sau để bắt đầu hành trình tập luyện của bạn.',

    steps: {
      step1: {
        badge: 'Bước 1',
        title: 'Nhập thông tin cá nhân',
        desc: 'Điền chiều cao, cân nặng, tình trạng sức khỏe, mục tiêu và các thông tin cơ bản khác. Ứng dụng sẽ tính chỉ số BMI và đưa ra lời khuyên về sức khỏe để bạn bắt đầu an toàn hơn.'
      },
      step2: {
        badge: 'Bước 2',
        title: 'Chọn chương trình luyện tập phù hợp',
        desc: 'Xem danh sách các chương trình luyện tập và chọn chương trình phù hợp nhất với thể trạng, mục tiêu và sở thích của bạn.'
      },
      step3: {
        badge: 'Bước 3',
        title: 'Chọn ngày tập',
        desc: 'Mở chương trình đã chọn và chọn ngày tập mà bạn muốn thực hiện. Bạn có thể tập lần lượt theo lịch trình đã sắp xếp.'
      },
      step4: {
        badge: 'Bước 4',
        title: 'Tập luyện theo video',
        desc: 'Làm theo video hướng dẫn để tập đúng động tác. Bạn có thể xoay ngang màn hình điện thoại để xem video toàn màn hình rõ hơn.'
      }
    },

    noteTitle: 'Chú ý',
    note: 'Hãy duy trì tập luyện đều đặn để đạt kết quả tốt nhất.'
  },
  // vi
  premium: {
    title: 'Nâng cấp Premium',
    removeAds: 'Xóa quảng cáo',
    allPrograms: 'Mở khóa toàn bộ trải nghiệm',
    active: 'Premium đang hoạt động',
    restore: 'Khôi phục giao dịch',
    restoreTitle: 'Khôi phục giao dịch',
    restoreSuccess: 'Đã khôi phục Premium thành công.',
    restoreEmpty: 'Không tìm thấy giao dịch Premium.',
    errorTitle: 'Mua hàng thất bại',
    errorText: 'Không thể hoàn tất giao dịch.',
    productUnavailable: 'Không tìm thấy sản phẩm Premium. Vui lòng kiểm tra Play Console / App Store.',
    subUnavailable: 'Không tìm thấy gói thuê bao tháng. Vui lòng kiểm tra Play Console / App Store.',
    loading: 'Đang tải...',

    monthlyTitle: 'Premium theo tháng',
    monthlyDesc: 'Tự động gia hạn mỗi tháng để duy trì Premium',
    subscribeMonthly: 'Đăng ký theo tháng',

    lifetimeTitle: 'Premium trọn đời',
    lifetimeDesc: 'Thanh toán một lần, sử dụng Premium mãi mãi',
    buyLifetime: 'Mua trọn đời'
  },
  video: {
    loading: 'Đang tải video...',
    play: 'Bắt đầu tập',
    error: 'Không thể phát video. Vui lòng thử lại.',
  },
  settings: {
    title: 'Cài đặt',
    language: 'Ngôn ngữ',
    choose: 'Chọn ngôn ngữ',
  },
  onboard: {
    title: 'Cùng bắt đầu nào 👋',
    subtitle: 'Nhập một vài thông tin để chúng tôi gợi ý kế hoạch phù hợp',
    name: 'Họ và tên *',
    age: 'Tuổi *',
    gender: 'Giới tính *',
    gender_male: 'Nam',
    gender_female: 'Nữ',
    gender_other: 'Khác',
    health: 'Tình trạng sức khỏe',
    height: 'Chiều cao (cm) *',
    weight: 'Cân nặng (kg) *',
    injured_q: 'Bạn có chấn thương không?',
    injury_note: 'Mô tả chấn thương',
    goal: 'Mục tiêu hiện tại *',
    goals: {
      lose_weight: 'Giảm cân',
      build_muscle: 'Tăng cơ',
      maintain: 'Duy trì',
      recomp: 'Tăng cơ giảm mỡ (Recomp)',
      endurance: 'Tăng sức bền',
      flexibility: 'Tăng độ dẻo dai',
    },
    tip_title: 'Mẹo nhanh',
    tip_1:
      'Nếu có chấn thương, hãy bắt đầu với các bài tập nhẹ nhàng và tăng dần cường độ.',
    tip_2: 'Cập nhật cân nặng mỗi 3 ngày để theo dõi tiến độ.',
    back: 'Quay lại',
    next: 'Tiếp theo',
    finish: 'Hoàn tất',
    saving: 'Đang lưu...',
    bmi: 'BMI',
    bmi_result_title: 'Tổng quan sức khỏe',
    bmi_label_under: 'Thiếu cân',
    bmi_label_normal: 'Bình thường',
    bmi_label_over: 'Thừa cân',
    bmi_label_obese: 'Béo phì',
    advice_intro: '• BMI của bạn: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Tập trung tăng khối lượng nạc: tập toàn thân/thân trên-dưới với cường độ vừa phải; tăng mức tạ; nạp đủ protein và calo.',
    advice_bmi_normal:
      '• Duy trì: kết hợp tập sức mạnh + cardio vừa phải (2–3 ngày/tuần); ưu tiên kỹ thuật và giấc ngủ.',
    advice_bmi_over:
      '• Giảm mỡ: cardio vừa phải/HIIT nhẹ 2–3 ngày + tập sức mạnh toàn thân; thâm hụt calo nhẹ.',
    advice_bmi_obese:
      '• Giảm mỡ an toàn: đi bộ nhanh/cardio tác động thấp + tập sức mạnh cơ bản; theo dõi nhịp tim, tăng cường độ dần dần.',
    advice_goal_lose_weight:
      '• Mục tiêu: Giảm cân → theo dõi calo, 1.6–2.2g/kg protein, ngủ 7–8 tiếng.',
    advice_goal_build_muscle:
      '• Mục tiêu: Tăng cơ → quá tải lũy tiến (progressive overload) 3–5 ngày/tuần, 1.6–2.2g/kg protein, thặng dư calo nhẹ.',
    advice_goal_maintain:
      '• Mục tiêu: Duy trì → 3 ngày/tuần, cân bằng sức mạnh + cardio, cân mỗi tuần.',
    advice_goal_recomp:
      '• Mục tiêu: Recomp → tập tạ cơ bản + protein cao, thâm hụt calo nhẹ, ngủ đủ giấc.',
    advice_goal_endurance:
      '• Mục tiêu: Sức bền → tập vùng zone 2 + biến tốc (intervals); nạp carb trước khi tập.',
    advice_goal_flexibility:
      '• Mục tiêu: Dẻo dai → tập vận động (mobility)/ROM hàng ngày 10–20 phút, thêm tập sức mạnh nhẹ.',
    advice_injured:
      '• Ghi chú chấn thương: tập tác động thấp, trong phạm vi không đau (ROM); tiến bộ dần dần; tham khảo ý kiến HLV/bác sĩ khi cần.',
    advice_healthnote:
      '• Theo dõi các tình trạng sức khỏe đã ghi chú và điều chỉnh cường độ phù hợp.',
    start_training: 'Bắt đầu tập luyện',
  },
  weight: {
    prompt_title: 'Cập nhật cân nặng',
    prompt_desc: 'Nhập cân nặng hiện tại (kg)',
    prompt_placeholder: 'vd: 65.5',
    later: 'Để sau',
    save: 'Lưu',
    chart_title: 'Theo dõi cân nặng',
    chart_empty:
      'Chưa có dữ liệu. Ứng dụng sẽ định kỳ nhắc bạn ghi lại cân nặng.',
  },
  UserProfile: {
    title: 'Hồ sơ người dùng',
    subtitle: 'Nhập thông tin để nhận gợi ý bài tập được cá nhân hóa',

    name_label: 'Họ và tên *',
    name_ph: 'vd: Nguyễn Văn A',

    age_label: 'Tuổi',
    age_ph: 'vd: 28',
    gender_label: 'Giới tính',
    gender_male: 'Nam',
    gender_female: 'Nữ',
    gender_other: 'Khác',
    height_label: 'Chiều cao (cm)',
    height_ph: 'vd: 170',
    weight_label: 'Cân nặng (kg)',
    weight_ph: 'vd: 65',
    bmi: 'BMI',
    bmi_label_under: 'Thiếu cân',
    bmi_label_normal: 'Bình thường',
    bmi_label_over: 'Thừa cân',
    bmi_label_obese: 'Béo phì',
    health_label: 'Tình trạng sức khỏe',
    health_ph:
      'vd: Huyết áp ổn định, ngủ ngon, mới tập lại...',

    injured_q: 'Có chấn thương không?',
    injury_label: 'Chi tiết chấn thương',
    injury_ph:
      'vd: Đau đầu gối trái, hạn chế squat sâu; đau vai khi đẩy...',
    hint_fill_hw: 'Nhập chiều cao & cân nặng để nhận gợi ý.',
    rec_injured:
      'Khuyến nghị: ưu tiên các buổi tập Bụng/Thân trên nhẹ nhàng với nhiều ngày nghỉ hơn.',
    rec_overweight:
      'Khuyến nghị: Kế hoạch giảm mỡ (HIIT nhẹ → vừa) xen kẽ với Thân dưới/Bụng.',
    rec_general:
      'Khuyến nghị: Kế hoạch toàn thân (sức mạnh nền tảng + Bụng).',
    loading: 'Đang tải...',
    save_success_title: 'Đã lưu',
    save_error_title: 'Lỗi',
    save_error_msg: "Không thể lưu dữ liệu. Vui lòng thử lại.",
    btn_delete: 'Xóa',
    btn_save: 'Lưu',
  },
  // vi
  dashboard: {
    title: 'Bảng tiến độ',
    streak: 'Chuỗi liên tiếp',
    thisWeek: 'Tuần này',
    total: 'Tổng cộng',
    completedPrograms: 'Đã hoàn thành',
    lastWorkout: 'Buổi tập gần nhất'
  },
  recommend: {
    title: 'Gợi ý cho bạn',
    start: 'Bắt đầu giáo án này'
  },
  nutrition: {
    title: 'Dinh dưỡng',
    subtitle: 'Mục tiêu hằng ngày của bạn được cá nhân hóa dựa trên hồ sơ hiện tại và mục tiêu của bạn.',
    noProfileTitle: 'Hãy hoàn thành hồ sơ trước',
    noProfileText: 'Thêm chiều cao, cân nặng và mục tiêu để nhận gợi ý về calories, macro và lượng nước.',
    targets: 'Mục tiêu hằng ngày',
    calories: 'Calories',
    water: 'Nước',
    macros: 'Tỷ lệ macro',
    protein: 'Protein',
    carbs: 'Carb',
    fats: 'Chất béo',
    sampleMeals: 'Gợi ý thực đơn',
    tips: 'Mẹo'
  },
  filters: {
    all: 'All',

    levelTitle: 'Level',
    level: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },

    goalTitle: 'Focus',
    goal: {
      lose_weight: 'Lose weight',
      build_muscle: 'Build muscle',
      cardio: 'Cardio',
      core: 'Core',
      mobility: 'Mobility',
    },

    equipmentTitle: 'Equipment',
    equipment: {
      no_equipment: 'No equipment',
      with_equipment: 'With equipment',
    },

    durationTitle: 'Duration',
    duration: {
      short: 'Short',
      medium: 'Medium',
      long: 'Long',
    },

    noResultsTitle: 'No matching programs',
    noResultsText: 'Try changing one or more filters.',
  },
// vi
beginner: {
  modeTitle: 'Chế độ người mới',
  modeDesc: 'Giải thích đơn giản và hướng dẫn nhanh cho người dùng mới.',
  glossaryTitle: 'Hướng dẫn cho người mới',
  terms: {
    restDay: {
      title: 'Ngày nghỉ',
      desc: 'Đây là ngày phục hồi. Cơ thể của bạn nghỉ ngơi và tái tạo, vì vậy đừng bỏ qua.'
    },
    warmUp: {
      title: 'Khởi động',
      desc: 'Các động tác nhẹ trước khi tập để chuẩn bị cơ thể và giảm nguy cơ chấn thương.'
    },
    cooldown: {
      title: 'Thả lỏng',
      desc: 'Các động tác nhẹ hoặc giãn cơ sau khi tập để giúp cơ thể phục hồi tốt hơn.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'Bài tập cường độ cao ngắt quãng: những khoảng tập nặng ngắn xen kẽ với thời gian nghỉ ngắn.'
    },
    rep: {
      title: 'Rep',
      desc: 'Một lần thực hiện hoàn chỉnh của một động tác. Ví dụ: 1 lần squat = 1 rep.'
    },
    set: {
      title: 'Set',
      desc: 'Một nhóm rep. Ví dụ: 10 lần squat thực hiện liên tiếp = 1 set.'
    }
  }
},
todayWorkout: {
  title: 'Buổi tập hôm nay',
  fallback: 'Bài tập',
  startNow: 'Bắt đầu ngay',
  restTitle: 'Hôm nay là ngày phục hồi',
  restText: 'Hãy nghỉ ngơi, giãn cơ nhẹ, uống nước và chuẩn bị cho buổi tập tiếp theo.'
},

common: {
  on: 'BẬT',
  off: 'TẮT'
},
// vi
history: {
  title: 'Lịch sử tập luyện',
  screenTitle: 'Lịch sử tập luyện',
  thisWeek: 'Tuần này',
  minutes: 'Phút',
  totalWorkouts: 'Buổi tập',
  empty: 'Chưa có buổi tập nào hoàn thành.',
  viewAll: 'Xem tất cả',
  filter7: '7 ngày',
  filter30: '30 ngày',
  filterAll: 'Tất cả'
},
achievements: {
  title: 'Thành tích',
  firstWorkout: 'Buổi tập đầu tiên',
  tenWorkouts: '10 buổi tập',
  twentyfiveWorkouts: '25 buổi tập',
  streak3: 'Chuỗi 3 ngày',
  streak7: 'Chuỗi 7 ngày',
  week4: '4 buổi tập trong tuần này',
  finishProgram: 'Hoàn thành 1 chương trình'
},
challenges: {
  title: 'Thử thách',
  intro: 'Bắt đầu một thử thách ngắn để duy trì sự đều đặn.',
  start7: 'Bắt đầu thử thách 7 ngày',
  start30: 'Bắt đầu thử thách 30 ngày',
  complete: 'Đã hoàn thành thử thách',
  daysLeft: 'Còn {{count}} ngày',
  starter7Title: 'Thử thách khởi động 7 ngày',
  starter7Desc: 'Hoàn thành 5 buổi tập trong 7 ngày.',
  consistency30Title: 'Thử thách duy trì 30 ngày',
  consistency30Desc: 'Hoàn thành 20 buổi tập trong 30 ngày.'
}


};

// (Rút gọn – các ngôn ngữ khác dùng base + vài chỗ override nếu cần)
const es = {
  ...base,
  tabs: {
    main: 'Principal', // Hoặc 'Início' tùy ngữ cảnh
    nutrition: 'Nutrição',
    guide: 'Guia',
    premium: 'Premium',
    settings: 'Configurações',
    workout: 'Treino',
    more: 'Mais',
    program: 'Programa',
    profile: 'Perfil do Usuário',
    weightChart: 'Gráfico de Peso',
  },
  home: {
    title: 'Escolha seu plano de treino',
    subtitle: 'Escolha um programa e treine diariamente',
    program60: 'Programa de Queima de Gordura 60 Dias',
    program90: 'Programa de Corpo Inteiro 90 Dias',
    daysSuffix: '{{count}} dias',
    health_overview: 'Visão geral da saúde',
    activeTitle: 'Em andamento', // Hoặc 'Treinando'
    noActive: 'Não há nenhum programa em treinamento no momento.',
  },
  program: {
    daysPrefix: 'Dia {{day}} • {{weekday}}',
    weekTitle: 'Semana {{n}}',
    completed: 'Concluído',
    todayWorkout: 'Treino: {{name}}',
  },
  workouts: {
    rest: 'Recuperação / Descanso',
    hiit: 'HIIT de corpo inteiro',
    upper: 'Peito - Ombros - Braços',
    lower: 'Glúteos - Pernas',
    core: 'Abdômen & Core',
    pickOne: 'Escolha um plano para começar',
    days: 'Día',
  },
  guide: {
    title: 'Cómo usar PulseFit',
    subtitle: 'Sigue estos sencillos pasos para comenzar tu rutina de entrenamiento.',

    steps: {
      step1: {
        badge: 'Paso 1',
        title: 'Introduce tu información personal',
        desc: 'Completa tu altura, peso, estado de salud, objetivos y otra información básica. La aplicación calculará tu IMC y te dará consejos de salud para ayudarte a comenzar de forma segura.'
      },
      step2: {
        badge: 'Paso 2',
        title: 'Elige un programa de entrenamiento adecuado',
        desc: 'Explora los programas disponibles y elige el que mejor se adapte a tu nivel físico, objetivos y preferencias.'
      },
      step3: {
        badge: 'Paso 3',
        title: 'Selecciona tu día de entrenamiento',
        desc: 'Abre el programa elegido y selecciona el día de entrenamiento que deseas seguir. Puedes avanzar paso a paso según el calendario del programa.'
      },
      step4: {
        badge: 'Paso 4',
        title: 'Entrena con el video',
        desc: 'Sigue el video de entrenamiento para ejercitarte correctamente. Puedes girar el teléfono horizontalmente para ver el video en pantalla completa y tener una mejor experiencia.'
      }
    },

    noteTitle: 'Nota',
    note: 'Mantén la constancia en tu entrenamiento para obtener los mejores resultados.'
  },
  video: {
    loading: 'Carregando vídeo...',
    play: 'Iniciar treino',
    error: 'Não foi possível reproduzir. Tente novamente.',
  },
  settings: {
    title: 'Configurações',
    language: 'Idioma',
    choose: 'Escolha um idioma',
  },
  onboard: {
    title: 'Vamos começar 👋',
    subtitle: 'Insira alguns detalhes para sugerirmos o plano ideal',
    name: 'Nome completo *',
    age: 'Idade *',
    gender: 'Gênero *',
    gender_male: 'Masculino',
    gender_female: 'Feminino',
    gender_other: 'Outro',
    health: 'Condição de saúde',
    height: 'Altura (cm) *',
    weight: 'Peso (kg) *',
    injured_q: 'Alguma lesão?',
    injury_note: 'Descrição da lesão',
    goal: 'Objetivo atual *',
    goals: {
      lose_weight: 'Perder peso',
      build_muscle: 'Ganhar massa muscular',
      maintain: 'Manter peso',
      recomp: 'Recomposição (perder gordura + ganhar músculo)',
      endurance: 'Resistência',
      flexibility: 'Flexibilidade',
    },
    tip_title: 'Dicas rápidas',
    tip_1:
      'Se estiver lesionado, comece com exercícios de baixo impacto e aumente gradualmente.',
    tip_2: 'Atualize seu peso a cada 3 dias para acompanhar o progresso.',
    back: 'Voltar',
    next: 'Próximo',
    finish: 'Concluir',
    saving: 'Salvando...',
    bmi: 'IMC', // Índice de Massa Corporal
    bmi_result_title: 'Visão geral da saúde',
    bmi_label_under: 'Abaixo do peso',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Sobrepeso',
    bmi_label_obese: 'Obesidade',
    advice_intro: '• Seu IMC: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Foco em ganhar massa magra: treino de corpo inteiro/superior-inferior com intensidade moderada; aumente a carga; proteína e calorias adequadas.',
    advice_bmi_normal:
      '• Manter: misture força + cardio moderado (2–3 dias/sem); priorize técnica e sono.',
    advice_bmi_over:
      '• Perda de gordura: cardio moderado/HIIT leve 2–3 dias + força total; leve déficit calórico.',
    advice_bmi_obese:
      '• Perda segura: caminhada rápida/cardio de baixo impacto + força básica; monitore a FC, aumente a intensidade gradualmente.',
    advice_goal_lose_weight:
      '• Objetivo: Perder peso → monitore calorias, 1.6–2.2g/kg de proteína, 7–8h de sono.',
    advice_goal_build_muscle:
      '• Objetivo: Músculos → sobrecarga progressiva 3–5 dias/sem, 1.6–2.2g/kg de proteína, leve superávit calórico.',
    advice_goal_maintain:
      '• Objetivo: Manter → 3 dias/sem, equilíbrio entre força + cardio, pese-se semanalmente.',
    advice_goal_recomp:
      '• Objetivo: Recomposição → musculação básica + alta proteína, leve déficit, durma bem.',
    advice_goal_endurance:
      '• Objetivo: Resistência → zona 2 + intervalos; consuma carboidratos antes do treino.',
    advice_goal_flexibility:
      '• Objetivo: Flexibilidade → mobilidade diária/ADM 10–20 min, adicione força leve.',
    advice_injured:
      '• Nota sobre lesão: baixo impacto, ADM sem dor; progrida gradualmente; consulte um médico/treinador se necessário.',
    advice_healthnote:
      '• Monitore as condições de saúde anotadas e ajuste a intensidade de acordo.',
    start_training: 'Começar treino',
  },
  weight: {
    prompt_title: 'Atualizar peso',
    prompt_desc: 'Insira seu peso atual (kg)',
    prompt_placeholder: 'ex: 65.5',
    later: 'Depois',
    save: 'Salvar',
    chart_title: 'Acompanhamento de peso',
    chart_empty:
      'Sem dados ainda. O app lembrará você periodicamente de registrar seu peso.',
  },
  UserProfile: {
    title: 'Perfil do Usuário',
    subtitle: 'Insira seus dados para obter recomendações personalizadas',

    name_label: 'Nome completo *',
    name_ph: 'ex: João Silva',

    age_label: 'Idade',
    age_ph: 'ex: 28',
    gender_label: 'Gênero',
    gender_male: 'Masculino',
    gender_female: 'Feminino',
    gender_other: 'Outro',
    height_label: 'Altura (cm)',
    height_ph: 'ex: 170',
    weight_label: 'Peso (kg)',
    weight_ph: 'ex: 65',
    bmi: 'IMC',
    bmi_label_under: 'Abaixo do peso',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Sobrepeso',
    bmi_label_obese: 'Obesidade',
    health_label: 'Estado de saúde',
    health_ph:
      'ex: Pressão estável, dormindo bem, retornando aos treinos...',

    injured_q: 'Alguma lesão?',
    injury_label: 'Detalhes da lesão',
    injury_ph:
      'ex: Dor no joelho esquerdo, evitar agachamento profundo; dor no ombro...',
    hint_fill_hw: 'Insira altura e peso para ver sugestões.',
    rec_injured:
      'Recomendação: priorize sessões leves de Core/Superior com mais dias de descanso.',
    rec_overweight:
      'Recomendação: Plano de perda de gordura (HIIT leve → moderado) alternando com Inferior/Core.',
    rec_general:
      'Recomendação: Plano de corpo inteiro (força fundamental + Core).',
    loading: 'Carregando...',
    save_success_title: 'Salvo',
    save_error_title: 'Erro',
    save_error_msg: "Não foi possível salvar seus dados. Tente novamente.",
    btn_delete: 'Excluir',
    btn_save: 'Salvar',
  },
  // es
  dashboard: {
    title: 'Panel de progreso',
    streak: 'Racha',
    thisWeek: 'Esta semana',
    total: 'Total',
    completedPrograms: 'Completado',
    lastWorkout: 'Último entrenamiento'
  },
  recommend: {
    title: 'Recomendado para ti',
    start: 'Comenzar este plan'
  },
  nutrition: {
    title: 'Nutrición',
    subtitle: 'Tus objetivos diarios se personalizan según tu perfil actual y tu meta.',
    noProfileTitle: 'Completa primero tu perfil',
    noProfileText: 'Agrega tu altura, peso y objetivo para obtener recomendaciones de calorías, macronutrientes e hidratación.',
    targets: 'Objetivos diarios',
    calories: 'Calorías',
    water: 'Agua',
    macros: 'Distribución de macros',
    protein: 'Proteína',
    carbs: 'Carbohidratos',
    fats: 'Grasas',
    sampleMeals: 'Plan de comidas de ejemplo',
    tips: 'Consejos'
  },
  // es
  // es
  premium: {
    title: 'Actualizar a Premium',
    removeAds: 'Eliminar anuncios',
    allPrograms: 'Desbloquea la experiencia completa',
    active: 'Premium está activo',
    restore: 'Restaurar compras',
    restoreTitle: 'Restaurar compras',
    restoreSuccess: 'Premium restaurado correctamente.',
    restoreEmpty: 'No se encontró ninguna compra Premium.',
    errorTitle: 'Compra fallida',
    errorText: 'No se pudo completar la compra.',
    productUnavailable: 'No se encontró el producto Premium. Verifica la configuración de Play Console / App Store.',
    subUnavailable: 'No se encontró la suscripción mensual. Verifica la configuración de Play Console / App Store.',
    loading: 'Cargando...',

    monthlyTitle: 'Premium mensual',
    monthlyDesc: 'Se renueva automáticamente cada mes para mantener Premium activo',
    subscribeMonthly: 'Suscribirse mensualmente',

    lifetimeTitle: 'Premium de por vida',
    lifetimeDesc: 'Pago único, mantén Premium para siempre',
    buyLifetime: 'Comprar de por vida'
  },
  // es
  filters: {
    all: 'Todos',

    levelTitle: 'Nivel',
    level: {
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    },

    goalTitle: 'Enfoque',
    goal: {
      lose_weight: 'Perder peso',
      build_muscle: 'Ganar músculo',
      cardio: 'Cardio',
      core: 'Core',
      mobility: 'Movilidad',
    },

    equipmentTitle: 'Equipo',
    equipment: {
      no_equipment: 'Sin equipo',
      with_equipment: 'Con equipo',
    },

    durationTitle: 'Duración',
    duration: {
      short: 'Corta',
      medium: 'Media',
      long: 'Larga',
    },

    noResultsTitle: 'No hay programas coincidentes',
    noResultsText: 'Prueba cambiar uno o más filtros.',
  },
  // es
beginner: {
  modeTitle: 'Modo principiante',
  modeDesc: 'Explicaciones sencillas y guía rápida para nuevos usuarios.',
  glossaryTitle: 'Guía para principiantes',
  terms: {
    restDay: {
      title: 'Día de descanso',
      desc: 'Es un día de recuperación. Tu cuerpo descansa y se reconstruye, así que no lo omitas.'
    },
    warmUp: {
      title: 'Calentamiento',
      desc: 'Movimiento ligero antes de entrenar para preparar tu cuerpo y reducir el riesgo de lesiones.'
    },
    cooldown: {
      title: 'Vuelta a la calma',
      desc: 'Movimiento suave o estiramientos después de entrenar para ayudar a tu cuerpo a recuperarse.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'Entrenamiento de intervalos de alta intensidad: ráfagas cortas de trabajo intenso seguidas de descansos breves.'
    },
    rep: {
      title: 'Repetición',
      desc: 'Un movimiento completo de un ejercicio. Ejemplo: una sentadilla = una repetición.'
    },
    set: {
      title: 'Serie',
      desc: 'Un grupo de repeticiones. Ejemplo: 10 sentadillas seguidas = 1 serie.'
    }
  }
},
todayWorkout: {
  title: 'Entrenamiento de hoy',
  fallback: 'Entrenamiento',
  startNow: 'Empezar ahora',
  restTitle: 'Hoy es un día de recuperación',
  restText: 'Tómate un descanso, estira suavemente, bebe agua y prepárate para tu próximo entrenamiento.'
},
// es
// es
history: {
  title: 'Historial de entrenamiento',
  screenTitle: 'Historial de entrenamiento',
  thisWeek: 'Esta semana',
  minutes: 'Minutos',
  totalWorkouts: 'Entrenamientos',
  empty: 'Aún no hay entrenamientos completados.',
  viewAll: 'Ver todo',
  filter7: '7 días',
  filter30: '30 días',
  filterAll: 'Todos'
},
achievements: {
  title: 'Logros',
  firstWorkout: 'Primer entrenamiento',
  tenWorkouts: '10 entrenamientos',
  twentyfiveWorkouts: '25 entrenamientos',
  streak3: 'Racha de 3 días',
  streak7: 'Racha de 7 días',
  week4: '4 entrenamientos esta semana',
  finishProgram: 'Completa 1 programa'
},
challenges: {
  title: 'Desafíos',
  intro: 'Empieza un desafío corto para mantener la constancia.',
  start7: 'Iniciar desafío de 7 días',
  start30: 'Iniciar desafío de 30 días',
  complete: 'Desafío completado',
  daysLeft: 'Quedan {{count}} día(s)',
  starter7Title: 'Desafío inicial de 7 días',
  starter7Desc: 'Completa 5 entrenamientos en 7 días.',
  consistency30Title: 'Desafío de constancia de 30 días',
  consistency30Desc: 'Completa 20 entrenamientos en 30 días.'
}
};
const fr = {
  ...base,
  tabs: {
    main: 'Accueil', // Hoặc 'Principal'
    nutrition: 'Nutrition',
    guide: 'Guide',
    premium: 'Premium',
    settings: 'Paramètres', // Hoặc 'Réglages' (thường dùng trên iOS)
    workout: 'Entraînement',
    more: 'Plus',
    program: 'Programme',
    profile: 'Profil utilisateur', // Có thể rút gọn thành 'Profil'
    weightChart: 'Graphique de poids',
  },
  home: {
    title: 'Choisissez votre plan d’entraînement',
    subtitle: 'Sélectionnez un programme et entraînez-vous chaque jour',
    program60: 'Programme Brûle-graisse 60 jours',
    program90: 'Programme Corps complet 90 jours',
    daysSuffix: '{{count}} jours',
    health_overview: 'Bilan santé',
    activeTitle: 'En cours',
    noActive: 'Aucun programme n’est suivi actuellement.',
  },
  program: {
    daysPrefix: 'Jour {{day}} • {{weekday}}',
    weekTitle: 'Semaine {{n}}',
    completed: 'Terminé',
    todayWorkout: 'Entraînement : {{name}}',
  },
  workouts: {
    rest: 'Récupération / Repos',
    hiit: 'HIIT Corps complet', // Hoặc 'HIIT Full-body'
    upper: 'Haut du corps : Pecs - Épaules - Bras',
    lower: 'Bas du corps : Fessiers - Jambes',
    core: 'Abdos & Gainage', // 'Core' thường dịch là Gainage (Plank/Core)
    pickOne: 'Choisissez un programme pour commencer',
    days: 'Jour',
  },
  // es
  guide: {
    title: 'Cómo usar PulseFit',
    subtitle: 'Sigue estos sencillos pasos para comenzar tu rutina de entrenamiento.',

    steps: {
      step1: {
        badge: 'Paso 1',
        title: 'Introduce tu información personal',
        desc: 'Completa tu altura, peso, estado de salud, objetivos y otra información básica. La aplicación calculará tu IMC y te dará consejos de salud para ayudarte a comenzar de forma segura.'
      },
      step2: {
        badge: 'Paso 2',
        title: 'Elige un programa de entrenamiento adecuado',
        desc: 'Explora los programas disponibles y elige el que mejor se adapte a tu nivel físico, objetivos y preferencias.'
      },
      step3: {
        badge: 'Paso 3',
        title: 'Selecciona tu día de entrenamiento',
        desc: 'Abre el programa elegido y selecciona el día de entrenamiento que deseas seguir. Puedes avanzar paso a paso según el calendario del programa.'
      },
      step4: {
        badge: 'Paso 4',
        title: 'Entrena con el video',
        desc: 'Sigue el video de entrenamiento para ejercitarte correctamente. Puedes girar el teléfono horizontalmente para ver el video en pantalla completa y tener una mejor experiencia.'
      }
    },

    noteTitle: 'Nota',
    note: 'Mantén la constancia en tu entrenamiento para obtener los mejores resultados.'
  },
  video: {
    loading: 'Chargement...',
    play: 'Commencer l’entraînement',
    error: 'Impossible de lire la vidéo. Veuillez réessayer.',
  },
  settings: {
    title: 'Paramètres',
    language: 'Langue',
    choose: 'Choisir une langue',
  },
  onboard: {
    title: 'C’est parti 👋',
    subtitle: 'Entrez quelques détails pour un plan adapté',
    name: 'Nom complet *',
    age: 'Âge *',
    gender: 'Sexe *',
    gender_male: 'Homme',
    gender_female: 'Femme',
    gender_other: 'Autre',
    health: 'État de santé',
    height: 'Taille (cm) *',
    weight: 'Poids (kg) *',
    injured_q: 'Avez-vous une blessure ?',
    injury_note: 'Description de la blessure',
    goal: 'Objectif actuel *',
    goals: {
      lose_weight: 'Perdre du poids',
      build_muscle: 'Prendre du muscle',
      maintain: 'Maintenir',
      recomp: 'Recomposition (perdre gras + prendre muscle)',
      endurance: 'Endurance',
      flexibility: 'Souplesse',
    },
    tip_title: 'Conseils rapides',
    tip_1:
      'En cas de blessure, commencez par des exercices à faible impact et augmentez progressivement.',
    tip_2: 'Mettez à jour votre poids tous les 3 jours pour suivre vos progrès.',
    back: 'Retour',
    next: 'Suivant',
    finish: 'Terminer',
    saving: 'Enregistrement...',
    bmi: 'IMC', // Indice de masse corporelle
    bmi_result_title: 'Bilan santé',
    bmi_label_under: 'Insuffisance pondérale', // Hoặc 'Maigreur'
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Surpoids',
    bmi_label_obese: 'Obésité',
    advice_intro: '• Votre IMC : {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Focus prise de masse : corps complet/haut-bas à intensité modérée ; augmenter la charge ; protéines et calories adéquates.',
    advice_bmi_normal:
      '• Maintien : mix force + cardio modéré (2–3 j/sem) ; priorité à la technique et au sommeil.',
    advice_bmi_over:
      '• Perte de gras : cardio modéré/HIIT léger 2–3 j + force corps complet ; léger déficit calorique.',
    advice_bmi_obese:
      '• Perte sûre : marche rapide/cardio faible impact + force base ; surveiller FC, augmenter intensité progressivement.',
    advice_goal_lose_weight:
      '• Objectif : Perdre poids → suivre calories, 1.6–2.2g/kg protéine, 7–8h sommeil.',
    advice_goal_build_muscle:
      '• Objectif : Muscle → surcharge progressive 3–5 j/sem, 1.6–2.2g/kg protéine, léger surplus.',
    advice_goal_maintain:
      '• Objectif : Maintien → 3 j/sem, équilibre force + cardio, pesée hebdomadaire.',
    advice_goal_recomp:
      '• Objectif : Recomp → muscu base + haute protéine, léger déficit, bien dormir.',
    advice_goal_endurance:
      '• Objectif : Endurance → zone 2 + intervalles ; glucides avant l’effort.',
    advice_goal_flexibility:
      '• Objectif : Souplesse → mobilité quotidienne/amplitude 10–20 min, ajouter force légère.',
    advice_injured:
      '• Note blessure : faible impact, amplitude sans douleur ; progrès graduel ; consulter coach/médecin si besoin.',
    advice_healthnote:
      '• Surveillez les problèmes de santé notés et ajustez l’intensité en conséquence.',
    start_training: 'Commencer l’entraînement',
  },
  weight: {
    prompt_title: 'Mise à jour du poids',
    prompt_desc: 'Entrez votre poids actuel (kg)',
    prompt_placeholder: 'ex : 65.5',
    later: 'Plus tard',
    save: 'Enregistrer',
    chart_title: 'Suivi du poids',
    chart_empty:
      'Pas encore de données. L’appli vous rappellera périodiquement de noter votre poids.',
  },
  UserProfile: {
    title: 'Profil utilisateur',
    subtitle: 'Entrez vos infos pour des recommandations personnalisées',

    name_label: 'Nom complet *',
    name_ph: 'ex : Jean Dupont',

    age_label: 'Âge',
    age_ph: 'ex : 28',
    gender_label: 'Sexe', // 'Genre' cũng được dùng phổ biến
    gender_male: 'Homme',
    gender_female: 'Femme',
    gender_other: 'Autre',
    height_label: 'Taille (cm)',
    height_ph: 'ex : 170',
    weight_label: 'Poids (kg)',
    weight_ph: 'ex : 65',
    bmi: 'IMC',
    bmi_label_under: 'Insuffisance pondérale',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Surpoids',
    bmi_label_obese: 'Obésité',
    health_label: 'État de santé',
    health_ph:
      'ex : Tension stable, bon sommeil, reprise du sport...',

    injured_q: 'Des blessures ?',
    injury_label: 'Détails de la blessure',
    injury_ph:
      'ex : Douleur genou gauche, éviter squats profonds ; épaule...',
    hint_fill_hw: 'Entrez taille & poids pour voir les suggestions.',
    rec_injured:
      'Recommandation : prioriser séances Gainage/Haut légères avec plus de repos.',
    rec_overweight:
      'Recommandation : Plan perte de gras (HIIT léger → modéré) alterné avec Bas/Gainage.',
    rec_general:
      'Recommandation : Plan corps complet (force fondamentale + Gainage).',
    loading: 'Chargement...',
    save_success_title: 'Enregistré',
    save_error_title: 'Erreur',
    save_error_msg: "Impossible d'enregistrer. Veuillez réessayer.",
    btn_delete: 'Supprimer',
    btn_save: 'Enregistrer',
  },
  // fr
  dashboard: {
    title: 'Tableau de progression',
    streak: 'Série',
    thisWeek: 'Cette semaine',
    total: 'Total',
    completedPrograms: 'Terminés',
    lastWorkout: 'Dernier entraînement'
  },
  recommend: {
    title: 'Recommandé pour vous',
    start: 'Commencer ce programme'
  },
  nutrition: {
    title: 'Nutrition',
    subtitle: 'Vos objectifs quotidiens sont personnalisés selon votre profil actuel et votre objectif.',
    noProfileTitle: 'Complétez d’abord votre profil',
    noProfileText: 'Ajoutez votre taille, votre poids et votre objectif pour obtenir des recommandations de calories, de macros et d’hydratation.',
    targets: 'Objectifs quotidiens',
    calories: 'Calories',
    water: 'Eau',
    macros: 'Répartition des macros',
    protein: 'Protéines',
    carbs: 'Glucides',
    fats: 'Lipides',
    sampleMeals: 'Exemple de plan de repas',
    tips: 'Conseils'
  },
  // fr
  // fr
  premium: {
    title: 'Passer à Premium',
    removeAds: 'Supprimer les publicités',
    allPrograms: 'Débloquez l’expérience complète',
    active: 'Premium est actif',
    restore: 'Restaurer les achats',
    restoreTitle: 'Restaurer les achats',
    restoreSuccess: 'Premium restauré avec succès.',
    restoreEmpty: 'Aucun achat Premium trouvé.',
    errorTitle: 'Échec de l’achat',
    errorText: 'Impossible de finaliser l’achat.',
    productUnavailable: 'Produit Premium introuvable. Veuillez vérifier la configuration de Play Console / App Store.',
    subUnavailable: 'Abonnement mensuel introuvable. Veuillez vérifier la configuration de Play Console / App Store.',
    loading: 'Chargement...',

    monthlyTitle: 'Premium mensuel',
    monthlyDesc: 'Renouvellement automatique chaque mois pour garder Premium actif',
    subscribeMonthly: 'S’abonner mensuellement',

    lifetimeTitle: 'Premium à vie',
    lifetimeDesc: 'Paiement unique, gardez Premium pour toujours',
    buyLifetime: 'Acheter à vie'
  },
  // fr
  filters: {
    all: 'Tous',

    levelTitle: 'Niveau',
    level: {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
    },

    goalTitle: 'Objectif',
    goal: {
      lose_weight: 'Perte de poids',
      build_muscle: 'Prise de muscle',
      cardio: 'Cardio',
      core: 'Abdos',
      mobility: 'Mobilité',
    },

    equipmentTitle: 'Équipement',
    equipment: {
      no_equipment: 'Sans équipement',
      with_equipment: 'Avec équipement',
    },

    durationTitle: 'Durée',
    duration: {
      short: 'Courte',
      medium: 'Moyenne',
      long: 'Longue',
    },

    noResultsTitle: 'Aucun programme correspondant',
    noResultsText: 'Essayez de modifier un ou plusieurs filtres.',
  },
  // fr
beginner: {
  modeTitle: 'Mode débutant',
  modeDesc: 'Des explications simples et un guide rapide pour les nouveaux utilisateurs.',
  glossaryTitle: 'Guide du débutant',
  terms: {
    restDay: {
      title: 'Jour de repos',
      desc: 'C’est un jour de récupération. Votre corps se repose et se reconstruit, alors ne le sautez pas.'
    },
    warmUp: {
      title: 'Échauffement',
      desc: 'Mouvements légers avant l’entraînement pour préparer votre corps et réduire le risque de blessure.'
    },
    cooldown: {
      title: 'Retour au calme',
      desc: 'Mouvements faciles ou étirements après l’entraînement pour aider votre corps à récupérer.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'Entraînement fractionné à haute intensité : de courtes phases d’effort intense suivies de courtes pauses.'
    },
    rep: {
      title: 'Répétition',
      desc: 'Un mouvement complet d’un exercice. Exemple : un squat = une répétition.'
    },
    set: {
      title: 'Série',
      desc: 'Un groupe de répétitions. Exemple : 10 squats effectués ensemble = 1 série.'
    }
  }
},
todayWorkout: {
  title: 'Entraînement du jour',
  fallback: 'Entraînement',
  startNow: 'Commencer maintenant',
  restTitle: 'Aujourd’hui est un jour de récupération',
  restText: 'Faites une pause, étirez-vous doucement, buvez de l’eau et préparez-vous pour votre prochain entraînement.'
},
// fr
history: {
  title: "Historique d'entraînement",
  screenTitle: "Historique d'entraînement",
  thisWeek: 'Cette semaine',
  minutes: 'Minutes',
  totalWorkouts: 'Entraînements',
  empty: "Aucun entraînement terminé pour l'instant.",
  viewAll: 'Voir tout',
  filter7: '7 jours',
  filter30: '30 jours',
  filterAll: 'Tous'
},
achievements: {
  title: 'Succès',
  firstWorkout: 'Premier entraînement',
  tenWorkouts: '10 entraînements',
  twentyfiveWorkouts: '25 entraînements',
  streak3: 'Série de 3 jours',
  streak7: 'Série de 7 jours',
  week4: '4 entraînements cette semaine',
  finishProgram: 'Terminer 1 programme'
},
challenges: {
  title: 'Défis',
  intro: 'Commencez un défi court pour rester régulier.',
  start7: 'Commencer le défi de 7 jours',
  start30: 'Commencer le défi de 30 jours',
  complete: 'Défi terminé',
  daysLeft: 'Il reste {{count}} jour(s)',
  starter7Title: 'Défi débutant de 7 jours',
  starter7Desc: 'Terminez 5 entraînements en 7 jours.',
  consistency30Title: 'Défi régularité de 30 jours',
  consistency30Desc: 'Terminez 20 entraînements en 30 jours.'
}
};
const de = {
  ...base,
  tabs: {
    main: 'Start', // Hoặc 'Übersicht' (Tổng quan)
    nutrition: 'Ernährung',
    guide: 'Anleitung', // Hoặc 'Ratgeber'
    premium: 'Premium',
    settings: 'Einstellungen',
    workout: 'Training', // Người Đức cũng hay dùng từ 'Workout'
    more: 'Mehr',
    program: 'Programm',
    profile: 'Benutzerprofil', // Có thể rút gọn thành 'Profil'
    weightChart: 'Gewichtsverlauf', // Nghĩa là "Diễn biến cân nặng", tự nhiên hơn 'Gewichtsdiagramm'
  },
  home: {
    title: 'Wähle deinen Trainingsplan',
    subtitle: 'Wähle ein Programm und trainiere täglich',
    program60: '60-Tage Fettverbrennungs-Programm',
    program90: '90-Tage Ganzkörper-Programm',
    daysSuffix: '{{count}} Tage',
    health_overview: 'Gesundheitsübersicht',
    activeTitle: 'In Arbeit', // Hoặc 'Aktiv'
    noActive: 'Derzeit wird kein Programm trainiert.',
  },
  program: {
    daysPrefix: 'Tag {{day}} • {{weekday}}',
    weekTitle: 'Woche {{n}}',
    completed: 'Abgeschlossen',
    todayWorkout: 'Training: {{name}}',
  },
  workouts: {
    rest: 'Erholung / Pause',
    hiit: 'Ganzkörper-HIIT',
    upper: 'Brust - Schulter - Arme',
    lower: 'Gesäß - Beine',
    core: 'Bauch & Rumpf', // "Rumpf" là từ chuyên môn cho Core
    pickOne: 'Wähle einen Plan, um zu starten',
    days: 'Tag',
  },
  guide: {
    title: 'So verwendest du PulseFit',
    subtitle: 'Folge diesen einfachen Schritten, um mit deinem Training zu beginnen.',

    steps: {
      step1: {
        badge: 'Schritt 1',
        title: 'Gib deine persönlichen Daten ein',
        desc: 'Trage Größe, Gewicht, Gesundheitszustand, Ziele und weitere grundlegende Informationen ein. Die App berechnet deinen BMI und gibt dir Gesundheitstipps für einen sicheren Start.'
      },
      step2: {
        badge: 'Schritt 2',
        title: 'Wähle ein passendes Trainingsprogramm',
        desc: 'Sieh dir die verfügbaren Programme an und wähle das aus, das am besten zu deinem Fitnesslevel, deinen Zielen und deinen Vorlieben passt.'
      },
      step3: {
        badge: 'Schritt 3',
        title: 'Wähle deinen Trainingstag',
        desc: 'Öffne das ausgewählte Programm und wähle den Trainingstag, dem du folgen möchtest. Du kannst den Plan Schritt für Schritt abarbeiten.'
      },
      step4: {
        badge: 'Schritt 4',
        title: 'Trainiere mit dem Video',
        desc: 'Folge dem Trainingsvideo, um korrekt zu trainieren. Du kannst dein Handy ins Querformat drehen, um das Video im Vollbild anzusehen.'
      }
    },

    noteTitle: 'Hinweis',
    note: 'Bleibe konsequent bei deinem Trainingsplan, um die besten Ergebnisse zu erzielen.'
  },
  video: {
    loading: 'Video lädt...',
    play: 'Training starten',
    error: 'Video kann nicht abgespielt werden. Bitte versuche es erneut.',
  },
  settings: {
    title: 'Einstellungen',
    language: 'Sprache',
    choose: 'Sprache wählen',
  },
  onboard: {
    title: 'Lass uns starten 👋',
    subtitle: 'Gib ein paar Details ein, damit wir den passenden Plan finden',
    name: 'Vollständiger Name *',
    age: 'Alter *',
    gender: 'Geschlecht *',
    gender_male: 'Männlich',
    gender_female: 'Weiblich',
    gender_other: 'Divers',
    health: 'Gesundheitszustand',
    height: 'Größe (cm) *',
    weight: 'Gewicht (kg) *',
    injured_q: 'Verletzungen?',
    injury_note: 'Beschreibung der Verletzung',
    goal: 'Aktuelles Ziel *',
    goals: {
      lose_weight: 'Abnehmen',
      build_muscle: 'Muskelaufbau',
      maintain: 'Gewicht halten',
      recomp: 'Rekomposition (Fettabbau + Muskelaufbau)',
      endurance: 'Ausdauer',
      flexibility: 'Beweglichkeit',
    },
    tip_title: 'Schnelle Tipps',
    tip_1:
      'Bei Verletzungen: Beginne mit schonenden Übungen und steigere dich langsam.',
    tip_2: 'Aktualisiere dein Gewicht alle 3 Tage, um den Fortschritt zu sehen.',
    back: 'Zurück',
    next: 'Weiter',
    finish: 'Fertig',
    saving: 'Speichern...',
    bmi: 'BMI',
    bmi_result_title: 'Gesundheitsübersicht',
    bmi_label_under: 'Untergewicht',
    bmi_label_normal: 'Normalgewicht',
    bmi_label_over: 'Übergewicht',
    bmi_label_obese: 'Adipositas', // Hoặc 'Starkes Übergewicht'
    advice_intro: '• Dein BMI: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Fokus Muskelaufbau: Ganzkörper/Ober-Unterkörper bei moderater Intensität; Last steigern; ausreichend Protein & Kalorien.',
    advice_bmi_normal:
      '• Erhalten: Mix aus Kraft + moderatem Cardio (2–3 Tage/Woche); Priorität auf Technik und Schlaf.',
    advice_bmi_over:
      '• Fettabbau: Moderates Cardio/leichtes HIIT 2–3 Tage + Ganzkörperkrafttraining; leichtes Kaloriendefizit.',
    advice_bmi_obese:
      '• Sicherer Abbau: Zügiges Gehen/schonendes Cardio + Basiskraft; Puls überwachen, Intensität langsam steigern.',
    advice_goal_lose_weight:
      '• Ziel: Abnehmen → Kalorien tracken, 1.6–2.2g/kg Protein, 7–8h Schlaf.',
    advice_goal_build_muscle:
      '• Ziel: Muskelaufbau → Progressive Überlastung 3–5 Tage/Woche, 1.6–2.2g/kg Protein, leichter Überschuss.',
    advice_goal_maintain:
      '• Ziel: Halten → 3 Tage/Woche, Balance Kraft + Cardio, wöchentlich wiegen.',
    advice_goal_recomp:
      '• Ziel: Rekomp → Basis-Krafttraining + viel Protein, leichtes Defizit, gut schlafen.',
    advice_goal_endurance:
      '• Ziel: Ausdauer → Zone 2 + Intervalle; Kohlenhydrate vor dem Training.',
    advice_goal_flexibility:
      '• Ziel: Beweglichkeit → Tägliche Mobilität/ROM 10–20 Min., leichtes Krafttraining ergänzen.',
    advice_injured:
      '• Hinweis Verletzung: Geringe Belastung, schmerzfreier Radius; langsam steigern; bei Bedarf Arzt/Trainer fragen.',
    advice_healthnote:
      '• Beachte die notierten gesundheitlichen Bedingungen und passe die Intensität an.',
    start_training: 'Training starten',
  },
  weight: {
    prompt_title: 'Gewicht aktualisieren',
    prompt_desc: 'Aktuelles Gewicht eingeben (kg)',
    prompt_placeholder: 'z. B. 65,5',
    later: 'Später',
    save: 'Speichern',
    chart_title: 'Gewichtsverlauf',
    chart_empty:
      'Noch keine Daten. Die App erinnert dich regelmäßig daran, dein Gewicht zu loggen.',
  },
  UserProfile: {
    title: 'Benutzerprofil',
    subtitle: 'Gib deine Infos ein für personalisierte Empfehlungen',

    name_label: 'Vollständiger Name *',
    name_ph: 'z. B. Max Mustermann',

    age_label: 'Alter',
    age_ph: 'z. B. 28',
    gender_label: 'Geschlecht',
    gender_male: 'Männlich',
    gender_female: 'Weiblich',
    gender_other: 'Divers',
    height_label: 'Größe (cm)',
    height_ph: 'z. B. 170',
    weight_label: 'Gewicht (kg)',
    weight_ph: 'z. B. 65',
    bmi: 'BMI',
    bmi_label_under: 'Untergewicht',
    bmi_label_normal: 'Normalgewicht',
    bmi_label_over: 'Übergewicht',
    bmi_label_obese: 'Adipositas',
    health_label: 'Gesundheitsstatus',
    health_ph:
      'z. B. Blutdruck stabil, guter Schlaf, Wiedereinstieg...',

    injured_q: 'Verletzungen?',
    injury_label: 'Details zur Verletzung',
    injury_ph:
      'z. B. Schmerzen im linken Knie, keine tiefen Kniebeugen...',
    hint_fill_hw: 'Größe & Gewicht eingeben für Vorschläge.',
    rec_injured:
      'Empfehlung: Priorisiere leichte Rumpf/Oberkörper-Einheiten mit mehr Ruhetagen.',
    rec_overweight:
      'Empfehlung: Fettabbau-Plan (leichtes → moderates HIIT) im Wechsel mit Unterkörper/Rumpf.',
    rec_general:
      'Empfehlung: Ganzkörper-Plan (Grundkraft + Rumpf).',
    loading: 'Lädt...',
    save_success_title: 'Gespeichert',
    save_error_title: 'Fehler',
    save_error_msg: "Daten konnten nicht gespeichert werden. Bitte erneut versuchen.",
    btn_delete: 'Löschen',
    btn_save: 'Speichern',
  },
  // de
  dashboard: {
    title: 'Fortschrittsübersicht',
    streak: 'Serie',
    thisWeek: 'Diese Woche',
    total: 'Gesamt',
    completedPrograms: 'Abgeschlossen',
    lastWorkout: 'Letztes Training'
  },
  recommend: {
    title: 'Empfohlen für dich',
    start: 'Diesen Plan starten'
  },
  nutrition: {
    title: 'Ernährung',
    subtitle: 'Deine täglichen Ziele werden basierend auf deinem aktuellen Profil und deinem Ziel personalisiert.',
    noProfileTitle: 'Vervollständige zuerst dein Profil',
    noProfileText: 'Füge Größe, Gewicht und Ziel hinzu, um Empfehlungen für Kalorien, Makros und Flüssigkeitszufuhr zu erhalten.',
    targets: 'Tägliche Ziele',
    calories: 'Kalorien',
    water: 'Wasser',
    macros: 'Makroverteilung',
    protein: 'Protein',
    carbs: 'Kohlenhydrate',
    fats: 'Fette',
    sampleMeals: 'Beispiel-Ernährungsplan',
    tips: 'Tipps'
  },
  // de
  // de
  premium: {
    title: 'Auf Premium upgraden',
    removeAds: 'Werbung entfernen',
    allPrograms: 'Das volle Erlebnis freischalten',
    active: 'Premium ist aktiv',
    restore: 'Käufe wiederherstellen',
    restoreTitle: 'Käufe wiederherstellen',
    restoreSuccess: 'Premium erfolgreich wiederhergestellt.',
    restoreEmpty: 'Kein Premium-Kauf gefunden.',
    errorTitle: 'Kauf fehlgeschlagen',
    errorText: 'Der Kauf konnte nicht abgeschlossen werden.',
    productUnavailable: 'Premium-Produkt nicht gefunden. Bitte prüfen Sie die Play Console / App Store-Konfiguration.',
    subUnavailable: 'Monatliches Abo nicht gefunden. Bitte prüfen Sie die Play Console / App Store-Konfiguration.',
    loading: 'Wird geladen...',

    monthlyTitle: 'Monatliches Premium',
    monthlyDesc: 'Verlängert sich jeden Monat automatisch, um Premium aktiv zu halten',
    subscribeMonthly: 'Monatlich abonnieren',

    lifetimeTitle: 'Premium auf Lebenszeit',
    lifetimeDesc: 'Einmalige Zahlung, Premium für immer behalten',
    buyLifetime: 'Lebenslang kaufen'
  },
  // de
  filters: {
    all: 'Alle',

    levelTitle: 'Niveau',
    level: {
      beginner: 'Anfänger',
      intermediate: 'Mittelstufe',
      advanced: 'Fortgeschritten',
    },

    goalTitle: 'Fokus',
    goal: {
      lose_weight: 'Abnehmen',
      build_muscle: 'Muskeln aufbauen',
      cardio: 'Cardio',
      core: 'Core',
      mobility: 'Mobilität',
    },

    equipmentTitle: 'Ausrüstung',
    equipment: {
      no_equipment: 'Ohne Geräte',
      with_equipment: 'Mit Geräten',
    },

    durationTitle: 'Dauer',
    duration: {
      short: 'Kurz',
      medium: 'Mittel',
      long: 'Lang',
    },

    noResultsTitle: 'Keine passenden Programme',
    noResultsText: 'Versuchen Sie, einen oder mehrere Filter zu ändern.',
  },
  // de
beginner: {
  modeTitle: 'Anfängermodus',
  modeDesc: 'Einfache Erklärungen und schnelle Hilfe für neue Nutzer.',
  glossaryTitle: 'Anfängerleitfaden',
  terms: {
    restDay: {
      title: 'Ruhetag',
      desc: 'Ein Erholungstag. Dein Körper ruht sich aus und baut sich wieder auf, also überspringe ihn nicht.'
    },
    warmUp: {
      title: 'Aufwärmen',
      desc: 'Leichte Bewegung vor dem Training, um deinen Körper vorzubereiten und das Verletzungsrisiko zu verringern.'
    },
    cooldown: {
      title: 'Abkühlen',
      desc: 'Leichte Bewegung oder Dehnen nach dem Training, damit sich dein Körper besser erholen kann.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'Hochintensives Intervalltraining: kurze Phasen harter Belastung, gefolgt von kurzen Pausen.'
    },
    rep: {
      title: 'Wiederholung',
      desc: 'Eine vollständige Ausführung einer Übung. Beispiel: eine Kniebeuge = eine Wiederholung.'
    },
    set: {
      title: 'Satz',
      desc: 'Eine Gruppe von Wiederholungen. Beispiel: 10 Kniebeugen am Stück = 1 Satz.'
    }
  }
},
todayWorkout: {
  title: 'Heutiges Training',
  fallback: 'Training',
  startNow: 'Jetzt starten',
  restTitle: 'Heute ist ein Erholungstag',
  restText: 'Mach eine Pause, dehne dich leicht, trinke Wasser und bereite dich auf dein nächstes Training vor.'
},
// de
history: {
  title: 'Trainingsverlauf',
  screenTitle: 'Trainingsverlauf',
  thisWeek: 'Diese Woche',
  minutes: 'Minuten',
  totalWorkouts: 'Workouts',
  empty: 'Noch keine abgeschlossenen Workouts.',
  viewAll: 'Alle anzeigen',
  filter7: '7 Tage',
  filter30: '30 Tage',
  filterAll: 'Alle'
},
achievements: {
  title: 'Erfolge',
  firstWorkout: 'Erstes Workout',
  tenWorkouts: '10 Workouts',
  twentyfiveWorkouts: '25 Workouts',
  streak3: '3-Tage-Serie',
  streak7: '7-Tage-Serie',
  week4: '4 Workouts diese Woche',
  finishProgram: '1 Programm abschließen'
},
challenges: {
  title: 'Challenges',
  intro: 'Starte eine kurze Challenge, um dranzubleiben.',
  start7: '7-Tage-Challenge starten',
  start30: '30-Tage-Challenge starten',
  complete: 'Challenge abgeschlossen',
  daysLeft: '{{count}} Tag(e) übrig',
  starter7Title: '7-Tage-Starter-Challenge',
  starter7Desc: 'Schließe 5 Workouts in 7 Tagen ab.',
  consistency30Title: '30-Tage-Konstanz-Challenge',
  consistency30Desc: 'Schließe 20 Workouts in 30 Tagen ab.'
}
};
const zh = {
  ...base,
  tabs: {
    main: '主页',

    nutrition: '营养',

    guide: '指南',

    premium: '高级版',

    settings: '设置',

    workout: '锻炼',

    more: '更多',

    program: '计划',

    profile: '用户个人资料',

    weightChart: '体重图表',
  },
  home: {
    ...base.home,
    title: '选择你的训练计划',
    subtitle: '选择课程并每日训练',
    program60: '60天燃脂计划',
    program90: '90天全身计划',
    daysSuffix: '{{count}} 天',
    health_overview: '健康概览',
  },
  program: {
    daysPrefix: '第 {{day}} 天 • {{weekday}}',
    weekTitle: '第 {{n}} 周',
    completed: '已完成',
    todayWorkout: '今日训练: {{name}}',
  },
  workouts: {
    rest: '恢复 / 休息',
    hiit: '全身 HIIT', // 高强度间歇训练
    upper: '胸 - 肩 - 手臂', // 上肢
    lower: '臀部 - 腿部', // 下肢
    core: '腹肌 & 核心',
    pickOne: '选择一个计划开始',
    days: '天',
  },
  // zh
  guide: {
    title: '如何使用 PulseFit',
    subtitle: '按照以下简单步骤开始你的训练之旅。',

    steps: {
      step1: {
        badge: '步骤 1',
        title: '输入个人信息',
        desc: '填写你的身高、体重、健康状况、目标以及其他基本信息。应用会计算你的 BMI，并提供健康建议，帮助你更安全地开始训练。'
      },
      step2: {
        badge: '步骤 2',
        title: '选择适合的训练计划',
        desc: '浏览可用的训练计划，选择最适合你的体能水平、目标和偏好的计划。'
      },
      step3: {
        badge: '步骤 3',
        title: '选择训练日',
        desc: '打开已选择的训练计划，并选择你要进行的训练日。你可以按照训练安排逐步完成。'
      },
      step4: {
        badge: '步骤 4',
        title: '跟随视频训练',
        desc: '按照训练视频正确完成动作。你可以将手机横屏，以全屏方式观看视频，获得更好的体验。'
      }
    },

    noteTitle: '注意',
    note: '请坚持规律训练，以获得最佳效果。'
  },
  video: {
    loading: '视频加载中...',
    play: '开始训练',
    error: '无法播放视频。请重试。',
  },
  settings: {
    title: '设置',
    language: '语言',
    choose: '选择语言',
  },
  onboard: {
    title: '让我们开始吧 👋',
    subtitle: '输入一些信息，以便我们为您推荐合适的计划',
    name: '全名 *',
    age: '年龄 *',
    gender: '性别 *',
    gender_male: '男',
    gender_female: '女',
    gender_other: '其他',
    health: '健康状况',
    height: '身高 (cm) *',
    weight: '体重 (kg) *',
    injured_q: '是否有伤病?',
    injury_note: '伤病描述',
    goal: '当前目标 *',
    goals: {
      lose_weight: '减重',
      build_muscle: '增肌',
      maintain: '保持',
      recomp: '身体重组 (减脂 + 增肌)',
      endurance: '耐力',
      flexibility: '柔韧性',
    },
    tip_title: '小贴士',
    tip_1:
      '如果有伤病，请从低冲击运动开始，并逐渐增加强度。',
    tip_2: '每 3 天更新一次体重以追踪进度。',
    back: '返回',
    next: '下一步',
    finish: '完成',
    saving: '保存中...',
    bmi: 'BMI',
    bmi_result_title: '健康概览',
    bmi_label_under: '体重过轻',
    bmi_label_normal: '正常',
    bmi_label_over: '超重',
    bmi_label_obese: '肥胖',
    advice_intro: '• 您的 BMI: {{bmi}} ({{label}})。',
    advice_bmi_under:
      '• 侧重增加瘦体重：中等强度的全身/上下肢分化训练；增加负重；摄入充足蛋白质和热量。',
    advice_bmi_normal:
      '• 保持：力量训练 + 中等有氧 (每周 2–3 天)；注重动作质量和睡眠。',
    advice_bmi_over:
      '• 减脂：中等有氧/轻度 HIIT (每周 2–3 天) + 全身力量训练；轻微热量缺口。',
    advice_bmi_obese:
      '• 安全减脂：快走/低冲击有氧 + 基础力量训练；监测心率，循序渐进增加强度。',
    advice_goal_lose_weight:
      '• 目标：减重 → 控制热量，1.6–2.2克/公斤蛋白质，7–8小时睡眠。',
    advice_goal_build_muscle:
      '• 目标：增肌 → 渐进式超负荷 (每周 3–5 天)，1.6–2.2克/公斤蛋白质，轻微热量盈余。',
    advice_goal_maintain:
      '• 目标：保持 → 每周 3 天，平衡力量 + 有氧，每周称重。',
    advice_goal_recomp:
      '• 目标：身体重组 → 基础举铁 + 高蛋白，轻微热量缺口，睡个好觉。',
    advice_goal_endurance:
      '• 目标：耐力 → 二区训练 (Zone 2) + 间歇跑；练前补充碳水。',
    advice_goal_flexibility:
      '• 目标：柔韧性 → 每日灵活性/关节活动度 (ROM) 10–20分钟，增加轻重量力量训练。',
    advice_injured:
      '• 伤病提示：低冲击，无痛活动范围；循序渐进；必要时咨询教练/医生。',
    advice_healthnote:
      '• 留意已记录的健康状况，并相应调整强度。',
    start_training: '开始训练',
  },
  weight: {
    prompt_title: '更新体重',
    prompt_desc: '输入当前体重 (kg)',
    prompt_placeholder: '例如：65.5',
    later: '稍后',
    save: '保存',
    chart_title: '体重追踪',
    chart_empty:
      '暂无数据。应用会定期提醒您记录体重。',
  },
  UserProfile: {
    title: '个人资料',
    subtitle: '输入信息以获取个性化训练建议',

    name_label: '全名 *',
    name_ph: '例如：张三', // Tên ví dụ phổ biến ở TQ

    age_label: '年龄',
    age_ph: '例如：28',
    gender_label: '性别',
    gender_male: '男',
    gender_female: '女',
    gender_other: '其他',
    height_label: '身高 (cm)',
    height_ph: '例如：170',
    weight_label: '体重 (kg)',
    weight_ph: '例如：65',
    bmi: 'BMI',
    bmi_label_under: '体重过轻',
    bmi_label_normal: '正常',
    bmi_label_over: '超重',
    bmi_label_obese: '肥胖',
    health_label: '健康状况',
    health_ph:
      '例如：血压稳定，睡眠良好，恢复训练中...',

    injured_q: '有伤病吗?',
    injury_label: '伤病详情',
    injury_ph:
      '例如：左膝疼痛，避免深蹲；推举时肩痛...',
    hint_fill_hw: '输入身高和体重以获取建议。',
    rec_injured:
      '建议：优先进行轻度核心/上肢训练，增加休息日。',
    rec_overweight:
      '建议：减脂计划 (轻度 → 中度 HIIT) 与下肢/核心训练交替进行。',
    rec_general:
      '建议：全身计划 (基础力量 + 核心)。',
    loading: '加载中...',
    save_success_title: '已保存',
    save_error_title: '错误',
    save_error_msg: "无法保存数据。请重试。",
    btn_delete: '删除',
    btn_save: '保存',
  },
  // zh
  dashboard: {
    title: '进度面板',
    streak: '连续天数',
    thisWeek: '本周',
    total: '总计',
    completedPrograms: '已完成',
    lastWorkout: '上次训练'
  },
  recommend: {
    title: '为你推荐',
    start: '开始此计划'
  },
  nutrition: {
    title: '营养',
    subtitle: '你的每日目标会根据你当前的个人资料和目标进行个性化调整。',
    noProfileTitle: '请先完善个人资料',
    noProfileText: '添加你的身高、体重和目标，以获得热量、营养素和补水建议。',
    targets: '每日目标',
    calories: '热量',
    water: '饮水',
    macros: '宏量营养分配',
    protein: '蛋白质',
    carbs: '碳水',
    fats: '脂肪',
    sampleMeals: '示例饮食计划',
    tips: '建议'
  },
  // zh
  // zh
  premium: {
    title: '升级到高级版',
    removeAds: '移除广告',
    allPrograms: '解锁完整体验',
    active: '高级版已激活',
    restore: '恢复购买',
    restoreTitle: '恢复购买',
    restoreSuccess: '高级版恢复成功。',
    restoreEmpty: '未找到高级版购买记录。',
    errorTitle: '购买失败',
    errorText: '无法完成购买。',
    productUnavailable: '未找到高级版产品。请检查 Play Console / App Store 设置。',
    subUnavailable: '未找到月度订阅。请检查 Play Console / App Store 设置。',
    loading: '加载中...',

    monthlyTitle: '月度高级版',
    monthlyDesc: '每月自动续订以保持高级版状态',
    subscribeMonthly: '按月订阅',

    lifetimeTitle: '终身高级版',
    lifetimeDesc: '一次性付款，永久享受高级版',
    buyLifetime: '购买终身版'
  },
  // zh
  filters: {
    all: '全部',

    levelTitle: '难度',
    level: {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级',
    },

    goalTitle: '重点',
    goal: {
      lose_weight: '减脂',
      build_muscle: '增肌',
      cardio: '有氧',
      core: '核心',
      mobility: '灵活性',
    },

    equipmentTitle: '器械',
    equipment: {
      no_equipment: '无器械',
      with_equipment: '有器械',
    },

    durationTitle: '时长',
    duration: {
      short: '短',
      medium: '中',
      long: '长',
    },

    noResultsTitle: '没有匹配的训练计划',
    noResultsText: '请尝试更改一个或多个筛选条件。',
  },
  // zh
beginner: {
  modeTitle: '新手模式',
  modeDesc: '为新用户提供简单说明和快速指导。',
  glossaryTitle: '新手指南',
  terms: {
    restDay: {
      title: '休息日',
      desc: '这是恢复日。你的身体会休息并重建，所以不要跳过。'
    },
    warmUp: {
      title: '热身',
      desc: '训练前进行轻度活动，以帮助身体做好准备并降低受伤风险。'
    },
    cooldown: {
      title: '放松',
      desc: '训练后进行轻度活动或拉伸，帮助身体恢复。'
    },
    hiit: {
      title: 'HIIT',
      desc: '高强度间歇训练：短时间高强度训练后接短暂休息。'
    },
    rep: {
      title: '次数',
      desc: '一次完整的动作。例子：一次深蹲 = 1 次。'
    },
    set: {
      title: '组',
      desc: '一组次数。例子：连续做 10 次深蹲 = 1 组。'
    }
  }
},
todayWorkout: {
  title: '今日训练',
  fallback: '训练',
  startNow: '立即开始',
  restTitle: '今天是恢复日',
  restText: '休息一下，轻柔拉伸，喝点水，为下一次训练做好准备。'
},
// zh
history: {
  title: '训练历史',
  screenTitle: '训练历史',
  thisWeek: '本周',
  minutes: '分钟',
  totalWorkouts: '训练次数',
  empty: '还没有已完成的训练。',
  viewAll: '查看全部',
  filter7: '7 天',
  filter30: '30 天',
  filterAll: '全部'
},
achievements: {
  title: '成就',
  firstWorkout: '首次训练',
  tenWorkouts: '10 次训练',
  twentyfiveWorkouts: '25 次训练',
  streak3: '连续 3 天',
  streak7: '连续 7 天',
  week4: '本周 4 次训练',
  finishProgram: '完成 1 个计划'
},
challenges: {
  title: '挑战',
  intro: '开始一个短期挑战来保持规律。',
  start7: '开始 7 天挑战',
  start30: '开始 30 天挑战',
  complete: '挑战已完成',
  daysLeft: '还剩 {{count}} 天',
  starter7Title: '7 天入门挑战',
  starter7Desc: '在 7 天内完成 5 次训练。',
  consistency30Title: '30 天坚持挑战',
  consistency30Desc: '在 30 天内完成 20 次训练。'
}
};
const ja = {
  ...base,
  tabs: {
    main: 'ホーム', // Home (Thường dùng thay cho Main)
    nutrition: '栄養', // Dinh dưỡng (Hoặc '食事' - Bữa ăn)
    guide: 'ガイド', // Hướng dẫn
    premium: 'プレミアム', // Premium
    settings: '設定', // Cài đặt
    workout: 'ワークアウト', // Workout (Katakana)
    more: 'その他', // Khác/Thêm (Tiêu chuẩn cho tab cuối cùng)
    program: 'プログラム', // Chương trình
    profile: 'プロフィール', // Hồ sơ (Hoặc 'マイページ' - My Page rất phổ biến ở Nhật)
    weightChart: '体重グラフ', // Biểu đồ cân nặng
  },
  home: {
    title: 'プランを選択', // Chọn kế hoạch (Rút gọn cho tiêu đề)
    subtitle: 'プログラムを選んで、毎日トレーニング', // Chọn chương trình và tập luyện mỗi ngày
    program60: '60日間脂肪燃焼プログラム', // Chương trình đốt mỡ 60 ngày
    program90: '90日間全身プログラム', // Chương trình toàn thân 90 ngày
    daysSuffix: '{{count}} 日間', // Đuôi chỉ khoảng thời gian (days)
    health_overview: '健康状態', // Tình trạng sức khỏe (Tự nhiên hơn 'Tổng quan')
    activeTitle: '進行中', // Đang tiến hành (Dịch thoát ý từ Practicing)
    noActive: '現在、進行中のプログラムはありません。', // Hiện không có chương trình nào đang thực hiện.
  },
  program: {
    daysPrefix: '{{day}}日目 • {{weekday}}',
    weekTitle: '{{n}}週目',
    completed: '完了',
    todayWorkout: '今日のワークアウト: {{name}}',
  },
  workouts: {
    rest: '回復 / 休息日',
    hiit: '全身HIIT', // HIIT thường giữ nguyên hoặc viết là ヒート
    upper: '胸・肩・腕',
    lower: 'お尻・脚',
    core: '腹筋 & 体幹', // Core dịch là "Taikan" (Thể cán) rất phổ biến
    pickOne: '開始するプランを選択',
    days: '日'
  },
  // ja
  guide: {
    title: 'PulseFit の使い方',
    subtitle: '次の簡単な手順に従って、トレーニングを始めましょう。',

    steps: {
      step1: {
        badge: 'ステップ 1',
        title: '個人情報を入力する',
        desc: '身長、体重、健康状態、目標などの基本情報を入力します。アプリが BMI を計算し、安全に始めるための健康アドバイスを表示します。'
      },
      step2: {
        badge: 'ステップ 2',
        title: '自分に合ったトレーニングプログラムを選ぶ',
        desc: '利用可能なプログラムを確認し、自分の体力レベル、目標、好みに最も合ったものを選びます。'
      },
      step3: {
        badge: 'ステップ 3',
        title: 'トレーニング日を選ぶ',
        desc: '選択したプログラムを開き、実行したいトレーニング日を選びます。スケジュールに沿って順番に進められます。'
      },
      step4: {
        badge: 'ステップ 4',
        title: '動画に合わせてトレーニングする',
        desc: 'トレーニング動画に従って正しく運動しましょう。より見やすくするために、スマートフォンを横向きにして全画面で視聴できます。'
      }
    },

    noteTitle: '注意',
    note: '最良の結果を得るために、継続してトレーニングを行いましょう。'
  },
  video: {
    loading: '動画を読み込み中...',
    play: 'ワークアウト開始',
    error: '動画を再生できません。再試行してください。',
  },
  settings: {
    title: '設定',
    language: '言語',
    choose: '言語を選択',
  },
  onboard: {
    title: 'さあ、始めましょう 👋',
    subtitle: '最適なプランを提案するために、詳細を入力してください',
    name: '氏名 *',
    age: '年齢 *',
    gender: '性別 *',
    gender_male: '男性',
    gender_female: '女性',
    gender_other: 'その他',
    health: '健康状態',
    height: '身長 (cm) *',
    weight: '体重 (kg) *',
    injured_q: '怪我をしていますか？',
    injury_note: '怪我の詳細',
    goal: '現在の目標 *',
    goals: {
      lose_weight: '減量 (ダイエット)',
      build_muscle: '筋力アップ',
      maintain: '現状維持',
      recomp: 'リコンプ (脂肪燃焼 + 筋肥大)',
      endurance: '持久力アップ',
      flexibility: '柔軟性アップ',
    },
    tip_title: 'ヒント',
    tip_1:
      '怪我をしている場合は、負荷の低い運動から始め、徐々に強度を上げてください。',
    tip_2: '進捗を確認するため、3日ごとに体重を更新しましょう。',
    back: '戻る',
    next: '次へ',
    finish: '完了',
    saving: '保存中...',
    bmi: 'BMI',
    bmi_result_title: '健康状態の概要',
    bmi_label_under: '低体重',
    bmi_label_normal: '普通',
    bmi_label_over: '肥満気味', // Hoặc '過体重'
    bmi_label_obese: '肥満',
    advice_intro: '• あなたのBMI: {{bmi}} ({{label}})。',
    advice_bmi_under:
      '• 除脂肪体重の増加に集中：中強度の全身/上下分割法。負荷を増やし、十分なタンパク質とカロリーを摂取。',
    advice_bmi_normal:
      '• 維持：筋トレ + 適度な有酸素運動 (週2–3日)。フォームと睡眠を優先。',
    advice_bmi_over:
      '• 脂肪燃焼：適度な有酸素/軽いHIIT (週2–3日) + 全身筋トレ。わずかなカロリー不足状態を作る。',
    advice_bmi_obese:
      '• 安全な減量：早歩き/低負荷の有酸素 + 基礎筋トレ。心拍数を確認し、徐々に強度を上げる。',
    advice_goal_lose_weight:
      '• 目標：減量 → カロリー管理、タンパク質1.6–2.2g/kg、睡眠7–8時間。',
    advice_goal_build_muscle:
      '• 目標：筋肥大 → 漸進性過負荷 (週3–5日)、タンパク質1.6–2.2g/kg、わずかなカロリー余剰。',
    advice_goal_maintain:
      '• 目標：維持 → 週3日、筋トレと有酸素のバランス、毎週体重測定。',
    advice_goal_recomp:
      '• 目標：リコンプ → 基礎的な筋トレ + 高タンパク質、わずかなカロリー不足、質の高い睡眠。',
    advice_goal_endurance:
      '• 目標：持久力 → ゾーン2 + インターバル走。運動前に炭水化物を摂取。',
    advice_goal_flexibility:
      '• 目標：柔軟性 →毎日のモビリティ/可動域 (ROM) 10–20分、軽い筋トレを追加。',
    advice_injured:
      '• 怪我に関する注意：低負荷、痛みのない可動域で。徐々に進める。必要に応じて医師やトレーナーに相談。',
    advice_healthnote:
      '• 記録された健康状態に注意し、それに応じて強度を調整してください。',
    start_training: 'トレーニングを開始',
  },
  weight: {
    prompt_title: '体重の更新',
    prompt_desc: '現在の体重を入力 (kg)',
    prompt_placeholder: '例: 65.5',
    later: '後で',
    save: '保存',
    chart_title: '体重の推移',
    chart_empty:
      'データがまだありません。定期的に体重を記録するようアプリが通知します。',
  },
  UserProfile: {
    title: 'プロフィール',
    subtitle: 'パーソナライズされた提案を受け取るために情報を入力してください',

    name_label: '氏名 *',
    name_ph: '例: 山田 太郎', // Tên ví dụ tiêu chuẩn Nhật Bản

    age_label: '年齢',
    age_ph: '例: 28',
    gender_label: '性別',
    gender_male: '男性',
    gender_female: '女性',
    gender_other: 'その他',
    height_label: '身長 (cm)',
    height_ph: '例: 170',
    weight_label: '体重 (kg)',
    weight_ph: '例: 65',
    bmi: 'BMI',
    bmi_label_under: '低体重',
    bmi_label_normal: '普通',
    bmi_label_over: '肥満気味',
    bmi_label_obese: '肥満',
    health_label: '健康状態',
    health_ph:
      '例: 血圧安定、睡眠良好、トレーニング再開...',

    injured_q: '怪我はありますか？',
    injury_label: '怪我の詳細',
    injury_ph:
      '例: 左膝の痛み、深いスクワットは避ける。プレスの際に肩が痛む...',
    hint_fill_hw: '身長と体重を入力して提案を表示。',
    rec_injured:
      '推奨：休息日を多めにし、軽い体幹/上半身のセッションを優先。',
    rec_overweight:
      '推奨：脂肪燃焼プラン (軽度〜中強度のHIIT) と下半身/体幹トレーニングを交互に行う。',
    rec_general:
      '推奨：全身プラン (基礎的な筋力 + 体幹)。',
    loading: '読み込み中...',
    save_success_title: '保存しました',
    save_error_title: 'エラー',
    save_error_msg: "データを保存できませんでした。再試行してください。",
    btn_delete: '削除',
    btn_save: '保存',
  },
  // ja
  dashboard: {
    title: '進捗ダッシュボード',
    streak: '連続記録',
    thisWeek: '今週',
    total: '合計',
    completedPrograms: '完了済み',
    lastWorkout: '前回のトレーニング'
  },
  recommend: {
    title: 'あなたへのおすすめ',
    start: 'このプランを始める'
  },
  nutrition: {
    title: '栄養',
    subtitle: '毎日の目標は、現在のプロフィールと目標に基づいて個別に調整されます。',
    noProfileTitle: 'まずプロフィールを完成させてください',
    noProfileText: '身長、体重、目標を追加すると、カロリー・マクロ・水分補給の提案を受け取れます。',
    targets: '1日の目標',
    calories: 'カロリー',
    water: '水分',
    macros: 'マクロ配分',
    protein: 'たんぱく質',
    carbs: '炭水化物',
    fats: '脂質',
    sampleMeals: '食事プラン例',
    tips: 'ヒント'
  },
  // ja
  // ja
  premium: {
    title: 'プレミアムにアップグレード',
    removeAds: '広告を削除',
    allPrograms: 'すべての機能を解放',
    active: 'プレミアムは有効です',
    restore: '購入を復元',
    restoreTitle: '購入を復元',
    restoreSuccess: 'プレミアムを正常に復元しました。',
    restoreEmpty: 'プレミアム購入が見つかりませんでした。',
    errorTitle: '購入に失敗しました',
    errorText: '購入を完了できませんでした。',
    productUnavailable: 'プレミアム商品が見つかりません。Play Console / App Store の設定を確認してください。',
    subUnavailable: '月額サブスクリプションが見つかりません。Play Console / App Store の設定を確認してください。',
    loading: '読み込み中...',

    monthlyTitle: '月額プレミアム',
    monthlyDesc: 'プレミアムを有効に保つため毎月自動更新されます',
    subscribeMonthly: '月額で登録',

    lifetimeTitle: '永久プレミアム',
    lifetimeDesc: '一度の支払いで永久にプレミアムを利用',
    buyLifetime: '永久版を購入'
  },
  // ja
  filters: {
    all: 'すべて',

    levelTitle: 'レベル',
    level: {
      beginner: '初心者',
      intermediate: '中級',
      advanced: '上級',
    },

    goalTitle: '目的',
    goal: {
      lose_weight: '減量',
      build_muscle: '筋力アップ',
      cardio: '有酸素',
      core: '体幹',
      mobility: '柔軟性',
    },

    equipmentTitle: '器具',
    equipment: {
      no_equipment: '器具なし',
      with_equipment: '器具あり',
    },

    durationTitle: '時間',
    duration: {
      short: '短い',
      medium: '普通',
      long: '長い',
    },

    noResultsTitle: '一致するプログラムがありません',
    noResultsText: '1つ以上のフィルターを変更してみてください。',
  },
  // ja
beginner: {
  modeTitle: '初心者モード',
  modeDesc: '新しいユーザー向けのシンプルな説明とクイックガイドです。',
  glossaryTitle: '初心者ガイド',
  terms: {
    restDay: {
      title: '休息日',
      desc: '回復のための日です。体は休みながら再構築されるので、飛ばさないようにしましょう。'
    },
    warmUp: {
      title: 'ウォームアップ',
      desc: 'トレーニング前の軽い動きで、体を準備し、ケガのリスクを減らします。'
    },
    cooldown: {
      title: 'クールダウン',
      desc: 'トレーニング後の軽い動きやストレッチで、体の回復を助けます。'
    },
    hiit: {
      title: 'HIIT',
      desc: '高強度インターバルトレーニング：短い高強度運動と短い休憩を繰り返す方法です。'
    },
    rep: {
      title: 'レップ',
      desc: '1回の完全な動作のことです。例：スクワット1回 = 1レップ。'
    },
    set: {
      title: 'セット',
      desc: 'レップのまとまりです。例：スクワット10回をまとめて行う = 1セット。'
    }
  }
},
todayWorkout: {
  title: '今日のワークアウト',
  fallback: 'ワークアウト',
  startNow: '今すぐ始める',
  restTitle: '今日は回復日です',
  restText: '少し休んで、軽くストレッチし、水分をとって、次のワークアウトに備えましょう。'
},
// ja
history: {
  title: 'トレーニング履歴',
  screenTitle: 'トレーニング履歴',
  thisWeek: '今週',
  minutes: '分',
  totalWorkouts: 'ワークアウト',
  empty: 'まだ完了したワークアウトはありません。',
  viewAll: 'すべて見る',
  filter7: '7日',
  filter30: '30日',
  filterAll: 'すべて'
},
achievements: {
  title: '実績',
  firstWorkout: '初回ワークアウト',
  tenWorkouts: '10回のワークアウト',
  twentyfiveWorkouts: '25回のワークアウト',
  streak3: '3日連続',
  streak7: '7日連続',
  week4: '今週4回のワークアウト',
  finishProgram: '1つのプログラムを完了'
},
challenges: {
  title: 'チャレンジ',
  intro: '継続するために短いチャレンジを始めましょう。',
  start7: '7日チャレンジを開始',
  start30: '30日チャレンジを開始',
  complete: 'チャレンジ完了',
  daysLeft: '残り{{count}}日',
  starter7Title: '7日スターターチャレンジ',
  starter7Desc: '7日間で5回のワークアウトを完了しましょう。',
  consistency30Title: '30日継続チャレンジ',
  consistency30Desc: '30日間で20回のワークアウトを完了しましょう。'
}
};
const ko = {
  ...base,
  tabs: {
    main: '홈', // Home (Người Hàn dùng từ này phổ biến hơn 'Main' cho tab chính)
    nutrition: '영양', // Dinh dưỡng (Hoặc '식단' - Chế độ ăn/Thực đơn)
    guide: '가이드', // Guide (Phiên âm)
    premium: '프리미엄', // Premium (Phiên âm)
    settings: '설정', // Cài đặt
    workout: '운동', // Tập luyện (Tự nhiên hơn là dùng từ phiên âm '워크아웃')
    more: '더보기', // Xem thêm (Từ chuẩn cho tab More)
    program: '프로그램', // Chương trình
    profile: '프로필', // Hồ sơ (Hoặc '내 정보' - Thông tin của tôi)
    weightChart: '체중 그래프', // Biểu đồ cân nặng (Graph)
  },
  home: {
    title: '운동 플랜 선택', // Chọn kế hoạch tập luyện
    subtitle: '프로그램을 선택하고 매일 운동하세요', // Chọn chương trình và tập luyện mỗi ngày
    program60: '60일 체지방 연소', // Đốt mỡ trong 60 ngày
    program90: '90일 전신 운동', // Tập toàn thân trong 90 ngày
    daysSuffix: '{{count}}일', // Đuôi chỉ ngày
    health_overview: '건강 상태', // Tình trạng sức khỏe
    activeTitle: '진행 중', // Đang tiến hành (Dịch thoát ý từ "Practicing" để hợp ngữ cảnh trạng thái)
    noActive: '현재 진행 중인 프로그램이 없습니다.', // Hiện không có chương trình nào đang thực hiện.
  },
  program: {
    daysPrefix: '{{day}}일차 • {{weekday}}',
    weekTitle: '{{n}}주차',
    completed: '완료됨',
    todayWorkout: '오늘의 운동: {{name}}',
  },
  workouts: {
    rest: '회복 / 휴식',
    hiit: '전신 HIIT', // Hoặc '고강도 인터벌 트레이닝'
    upper: '상체: 가슴 - 어깨 - 팔',
    lower: '하체: 엉덩이 - 다리',
    core: '복근 & 코어',
    pickOne: '시작할 플랜을 선택하세요',
    days: '일'
  },
  // ko
  guide: {
    title: 'PulseFit 사용 방법',
    subtitle: '다음의 간단한 단계에 따라 운동을 시작하세요.',

    steps: {
      step1: {
        badge: '1단계',
        title: '개인 정보를 입력하세요',
        desc: '키, 몸무게, 건강 상태, 목표 및 기타 기본 정보를 입력하세요. 앱이 BMI를 계산하고 더 안전하게 시작할 수 있도록 건강 조언을 제공합니다.'
      },
      step2: {
        badge: '2단계',
        title: '적합한 운동 프로그램을 선택하세요',
        desc: '사용 가능한 운동 프로그램을 살펴보고 자신의 체력 수준, 목표, 선호도에 가장 잘 맞는 프로그램을 선택하세요.'
      },
      step3: {
        badge: '3단계',
        title: '운동할 날짜를 선택하세요',
        desc: '선택한 프로그램을 열고 따라 하고 싶은 운동 날짜를 선택하세요. 일정에 따라 차근차근 진행할 수 있습니다.'
      },
      step4: {
        badge: '4단계',
        title: '영상과 함께 운동하세요',
        desc: '운동 영상을 보며 올바르게 따라 하세요. 더 좋은 시청 경험을 위해 휴대폰을 가로로 돌려 전체 화면으로 볼 수 있습니다.'
      }
    },

    noteTitle: '참고',
    note: '최고의 결과를 얻으려면 꾸준히 운동을 계속하세요.'
  },
  video: {
    loading: '동영상 로딩 중...',
    play: '운동 시작',
    error: '동영상을 재생할 수 없습니다. 다시 시도해주세요.',
  },
  settings: {
    title: '설정',
    language: '언어',
    choose: '언어 선택',
  },
  onboard: {
    title: '시작해 볼까요 👋',
    subtitle: '최적의 플랜을 추천하기 위해 몇 가지 정보를 입력해주세요',
    name: '이름 *',
    age: '나이 *',
    gender: '성별 *',
    gender_male: '남성',
    gender_female: '여성',
    gender_other: '기타',
    health: '건강 상태',
    height: '키 (cm) *',
    weight: '몸무게 (kg) *',
    injured_q: '부상 부위가 있나요?',
    injury_note: '부상 상세 설명',
    goal: '현재 목표 *',
    goals: {
      lose_weight: '체중 감량', // Diet
      build_muscle: '근육 증량', // Bulk up
      maintain: '유지',
      recomp: '리컴프 (체지방 감소 + 근육 증가)', // Hoặc '상승 다이어트'
      endurance: '지구력 강화',
      flexibility: '유연성 기르기',
    },
    tip_title: '간단 팁',
    tip_1:
      '부상이 있다면 충격이 적은 운동부터 시작하고 서서히 강도를 높이세요.',
    tip_2: '진행 상황을 확인하려면 3일마다 몸무게를 업데이트하세요.',
    back: '이전',
    next: '다음',
    finish: '완료',
    saving: '저장 중...',
    bmi: 'BMI',
    bmi_result_title: '건강 개요',
    bmi_label_under: '저체중',
    bmi_label_normal: '정상',
    bmi_label_over: '과체중',
    bmi_label_obese: '비만', // Hoặc '고도비만' tùy mức độ
    advice_intro: '• 당신의 BMI: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• 근육량 증가에 집중: 중강도의 전신/상하체 분할 운동; 중량 늘리기; 충분한 단백질과 칼로리 섭취.',
    advice_bmi_normal:
      '• 유지: 근력 운동 + 적당한 유산소 (주 2~3회); 자세와 수면 우선순위.',
    advice_bmi_over:
      '• 체지방 감량: 적당한 유산소/가벼운 HIIT (주 2~3회) + 전신 근력 운동; 약간의 칼로리 부족 유지.',
    advice_bmi_obese:
      '• 안전한 감량: 빠르게 걷기/저강도 유산소 + 기초 근력 운동; 심박수 체크, 서서히 강도 높이기.',
    advice_goal_lose_weight:
      '• 목표: 감량 → 칼로리 기록, 단백질 1.6~2.2g/kg, 7~8시간 수면.',
    advice_goal_build_muscle:
      '• 목표: 증량 → 점진적 과부하 (주 3~5회), 단백질 1.6~2.2g/kg, 약간의 칼로리 잉여.',
    advice_goal_maintain:
      '• 목표: 유지 → 주 3회, 근력 + 유산소 균형, 매주 체중 측정.',
    advice_goal_recomp:
      '• 목표: 리컴프 → 기초 웨이트 + 고단백, 약간의 칼로리 부족, 숙면.',
    advice_goal_endurance:
      '• 목표: 지구력 → 존2(Zone 2) 훈련 + 인터벌; 운동 전 탄수화물 섭취.',
    advice_goal_flexibility:
      '• 목표: 유연성 → 매일 가동성(Mobility)/ROM 훈련 10~20분, 가벼운 근력 운동 추가.',
    advice_injured:
      '• 부상 주의: 충격 적게, 통증 없는 가동 범위 내에서; 점진적 진행; 필요 시 코치/의사와 상담.',
    advice_healthnote:
      '• 기록된 건강 상태를 주의 깊게 살피고 그에 따라 강도를 조절하세요.',
    start_training: '운동 시작하기',
  },
  weight: {
    prompt_title: '몸무게 업데이트',
    prompt_desc: '현재 몸무게 입력 (kg)',
    prompt_placeholder: '예: 65.5',
    later: '나중에',
    save: '저장',
    chart_title: '체중 기록',
    chart_empty:
      '아직 데이터가 없습니다. 주기적으로 몸무게를 기록하도록 알림을 보냅니다.',
  },
  UserProfile: {
    title: '프로필',
    subtitle: '맞춤형 운동 추천을 받으려면 정보를 입력하세요',

    name_label: '이름 *',
    name_ph: '예: 김철수', // Tên ví dụ chuẩn Hàn Quốc

    age_label: '나이',
    age_ph: '예: 28',
    gender_label: '성별',
    gender_male: '남성',
    gender_female: '여성',
    gender_other: '기타',
    height_label: '키 (cm)',
    height_ph: '예: 170',
    weight_label: '몸무게 (kg)',
    weight_ph: '예: 65',
    bmi: 'BMI',
    bmi_label_under: '저체중',
    bmi_label_normal: '정상',
    bmi_label_over: '과체중',
    bmi_label_obese: '비만',
    health_label: '건강 상태',
    health_ph:
      '예: 혈압 안정, 수면 양호, 운동 복귀...',

    injured_q: '부상 부위가 있나요?',
    injury_label: '부상 상세 내용',
    injury_ph:
      '예: 왼쪽 무릎 통증, 깊은 스쿼트 자제; 프레스 시 어깨 통증...',
    hint_fill_hw: '키와 몸무게를 입력하면 추천이 표시됩니다.',
    rec_injured:
      '추천: 휴식일을 늘리고 가벼운 코어/상체 세션을 우선하세요.',
    rec_overweight:
      '추천: 체지방 감량 플랜 (가벼운 → 중간 강도 HIIT)과 하체/코어 운동 병행.',
    rec_general:
      '추천: 전신 플랜 (기초 근력 + 코어).',
    loading: '로딩 중...',
    save_success_title: '저장됨',
    save_error_title: '오류',
    save_error_msg: "데이터를 저장할 수 없습니다. 다시 시도해주세요.",
    btn_delete: '삭제',
    btn_save: '저장',
  },
  // ko
  dashboard: {
    title: '진행 대시보드',
    streak: '연속 기록',
    thisWeek: '이번 주',
    total: '전체',
    completedPrograms: '완료됨',
    lastWorkout: '최근 운동'
  },
  recommend: {
    title: '추천 프로그램',
    start: '이 플랜 시작하기'
  },
  nutrition: {
    title: '영양',
    subtitle: '현재 프로필과 목표를 바탕으로 일일 목표가 개인 맞춤형으로 설정됩니다.',
    noProfileTitle: '먼저 프로필을 완성하세요',
    noProfileText: '칼로리, 매크로, 수분 섭취 추천을 받으려면 키, 몸무게, 목표를 추가하세요.',
    targets: '일일 목표',
    calories: '칼로리',
    water: '물',
    macros: '매크로 비율',
    protein: '단백질',
    carbs: '탄수화물',
    fats: '지방',
    sampleMeals: '예시 식단',
    tips: '팁'
  },
  // ko
  // ko
  premium: {
    title: '프리미엄으로 업그레이드',
    removeAds: '광고 제거',
    allPrograms: '전체 경험 잠금 해제',
    active: '프리미엄이 활성화되었습니다',
    restore: '구매 복원',
    restoreTitle: '구매 복원',
    restoreSuccess: '프리미엄이 성공적으로 복원되었습니다.',
    restoreEmpty: '프리미엄 구매 내역을 찾을 수 없습니다.',
    errorTitle: '구매 실패',
    errorText: '구매를 완료할 수 없습니다.',
    productUnavailable: '프리미엄 상품을 찾을 수 없습니다. Play Console / App Store 설정을 확인하세요.',
    subUnavailable: '월간 구독 상품을 찾을 수 없습니다. Play Console / App Store 설정을 확인하세요.',
    loading: '로딩 중...',

    monthlyTitle: '월간 프리미엄',
    monthlyDesc: '프리미엄을 유지하기 위해 매월 자동 갱신됩니다',
    subscribeMonthly: '월간 구독',

    lifetimeTitle: '평생 프리미엄',
    lifetimeDesc: '한 번 결제로 평생 프리미엄 이용',
    buyLifetime: '평생 이용 구매'
  },
  // ko
  filters: {
    all: '전체',

    levelTitle: '레벨',
    level: {
      beginner: '초급',
      intermediate: '중급',
      advanced: '고급',
    },

    goalTitle: '목표',
    goal: {
      lose_weight: '체중 감량',
      build_muscle: '근육 증가',
      cardio: '유산소',
      core: '코어',
      mobility: '유연성',
    },

    equipmentTitle: '장비',
    equipment: {
      no_equipment: '장비 없음',
      with_equipment: '장비 있음',
    },

    durationTitle: '시간',
    duration: {
      short: '짧음',
      medium: '중간',
      long: '김',
    },

    noResultsTitle: '일치하는 프로그램이 없습니다',
    noResultsText: '하나 이상의 필터를 변경해 보세요.',
  },
  // ko
beginner: {
  modeTitle: '초보자 모드',
  modeDesc: '새로운 사용자를 위한 간단한 설명과 빠른 안내입니다.',
  glossaryTitle: '초보자 가이드',
  terms: {
    restDay: {
      title: '휴식일',
      desc: '회복을 위한 날입니다. 몸이 쉬면서 다시 회복되므로 건너뛰지 마세요.'
    },
    warmUp: {
      title: '워밍업',
      desc: '운동 전에 가벼운 움직임으로 몸을 준비하고 부상 위험을 줄입니다.'
    },
    cooldown: {
      title: '쿨다운',
      desc: '운동 후 가벼운 움직임이나 스트레칭으로 몸이 회복되도록 돕습니다.'
    },
    hiit: {
      title: 'HIIT',
      desc: '고강도 인터벌 트레이닝: 짧은 시간 강하게 운동하고 짧게 쉬는 방식입니다.'
    },
    rep: {
      title: '반복',
      desc: '운동 동작 1회를 의미합니다. 예: 스쿼트 1번 = 1회.'
    },
    set: {
      title: '세트',
      desc: '반복의 묶음입니다. 예: 스쿼트 10회를 연속으로 하면 1세트입니다.'
    }
  }
},
todayWorkout: {
  title: '오늘의 운동',
  fallback: '운동',
  startNow: '지금 시작',
  restTitle: '오늘은 회복하는 날입니다',
  restText: '잠시 쉬고, 가볍게 스트레칭하고, 물을 마시며 다음 운동을 준비하세요.'
},
// ko
history: {
  title: '운동 기록',
  screenTitle: '운동 기록',
  thisWeek: '이번 주',
  minutes: '분',
  totalWorkouts: '운동',
  empty: '아직 완료한 운동이 없습니다.',
  viewAll: '전체 보기',
  filter7: '7일',
  filter30: '30일',
  filterAll: '전체'
},
achievements: {
  title: '업적',
  firstWorkout: '첫 운동',
  tenWorkouts: '운동 10회',
  twentyfiveWorkouts: '운동 25회',
  streak3: '3일 연속',
  streak7: '7일 연속',
  week4: '이번 주 운동 4회',
  finishProgram: '프로그램 1개 완료'
},
challenges: {
  title: '챌린지',
  intro: '꾸준함을 유지하기 위해 짧은 챌린지를 시작하세요.',
  start7: '7일 챌린지 시작',
  start30: '30일 챌린지 시작',
  complete: '챌린지 완료',
  daysLeft: '{{count}}일 남음',
  starter7Title: '7일 스타터 챌린지',
  starter7Desc: '7일 동안 운동 5회를 완료하세요.',
  consistency30Title: '30일 꾸준함 챌린지',
  consistency30Desc: '30일 동안 운동 20회를 완료하세요.'
}
};
const ru = {
  ...base,
  tabs: {
    main: 'Главная', // Trang chủ
    nutrition: 'Питание', // Dinh dưỡng
    guide: 'Гайд', // Hướng dẫn (Từ mượn 'Guide' rất phổ biến trong app hiện đại), hoặc 'Советы' (Lời khuyên)
    premium: 'Премиум', // Premium
    settings: 'Настройки', // Cài đặt
    workout: 'Тренировки', // Tập luyện (Số nhiều thường dùng cho Tab)
    more: 'Ещё', // Thêm/Khác (Chuẩn UI cho nút More)
    program: 'Программа', // Chương trình
    profile: 'Профиль', // Hồ sơ (Rút gọn từ 'Профиль пользователя' cho đỡ dài)
    weightChart: 'График веса', // Biểu đồ cân nặng
  },
  home: {
    title: 'Выберите план тренировок', // Chọn kế hoạch tập luyện
    subtitle: 'Выберите программу и тренируйтесь ежедневно', // Chọn chương trình và tập hàng ngày
    program60: 'Сжигание жира: 60 дней', // Đốt mỡ: 60 ngày
    program90: 'Всё тело за 90 дней', // Toàn thân trong 90 ngày
    daysSuffix: '{{count}} дн.', // Viết tắt của "ngày" để tránh rắc rối ngữ pháp số nhiều
    health_overview: 'Обзор здоровья', // Tổng quan sức khỏe
    activeTitle: 'Текущая', // (Chương trình) Hiện tại / Đang tập
    noActive: 'Нет активных программ.', // Không có chương trình nào đang hoạt động.
  },
  program: {
    daysPrefix: 'День {{day}} • {{weekday}}',
    weekTitle: 'Неделя {{n}}',
    completed: 'Выполнено',
    todayWorkout: 'Тренировка: {{name}}',
  },
  workouts: {
    rest: 'Восстановление / Отдых',
    hiit: 'HIIT на все тело', // "ВИИТ" là từ viết tắt tiếng Nga, nhưng "HIIT" vẫn rất phổ biến
    upper: 'Грудь - Плечи - Руки', // Верх тела
    lower: 'Ягодицы - Ноги',       // Низ тела
    core: 'Пресс и Кор',           // "Кор" (Core) là thuật ngữ chuẩn
    pickOne: 'Выберите план, чтобы начать',
    days: 'день'
  },
  // ru
  guide: {
    title: 'Как пользоваться PulseFit',
    subtitle: 'Следуйте этим простым шагам, чтобы начать свой тренировочный путь.',

    steps: {
      step1: {
        badge: 'Шаг 1',
        title: 'Введите личную информацию',
        desc: 'Укажите свой рост, вес, состояние здоровья, цели и другие основные данные. Приложение рассчитает ваш ИМТ и даст рекомендации по здоровью, чтобы вы могли начать безопасно.'
      },
      step2: {
        badge: 'Шаг 2',
        title: 'Выберите подходящую программу тренировок',
        desc: 'Просмотрите доступные программы и выберите ту, которая лучше всего соответствует вашему уровню подготовки, целям и предпочтениям.'
      },
      step3: {
        badge: 'Шаг 3',
        title: 'Выберите день тренировки',
        desc: 'Откройте выбранную программу и выберите тренировочный день, который хотите выполнить. Вы можете двигаться шаг за шагом по расписанию программы.'
      },
      step4: {
        badge: 'Шаг 4',
        title: 'Тренируйтесь по видео',
        desc: 'Следуйте видео, чтобы выполнять упражнения правильно. Вы можете повернуть телефон горизонтально, чтобы смотреть видео в полноэкранном режиме.'
      }
    },

    noteTitle: 'Примечание',
    note: 'Тренируйтесь регулярно, чтобы достичь наилучших результатов.'
  },
  video: {
    loading: 'Загрузка видео...',
    play: 'Начать тренировку',
    error: 'Не удалось воспроизвести видео. Попробуйте снова.',
  },
  settings: {
    title: 'Настройки',
    language: 'Язык',
    choose: 'Выберите язык',
  },
  onboard: {
    title: 'Давайте начнем 👋',
    subtitle: 'Введите данные, чтобы мы подобрали идеальный план',
    name: 'ФИО *', // Фамилия Имя Отчество (Full Name)
    age: 'Возраст *',
    gender: 'Пол *',
    gender_male: 'Мужской',
    gender_female: 'Женский',
    gender_other: 'Другой',
    health: 'Состояние здоровья',
    height: 'Рост (см) *',
    weight: 'Вес (кг) *',
    injured_q: 'Есть травмы?',
    injury_note: 'Описание травмы',
    goal: 'Текущая цель *',
    goals: {
      lose_weight: 'Похудение',
      build_muscle: 'Набор мышечной массы',
      maintain: 'Поддержание формы',
      recomp: 'Рекомпозиция (жиросжигание + мышцы)',
      endurance: 'Выносливость',
      flexibility: 'Гибкость',
    },
    tip_title: 'Советы',
    tip_1:
      'При травмах начинайте с упражнений с низкой нагрузкой и повышайте интенсивность постепенно.',
    tip_2: 'Обновляйте вес каждые 3 дня, чтобы следить за прогрессом.',
    back: 'Назад',
    next: 'Далее',
    finish: 'Готово',
    saving: 'Сохранение...',
    bmi: 'ИМТ', // Индекс массы тела (BMI)
    bmi_result_title: 'Обзор здоровья',
    bmi_label_under: 'Дефицит массы',
    bmi_label_normal: 'Норма',
    bmi_label_over: 'Избыточный вес',
    bmi_label_obese: 'Ожирение',
    advice_intro: '• Ваш ИМТ: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Фокус на набор мышечной массы: фулбоди/сплит верх-низ со средней интенсивностью; повышайте веса; достаточно белка и калорий.',
    advice_bmi_normal:
      '• Поддержание: микс силы + умеренного кардио (2–3 дня/нед.); приоритет на технику и сон.',
    advice_bmi_over:
      '• Жиросжигание: умеренное кардио/легкий HIIT (2–3 дня) + силовые на все тело; небольшой дефицит калорий.',
    advice_bmi_obese:
      '• Безопасное похудение: быстрая ходьба/кардио без прыжков + базовые силовые; следите за пульсом, повышайте нагрузку плавно.',
    advice_goal_lose_weight:
      '• Цель: Похудение → считать калории, 1.6–2.2 г/кг белка, сон 7–8 ч.',
    advice_goal_build_muscle:
      '• Цель: Мышцы → прогрессивная перегрузка (3–5 дней/нед.), 1.6–2.2 г/кг белка, профицит калорий.',
    advice_goal_maintain:
      '• Цель: Поддержание → 3 дня/нед., баланс силы и кардио, взвешивание раз в неделю.',
    advice_goal_recomp:
      '• Цель: Рекомпозиция → база + много белка, легкий дефицит, хороший сон.',
    advice_goal_endurance:
      '• Цель: Выносливость → зона 2 + интервалы; углеводы перед тренировкой.',
    advice_goal_flexibility:
      '• Цель: Гибкость → мобильность/растяжка 10–20 мин ежедневно, добавить легкие силовые.',
    advice_injured:
      '• При травме: низкая ударная нагрузка, работа в безболевой амплитуде; постепенный прогресс; при необходимости к врачу.',
    advice_healthnote:
      '• Учитывайте указанные проблемы со здоровьем и корректируйте нагрузку.',
    start_training: 'Начать тренировку',
  },
  weight: {
    prompt_title: 'Обновить вес',
    prompt_desc: 'Введите текущий вес (кг)',
    prompt_placeholder: 'напр. 65.5',
    later: 'Позже',
    save: 'Сохранить',
    chart_title: 'График веса',
    chart_empty:
      'Нет данных. Приложение будет периодически напоминать вам взвешиваться.',
  },
  UserProfile: {
    title: 'Профиль',
    subtitle: 'Заполните данные для персональных рекомендаций',

    name_label: 'ФИО *',
    name_ph: 'напр. Иван Петров', // Tên ví dụ phổ biến ở Nga

    age_label: 'Возраст',
    age_ph: 'напр. 28',
    gender_label: 'Пол',
    gender_male: 'Мужской',
    gender_female: 'Женский',
    gender_other: 'Другой',
    height_label: 'Рост (см)',
    height_ph: 'напр. 170',
    weight_label: 'Вес (кг)',
    weight_ph: 'напр. 65',
    bmi: 'ИМТ',
    bmi_label_under: 'Дефицит массы',
    bmi_label_normal: 'Норма',
    bmi_label_over: 'Избыточный вес',
    bmi_label_obese: 'Ожирение',
    health_label: 'Статус здоровья',
    health_ph:
      'напр. Давление в норме, сон хороший, возвращаюсь к спорту...',

    injured_q: 'Есть травмы?',
    injury_label: 'Детали травмы',
    injury_ph:
      'напр. Боль в левом колене, избегать глубоких приседов; плечо...',
    hint_fill_hw: 'Введите рост и вес для получения советов.',
    rec_injured:
      'Рекомендация: приоритет на легкие тренировки Кора/Верха с большим отдыхом.',
    rec_overweight:
      'Рекомендация: План жиросжигания (легкий → средний HIIT), чередуя с Низом/Кором.',
    rec_general:
      'Рекомендация: Программа на все тело (базовая сила + Кор).',
    loading: 'Загрузка...',
    save_success_title: 'Сохранено',
    save_error_title: 'Ошибка',
    save_error_msg: "Не удалось сохранить данные. Попробуйте снова.",
    btn_delete: 'Удалить',
    btn_save: 'Сохранить',
  },
  // ru
  dashboard: {
    title: 'Панель прогресса',
    streak: 'Серия',
    thisWeek: 'На этой неделе',
    total: 'Всего',
    completedPrograms: 'Завершено',
    lastWorkout: 'Последняя тренировка'
  },
  recommend: {
    title: 'Рекомендовано для вас',
    start: 'Начать этот план'
  },
  nutrition: {
    title: 'Питание',
    subtitle: 'Ваши ежедневные цели персонализируются на основе вашего текущего профиля и цели.',
    noProfileTitle: 'Сначала заполните профиль',
    noProfileText: 'Добавьте рост, вес и цель, чтобы получить рекомендации по калориям, макроэлементам и воде.',
    targets: 'Ежедневные цели',
    calories: 'Калории',
    water: 'Вода',
    macros: 'Баланс макроэлементов',
    protein: 'Белки',
    carbs: 'Углеводы',
    fats: 'Жиры',
    sampleMeals: 'Пример плана питания',
    tips: 'Советы'
  },
  // ru
  // ru
  premium: {
    title: 'Перейти на Premium',
    removeAds: 'Убрать рекламу',
    allPrograms: 'Открыть полный доступ',
    active: 'Premium активен',
    restore: 'Восстановить покупки',
    restoreTitle: 'Восстановить покупки',
    restoreSuccess: 'Premium успешно восстановлен.',
    restoreEmpty: 'Покупка Premium не найдена.',
    errorTitle: 'Ошибка покупки',
    errorText: 'Не удалось завершить покупку.',
    productUnavailable: 'Продукт Premium не найден. Проверьте настройки Play Console / App Store.',
    subUnavailable: 'Месячная подписка не найдена. Проверьте настройки Play Console / App Store.',
    loading: 'Загрузка...',

    monthlyTitle: 'Ежемесячный Premium',
    monthlyDesc: 'Автоматически продлевается каждый месяц, чтобы Premium оставался активным',
    subscribeMonthly: 'Подписаться на месяц',

    lifetimeTitle: 'Premium навсегда',
    lifetimeDesc: 'Разовая оплата, Premium навсегда',
    buyLifetime: 'Купить навсегда'
  },
  // ru
  filters: {
    all: 'Все',

    levelTitle: 'Уровень',
    level: {
      beginner: 'Начальный',
      intermediate: 'Средний',
      advanced: 'Продвинутый',
    },

    goalTitle: 'Фокус',
    goal: {
      lose_weight: 'Похудение',
      build_muscle: 'Набор мышц',
      cardio: 'Кардио',
      core: 'Кор',
      mobility: 'Мобильность',
    },

    equipmentTitle: 'Оборудование',
    equipment: {
      no_equipment: 'Без оборудования',
      with_equipment: 'С оборудованием',
    },

    durationTitle: 'Длительность',
    duration: {
      short: 'Короткая',
      medium: 'Средняя',
      long: 'Длинная',
    },

    noResultsTitle: 'Подходящих программ не найдено',
    noResultsText: 'Попробуйте изменить один или несколько фильтров.',
  },
  // ru
beginner: {
  modeTitle: 'Режим для новичков',
  modeDesc: 'Простые объяснения и быстрые подсказки для новых пользователей.',
  glossaryTitle: 'Гид для новичков',
  terms: {
    restDay: {
      title: 'День отдыха',
      desc: 'Это день восстановления. Ваше тело отдыхает и восстанавливается, поэтому не пропускайте его.'
    },
    warmUp: {
      title: 'Разминка',
      desc: 'Лёгкие движения перед тренировкой, чтобы подготовить тело и снизить риск травм.'
    },
    cooldown: {
      title: 'Заминка',
      desc: 'Лёгкие движения или растяжка после тренировки, чтобы помочь телу восстановиться.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'Высокоинтенсивная интервальная тренировка: короткие периоды тяжёлой нагрузки с коротким отдыхом.'
    },
    rep: {
      title: 'Повтор',
      desc: 'Одно полное выполнение упражнения. Пример: один присед = один повтор.'
    },
    set: {
      title: 'Подход',
      desc: 'Группа повторений. Пример: 10 приседаний подряд = 1 подход.'
    }
  }
},
todayWorkout: {
  title: 'Тренировка на сегодня',
  fallback: 'Тренировка',
  startNow: 'Начать сейчас',
  restTitle: 'Сегодня день восстановления',
  restText: 'Отдохните, слегка потянитесь, попейте воды и подготовьтесь к следующей тренировке.'
},
// ru
history: {
  title: 'История тренировок',
  screenTitle: 'История тренировок',
  thisWeek: 'На этой неделе',
  minutes: 'Минуты',
  totalWorkouts: 'Тренировки',
  empty: 'Пока нет завершённых тренировок.',
  viewAll: 'Показать всё',
  filter7: '7 дней',
  filter30: '30 дней',
  filterAll: 'Все'
},
achievements: {
  title: 'Достижения',
  firstWorkout: 'Первая тренировка',
  tenWorkouts: '10 тренировок',
  twentyfiveWorkouts: '25 тренировок',
  streak3: 'Серия 3 дня',
  streak7: 'Серия 7 дней',
  week4: '4 тренировки на этой неделе',
  finishProgram: 'Завершить 1 программу'
},
challenges: {
  title: 'Испытания',
  intro: 'Начните короткое испытание, чтобы сохранять регулярность.',
  start7: 'Начать испытание на 7 дней',
  start30: 'Начать испытание на 30 дней',
  complete: 'Испытание завершено',
  daysLeft: 'Осталось {{count}} дн.',
  starter7Title: 'Стартовое испытание на 7 дней',
  starter7Desc: 'Выполните 5 тренировок за 7 дней.',
  consistency30Title: 'Испытание на 30 дней',
  consistency30Desc: 'Выполните 20 тренировок за 30 дней.'
},
};
const ar = {
  ...base,
  tabs: {
    main: 'الرئيسية', // Trang chủ (Main/Home)
    nutrition: 'التغذية', // Dinh dưỡng
    guide: 'الدليل', // Hướng dẫn
    premium: 'متميز', // Premium (Có thể dùng 'بريميوم' nếu muốn giữ âm tiếng Anh)
    settings: 'الإعدادات', // Cài đặt
    workout: 'التمارين', // Bài tập (Số nhiều)
    more: 'المزيد', // Xem thêm
    program: 'البرنامج', // Chương trình
    profile: 'الملف الشخصي', // Hồ sơ cá nhân
    weightChart: 'مخطط الوزن', // Biểu đồ cân nặng
  },
  home: {
    title: 'اختر خطة التمرين', // Chọn kế hoạch tập luyện
    subtitle: 'اختر برنامجاً وتدرب يومياً', // Chọn chương trình và tập hàng ngày
    program60: 'حرق الدهون في 60 يوماً', // Chương trình đốt mỡ 60 ngày
    program90: 'تمرين شامل لمدة 90 يوماً', // Chương trình toàn thân 90 ngày
    daysSuffix: '{{count}} يوم', // Ngày. (Lưu ý: Ngữ pháp số nhiều tiếng Ả Rập rất phức tạp, đây là dạng chung nhất)
    health_overview: 'نظرة عامة على الصحة', // Tổng quan sức khỏe
    activeTitle: 'قيد التنفيذ', // Đang thực hiện / Đang diễn ra
    noActive: 'لا يوجد برنامج نشط حالياً.', // Hiện không có chương trình nào đang hoạt động.
  },
  program: {
    daysPrefix: 'اليوم {{day}} • {{weekday}}',
    weekTitle: 'الأسبوع {{n}}',
    completed: 'مكتمل',
    todayWorkout: 'تمرين اليوم: {{name}}',
  },
  workouts: {
    rest: 'استشفاء / راحة',
    hiit: 'HIIT لكامل الجسم', // HIIT thường được giữ nguyên hoặc dịch là "تمرين متواتر عالي الكثافة"
    upper: 'صدر - أكتاف - ذراعين',
    lower: 'أرداف - أرجل',
    core: 'عضلات البطن والجذع', // Core = جذع (Jith')
    pickOne: 'اختر خطة للبدء',
    days: 'days'
  },
  // ar
  guide: {
    title: 'كيفية استخدام PulseFit',
    subtitle: 'اتبع هذه الخطوات البسيطة لبدء رحلتك الرياضية.',

    steps: {
      step1: {
        badge: 'الخطوة 1',
        title: 'أدخل معلوماتك الشخصية',
        desc: 'أدخل الطول والوزن والحالة الصحية والأهداف وغيرها من المعلومات الأساسية. سيحسب التطبيق مؤشر كتلة الجسم ويقدم لك نصائح صحية لمساعدتك على البدء بأمان.'
      },
      step2: {
        badge: 'الخطوة 2',
        title: 'اختر برنامج تمرين مناسب',
        desc: 'تصفح برامج التمرين المتاحة واختر البرنامج الأنسب لمستوى لياقتك وأهدافك وتفضيلاتك.'
      },
      step3: {
        badge: 'الخطوة 3',
        title: 'اختر يوم التمرين',
        desc: 'افتح البرنامج الذي اخترته وحدد يوم التمرين الذي تريد اتباعه. يمكنك التقدم خطوة بخطوة وفقًا لجدول التمرين.'
      },
      step4: {
        badge: 'الخطوة 4',
        title: 'تمرن مع الفيديو',
        desc: 'اتبع فيديو التمرين لأداء التمارين بشكل صحيح. يمكنك تدوير الهاتف أفقيًا لمشاهدة الفيديو بملء الشاشة للحصول على تجربة أفضل.'
      }
    },

    noteTitle: 'ملاحظة',
    note: 'حافظ على التمرين المنتظم لتحقيق أفضل النتائج.'
  },
  video: {
    loading: 'جاري تحميل الفيديو...',
    play: 'ابدأ التمرين',
    error: 'تعذر تشغيل الفيديو. يرجى المحاولة مرة أخرى.',
  },
  settings: {
    title: 'الإعدادات',
    language: 'اللغة',
    choose: 'اختر اللغة',
  },
  onboard: {
    title: 'لنبدأ الآن 👋',
    subtitle: 'أدخل بعض التفاصيل لنقترح عليك الخطة المناسبة',
    name: 'الاسم الكامل *',
    age: 'العمر *',
    gender: 'الجنس *',
    gender_male: 'ذكر',
    gender_female: 'أنثى',
    gender_other: 'آخر',
    health: 'الحالة الصحية',
    height: 'الطول (سم) *',
    weight: 'الوزن (كجم) *',
    injured_q: 'هل لديك إصابة؟',
    injury_note: 'وصف الإصابة',
    goal: 'الهدف الحالي *',
    goals: {
      lose_weight: 'إنقاص الوزن',
      build_muscle: 'بناء العضلات',
      maintain: 'الحفاظ على الوزن',
      recomp: 'إعادة تشكيل الجسم (حرق دهون + بناء عضلات)',
      endurance: 'التحمل',
      flexibility: 'المرونة',
    },
    tip_title: 'نصائح سريعة',
    tip_1:
      'في حال وجود إصابة، ابدأ بتمارين منخفضة التأثير وزد الكثافة تدريجياً.',
    tip_2: 'حدث وزنك كل 3 أيام لتتبع التقدم.',
    back: 'رجوع',
    next: 'التالي',
    finish: 'إنهاء',
    saving: 'جاري الحفظ...',
    bmi: 'مؤشر كتلة الجسم (BMI)',
    bmi_result_title: 'نظرة عامة على الصحة',
    bmi_label_under: 'نقص في الوزن',
    bmi_label_normal: 'وزن طبيعي',
    bmi_label_over: 'زيادة في الوزن',
    bmi_label_obese: 'سمنة',
    advice_intro: '• مؤشر كتلة جسمك: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• التركيز على زيادة الكتلة العضلية: تمرين كامل الجسم/علوي-سفلي بكثافة متوسطة؛ زيادة الأوزان؛ بروتين وسعرات حرارية كافية.',
    advice_bmi_normal:
      '• الحفاظ: مزيج من القوة + كارديو متوسط (2-3 أيام/أسبوع)؛ الأولوية للأداء الصحيح والنوم.',
    advice_bmi_over:
      '• حرق الدهون: كارديو متوسط/HIIT خفيف (2-3 أيام) + تمرين قوة لكامل الجسم؛ عجز بسيط في السعرات.',
    advice_bmi_obese:
      '• فقدان آمن للوزن: مشي سريع/كارديو منخفض التأثير + تمارين قوة أساسية؛ مراقبة نبضات القلب، زيادة الكثافة تدريجياً.',
    advice_goal_lose_weight:
      '• الهدف: إنقاص الوزن ← تتبع السعرات، 1.6–2.2 جم/كجم بروتين، نوم 7–8 ساعات.',
    advice_goal_build_muscle:
      '• الهدف: بناء العضلات ← زيادة الأحمال تدريجياً (3–5 أيام/أسبوع)، 1.6–2.2 جم/كجم بروتين، فائض بسيط في السعرات.',
    advice_goal_maintain:
      '• الهدف: الحفاظ ← 3 أيام/أسبوع، توازن بين القوة والكارديو، قياس الوزن أسبوعياً.',
    advice_goal_recomp:
      '• الهدف: إعادة التشكيل ← رفع أوزان أساسي + بروتين عالٍ، عجز بسيط في السعرات، نوم جيد.',
    advice_goal_endurance:
      '• الهدف: التحمل ← المنطقة 2 (Zone 2) + فترات متقطعة (Intervals)؛ تناول الكربوهيدرات قبل التمرين.',
    advice_goal_flexibility:
      '• الهدف: المرونة ← تمارين حركية يومية/مدى حركي 10–20 دقيقة، إضافة تمارين قوة خفيفة.',
    advice_injured:
      '• ملاحظة الإصابة: تأثير منخفض، مدى حركي بدون ألم؛ تقدم تدريجي؛ استشر مدرباً/طبيباً عند الحاجة.',
    advice_healthnote:
      '• راقب الحالات الصحية المسجلة واضبط الكثافة وفقاً لذلك.',
    start_training: 'ابدأ التمرين',
  },
  weight: {
    prompt_title: 'تحديث الوزن',
    prompt_desc: 'أدخل وزنك الحالي (كجم)',
    prompt_placeholder: 'مثال: 65.5',
    later: 'لاحقاً',
    save: 'حفظ',
    chart_title: 'تتبع الوزن',
    chart_empty:
      'لا توجد بيانات بعد. سيقوم التطبيق بتذكيرك دورياً بتسجيل وزنك.',
  },
  UserProfile: {
    title: 'الملف الشخصي',
    subtitle: 'أدخل معلوماتك للحصول على توصيات تمارين مخصصة',

    name_label: 'الاسم الكامل *',
    name_ph: 'مثال: أحمد محمد', // Tên ví dụ phổ biến

    age_label: 'العمر',
    age_ph: 'مثال: 28',
    gender_label: 'الجنس',
    gender_male: 'ذكر',
    gender_female: 'أنثى',
    gender_other: 'آخر',
    height_label: 'الطول (سم)',
    height_ph: 'مثال: 170',
    weight_label: 'الوزن (كجم)',
    weight_ph: 'مثال: 65',
    bmi: 'مؤشر كتلة الجسم (BMI)',
    bmi_label_under: 'نقص في الوزن',
    bmi_label_normal: 'وزن طبيعي',
    bmi_label_over: 'زيادة في الوزن',
    bmi_label_obese: 'سمنة',
    health_label: 'الحالة الصحية',
    health_ph:
      'مثال: ضغط الدم مستقر، النوم جيد، العودة للتدريب...',

    injured_q: 'هل لديك أي إصابات؟',
    injury_label: 'تفاصيل الإصابة',
    injury_ph:
      'مثال: ألم في الركبة اليسرى، تجنب القرفصاء العميق؛ ألم الكتف عند الدفع...',
    hint_fill_hw: 'أدخل الطول والوزن للحصول على الاقتراحات.',
    rec_injured:
      'توصية: الأولوية لتمارين الجذع/الجزء العلوي الخفيفة مع أيام راحة أكثر.',
    rec_overweight:
      'توصية: خطة حرق الدهون (HIIT خفيف ← متوسط) بالتناوب مع الجزء السفلي/الجذع.',
    rec_general:
      'توصية: خطة كامل الجسم (قوة أساسية + جذع).',
    loading: 'جاري التحميل...',
    save_success_title: 'تم الحفظ',
    save_error_title: 'خطأ',
    save_error_msg: "تعذر حفظ البيانات. يرجى المحاولة مرة أخرى.",
    btn_delete: 'حذف',
    btn_save: 'حفظ',
  },
  // ar
  dashboard: {
    title: 'لوحة التقدم',
    streak: 'سلسلة الأيام',
    thisWeek: 'هذا الأسبوع',
    total: 'الإجمالي',
    completedPrograms: 'المكتمل',
    lastWorkout: 'آخر تمرين'
  },
  recommend: {
    title: 'موصى به لك',
    start: 'ابدأ هذه الخطة'
  },
  nutrition: {
    title: 'التغذية',
    subtitle: 'يتم تخصيص أهدافك اليومية بناءً على ملفك الحالي وهدفك.',
    noProfileTitle: 'أكمل ملفك الشخصي أولاً',
    noProfileText: 'أضف طولك ووزنك وهدفك للحصول على توصيات للسعرات والماكروز والترطيب.',
    targets: 'الأهداف اليومية',
    calories: 'السعرات',
    water: 'الماء',
    macros: 'توزيع الماكروز',
    protein: 'البروتين',
    carbs: 'الكربوهيدرات',
    fats: 'الدهون',
    sampleMeals: 'خطة وجبات نموذجية',
    tips: 'نصائح'
  },
  // ar
  // ar
  premium: {
    title: 'الترقية إلى بريميوم',
    removeAds: 'إزالة الإعلانات',
    allPrograms: 'افتح التجربة الكاملة',
    active: 'بريميوم مفعل',
    restore: 'استعادة المشتريات',
    restoreTitle: 'استعادة المشتريات',
    restoreSuccess: 'تمت استعادة بريميوم بنجاح.',
    restoreEmpty: 'لم يتم العثور على أي عملية شراء لبريميوم.',
    errorTitle: 'فشل الشراء',
    errorText: 'تعذر إكمال عملية الشراء.',
    productUnavailable: 'لم يتم العثور على منتج بريميوم. يرجى التحقق من إعدادات Play Console / App Store.',
    subUnavailable: 'لم يتم العثور على الاشتراك الشهري. يرجى التحقق من إعدادات Play Console / App Store.',
    loading: 'جارٍ التحميل...',

    monthlyTitle: 'بريميوم الشهري',
    monthlyDesc: 'يتجدد تلقائيًا كل شهر للحفاظ على تفعيل بريميوم',
    subscribeMonthly: 'اشترك شهريًا',

    lifetimeTitle: 'بريميوم مدى الحياة',
    lifetimeDesc: 'دفعة واحدة، واحصل على بريميوم مدى الحياة',
    buyLifetime: 'اشترِ مدى الحياة'
  },
  // ar
  filters: {
    all: 'الكل',

    levelTitle: 'المستوى',
    level: {
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
    },

    goalTitle: 'التركيز',
    goal: {
      lose_weight: 'إنقاص الوزن',
      build_muscle: 'بناء العضلات',
      cardio: 'كارديو',
      core: 'العضلات الأساسية',
      mobility: 'المرونة',
    },

    equipmentTitle: 'المعدات',
    equipment: {
      no_equipment: 'بدون معدات',
      with_equipment: 'مع معدات',
    },

    durationTitle: 'المدة',
    duration: {
      short: 'قصيرة',
      medium: 'متوسطة',
      long: 'طويلة',
    },

    noResultsTitle: 'لا توجد برامج مطابقة',
    noResultsText: 'حاول تغيير عامل تصفية واحد أو أكثر.',
  },
  // ar
beginner: {
  modeTitle: 'وضع المبتدئين',
  modeDesc: 'شروحات بسيطة وإرشادات سريعة للمستخدمين الجدد.',
  glossaryTitle: 'دليل المبتدئين',
  terms: {
    restDay: {
      title: 'يوم الراحة',
      desc: 'إنه يوم للتعافي. يرتاح جسمك ويعيد بناء نفسه، لذلك لا تتجاهله.'
    },
    warmUp: {
      title: 'الإحماء',
      desc: 'حركة خفيفة قبل التمرين لتحضير الجسم وتقليل خطر الإصابة.'
    },
    cooldown: {
      title: 'التهدئة',
      desc: 'حركة سهلة أو تمارين إطالة بعد التمرين لمساعدة الجسم على التعافي.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'تدريب الفترات عالي الشدة: فترات قصيرة من الجهد القوي تتبعها راحات قصيرة.'
    },
    rep: {
      title: 'تكرار',
      desc: 'حركة كاملة واحدة للتمرين. مثال: قرفصاء واحدة = تكرار واحد.'
    },
    set: {
      title: 'مجموعة',
      desc: 'مجموعة من التكرارات. مثال: 10 مرات قرفصاء متتالية = مجموعة واحدة.'
    }
  }
},
todayWorkout: {
  title: 'تمرين اليوم',
  fallback: 'تمرين',
  startNow: 'ابدأ الآن',
  restTitle: 'اليوم هو يوم تعافٍ',
  restText: 'خذ قسطًا من الراحة، وتمدد بلطف، واشرب الماء، واستعد لتمرينك التالي.'
},
// ar
history: {
  title: 'سجل التمارين',
  screenTitle: 'سجل التمارين',
  thisWeek: 'هذا الأسبوع',
  minutes: 'دقائق',
  totalWorkouts: 'التمارين',
  empty: 'لا توجد تمارين مكتملة حتى الآن.',
  viewAll: 'عرض الكل',
  filter7: '7 أيام',
  filter30: '30 يومًا',
  filterAll: 'الكل'
},
achievements: {
  title: 'الإنجازات',
  firstWorkout: 'أول تمرين',
  tenWorkouts: '10 تمارين',
  twentyfiveWorkouts: '25 تمرينًا',
  streak3: 'سلسلة 3 أيام',
  streak7: 'سلسلة 7 أيام',
  week4: '4 تمارين هذا الأسبوع',
  finishProgram: 'إكمال برنامج واحد'
},
challenges: {
  title: 'التحديات',
  intro: 'ابدأ تحديًا قصيرًا للحفاظ على الاستمرارية.',
  start7: 'ابدأ تحدي 7 أيام',
  start30: 'ابدأ تحدي 30 يومًا',
  complete: 'تم إكمال التحدي',
  daysLeft: 'متبقي {{count}} يوم',
  starter7Title: 'تحدي البداية لمدة 7 أيام',
  starter7Desc: 'أكمل 5 تمارين خلال 7 أيام.',
  consistency30Title: 'تحدي الاستمرارية لمدة 30 يومًا',
  consistency30Desc: 'أكمل 20 تمرينًا خلال 30 يومًا.'
}
};
const hi = {
  ...base,
  tabs: {
    main: 'होम',                // Home (Phiên âm từ tiếng Anh, phổ biến nhất trong app)
    nutrition: 'पोषण',          // Dinh dưỡng
    guide: 'गाइड',              // Hướng dẫn (Phiên âm)
    premium: 'प्रीमियम',        // Premium (Phiên âm)
    settings: 'सेटिंग्स',       // Cài đặt (Phiên âm)
    workout: 'वर्कआउट',         // Tập luyện (Phiên âm)
    more: 'अधिक',               // Thêm/Khác
    program: 'प्रोग्राम',       // Chương trình (Phiên âm)
    profile: 'प्रोफ़ाइल',       // Hồ sơ (Phiên âm)
    weightChart: 'वजन चार्ट',   // Biểu đồ cân nặng
  },
  home: {
    title: 'अपना वर्कआउट प्लान चुनें', // Chọn kế hoạch tập luyện của bạn
    subtitle: 'एक प्रोग्राम चुनें और रोज़ ट्रेनिंग करें', // Chọn một chương trình và tập luyện hàng ngày
    program60: '60-दिवसीय फैट बर्न',  // Đốt mỡ 60 ngày (Giữ 'Fat Burn' phiên âm sẽ tự nhiên hơn 'Vasa Jalana')
    program90: '90-दिवसीय फुल बॉडी',  // Toàn thân 90 ngày
    daysSuffix: '{{count}} दिन',      // Ngày
    health_overview: 'स्वास्थ्य अवलोकन', // Tổng quan sức khỏe
    activeTitle: 'जारी है',           // Đang diễn ra/Đang thực hiện (Dịch thoát ý từ Practicing)
    noActive: 'वर्तमान में कोई प्रोग्राम सक्रिय नहीं है', // Hiện không có chương trình nào đang hoạt động.
  },
  program: {
    daysPrefix: 'दिन {{day}} • {{weekday}}', // Day
    weekTitle: 'सप्ताह {{n}}', // Week
    completed: 'पूरा हुआ', // Completed
    todayWorkout: 'आज का वर्कआउट: {{name}}',
  },
  workouts: {
    rest: 'रिकवरी / आराम', // Recovery / Rest
    hiit: 'फुल-बॉडी HIIT', // Full-body HIIT
    upper: 'छाती - कंधे - बाहें', // Chest - Shoulder - Arms
    lower: 'कूल्हे - पैर', // Glutes - Legs
    core: 'एब्स (Abs) और कोर', // Abs & Core
    pickOne: 'शुरू करने के लिए एक प्लान चुनें',
    days: 'दिन',
  },
  // hi
  guide: {
    title: 'PulseFit का उपयोग कैसे करें',
    subtitle: 'अपनी वर्कआउट यात्रा शुरू करने के लिए इन आसान चरणों का पालन करें।',

    steps: {
      step1: {
        badge: 'चरण 1',
        title: 'अपनी व्यक्तिगत जानकारी दर्ज करें',
        desc: 'अपनी लंबाई, वजन, स्वास्थ्य स्थिति, लक्ष्य और अन्य बुनियादी जानकारी भरें। ऐप आपका BMI निकालेगा और आपको सुरक्षित शुरुआत के लिए स्वास्थ्य सलाह देगा।'
      },
      step2: {
        badge: 'चरण 2',
        title: 'उपयुक्त वर्कआउट प्रोग्राम चुनें',
        desc: 'उपलब्ध वर्कआउट प्रोग्राम देखें और अपने फिटनेस स्तर, लक्ष्यों और पसंद के अनुसार सबसे उपयुक्त प्रोग्राम चुनें।'
      },
      step3: {
        badge: 'चरण 3',
        title: 'अपना वर्कआउट दिन चुनें',
        desc: 'चुने गए प्रोग्राम को खोलें और वह दिन चुनें जिसे आप करना चाहते हैं। आप शेड्यूल के अनुसार चरण दर चरण आगे बढ़ सकते हैं।'
      },
      step4: {
        badge: 'चरण 4',
        title: 'वीडियो के साथ वर्कआउट करें',
        desc: 'सही तरीके से अभ्यास करने के लिए वर्कआउट वीडियो का पालन करें। बेहतर अनुभव के लिए आप अपना फोन क्षैतिज घुमा कर वीडियो को फुल स्क्रीन में देख सकते हैं।'
      }
    },

    noteTitle: 'नोट',
    note: 'सबसे अच्छे परिणाम पाने के लिए नियमित रूप से अभ्यास करते रहें।'
  },
  video: {
    loading: 'वीडियो लोड हो रहा है...',
    play: 'वर्कआउट शुरू करें',
    error: 'वीडियो चलाने में असमर्थ। कृपया पुनः प्रयास करें।',
  },
  settings: {
    title: 'सेटिंग्स',
    language: 'भाषा',
    choose: 'भाषा चुनें',
  },
  onboard: {
    title: 'चलिए शुरू करते हैं 👋',
    subtitle: 'कुछ विवरण दर्ज करें ताकि हम आपके लिए सही प्लान सुझा सकें',
    name: 'पूरा नाम *',
    age: 'उम्र *',
    gender: 'लिंग *',
    gender_male: 'पुरुष',
    gender_female: 'महिला',
    gender_other: 'अन्य',
    health: 'स्वास्थ्य स्थिति',
    height: 'कद (cm) *',
    weight: 'वजन (kg) *',
    injured_q: 'क्या कोई चोट (Injury) है?',
    injury_note: 'चोट का विवरण',
    goal: 'वर्तमान लक्ष्य *',
    goals: {
      lose_weight: 'वजन घटाएं',
      build_muscle: 'मसल्स (Muscle) बनाएं',
      maintain: 'वजन बनाए रखें',
      recomp: 'रिकॉम्प (फैट लॉस + मसल गेन)',
      endurance: 'स्टैमिना बढ़ाएं',
      flexibility: 'लचीलापन (Flexibility)',
    },
    tip_title: 'क्विक टिप्स',
    tip_1:
      'यदि चोट लगी है, तो कम प्रभाव (Low-impact) वाले व्यायाम से शुरू करें और धीरे-धीरे तीव्रता बढ़ाएं।',
    tip_2: 'प्रगति ट्रैक करने के लिए हर 3 दिन में अपना वजन अपडेट करें।',
    back: 'पीछे',
    next: 'आगे',
    finish: 'समाप्त',
    saving: 'सेव हो रहा है...',
    bmi: 'BMI',
    bmi_result_title: 'स्वास्थ्य अवलोकन',
    bmi_label_under: 'कम वजन (Underweight)',
    bmi_label_normal: 'सामान्य',
    bmi_label_over: 'अधिक वजन (Overweight)',
    bmi_label_obese: 'मोटापा (Obese)',
    advice_intro: '• आपका BMI: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• लीन मास (Lean Mass) बढ़ाने पर ध्यान दें: मध्यम तीव्रता पर फुल-बॉडी/अपर-लोअर वर्कआउट; वजन बढ़ाएं; पर्याप्त प्रोटीन और कैलोरी लें।',
    advice_bmi_normal:
      '• बनाए रखें (Maintain): स्ट्रेंथ + मध्यम कार्डियो (सप्ताह में 2-3 दिन); तकनीक और नींद को प्राथमिकता दें।',
    advice_bmi_over:
      '• फैट लॉस: मध्यम कार्डियो/हल्का HIIT (2-3 दिन) + फुल-बॉडी स्ट्रेंथ; कैलोरी में थोड़ी कमी (Deficit) रखें।',
    advice_bmi_obese:
      '• सुरक्षित फैट लॉस: तेज चलना/लो-इम्पैक्ट कार्डियो + बेसिक स्ट्रेंथ; हार्ट रेट पर नज़र रखें, धीरे-धीरे तीव्रता बढ़ाएं।',
    advice_goal_lose_weight:
      '• लक्ष्य: वजन घटाना → कैलोरी ट्रैक करें, 1.6–2.2g/kg प्रोटीन, 7–8 घंटे की नींद।',
    advice_goal_build_muscle:
      '• लक्ष्य: मसल्स बनाना → प्रोग्रेसिव ओवरलोड (सप्ताह में 3-5 दिन), 1.6–2.2g/kg प्रोटीन, कैलोरी में थोड़ी बढ़ोतरी।',
    advice_goal_maintain:
      '• लक्ष्य: बनाए रखना → सप्ताह में 3 दिन, स्ट्रेंथ + कार्डियो का संतुलन, साप्ताहिक वजन करें।',
    advice_goal_recomp:
      '• लक्ष्य: रिकॉम्प → बेसिक लिफ्टिंग + उच्च प्रोटीन, कैलोरी में थोड़ी कमी, अच्छी नींद।',
    advice_goal_endurance:
      '• लक्ष्य: एंड्योरेंस → जोन 2 + इंटरवल; वर्कआउट से पहले कार्ब्स लें।',
    advice_goal_flexibility:
      '• लक्ष्य: फ्लेक्सिबिलिटी → रोज़ाना मोबिलिटी/ROM 10–20 मिनट, हल्की स्ट्रेंथ ट्रेनिंग जोड़ें।',
    advice_injured:
      '• चोट नोट: लो-इम्पैक्ट, बिना दर्द वाली रेंज में करें; धीरे-धीरे आगे बढ़ें; ज़रूरत पड़ने पर कोच/डॉक्टर से सलाह लें।',
    advice_healthnote:
      '• नोट की गई स्वास्थ्य स्थितियों पर नज़र रखें और उसके अनुसार तीव्रता को समायोजित करें।',
    start_training: 'ट्रेनिंग शुरू करें',
  },
  weight: {
    prompt_title: 'वजन अपडेट करें',
    prompt_desc: 'अपना वर्तमान वजन दर्ज करें (kg)',
    prompt_placeholder: 'जैसे: 65.5',
    later: 'बाद में',
    save: 'सेव करें',
    chart_title: 'वजन ट्रैकिंग',
    chart_empty:
      'अभी कोई डेटा नहीं है। ऐप आपको समय-समय पर वजन लॉग करने के लिए याद दिलाएगा।',
  },
  UserProfile: {
    title: 'यूज़र प्रोफ़ाइल',
    subtitle: 'पर्सनलाइज़्ड वर्कआउट सुझाव पाने के लिए अपनी जानकारी दर्ज करें',

    name_label: 'पूरा नाम *',
    name_ph: 'जैसे: राहुल शर्मा', // Tên ví dụ phổ biến tại Ấn Độ

    age_label: 'उम्र',
    age_ph: 'जैसे: 28',
    gender_label: 'लिंग',
    gender_male: 'पुरुष',
    gender_female: 'महिला',
    gender_other: 'अन्य',
    height_label: 'कद (cm)',
    height_ph: 'जैसे: 170',
    weight_label: 'वजन (kg)',
    weight_ph: 'जैसे: 65',
    bmi: 'BMI',
    bmi_label_under: 'कम वजन',
    bmi_label_normal: 'सामान्य',
    bmi_label_over: 'अधिक वजन',
    bmi_label_obese: 'मोटापा',
    health_label: 'स्वास्थ्य स्थिति',
    health_ph:
      'जैसे: बीपी (BP) सामान्य, नींद अच्छी, ट्रेनिंग पर वापसी...',

    injured_q: 'क्या कोई चोट है?',
    injury_label: 'चोट का विवरण',
    injury_ph:
      'जैसे: बाएं घुटने में दर्द, गहरे स्क्वैट्स (Squats) से बचें; शोल्डर पेन...',
    hint_fill_hw: 'सुझाव पाने के लिए कद और वजन दर्ज करें।',
    rec_injured:
      'सुझाव: अधिक आराम के दिनों के साथ हल्के कोर/अपर बॉडी सेशन को प्राथमिकता दें।',
    rec_overweight:
      'सुझाव: फैट-लॉस प्लान (हल्का → मध्यम HIIT) और लोअर/कोर को बदल-बदल कर करें।',
    rec_general:
      'सुझाव: फुल-बॉडी प्लान (बुनियादी स्ट्रेंथ + कोर)।',
    loading: 'लोड हो रहा है...',
    save_success_title: 'सेव कर लिया गया',
    save_error_title: 'त्रुटि (Error)',
    save_error_msg: "आपका डेटा सेव नहीं हो सका। कृपया पुनः प्रयास करें।",
    btn_delete: 'हटाएं',
    btn_save: 'सेव करें',
  },
  // hi
  dashboard: {
    title: 'प्रगति डैशबोर्ड',
    streak: 'लगातार दिन',
    thisWeek: 'इस सप्ताह',
    total: 'कुल',
    completedPrograms: 'पूर्ण',
    lastWorkout: 'पिछला वर्कआउट'
  },
  recommend: {
    title: 'आपके लिए सुझाया गया',
    start: 'यह प्लान शुरू करें'
  },
  nutrition: {
    title: 'पोषण',
    subtitle: 'आपके दैनिक लक्ष्य आपकी वर्तमान प्रोफ़ाइल और लक्ष्य के आधार पर व्यक्तिगत रूप से तय किए जाते हैं।',
    noProfileTitle: 'पहले अपनी प्रोफ़ाइल पूरी करें',
    noProfileText: 'कैलोरी, मैक्रो और हाइड्रेशन सुझाव पाने के लिए अपनी लंबाई, वजन और लक्ष्य जोड़ें।',
    targets: 'दैनिक लक्ष्य',
    calories: 'कैलोरी',
    water: 'पानी',
    macros: 'मैक्रो विभाजन',
    protein: 'प्रोटीन',
    carbs: 'कार्ब्स',
    fats: 'वसा',
    sampleMeals: 'उदाहरण भोजन योजना',
    tips: 'सुझाव'
  },
  // hi
  // hi
  premium: {
    title: 'प्रीमियम में अपग्रेड करें',
    removeAds: 'विज्ञापन हटाएँ',
    allPrograms: 'पूरा अनुभव अनलॉक करें',
    active: 'प्रीमियम सक्रिय है',
    restore: 'खरीदारी पुनर्स्थापित करें',
    restoreTitle: 'खरीदारी पुनर्स्थापित करें',
    restoreSuccess: 'प्रीमियम सफलतापूर्वक पुनर्स्थापित हो गया।',
    restoreEmpty: 'कोई प्रीमियम खरीद नहीं मिली।',
    errorTitle: 'खरीद विफल रही',
    errorText: 'खरीद पूरी नहीं हो सकी।',
    productUnavailable: 'प्रीमियम प्रोडक्ट नहीं मिला। कृपया Play Console / App Store सेटअप जाँचें।',
    subUnavailable: 'मासिक सदस्यता नहीं मिली। कृपया Play Console / App Store सेटअप जाँचें।',
    loading: 'लोड हो रहा है...',

    monthlyTitle: 'मासिक प्रीमियम',
    monthlyDesc: 'प्रीमियम सक्रिय रखने के लिए हर महीने अपने आप नवीनीकृत होता है',
    subscribeMonthly: 'मासिक सदस्यता लें',

    lifetimeTitle: 'आजीवन प्रीमियम',
    lifetimeDesc: 'एक बार भुगतान करें, हमेशा के लिए प्रीमियम पाएँ',
    buyLifetime: 'आजीवन खरीदें'
  },
  // ar
  // hi
  filters: {
    all: 'सभी',

    levelTitle: 'स्तर',
    level: {
      beginner: 'शुरुआती',
      intermediate: 'मध्यम',
      advanced: 'उन्नत',
    },

    goalTitle: 'फोकस',
    goal: {
      lose_weight: 'वजन घटाना',
      build_muscle: 'मांसपेशी बढ़ाना',
      cardio: 'कार्डियो',
      core: 'कोर',
      mobility: 'लचीलापन',
    },

    equipmentTitle: 'उपकरण',
    equipment: {
      no_equipment: 'बिना उपकरण',
      with_equipment: 'उपकरण के साथ',
    },

    durationTitle: 'अवधि',
    duration: {
      short: 'कम',
      medium: 'मध्यम',
      long: 'लंबी',
    },

    noResultsTitle: 'कोई मेल खाने वाला प्रोग्राम नहीं मिला',
    noResultsText: 'एक या अधिक फ़िल्टर बदलकर देखें।',
  },
  // hi
beginner: {
  modeTitle: 'बिगिनर मोड',
  modeDesc: 'नए उपयोगकर्ताओं के लिए आसान समझ और त्वरित मार्गदर्शन।',
  glossaryTitle: 'शुरुआती गाइड',
  terms: {
    restDay: {
      title: 'आराम का दिन',
      desc: 'यह रिकवरी का दिन है। आपका शरीर आराम करता है और खुद को दोबारा बनाता है, इसलिए इसे न छोड़ें।'
    },
    warmUp: {
      title: 'वार्म-अप',
      desc: 'वर्कआउट से पहले हल्की गतिविधि ताकि शरीर तैयार हो जाए और चोट का जोखिम कम हो।'
    },
    cooldown: {
      title: 'कूलडाउन',
      desc: 'वर्कआउट के बाद हल्की गतिविधि या स्ट्रेचिंग जिससे शरीर को रिकवरी में मदद मिले।'
    },
    hiit: {
      title: 'HIIT',
      desc: 'हाई-इंटेंसिटी इंटरवल ट्रेनिंग: थोड़े समय की तेज मेहनत के बाद छोटा आराम।'
    },
    rep: {
      title: 'रेप',
      desc: 'किसी व्यायाम की एक पूरी चाल। उदाहरण: एक स्क्वाट = एक रेप।'
    },
    set: {
      title: 'सेट',
      desc: 'रेप्स का एक समूह। उदाहरण: 10 स्क्वाट लगातार करना = 1 सेट।'
    }
  }
},
todayWorkout: {
  title: 'आज का वर्कआउट',
  fallback: 'वर्कआउट',
  startNow: 'अभी शुरू करें',
  restTitle: 'आज रिकवरी का दिन है',
  restText: 'थोड़ा आराम करें, हल्का स्ट्रेच करें, पानी पिएं और अपने अगले वर्कआउट के लिए तैयार हों।'
},
// hi
history: {
  title: 'वर्कआउट इतिहास',
  screenTitle: 'वर्कआउट इतिहास',
  thisWeek: 'इस सप्ताह',
  minutes: 'मिनट',
  totalWorkouts: 'वर्कआउट',
  empty: 'अभी तक कोई पूरा वर्कआउट नहीं है।',
  viewAll: 'सभी देखें',
  filter7: '7 दिन',
  filter30: '30 दिन',
  filterAll: 'सभी'
},
achievements: {
  title: 'उपलब्धियाँ',
  firstWorkout: 'पहला वर्कआउट',
  tenWorkouts: '10 वर्कआउट',
  twentyfiveWorkouts: '25 वर्कआउट',
  streak3: '3-दिन की लगातार श्रृंखला',
  streak7: '7-दिन की लगातार श्रृंखला',
  week4: 'इस सप्ताह 4 वर्कआउट',
  finishProgram: '1 प्रोग्राम पूरा करें'
},
challenges: {
  title: 'चैलेंज',
  intro: 'नियमित बने रहने के लिए एक छोटा चैलेंज शुरू करें।',
  start7: '7-दिन का चैलेंज शुरू करें',
  start30: '30-दिन का चैलेंज शुरू करें',
  complete: 'चैलेंज पूरा हुआ',
  daysLeft: '{{count}} दिन बाकी',
  starter7Title: '7-दिन शुरुआती चैलेंज',
  starter7Desc: '7 दिनों में 5 वर्कआउट पूरे करें।',
  consistency30Title: '30-दिन नियमितता चैलेंज',
  consistency30Desc: '30 दिनों में 20 वर्कआउट पूरे करें।'
}
};
const th = {
  tabs: {
    main: 'หน้าหลัก',           // Trang chủ (Main Page)
    nutrition: 'โภชนาการ',       // Dinh dưỡng
    guide: 'คำแนะนำ',           // Hướng dẫn (Hoặc dùng từ 'คู่มือ' - Manual)
    premium: 'พรีเมียม',         // Premium (Phiên âm tiếng Anh, rất phổ biến)
    settings: 'การตั้งค่า',      // Cài đặt
    workout: 'ออกกำลังกาย',      // Tập luyện
    more: 'เพิ่มเติม',           // Thêm/Khác
    program: 'โปรแกรม',          // Chương trình
    profile: 'โปรไฟล์',          // Hồ sơ (Phiên âm, dùng phổ biến hơn 'ข้อมูลส่วนตัว')
    weightChart: 'กราฟน้ำหนัก',  // Biểu đồ cân nặng
  },
  home: {
    title: 'เลือกแผนการออกกำลังกาย', // Chọn kế hoạch tập luyện
    subtitle: 'เลือกโปรแกรมและฝึกซ้อมทุกวัน', // Chọn chương trình và tập mỗi ngày
    program60: 'เบิร์นไขมัน 60 วัน', // Đốt mỡ 60 ngày (Dùng từ 'Burn' phiên âm rất tự nhiên trong giới gym Thái)
    program90: 'บริหารทั่วร่างกาย 90 วัน', // Toàn thân 90 ngày
    daysSuffix: '{{count}} วัน',    // Ngày (Tiếng Thái không chia số nhiều)
    health_overview: 'ภาพรวมสุขภาพ', // Tổng quan sức khỏe
    activeTitle: 'กำลังดำเนินการ',   // Đang thực hiện / In Progress (Dịch thoát ý từ Practicing)
    noActive: 'ไม่มีโปรแกรมที่กำลังฝึกในขณะนี้', // Hiện không có chương trình nào đang tập.
  },
  program: {
    daysPrefix: 'วันที่ {{day}} • {{weekday}}',
    weekTitle: 'สัปดาห์ที่ {{n}}',
    completed: 'เสร็จสิ้น',
    todayWorkout: 'การฝึกวันนี้: {{name}}',
  },
  workouts: {
    rest: 'ฟื้นฟูร่างกาย / พักผ่อน',
    hiit: 'HIIT ทั่วร่างกาย', // HIIT (High Intensity Interval Training)
    upper: 'อก - ไหล่ - แขน',
    lower: 'ก้น - ขา',
    core: 'หน้าท้อง & แกนกลางลำตัว', // Core = แกนกลางลำตัว
    pickOne: 'เลือกแผนการฝึกเพื่อเริ่มต้น',
    days: 'วัน',
  },
  // th
  guide: {
    title: 'วิธีใช้ PulseFit',
    subtitle: 'ทำตามขั้นตอนง่าย ๆ เหล่านี้เพื่อเริ่มต้นการออกกำลังกายของคุณ',

    steps: {
      step1: {
        badge: 'ขั้นตอนที่ 1',
        title: 'กรอกข้อมูลส่วนตัว',
        desc: 'กรอกส่วนสูง น้ำหนัก สถานะสุขภาพ เป้าหมาย และข้อมูลพื้นฐานอื่น ๆ แอปจะคำนวณค่า BMI และให้คำแนะนำด้านสุขภาพเพื่อช่วยให้คุณเริ่มต้นได้อย่างปลอดภัย'
      },
      step2: {
        badge: 'ขั้นตอนที่ 2',
        title: 'เลือกโปรแกรมออกกำลังกายที่เหมาะสม',
        desc: 'ดูโปรแกรมออกกำลังกายที่มีอยู่และเลือกโปรแกรมที่เหมาะกับระดับความฟิต เป้าหมาย และความชอบของคุณมากที่สุด'
      },
      step3: {
        badge: 'ขั้นตอนที่ 3',
        title: 'เลือกวันออกกำลังกาย',
        desc: 'เปิดโปรแกรมที่เลือกแล้วเลือกวันที่คุณต้องการฝึก คุณสามารถทำตามตารางทีละขั้นตอนได้'
      },
      step4: {
        badge: 'ขั้นตอนที่ 4',
        title: 'ออกกำลังกายตามวิดีโอ',
        desc: 'ทำตามวิดีโอออกกำลังกายเพื่อฝึกได้อย่างถูกต้อง คุณสามารถหมุนหน้าจอเป็นแนวนอนเพื่อดูวิดีโอแบบเต็มหน้าจอได้'
      }
    },

    noteTitle: 'หมายเหตุ',
    note: 'ออกกำลังกายอย่างสม่ำเสมอเพื่อให้ได้ผลลัพธ์ที่ดีที่สุด'
  },
  video: {
    loading: 'กำลังโหลดวิดีโอ...',
    play: 'เริ่มการฝึก',
    error: 'ไม่สามารถเล่นวิดีโอได้ โปรดลองอีกครั้ง',
  },
  settings: {
    title: 'การตั้งค่า',
    language: 'ภาษา',
    choose: 'เลือกภาษา',
  },
  onboard: {
    title: 'มาเริ่มกันเลย 👋',
    subtitle: 'กรอกข้อมูลเล็กน้อย เพื่อให้เราแนะนำแผนที่เหมาะสมกับคุณ',
    name: 'ชื่อ-นามสกุล *',
    age: 'อายุ *',
    gender: 'เพศ *',
    gender_male: 'ชาย',
    gender_female: 'หญิง',
    gender_other: 'อื่นๆ',
    health: 'ปัญหาสุขภาพ',
    height: 'ส่วนสูง (ซม.) *',
    weight: 'น้ำหนัก (กก.) *',
    injured_q: 'มีอาการบาดเจ็บหรือไม่?',
    injury_note: 'รายละเอียดอาการบาดเจ็บ',
    goal: 'เป้าหมายปัจจุบัน *',
    goals: {
      lose_weight: 'ลดน้ำหนัก',
      build_muscle: 'สร้างกล้ามเนื้อ',
      maintain: 'รักษารูปร่าง',
      recomp: 'ปรับรูปร่าง (ลดไขมัน + สร้างกล้ามเนื้อ)',
      endurance: 'เพิ่มความอึด (Endurance)',
      flexibility: 'เพิ่มความยืดหยุ่น',
    },
    tip_title: 'เคล็ดลับด่วน',
    tip_1:
      'หากมีอาการบาดเจ็บ ให้เริ่มจากท่าที่แรงกระแทกต่ำ (Low-impact) และค่อยๆ เพิ่มความหนัก',
    tip_2: 'อัปเดตน้ำหนักทุก 3 วันเพื่อติดตามความคืบหน้า',
    back: 'ย้อนกลับ',
    next: 'ถัดไป',
    finish: 'เสร็จสิ้น',
    saving: 'กำลังบันทึก...',
    bmi: 'BMI',
    bmi_result_title: 'ภาพรวมสุขภาพ',
    bmi_label_under: 'น้ำหนักต่ำกว่าเกณฑ์',
    bmi_label_normal: 'สมส่วน',
    bmi_label_over: 'น้ำหนักเกิน',
    bmi_label_obese: 'โรคอ้วน',
    advice_intro: '• ค่า BMI ของคุณ: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• เน้นเพิ่มมวลกล้ามเนื้อ: ฝึกทั่วร่างกาย/บน-ล่าง ความหนักปานกลาง; เพิ่มน้ำหนักที่ยก; กินโปรตีนและแคลอรี่ให้เพียงพอ',
    advice_bmi_normal:
      '• รักษาหุ่น: เวทเทรนนิ่ง + คาร์ดิโอปานกลาง (2–3 วัน/สัปดาห์); ให้ความสำคัญกับท่าที่ถูกต้องและการนอนหลับ',
    advice_bmi_over:
      '• ลดไขมัน: คาร์ดิโอปานกลาง/HIIT เบาๆ 2–3 วัน + เวทเทรนนิ่งทั่วร่างกาย; กินให้น้อยกว่าที่ใช้เล็กน้อย (Calorie Deficit)',
    advice_bmi_obese:
      '• ลดอย่างปลอดภัย: เดินเร็ว/คาร์ดิโอแรงกระแทกต่ำ + เวทเทรนนิ่งพื้นฐาน; คุมอัตราการเต้นหัวใจ, ค่อยๆ เพิ่มความหนัก',
    advice_goal_lose_weight:
      '• เป้าหมาย: ลดน้ำหนัก → นับแคลอรี่, โปรตีน 1.6–2.2 ก./กก., นอน 7–8 ชม.',
    advice_goal_build_muscle:
      '• เป้าหมาย: สร้างกล้ามเนื้อ → เพิ่มความหนักต่อเนื่อง (Progressive Overload) 3–5 วัน/สัปดาห์, โปรตีน 1.6–2.2 ก./กก., กินเกินเล็กน้อย',
    advice_goal_maintain:
      '• เป้าหมาย: รักษารูปร่าง → 3 วัน/สัปดาห์, สมดุลเวท+คาร์ดิโอ, ชั่งน้ำหนักรายสัปดาห์',
    advice_goal_recomp:
      '• เป้าหมาย: ปรับรูปร่าง (Recomp) → ยกเวทพื้นฐาน + โปรตีนสูง, กินน้อยกว่าใช้เล็กน้อย, นอนให้พอ',
    advice_goal_endurance:
      '• เป้าหมาย: ความอึด → โซน 2 + อินเทอร์วัล; กินคาร์บก่อนฝึก',
    advice_goal_flexibility:
      '• เป้าหมาย: ความยืดหยุ่น → ยืดเหยียด/เคลื่อนไหวข้อต่อ (ROM) ทุกวัน 10–20 นาที, เพิ่มเวทเบาๆ',
    advice_injured:
      '• บันทึกอาการบาดเจ็บ: เน้นแรงกระแทกต่ำ, ทำในระยะที่ไม่เจ็บ; ค่อยๆ พัฒนา; ปรึกษาโค้ช/หมอเมื่อจำเป็น',
    advice_healthnote:
      '• ระวังปัญหาสุขภาพที่บันทึกไว้ และปรับความหนักให้เหมาะสม',
    start_training: 'เริ่มการฝึก',
  },
  weight: {
    prompt_title: 'อัปเดตน้ำหนัก',
    prompt_desc: 'ใส่น้ำหนักปัจจุบัน (กก.)',
    prompt_placeholder: 'เช่น 65.5',
    later: 'ไว้ทีหลัง',
    save: 'บันทึก',
    chart_title: 'ติดตามน้ำหนัก',
    chart_empty:
      'ยังไม่มีข้อมูล แอปจะเตือนให้คุณบันทึกน้ำหนักเป็นระยะๆ',
  },
  UserProfile: {
    title: 'โปรไฟล์ผู้ใช้',
    subtitle: 'กรอกข้อมูลของคุณเพื่อรับคำแนะนำการออกกำลังกายเฉพาะบุคคล',

    name_label: 'ชื่อ-นามสกุล *',
    name_ph: 'เช่น สมชาย ใจดี', // Tên ví dụ phổ biến ở Thái

    age_label: 'อายุ',
    age_ph: 'เช่น 28',
    gender_label: 'เพศ',
    gender_male: 'ชาย',
    gender_female: 'หญิง',
    gender_other: 'อื่นๆ',
    height_label: 'ส่วนสูง (ซม.)',
    height_ph: 'เช่น 170',
    weight_label: 'น้ำหนัก (กก.)',
    weight_ph: 'เช่น 65',
    bmi: 'BMI',
    bmi_label_under: 'น้ำหนักต่ำกว่าเกณฑ์',
    bmi_label_normal: 'สมส่วน',
    bmi_label_over: 'น้ำหนักเกิน',
    bmi_label_obese: 'โรคอ้วน',
    health_label: 'สถานะสุขภาพ',
    health_ph:
      'เช่น ความดันปกติ, นอนหลับดี, เพิ่งกลับมาฝึก...',

    injured_q: 'มีอาการบาดเจ็บหรือไม่?',
    injury_label: 'รายละเอียดอาการบาดเจ็บ',
    injury_ph:
      'เช่น เจ็บเข่าซ้าย เลี่ยงท่านั่งยอง (Squat) ลึก; เจ็บไหล่ตอนดัน...',
    hint_fill_hw: 'กรอกส่วนสูง & น้ำหนัก เพื่อดูคำแนะนำ',
    rec_injured:
      'คำแนะนำ: เน้นช่วงแกนกลาง/ลำตัวส่วนบนแบบเบาๆ และพักผ่อนให้มากขึ้น',
    rec_overweight:
      'คำแนะนำ: แผนลดไขมัน (HIIT เบา → ปานกลาง) สลับกับช่วงล่าง/แกนกลาง',
    rec_general:
      'คำแนะนำ: แผนทั่วร่างกาย (ความแข็งแรงพื้นฐาน + แกนกลาง)',
    loading: 'กำลังโหลด...',
    save_success_title: 'บันทึกแล้ว',
    save_error_title: 'ผิดพลาด',
    save_error_msg: "ไม่สามารถบันทึกข้อมูลได้ โปรดลองอีกครั้ง",
    btn_delete: 'ลบ',
    btn_save: 'บันทึก',
  },
  // th
  dashboard: {
    title: 'แดชบอร์ดความคืบหน้า',
    streak: 'สถิติต่อเนื่อง',
    thisWeek: 'สัปดาห์นี้',
    total: 'รวม',
    completedPrograms: 'เสร็จแล้ว',
    lastWorkout: 'การออกกำลังกายล่าสุด'
  },
  recommend: {
    title: 'แนะนำสำหรับคุณ',
    start: 'เริ่มแผนนี้'
  },
  nutrition: {
    title: 'โภชนาการ',
    subtitle: 'เป้าหมายประจำวันของคุณจะถูกปรับให้เหมาะกับโปรไฟล์และเป้าหมายปัจจุบันของคุณ',
    noProfileTitle: 'กรุณากรอกโปรไฟล์ให้ครบก่อน',
    noProfileText: 'เพิ่มส่วนสูง น้ำหนัก และเป้าหมายของคุณเพื่อรับคำแนะนำเรื่องแคลอรี่ แมคโคร และการดื่มน้ำ',
    targets: 'เป้าหมายประจำวัน',
    calories: 'แคลอรี่',
    water: 'น้ำ',
    macros: 'สัดส่วนแมคโคร',
    protein: 'โปรตีน',
    carbs: 'คาร์บ',
    fats: 'ไขมัน',
    sampleMeals: 'แผนมื้ออาหารตัวอย่าง',
    tips: 'เคล็ดลับ'
  },
  // th
  // th
  premium: {
    title: 'อัปเกรดเป็นพรีเมียม',
    removeAds: 'ลบโฆษณา',
    allPrograms: 'ปลดล็อกประสบการณ์ทั้งหมด',
    active: 'พรีเมียมเปิดใช้งานแล้ว',
    restore: 'กู้คืนการซื้อ',
    restoreTitle: 'กู้คืนการซื้อ',
    restoreSuccess: 'กู้คืนพรีเมียมสำเร็จแล้ว',
    restoreEmpty: 'ไม่พบการซื้อพรีเมียม',
    errorTitle: 'การซื้อไม่สำเร็จ',
    errorText: 'ไม่สามารถดำเนินการซื้อให้เสร็จสิ้นได้',
    productUnavailable: 'ไม่พบสินค้า Premium กรุณาตรวจสอบการตั้งค่า Play Console / App Store',
    subUnavailable: 'ไม่พบแพ็กเกจสมัครสมาชิกรายเดือน กรุณาตรวจสอบการตั้งค่า Play Console / App Store',
    loading: 'กำลังโหลด...',

    monthlyTitle: 'พรีเมียมรายเดือน',
    monthlyDesc: 'ต่ออายุอัตโนมัติทุกเดือนเพื่อคงสถานะพรีเมียม',
    subscribeMonthly: 'สมัครรายเดือน',

    lifetimeTitle: 'พรีเมียมตลอดชีพ',
    lifetimeDesc: 'จ่ายครั้งเดียว ใช้งานพรีเมียมได้ตลอดไป',
    buyLifetime: 'ซื้อตลอดชีพ'
  },
  // th
  filters: {
    all: 'ทั้งหมด',

    levelTitle: 'ระดับ',
    level: {
      beginner: 'ผู้เริ่มต้น',
      intermediate: 'ปานกลาง',
      advanced: 'ขั้นสูง',
    },

    goalTitle: 'เป้าหมาย',
    goal: {
      lose_weight: 'ลดน้ำหนัก',
      build_muscle: 'สร้างกล้ามเนื้อ',
      cardio: 'คาร์ดิโอ',
      core: 'แกนกลางลำตัว',
      mobility: 'ความยืดหยุ่น',
    },

    equipmentTitle: 'อุปกรณ์',
    equipment: {
      no_equipment: 'ไม่ใช้อุปกรณ์',
      with_equipment: 'ใช้อุปกรณ์',
    },

    durationTitle: 'ระยะเวลา',
    duration: {
      short: 'สั้น',
      medium: 'ปานกลาง',
      long: 'ยาว',
    },

    noResultsTitle: 'ไม่พบโปรแกรมที่ตรงกัน',
    noResultsText: 'ลองเปลี่ยนตัวกรองอย่างน้อยหนึ่งรายการ',
  },
  // th
beginner: {
  modeTitle: 'โหมดผู้เริ่มต้น',
  modeDesc: 'คำอธิบายง่าย ๆ และคำแนะนำแบบรวดเร็วสำหรับผู้ใช้ใหม่',
  glossaryTitle: 'คู่มือสำหรับผู้เริ่มต้น',
  terms: {
    restDay: {
      title: 'วันพัก',
      desc: 'เป็นวันฟื้นฟู ร่างกายของคุณจะได้พักและซ่อมแซมตัวเอง ดังนั้นอย่าข้ามวันพัก'
    },
    warmUp: {
      title: 'วอร์มอัป',
      desc: 'การเคลื่อนไหวเบา ๆ ก่อนออกกำลังกาย เพื่อเตรียมร่างกายและลดความเสี่ยงการบาดเจ็บ'
    },
    cooldown: {
      title: 'คูลดาวน์',
      desc: 'การเคลื่อนไหวเบา ๆ หรือการยืดเหยียดหลังออกกำลังกาย เพื่อช่วยให้ร่างกายฟื้นตัว'
    },
    hiit: {
      title: 'HIIT',
      desc: 'การออกกำลังกายแบบเข้มข้นเป็นช่วง ๆ: ช่วงสั้น ๆ ที่ออกแรงหนักสลับกับการพักสั้น ๆ'
    },
    rep: {
      title: 'ครั้ง',
      desc: 'การทำท่าออกกำลังกายครบหนึ่งครั้ง ตัวอย่าง: สควอต 1 ครั้ง = 1 rep'
    },
    set: {
      title: 'เซต',
      desc: 'กลุ่มของจำนวนครั้ง ตัวอย่าง: สควอต 10 ครั้งต่อเนื่อง = 1 เซต'
    }
  }
},
todayWorkout: {
  title: 'การออกกำลังกายวันนี้',
  fallback: 'การออกกำลังกาย',
  startNow: 'เริ่มเลย',
  restTitle: 'วันนี้เป็นวันฟื้นฟูร่างกาย',
  restText: 'พักสักหน่อย ยืดเหยียดเบา ๆ ดื่มน้ำ และเตรียมพร้อมสำหรับการออกกำลังกายครั้งถัดไป'
},
// th
history: {
  title: 'ประวัติการออกกำลังกาย',
  screenTitle: 'ประวัติการออกกำลังกาย',
  thisWeek: 'สัปดาห์นี้',
  minutes: 'นาที',
  totalWorkouts: 'การออกกำลังกาย',
  empty: 'ยังไม่มีการออกกำลังกายที่เสร็จสิ้น',
  viewAll: 'ดูทั้งหมด',
  filter7: '7 วัน',
  filter30: '30 วัน',
  filterAll: 'ทั้งหมด'
},
achievements: {
  title: 'ความสำเร็จ',
  firstWorkout: 'การออกกำลังกายครั้งแรก',
  tenWorkouts: 'ออกกำลังกาย 10 ครั้ง',
  twentyfiveWorkouts: 'ออกกำลังกาย 25 ครั้ง',
  streak3: 'ต่อเนื่อง 3 วัน',
  streak7: 'ต่อเนื่อง 7 วัน',
  week4: 'ออกกำลังกาย 4 ครั้งในสัปดาห์นี้',
  finishProgram: 'จบ 1 โปรแกรม'
},
challenges: {
  title: 'ชาเลนจ์',
  intro: 'เริ่มชาเลนจ์สั้น ๆ เพื่อรักษาความสม่ำเสมอ',
  start7: 'เริ่มชาเลนจ์ 7 วัน',
  start30: 'เริ่มชาเลนจ์ 30 วัน',
  complete: 'ทำชาเลนจ์สำเร็จแล้ว',
  daysLeft: 'เหลืออีก {{count}} วัน',
  starter7Title: 'ชาเลนจ์เริ่มต้น 7 วัน',
  starter7Desc: 'ออกกำลังกายให้ครบ 5 ครั้งใน 7 วัน',
  consistency30Title: 'ชาเลนจ์ความสม่ำเสมอ 30 วัน',
  consistency30Desc: 'ออกกำลังกายให้ครบ 20 ครั้งใน 30 วัน'
}
};
const id = {
  ...base,
  tabs: {
    main: 'Beranda',             // "Beranda" (Home) phổ biến hơn "Utama" (Main) trong app
    nutrition: 'Nutrisi',        // Dinh dưỡng
    guide: 'Panduan',            // Hướng dẫn
    premium: 'Premium',          // Premium
    settings: 'Pengaturan',      // Cài đặt
    workout: 'Latihan',          // Tập luyện
    more: 'Lainnya',             // Khác/Thêm
    program: 'Program',          // Chương trình
    profile: 'Profil',           // Hồ sơ
    weightChart: 'Grafik Berat', // Biểu đồ cân nặng
  },
  home: {
    title: 'Pilih rencana latihanmu', // Chọn kế hoạch tập luyện của bạn
    subtitle: 'Pilih program dan berlatih setiap hari', // Chọn chương trình và tập mỗi ngày
    program60: 'Bakar Lemak 60 Hari', // Đốt mỡ 60 ngày
    program90: 'Latihan Seluruh Tubuh 90 Hari', // Tập toàn thân 90 ngày
    daysSuffix: '{{count}} hari',     // Ngày
    health_overview: 'Ringkasan Kesehatan', // Tổng quan sức khỏe
    activeTitle: 'Sedang Berjalan',   // Đang diễn ra/In Progress (Dịch thoát ý từ Practicing)
    noActive: 'Tidak ada program yang sedang berjalan.', // Không có chương trình nào đang chạy.
  },
  program: {
    daysPrefix: 'Hari {{day}} • {{weekday}}',
    weekTitle: 'Minggu {{n}}',
    completed: 'Selesai',
    todayWorkout: 'Latihan: {{name}}',
  },
  workouts: {
    rest: 'Pemulihan / Istirahat',
    hiit: 'HIIT Seluruh Tubuh',
    upper: 'Dada - Bahu - Lengan',
    lower: 'Glute - Kaki',
    core: 'Perut & Core',
    pickOne: 'Pilih rencana latihan untuk memulai',
    days: 'Hari',
  },
  // id
  guide: {
    title: 'Cara Menggunakan PulseFit',
    subtitle: 'Ikuti langkah-langkah sederhana ini untuk memulai perjalanan latihan Anda.',

    steps: {
      step1: {
        badge: 'Langkah 1',
        title: 'Masukkan informasi pribadi Anda',
        desc: 'Isi tinggi badan, berat badan, kondisi kesehatan, tujuan, dan informasi dasar lainnya. Aplikasi akan menghitung BMI Anda dan memberikan saran kesehatan agar Anda bisa memulai dengan aman.'
      },
      step2: {
        badge: 'Langkah 2',
        title: 'Pilih program latihan yang sesuai',
        desc: 'Telusuri program latihan yang tersedia dan pilih yang paling sesuai dengan tingkat kebugaran, tujuan, dan preferensi Anda.'
      },
      step3: {
        badge: 'Langkah 3',
        title: 'Pilih hari latihan',
        desc: 'Buka program yang dipilih dan pilih hari latihan yang ingin Anda ikuti. Anda dapat melanjutkan langkah demi langkah sesuai jadwal latihan.'
      },
      step4: {
        badge: 'Langkah 4',
        title: 'Berlatih dengan video',
        desc: 'Ikuti video latihan agar berolahraga dengan benar. Anda dapat memutar ponsel secara horizontal untuk menonton video dalam layar penuh agar pengalaman lebih baik.'
      }
    },

    noteTitle: 'Catatan',
    note: 'Berlatihlah secara konsisten untuk mendapatkan hasil terbaik.'
  },

  video: {
    loading: 'Memuat video...',
    play: 'Mulai latihan',
    error: 'Tidak dapat memutar video. Silakan coba lagi.',
  },
  settings: {
    title: 'Pengaturan',
    language: 'Bahasa',
    choose: 'Pilih bahasa',
  },
  onboard: {
    title: 'Mari kita mulai 👋',
    subtitle: 'Masukkan beberapa detail agar kami dapat menyarankan rencana yang sesuai',
    name: 'Nama lengkap *',
    age: 'Usia *',
    gender: 'Jenis kelamin *',
    gender_male: 'Laki-laki',
    gender_female: 'Perempuan',
    gender_other: 'Lainnya',
    health: 'Kondisi kesehatan',
    height: 'Tinggi badan (cm) *',
    weight: 'Berat badan (kg) *',
    injured_q: 'Apakah ada cedera?',
    injury_note: 'Deskripsi cedera',
    goal: 'Tujuan saat ini *',
    goals: {
      lose_weight: 'Menurunkan berat badan',
      build_muscle: 'Membangun otot',
      maintain: 'Menjaga berat badan',
      recomp: 'Rekomp (bakar lemak + bangun otot)',
      endurance: 'Ketahanan (Endurance)',
      flexibility: 'Fleksibilitas',
    },
    tip_title: 'Tips singkat',
    tip_1:
      'Jika cedera, mulailah dengan latihan berdampak rendah (low-impact) dan tingkatkan secara bertahap.',
    tip_2: 'Perbarui berat badan Anda setiap 3 hari untuk memantau kemajuan.',
    back: 'Kembali',
    next: 'Lanjut',
    finish: 'Selesai',
    saving: 'Menyimpan...',
    bmi: 'IMT', // Indeks Massa Tubuh
    bmi_result_title: 'Ringkasan kesehatan',
    bmi_label_under: 'Kurus (Berat badan kurang)',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Gemuk (Kelebihan berat)',
    bmi_label_obese: 'Obesitas',
    advice_intro: '• IMT Anda: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Fokus pada massa otot tanpa lemak: latihan seluruh tubuh/upper-lower dengan intensitas sedang; tingkatkan beban; protein dan kalori yang cukup.',
    advice_bmi_normal:
      '• Menjaga: kombinasi kekuatan + kardio sedang (2–3 hari/minggu); prioritaskan teknik dan tidur.',
    advice_bmi_over:
      '• Membakar lemak: kardio sedang/HIIT ringan 2–3 hari + kekuatan seluruh tubuh; sedikit defisit kalori.',
    advice_bmi_obese:
      '• Penurunan lemak yang aman: jalan cepat/kardio dampak rendah + kekuatan dasar; pantau detak jantung, tingkatkan intensitas secara bertahap.',
    advice_goal_lose_weight:
      '• Tujuan: Menurunkan berat badan → pantau kalori, protein 1.6–2.2g/kg, tidur 7–8 jam.',
    advice_goal_build_muscle:
      '• Tujuan: Membangun otot → kelebihan beban bertahap 3–5 hari/minggu, protein 1.6–2.2g/kg, sedikit surplus kalori.',
    advice_goal_maintain:
      '• Tujuan: Menjaga → 3 hari/minggu, keseimbangan kekuatan + kardio, timbang berat badan mingguan.',
    advice_goal_recomp:
      '• Tujuan: Rekomp → angkat beban dasar + protein tinggi, sedikit defisit, tidur yang cukup.',
    advice_goal_endurance:
      '• Tujuan: Ketahanan → zona 2 + interval; isi tenaga dengan karbohidrat sebelum latihan.',
    advice_goal_flexibility:
      '• Tujuan: Fleksibilitas → mobilitas harian/ROM 10–20 menit, tambahkan latihan kekuatan ringan.',
    advice_injured:
      '• Catatan cedera: dampak rendah, rentang gerak tanpa nyeri; progres secara bertahap; konsultasikan dengan pelatih/dokter jika perlu.',
    advice_healthnote:
      '• Pantau kondisi kesehatan yang dicatat dan sesuaikan intensitasnya.',
    start_training: 'Mulai latihan',
  },
  weight: {
    prompt_title: 'Perbarui berat badan',
    prompt_desc: 'Masukkan berat badan saat ini (kg)',
    prompt_placeholder: 'misalnya 65.5',
    later: 'Nanti',
    save: 'Simpan',
    chart_title: 'Pelacakan berat badan',
    chart_empty:
      'Belum ada data. Aplikasi akan secara berkala mengingatkan Anda untuk mencatat berat badan.',
  },
  UserProfile: {
    title: 'Profil Pengguna',
    subtitle: 'Masukkan info Anda untuk mendapatkan rekomendasi latihan pribadi',

    name_label: 'Nama lengkap *',
    name_ph: 'misalnya Budi Santoso',

    age_label: 'Usia',
    age_ph: 'misalnya 28',
    gender_label: 'Jenis kelamin',
    gender_male: 'Laki-laki',
    gender_female: 'Perempuan',
    gender_other: 'Lainnya',
    height_label: 'Tinggi badan (cm)',
    height_ph: 'misalnya 170',
    weight_label: 'Berat badan (kg)',
    weight_ph: 'misalnya 65',
    bmi: 'IMT',
    bmi_label_under: 'Kurus',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Gemuk',
    bmi_label_obese: 'Obesitas',
    health_label: 'Status kesehatan',
    health_ph:
      'misalnya Tekanan darah stabil, tidur nyenyak, kembali berlatih...',

    injured_q: 'Ada cedera?',
    injury_label: 'Detail cedera',
    injury_ph:
      'misalnya Nyeri lutut kiri, batasi squat dalam; nyeri bahu saat press...',
    hint_fill_hw: 'Masukkan tinggi & berat badan untuk saran.',
    rec_injured:
      'Rekomendasi: prioritaskan sesi Core/Upper ringan dengan lebih banyak hari istirahat.',
    rec_overweight:
      'Rekomendasi: Rencana bakar lemak (HIIT ringan → sedang) bergantian dengan Lower/Core.',
    rec_general:
      'Rekomendasi: Rencana seluruh tubuh (kekuatan dasar + Core).',
    loading: 'Memuat...',
    save_success_title: 'Tersimpan',
    save_error_title: 'Kesalahan',
    save_error_msg: "Tidak dapat menyimpan data Anda. Silakan coba lagi.",
    btn_delete: 'Hapus',
    btn_save: 'Simpan',
  },
  // id
  dashboard: {
    title: 'Dasbor progres',
    streak: 'Streak',
    thisWeek: 'Minggu ini',
    total: 'Total',
    completedPrograms: 'Selesai',
    lastWorkout: 'Latihan terakhir'
  },
  recommend: {
    title: 'Rekomendasi untuk Anda',
    start: 'Mulai rencana ini'
  },
  nutrition: {
    title: 'Nutrisi',
    subtitle: 'Target harian Anda dipersonalisasi berdasarkan profil dan tujuan Anda saat ini.',
    noProfileTitle: 'Lengkapi profil Anda terlebih dahulu',
    noProfileText: 'Tambahkan tinggi badan, berat badan, dan tujuan Anda untuk mendapatkan rekomendasi kalori, makro, dan hidrasi.',
    targets: 'Target harian',
    calories: 'Kalori',
    water: 'Air',
    macros: 'Pembagian makro',
    protein: 'Protein',
    carbs: 'Karbohidrat',
    fats: 'Lemak',
    sampleMeals: 'Contoh rencana makan',
    tips: 'Tips'
  },
  // id
  // id
  premium: {
    title: 'Upgrade ke Premium',
    removeAds: 'Hapus iklan',
    allPrograms: 'Buka pengalaman penuh',
    active: 'Premium aktif',
    restore: 'Pulihkan pembelian',
    restoreTitle: 'Pulihkan pembelian',
    restoreSuccess: 'Premium berhasil dipulihkan.',
    restoreEmpty: 'Tidak ada pembelian Premium yang ditemukan.',
    errorTitle: 'Pembelian gagal',
    errorText: 'Tidak dapat menyelesaikan pembelian.',
    productUnavailable: 'Produk Premium tidak ditemukan. Silakan periksa pengaturan Play Console / App Store.',
    subUnavailable: 'Langganan bulanan tidak ditemukan. Silakan periksa pengaturan Play Console / App Store.',
    loading: 'Memuat...',

    monthlyTitle: 'Premium Bulanan',
    monthlyDesc: 'Diperpanjang otomatis setiap bulan agar Premium tetap aktif',
    subscribeMonthly: 'Berlangganan bulanan',

    lifetimeTitle: 'Premium Seumur Hidup',
    lifetimeDesc: 'Bayar sekali, nikmati Premium selamanya',
    buyLifetime: 'Beli seumur hidup'
  },
  // id
  filters: {
    all: 'Semua',

    levelTitle: 'Level',
    level: {
      beginner: 'Pemula',
      intermediate: 'Menengah',
      advanced: 'Lanjutan',
    },

    goalTitle: 'Fokus',
    goal: {
      lose_weight: 'Menurunkan berat badan',
      build_muscle: 'Membangun otot',
      cardio: 'Kardio',
      core: 'Core',
      mobility: 'Mobilitas',
    },

    equipmentTitle: 'Peralatan',
    equipment: {
      no_equipment: 'Tanpa peralatan',
      with_equipment: 'Dengan peralatan',
    },

    durationTitle: 'Durasi',
    duration: {
      short: 'Pendek',
      medium: 'Sedang',
      long: 'Panjang',
    },

    noResultsTitle: 'Tidak ada program yang cocok',
    noResultsText: 'Coba ubah satu atau lebih filter.',
  },
  // id
beginner: {
  modeTitle: 'Mode pemula',
  modeDesc: 'Penjelasan sederhana dan panduan cepat untuk pengguna baru.',
  glossaryTitle: 'Panduan pemula',
  terms: {
    restDay: {
      title: 'Hari istirahat',
      desc: 'Ini adalah hari pemulihan. Tubuh Anda beristirahat dan membangun kembali dirinya, jadi jangan dilewatkan.'
    },
    warmUp: {
      title: 'Pemanasan',
      desc: 'Gerakan ringan sebelum latihan untuk mempersiapkan tubuh dan mengurangi risiko cedera.'
    },
    cooldown: {
      title: 'Pendinginan',
      desc: 'Gerakan ringan atau peregangan setelah latihan untuk membantu tubuh pulih.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'Latihan interval intensitas tinggi: ledakan kerja keras singkat diikuti dengan istirahat singkat.'
    },
    rep: {
      title: 'Repetisi',
      desc: 'Satu gerakan lengkap dari sebuah latihan. Contoh: satu squat = satu repetisi.'
    },
    set: {
      title: 'Set',
      desc: 'Sekelompok repetisi. Contoh: 10 squat yang dilakukan bersama = 1 set.'
    }
  }
},
todayWorkout: {
  title: 'Latihan hari ini',
  fallback: 'Latihan',
  startNow: 'Mulai sekarang',
  restTitle: 'Hari ini adalah hari pemulihan',
  restText: 'Beristirahatlah, lakukan peregangan ringan, minum air, dan bersiaplah untuk latihan berikutnya.'
},
// id
history: {
  title: 'Riwayat latihan',
  screenTitle: 'Riwayat latihan',
  thisWeek: 'Minggu ini',
  minutes: 'Menit',
  totalWorkouts: 'Latihan',
  empty: 'Belum ada latihan yang selesai.',
  viewAll: 'Lihat semua',
  filter7: '7 hari',
  filter30: '30 hari',
  filterAll: 'Semua'
},
achievements: {
  title: 'Pencapaian',
  firstWorkout: 'Latihan pertama',
  tenWorkouts: '10 latihan',
  twentyfiveWorkouts: '25 latihan',
  streak3: 'Streak 3 hari',
  streak7: 'Streak 7 hari',
  week4: '4 latihan minggu ini',
  finishProgram: 'Selesaikan 1 program'
},
challenges: {
  title: 'Tantangan',
  intro: 'Mulai tantangan singkat agar tetap konsisten.',
  start7: 'Mulai tantangan 7 hari',
  start30: 'Mulai tantangan 30 hari',
  complete: 'Tantangan selesai',
  daysLeft: '{{count}} hari tersisa',
  starter7Title: 'Tantangan pemula 7 hari',
  starter7Desc: 'Selesaikan 5 latihan dalam 7 hari.',
  consistency30Title: 'Tantangan konsistensi 30 hari',
  consistency30Desc: 'Selesaikan 20 latihan dalam 30 hari.'
}
};
const ms = {
  ...base,
  tabs: {
    main: 'Utama',               // "Utama" là từ chuẩn cho trang chủ (khác với 'Beranda' của Indo)
    nutrition: 'Nutrisi',        // Dinh dưỡng (Hoặc 'Pemakanan')
    guide: 'Panduan',            // Hướng dẫn
    premium: 'Premium',          // Premium
    settings: 'Tetapan',         // "Tetapan" là từ chuẩn cho Cài đặt (khác với 'Pengaturan' của Indo)
    workout: 'Senaman',          // "Senaman" (Workout) tự nhiên hơn 'Latihan' (Training) ở Malaysia
    more: 'Lagi',                // Thêm/Khác
    program: 'Program',          // Chương trình
    profile: 'Profil',           // Hồ sơ
    weightChart: 'Carta Berat',  // Biểu đồ cân nặng
  },
  home: {
    title: 'Pilih pelan senaman anda', // Chọn kế hoạch tập luyện của bạn
    subtitle: 'Pilih program dan berlatih setiap hari', // Chọn chương trình và tập hàng ngày
    program60: 'Bakar Lemak 60 Hari',  // Chương trình đốt mỡ 60 ngày
    program90: 'Seluruh Badan 90 Hari', // Toàn thân 90 ngày ('Badan' dùng phổ biến hơn 'Tubuh' ở MY)
    daysSuffix: '{{count}} hari',      // Ngày
    health_overview: 'Ringkasan Kesihatan', // Tổng quan sức khỏe
    activeTitle: 'Sedang Berjalan',    // Đang diễn ra/In Progress (Dịch thoát ý từ Practicing)
    noActive: 'Tiada program yang sedang berjalan.', // Hiện không có chương trình nào đang chạy.
  },
  program: {
    daysPrefix: 'Hari {{day}} • {{weekday}}',
    weekTitle: 'Minggu {{n}}',
    completed: 'Selesai',
    todayWorkout: 'Senaman: {{name}}',
  },
  workouts: {
    rest: 'Pemulihan / Rehat',
    hiit: 'HIIT Seluruh Badan',
    upper: 'Dada - Bahu - Lengan',
    lower: 'Punggung - Kaki',
    core: 'Perut & Teras', // Core = Teras
    pickOne: 'Pilih pelan senaman untuk bermula',
    days: 'days',
  },
  // ms
  guide: {
    title: 'Cara Menggunakan PulseFit',
    subtitle: 'Ikuti langkah mudah ini untuk memulakan perjalanan senaman anda.',

    steps: {
      step1: {
        badge: 'Langkah 1',
        title: 'Masukkan maklumat peribadi anda',
        desc: 'Isi tinggi, berat, keadaan kesihatan, matlamat dan maklumat asas lain. Aplikasi akan mengira BMI anda dan memberi nasihat kesihatan untuk membantu anda bermula dengan selamat.'
      },
      step2: {
        badge: 'Langkah 2',
        title: 'Pilih program senaman yang sesuai',
        desc: 'Lihat program senaman yang tersedia dan pilih yang paling sesuai dengan tahap kecergasan, matlamat dan pilihan anda.'
      },
      step3: {
        badge: 'Langkah 3',
        title: 'Pilih hari senaman',
        desc: 'Buka program yang dipilih dan pilih hari senaman yang ingin anda ikuti. Anda boleh meneruskan langkah demi langkah mengikut jadual latihan.'
      },
      step4: {
        badge: 'Langkah 4',
        title: 'Bersenam mengikut video',
        desc: 'Ikuti video senaman untuk melakukan latihan dengan betul. Anda boleh memusingkan telefon secara melintang untuk menonton video dalam skrin penuh bagi pengalaman yang lebih baik.'
      }
    },

    noteTitle: 'Nota',
    note: 'Kekalkan latihan secara konsisten untuk mendapatkan hasil yang terbaik.'
  },
  video: {
    loading: 'Memuatkan video...',
    play: 'Mula senaman',
    error: 'Tidak dapat memainkan video. Sila cuba lagi.',
  },
  settings: {
    title: 'Tetapan',
    language: 'Bahasa',
    choose: 'Pilih bahasa',
  },
  onboard: {
    title: 'Mari bermula 👋',
    subtitle: 'Masukkan butiran anda supaya kami dapat mencadangkan pelan yang sesuai',
    name: 'Nama penuh *',
    age: 'Umur *',
    gender: 'Jantina *',
    gender_male: 'Lelaki',
    gender_female: 'Perempuan',
    gender_other: 'Lain-lain',
    health: 'Tahap kesihatan',
    height: 'Tinggi (cm) *',
    weight: 'Berat (kg) *',
    injured_q: 'Ada kecederaan?',
    injury_note: 'Butiran kecederaan',
    goal: 'Matlamat sekarang *',
    goals: {
      lose_weight: 'Turunkan berat badan',
      build_muscle: 'Bina otot',
      maintain: 'Kekalkan berat badan',
      recomp: 'Rekomp (bakar lemak + bina otot)',
      endurance: 'Ketahanan (Endurance)',
      flexibility: 'Kelenturan',
    },
    tip_title: 'Tip pantas',
    tip_1:
      'Jika cedera, mulakan dengan senaman impak rendah dan tingkatkan secara beransur-ansur.',
    tip_2: 'Kemas kini berat badan anda setiap 3 hari untuk memantau kemajuan.',
    back: 'Kembali',
    next: 'Seterusnya',
    finish: 'Selesai',
    saving: 'Menyimpan...',
    bmi: 'BMI',
    bmi_result_title: 'Ringkasan kesihatan',
    bmi_label_under: 'Kurang berat badan',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Berlebihan berat badan',
    bmi_label_obese: 'Obesiti',
    advice_intro: '• BMI anda: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Fokus bina jisim otot: senaman seluruh badan/atas-bawah dengan intensiti sederhana; tambah beban; protein dan kalori mencukupi.',
    advice_bmi_normal:
      '• Kekalkan: gabungan kekuatan + kardio sederhana (2–3 hari/minggu); utamakan teknik dan tidur.',
    advice_bmi_over:
      '• Bakar lemak: kardio sederhana/HIIT ringan 2–3 hari + kekuatan seluruh badan; sedikit defisit kalori.',
    advice_bmi_obese:
      '• Penurunan lemak selamat: jalan laju/kardio impak rendah + kekuatan asas; pantau kadar jantung, tingkatkan intensiti perlahan-lahan.',
    advice_goal_lose_weight:
      '• Matlamat: Turun berat badan → pantau kalori, 1.6–2.2g/kg protein, tidur 7–8 jam.',
    advice_goal_build_muscle:
      '• Matlamat: Bina otot → lebihan beban progresif 3–5 hari/minggu, 1.6–2.2g/kg protein, sedikit lebihan kalori.',
    advice_goal_maintain:
      '• Matlamat: Kekalkan → 3 hari/minggu, keseimbangan kekuatan + kardio, timbang berat setiap minggu.',
    advice_goal_recomp:
      '• Matlamat: Rekomp → latihan bebanan asas + protein tinggi, sedikit defisit, tidur yang cukup.',
    advice_goal_endurance:
      '• Matlamat: Ketahanan → zon 2 + selang masa (intervals); ambil karbohidrat sebelum senaman.',
    advice_goal_flexibility:
      '• Matlamat: Kelenturan → mobiliti harian/ROM 10–20 minit, tambah latihan kekuatan ringan.',
    advice_injured:
      '• Nota kecederaan: impak rendah, julat pergerakan tanpa sakit; kemajuan beransur-ansur; rujuk jurulatih/doktor jika perlu.',
    advice_healthnote:
      '• Pantau tahap kesihatan yang dicatatkan dan selaraskan intensiti senaman.',
    start_training: 'Mula latihan',
  },
  weight: {
    prompt_title: 'Kemas kini berat',
    prompt_desc: 'Masukkan berat badan sekarang (kg)',
    prompt_placeholder: 'cth. 65.5',
    later: 'Nanti',
    save: 'Simpan',
    chart_title: 'Laporan berat badan',
    chart_empty:
      'Tiada data lagi. Aplikasi akan mengingatkan anda untuk merekodkan berat badan secara berkala.',
  },
  UserProfile: {
    title: 'Profil Pengguna',
    subtitle: 'Masukkan maklumat anda untuk cadangan senaman yang diperibadikan',

    name_label: 'Nama penuh *',
    name_ph: 'cth. Ahmad Ali',

    age_label: 'Umur',
    age_ph: 'cth. 28',
    gender_label: 'Jantina',
    gender_male: 'Lelaki',
    gender_female: 'Perempuan',
    gender_other: 'Lain-lain',
    height_label: 'Tinggi (cm)',
    height_ph: 'cth. 170',
    weight_label: 'Berat (kg)',
    weight_ph: 'cth. 65',
    bmi: 'BMI',
    bmi_label_under: 'Kurang berat',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Lebih berat',
    bmi_label_obese: 'Obesiti',
    health_label: 'Status kesihatan',
    health_ph:
      'cth. Tekanan darah stabil, tidur nyenyak, kembali berlatih...',

    injured_q: 'Ada kecederaan?',
    injury_label: 'Butiran kecederaan',
    injury_ph:
      'cth. Sakit lutut kiri, hadkan squat dalam; sakit bahu...',
    hint_fill_hw: 'Masukkan tinggi & berat untuk cadangan.',
    rec_injured:
      'Cadangan: utamakan sesi Teras/Atas yang ringan dengan lebih banyak hari rehat.',
    rec_overweight:
      'Cadangan: Pelan bakar lemak (HIIT ringan → sederhana) berselang-seli dengan Bawah/Teras.',
    rec_general:
      'Cadangan: Pelan seluruh badan (kekuatan asas + Teras).',
    loading: 'Memuatkan...',
    save_success_title: 'Disimpan',
    save_error_title: 'Ralat',
    save_error_msg: "Gagal menyimpan data. Sila cuba lagi.",
    btn_delete: 'Padam',
    btn_save: 'Simpan',
  },
  // ms
  dashboard: {
    title: 'Papan pemantauan kemajuan',
    streak: 'Rentetan',
    thisWeek: 'Minggu ini',
    total: 'Jumlah',
    completedPrograms: 'Selesai',
    lastWorkout: 'Senaman terakhir'
  },
  recommend: {
    title: 'Disyorkan untuk anda',
    start: 'Mulakan pelan ini'
  },
  nutrition: {
    title: 'Pemakanan',
    subtitle: 'Sasaran harian anda diperibadikan berdasarkan profil semasa dan matlamat anda.',
    noProfileTitle: 'Lengkapkan profil anda dahulu',
    noProfileText: 'Tambahkan tinggi, berat dan matlamat anda untuk mendapatkan cadangan kalori, makro dan hidrasi.',
    targets: 'Sasaran harian',
    calories: 'Kalori',
    water: 'Air',
    macros: 'Pembahagian makro',
    protein: 'Protein',
    carbs: 'Karbohidrat',
    fats: 'Lemak',
    sampleMeals: 'Pelan makanan contoh',
    tips: 'Petua'
  },
  // ms
  // ms
  premium: {
    title: 'Naik taraf ke Premium',
    removeAds: 'Buang iklan',
    allPrograms: 'Buka pengalaman penuh',
    active: 'Premium aktif',
    restore: 'Pulihkan pembelian',
    restoreTitle: 'Pulihkan pembelian',
    restoreSuccess: 'Premium berjaya dipulihkan.',
    restoreEmpty: 'Tiada pembelian Premium ditemui.',
    errorTitle: 'Pembelian gagal',
    errorText: 'Tidak dapat melengkapkan pembelian.',
    productUnavailable: 'Produk Premium tidak ditemui. Sila semak tetapan Play Console / App Store.',
    subUnavailable: 'Langganan bulanan tidak ditemui. Sila semak tetapan Play Console / App Store.',
    loading: 'Memuatkan...',

    monthlyTitle: 'Premium Bulanan',
    monthlyDesc: 'Diperbaharui secara automatik setiap bulan untuk mengekalkan Premium aktif',
    subscribeMonthly: 'Langgan bulanan',

    lifetimeTitle: 'Premium Sepanjang Hayat',
    lifetimeDesc: 'Bayar sekali, nikmati Premium selamanya',
    buyLifetime: 'Beli sepanjang hayat'
  },
  // ms
  filters: {
    all: 'Semua',

    levelTitle: 'Tahap',
    level: {
      beginner: 'Permulaan',
      intermediate: 'Pertengahan',
      advanced: 'Lanjutan',
    },

    goalTitle: 'Fokus',
    goal: {
      lose_weight: 'Turun berat badan',
      build_muscle: 'Bina otot',
      cardio: 'Kardio',
      core: 'Teras',
      mobility: 'Mobiliti',
    },

    equipmentTitle: 'Peralatan',
    equipment: {
      no_equipment: 'Tanpa peralatan',
      with_equipment: 'Dengan peralatan',
    },

    durationTitle: 'Tempoh',
    duration: {
      short: 'Pendek',
      medium: 'Sederhana',
      long: 'Panjang',
    },

    noResultsTitle: 'Tiada program yang sepadan',
    noResultsText: 'Cuba ubah satu atau lebih penapis.',
  },
  // ms
beginner: {
  modeTitle: 'Mod pemula',
  modeDesc: 'Penerangan ringkas dan panduan cepat untuk pengguna baharu.',
  glossaryTitle: 'Panduan pemula',
  terms: {
    restDay: {
      title: 'Hari rehat',
      desc: 'Ini ialah hari pemulihan. Badan anda berehat dan membina semula dirinya, jadi jangan abaikannya.'
    },
    warmUp: {
      title: 'Pemanasan',
      desc: 'Pergerakan ringan sebelum bersenam untuk menyediakan badan dan mengurangkan risiko kecederaan.'
    },
    cooldown: {
      title: 'Bertenang',
      desc: 'Pergerakan mudah atau regangan selepas bersenam untuk membantu badan anda pulih.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'Latihan Selang Intensiti Tinggi: tempoh singkat kerja berat diikuti dengan rehat singkat.'
    },
    rep: {
      title: 'Ulangan',
      desc: 'Satu pergerakan penuh bagi sesuatu senaman. Contoh: satu squat = satu ulangan.'
    },
    set: {
      title: 'Set',
      desc: 'Sekumpulan ulangan. Contoh: 10 squat yang dilakukan bersama = 1 set.'
    }
  }
},
todayWorkout: {
  title: 'Senaman hari ini',
  fallback: 'Senaman',
  startNow: 'Mula sekarang',
  restTitle: 'Hari ini ialah hari pemulihan',
  restText: 'Berehatlah, lakukan regangan ringan, minum air dan bersedia untuk senaman anda yang seterusnya.'
},
// ms
history: {
  title: 'Sejarah senaman',
  screenTitle: 'Sejarah senaman',
  thisWeek: 'Minggu ini',
  minutes: 'Minit',
  totalWorkouts: 'Senaman',
  empty: 'Belum ada senaman yang selesai.',
  viewAll: 'Lihat semua',
  filter7: '7 hari',
  filter30: '30 hari',
  filterAll: 'Semua'
},
achievements: {
  title: 'Pencapaian',
  firstWorkout: 'Senaman pertama',
  tenWorkouts: '10 senaman',
  twentyfiveWorkouts: '25 senaman',
  streak3: 'Rentetan 3 hari',
  streak7: 'Rentetan 7 hari',
  week4: '4 senaman minggu ini',
  finishProgram: 'Lengkapkan 1 program'
},
challenges: {
  title: 'Cabaran',
  intro: 'Mulakan cabaran pendek untuk kekal konsisten.',
  start7: 'Mulakan cabaran 7 hari',
  start30: 'Mulakan cabaran 30 hari',
  complete: 'Cabaran selesai',
  daysLeft: '{{count}} hari lagi',
  starter7Title: 'Cabaran permulaan 7 hari',
  starter7Desc: 'Lengkapkan 5 senaman dalam 7 hari.',
  consistency30Title: 'Cabaran konsisten 30 hari',
  consistency30Desc: 'Lengkapkan 20 senaman dalam 30 hari.'
}
};
const fil = {
  ...base,
  tabs: {
    main: 'Home',                // Trong UI Filipino, "Home" tự nhiên hơn "Pangunahin" (nghe quá trang trọng)
    nutrition: 'Nutrisyon',      // Dinh dưỡng
    guide: 'Gabay',              // Hướng dẫn
    premium: 'Premium',          // Giữ nguyên (Từ mượn phổ biến)
    settings: 'Mga Setting',     // Cài đặt
    workout: 'Ehersisyo',        // Tập luyện/Thể dục
    more: 'Iba pa',              // Xem thêm/Khác
    program: 'Programa',         // Chương trình
    profile: 'Profile',          // Hồ sơ (Từ "Propayl" ít dùng trong văn viết UI)
    weightChart: 'Tsart ng Timbang', // Biểu đồ cân nặng
  },
  home: {
    title: 'Piliin ang iyong plano', // Chọn kế hoạch của bạn
    subtitle: 'Pumili ng programa at mag-ensayo araw-araw', // Chọn chương trình và tập luyện hàng ngày
    program60: '60-Araw na Pagsusunog ng Taba', // Đốt mỡ 60 ngày
    program90: '90-Araw para sa Buong Katawan', // 90 ngày cho toàn thân
    daysSuffix: '{{count}} na araw', // Ngày (dùng 'na' để nối số và danh từ)
    health_overview: 'Lagay ng Kalusugan', // Tổng quan/Tình trạng sức khỏe
    activeTitle: 'Kasalukuyang Ginagawa', // Đang thực hiện (Dịch thoát ý từ Practicing)
    noActive: 'Walang kasalukuyang programang ginagawa.', // Hiện không có chương trình nào đang thực hiện.
  },
  program: {
    daysPrefix: 'Araw {{day}} • {{weekday}}',
    weekTitle: 'Linggo {{n}}',
    completed: 'Tapos na',
    todayWorkout: 'Workout: {{name}}',
  },
  workouts: {
    rest: 'Recovery / Pahinga',
    hiit: 'Full-body HIIT',
    upper: 'Chest - Shoulder - Arms',
    lower: 'Glutes - Binti',
    core: 'Abs & Core',
    pickOne: 'Pumili ng lesson plan para makapagsimula',
    days: 'Araw',
  },
  // fil
  guide: {
    title: 'Paano Gamitin ang PulseFit',
    subtitle: 'Sundin ang mga simpleng hakbang na ito para simulan ang iyong workout journey.',

    steps: {
      step1: {
        badge: 'Hakbang 1',
        title: 'Ilagay ang iyong personal na impormasyon',
        desc: 'Ilagay ang iyong taas, timbang, kondisyon sa kalusugan, mga layunin, at iba pang pangunahing impormasyon. Kakalkulahin ng app ang iyong BMI at magbibigay ng payong pangkalusugan upang makatulong sa ligtas na pagsisimula.'
      },
      step2: {
        badge: 'Hakbang 2',
        title: 'Pumili ng angkop na workout program',
        desc: 'Tingnan ang mga available na workout program at piliin ang pinakaangkop sa iyong fitness level, layunin, at kagustuhan.'
      },
      step3: {
        badge: 'Hakbang 3',
        title: 'Piliin ang araw ng workout',
        desc: 'Buksan ang napiling programa at piliin ang araw ng workout na gusto mong sundan. Maaari kang magpatuloy nang paisa-isa ayon sa iskedyul.'
      },
      step4: {
        badge: 'Hakbang 4',
        title: 'Mag-workout gamit ang video',
        desc: 'Sundan ang workout video upang tama ang iyong pag-eehersisyo. Maaari mong i-rotate nang pahiga ang iyong telepono upang mapanood ang video sa full screen para sa mas magandang karanasan.'
      }
    },

    noteTitle: 'Paalala',
    note: 'Panatilihing regular ang iyong pag-eehersisyo upang makuha ang pinakamagandang resulta.'
  },
  video: {
    loading: 'Naglo-load ng video...',
    play: 'Simulan ang workout',
    error: 'Hindi ma-play ang video. Pakisubukan muli.',
  },
  settings: {
    title: 'Mga Setting',
    language: 'Wika',
    choose: 'Pumili ng wika',
  },
  onboard: {
    title: 'Simulan na natin 👋',
    subtitle: 'Maglagay ng ilang detalye para makapag-suggest kami ng angkop na plan',
    name: 'Buong pangalan *',
    age: 'Edad *',
    gender: 'Kasarian *',
    gender_male: 'Lalaki',
    gender_female: 'Babae',
    gender_other: 'Iba pa',
    health: 'Kondisyon ng kalusugan',
    height: 'Height (cm) *',
    weight: 'Weight (kg) *',
    injured_q: 'May injury ka ba?',
    injury_note: 'Deskripsyon ng injury',
    goal: 'Kasalukuyang goal *',
    goals: {
      lose_weight: 'Magbawas ng timbang',
      build_muscle: 'Magpalaki ng muscles',
      maintain: 'I-maintain ang timbang',
      recomp: 'Recomp (bawas taba + dagdag muscle)',
      endurance: 'Endurance',
      flexibility: 'Flexibility',
    },
    tip_title: 'Quick tips',
    tip_1:
      'Kung may injury, magsimula sa low-impact exercises at dahan-dahang dagdagan ang intensity.',
    tip_2: 'I-update ang iyong weight kada 3 araw para ma-track ang progress.',
    back: 'Bumalik',
    next: 'Susunod',
    finish: 'Tapusin',
    saving: 'Sini-save...',
    bmi: 'BMI',
    bmi_result_title: 'Health overview',
    bmi_label_under: 'Underweight',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Overweight',
    bmi_label_obese: 'Obese',
    advice_intro: '• Ang iyong BMI: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Focus sa pag-gain ng lean mass: full-body/upper-lower sa moderate intensity; dagdagan ang load; sapat na protein at calories.',
    advice_bmi_normal:
      '• Maintain: mix ng strength + moderate cardio (2–3 araw/linggo); unahin ang technique at sapat na tulog.',
    advice_bmi_over:
      '• Fat loss: moderate cardio/light HIIT 2–3 araw + full-body strength; konting bawas sa calories.',
    advice_bmi_obese:
      '• Safe fat loss: mabilis na lakad/low-impact cardio + basic strength; bantayan ang heart rate, dahan-dahang dagdagan ang intensity.',
    advice_goal_lose_weight:
      '• Goal: Lose weight → i-track ang calories, 1.6–2.2g/kg protein, 7–8 oras na tulog.',
    advice_goal_build_muscle:
      '• Goal: Build muscle → progressive overload 3–5 araw/linggo, 1.6–2.2g/kg protein, konting dagdag sa calories.',
    advice_goal_maintain:
      '• Goal: Maintain → 3 araw/linggo, balanse sa strength + cardio, mag-timbang linggu-linggo.',
    advice_goal_recomp:
      '• Goal: Recomp → basic lifting + high protein, konting bawas sa calories, matulog nang maayos.',
    advice_goal_endurance:
      '• Goal: Endurance → zone 2 + intervals; kumain ng carbs bago mag-workout.',
    advice_goal_flexibility:
      '• Goal: Flexibility → araw-araw na mobility/ROM 10–20 min, magdagdag ng light strength.',
    advice_injured:
      '• Injury note: low-impact, walang sakit sa ROM; dahan-dahang progress; kumonsulta sa coach o doktor kung kailangan.',
    advice_healthnote:
      '• Bantayan ang mga naitalang health conditions at i-adjust ang intensity ayon dito.',
    start_training: 'Simulan ang training',
  },
  weight: {
    prompt_title: 'I-update ang timbang',
    prompt_desc: 'Ilagay ang iyong kasalukuyang timbang (kg)',
    prompt_placeholder: 'hal. 65.5',
    later: 'Mamaya na',
    save: 'I-save',
    chart_title: 'Weight tracking',
    chart_empty:
      'Wala pang data. Paaalalahanan ka ng app paminsan-minsan na i-log ang iyong weight.',
  },
  UserProfile: {
    title: 'User Profile',
    subtitle: 'Ilagay ang iyong info para sa personalized workout recommendations',

    name_label: 'Buong pangalan *',
    name_ph: 'hal. Juan Dela Cruz',

    age_label: 'Edad',
    age_ph: 'hal. 28',
    gender_label: 'Kasarian',
    gender_male: 'Lalaki',
    gender_female: 'Babae',
    gender_other: 'Iba pa',
    height_label: 'Height (cm)',
    height_ph: 'hal. 170',
    weight_label: 'Weight (kg)',
    weight_ph: 'hal. 65',
    bmi: 'BMI',
    bmi_label_under: 'Underweight',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Overweight',
    bmi_label_obese: 'Obese',
    health_label: 'Health status',
    health_ph:
      'hal. Stable ang blood pressure, maayos ang tulog, nagbabalik sa training...',

    injured_q: 'May mga injury ba?',
    injury_label: 'Detalye ng injury',
    injury_ph:
      'hal. Masakit ang kaliwang tuhod, iwas sa deep squats; masakit ang bahagi của balikat...',
    hint_fill_hw: 'Ilagay ang height & weight para sa mga suggestion.',
    rec_injured:
      'Recommendation: unahin ang light CORE/Upper sessions na may mas maraming rest days.',
    rec_overweight:
      'Recommendation: Fat-loss plan (light → moderate HIIT) na salit-salit sa Lower/Core.',
    rec_general:
      'Recommendation: Full-body plan (foundational strength + Core).',
    loading: 'Naglo-load...',
    save_success_title: 'Na-save na',
    save_error_title: 'Error',
    save_error_msg: "Hindi ma-save ang iyong data. Pakisubukan muli.",
    btn_delete: 'I-delete',
    btn_save: 'I-save',
  },
  // fil
  dashboard: {
    title: 'Dashboard ng progreso',
    streak: 'Sunod-sunod na araw',
    thisWeek: 'Ngayong linggo',
    total: 'Kabuuan',
    completedPrograms: 'Natapos',
    lastWorkout: 'Huling workout'
  },
  recommend: {
    title: 'Inirerekomenda para sa iyo',
    start: 'Simulan ang planong ito'
  },
  nutrition: {
    title: 'Nutrisyon',
    subtitle: 'Ang iyong pang-araw-araw na target ay iniangkop batay sa iyong kasalukuyang profile at layunin.',
    noProfileTitle: 'Kumpletuhin muna ang iyong profile',
    noProfileText: 'Idagdag ang iyong taas, timbang, at layunin upang makakuha ng rekomendasyon sa calories, macro, at hydration.',
    targets: 'Pang-araw-araw na target',
    calories: 'Calories',
    water: 'Tubig',
    macros: 'Hati ng macro',
    protein: 'Protein',
    carbs: 'Carbs',
    fats: 'Taba',
    sampleMeals: 'Halimbawang meal plan',
    tips: 'Mga tip'
  },
  // fil
  // fil
  premium: {
    title: 'Mag-upgrade sa Premium',
    removeAds: 'Alisin ang mga ad',
    allPrograms: 'I-unlock ang buong karanasan',
    active: 'Aktibo ang Premium',
    restore: 'I-restore ang mga binili',
    restoreTitle: 'I-restore ang mga binili',
    restoreSuccess: 'Matagumpay na na-restore ang Premium.',
    restoreEmpty: 'Walang nakitang Premium purchase.',
    errorTitle: 'Nabigo ang pagbili',
    errorText: 'Hindi makumpleto ang pagbili.',
    productUnavailable: 'Hindi nakita ang Premium product. Pakisuri ang setup ng Play Console / App Store.',
    subUnavailable: 'Hindi nakita ang buwanang subscription. Pakisuri ang setup ng Play Console / App Store.',
    loading: 'Naglo-load...',

    monthlyTitle: 'Buwanang Premium',
    monthlyDesc: 'Awtomatikong nagre-renew bawat buwan para manatiling aktibo ang Premium',
    subscribeMonthly: 'Mag-subscribe buwan-buwan',

    lifetimeTitle: 'Habambuhay na Premium',
    lifetimeDesc: 'Isang bayad lang, Premium habambuhay',
    buyLifetime: 'Bilhin habambuhay'
  },
  // fil
  filters: {
    all: 'Lahat',

    levelTitle: 'Antas',
    level: {
      beginner: 'Baguhan',
      intermediate: 'Katamtaman',
      advanced: 'Advanced',
    },

    goalTitle: 'Pokús',
    goal: {
      lose_weight: 'Magbawas ng timbang',
      build_muscle: 'Magpalaki ng kalamnan',
      cardio: 'Cardio',
      core: 'Core',
      mobility: 'Mobility',
    },

    equipmentTitle: 'Kagamitan',
    equipment: {
      no_equipment: 'Walang kagamitan',
      with_equipment: 'May kagamitan',
    },

    durationTitle: 'Tagal',
    duration: {
      short: 'Maikli',
      medium: 'Katamtaman',
      long: 'Mahaba',
    },

    noResultsTitle: 'Walang katugmang programa',
    noResultsText: 'Subukang baguhin ang isa o higit pang filter.',
  },
  // fil
beginner: {
  modeTitle: 'Beginner mode',
  modeDesc: 'Mga simpleng paliwanag at mabilis na gabay para sa mga bagong user.',
  glossaryTitle: 'Gabay para sa baguhan',
  terms: {
    restDay: {
      title: 'Araw ng pahinga',
      desc: 'Ito ay araw ng recovery. Nagpapahinga at muling bumubuo ang iyong katawan, kaya huwag itong laktawan.'
    },
    warmUp: {
      title: 'Warm-up',
      desc: 'Magaan na galaw bago mag-ehersisyo upang ihanda ang katawan at mabawasan ang panganib ng injury.'
    },
    cooldown: {
      title: 'Cooldown',
      desc: 'Magaan na galaw o stretching pagkatapos mag-ehersisyo upang matulungan ang katawan na makabawi.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'High-Intensity Interval Training: maiikling bugso ng matinding trabaho na sinusundan ng maikling pahinga.'
    },
    rep: {
      title: 'Rep',
      desc: 'Isang kumpletong galaw ng ehersisyo. Halimbawa: isang squat = isang rep.'
    },
    set: {
      title: 'Set',
      desc: 'Isang grupo ng reps. Halimbawa: 10 squat na ginawa nang magkakasunod = 1 set.'
    }
  }
},
todayWorkout: {
  title: 'Workout ngayong araw',
  fallback: 'Workout',
  startNow: 'Simulan ngayon',
  restTitle: 'Ngayong araw ay araw ng recovery',
  restText: 'Magpahinga muna, mag-stretch nang marahan, uminom ng tubig, at maghanda para sa susunod mong workout.'
},
// fil
history: {
  title: 'Kasaysayan ng workout',
  screenTitle: 'Kasaysayan ng workout',
  thisWeek: 'Ngayong linggo',
  minutes: 'Minuto',
  totalWorkouts: 'Mga workout',
  empty: 'Wala pang natatapos na workout.',
  viewAll: 'Tingnan lahat',
  filter7: '7 araw',
  filter30: '30 araw',
  filterAll: 'Lahat'
},
achievements: {
  title: 'Pencapaian',
  firstWorkout: 'Senaman pertama',
  tenWorkouts: '10 senaman',
  twentyfiveWorkouts: '25 senaman',
  streak3: 'Rentetan 3 hari',
  streak7: 'Rentetan 7 hari',
  week4: '4 senaman minggu ini',
  finishProgram: 'Lengkapkan 1 program'
},
challenges: {
  title: 'Cabaran',
  intro: 'Mulakan cabaran pendek untuk kekal konsisten.',
  start7: 'Mulakan cabaran 7 hari',
  start30: 'Mulakan cabaran 30 hari',
  complete: 'Cabaran selesai',
  daysLeft: '{{count}} hari lagi',
  starter7Title: 'Cabaran permulaan 7 hari',
  starter7Desc: 'Lengkapkan 5 senaman dalam 7 hari.',
  consistency30Title: 'Cabaran konsisten 30 hari',
  consistency30Desc: 'Lengkapkan 20 senaman dalam 30 hari.'
}
};
const pt = {
  ...base,
  tabs: {
    main: 'Inicio',             // Trang chủ (Phổ biến nhất)
    nutrition: 'Nutrición',     // Dinh dưỡng
    guide: 'Guía',              // Hướng dẫn
    premium: 'Premium',         // Premium
    settings: 'Ajustes',        // Cài đặt (Hoặc 'Configuración')
    workout: 'Entrenamiento',   // Tập luyện
    more: 'Más',                // Thêm/Khác
    program: 'Programa',        // Chương trình
    profile: 'Perfil',          // Hồ sơ
    weightChart: 'Gráfico de peso', // Biểu đồ cân nặng
  },
  home: {
    title: 'Elige tu plan de entrenamiento', // Chọn kế hoạch tập luyện
    subtitle: 'Elige un programa y entrena a diario', // Chọn chương trình và tập mỗi ngày
    program60: 'Quema de grasa en 60 días', // Đốt mỡ trong 60 ngày
    program90: 'Cuerpo completo en 90 días', // Toàn thân trong 90 ngày
    daysSuffix: '{{count}} días',   // Ngày
    health_overview: 'Resumen de salud', // Tổng quan sức khỏe
    activeTitle: 'En curso',        // Đang diễn ra/In Progress (Dịch thoát ý từ Practicing)
    noActive: 'No hay ningún programa activo actualmente.', // Hiện không có chương trình nào đang hoạt động.
  },
  program: {
    daysPrefix: 'Día {{day}} • {{weekday}}',
    weekTitle: 'Semana {{n}}',
    completed: 'Completado',
    todayWorkout: 'Entrenamiento: {{name}}',
  },
  workouts: {
    rest: 'Recuperación / Descanso',
    hiit: 'HIIT de cuerpo completo',
    upper: 'Pecho - Hombros - Brazos',
    lower: 'Glúteos - Piernas',
    core: 'Abdominales y Core',
    pickOne: 'Elige un plan para comenzar',
    days: 'Dia',
  },
  // pt
  guide: {
    title: 'Como usar o PulseFit',
    subtitle: 'Siga estes passos simples para começar sua jornada de treino.',

    steps: {
      step1: {
        badge: 'Passo 1',
        title: 'Insira suas informações pessoais',
        desc: 'Preencha sua altura, peso, condição de saúde, objetivos e outras informações básicas. O aplicativo calculará seu IMC e fornecerá orientações de saúde para ajudá-lo a começar com segurança.'
      },
      step2: {
        badge: 'Passo 2',
        title: 'Escolha um programa de treino adequado',
        desc: 'Veja os programas disponíveis e escolha o que melhor se adapta ao seu nível de condicionamento, objetivos e preferências.'
      },
      step3: {
        badge: 'Passo 3',
        title: 'Escolha o dia do treino',
        desc: 'Abra o programa selecionado e escolha o dia de treino que deseja seguir. Você pode avançar passo a passo de acordo com o cronograma.'
      },
      step4: {
        badge: 'Passo 4',
        title: 'Treine com o vídeo',
        desc: 'Siga o vídeo de treino para se exercitar corretamente. Você pode girar o celular na horizontal para assistir ao vídeo em tela cheia e ter uma experiência melhor.'
      }
    },

    noteTitle: 'Observação',
    note: 'Mantenha a consistência nos treinos para alcançar os melhores resultados.'
  },
  video: {
    loading: 'Cargando video...',
    play: 'Iniciar entrenamiento',
    error: 'No se pudo reproducir el video. Inténtalo de nuevo.',
  },
  settings: {
    title: 'Ajustes', // Hoặc 'Configuración'
    language: 'Idioma',
    choose: 'Elegir idioma',
  },
  onboard: {
    title: '¡Comencemos! 👋',
    subtitle: 'Ingresa algunos datos để que podamos sugerirte un plan adecuado',
    name: 'Nombre completo *',
    age: 'Edad *',
    gender: 'Género *',
    gender_male: 'Masculino',
    gender_female: 'Femenino',
    gender_other: 'Otro',
    health: 'Condición de salud',
    height: 'Altura (cm) *',
    weight: 'Peso (kg) *',
    injured_q: '¿Tienes alguna lesión?',
    injury_note: 'Descripción de la lesión',
    goal: 'Objetivo actual *',
    goals: {
      lose_weight: 'Perder peso',
      build_muscle: 'Ganar músculo',
      maintain: 'Mantener peso',
      recomp: 'Recomposición (perder grasa + ganar músculo)',
      endurance: 'Resistencia',
      flexibility: 'Flexibilidad',
    },
    tip_title: 'Consejos rápidos',
    tip_1:
      'Si tienes una lesión, comienza con ejercicios de bajo impacto y aumenta gradualmente.',
    tip_2: 'Actualiza tu peso cada 3 días para seguir tu progreso.',
    back: 'Atrás',
    next: 'Siguiente',
    finish: 'Terminar',
    saving: 'Guardando...',
    bmi: 'IMC', // Índice de Masa Corporal
    bmi_result_title: 'Resumen de salud',
    bmi_label_under: 'Bajo peso',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Sobrepeso',
    bmi_label_obese: 'Obesidad',
    advice_intro: '• Tu IMC: {{bmi}} ({{label}}).',
    advice_bmi_under:
      '• Foco en ganar masa magra: entrenamiento de cuerpo completo/superior-inferior a intensidad moderada; aumentar cargas; proteína y calorías adecuadas.',
    advice_bmi_normal:
      '• Mantener: mezcla fuerza + cardio moderado (2–3 días/sem); prioriza técnica y sueño.',
    advice_bmi_over:
      '• Pérdida de grasa: cardio moderado/HIIT ligero 2–3 días + fuerza de cuerpo completo; ligero déficit calórico.',
    advice_bmi_obese:
      '• Pérdida segura: caminata rápida/cardio de bajo impacto + fuerza básica; monitorear FC, aumentar intensidad gradualmente.',
    advice_goal_lose_weight:
      '• Objetivo: Perder peso → contar calorías, 1.6–2.2g/kg de proteína, 7–8h de sueño.',
    advice_goal_build_muscle:
      '• Objetivo: Ganar músculo → sobrecarga progresiva 3–5 días/sem, 1.6–2.2g/kg de proteína, ligero superávit.',
    advice_goal_maintain:
      '• Objetivo: Mantener → 3 días/sem, equilibrio fuerza + cardio, pesarse semanalmente.',
    advice_goal_recomp:
      '• Objetivo: Recomp → pesas básico + alta proteína, ligero déficit, dormir bien.',
    advice_goal_endurance:
      '• Objetivo: Resistencia → zona 2 + intervalos; carbohidratos antes de entrenar.',
    advice_goal_flexibility:
      '• Objetivo: Flexibilidad → movilidad diaria/ROM 10–20 min, añadir fuerza ligera.',
    advice_injured:
      '• Nota sobre lesión: bajo impacto, ROM sin dolor; progreso gradual; consulta a un entrenador/médico si es necesario.',
    advice_healthnote:
      '• Monitorea las condiciones de salud anotadas y ajusta la intensidad en consecuencia.',
    start_training: 'Empezar a entrenar',
  },
  weight: {
    prompt_title: 'Actualizar peso',
    prompt_desc: 'Ingresa tu peso actual (kg)',
    prompt_placeholder: 'ej. 65.5',
    later: 'Más tarde',
    save: 'Guardar',
    chart_title: 'Seguimiento de peso',
    chart_empty:
      'Aún no hay datos. La app te recordará periódicamente registrar tu peso.',
  },
  UserProfile: {
    title: 'Perfil de Usuario',
    subtitle: 'Ingresa tu información para recibir recomendaciones personalizadas',

    name_label: 'Nombre completo *',
    name_ph: 'ej. Juan Pérez',

    age_label: 'Edad',
    age_ph: 'ej. 28',
    gender_label: 'Género',
    gender_male: 'Masculino',
    gender_female: 'Femenino',
    gender_other: 'Otro',
    height_label: 'Altura (cm)',
    height_ph: 'ej. 170',
    weight_label: 'Peso (kg)',
    weight_ph: 'ej. 65',
    bmi: 'IMC',
    bmi_label_under: 'Bajo peso',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Sobrepeso',
    bmi_label_obese: 'Obesidad',
    health_label: 'Estado de salud',
    health_ph:
      'ej. Presión estable, buen sueño, retomando entrenamientos...',

    injured_q: '¿Tienes lesiones?',
    injury_label: 'Detalles de la lesión',
    injury_ph:
      'ej. Dolor en rodilla izquierda, evitar sentadillas profundas; hombro...',
    hint_fill_hw: 'Ingresa altura y peso para obtener sugerencias.',
    rec_injured:
      'Recomendación: prioriza sesiones ligeras de CORE/Superior con más días de descanso.',
    rec_overweight:
      'Recomendación: Plan de pérdida de grasa (HIIT ligero → moderado) alternando con Inferior/Core.',
    rec_general:
      'Recomendación: Plan de cuerpo completo (fuerza básica + Core).',
    loading: 'Cargando...',
    save_success_title: 'Guardado',
    save_error_title: 'Error',
    save_error_msg: "No se pudieron guardar tus datos. Inténtalo de nuevo.",
    btn_delete: 'Eliminar',
    btn_save: 'Guardar',
  },
  // pt
  dashboard: {
    title: 'Painel de progresso',
    streak: 'Sequência',
    thisWeek: 'Esta semana',
    total: 'Total',
    completedPrograms: 'Concluídos',
    lastWorkout: 'Último treino'
  },
  recommend: {
    title: 'Recomendado para você',
    start: 'Começar este plano'
  },
  nutrition: {
    title: 'Nutrição',
    subtitle: 'Suas metas diárias são personalizadas com base no seu perfil atual e objetivo.',
    noProfileTitle: 'Complete seu perfil primeiro',
    noProfileText: 'Adicione sua altura, peso e objetivo para receber recomendações de calorias, macros e hidratação.',
    targets: 'Metas diárias',
    calories: 'Calorias',
    water: 'Água',
    macros: 'Divisão de macros',
    protein: 'Proteína',
    carbs: 'Carboidratos',
    fats: 'Gorduras',
    sampleMeals: 'Plano alimentar de exemplo',
    tips: 'Dicas'
  },
  // pt
  // pt
  premium: {
    title: 'Atualizar para Premium',
    removeAds: 'Remover anúncios',
    allPrograms: 'Desbloquear a experiência completa',
    active: 'Premium está ativo',
    restore: 'Restaurar compras',
    restoreTitle: 'Restaurar compras',
    restoreSuccess: 'Premium restaurado com sucesso.',
    restoreEmpty: 'Nenhuma compra Premium encontrada.',
    errorTitle: 'Falha na compra',
    errorText: 'Não foi possível concluir a compra.',
    productUnavailable: 'Produto Premium não encontrado. Verifique a configuração do Play Console / App Store.',
    subUnavailable: 'Assinatura mensal não encontrada. Verifique a configuração do Play Console / App Store.',
    loading: 'Carregando...',

    monthlyTitle: 'Premium mensal',
    monthlyDesc: 'Renovação automática todos os meses para manter o Premium ativo',
    subscribeMonthly: 'Assinar mensalmente',

    lifetimeTitle: 'Premium vitalício',
    lifetimeDesc: 'Pagamento único, mantenha o Premium para sempre',
    buyLifetime: 'Comprar vitalício'
  },
  // pt
filters: {
  all: 'Todos',

  levelTitle: 'Nível',
  level: {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  },

  goalTitle: 'Foco',
  goal: {
    lose_weight: 'Perder peso',
    build_muscle: 'Ganhar massa muscular',
    cardio: 'Cardio',
    core: 'Core',
    mobility: 'Mobilidade',
  },

  equipmentTitle: 'Equipamento',
  equipment: {
    no_equipment: 'Sem equipamento',
    with_equipment: 'Com equipamento',
  },

  durationTitle: 'Duração',
  duration: {
    short: 'Curta',
    medium: 'Média',
    long: 'Longa',
  },

  noResultsTitle: 'Nenhum programa correspondente',
  noResultsText: 'Tente alterar um ou mais filtros.',
},
  // pt
beginner: {
  modeTitle: 'Modo iniciante',
  modeDesc: 'Explicações simples e orientação rápida para novos usuários.',
  glossaryTitle: 'Guia para iniciantes',
  terms: {
    restDay: {
      title: 'Dia de descanso',
      desc: 'É um dia de recuperação. Seu corpo descansa e se reconstrói, então não pule esse dia.'
    },
    warmUp: {
      title: 'Aquecimento',
      desc: 'Movimentos leves antes do treino para preparar o corpo e reduzir o risco de lesões.'
    },
    cooldown: {
      title: 'Desaquecimento',
      desc: 'Movimentos leves ou alongamentos após o treino para ajudar o corpo a se recuperar.'
    },
    hiit: {
      title: 'HIIT',
      desc: 'Treinamento intervalado de alta intensidade: curtos períodos de esforço intenso seguidos de curtos descansos.'
    },
    rep: {
      title: 'Repetição',
      desc: 'Um movimento completo de um exercício. Exemplo: um agachamento = uma repetição.'
    },
    set: {
      title: 'Série',
      desc: 'Um grupo de repetições. Exemplo: 10 agachamentos feitos juntos = 1 série.'
    }
  }
},
todayWorkout: {
  title: 'Treino de hoje',
  fallback: 'Treino',
  startNow: 'Começar agora',
  restTitle: 'Hoje é um dia de recuperação',
  restText: 'Faça uma pausa, alongue-se suavemente, beba água e prepare-se para o seu próximo treino.'
},
// pt
history: {
  title: 'Histórico de treinos',
  screenTitle: 'Histórico de treinos',
  thisWeek: 'Esta semana',
  minutes: 'Minutos',
  totalWorkouts: 'Treinos',
  empty: 'Ainda não há treinos concluídos.',
  viewAll: 'Ver tudo',
  filter7: '7 dias',
  filter30: '30 dias',
  filterAll: 'Todos'
},
achievements: {
  title: 'Conquistas',
  firstWorkout: 'Primeiro treino',
  tenWorkouts: '10 treinos',
  twentyfiveWorkouts: '25 treinos',
  streak3: 'Sequência de 3 dias',
  streak7: 'Sequência de 7 dias',
  week4: '4 treinos esta semana',
  finishProgram: 'Concluir 1 programa'
},
challenges: {
  title: 'Desafios',
  intro: 'Comece um desafio curto para manter a consistência.',
  start7: 'Começar desafio de 7 dias',
  start30: 'Começar desafio de 30 dias',
  complete: 'Desafio concluído',
  daysLeft: 'Faltam {{count}} dia(s)',
  starter7Title: 'Desafio inicial de 7 dias',
  starter7Desc: 'Conclua 5 treinos em 7 dias.',
  consistency30Title: 'Desafio de consistência de 30 dias',
  consistency30Desc: 'Conclua 20 treinos em 30 dias.'
}
};

const resources = {
  vi: { translation: vi },
  en: { translation: base },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  ru: { translation: ru },
  ar: { translation: ar },
  hi: { translation: hi },
  th: { translation: th },
  id: { translation: id },
  ms: { translation: ms },
  fil: { translation: fil },
  pt: { translation: pt },
};

function detectLang(): string {
  try {
    const loc = Intl?.DateTimeFormat?.().resolvedOptions?.().locale || 'en';
    return (loc.slice(0, 2) || 'en') as string;
  } catch {
    return 'en';
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: detectLang(),
  fallbackLng: 'en',
  resources,
  interpolation: { escapeValue: false },
});

// Load override ngôn ngữ đã lưu
(async () => {
  try {
    const saved = await AsyncStorage.getItem(LANG_KEY);
    if (saved) i18n.changeLanguage(saved);
  } catch { }
})();

export { LANG_KEY };
export default i18n;
