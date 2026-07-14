// FILE: src/screens/GymProgramListScreen.tsx
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  buildSmartGymPlan,
  loadGymDaysPerWeek,
  loadUserGymProfile,
  saveGymDaysPerWeek,
  SmartGymDay,
  TrainingDaysPerWeek,
  UserGymProfile,
  getAutoGymWeekNumber,
} from '../data/gymSmartPlan';

import {
  getRecommendedProgramWeeks,
  getProgramPhaseLabel,
  getWeekTrainingAdvice,
} from '../services/gymCoach';

import {
  applyEquipmentToPlan,
  GymEquipmentMode,
  loadGymEquipmentMode,
  saveGymEquipmentMode,
} from '../services/gymAdvanced';
import TodayGymWorkoutCard from '../components/TodayGymWorkoutCard';
import {
  loadGymOnboarding,
} from '../services/gymOnboarding';

const BG = '#06111D';
const CARD = '#0B1624';
const CARD_2 = '#071B2B';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const DAY_OPTIONS: TrainingDaysPerWeek[] = [3, 4, 5, 6];

const EQUIPMENT_OPTIONS: {
  value: GymEquipmentMode;
  label: string;
}[] = [
  {
    value: 'full_gym',
    label: 'Full gym',
  },
  {
    value: 'machines',
    label: 'Machines',
  },
  {
    value: 'dumbbell_only',
    label: 'Dumbbell',
  },
  {
    value: 'no_barbell',
    label: 'No barbell',
  },
  {
    value: 'home',
    label: 'Home',
  },
];

export const GymProgramListScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [daysPerWeek, setDaysPerWeek] =
    useState<TrainingDaysPerWeek>(4);

  const [equipmentMode, setEquipmentMode] =
    useState<GymEquipmentMode>('full_gym');

  const [profile, setProfile] =
    useState<UserGymProfile | null>(null);

  const [loaded, setLoaded] = useState(false);
  const onboardingPromptedRef = useRef(false);

  const reload = useCallback(async () => {
    const [
      savedDays,
      savedProfile,
      savedEquipment,
        savedOnboarding,
    ] = await Promise.all([
      loadGymDaysPerWeek(),
      loadUserGymProfile(),
      loadGymEquipmentMode(),
        loadGymOnboarding(),
    ]);

    setDaysPerWeek(savedDays);
    setProfile(savedProfile);
    setEquipmentMode(savedEquipment);
    setLoaded(true);
    if (!savedOnboarding && !onboardingPromptedRef.current) {
  onboardingPromptedRef.current = true;

  setTimeout(() => {
    navigation.navigate('GymOnboarding');
  }, 350);
}
}, [navigation]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const plan = useMemo(() => {
    const basePlan = buildSmartGymPlan(daysPerWeek, profile);

    return applyEquipmentToPlan(basePlan, equipmentMode);
  }, [daysPerWeek, profile, equipmentMode]);

  const totalWeeks = useMemo(() => {
    return getRecommendedProgramWeeks(daysPerWeek, profile);
  }, [daysPerWeek, profile]);

const currentWeek = getAutoGymWeekNumber();
  const phaseLabel = getProgramPhaseLabel(currentWeek, totalWeeks);
  const weekAdvice = getWeekTrainingAdvice(currentWeek, totalWeeks);

  const profileText = useMemo(() => {
    if (!profile) {
      return t(
        'gym.missingProfile',
        'Complete your profile to make this plan more personalized.',
      );
    }

    const parts = [];

    if (profile.age) {
      parts.push(`${t('gym.profileAge', 'Age')}: ${profile.age}`);
    }

    if (profile.gender) {
      parts.push(`${t('gym.profileGender', 'Gender')}: ${profile.gender}`);
    }

    if (profile.weightKg) {
      parts.push(`${t('gym.profileWeight', 'Weight')}: ${profile.weightKg}kg`);
    }

    return parts.join(' • ') || t(
      'gym.personalizedFromProfile',
      'Personalized from your profile',
    );
  }, [profile, t]);

  const onSelectDays = async (value: TrainingDaysPerWeek) => {
    setDaysPerWeek(value);
    await saveGymDaysPerWeek(value);
  };

  const onSelectEquipment = async (value: GymEquipmentMode) => {
    setEquipmentMode(value);
    await saveGymEquipmentMode(value);
  };

  const openDay = (day: SmartGymDay) => {
    navigation.navigate('GymWorkoutDay', {
      programId: plan.id,
      dayId: day.id,
      plannedDay: day,
      daysPerWeek,
      profile,
    });
  };

  const renderActionCard = (
    icon: string,
    title: string,
    subtitle: string,
    onPress: () => void,
    primary = false,
  ) => {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        style={[
          styles.actionCard,
          primary && styles.actionCardPrimary,
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.actionIconBox,
            primary && styles.actionIconBoxPrimary,
          ]}
        >
          <Text style={styles.actionIcon}>
            {icon}
          </Text>
        </View>

        <Text
          style={[
            styles.actionTitle,
            primary && styles.actionTitlePrimary,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.actionSubtitle,
            primary && styles.actionSubtitlePrimary,
          ]}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDay = ({ item }: { item: SmartGymDay }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        style={styles.dayCard}
        onPress={() => openDay(item)}
      >
        <View style={styles.dayCircle}>
          <Text style={styles.dayNumber}>
            {item.dayNumber}
          </Text>
        </View>

        <View style={styles.dayBody}>
          <Text style={styles.dayTitle}>
            {item.title}
          </Text>

          <Text style={styles.dayFocus}>
            {item.focus}
          </Text>

          <Text style={styles.dayMeta}>
            {item.durationMin} {t('workouts.min', 'min')} •{' '}
            {item.exercises.length} {t('gym.exercises', 'exercises')} •{' '}
            {item.intensity}
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <FlatList
        data={plan.days}
        keyExtractor={(item) => item.id}
        renderItem={renderDay}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>
                {t('gym.smartKicker', 'SMART GYM PLAN')}
              </Text>
            </View>

            <Text style={styles.title}>
              {t('gym.smartTitle', 'Choose your weekly gym schedule')}
            </Text>

            <Text style={styles.subtitle}>
              {t(
                'gym.smartSubtitle',
                'Select how many days you want to train. The app will arrange the most balanced workout split for your profile.',
              )}
            </Text>

            <View style={styles.profileCard}>
              <Text style={styles.profileTitle}>
                {t('gym.personalizedFromProfile', 'Personalized from your profile')}
              </Text>

              <Text style={styles.profileText}>
                {loaded ? profileText : t('UserProfile.loading', 'Loading…')}
              </Text>
            </View>
<TodayGymWorkoutCard
  planId={plan.id}
  days={plan.days}
  daysPerWeek={daysPerWeek}
  onStartWorkout={openDay}
  onQuickWorkout={() => navigation.navigate('GymQuickWorkout')}
/>

            <View style={styles.quickActionsSection}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitleNoMargin}>
                  {t('gym.quickActions', 'Quick actions')}
                </Text>

                <Text style={styles.sectionHint}>
                  {t('gym.toolsAndProgress', 'Tools & progress')}
                </Text>
              </View>

              <View style={styles.actionGrid}>
                {renderActionCard(
                  '📈',
                  t('gym.viewProgressChart', 'Progress chart'),
                  t('gym.progressShortDesc', 'Track weight trend'),
                  () => navigation.navigate('GymProgressChart'),
                )}

                {renderActionCard(
                  '🏆',
                  t('gym.viewPersonalRecords', 'Personal records'),
                  t('gym.personalRecordsShortDesc', 'Your best lifts'),
                  () => navigation.navigate('GymPersonalRecords'),
                  true,
                )}

                {renderActionCard(
                  '💡',
                  t('gym.trainingInsights', 'Training insights'),
                  t('gym.insightsShortDesc', 'Recap & recovery'),
                  () => navigation.navigate('GymInsights'),
                )}

                {renderActionCard(
                  '📷',
                  t('gym.bodyProgress', 'Body progress'),
                  t('gym.bodyProgressShortDesc', 'Photos & measurements'),
                  () => navigation.navigate('GymBodyProgress'),
                )}
{renderActionCard(
  '🗓️',
  t('gym.calendarTitle', 'Workout calendar'),
  t('gym.calendarShortDesc', 'Weekly schedule'),
  () => navigation.navigate('GymCalendar'),
)}

{renderActionCard(
  '⚙️',
  t('gym.gymSetup', 'Gym setup'),
  t('gym.gymSetupShortDesc', 'Goal & equipment'),
  () => navigation.navigate('GymOnboarding'),
)}
                {renderActionCard(
                  '⚡',
                  t('gym.quickWorkout', 'Quick workout'),
                  t('gym.quickWorkoutShortDesc', 'Start fast session'),
                  () => navigation.navigate('GymQuickWorkout'),
                  true,
                )}
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              {t('gym.daysPerWeekQuestion', 'How many days per week?')}
            </Text>

            <View style={styles.daysRow}>
              {DAY_OPTIONS.map((item) => {
                const active = item === daysPerWeek;

                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.86}
                    style={[
                      styles.dayOption,
                      active && styles.dayOptionActive,
                    ]}
                    onPress={() => onSelectDays(item)}
                  >
                    <Text
                      style={[
                        styles.dayOptionText,
                        active && styles.dayOptionTextActive,
                      ]}
                    >
                      {item}
                    </Text>

                    <Text
                      style={[
                        styles.dayOptionSub,
                        active && styles.dayOptionTextActive,
                      ]}
                    >
                      {t('gym.day', 'days')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>
              {t('gym.availableEquipment', 'Available equipment')}
            </Text>

            <Text style={styles.sectionSubtitle}>
              {t(
                'gym.availableEquipmentDesc',
                'Choose what you have so the app can replace exercises automatically.',
              )}
            </Text>

            <View style={styles.equipmentRow}>
              {EQUIPMENT_OPTIONS.map((item) => {
                const active = equipmentMode === item.value;

                return (
                  <TouchableOpacity
                    key={item.value}
                    activeOpacity={0.86}
                    style={[
                      styles.equipmentChip,
                      active && styles.equipmentChipActive,
                    ]}
                    onPress={() => onSelectEquipment(item.value)}
                  >
                    <Text
                      style={[
                        styles.equipmentChipText,
                        active && styles.equipmentChipTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.adviceBox}>
              <Text style={styles.adviceKicker}>
                {t('gym.recommendedSchedule', 'Recommended schedule')}
              </Text>

              <Text style={styles.adviceTitle}>
                {totalWeeks} {t('gym.weeks', 'weeks')} • {phaseLabel}
              </Text>

              <Text style={styles.adviceText}>
                {plan.advice}
              </Text>

              <Text style={styles.weekAdviceText}>
                {weekAdvice}
              </Text>
            </View>

            <View style={styles.planHeaderRow}>
              <Text style={styles.sectionTitleNoMargin}>
                {plan.title}
              </Text>

              <Text style={styles.planCount}>
                {plan.days.length} {t('gym.day', 'days')}
              </Text>
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

  profileCard: {
    backgroundColor: CARD_2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.22)',
    padding: 16,
    marginTop: 20,
  },
  profileTitle: {
    color: CYAN,
    fontSize: 14,
    fontWeight: '900',
  },
  profileText: {
    color: '#E2E8F0',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
  },

  quickActionsSection: {
    marginTop: 22,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitleNoMargin: {
    flex: 1,
    color: TEXT,
    fontSize: 20,
    fontWeight: '900',
  },
  sectionHint: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: -4,
    marginBottom: 12,
  },

  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48.5%',
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.15)',
    padding: 14,
    marginBottom: 11,
  },
  actionCardPrimary: {
    backgroundColor: 'rgba(124, 255, 58, 0.1)',
    borderColor: 'rgba(124, 255, 58, 0.35)',
  },
  actionIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
  },
  actionIconBoxPrimary: {
    backgroundColor: 'rgba(124, 255, 58, 0.18)',
  },
  actionIcon: {
    fontSize: 19,
  },
  actionTitle: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '900',
  },
  actionTitlePrimary: {
    color: NEON,
  },
  actionSubtitle: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
  },
  actionSubtitlePrimary: {
    color: '#D9F99D',
  },

  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayOption: {
    width: '23%',
    minHeight: 96,
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOptionActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  dayOptionText: {
    color: TEXT,
    fontSize: 28,
    fontWeight: '900',
  },
  dayOptionSub: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 5,
  },
  dayOptionTextActive: {
    color: BG,
  },

  equipmentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  equipmentChip: {
    backgroundColor: CARD,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 9,
  },
  equipmentChipActive: {
    backgroundColor: 'rgba(124, 255, 58, 0.15)',
    borderColor: NEON,
  },
  equipmentChipText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '900',
  },
  equipmentChipTextActive: {
    color: NEON,
  },

  adviceBox: {
    marginTop: 16,
    backgroundColor: CARD_2,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.25)',
    padding: 16,
  },
  adviceKicker: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  adviceTitle: {
    color: NEON,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 8,
  },
  adviceText: {
    color: '#D8E4F0',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  weekAdviceText: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },

  planHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  planCount: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
  },

  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 15,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  dayCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  dayNumber: {
    color: NEON,
    fontSize: 17,
    fontWeight: '900',
  },
  dayBody: {
    flex: 1,
  },
  dayTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
  },
  dayFocus: {
    color: MUTED,
    fontSize: 13,
    marginTop: 4,
  },
  dayMeta: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 6,
  },
  arrow: {
    color: NEON,
    fontSize: 34,
    fontWeight: '300',
    marginLeft: 8,
  },
});

export default GymProgramListScreen;