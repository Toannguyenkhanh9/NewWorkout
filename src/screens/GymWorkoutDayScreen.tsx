// FILE: src/screens/GymWorkoutDayScreen.tsx
import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { GYM_PROGRAMS, GymExercise } from '../data/gymPrograms';
import {
  loadGymDayProgress,
  markGymDayCompleted,
  toggleGymExercise,
  GymDayProgress,
} from '../store/gymProgress';
import { markWorkoutCompleted } from '../services/gamification';
import { markWorkoutActivity } from '../notifications/reminder';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const formatRest = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return sec ? `${min}m ${sec}s` : `${min}m`;
};

export const GymWorkoutDayScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<any>();

  const { programId, dayId } = route.params || {};

  const program = GYM_PROGRAMS.find((item) => item.id === programId);
  const day = program?.days.find((item) => item.id === dayId);

  const [progress, setProgress] = useState<GymDayProgress>({
    completedExercises: {},
    completedAt: null,
  });

  useFocusEffect(
    useCallback(() => {
      if (!program || !day) return;

      loadGymDayProgress(program.id, day.id).then(setProgress);
    }, [program, day]),
  );

  const completedCount = useMemo(() => {
    if (!day) return 0;

    return day.exercises.filter(
      (exercise) => progress.completedExercises[exercise.id],
    ).length;
  }, [day, progress.completedExercises]);

  const allDone =
    !!day && completedCount === day.exercises.length && day.exercises.length > 0;

  const onToggleExercise = async (exercise: GymExercise) => {
    if (!program || !day) return;

    const next = await toggleGymExercise(
      program.id,
      day.id,
      exercise.id,
    );

    setProgress(next);
  };

  const onFinishDay = async () => {
    if (!program || !day) return;

    if (!allDone) {
      Alert.alert(
        t('gym.notDoneTitle', 'Not finished yet'),
        t(
          'gym.notDoneText',
          'Complete all exercises before finishing this workout day.',
        ),
      );
      return;
    }

    await markGymDayCompleted(program.id, day.id);
    await markWorkoutCompleted(day.durationMin);
    await markWorkoutActivity();

    const next = await loadGymDayProgress(program.id, day.id);
    setProgress(next);

    Alert.alert(
      t('program.completed', 'Completed'),
      t(
        'gym.dayCompletedMessage',
        'Great job! This gym workout day has been completed.',
      ),
    );
  };

  if (!program || !day) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          {t('gym.dayNotFound', 'Gym workout day not found')}
        </Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: GymExercise; index: number }) => {
    const done = !!progress.completedExercises[item.id];

    return (
      <TouchableOpacity
        activeOpacity={0.86}
        style={[styles.exerciseCard, done && styles.exerciseCardDone]}
        onPress={() => onToggleExercise(item)}
      >
        <View style={[styles.checkBox, done && styles.checkBoxDone]}>
          <Text style={[styles.checkText, done && styles.checkTextDone]}>
            {done ? '✓' : index + 1}
          </Text>
        </View>

        <View style={styles.exerciseBody}>
          <Text style={styles.exerciseName}>
            {t(item.nameKey, item.defaultName)}
          </Text>

          <Text style={styles.exerciseMeta}>
            {item.sets} {t('gym.sets', 'sets')} × {item.reps} •{' '}
            {t('gym.rest', 'Rest')} {formatRest(item.restSeconds)}
          </Text>

          {item.noteKey || item.defaultNote ? (
            <Text style={styles.exerciseNote}>
              {t(item.noteKey || '', item.defaultNote || '')}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <FlatList
        data={day.exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>
                {t('gym.workoutDay', 'WORKOUT DAY')}
              </Text>
            </View>

            <Text style={styles.title}>
              {t(day.titleKey, day.defaultTitle)}
            </Text>

            <Text style={styles.subtitle}>
              {t(day.focusKey, day.defaultFocus)}
            </Text>

            <View style={styles.progressCard}>
              <Text style={styles.progressText}>
                {completedCount}/{day.exercises.length}{' '}
                {t('gym.exercisesCompleted', 'exercises completed')}
              </Text>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.round(
                        (completedCount / day.exercises.length) * 100,
                      )}%`,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity
            activeOpacity={0.86}
            style={[
              styles.finishButton,
              !allDone && styles.finishButtonDisabled,
            ]}
            onPress={onFinishDay}
          >
            <Text style={styles.finishButtonText}>
              {progress.completedAt
                ? t('program.completed', 'Completed')
                : t('gym.finishWorkoutDay', 'Finish workout day')}
            </Text>
          </TouchableOpacity>
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
    paddingBottom: 160,
  },
  header: {
    marginBottom: 14,
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
  progressCard: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
  },
  progressText: {
    color: TEXT,
    fontWeight: '900',
    marginBottom: 10,
  },
  progressTrack: {
    height: 9,
    backgroundColor: '#1F2A38',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: NEON,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(11, 22, 36, 0.96)',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  exerciseCardDone: {
    borderColor: 'rgba(124, 255, 58, 0.5)',
    backgroundColor: 'rgba(12, 38, 27, 0.92)',
  },
  checkBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    borderWidth: 1,
    borderColor: CYAN,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkBoxDone: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  checkText: {
    color: CYAN,
    fontWeight: '900',
  },
  checkTextDone: {
    color: BG,
  },
  exerciseBody: {
    flex: 1,
  },
  exerciseName: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
  },
  exerciseMeta: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 5,
  },
  exerciseNote: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  finishButton: {
    marginTop: 16,
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  finishButtonDisabled: {
    opacity: 0.45,
  },
  finishButtonText: {
    color: BG,
    fontSize: 16,
    fontWeight: '900',
  },
  notFound: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
    margin: 18,
  },
});

export default GymWorkoutDayScreen;