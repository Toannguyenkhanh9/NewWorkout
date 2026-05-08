// FILE: src/screens/WorkoutHistoryScreen.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { getWorkoutHistory, WorkoutHistoryEntry } from '../store/workoutHistory';
import { PROGRAMS } from '../data/programs';

type HistorySection = {
  title: string;
  data: WorkoutHistoryEntry[];
};

type RangeFilter = '7' | '30' | 'all';

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
    return filteredItems.reduce((sum, item) => sum + (item.durationMin || 0), 0);
  }, [filteredItems]);

  const totalWorkouts = filteredItems.length;

  const sections: HistorySection[] = useMemo(() => {
    const map: Record<string, WorkoutHistoryEntry[]> = {};

    filteredItems.forEach((item) => {
      const key = new Date(item.completedAt).toLocaleDateString();
      if (!map[key]) map[key] = [];
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
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled
        ListHeaderComponent={
          <View>
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

            <View style={styles.summaryRow}>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryValue}>{totalWorkouts}</Text>
                <Text style={styles.summaryLabel}>
                  {t('history.totalWorkouts', 'Workouts')}
                </Text>
              </View>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryValue}>{totalMinutes}</Text>
                <Text style={styles.summaryLabel}>
                  {t('history.minutes', 'Minutes')}
                </Text>
              </View>
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.workoutName}</Text>
              <Text style={styles.meta}>
                {getProgramTitle(item.programId)} •{' '}
                {new Date(item.completedAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>

            {item.durationMin ? (
              <Text style={styles.duration}>
                {item.durationMin} {t('workouts.min', 'min')}
              </Text>
            ) : null}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
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
    backgroundColor: '#F6F7FB',
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },

  filterWrap: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  chipText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#065F46',
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryValue: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 22,
  },
  summaryLabel: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },

  sectionTitle: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 8,
    backgroundColor: '#F6F7FB',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  name: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 15,
  },
  meta: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },
  duration: {
    color: '#0F766E',
    fontWeight: '900',
    fontSize: 13,
    marginLeft: 8,
  },

  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyTitle: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: '#64748B',
    lineHeight: 20,
  },
});

export default WorkoutHistoryScreen;