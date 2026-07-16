// FILE: src/screens/GymInsightsScreen.tsx
import React, {
  useCallback,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  buildGymAchievements,
  buildMuscleRecoveryMap,
  buildWeeklyRecap,
  dismissMissedWorkoutToday,
  getMissedWorkoutSuggestion,
  GymAchievement,
  GymWeeklyRecap,
  MuscleRecoveryItem,
} from '../services/gymAdvanced';

import { loadGymDaysPerWeek } from '../data/gymSmartPlan';
import {
  translateAchievementDesc,
  translateAchievementTitle,
  translateMuscleGroup,
  translateRecoveryStatus,
} from '../utils/gymI18n';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const GymInsightsScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [recap, setRecap] = useState<GymWeeklyRecap | null>(null);
  const [achievements, setAchievements] = useState<GymAchievement[]>([]);
  const [recovery, setRecovery] = useState<MuscleRecoveryItem[]>([]);
  const [missed, setMissed] = useState({
    missed: false,
    title: '',
    text: '',
  });

  const reload = useCallback(async () => {
    const days = await loadGymDaysPerWeek();

    const [nextRecap, nextAchievements, nextRecovery, missedInfo] =
      await Promise.all([
        buildWeeklyRecap(),
        buildGymAchievements(),
        buildMuscleRecoveryMap(),
        getMissedWorkoutSuggestion(days),
      ]);

    setRecap(nextRecap);
    setAchievements(nextAchievements);
    setRecovery(nextRecovery);
    setMissed(missedInfo);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const dismissMissed = async () => {
    await dismissMissedWorkoutToday();
    reload();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.kickerPill}>
          <Text style={styles.kickerText}>
            {t('gym.insightsKicker', 'GYM INSIGHTS')}
          </Text>
        </View>

        <Text style={styles.title}>
          {t('gym.insightsTitle', 'Training insights')}
        </Text>

        <Text style={styles.subtitle}>
          {t(
            'gym.insightsSubtitle',
            'Weekly recap, recovery, achievements and smart workout adjustment.',
          )}
        </Text>

        {missed.missed ? (
          <View style={styles.missedCard}>
            <Text style={styles.missedTitle}>
              {t('gym.missedWorkoutTitle', missed.title)}
            </Text>

            <Text style={styles.missedText}>
              {t('gym.missedWorkoutText', missed.text)}
            </Text>

            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.primaryButton}
              onPress={() => navigation.navigate('GymQuickWorkout')}
            >
              <Text style={styles.primaryButtonText}>
                {t('gym.trainToday', 'Train today')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.secondaryButton}
              onPress={dismissMissed}
            >
              <Text style={styles.secondaryButtonText}>
                {t('gym.skipForToday', 'Skip for today')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t('gym.weeklyRecap', 'Weekly recap')}
          </Text>

          <View style={styles.grid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {recap?.workoutsCompleted || 0}
              </Text>
              <Text style={styles.statLabel}>
                {t('gym.workouts', 'Workouts')}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {recap?.totalSets || 0}
              </Text>
              <Text style={styles.statLabel}>
                {t('gym.sets', 'Sets')}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {recap?.totalReps || 0}
              </Text>
              <Text style={styles.statLabel}>
                {t('gym.reps', 'Reps')}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {recap?.prCount || 0}
              </Text>
              <Text style={styles.statLabel}>
                {t('gym.prs', 'PRs')}
              </Text>
            </View>
          </View>

          <Text style={styles.volumeText}>
            {t('gym.totalVolume', 'Total volume')}: {recap?.totalVolumeKg || 0}kg
          </Text>

          <Text style={styles.volumeText}>
            {t('gym.topMuscleGroup', 'Top muscle group')}: {recap?.topMuscleGroup
              ? translateMuscleGroup(recap.topMuscleGroup, t)
              : '-'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t('gym.muscleRecovery', 'Muscle recovery')}
          </Text>

          {recovery.map(item => (
            <View key={item.muscleGroup} style={styles.recoveryRow}>
              <View style={styles.recoveryTop}>
                <Text style={styles.recoveryName}>
                  {translateMuscleGroup(item.muscleGroup, t)}
                </Text>

                <Text
                  style={[
                    styles.recoveryStatus,
                    item.status === 'ready' && styles.recoveryReady,
                  ]}
                >
                  {translateRecoveryStatus(item.status, t)}
                </Text>
              </View>

              <View style={styles.recoveryTrack}>
                <View
                  style={[
                    styles.recoveryFill,
                    {
                      width: `${item.percent}%`,
                    },
                  ]}
                />
              </View>

              <Text style={styles.recoveryText}>
                {item.status === 'fresh'
                  ? t('gym.notTrainedRecently', 'Not trained recently')
                  : `${item.hoursSince}h / ${item.recoveryHours}h`}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t('gym.gymAchievements', 'Gym achievements')}
          </Text>

          {achievements.map(item => (
            <View
              key={item.id}
              style={[
                styles.achievementRow,
                item.unlocked && styles.achievementUnlocked,
              ]}
            >
              <Text style={styles.achievementIcon}>
                {item.unlocked ? '🏆' : '🔒'}
              </Text>

              <View style={styles.achievementBody}>
                <Text style={styles.achievementTitle}>
                  {translateAchievementTitle(item.id, item.title, t)}
                </Text>

                <Text style={styles.achievementDesc}>
                  {translateAchievementDesc(item.id, item.desc, t)}
                </Text>

                <Text style={styles.achievementProgress}>
                  {item.progress}/{item.target}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.86}
          style={styles.primaryButton}
          onPress={() => navigation.navigate('GymBodyProgress')}
        >
          <Text style={styles.primaryButtonText}>
            {t('gym.bodyProgress', 'Body progress')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.86}
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('GymQuickWorkout')}
        >
          <Text style={styles.secondaryButtonText}>
            {t('gym.quickWorkout', 'Quick workout')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  kickerPill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.7)',
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 14,
  },
  kickerText: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: TEXT,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  subtitle: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 14,
    marginBottom: 14,
  },
  missedCard: {
    backgroundColor: 'rgba(250, 204, 21, 0.12)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.35)',
    padding: 14,
    marginBottom: 14,
  },
  missedTitle: {
    color: '#FACC15',
    fontSize: 18,
    fontWeight: '900',
  },
  missedText: {
    color: '#FDE68A',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
    marginBottom: 12,
  },
  cardTitle: {
    color: TEXT,
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  statBox: {
    width: '50%',
    padding: 4,
  },
  statValue: {
    color: NEON,
    fontSize: 28,
    fontWeight: '900',
  },
  statLabel: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 3,
  },
  volumeText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 8,
  },
  recoveryRow: {
    marginBottom: 13,
  },
  recoveryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  recoveryName: {
    flex: 1,
    color: TEXT,
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'capitalize',
  },
  recoveryStatus: {
    color: '#FACC15',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  recoveryReady: {
    color: NEON,
  },
  recoveryTrack: {
    height: 9,
    backgroundColor: '#1F2A38',
    borderRadius: 999,
    overflow: 'hidden',
  },
  recoveryFill: {
    height: '100%',
    backgroundColor: NEON,
  },
  recoveryText: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
  },
  achievementRow: {
    flexDirection: 'row',
    backgroundColor: '#06111D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
    padding: 12,
    marginBottom: 10,
  },
  achievementUnlocked: {
    borderColor: 'rgba(124, 255, 58, 0.4)',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementBody: {
    flex: 1,
  },
  achievementTitle: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '900',
  },
  achievementDesc: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
  },
  achievementProgress: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 5,
  },
  primaryButton: {
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: BG,
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.4)',
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: NEON,
    fontSize: 15,
    fontWeight: '900',
  },
});

export default GymInsightsScreen;