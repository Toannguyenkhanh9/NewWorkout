// FILE: src/components/ProgressDashboardCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DashboardStats } from '../store/progressStats';

type Props = {
  stats: DashboardStats | null;
  t: (key: string, defaultValue?: string) => string;
};

export const ProgressDashboardCard: React.FC<Props> = ({ stats, t }) => {
  if (!stats) return null;

  const lastWorkoutLabel = stats.lastWorkoutAt
    ? new Date(stats.lastWorkoutAt).toLocaleDateString()
    : '—';

  const items = [
    { label: t('dashboard.streak', 'Streak'), value: `${stats.streakDays}` },
    { label: t('dashboard.thisWeek', 'This week'), value: `${stats.workoutsThisWeek}` },
    { label: t('dashboard.total', 'Total'), value: `${stats.totalWorkouts}` },
    { label: t('dashboard.completedPrograms', 'Completed'), value: `${stats.completedPrograms}` },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t('dashboard.title', 'Progress Dashboard')}</Text>

      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.label} style={styles.metric}>
            <Text style={styles.metricValue}>{item.value}</Text>
            <Text style={styles.metricLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.lastWorkout}>
        {t('dashboard.lastWorkout', 'Last workout')}: {lastWorkoutLabel}
      </Text>
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
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  title: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metric: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricValue: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 20,
  },
  metricLabel: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },
  lastWorkout: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
});

export default ProgressDashboardCard;