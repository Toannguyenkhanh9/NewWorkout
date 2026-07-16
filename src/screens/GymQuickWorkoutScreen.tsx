// FILE: src/screens/GymQuickWorkoutScreen.tsx
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
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  loadUserGymProfile,
  UserGymProfile,
} from '../data/gymSmartPlan';

import {
  buildQuickGymDay,
  GymEquipmentMode,
  loadGymEquipmentMode,
  QuickWorkoutTarget,
  saveGymEquipmentMode,
} from '../services/gymAdvanced';

import { gateWorkout } from '../ads/adGate';
import { useSubscription } from '../iap/SubscriptionProvider';

import {
  translateEquipmentMode,
  translateExerciseName,
  translateExerciseNote,
  translateQuickTarget,
} from '../utils/gymI18n';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const TARGETS: QuickWorkoutTarget[] = [
  'full_body',
  'chest',
  'back',
  'legs',
  'arms',
  'core',
  'fat_burn',
];

const EQUIPMENTS: GymEquipmentMode[] = [
  'full_gym',
  'machines',
  'dumbbell_only',
  'no_barbell',
  'home',
];

const targetFallback: Record<QuickWorkoutTarget, string> = {
  full_body: 'Full Body',
  chest: 'Chest',
  back: 'Back',
  legs: 'Legs',
  arms: 'Arms',
  core: 'Core',
  fat_burn: 'Fat Burn',
};

const equipmentFallback: Record<GymEquipmentMode, string> = {
  full_gym: 'Full gym',
  machines: 'Machines',
  dumbbell_only: 'Dumbbell only',
  no_barbell: 'No barbell',
  home: 'Home',
};

export const GymQuickWorkoutScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { isPremium } =
    useSubscription?.() || { isPremium: false };

  const [target, setTarget] =
    useState<QuickWorkoutTarget>('full_body');

  const [equipment, setEquipment] =
    useState<GymEquipmentMode>('full_gym');

  const [profile, setProfile] = useState<UserGymProfile | null>(null);
  const [startingWorkout, setStartingWorkout] = useState(false);

  const reload = useCallback(async () => {
    const [savedEquipment, savedProfile] = await Promise.all([
      loadGymEquipmentMode(),
      loadUserGymProfile(),
    ]);

    setEquipment(savedEquipment);
    setProfile(savedProfile);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const day = useMemo(() => {
    return buildQuickGymDay(target, equipment, profile);
  }, [target, equipment, profile]);

  const startQuickWorkout = async () => {
    if (startingWorkout) {
      return;
    }

    try {
      setStartingWorkout(true);

      if (!isPremium) {
        const rewardResult = await gateWorkout({
          isPremium,
          startTrialOnFirstUse: false,
        });

        if (rewardResult === 'closed') {
          Alert.alert(
            t('ads.rewardRequiredTitle', 'Watch the full ad'),
            t(
              'ads.need_full',
              'You need to watch the entire ad to continue.',
            ),
          );
          return;
        }

        if (rewardResult === 'not_ready') {
          Alert.alert(
            t('ads.not_ready_title', 'Ad not ready'),
            t(
              'ads.not_ready',
              'Ad is loading. Please try again in a few seconds.',
            ),
          );
          return;
        }

        if (rewardResult === 'error') {
          Alert.alert(
            t('ads.load_failed_title', 'Unable to load ad'),
            t(
              'ads.load_failed',
              'Unable to load the ad. Please check your connection and try again.',
            ),
          );
          return;
        }
      }

      navigation.navigate('GymWorkoutDay', {
        programId: 'quick-gym',
        dayId: `${day.id}-${Date.now()}`,
        plannedDay: day,
        profile,
        rewardedStartGranted: true,
      });
    } finally {
      setStartingWorkout(false);
    }
  };

  const selectEquipment = async (mode: GymEquipmentMode) => {
    setEquipment(mode);
    await saveGymEquipmentMode(mode);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <FlatList
        data={day.exercises}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>
                {t('gym.quickWorkoutKicker', {
                  defaultValue: 'QUICK WORKOUT',
                })}
              </Text>
            </View>

            <Text style={styles.title}>
              {t('gym.quickWorkout', {
                defaultValue: 'Quick workout',
              })}
            </Text>

            <Text style={styles.subtitle}>
              {t('gym.quickWorkoutSubtitle', {
                defaultValue:
                  'Create a fast gym session based on target muscle and available equipment.',
              })}
            </Text>

            <Text style={styles.sectionTitle}>
              {t('gym.targetMuscle', {
                defaultValue: 'Target muscle',
              })}
            </Text>

            <View style={styles.chips}>
              {TARGETS.map(item => {
                const active = item === target;

                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.86}
                    style={[
                      styles.chip,
                      active && styles.chipActive,
                    ]}
                    onPress={() => setTarget(item)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        active && styles.chipTextActive,
                      ]}
                    >
                      {translateQuickTarget(
                        item,
                        t,
                        targetFallback[item],
                      )}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>
              {t('gym.availableEquipment', {
                defaultValue: 'Available equipment',
              })}
            </Text>

            <View style={styles.chips}>
              {EQUIPMENTS.map(item => {
                const active = item === equipment;

                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.86}
                    style={[
                      styles.chip,
                      active && styles.chipActive,
                    ]}
                    onPress={() => selectEquipment(item)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        active && styles.chipTextActive,
                      ]}
                    >
                      {translateEquipmentMode(
                        item,
                        t,
                        equipmentFallback[item],
                      )}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.planCard}>
              <Text style={styles.planTitle}>
                {t(`gym.quickPlanTitles.${target}`, {
                  defaultValue: day.title,
                })}
              </Text>

              <Text style={styles.planText}>
                {day.durationMin}{' '}
                {t('workouts.min', { defaultValue: 'min' })} •{' '}
                {day.exercises.length}{' '}
                {t('gym.exercises', { defaultValue: 'exercises' })}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.86}
              style={[
                styles.startButton,
                startingWorkout && styles.buttonDisabled,
              ]}
              onPress={startQuickWorkout}
              disabled={startingWorkout}
            >
              {startingWorkout ? (
                <View style={styles.startButtonRow}>
                  <ActivityIndicator
                    color={BG}
                    style={styles.startButtonSpinner}
                  />
                  <Text style={styles.startButtonText}>
                    {t('ads.loading', {
                      defaultValue: 'Loading ad...',
                    })}
                  </Text>
                </View>
              ) : (
                <Text style={styles.startButtonText}>
                  {t('gym.startQuickWorkout', {
                    defaultValue: 'Start quick workout',
                  })}
                </Text>
              )}
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>
              {t('gym.exercisePreview', {
                defaultValue: 'Exercise preview',
              })}
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.exerciseCard}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>
                {index + 1}
              </Text>
            </View>

            <View style={styles.exerciseBody}>
              <Text style={styles.exerciseName}>
                {translateExerciseName(item, t)}
              </Text>

              <Text style={styles.exerciseMeta}>
                {item.sets}{' '}
                {t('gym.sets', { defaultValue: 'sets' })} × {item.reps}
              </Text>

              <Text style={styles.exerciseNote}>
                {translateExerciseNote(item, t)}
              </Text>
            </View>
          </View>
        )}
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
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 20,
    marginBottom: 10,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: CARD,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  chipText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '900',
  },
  chipTextActive: {
    color: BG,
  },
  planCard: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.24)',
    padding: 14,
    marginTop: 12,
  },
  planTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '900',
  },
  planText: {
    color: MUTED,
    fontSize: 13,
    marginTop: 6,
  },
  startButton: {
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  startButtonText: {
    color: BG,
    fontSize: 15,
    fontWeight: '900',
  },
  startButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonSpinner: {
    marginRight: 8,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 14,
    marginBottom: 10,
  },
  exerciseNumber: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(124, 255, 58, 0.15)',
    borderWidth: 1,
    borderColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    color: NEON,
    fontWeight: '900',
  },
  exerciseBody: {
    flex: 1,
  },
  exerciseName: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '900',
  },
  exerciseMeta: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 5,
  },
  exerciseNote: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
});

export default GymQuickWorkoutScreen;
