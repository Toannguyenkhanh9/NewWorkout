// FILE: src/screens/GymProgressChartScreen.tsx
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
  ScrollView,
  DimensionValue
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  GymWorkoutHistoryEntry,
  loadGymWorkoutHistory,
} from '../store/gymProgress';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const parseWeight = (value?: string) => {
  const n = Number(String(value || '').replace(',', '.'));

  return Number.isFinite(n) ? n : 0;
};

const formatDate = (time: number) => {
  const d = new Date(time);

  return `${d.getDate()}/${d.getMonth() + 1}`;
};

type ExerciseOption = {
  id: string;
  name: string;
};

type ChartPoint = {
  date: string;
  weight: number;
  reps: number;
};

export const GymProgressChartScreen: React.FC = () => {
  const { t } = useTranslation();

  const [history, setHistory] = useState<GymWorkoutHistoryEntry[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      loadGymWorkoutHistory().then(items => {
        if (!mounted) return;

        setHistory(items);

        const firstExercise =
          items[0]?.exercises?.[0]?.exerciseId || '';

        setSelectedExerciseId(prev => prev || firstExercise);
      });

      return () => {
        mounted = false;
      };
    }, []),
  );

  const exerciseOptions = useMemo<ExerciseOption[]>(() => {
    const map = new Map<string, string>();

    history.forEach(entry => {
      entry.exercises.forEach(exercise => {
        if (!map.has(exercise.exerciseId)) {
          map.set(exercise.exerciseId, exercise.exerciseName);
        }
      });
    });

    return Array.from(map.entries()).map(([id, name]) => ({
      id,
      name,
    }));
  }, [history]);

  const selectedName =
    exerciseOptions.find(item => item.id === selectedExerciseId)?.name ||
    t('gym.selectExercise', 'Select exercise');

  const chartPoints = useMemo<ChartPoint[]>(() => {
    return history
      .slice()
      .sort((a, b) => a.completedAt - b.completedAt)
      .map(entry => {
        const exercise = entry.exercises.find(
          item => item.exerciseId === selectedExerciseId,
        );

        if (!exercise) return null;

        const bestSet = exercise.sets.reduce(
          (best, item) => {
            const weight = parseWeight(item.weightKg);
            const reps = Number(item.reps || 0);

            if (weight > best.weight) {
              return {
                weight,
                reps,
              };
            }

            return best;
          },
          {
            weight: 0,
            reps: 0,
          },
        );

        return {
          date: formatDate(entry.completedAt),
          weight: bestSet.weight,
          reps: bestSet.reps,
        };
      })
      .filter((item): item is ChartPoint => !!item && item.weight > 0)
      .slice(-12);
  }, [history, selectedExerciseId]);

  const maxWeight = Math.max(
    1,
    ...chartPoints.map(item => item.weight),
  );

  const latest = chartPoints[chartPoints.length - 1];
  const first = chartPoints[0];

  const improvement =
    latest && first ? latest.weight - first.weight : 0;

  return (
    <View style={styles.container}>
      <FlatList
        data={chartPoints}
        keyExtractor={(item, index) => `${item.date}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>
                {t('gym.progressChart', 'PROGRESS CHART')}
              </Text>
            </View>

            <Text style={styles.title}>
              {t('gym.progressTitle', 'Gym progress')}
            </Text>

            <Text style={styles.subtitle}>
              {t(
                'gym.progressSubtitle',
                'Track your best recorded weight for each exercise over time.',
              )}
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.exerciseTabs}
            >
              {exerciseOptions.map(item => {
                const active = item.id === selectedExerciseId;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.86}
                    style={[
                      styles.exerciseTab,
                      active && styles.exerciseTabActive,
                    ]}
                    onPress={() => setSelectedExerciseId(item.id)}
                  >
                    <Text
                      style={[
                        styles.exerciseTabText,
                        active && styles.exerciseTabTextActive,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>
                {selectedName}
              </Text>

              <Text style={styles.summaryText}>
                {latest
                  ? `${t('gym.latestBest', 'Latest best')}: ${latest.weight}kg × ${latest.reps}`
                  : t('gym.noProgressData', 'No progress data yet.')}
              </Text>

              {chartPoints.length >= 2 ? (
                <Text style={styles.improvementText}>
                  {improvement >= 0 ? '+' : ''}
                  {improvement}kg {t('gym.fromFirstRecord', 'from first record')}
                </Text>
              ) : null}
            </View>

            <Text style={styles.chartTitle}>
              {t('gym.bestWeightTrend', 'Best weight trend')}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
const barWidth = `${Math.max(
  8,
  Math.round((item.weight / maxWeight) * 100),
)}%` as DimensionValue;

          return (
            <View style={styles.barRow}>
              <Text style={styles.barDate}>{item.date}</Text>

              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: barWidth,
                    },
                  ]}
                />
              </View>

              <Text style={styles.barValue}>
                {item.weight}kg
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              {t('gym.noProgressData', 'No progress data yet.')}
            </Text>

            <Text style={styles.emptyText}>
              {t(
                'gym.noProgressDataText',
                'Complete a gym workout and enter kg/reps to build your chart.',
              )}
            </Text>
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
  exerciseTabs: {
    marginTop: 16,
  },
  exerciseTab: {
    backgroundColor: CARD,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    paddingHorizontal: 13,
    paddingVertical: 9,
    marginRight: 8,
  },
  exerciseTabActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  exerciseTabText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '900',
  },
  exerciseTabTextActive: {
    color: BG,
  },
  summaryCard: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    padding: 14,
    marginTop: 16,
  },
  summaryTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
  },
  summaryText: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 6,
  },
  improvementText: {
    color: NEON,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 8,
  },
  chartTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 22,
    marginBottom: 12,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  barDate: {
    width: 48,
    color: MUTED,
    fontSize: 12,
    fontWeight: '900',
  },
  barTrack: {
    flex: 1,
    height: 18,
    backgroundColor: '#1F2A38',
    borderRadius: 999,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  barFill: {
    height: '100%',
    backgroundColor: NEON,
    borderRadius: 999,
  },
  barValue: {
    width: 64,
    color: TEXT,
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'right',
  },
  emptyBox: {
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.3)',
    marginTop: 18,
  },
  emptyTitle: {
    color: '#FACC15',
    fontSize: 15,
    fontWeight: '900',
  },
  emptyText: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
});

export default GymProgressChartScreen;