// FILE: src/data/programs.ts

export type WorkoutSessionKey = 'rest' | 'hiit' | 'upper' | 'lower' | 'core';

export type PlanItem =
  | { type: 'rest' }
  | {
      type: 'workout';
      sessionKey: Exclude<WorkoutSessionKey, 'rest'>;
      name: string;        // tên bài tập hiển thị
      url: string;         // URL mở bằng WebView
      durationMin: number; // thời lượng (phút)
    };

export interface WorkoutDay {
  id: string;
  dayNumber: number;     // 1..N theo đúng thứ tự bạn nhập
  weekdayIndex: number;  // 0=Mon..6=Sun (xoay vòng theo vị trí)
  sessionKey: WorkoutSessionKey;

  // mới:
  isRest: boolean;
  name?: string;
  webUrl?: string;
  durationMin?: number;

  // giữ tương thích cũ (trỏ về webUrl):
  videoUrl: string;
}

export interface WorkoutProgram {
  id: string;
  titleKey: string;
  durationDays: number;  // = plan.length để tương thích UI cũ
  iconColor: string;
  icon: any;             // require(image)
  plan: PlanItem[];      // <-- danh sách ngày bạn nhập, không lặp
}

// Helper tạo item workout nhanh
const W = (
  sessionKey: Exclude<WorkoutSessionKey, 'rest'>,
  name: string,
  url: string,
  durationMin: number
): PlanItem => ({ type: 'workout', sessionKey, name, url, durationMin });

// ====== Ví dụ kế hoạch bạn nhập (không lặp tuần) ======
// Bạn có thể thêm/bớt, app sẽ hiển thị đúng số lượng.
const Max30: PlanItem[] = [
  // Week 1 (Day 1–7)
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 1 (Mon)
  W('upper', 'Tabata Power',              'mindex2.html',  25), // Day 2 (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 3 (Wed)
  W('core',  'Tabata Power',              'mindex2.html',  15), // Day 4 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 5 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 6 (Sat)
  { type: 'rest' },                                                // Day 7 (Sun) - Off

  // Week 2 (Day 8–14) – giống tuần 1
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 8  (Mon)
  W('upper', 'Tabata Power',              'mindex2.html',  25), // Day 9  (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 10 (Wed)
  W('core',  'Tabata Power',              'mindex2.html',  15), // Day 11 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 12 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 13 (Sat)
  { type: 'rest' },                                                // Day 14 (Sun) - Off

  // Week 3 (Day 15–21)
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 15 (Mon)
  W('upper', 'Tabata Strength',           'mindex4.html',  25), // Day 16 (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 17 (Wed)
  W('core',  'Tabata Strength',           'mindex4.html',  15), // Day 18 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 19 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 20 (Sat)
  { type: 'rest' },                                                // Day 21 (Sun) - Off

  // Week 4 (Day 22–28)
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 22 (Mon)
  W('upper', 'Tabata Strength',           'mindex4.html',  25), // Day 23 (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 24 (Wed)
  W('core',  'Tabata Strength',           'mindex4.html',  15), // Day 25 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 26 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 27 (Sat)
  { type: 'rest' },                                                // Day 28 (Sun) - Off

  // Week 5 (Day 29–35) – bắt đầu Max Out
  W('hiit',  'Max Out Cardio',            'mindex6.html',  20), // Day 29 (Mon)
  W('upper', 'Max Out Power',             'mindex7.html',  25), // Day 30 (Tue)
  W('lower', 'Max Out Sweet',             'mindex8.html',  25), // Day 31 (Wed)
  W('core',  'Max Out Strength',          'mindex9.html',  15), // Day 32 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 33 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 34 (Sat)
  { type: 'rest' },                                                // Day 35 (Sun) - Off

  // Week 6 (Day 36–42)
  W('hiit',  'Max Out Cardio',            'mindex6.html',  20), // Day 36 (Mon)
  W('upper', 'Max Out Power',             'mindex7.html',  25), // Day 37 (Tue)
  W('lower', 'Max Out Sweet',             'mindex8.html',  25), // Day 38 (Wed)
  W('core',  'Max Out Strength',          'mindex9.html',  15), // Day 39 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 40 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 41 (Sat)
  { type: 'rest' },                                                // Day 42 (Sun) - Off

  // Week 7 (Day 43–49)
  W('hiit',  'Max Out Cardio',            'mindex6.html',  20), // Day 43 (Mon)
  W('upper', 'Max Out Power',             'mindex7.html',  25), // Day 44 (Tue)
  W('lower', 'Max Out Sweet',             'mindex8.html',  25), // Day 45 (Wed)
  W('core',  'Max Out Strength',          'mindex9.html',  15), // Day 46 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 47 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 48 (Sat)
  { type: 'rest' },                                                // Day 49 (Sun) - Off

  // Week 8 (Day 50–56)
  W('hiit',  'Max Out Cardio',            'mindex6.html',  20), // Day 50 (Mon)
  W('upper', 'Max Out Power',             'mindex7.html',  25), // Day 51 (Tue)
  W('lower', 'Max Out Sweet',             'mindex8.html',  25), // Day 52 (Wed)
  W('core',  'Max Out Strength',          'mindex9.html',  15), // Day 53 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 54 (Fri)
  W('lower', 'Cardio Challenge',          'mindex1.html', 20), // Day 55 (Sat)
  { type: 'rest' },                                                // Day 56 (Sun) - Off

  // Week 9 (Day 57–63) – quay lại pattern Cardio/Tabata/Sweet
  W('hiit',  'Cardio Challenge',          'mindex1.html',  20), // Day 57 (Mon)
  W('upper', 'Tabata Power',              'mindex2.html',  25), // Day 58 (Tue)
  W('lower', 'Sweet Intervals',           'mindex3.html',  25), // Day 59 (Wed)
  W('core',  'Tabata Power',              'mindex2.html',  15), // Day 60 (Thu)
  W('hiit',  'Friday Fight Round 2',      'mindex10.html', 18), // Day 61 (Fri)
  W('lower', 'Pulse',                     'mindex11.html', 20), // Day 62 (Sat)
  { type: 'rest' },                                                // Day 63 (Sun) - Off

  // Week 10 (Day 64–70) – thêm Ab Attack 10
  W('hiit',  'Cardio Challenge & Ab Attack 10', 'mindex17.html', 20), // Day 64 (Mon)
  W('upper', 'Tabata Power',                    'mindex2.html',  25), // Day 65 (Tue)
  W('lower', 'Sweet Intervals & Ab Attack 10',  'mindex18.html', 25), // Day 66 (Wed)
  W('core',  'Tabata Power',                    'mindex2.html',  15), // Day 67 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 68 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 69 (Sat)
  { type: 'rest' },                                                        // Day 70 (Sun) - Off

  // Week 11 (Day 71–77)
  W('hiit',  'Cardio Challenge & Max Out ABS',  'mindex21.html', 20), // Day 71 (Mon)
  W('upper', 'Tabata Strength',                 'mindex4.html',  25), // Day 72 (Tue)
  W('lower', 'Sweet Intervals & 360 ABS',       'mindex22.html', 25), // Day 73 (Wed)
  W('core',  'Tabata Strength',                 'mindex4.html',  15), // Day 74 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 75 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 76 (Sat)
  { type: 'rest' },                                                        // Day 77 (Sun) - Off

  // Week 12 (Day 78–84)
  W('hiit',  'Cardio Challenge & 360 ABS',      'mindex23.html', 20), // Day 78 (Mon)
  W('upper', 'Tabata Strength',                 'mindex4.html',  25), // Day 79 (Tue)
  W('lower', 'Sweet Intervals & Max Out ABS',   'mindex24.html', 25), // Day 80 (Wed)
  W('core',  'Tabata Strength',                 'mindex4.html',  15), // Day 81 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 82 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 83 (Sat)
  { type: 'rest' },                                                        // Day 84 (Sun) - Off

  // Week 13 (Day 85–91) – Max Out phase 4
  W('hiit',  'Max Out Cardio',                  'mindex6.html',  20), // Day 85 (Mon)
  W('upper', 'Max Out Power',                   'mindex7.html',  25), // Day 86 (Tue)
  W('lower', 'Max Out Sweet',                   'mindex8.html',  25), // Day 87 (Wed)
  W('core',  'Max Out Strength',                'mindex9.html',  15), // Day 88 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 89 (Fri)
  W('lower', 'Pulse',                           'mindex11.html', 20), // Day 90 (Sat)
  { type: 'rest' },                                                        // Day 91 (Sun) - Off

  // Week 14 (Day 92–98)
  W('hiit',  'Max Out Cardio & Ab Attack 10',   'mindex25.html', 20), // Day 92 (Mon)
  W('upper', 'Max Out Power',                   'mindex7.html',  25), // Day 93 (Tue)
  W('lower', 'Max Out Sweet & Ab Attack 10',    'mindex26.html', 25), // Day 94 (Wed)
  W('core',  'Max Out Strength',                'mindex9.html',  15), // Day 95 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 96 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 97 (Sat)
  { type: 'rest' },                                                        // Day 98 (Sun) - Off

  // Week 15 (Day 99–105)
  W('hiit',  'Max Out Cardio & Max Out ABS',    'mindex27.html', 20), // Day 99 (Mon)
  W('upper', 'Max Out Power',                   'mindex7.html',  25), // Day 100 (Tue)
  W('lower', 'Max Out Sweet & 360 ABS',         'mindex27.html', 25), // Day 101 (Wed)
  W('core',  'Max Out Strength',                'mindex9.html',  15), // Day 102 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 103 (Fri)
  W('lower', 'Pulse & Ab Attack 10',            'mindex19.html', 20), // Day 104 (Sat)
  { type: 'rest' },                                                        // Day 105 (Sun) - Off

  // Week 16 (Day 106–112)
  W('hiit',  'Max Out Cardio & 360 ABS',        'mindex29.html', 20), // Day 106 (Mon)
  W('upper', 'Max Out Power',                   'mindex7.html',  25), // Day 107 (Tue)
  W('lower', 'Max Out Sweet & Max Out ABS',     'mindex30.html', 25), // Day 108 (Wed)
  W('core',  'Max Out Strength',                'mindex9.html',  15), // Day 109 (Thu)
  W('hiit',  'Friday Fight Round 2',            'mindex10.html', 18), // Day 110 (Fri)
  W('lower', 'Cardio Challenge',                'mindex1.html',  20), // Day 111 (Sat)
  { type: 'rest' },                                                        // Day 112 (Sun) - Off
];
const FocusT25: PlanItem[] = [
  // ALPHA – Week 1 (Day 1–7)
  W('hiit',  'Cardio',                   'findex2.html',  25), // 1
  W('hiit',  'Speed 1.0',                'findex11.html', 25), // 2
  W('core',  'Total Body Circuit',       'findex15.html', 25), // 3
  W('core',  'Ab Intervals',             'findex1.html',  25), // 4
  W('lower', 'Cardio & Lower Focus',     'findex17.html', 50), // 5
  { type: 'rest' },                                                    // 6 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 7

  // ALPHA – Week 2 (Day 8–14)
  W('hiit',  'Cardio',                   'findex2.html',  25), // 8
  W('core',  'Total Body Circuit',       'findex15.html', 25), // 9
  W('hiit',  'Speed 1.0',                'findex11.html', 25), // 10
  W('hiit',  'Cardio',                   'findex2.html',  25), // 11
  W('lower', 'Lower Focus & AB Intervals','findex18.html', 50), // 12
  { type: 'rest' },                                                    // 13 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 14

  // ALPHA – Week 3 (Day 15–21)
  W('core',  'Total Body Circuit',       'findex15.html', 25), // 15
  W('hiit',  'Speed 1.0',                'findex11.html', 25), // 16
  W('lower', 'Lower Focus',              'findex7.html',  25), // 17
  W('hiit',  'Cardio',                   'findex2.html',  25), // 18
  W('core',  'Total Body Circuit & Ab Intervals', 'findex19.html', 50), // 19
  { type: 'rest' },                                                    // 20 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 21

  // ALPHA – Week 4 (Day 22–28)
  W('hiit',  'Cardio',                   'findex2.html',  25), // 22
  W('core',  'Total Body Circuit',       'findex15.html', 25), // 23
  W('lower', 'Lower Focus',              'findex7.html',  25), // 24
  W('core',  'Total Body Circuit',       'findex15.html', 25), // 25
  W('core',  'AB Intervals & Speed 1.0', 'findex20.html', 50), // 26
  { type: 'rest' },                                                    // 27 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 28

  // ALPHA – Week 5 (Day 29–35)
  W('core',  'Total Body Circuit',       'findex15.html', 25), // 29
  W('core',  'Ab Intervals',             'findex1.html',  25), // 30
  W('core',  'Total Body Circuit',       'findex15.html', 25), // 31
  W('hiit',  'Cardio',                   'findex2.html',  25), // 32
  W('lower', 'Total Body Circuit & Lower Focus', 'findex21.html', 50), // 33
  { type: 'rest' },                                                    // 34 - Off
  W('core',  'Stretch',                  'findex2.html',  25), // 35 (giữ nguyên file như JSX của bạn)

  // BETA – Week 6 (Day 36–42)
  W('core',  'Core Cardio',              'findex3.html',  25), // 36
  W('hiit',  'Speed 2.0',                'findex12.html', 25), // 37
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 38
  W('core',  'Dynamic Core',             'findex5.html',  25), // 39
  W('upper', 'Upper Focus & Core Cardio','findex22.html', 50), // 40
  { type: 'rest' },                                                    // 41 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 42

  // BETA – Week 7 (Day 43–49)
  W('core',  'Dynamic Core',             'findex5.html',  25), // 43
  W('core',  'Core Cardio',              'findex3.html',  25), // 44
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 45
  W('upper', 'Upper Focus',              'findex16.html', 25), // 46
  W('core',  "Rip't Circuit & Speed 2.0",'findex23.html', 50), // 47
  { type: 'rest' },                                                    // 48 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 49

  // BETA – Week 8 (Day 50–56)
  W('core',  'Core Cardio',              'findex3.html',  25), // 50
  W('upper', 'Upper Focus',              'findex16.html', 25), // 51
  W('hiit',  'Speed 2.0',                'findex12.html', 25), // 52
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 53
  W('core',  'Dynamic Core & Speed 2.0', 'findex24.html', 50), // 54
  { type: 'rest' },                                                    // 55 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 56

  // BETA – Week 9 (Day 57–63)
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 57
  W('core',  'Dynamic Core',             'findex5.html',  25), // 58
  W('core',  'Core Cardio',              'findex3.html',  25), // 59
  W('core',  'Dynamic Core',             'findex5.html',  25), // 60
  W('upper', 'Speed 2.0 & Upper Focus',  'findex25.html', 50), // 61
  { type: 'rest' },                                                    // 62 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 63

  // BETA – Week 10 (Day 64–70)
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 64
  W('core',  'Core Cardio',              'findex3.html',  25), // 65
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 66
  W('core',  'Dynamic Core',             'findex5.html',  25), // 67
  W('core',  "Rip't Circuit & Speed 2.0",'findex23.html', 50), // 68
  { type: 'rest' },                                                    // 69 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 70

  // PURE GAMMA – Week 11 (Day 71–77)
  W('hiit',  'Speed 3.0',                'findex13.html', 25), // 71
  W('upper', "Rip't Up",                 'findex10.html', 25), // 72
  W('core',  'Extreme Circuit',          'findex6.html',  25), // 73
  W('hiit',  'The Pyramid',              'findex8.html',  25), // 74
  W('hiit',  'Speed 3.0',                'findex13.html', 25), // 75
  { type: 'rest' },                                                    // 76 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 77

  // PURE GAMMA – Week 12 (Day 78–84)
  W('upper', "Rip't Up",                 'findex9.html',  25), // 78
  W('core',  'Extreme Circuit',          'findex6.html',  25), // 79
  W('hiit',  'Speed 3.0',                'findex13.html', 25), // 80
  W('hiit',  'The Pyramid',              'findex8.html',  25), // 81
  W('upper', "Rip't Up",                 'findex12.html', 25), // 82
  { type: 'rest' },                                                    // 83 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 84

  // PURE GAMMA – Week 13 (Day 85–91)
  W('hiit',  'The Pyramid',              'findex8.html',  25), // 85
  W('hiit',  'Speed 3.0',                'findex13.html', 25), // 86
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 87
  W('hiit',  'Extreme Cardio',           'findex6.html',  25), // 88
  W('hiit',  'The Pyramid',              'findex12.html', 25), // 89
  { type: 'rest' },                                                    // 90 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 91

  // PURE GAMMA – Week 14 (Day 92–98)
  W('hiit',  'Extreme Cardio',           'findex6.html',  25), // 92
  W('upper', "Rip't Up",                 'findex10.html', 25), // 93
  W('hiit',  'Speed 3.0',                'findex13.html', 25), // 94
  W('hiit',  'The Pyramid',              'findex12.html', 25), // 95
  W('hiit',  'Extreme Cardio',           'findex6.html',  25), // 96
  { type: 'rest' },                                                    // 97 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 98

  // GAMMA: PURE STRENGTH HYBRID – Week 15 (Day 99–105)
  W('hiit',  'Speed 3.0',                'findex13.html', 25), // 99
  W('upper', "Rip't Up",                 'findex10.html', 25), // 100
  W('hiit',  'Extreme Cardio',           'findex6.html',  25), // 101
  W('hiit',  'The Pyramid',              'findex12.html', 25), // 102
  W('core',  'Total Body Circuit & Speed 3.0', 'findex23.html', 50), // 103
  { type: 'rest' },                                                    // 104 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 105

  // GAMMA: PURE STRENGTH HYBRID – Week 16 (Day 106–112)
  W('hiit',  'The Pyramid',              'findex8.html',  25), // 106
  W('hiit',  'Speed 3.0',                'findex13.html', 25), // 107
  W('upper', 'Upper Focus',              'findex16.html', 25), // 108
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 109
  W('core',  'Extreme Cardio & Dynamic Core', 'findex27.html', 50), // 110
  { type: 'rest' },                                                    // 111 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 112

  // GAMMA: PURE STRENGTH HYBRID – Week 17 (Day 113–119)
  W('hiit',  'Extreme Cardio',           'findex6.html',  25), // 113
  W('hiit',  'The Pyramid',              'findex8.html',  25), // 114
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 115
  W('hiit',  'Speed 3.0',                'findex13.html', 25), // 116
  W('upper', 'Total Body Circuit & Upper Focus', 'findex28.html', 50), // 117
  { type: 'rest' },                                                    // 118 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 119

  // GAMMA: PURE STRENGTH HYBRID – Week 18 (Day 120–126)
  W('hiit',  'The Pyramid',              'findex8.html',  25), // 120
  W('hiit',  'Speed 3.0',                'findex13.html', 25), // 121
  W('core',  "Rip't Circuit",            'findex9.html',  25), // 122
  W('core',  'Dynamic Core',             'findex5.html',  25), // 123
  W('upper', 'Upper Focus & Extreme Cardio', 'findex28.html', 50), // 124
  { type: 'rest' },                                                    // 125 - Off
  W('core',  'Stretch',                  'findex14.html', 25), // 126
];
const P90X1: PlanItem[] = [
  // PHASE 1 – Week 1 (Day 1–7)
  W('upper', 'Chest And Back',          'pindex12.html', 60), // 1
  W('hiit',  'Plyometrics',             'pindex7.html',  60), // 2
  W('upper', 'Shoulders And Arms',      'pindex8.html',  60), // 3
  W('core',  'Yoga X',                  'pindex9.html',  60), // 4
  W('lower', 'Legs And Back',           'pindex3.html',  60), // 5
  W('hiit',  'Kenpo X',                 'pindex10.html', 60), // 6
  W('core',  'Rest Or Stretch',         'pindex6.html',  60), // 7

  // PHASE 1 – Week 2 (Day 8–14)
  W('upper', 'Chest And Back',          'pindex12.html', 60), // 8
  W('hiit',  'Plyometrics',             'pindex7.html',  60), // 9
  W('upper', 'Shoulders And Arms',      'pindex8.html',  60), // 10
  W('core',  'Yoga X',                  'pindex9.html',  60), // 11
  W('lower', 'Legs And Back',           'pindex3.html',  60), // 12
  W('hiit',  'Kenpo X',                 'pindex10.html', 60), // 13
  W('core',  'Rest Or Stretch',         'pindex6.html',  60), // 14

  // PHASE 1 – Week 3 (Day 15–21)
  W('upper', 'Chest And Back',          'pindex12.html', 60), // 15
  W('hiit',  'Plyometrics',             'pindex7.html',  60), // 16
  W('upper', 'Shoulders And Arms',      'pindex8.html',  60), // 17
  W('core',  'Yoga X',                  'pindex9.html',  60), // 18
  W('lower', 'Legs And Back',           'pindex3.html',  60), // 19
  W('hiit',  'Kenpo X',                 'pindex10.html', 60), // 20
  W('core',  'Rest Or Stretch',         'pindex6.html',  60), // 21

  // PHASE 1 – Week 4 (Recovery) (Day 22–28)
  W('core',  'Yoga X',                  'pindex9.html',  60), // 22
  W('core',  'Core Synergistics',       'pindex4.html',  60), // 23
  W('hiit',  'Kenpo X',                 'pindex10.html', 60), // 24
  W('core',  'Stretch',                 'pindex6.html',  60), // 25
  W('hiit',  'Cardio X',                'pindex2.html',  60), // 26
  W('core',  'Yoga X',                  'pindex9.html',  60), // 27
  W('core',  'Rest Or Stretch',         'pindex6.html',  60), // 28

  // PHASE 2 – Week 5 (Day 29–35)
  W('upper', 'Check Shoulder And Triceps', 'pindex11.html', 60), // 29
  W('hiit',  'Plyometrics',                'pindex7.html',  60), // 30
  W('upper', 'Back And Biceps',            'pindex5.html',  60), // 31
  W('core',  'Yoga X',                     'pindex9.html',  60), // 32
  W('lower', 'Legs And Back',              'pindex3.html',  60), // 33
  W('hiit',  'Kenpo X',                    'pindex10.html', 60), // 34
  W('core',  'Rest Or Stretch',            'pindex6.html',  60), // 35

  // PHASE 2 – Week 6 (Day 36–42)
  W('upper', 'Check Shoulder And Triceps', 'pindex11.html', 60), // 36
  W('hiit',  'Plyometrics',                'pindex7.html',  60), // 37
  W('upper', 'Back And Biceps',            'pindex5.html',  60), // 38
  W('core',  'Yoga X',                     'pindex9.html',  60), // 39
  W('lower', 'Legs And Back',              'pindex3.html',  60), // 40
  // gốc dùng pindex11.html cho Kenpo X, mình sửa về pindex10.html cho đúng pattern
  W('hiit',  'Kenpo X',                    'pindex10.html', 60), // 41
  W('core',  'Rest Or Stretch',            'pindex6.html',  60), // 42

  // PHASE 2 – Week 7 (Day 43–49)
  W('upper', 'Check Shoulder And Triceps', 'pindex11.html', 60), // 43
  W('hiit',  'Plyometrics',                'pindex7.html',  60), // 44
  W('upper', 'Back And Biceps',            'pindex5.html',  60), // 45
  W('core',  'Yoga X',                     'pindex9.html',  60), // 46
  // gốc: "index3.html" / "index10.html" -> sửa thành pindex3 / pindex10 cho đúng
  W('lower', 'Legs And Back',              'pindex3.html',  60), // 47
  W('hiit',  'Kenpo X',                    'pindex10.html', 60), // 48
  W('core',  'Rest Or Stretch',            'pindex6.html',  60), // 49

  // PHASE 2 – Week 8 (Recovery) (Day 50–56)
  W('core',  'Yoga X',                     'pindex9.html',  60), // 50
  W('core',  'Core Synergistics',          'pindex4.html',  60), // 51
  W('hiit',  'Kenpo X',                    'pindex10.html', 60), // 52
  W('core',  'Stretch',                    'pindex6.html',  60), // 53
  W('hiit',  'Cardio X',                   'pindex2.html',  60), // 54
  W('core',  'Yoga X',                     'pindex9.html',  60), // 55
  W('core',  'Rest Or Stretch',            'pindex6.html',  60), // 56

  // PHASE 3 – Week 9 (Day 57–63)
  W('upper', 'Chest And Back',             'pindex12.html', 60), // 57
  W('hiit',  'Plyometrics',                'pindex7.html',  60), // 58
  W('upper', 'Shoulders And Arms',         'pindex8.html',  60), // 59
  W('core',  'Yoga X',                     'pindex9.html',  60), // 60
  W('lower', 'Legs And Back',              'pindex3.html',  60), // 61
  W('hiit',  'Kenpo X',                    'pindex10.html', 60), // 62
  W('core',  'Rest Or Stretch',            'pindex6.html',  60), // 63

  // PHASE 3 – Week 10 (Day 64–70)
  W('upper', 'Check Shoulder And Triceps', 'pindex11.html', 60), // 64
  W('hiit',  'Plyometrics',                'pindex7.html',  60), // 65
  W('upper', 'Back And Biceps',            'pindex5.html',  60), // 66
  W('core',  'Yoga X',                     'pindex9.html',  60), // 67
  W('lower', 'Legs And Back',              'pindex3.html',  60), // 68
  W('hiit',  'Kenpo X',                    'pindex10.html', 60), // 69
  W('core',  'Rest Or Stretch',            'pindex6.html',  60), // 70

  // PHASE 3 – Week 11 (Day 71–77)
  W('upper', 'Chest And Back',             'pindex12.html', 60), // 71
  W('hiit',  'Plyometrics',                'pindex7.html',  60), // 72
  W('upper', 'Shoulders And Arms',         'pindex8.html',  60), // 73
  W('core',  'Yoga X',                     'pindex9.html',  60), // 74
  W('lower', 'Legs And Back',              'pindex3.html',  60), // 75
  W('hiit',  'Kenpo X',                    'pindex10.html', 60), // 76
  W('core',  'Rest Or Stretch',            'pindex6.html',  60), // 77

  // PHASE 3 – Week 12 (Day 78–84)
  W('upper', 'Check Shoulder And Triceps', 'pindex11.html', 60), // 78
  W('hiit',  'Plyometrics',                'pindex7.html',  60), // 79
  W('upper', 'Back And Biceps',            'pindex5.html',  60), // 80
  W('core',  'Yoga X',                     'pindex9.html',  60), // 81
  W('lower', 'Legs And Back',              'pindex3.html',  60), // 82
  W('hiit',  'Kenpo X',                    'pindex10.html', 60), // 83
  W('core',  'Rest Or Stretch',            'pindex6.html',  60), // 84

  // PHASE 3 – Final Recovery (Day 85–91)
  W('upper', 'Check Shoulder And Triceps', 'pindex11.html', 60), // 85
  W('core',  'Core Synergistics',          'pindex4.html',  60), // 86
  W('hiit',  'Kenpo X',                    'pindex10.html', 60), // 87
  W('core',  'Stretch',                    'pindex6.html',  60), // 88
  W('hiit',  'Cardio X',                   'pindex2.html',  60), // 89
  W('core',  'Yoga X',                     'pindex9.html',  60), // 90
  W('core',  'Rest Or Stretch',            'pindex6.html',  60), // 91
];
const P90X2: PlanItem[] = [
  // PHASE 1: FOUNDATION (Day 1–7)
  W('core',  'Core',                          'p2index5.html',  60), // 1
  W('hiit',  'Plyocide',                      'p2index9.html',  60), // 2
  W('core',  'Rest Or Recovery and Mobility', 'p2index10.html', 60), // 3
  W('upper', 'Total Body & AB Ripper',        'p2index14.html', 60), // 4
  W('core',  'Yoga',                          'p2index13.html', 60), // 5
  W('lower', 'Balance and Power',             'p2index3.html',  60), // 6
  W('core',  'Rest Or Recovery and Mobility', 'p2index10.html', 60), // 7

  // PHASE 2: STRENGTH (Day 1–7)
  W('upper', 'Chest Back Balance & AB Ripper','p2index15.html', 60), // 8
  W('hiit',  'Plyocide',                      'p2index9.html',  60), // 9
  W('core',  'Rest Or Recovery and Mobility', 'p2index10.html', 60), // 10
  W('upper', 'Shoulder + Arms & AB Ripper',   'p2index16.html', 60), // 11
  W('core',  'Yoga',                          'p2index13.html', 60), // 12
  W('upper', 'Base Back & AB Ripper',         'p2index17.html', 60), // 13
  W('core',  'Rest Or Recovery and Mobility', 'p2index10.html', 60), // 14

  // PHASE 3: PERFORMANCE (Day 1–7)
  W('lower', 'P.A.P Lower',                   'p2index7.html',  60), // 15
  W('lower', 'P.A.P Lower',                   'p2index7.html',  60), // 16
  W('core',  'Yoga',                          'p2index13.html', 60), // 17
  W('core',  'Rest Or Recovery and Mobility', 'p2index10.html', 60), // 18
  W('lower', 'P.A.P Lower',                   'p2index7.html',  60), // 19
  W('lower', 'P.A.P Lower',                   'p2index7.html',  60), // 20
  W('core',  'Rest Or Recovery and Mobility', 'p2index10.html', 60), // 21

  // RECOVERY WEEK (Day 1–7)
  W('core',  'Recovery and Mobility',         'p2index10.html', 60), // 22
  W('core',  'Yoga',                          'p2index13.html', 60), // 23
  W('core',  'Recovery and Mobility',         'p2index10.html', 60), // 24
  W('core',  'Yoga',                          'p2index13.html', 60), // 25
  W('core',  'Recovery and Mobility',         'p2index10.html', 60), // 26
  W('core',  'Yoga',                          'p2index13.html', 60), // 27
  W('core',  'Rest Or Recovery and Mobility', 'p2index10.html', 60), // 28
];
const Insanity: PlanItem[] = [
  // MONTH 1 – Week 1 (Day 1–7)
  W('hiit', 'Fit Test',                     'index1.html',  25), // 1
  W('hiit', 'Plyometric Cardio Circuit',    'index2.html',  40), // 2
  W('hiit', 'Cardio Power & Resistance',    'index3.html',  40), // 3
  W('core', 'Cardio Recovery',              'index4.html',  35), // 4
  W('hiit', 'Pure Cardio',                  'index5.html',  40), // 5
  W('hiit', 'Plyometric Cardio Circuit',    'index2.html',  40), // 6
  { type: 'rest' },                                         // 7 (Off)

  // MONTH 1 – Week 2 (Day 8–14)
  W('hiit', 'Cardio Power & Resistance',    'index3.html',  40), // 8
  W('hiit', 'Pure Cardio',                  'index5.html',  40), // 9
  W('hiit', 'Plyometric Cardio Circuit',    'index2.html',  40), // 10
  W('core', 'Cardio Recovery',              'index4.html',  35), // 11
  W('hiit', 'Cardio Power & Resistance',    'index3.html',  40), // 12
  W('hiit', 'Pure Cardio & Cardio Abs',     'index14.html', 55), // 13
  { type: 'rest' },                                         // 14 (Off)

  // MONTH 1 – Week 3 (Day 15–21)
  W('hiit', 'Fit Test',                     'index1.html',  25), // 15
  W('hiit', 'Plyometric Cardio Circuit',    'index2.html',  40), // 16
  W('hiit', 'Pure Cardio & Cardio Abs',     'index14.html', 55), // 17
  W('core', 'Cardio Recovery',              'index4.html',  35), // 18
  W('hiit', 'Cardio Power & Resistance',    'index3.html',  40), // 19
  W('hiit', 'Plyometric Cardio Circuit',    'index2.html',  40), // 20
  { type: 'rest' },                                         // 21 (Off)

  // MONTH 1 – Week 4 (Day 22–28)
  W('hiit', 'Pure Cardio & Cardio Abs',     'index14.html', 55), // 22
  W('hiit', 'Cardio Power & Resistance',    'index3.html',  40), // 23
  W('hiit', 'Plyometric Cardio Circuit',    'index2.html',  40), // 24
  W('core', 'Cardio Recovery',              'index4.html',  35), // 25
  W('hiit', 'Pure Cardio & Cardio Abs',     'index14.html', 55), // 26
  W('hiit', 'Plyometric Cardio Circuit',    'index2.html',  40), // 27
  { type: 'rest' },                                         // 28 (Off)

  // RECOVERY WEEK (Day 29–35)
  W('core', 'Core Cardio & Balance',        'index7.html',  40), // 29
  W('core', 'Core Cardio & Balance',        'index7.html',  40), // 30
  W('core', 'Core Cardio & Balance',        'index7.html',  40), // 31
  W('core', 'Core Cardio & Balance',        'index7.html',  40), // 32
  W('core', 'Core Cardio & Balance',        'index7.html',  40), // 33
  W('core', 'Core Cardio & Balance',        'index7.html',  40), // 34
  { type: 'rest' },                                         // 35 (Off)

  // MONTH 2 – Week 1 (Day 36–42)
  W('hiit', 'Fit Test & Max Interval Circuit', 'index15.html', 60), // 36
  W('hiit', 'Max Interval Plyo',            'index9.html',   55), // 37
  W('hiit', 'Max Cardio Conditioning',      'index10.html',  50), // 38
  W('core', 'Max Recovery',                 'index11.html',  45), // 39
  W('hiit', 'Max Interval Circuit',         'index8.html',   55), // 40
  W('hiit', 'Max Interval Plyo',            'index9.html',   55), // 41
  { type: 'rest' },                                             // 42 (Off)

  // MONTH 2 – Week 2 (Day 43–49)
  W('hiit', 'Max Cardio Conditioning',      'index10.html',  50), // 43
  W('hiit', 'Max Interval Circuit',         'index8.html',   55), // 44
  W('hiit', 'Max Interval Plyo',            'index9.html',   55), // 45
  W('core', 'Max Recovery',                 'index11.html',  45), // 46
  W('hiit', 'Max Cardio Conditioning & Cardio Abs', 'index16.html', 60), // 47
  W('core', 'Core Cardio & Balance',        'index7.html',   40), // 48
  { type: 'rest' },                                             // 49 (Off)

  // MONTH 2 – Week 3 (Day 50–56)
  W('hiit', 'Fit Test & Max Interval Circuit', 'index15.html', 60), // 50
  W('hiit', 'Max Interval Plyo',            'index9.html',   55), // 51
  W('hiit', 'Max Cardio Conditioning & Cardio Abs', 'index16.html', 60), // 52
  W('core', 'Max Recovery',                 'index11.html',  45), // 53
  W('hiit', 'Max Interval Circuit',         'index8.html',   55), // 54
  W('core', 'Core Cardio & Balance',        'index7.html',   40), // 55
  { type: 'rest' },                                             // 56 (Off)

  // MONTH 2 – Week 4 (Day 57–63)
  W('hiit', 'Max Interval Plyo',            'index9.html',   55), // 57
  W('hiit', 'Max Cardio Conditioning & Cardio Abs', 'index16.html', 60), // 58
  W('hiit', 'Max Interval Circuit',         'index8.html',   55), // 59
  W('core', 'Core Cardio & Balance',        'index7.html',   40), // 60
  W('hiit', 'Max Interval Plyo',            'index9.html',   55), // 61
  W('hiit', 'Max Cardio Conditioning & Cardio Abs', 'index16.html', 60), // 62
  W('hiit', 'Fit Test',                     'index1.html',   25), // 63
];
const HipHopAbs: PlanItem[] = [
  // Week 1 (Day 1–7)
  W('hiit',  'Fat Burning Cardio',                 'hindex1.html', 30), // 1
  W('hiit',  'Fat Burning Cardio',                 'hindex1.html', 30), // 2
  W('core',  'Ab Sculpt',                          'hindex2.html', 25), // 3
  W('hiit',  'Fat Burning Cardio',                 'hindex1.html', 30), // 4
  W('hiit',  'Fat Burning Cardio',                 'hindex1.html', 30), // 5
  W('core',  'Ab Sculpt',                          'hindex2.html', 25), // 6
  { type: 'rest' },                                                  // 7 (Off)

  // Week 2 (Day 8–14)
  W('hiit',  'Fat Burning Cardio',                 'hindex1.html', 30), // 8
  W('core',  'Ab Sculpt & Fat Burning Cardio',     'hindex5.html', 40), // 9
  W('core',  'Ab Sculpt & Fat Burning Cardio',     'hindex5.html', 40), // 10
  W('core',  'Ab Sculpt',                          'hindex2.html', 25), // 11
  W('core',  'Ab Sculpt & Fat Burning Cardio',     'hindex5.html', 40), // 12
  W('core',  'Ab Sculpt & Fat Burning Cardio',     'hindex5.html', 40), // 13
  { type: 'rest' },                                                  // 14 (Off)

  // Week 3 (Day 15–21)
  W('core',  'Ab Sculpt & Fat Burning Cardio',     'hindex5.html', 40), // 15
  W('hiit',  'Total Body Burn',                    'hindex4.html', 35), // 16
  W('lower', 'Fat Burning Cardio & Hips,Buns,Thighs','hindex6.html',40), // 17
  W('core',  'Ab Sculpt & Fat Burning Cardio',     'hindex5.html', 40), // 18
  W('hiit',  'Total Body Burn',                    'hindex4.html', 35), // 19
  W('lower', 'Hips, Buns & Thighs',                'hindex3.html', 30), // 20
  { type: 'rest' },                                                  // 21 (Off)

  // Week 4 (Day 22–28)
  W('hiit',  'Total Body Burn',                    'hindex4.html', 35), // 22
  W('core',  'Ab Sculpt & Fat Burning Cardio',     'hindex5.html', 40), // 23
  W('lower', 'Fat Burning Cardio & Hips,Buns,Thighs','hindex5.html',40), // 24
  W('hiit',  'Total Body Burn',                    'hindex4.html', 35), // 25
  W('core',  'Ab Sculpt & Fat Burning Cardio',     'hindex5.html', 40), // 26
  W('lower', 'Fat Burning Cardio & Hips,Buns,Thighs','hindex6.html',40), // 27
  { type: 'rest' },                                                  // 28 (Off)
];
const FourWeeksOfThePrep: PlanItem[] = [
  // Week 1
  W('upper', 'Push',                'w4index8.html', 45), // Mon
  W('lower', 'Legs',                'w4index5.html', 45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('hiit',  'Endurance & Agility', 'w4index3.html', 40), // Thu
  W('upper', 'Pull',                'w4index6.html', 45), // Fri
  W('full',  'Full Body Tempo',     'w4index1.html', 40), // Sat
  W('core',  'Range And Repair',    'w4index9.html', 30), // Sun

  // Week 2
  W('full',  'Total Body Push/Pull','w4index10.html', 45), // Mon
  W('full',  'Strength & Power',    'w4index7.html',  45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('core',  'Cardio & Core',       'w4index2.html',  35), // Thu
  W('full',  'Isometrics',          'w4index4.html',  40), // Fri
  W('full',  'The Crucible',        'w4index11.html', 50), // Sat
  W('core',  'Range And Repair',    'w4index9.html',  30), // Sun

  // Week 3 (same pattern as Week 1)
  W('upper', 'Push',                'w4index8.html', 45), // Mon
  W('lower', 'Legs',                'w4index5.html', 45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('hiit',  'Endurance & Agility', 'w4index3.html', 40), // Thu
  W('upper', 'Pull',                'w4index6.html', 45), // Fri
  W('full',  'Full Body Tempo',     'w4index1.html', 40), // Sat
  W('core',  'Range And Repair',    'w4index9.html', 30), // Sun

  // Week 4 (same pattern as Week 2)
  W('full',  'Total Body Push/Pull','w4index10.html', 45), // Mon
  W('full',  'Strength & Power',    'w4index7.html',  45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('core',  'Cardio & Core',       'w4index2.html',  35), // Thu
  W('full',  'Isometrics',          'w4index4.html',  40), // Fri
  W('full',  'The Crucible',        'w4index11.html', 50), // Sat
  W('core',  'Range And Repair',    'w4index9.html',  30), // Sun
];
const SixWeeksOfTheWork: PlanItem[] = [
  // Week 1
  W('upper', 'Push',                'w61index1.html', 45), // Mon
  W('lower', 'Legs',                'w61index2.html', 45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('hiit',  'Endurance & Agility', 'w61index3.html', 40), // Thu
  W('upper', 'Pull',                'w61index4.html', 45), // Fri
  W('full',  'Full Body Tempo',     'w61index5.html', 45), // Sat
  W('core',  'Range And Repair',    'w61index6.html', 30), // Sun

  // Week 2
  W('full',  'Total Body Push/Pull','w62index1.html', 45), // Mon
  W('full',  'Strength & Power',    'w62index2.html', 45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('core',  'Cardio & Core',       'w62index3.html', 35), // Thu
  W('full',  'Isometrics',          'w62index4.html', 40), // Fri
  W('full',  'The Crucible',        'w62index5.html', 50), // Sat
  W('core',  'Range And Repair',    'w62index6.html', 30), // Sun

  // Week 3
  W('upper', 'Push',                'w63index1.html', 45), // Mon
  W('lower', 'Legs',                'w63index2.html', 45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('hiit',  'Endurance & Agility', 'w63index3.html', 40), // Thu
  W('upper', 'Pull',                'w63index4.html', 45), // Fri
  W('full',  'Full Body Tempo',     'w63index5.html', 45), // Sat
  W('core',  'Range And Repair',    'w63index6.html', 30), // Sun

  // Week 4
  W('full',  'Total Body Push/Pull','w64index1.html', 45), // Mon
  W('full',  'Strength & Power',    'w64index2.html', 45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('core',  'Cardio & Core',       'w64index3.html', 35), // Thu
  W('full',  'Isometrics',          'w64index4.html', 40), // Fri
  W('full',  'The Crucible',        'w64index5.html', 50), // Sat
  W('core',  'Range And Repair',    'w64index6.html', 30), // Sun

  // Week 5
  W('upper', 'Push',                'w65index1.html', 45), // Mon
  W('lower', 'Legs',                'w65index2.html', 45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('hiit',  'Endurance & Agility', 'w65index3.html', 40), // Thu
  W('upper', 'Pull',                'w65index4.html', 45), // Fri
  W('full',  'Full Body Tempo',     'w65index5.html', 45), // Sat
  W('core',  'Range And Repair',    'w65index6.html', 30), // Sun

  // Week 6
  W('full',  'Total Body Push/Pull','w66index1.html', 45), // Mon
  W('full',  'Strength & Power',    'w66index2.html', 45), // Tue
  { type: 'rest' },                                           // Wed (Off)
  W('core',  'Cardio & Core',       'w66index3.html', 35), // Thu
  W('full',  'Isometrics',          'w66index4.html', 40), // Fri
  W('full',  'The Crucible',        'w66index5.html', 50), // Sat
  W('core',  'Range And Repair',    'w66index6.html', 30), // Sun,
];


export const PROGRAMS: WorkoutProgram[] = [
    {
    id: 'insanity',
    titleKey: 'Insanity',
    durationDays: Insanity.length, // = số ngày bạn nhập
    iconColor: '#FF6B6B',
    icon: require('../../assets/images/icon_fatburn.jpg'),
    plan: Insanity
  },
  {
    id: 'max30',
    titleKey: 'Insanity Max 30',
    durationDays: Max30.length, // = số ngày bạn nhập
    iconColor: '#FF6B6B',
    icon: require('../../assets/images/icon_fatburn.jpg'),
    plan: Max30
  },
  {
    id: 'focust25',
    titleKey: 'Focus T25',
    durationDays: FocusT25.length,
    iconColor: '#4ECDC4',
    icon: require('../../assets/images/icon_fullbody.jpg'),
    plan: FocusT25
  },
  {
    id: 'P90X1',
    titleKey: 'P90X1',
    durationDays: P90X1.length,
    iconColor: '#4ECDC4',
    icon: require('../../assets/images/icon_fullbody.jpg'),
    plan: P90X1
  },
  {
    id: 'P90X2',
    titleKey: 'P90X2',
    durationDays: P90X2.length,
    iconColor: '#4ECDC4',
    icon: require('../../assets/images/icon_fullbody.jpg'),
    plan: P90X2
  },
  {
    id: 'HipHopAbs',
    titleKey: 'Hip Hop Abs',
    durationDays: HipHopAbs.length,
    iconColor: '#4ECDC4',
    icon: require('../../assets/images/icon_fullbody.jpg'),
    plan: HipHopAbs
  },
  {
    id: 'FourWeeksOfThePrep',
    titleKey: '4 Weeks Of The Prep',
    durationDays: FourWeeksOfThePrep.length,
    iconColor: '#4ECDC4',
    icon: require('../../assets/images/icon_fullbody.jpg'),
    plan: FourWeeksOfThePrep
  },
  {
    id: 'SixWeeksOfTheWork',
    titleKey: '6 Weeks Of The Work',
    durationDays: SixWeeksOfTheWork.length,
    iconColor: '#4ECDC4',
    icon: require('../../assets/images/icon_fullbody.jpg'),
    plan: SixWeeksOfTheWork
  }
];

/** Sinh list ngày đúng theo thứ tự plan, không lặp lại.
 *  weekdayIndex = i % 7 để tô màu theo Mon..Sun.
 */
export function generateProgramDays(program: WorkoutProgram): WorkoutDay[] {
  const plan = program.plan || [];
  return plan.map((item, i) => {
    const dayNumber = i + 1;
    const weekdayIndex = i % 7;

    if (item.type === 'rest') {
      return {
        id: `${program.id}-day-${dayNumber}`,
        dayNumber,
        weekdayIndex,
        sessionKey: 'rest',
        isRest: true,
        name: 'Rest / Recovery',
        webUrl: undefined,
        durationMin: undefined,
        videoUrl: '' // không dùng khi nghỉ
      };
    }

    // Workout
    return {
      id: `${program.id}-day-${dayNumber}`,
      dayNumber,
      weekdayIndex,
      sessionKey: item.sessionKey,
      isRest: false,
      name: item.name,
      webUrl: item.url,
      durationMin: item.durationMin,
      videoUrl: item.url // tương thích trường cũ
    };
  });
}
