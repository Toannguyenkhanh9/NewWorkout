// FILE: src/components/TodayGymWorkoutCard.tsx
import React, {
  useCallback,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import type {
  SmartGymDay,
  TrainingDaysPerWeek,
} from '../data/gymSmartPlan';

import {
  loadGymWorkoutHistory,
} from '../store/gymProgress';

import {
  buildTodayGymWorkout,
  TodayGymWorkoutInfo,
} from '../services/gymToday';
import { useTranslation } from 'react-i18next';

const BG = '#06111D';
const CARD = '#071B2B';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';
const YELLOW = '#FACC15';

type Props = {
  planId: string;
  days: SmartGymDay[];
  daysPerWeek: TrainingDaysPerWeek;
  onStartWorkout: (day: SmartGymDay) => void;
  onQuickWorkout: () => void;
};

const TodayGymWorkoutCard: React.FC<Props> = ({
  planId,
  days,
  daysPerWeek,
  onStartWorkout,
  onQuickWorkout,
}) => {
      const { t } = useTranslation();
  const [info, setInfo] =
    useState<TodayGymWorkoutInfo | null>(null);

  const reload = useCallback(async () => {
    const history = await loadGymWorkoutHistory();

    const next = buildTodayGymWorkout({
      planId,
      days,
      daysPerWeek,
      history,
    });

    setInfo(next);
  }, [planId, days, daysPerWeek]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  if (!info) {
    return null;
  }

  const isWorkout = info.status === 'workout';
  const isCompleted = info.status === 'completed';
  const isRest = info.status === 'rest';

  return (
    <View
      style={[
        styles.card,
        isCompleted && styles.cardCompleted,
        isRest && styles.cardRest,
      ]}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.kicker}>
            {t('gym.todaysWorkoutKicker', "TODAY'S GYM WORKOUT")}
          </Text>

          <Text style={styles.todayLabel}>
            {info.todayLabel}
          </Text>
        </View>

        <View
          style={[
            styles.statusPill,
            isCompleted && styles.statusPillCompleted,
            isRest && styles.statusPillRest,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isCompleted && styles.statusTextCompleted,
              isRest && styles.statusTextRest,
            ]}
          >
            {isWorkout
              ? t('gym.ready', 'Ready')
              : isCompleted
                ? t('gym.completed', 'Completed')
                : t('gym.recovery', 'Recovery')}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>
        {isRest
          ? t('gym.recoveryDay', info.title)
          : info.title}
      </Text>

      <Text style={styles.subtitle}>
        {info.subtitle}
      </Text>

      {isRest && info.nextDay ? (
        <View style={styles.nextBox}>
          <Text style={styles.nextKicker}>
            {t('gym.nextWorkout', 'Next workout')}
          </Text>

          <Text style={styles.nextTitle}>
            {info.nextDay.title}
          </Text>

          <Text style={styles.nextText}>
            {info.nextLabel} • {info.nextDay.durationMin}{' '}
            {t('workouts.min', 'min')} • {info.nextDay.exercises.length}{' '}
            {t('gym.exercises', 'exercises')}
          </Text>
        </View>
      ) : null}

      <View style={styles.buttonRow}>
        {isWorkout && info.scheduledDay ? (
          <TouchableOpacity
            activeOpacity={0.88}
            style={styles.primaryButton}
            onPress={() => onStartWorkout(info.scheduledDay!)}
          >
            <Text style={styles.primaryButtonText}>
              {t('gym.startTodayWorkout', 'Start today workout')}
            </Text>
          </TouchableOpacity>
        ) : null}

        {isCompleted && info.scheduledDay ? (
          <TouchableOpacity
            activeOpacity={0.88}
            style={styles.secondaryButton}
            onPress={() => onStartWorkout(info.scheduledDay!)}
          >
            <Text style={styles.secondaryButtonText}>
              {t('gym.viewWorkout', 'View workout')}
            </Text>
          </TouchableOpacity>
        ) : null}

        {isRest ? (
          <TouchableOpacity
            activeOpacity={0.88}
            style={styles.secondaryButton}
            onPress={onQuickWorkout}
          >
            <Text style={styles.secondaryButtonText}>
              {t('gym.quickWorkout', 'Quick workout')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.28)',
    padding: 16,
    marginTop: 18,
    overflow: 'hidden',
  },
  cardCompleted: {
    borderColor: 'rgba(25, 230, 210, 0.32)',
  },
  cardRest: {
    borderColor: 'rgba(250, 204, 21, 0.32)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  kicker: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  todayLabel: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
  },
  statusPill: {
    backgroundColor: 'rgba(124, 255, 58, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statusPillCompleted: {
    backgroundColor: 'rgba(25, 230, 210, 0.14)',
    borderColor: 'rgba(25, 230, 210, 0.4)',
  },
  statusPillRest: {
    backgroundColor: 'rgba(250, 204, 21, 0.14)',
    borderColor: 'rgba(250, 204, 21, 0.4)',
  },
  statusText: {
    color: NEON,
    fontSize: 11,
    fontWeight: '900',
  },
  statusTextCompleted: {
    color: CYAN,
  },
  statusTextRest: {
    color: YELLOW,
  },
  title: {
    color: TEXT,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    marginTop: 14,
  },
  subtitle: {
    color: '#D8E4F0',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  nextBox: {
    backgroundColor: BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 12,
    marginTop: 14,
  },
  nextKicker: {
    color: YELLOW,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  nextTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 6,
  },
  nextText: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 5,
  },
  buttonRow: {
    marginTop: 16,
  },
  primaryButton: {
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
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
  },
  secondaryButtonText: {
    color: NEON,
    fontSize: 15,
    fontWeight: '900',
  },
});

export default TodayGymWorkoutCard;