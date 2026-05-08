// FILE: src/components/WorkoutHistoryCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WorkoutHistoryEntry } from '../store/workoutHistory';

type Props = {
  items: WorkoutHistoryEntry[];
  weeklyCount: number;
  weeklyMinutes: number;
  onPressViewAll?: () => void;
  t: (key: string, defaultValue?: string, options?: any) => string;
};

export const WorkoutHistoryCard: React.FC<Props> = ({
  items,
  weeklyCount,
  weeklyMinutes,
  onPressViewAll,
  t,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          {t('history.title', 'Workout History')}
        </Text>

        {onPressViewAll ? (
          <TouchableOpacity onPress={onPressViewAll}>
            <Text style={styles.viewAll}>
              {t('history.viewAll', 'View all')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>{weeklyCount}</Text>
          <Text style={styles.summaryLabel}>
            {t('history.thisWeek', 'This week')}
          </Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryValue}>{weeklyMinutes}</Text>
          <Text style={styles.summaryLabel}>
            {t('history.minutes', 'Minutes')}
          </Text>
        </View>
      </View>

      {items.length === 0 ? (
        <Text style={styles.empty}>
          {t('history.empty', 'No completed workouts yet.')}
        </Text>
      ) : (
        items.slice(0, 5).map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.workoutName}</Text>
              <Text style={styles.meta}>
                {new Date(item.completedAt).toLocaleDateString()}
              </Text>
            </View>

            <Text style={styles.duration}>
              {item.durationMin ? `${item.durationMin} ${t('workouts.min', 'min')}` : ''}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
  },
  viewAll: {
    color: '#0F766E',
    fontWeight: '800',
    fontSize: 13,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryValue: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '900',
  },
  summaryLabel: {
    color: '#64748B',
    marginTop: 4,
    fontWeight: '700',
    fontSize: 12,
  },
  empty: {
    color: '#64748B',
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F7',
  },
  name: {
    color: '#0F172A',
    fontWeight: '800',
  },
  meta: {
    color: '#64748B',
    marginTop: 2,
    fontSize: 12,
  },
  duration: {
    color: '#0F766E',
    fontWeight: '800',
    fontSize: 12,
    marginLeft: 8,
  },
});

export default WorkoutHistoryCard;