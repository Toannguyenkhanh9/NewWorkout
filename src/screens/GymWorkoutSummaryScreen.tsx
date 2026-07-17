// FILE: src/screens/GymWorkoutSummaryScreen.tsx
import React from 'react';
import {
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  useTranslation,
} from 'react-i18next';

import type {
  GymWorkoutSummary,
} from '../services/gymRetention';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const formatDuration = (
  seconds: number,
) => {
  const min =
    Math.max(
      1,
      Math.round(
        seconds / 60,
      ),
    );

  return `${min}`;
};

const Stat: React.FC<{
  value: string | number;
  label: string;
}> = ({
  value,
  label,
}) => {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
};

export const GymWorkoutSummaryScreen:
React.FC = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<any>();
  const route =
    useRoute<any>();

  const summary =
    route.params
      ?.summary as
      | GymWorkoutSummary
      | undefined;

  if (!summary) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          {t(
            'retention.summaryMissing',
            'Workout summary is not available.',
          )}
        </Text>
      </View>
    );
  }

  const shareSummary =
    async () => {
      const minutes =
        formatDuration(
          summary.durationSec,
        );

      await Share.share({
        message: t(
          'retention.shareMessage',
          {
            title:
              summary.dayTitle,
            minutes,
            sets:
              summary.totalSets,
            volume:
              summary.totalVolumeKg,
            defaultValue:
              'I completed {{title}} in {{minutes}} minutes with {{sets}} sets and {{volume}} kg total volume on GymForge.',
          },
        ),
      });
    };

  const backToGym = () => {
    const parent =
      navigation.getParent();

    if (parent) {
      parent.navigate('Gym');
      return;
    }

    navigation.popToTop();
  };

  const viewProgress = () => {
    const parent =
      navigation.getParent();

    if (parent) {
      parent.navigate(
        'Progress',
      );
      return;
    }

    navigation.navigate(
      'GymProgressChart',
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BG}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.hero}>
          <View style={styles.successIcon}>
            <Text
              style={
                styles.successIconText
              }
            >
              ✓
            </Text>
          </View>

          <Text style={styles.kicker}>
            {t(
              'retention.summaryKicker',
              'WORKOUT COMPLETE',
            )}
          </Text>

          <Text style={styles.title}>
            {t(
              'retention.summaryTitle',
              'Excellent work!',
            )}
          </Text>

          <Text style={styles.dayTitle}>
            {summary.dayTitle}
          </Text>

          <Text style={styles.subtitle}>
            {t(
              'retention.summarySubtitle',
              'Your workout has been saved and your weekly progress has been updated.',
            )}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <Stat
            value={formatDuration(
              summary.durationSec,
            )}
            label={t(
              'retention.minutes',
              'Minutes',
            )}
          />

          <Stat
            value={
              summary.totalSets
            }
            label={t(
              'gym.sets',
              'Sets',
            )}
          />

          <Stat
            value={
              summary.totalReps
            }
            label={t(
              'gym.reps',
              'Reps',
            )}
          />

          <Stat
            value={
              summary.totalVolumeKg
            }
            label={t(
              'retention.volumeKg',
              'Volume kg',
            )}
          />
        </View>

        <View style={styles.weekCard}>
          <View style={styles.weekTop}>
            <Text style={styles.cardTitle}>
              {t(
                'retention.weeklyProgress',
                'Weekly progress',
              )}
            </Text>

            <Text style={styles.weekValue}>
              {summary.weekly.completed}/
              {summary.weekly.target}
            </Text>
          </View>

          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                {
                  width:
                    `${summary.weekly.percent}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.weekText}>
            {t(
              'retention.weekStreak',
              {
                count:
                  summary.weekly.weekStreak,
                defaultValue:
                  '{{count}} week streak',
              },
            )}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t(
              'retention.newRecords',
              'New records',
            )}
          </Text>

          {summary.newRecords.length >
          0 ? (
            summary.newRecords
              .slice(0, 5)
              .map(
                (
                  item,
                  index,
                ) => (
                  <View
                    key={`${item.exerciseName}-${index}`}
                    style={
                      styles.recordRow
                    }
                  >
                    <Text
                      style={
                        styles.recordIcon
                      }
                    >
                      🏆
                    </Text>

                    <View
                      style={
                        styles.recordBody
                      }
                    >
                      <Text
                        style={
                          styles.recordName
                        }
                      >
                        {item.exerciseName ||
                          t(
                            'gym.exercise',
                            'Exercise',
                          )}
                      </Text>

                      <Text
                        style={
                          styles.recordValue
                        }
                      >
                        {item.weightKg}
                        kg ×{' '}
                        {item.reps}
                      </Text>
                    </View>
                  </View>
                ),
              )
          ) : (
            <Text style={styles.emptyText}>
              {t(
                'retention.noNewRecords',
                'No new personal record today. Consistency still counts.',
              )}
            </Text>
          )}
        </View>

        {summary.readiness ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {t(
                'retention.readinessResult',
                'Today’s readiness',
              )}
            </Text>

            <Text style={styles.readinessValue}>
              {summary.readiness.score}/5
            </Text>

            <Text style={styles.emptyText}>
              {t(
                summary.readiness.messageKey,
                'Follow today’s adjusted recommendation.',
              )}
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.86}
          style={styles.primaryButton}
          onPress={shareSummary}
        >
          <Text
            style={
              styles.primaryButtonText
            }
          >
            {t(
              'retention.share',
              'Share achievement',
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.86}
          style={
            styles.secondaryButton
          }
          onPress={viewProgress}
        >
          <Text
            style={
              styles.secondaryButtonText
            }
          >
            {t(
              'retention.viewProgress',
              'View progress',
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.86}
          style={styles.textButton}
          onPress={backToGym}
        >
          <Text
            style={
              styles.textButtonText
            }
          >
            {t(
              'retention.backToGym',
              'Back to Gym',
            )}
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
    paddingBottom: 70,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 18,
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: NEON,
    shadowOpacity: 0.34,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
  },
  successIconText: {
    color: BG,
    fontSize: 35,
    fontWeight: '900',
  },
  kicker: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginTop: 17,
  },
  title: {
    color: TEXT,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    marginTop: 7,
    textAlign: 'center',
  },
  dayTitle: {
    color: NEON,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 7,
    textAlign: 'center',
  },
  subtitle: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  stat: {
    width: '50%',
    padding: 5,
  },
  statValue: {
    color: NEON,
    fontSize: 27,
    fontWeight: '900',
    backgroundColor: CARD,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor:
      'rgba(148, 163, 184, 0.15)',
    paddingTop: 13,
    paddingHorizontal: 13,
  },
  statLabel: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '800',
    backgroundColor: CARD,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor:
      'rgba(148, 163, 184, 0.15)',
    paddingBottom: 13,
    paddingHorizontal: 13,
    paddingTop: 3,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor:
      'rgba(148, 163, 184, 0.15)',
    padding: 14,
    marginTop: 13,
  },
  weekCard: {
    backgroundColor:
      'rgba(124, 255, 58, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor:
      'rgba(124, 255, 58, 0.34)',
    padding: 14,
    marginTop: 13,
  },
  weekTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    flex: 1,
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
  },
  weekValue: {
    color: NEON,
    fontSize: 19,
    fontWeight: '900',
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor:
      'rgba(148, 163, 184, 0.17)',
    overflow: 'hidden',
    marginTop: 12,
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: NEON,
  },
  weekText: {
    color: '#FACC15',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 9,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG,
    borderRadius: 15,
    padding: 11,
    marginTop: 9,
  },
  recordIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  recordBody: {
    flex: 1,
  },
  recordName: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '900',
  },
  recordValue: {
    color: NEON,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 3,
  },
  emptyText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  readinessValue: {
    color: CYAN,
    fontSize: 26,
    fontWeight: '900',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  primaryButtonText: {
    color: BG,
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor:
      'rgba(124, 255, 58, 0.45)',
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: NEON,
    fontSize: 14,
    fontWeight: '900',
  },
  textButton: {
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: 3,
  },
  textButtonText: {
    color: MUTED,
    fontSize: 14,
    fontWeight: '900',
  },
  notFound: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
    margin: 18,
  },
});

export default GymWorkoutSummaryScreen;
