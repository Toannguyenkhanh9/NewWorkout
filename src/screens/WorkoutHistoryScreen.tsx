// FILE: src/screens/WorkoutHistoryScreen.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  getWorkoutHistory,
  WorkoutHistoryEntry,
} from '../store/workoutHistory';
import { PROGRAMS } from '../data/programs';

type HistorySection = {
  title: string;
  data: WorkoutHistoryEntry[];
};

type RangeFilter = '7' | '30' | 'all';

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const FilterChip: React.FC<{
  active: boolean;
  label: string;
  onPress: () => void;
}> = ({ active, label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, active && styles.chipActive]}
    activeOpacity={0.85}
  >
    <Text style={[styles.chipText, active && styles.chipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const WorkoutHistoryScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [items, setItems] = useState<WorkoutHistoryEntry[]>([]);
  const [range, setRange] = useState<RangeFilter>('7');

  useEffect(() => {
    navigation.setOptions({
      title: t('history.screenTitle', 'Workout History'),
      headerStyle: {
        backgroundColor: BG,
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: '900',
      },
    });
  }, [navigation, t]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setItems(await getWorkoutHistory());
      })();
    }, []),
  );

  const filteredItems = useMemo(() => {
    if (range === 'all') return items;

    const days = range === '7' ? 7 : 30;
    const from = Date.now() - days * 24 * 60 * 60 * 1000;

    return items.filter((item) => item.completedAt >= from);
  }, [items, range]);

  const totalMinutes = useMemo(() => {
    return filteredItems.reduce(
      (sum, item) => sum + (item.durationMin || 0),
      0,
    );
  }, [filteredItems]);

  const totalWorkouts = filteredItems.length;

  const sections: HistorySection[] = useMemo(() => {
    const map: Record<string, WorkoutHistoryEntry[]> = {};

    filteredItems.forEach((item) => {
      const key = new Date(item.completedAt).toLocaleDateString();

      if (!map[key]) {
        map[key] = [];
      }

      map[key].push(item);
    });

    return Object.keys(map).map((key) => ({
      title: key,
      data: map[key],
    }));
  }, [filteredItems]);

  const getProgramTitle = (programId: string) => {
    const program = PROGRAMS.find((p) => p.id === programId);
    return program ? t(program.titleKey) : programId;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <View style={styles.kickerPill}>
                <Text style={styles.kickerText}>HISTORY</Text>
              </View>

              <Text style={styles.title}>
                {t('history.screenTitle', 'Workout History')}
              </Text>

              <Text style={styles.subtitle}>
                {t(
                  'history.subtitle',
                  'Theo dõi các buổi tập đã hoàn thành, tổng thời gian và tiến độ gần đây của bạn.',
                )}
              </Text>
            </View>

            <View style={styles.filterCard}>
              <Text style={styles.filterTitle}>
                {t('history.filterTitle', 'Time range')}
              </Text>

              <View style={styles.filterWrap}>
                <FilterChip
                  active={range === '7'}
                  label={t('history.filter7', '7 days')}
                  onPress={() => setRange('7')}
                />

                <FilterChip
                  active={range === '30'}
                  label={t('history.filter30', '30 days')}
                  onPress={() => setRange('30')}
                />

                <FilterChip
                  active={range === 'all'}
                  label={t('history.filterAll', 'All')}
                  onPress={() => setRange('all')}
                />
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryIcon}>🔥</Text>
                <Text style={styles.summaryValue}>{totalWorkouts}</Text>
                <Text style={styles.summaryLabel}>
                  {t('history.totalWorkouts', 'Workouts')}
                </Text>
              </View>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryIcon}>⏱️</Text>
                <Text style={styles.summaryValue}>{totalMinutes}</Text>
                <Text style={styles.summaryLabel}>
                  {t('history.minutes', 'Minutes')}
                </Text>
              </View>
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <View style={styles.indexCircle}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name} numberOfLines={1}>
                {item.workoutName}
              </Text>

              <Text style={styles.meta} numberOfLines={1}>
                {getProgramTitle(item.programId)} •{' '}
                {new Date(item.completedAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>

            {item.durationMin ? (
              <View style={styles.durationPill}>
                <Text style={styles.duration}>
                  {item.durationMin} {t('workouts.min', 'min')}
                </Text>
              </View>
            ) : null}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>🏋️</Text>
            </View>

            <Text style={styles.emptyTitle}>
              {t('history.title', 'Workout History')}
            </Text>

            <Text style={styles.emptyText}>
              {t('history.empty', 'No completed workouts yet.')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 160,
  },

  glowTop: {
    position: 'absolute',
    top: -90,
    right: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(25, 230, 210, 0.22)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: 60,
    left: -110,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },

  hero: {
    marginBottom: 18,
  },
  kickerPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.75)',
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    marginBottom: 14,
  },
  kickerText: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  title: {
    color: TEXT,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  subtitle: {
    color: '#D8E4F0',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },

  filterCard: {
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    marginBottom: 14,
  },
  filterTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 10,
  },
  filterWrap: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: CARD_2,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
  },
  chipActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  chipText: {
    color: '#CBD5E1',
    fontWeight: '800',
    fontSize: 13,
  },
  chipTextActive: {
    color: BG,
    fontWeight: '900',
  },

  summaryRow: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginBottom: 16,
  },
  summaryBox: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
  },
  summaryIcon: {
    fontSize: 21,
    marginBottom: 7,
  },
  summaryValue: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 25,
  },
  summaryLabel: {
    color: MUTED,
    marginTop: 5,
    fontSize: 12,
    fontWeight: '800',
  },

  sectionHeader: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 18,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 13,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  indexCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  indexText: {
    color: NEON,
    fontWeight: '900',
    fontSize: 13,
  },
  name: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 15,
  },
  meta: {
    color: MUTED,
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },
  durationPill: {
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.35)',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 6,
    marginLeft: 8,
  },
  duration: {
    color: CYAN,
    fontWeight: '900',
    fontSize: 11,
  },

  emptyBox: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyIconText: {
    fontSize: 29,
  },
  emptyTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    color: MUTED,
    lineHeight: 21,
    textAlign: 'center',
  },
});

export default WorkoutHistoryScreen;