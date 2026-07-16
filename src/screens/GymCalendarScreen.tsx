// FILE: src/screens/GymCalendarScreen.tsx
import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  normalizeGymKey,
  translateGymDayTitle,
} from '../utils/gymI18n';

import {
  buildSmartGymPlan,
  loadGymDaysPerWeek,
  loadUserGymProfile,
  SmartGymDay,
  TrainingDaysPerWeek,
  UserGymProfile,
} from '../data/gymSmartPlan';

import {
  applyEquipmentToPlan,
  loadGymEquipmentMode,
} from '../services/gymAdvanced';

import {
  addDays,
  buildGymCalendarWeek,
  getWeekStart,
  GymCalendarItem,
} from '../services/gymCalendar';

import {
  loadGymWorkoutHistory,
} from '../store/gymProgress';

const BG = '#06111D';
const CARD = '#0B1624';
const CARD_2 = '#071B2B';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';
const YELLOW = '#FACC15';
const RED = '#FB7185';

const formatWeekRange = (weekStart: number) => {
  const start = new Date(weekStart);
  const end = new Date(addDays(weekStart, 6));

  return `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${end.getMonth() + 1}`;
};

export const GymCalendarScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [weekStart, setWeekStart] = useState(getWeekStart());
  const [daysPerWeek, setDaysPerWeek] =
    useState<TrainingDaysPerWeek>(4);
  const [profile, setProfile] =
    useState<UserGymProfile | null>(null);
  const [planId, setPlanId] = useState('smart-gym');
  const [planDays, setPlanDays] = useState<SmartGymDay[]>([]);

  const reload = useCallback(async () => {
    const [
      savedDays,
      savedProfile,
      savedEquipment,
    ] = await Promise.all([
      loadGymDaysPerWeek(),
      loadUserGymProfile(),
      loadGymEquipmentMode(),
    ]);

    const basePlan = buildSmartGymPlan(savedDays, savedProfile);
    const plan = applyEquipmentToPlan(basePlan, savedEquipment);

    setDaysPerWeek(savedDays);
    setProfile(savedProfile);
    setPlanId(plan.id);
    setPlanDays(plan.days);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const [historyVersion, setHistoryVersion] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadGymWorkoutHistory().then(() => {
        setHistoryVersion(prev => prev + 1);
      });
    }, []),
  );

  const [calendarItems, setCalendarItems] =
    useState<GymCalendarItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const build = async () => {
        const history = await loadGymWorkoutHistory();

        if (!mounted) return;

        setCalendarItems(
          buildGymCalendarWeek({
            planId,
            days: planDays,
            daysPerWeek,
            history,
            weekStart,
          }),
        );
      };

      build();

      return () => {
        mounted = false;
      };
    }, [
      planId,
      planDays,
      daysPerWeek,
      weekStart,
      historyVersion,
    ]),
  );

  const openWorkout = (item: GymCalendarItem) => {
    if (!item.workoutDay) return;

    navigation.navigate('GymWorkoutDay', {
      programId: planId,
      dayId: item.workoutDay.id,
      plannedDay: item.workoutDay,
      daysPerWeek,
      profile,
    });
  };

  const statusLabel = (status: GymCalendarItem['status']) => {
    if (status === 'completed') return t('gym.completed', 'Completed');
    if (status === 'missed') return t('gym.missed', 'Missed');
    if (status === 'today') return t('gym.today', 'Today');
    if (status === 'workout') return t('gym.scheduled', 'Scheduled');

    return t('gym.rest', 'Rest');
  };

  const renderItem = ({ item }: { item: GymCalendarItem }) => {
    const isActionable =
      item.status === 'today' ||
      item.status === 'workout' ||
      item.status === 'missed' ||
      item.status === 'completed';

    return (
      <TouchableOpacity
        activeOpacity={0.88}
        style={[
          styles.dayCard,
          item.status === 'completed' && styles.completedCard,
          item.status === 'missed' && styles.missedCard,
          item.status === 'today' && styles.todayCard,
        ]}
        disabled={!isActionable}
        onPress={() => openWorkout(item)}
      >
        <View style={styles.dateBox}>
          <Text style={styles.weekdayText}>
            {t(`gym.weekdays.${normalizeGymKey(item.weekdayLabel)}`, {
              defaultValue: item.weekdayLabel,
            })}
          </Text>

          <Text style={styles.dateText}>
            {item.dayLabel}
          </Text>
        </View>

        <View style={styles.dayBody}>
          <Text style={styles.workoutTitle}>
            {item.workoutDay
              ? translateGymDayTitle(item.workoutDay, t)
              : t('gym.recoveryDay', 'Recovery day')}
          </Text>

          <Text style={styles.workoutMeta}>
            {item.workoutDay
              ? `${item.workoutDay.durationMin} ${t('workouts.min', 'min')} • ${item.workoutDay.exercises.length} ${t('gym.exercises', 'exercises')}`
              : t(
                  'gym.recoveryCalendarText',
                  'No planned workout today.',
                )}
          </Text>
        </View>

        <View
          style={[
            styles.statusPill,
            item.status === 'completed' && styles.statusCompleted,
            item.status === 'missed' && styles.statusMissed,
            item.status === 'today' && styles.statusToday,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === 'completed' && styles.statusTextCompleted,
              item.status === 'missed' && styles.statusTextMissed,
              item.status === 'today' && styles.statusTextToday,
            ]}
          >
            {statusLabel(item.status)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const completedCount = useMemo(() => {
    return calendarItems.filter(item => item.status === 'completed').length;
  }, [calendarItems]);

  const missedCount = useMemo(() => {
    return calendarItems.filter(item => item.status === 'missed').length;
  }, [calendarItems]);

  return (
    <View style={styles.container}>
      <FlatList
        data={calendarItems}
        keyExtractor={(item) => String(item.date)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>
                {t('gym.calendarKicker', 'GYM CALENDAR')}
              </Text>
            </View>

            <Text style={styles.title}>
              {t('gym.calendarTitle', 'Workout calendar')}
            </Text>

            <Text style={styles.subtitle}>
              {t(
                'gym.calendarSubtitle',
                'View your weekly gym schedule, completed days and missed workouts.',
              )}
            </Text>

            <View style={styles.weekCard}>
              <Text style={styles.weekLabel}>
                {t('gym.currentWeek', 'Current week')}
              </Text>

              <Text style={styles.weekRange}>
                {formatWeekRange(weekStart)}
              </Text>

              <View style={styles.weekStats}>
                <Text style={styles.weekStatText}>
                  ✅ {completedCount} {t('gym.completed', 'Completed')}
                </Text>

                <Text style={styles.weekStatText}>
                  ⚠️ {missedCount} {t('gym.missed', 'Missed')}
                </Text>
              </View>

              <View style={styles.weekButtons}>
                <TouchableOpacity
                  activeOpacity={0.86}
                  style={styles.weekButton}
                  onPress={() => setWeekStart(prev => addDays(prev, -7))}
                >
                  <Text style={styles.weekButtonText}>
                    {t('gym.prevWeek', 'Prev')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.86}
                  style={styles.weekButtonToday}
                  onPress={() => setWeekStart(getWeekStart())}
                >
                  <Text style={styles.weekButtonTodayText}>
                    {t('gym.thisWeek', 'This week')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.86}
                  style={styles.weekButton}
                  onPress={() => setWeekStart(prev => addDays(prev, 7))}
                >
                  <Text style={styles.weekButtonText}>
                    {t('gym.nextWeek', 'Next')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 18,
    paddingBottom: 170,
  },
  header: {
    marginBottom: 12,
  },
  kickerPill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.5)',
    backgroundColor: 'rgba(25, 230, 210, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  kickerText: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: TEXT,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  subtitle: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  weekCard: {
    backgroundColor: CARD_2,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.22)',
    padding: 16,
    marginTop: 18,
    marginBottom: 14,
  },
  weekLabel: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  weekRange: {
    color: TEXT,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 7,
  },
  weekStats: {
    flexDirection: 'row',
    marginTop: 10,
  },
  weekStatText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '800',
    marginRight: 14,
  },
  weekButtons: {
    flexDirection: 'row',
    marginTop: 14,
  },
  weekButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.35)',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  weekButtonToday: {
    flex: 1.25,
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  weekButtonText: {
    color: CYAN,
    fontSize: 13,
    fontWeight: '900',
  },
  weekButtonTodayText: {
    color: BG,
    fontSize: 13,
    fontWeight: '900',
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 14,
    marginBottom: 10,
  },
  completedCard: {
    borderColor: 'rgba(25, 230, 210, 0.38)',
  },
  missedCard: {
    borderColor: 'rgba(251, 113, 133, 0.4)',
  },
  todayCard: {
    borderColor: 'rgba(124, 255, 58, 0.45)',
  },
  dateBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#06111D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  weekdayText: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
  },
  dateText: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 4,
  },
  dayBody: {
    flex: 1,
  },
  workoutTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '900',
  },
  workoutMeta: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
  },
  statusPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 8,
  },
  statusCompleted: {
    borderColor: 'rgba(25, 230, 210, 0.45)',
    backgroundColor: 'rgba(25, 230, 210, 0.1)',
  },
  statusMissed: {
    borderColor: 'rgba(251, 113, 133, 0.45)',
    backgroundColor: 'rgba(251, 113, 133, 0.1)',
  },
  statusToday: {
    borderColor: 'rgba(124, 255, 58, 0.45)',
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },
  statusText: {
    color: MUTED,
    fontSize: 10,
    fontWeight: '900',
  },
  statusTextCompleted: {
    color: CYAN,
  },
  statusTextMissed: {
    color: RED,
  },
  statusTextToday: {
    color: NEON,
  },
});

export default GymCalendarScreen;