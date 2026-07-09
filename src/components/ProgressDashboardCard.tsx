// FILE: src/components/ProgressDashboardCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DashboardStats } from '../store/progressStats';

type Props = {
  stats: DashboardStats | null;
  t: (key: string, defaultValue?: string) => string;
};

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const ProgressDashboardCard: React.FC<Props> = ({ stats, t }) => {
  if (!stats) return null;

  const lastWorkoutLabel = stats.lastWorkoutAt
    ? new Date(stats.lastWorkoutAt).toLocaleDateString()
    : '—';

  const items = [
    {
      icon: '🔥',
      label: t('dashboard.streak', 'Streak'),
      value: `${stats.streakDays}`,
      accent: NEON,
    },
    {
      icon: '📅',
      label: t('dashboard.thisWeek', 'This week'),
      value: `${stats.workoutsThisWeek}`,
      accent: CYAN,
    },
    {
      icon: '💪',
      label: t('dashboard.total', 'Total'),
      value: `${stats.totalWorkouts}`,
      accent: '#F59E0B',
    },
    {
      icon: '🏆',
      label: t('dashboard.completedPrograms', 'Completed'),
      value: `${stats.completedPrograms}`,
      accent: '#A78BFA',
    },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.glow} />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>DASHBOARD</Text>

          <Text style={styles.title}>
            {t('dashboard.title', 'Progress Dashboard')}
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>📈</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.label} style={styles.metric}>
            <View
              style={[
                styles.metricIcon,
                {
                  borderColor: item.accent,
                  backgroundColor: `${item.accent}22`,
                },
              ]}
            >
              <Text style={styles.metricIconText}>{item.icon}</Text>
            </View>

            <Text style={styles.metricValue}>{item.value}</Text>
            <Text style={styles.metricLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.lastWorkoutBox}>
        <View style={styles.lastIcon}>
          <Text style={styles.lastIconText}>⏱️</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.lastLabel}>
            {t('dashboard.lastWorkout', 'Last workout')}
          </Text>

          <Text style={styles.lastWorkout}>
            {lastWorkoutLabel}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(124, 255, 58, 0.10)',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  kicker: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 19,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 255, 58, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 22,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metric: {
    width: '48%',
    backgroundColor: CARD_2,
    borderRadius: 18,
    paddingVertical: 13,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
  },
  metricIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },
  metricIconText: {
    fontSize: 19,
  },
  metricValue: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 24,
  },
  metricLabel: {
    color: MUTED,
    marginTop: 4,
    fontSize: 12,
    fontWeight: '800',
  },

  lastWorkoutBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 230, 210, 0.10)',
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.28)',
    marginTop: 2,
  },
  lastIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(25, 230, 210, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  lastIconText: {
    fontSize: 20,
  },
  lastLabel: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  lastWorkout: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 4,
  },
});

export default ProgressDashboardCard;