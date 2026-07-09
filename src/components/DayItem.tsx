// FILE: src/components/DayItem.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { WorkoutDay } from '../data/programs';

const WEEKDAYS_KEYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface Props {
  day: WorkoutDay;
  completed: boolean;
  onPress: () => void;
}

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_DONE = 'rgba(12, 38, 27, 0.96)';
const CARD_REST = 'rgba(15, 23, 42, 0.82)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const DayItem: React.FC<Props> = ({
  day,
  completed,
  onPress,
}) => {
  const { t } = useTranslation();

  const weekday = WEEKDAYS_KEYS[day.weekdayIndex];
  const isRest = !!day.isRest;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isRest}
      activeOpacity={isRest ? 1 : 0.82}
      style={[
        styles.container,
        completed && !isRest && styles.completed,
        isRest && styles.rest,
      ]}
    >
      <View
        style={[
          styles.dayCircle,
          completed && !isRest && styles.dayCircleDone,
          isRest && styles.dayCircleRest,
        ]}
      >
        <Text
          style={[
            styles.dayCircleText,
            completed && !isRest && styles.dayCircleTextDone,
            isRest && styles.dayCircleTextRest,
          ]}
        >
          {isRest ? '💤' : day.dayNumber}
        </Text>
      </View>

      <View style={styles.left}>
        <Text
          style={[
            styles.dayTitle,
            completed && !isRest && styles.dayTitleDone,
            isRest && styles.restTitle,
          ]}
          numberOfLines={1}
        >
          {t('program.daysPrefix', {
            day: day.dayNumber,
            weekday,
          })}
        </Text>

        <Text
          style={[
            styles.workoutName,
            completed && !isRest && styles.workoutNameDone,
            isRest && styles.restText,
          ]}
          numberOfLines={1}
        >
          {isRest
            ? t('workouts.rest', 'Rest')
            : `${day.name} • ${day.durationMin}’`}
        </Text>
      </View>

      {!isRest && completed ? (
        <View style={styles.completedCircle}>
          <Text style={styles.completedText}>✓</Text>
        </View>
      ) : null}

      {!isRest && !completed ? (
        <View style={styles.playCircle}>
          <Text style={styles.playText}>▶</Text>
        </View>
      ) : null}

      {isRest ? (
        <View style={styles.restCircle}>
          <Text style={styles.restIcon}>🛌</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 13,
    marginBottom: 10,
    borderRadius: 18,
    backgroundColor: CARD,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 3,
  },

  completed: {
    backgroundColor: CARD_DONE,
    borderColor: 'rgba(124, 255, 58, 0.55)',
  },

  rest: {
    backgroundColor: CARD_REST,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },

  dayCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  dayCircleDone: {
    backgroundColor: NEON,
    borderColor: NEON,
  },

  dayCircleRest: {
    backgroundColor: 'rgba(148, 163, 184, 0.10)',
    borderColor: 'rgba(148, 163, 184, 0.22)',
  },

  dayCircleText: {
    color: CYAN,
    fontWeight: '900',
    fontSize: 15,
  },

  dayCircleTextDone: {
    color: BG,
  },

  dayCircleTextRest: {
    color: MUTED,
    fontSize: 17,
  },

  left: {
    flex: 1,
  },

  dayTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 15,
  },

  dayTitleDone: {
    color: TEXT,
  },

  restTitle: {
    color: '#CBD5E1',
  },

  workoutName: {
    color: MUTED,
    fontSize: 13,
    marginTop: 4,
    fontWeight: '700',
  },

  workoutNameDone: {
    color: '#BBF7D0',
  },

  restText: {
    color: MUTED,
  },

  completedCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  completedText: {
    color: BG,
    fontSize: 18,
    fontWeight: '900',
  },

  playCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  playText: {
    color: NEON,
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 2,
  },

  restCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(148, 163, 184, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  restIcon: {
    fontSize: 17,
  },
});

export default DayItem;