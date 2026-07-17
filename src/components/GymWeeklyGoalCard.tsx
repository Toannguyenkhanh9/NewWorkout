// FILE: src/components/GymWeeklyGoalCard.tsx
import React, {
  useCallback,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useFocusEffect,
} from '@react-navigation/native';
import {
  useTranslation,
} from 'react-i18next';

import {
  loadWeeklyRetentionStats,
  WeeklyRetentionStats,
} from '../services/gymRetention';

const BG = '#06111D';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const GymWeeklyGoalCard:
React.FC<{
  targetDays: number;
}> = ({
  targetDays,
}) => {
  const {t} = useTranslation();

  const [
    stats,
    setStats,
  ] = useState<WeeklyRetentionStats>({
    target:
      targetDays,
    completed: 0,
    percent: 0,
    remaining:
      targetDays,
    weekStreak: 0,
  });

  const reload = useCallback(
    async () => {
      const next =
        await loadWeeklyRetentionStats(
          targetDays,
        );

      setStats(next);
    },
    [
      targetDays,
    ],
  );

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>
            🔥
          </Text>
        </View>

        <View style={styles.titleBody}>
          <Text style={styles.kicker}>
            {t(
              'retention.weeklyGoalKicker',
              'THIS WEEK',
            )}
          </Text>

          <Text style={styles.title}>
            {t(
              'retention.weeklyGoal',
              'Weekly goal',
            )}
          </Text>
        </View>

        <Text style={styles.value}>
          {stats.completed}/
          {stats.target}
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width:
                `${stats.percent}%`,
            },
          ]}
        />
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.subtitle}>
          {stats.remaining > 0
            ? t(
                'retention.workoutsRemaining',
                {
                  count:
                    stats.remaining,
                  defaultValue:
                    '{{count}} workouts remaining',
                },
              )
            : t(
                'retention.goalCompleted',
                'Weekly goal completed',
              )}
        </Text>

        <Text style={styles.streak}>
          {t(
            'retention.weekStreak',
            {
              count:
                stats.weekStreak,
              defaultValue:
                '{{count}} week streak',
            },
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor:
      'rgba(11, 22, 36, 0.94)',
    borderRadius: 21,
    borderWidth: 1,
    borderColor:
      'rgba(124, 255, 58, 0.28)',
    padding: 15,
    marginTop: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor:
      'rgba(124, 255, 58, 0.13)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  icon: {
    fontSize: 19,
  },
  titleBody: {
    flex: 1,
  },
  kicker: {
    color: CYAN,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 3,
  },
  value: {
    color: NEON,
    fontSize: 22,
    fontWeight: '900',
  },
  track: {
    height: 10,
    backgroundColor:
      'rgba(148, 163, 184, 0.16)',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 13,
  },
  fill: {
    height: '100%',
    backgroundColor: NEON,
    borderRadius: 999,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    marginTop: 9,
  },
  subtitle: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '700',
  },
  streak: {
    color: '#FACC15',
    fontSize: 11,
    fontWeight: '900',
  },
});

export default GymWeeklyGoalCard;
