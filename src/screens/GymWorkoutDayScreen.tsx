// FILE: src/screens/GymWorkoutDayScreen.tsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Video from 'react-native-video';

import {
  SmartGymDay,
  SmartGymExercise,
} from '../data/gymSmartPlan';

import {
  appendGymWorkoutHistory,
  GymDayProgress,
  GymExerciseSetLog,
  loadGymDayProgress,
  makeDefaultGymSets,
  markGymDayCompleted,
  markGymSessionRpe,
  setGymExerciseCompleted,
  updateGymExerciseRpe,
  updateGymExerciseSet,
  updatePersonalRecordsFromWorkout,
} from '../store/gymProgress';

import { markWorkoutCompleted } from '../services/gamification';
import { markWorkoutActivity } from '../notifications/reminder';
import { playRestFinishedAlert } from '../services/restAlert';

import {
  downloadWorkoutVideo,
  getOfflineVideoKey,
  getOfflineVideoPath,
  getOfflineVideoSizeText,
} from '../services/offlineWorkoutVideo';

import {
  hasOfflineVideoAccess,
} from '../services/premiumAccess';

import GymRpeModal from '../components/GymRpeModal';

/**
 * Bật true để test video demo mà chưa cần mua Premium Plus.
 * Trước khi build release / submit store thì đổi thành false.
 */
const TEST_UNLOCK_GYM_DEMO_VIDEO = true;

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

const formatTimer = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

const toFileUri = (path: string) => {
  if (path.startsWith('file://')) {
    return path;
  }

  return `file://${path}`;
};

const normalizeSets = (
  sets: GymExerciseSetLog[] | undefined,
  setCount: number,
  defaultReps: string,
): GymExerciseSetLog[] => {
  const base = makeDefaultGymSets(setCount, defaultReps);

  if (!Array.isArray(sets)) {
    return base;
  }

  return base.map((item, index) => ({
    ...item,
    ...(sets[index] || {}),
  }));
};

type ExerciseCardProps = {
  programId: string;
  dayId: string;
  exercise: SmartGymExercise;
  index: number;
  done: boolean;
  logSets: GymExerciseSetLog[];
  exerciseRpe?: number | null;
  onProgressUpdated: (next: GymDayProgress) => void;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  programId,
  dayId,
  exercise,
  index,
  done,
  logSets,
  exerciseRpe,
  onProgressUpdated,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [videoPath, setVideoPath] = useState<string | null>(null);
  const [videoSize, setVideoSize] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [hasPremiumPlus, setHasPremiumPlus] = useState(false);
  const [restRemaining, setRestRemaining] = useState(0);

  const canViewDemoVideo =
    TEST_UNLOCK_GYM_DEMO_VIDEO || hasPremiumPlus;

  const sets = useMemo(() => {
    return normalizeSets(
      logSets,
      exercise.sets,
      exercise.reps,
    );
  }, [logSets, exercise.sets, exercise.reps]);

  const completedSets = sets.filter(item => item.completed).length;

  const offlineKey = useMemo(() => {
    return getOfflineVideoKey(
      'gym-exercise',
      `${exercise.id}|${exercise.demoUrl || ''}`,
    );
  }, [exercise.id, exercise.demoUrl]);

  useEffect(() => {
    if (restRemaining <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setRestRemaining(prev => {
        if (prev <= 1) {
          playRestFinishedAlert();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [restRemaining]);

  const reloadAccess = useCallback(async () => {
    const ok = await hasOfflineVideoAccess();
    setHasPremiumPlus(ok);
  }, []);

  const reloadVideoState = useCallback(async () => {
    if (!exercise.demoUrl) {
      setVideoPath(null);
      setVideoSize(null);
      return;
    }

    const path = await getOfflineVideoPath(offlineKey);
    const size = path ? await getOfflineVideoSizeText(offlineKey) : null;

    setVideoPath(path);
    setVideoSize(size);
  }, [exercise.demoUrl, offlineKey]);

  useFocusEffect(
    useCallback(() => {
      reloadAccess();
      reloadVideoState();
    }, [reloadAccess, reloadVideoState]),
  );

  const openPremium = () => {
    try {
      navigation.getParent()?.navigate('Settings', {
        screen: 'Premium',
      });
    } catch {
      navigation.navigate('Premium');
    }
  };

  const showPremiumPlusAlert = () => {
    Alert.alert(
      t('premium.lockedTitle', 'Premium Plus required'),
      t(
        'gym.premiumPlusRequiredText',
        'Upgrade to Premium Plus to watch and download demo videos offline.',
      ),
      [
        {
          text: t('common.cancel', 'Cancel'),
          style: 'cancel',
        },
        {
          text: t('premium.cta', 'Upgrade now'),
          onPress: openPremium,
        },
      ],
    );
  };

  const onToggleWholeExercise = async () => {
    const next = await setGymExerciseCompleted(
      programId,
      dayId,
      exercise.id,
      !done,
      exercise.sets,
      exercise.reps,
    );

    onProgressUpdated(next);
  };

  const onChangeSet = async (
    setIndex: number,
    patch: Partial<GymExerciseSetLog>,
  ) => {
    const next = await updateGymExerciseSet(
      programId,
      dayId,
      exercise.id,
      setIndex,
      patch,
      exercise.sets,
      exercise.reps,
    );

    onProgressUpdated(next);
  };

  const onToggleSetDone = async (
    setIndex: number,
    currentCompleted: boolean,
  ) => {
    const next = await updateGymExerciseSet(
      programId,
      dayId,
      exercise.id,
      setIndex,
      {
        completed: !currentCompleted,
      },
      exercise.sets,
      exercise.reps,
    );

    onProgressUpdated(next);

    if (!currentCompleted) {
      setRestRemaining(exercise.restSeconds);
    }
  };

  const onSelectExerciseRpe = async (rpe: number) => {
    const next = await updateGymExerciseRpe(
      programId,
      dayId,
      exercise.id,
      rpe,
    );

    onProgressUpdated(next);
  };

  const onStartRest = () => {
    setRestRemaining(exercise.restSeconds);
  };

  const onDownload = async () => {
    if (!exercise.demoUrl) {
      Alert.alert(
        t('premium.errorTitle', 'Error'),
        t('gym.videoNotReady', 'Demo video is not available yet.'),
      );
      return;
    }

    if (!canViewDemoVideo) {
      showPremiumPlusAlert();
      return;
    }

    try {
      setDownloading(true);
      setDownloadProgress(0);

      await downloadWorkoutVideo(
        offlineKey,
        exercise.demoUrl,
        progress => {
          setDownloadProgress(
            Math.min(100, Math.max(0, progress)),
          );
        },
      );

      await reloadVideoState();
    } catch (e: any) {
      Alert.alert(
        t('premium.errorTitle', 'Error'),
        e?.message ||
          t('video.downloadError', 'Unable to download video.'),
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={[styles.exerciseCard, done && styles.exerciseCardDone]}>
      <View style={styles.exerciseTop}>
        <TouchableOpacity
          activeOpacity={0.86}
          style={[styles.checkBox, done && styles.checkBoxDone]}
          onPress={onToggleWholeExercise}
        >
          <Text style={[styles.checkText, done && styles.checkTextDone]}>
            {done ? '✓' : index + 1}
          </Text>
        </TouchableOpacity>

        <View style={styles.exerciseBody}>
          <Text style={styles.exerciseName}>
            {exercise.name}
          </Text>

          <Text style={styles.exerciseMeta}>
            {exercise.sets} {t('gym.sets', 'sets')} × {exercise.reps} •{' '}
            {t('gym.rest', 'Rest')} {formatRest(exercise.restSeconds)}
          </Text>

          <Text style={styles.exerciseNote}>
            {exercise.note}
          </Text>

          <Text style={styles.setProgressText}>
            {completedSets}/{sets.length} {t('gym.setsCompleted', 'sets completed')}
          </Text>
        </View>
      </View>

      <View style={styles.setLogBox}>
        <View style={styles.setHeaderRow}>
          <Text style={[styles.setHeaderText, styles.setColSmall]}>
            {t('gym.set', 'Set')}
          </Text>

          <Text style={styles.setHeaderText}>
            {t('gym.weightKg', 'Kg')}
          </Text>

          <Text style={styles.setHeaderText}>
            {t('gym.reps', 'Reps')}
          </Text>

          <Text style={[styles.setHeaderText, styles.setDoneHeader]}>
            {t('gym.done', 'Done')}
          </Text>
        </View>

        {sets.map((set, setIndex) => (
          <View
            key={`${exercise.id}-set-${setIndex}`}
            style={styles.setRow}
          >
            <Text style={[styles.setNumber, styles.setColSmall]}>
              {setIndex + 1}
            </Text>

            <TextInput
              value={set.weightKg}
              onChangeText={value =>
                onChangeSet(setIndex, {
                  weightKg: value,
                })
              }
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor="#64748B"
              style={styles.setInput}
            />

            <TextInput
              value={set.reps}
              onChangeText={value =>
                onChangeSet(setIndex, {
                  reps: value,
                })
              }
              keyboardType="number-pad"
              placeholder={exercise.reps}
              placeholderTextColor="#64748B"
              style={styles.setInput}
            />

            <TouchableOpacity
              activeOpacity={0.86}
              style={[
                styles.setDoneButton,
                set.completed && styles.setDoneButtonActive,
              ]}
              onPress={() =>
                onToggleSetDone(setIndex, set.completed)
              }
            >
              <Text
                style={[
                  styles.setDoneText,
                  set.completed && styles.setDoneTextActive,
                ]}
              >
                ✓
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          activeOpacity={0.86}
          style={styles.restButton}
          onPress={onStartRest}
        >
          <Text style={styles.restButtonText}>
            {restRemaining > 0
              ? `${t('gym.resting', 'Resting')} ${formatTimer(restRemaining)}`
              : `${t('gym.startRest', 'Start rest')} ${formatRest(
                  exercise.restSeconds,
                )}`}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rpeBox}>
        <Text style={styles.rpeTitle}>
          {t('gym.exerciseRpe', 'How hard was this exercise?')}
        </Text>

        <View style={styles.rpeRow}>
          {[6, 7, 8, 9, 10].map(value => {
            const active = exerciseRpe === value;

            return (
              <TouchableOpacity
                key={value}
                activeOpacity={0.86}
                style={[
                  styles.rpeButton,
                  active && styles.rpeButtonActive,
                ]}
                onPress={() => onSelectExerciseRpe(value)}
              >
                <Text
                  style={[
                    styles.rpeButtonText,
                    active && styles.rpeButtonTextActive,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.demoBox}>
        <View style={styles.demoHeader}>
          <Text style={styles.demoTitle}>
            {t('gym.videoDemo', 'Demo video')}
          </Text>

          {TEST_UNLOCK_GYM_DEMO_VIDEO ? (
            <Text style={styles.testBadge}>TEST</Text>
          ) : null}

          {canViewDemoVideo && videoSize ? (
            <Text style={styles.demoSize}>
              {videoSize}
            </Text>
          ) : null}
        </View>

        {!exercise.demoUrl ? (
          <View style={styles.lockedVideoBox}>
            <Text style={styles.lockedTitle}>
              {t('gym.videoNotReady', 'Demo video is not available yet.')}
            </Text>
          </View>
        ) : !canViewDemoVideo ? (
          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.lockedVideoBox}
            onPress={showPremiumPlusAlert}
          >
            <Text style={styles.lockedIcon}>🔒</Text>

            <Text style={styles.lockedTitle}>
              {t('premium.plusTitle', 'Premium Plus')}
            </Text>

            <Text style={styles.lockedText}>
              {t(
                'gym.videoPremiumPlusOnly',
                'Demo videos are available for Premium Plus users only.',
              )}
            </Text>

            <View style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>
                {t('premium.cta', 'Upgrade now')}
              </Text>
            </View>
          </TouchableOpacity>
        ) : videoPath ? (
          <View style={styles.videoWrap}>
            <Video
              source={{ uri: toFileUri(videoPath) }}
              style={styles.video}
              controls
              paused
              resizeMode="contain"
              playInBackground={false}
              playWhenInactive={false}
              onError={(e) => {
                console.log('[gym] video error', e);

                Alert.alert(
                  t('premium.errorTitle', 'Error'),
                  t('video.error', 'Unable to play video. Please try again.'),
                );
              }}
            />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.86}
            style={[
              styles.downloadButton,
              downloading && styles.buttonDisabled,
            ]}
            onPress={onDownload}
            disabled={downloading}
          >
            {downloading ? (
              <View style={styles.downloadRow}>
                <ActivityIndicator
                  color={BG}
                  style={styles.downloadSpinner}
                />

                <Text style={styles.downloadText}>
                  {t('video.downloading', 'Downloading')} {downloadProgress}%
                </Text>
              </View>
            ) : (
              <Text style={styles.downloadText}>
                {t('gym.downloadVideo', 'Download video')}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const GymWorkoutDayScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const {
    programId = 'smart-gym',
    dayId = 'day-1',
    plannedDay,
    profile,
  } = route.params || {};

  const day = plannedDay as SmartGymDay | undefined;

  const [progress, setProgress] = useState<GymDayProgress>({
    completedExercises: {},
    exerciseLogs: {},
    sessionRpe: null,
    completedAt: null,
  });

  const [sessionRpeVisible, setSessionRpeVisible] = useState(false);
  const [finishing, setFinishing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!day) return;

      loadGymDayProgress(programId, dayId).then(setProgress);
    }, [programId, dayId, day]),
  );

  const completedCount = useMemo(() => {
    if (!day) return 0;

    return day.exercises.filter(
      exercise => progress.completedExercises[exercise.id],
    ).length;
  }, [day, progress.completedExercises]);

  const allDone =
    !!day &&
    completedCount === day.exercises.length &&
    day.exercises.length > 0;

  const onFinishDay = async () => {
    if (!day) return;

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

    setSessionRpeVisible(true);
  };

  const completeWorkoutWithRpe = async (sessionRpe: number) => {
    if (!day || finishing) return;

    try {
      setFinishing(true);
      setSessionRpeVisible(false);

      const completedAt = Date.now();

      await markGymSessionRpe(programId, dayId, sessionRpe);
      await markGymDayCompleted(programId, dayId);
      await markWorkoutCompleted(day.durationMin);
      await markWorkoutActivity();

      const latest = await loadGymDayProgress(programId, dayId);

      const historyEntry = {
        id: `${programId}:${dayId}:${completedAt}`,
        programId,
        dayId,
        dayTitle: day.title,
        completedAt,
        sessionRpe,
        exercises: day.exercises.map(exercise => ({
          exerciseId: exercise.id,
          exerciseName: exercise.name,
          exerciseRpe:
            latest.exerciseLogs[exercise.id]?.exerciseRpe || null,
          sets:
            latest.exerciseLogs[exercise.id]?.sets ||
            makeDefaultGymSets(exercise.sets, exercise.reps),
        })),
      };

      const newRecords =
        await updatePersonalRecordsFromWorkout(historyEntry);

      await appendGymWorkoutHistory({
        ...historyEntry,
        personalRecords: newRecords,
      });

      const next = await loadGymDayProgress(programId, dayId);
      setProgress(next);

      if (newRecords.length > 0) {
        Alert.alert(
          t('gym.newPrTitle', 'New personal record!'),
          newRecords
            .slice(0, 3)
            .map(
              item =>
                `${item.exerciseName}: ${item.weightKg}kg × ${item.reps}`,
            )
            .join('\n'),
        );
        return;
      }

      Alert.alert(
        t('program.completed', 'Completed'),
        t(
          'gym.dayCompletedMessage',
          'Great job! This gym workout day has been completed.',
        ),
      );
    } finally {
      setFinishing(false);
    }
  };

  if (!day) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          {t('gym.dayNotFound', 'Gym workout day not found')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <FlatList
        data={day.exercises}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item, index }) => (
          <ExerciseCard
            programId={programId}
            dayId={dayId}
            exercise={item}
            index={index}
            done={!!progress.completedExercises[item.id]}
            logSets={
              progress.exerciseLogs[item.id]?.sets ||
              makeDefaultGymSets(item.sets, item.reps)
            }
            exerciseRpe={progress.exerciseLogs[item.id]?.exerciseRpe}
            onProgressUpdated={setProgress}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>
                {t('gym.workoutDay', 'WORKOUT DAY')}
              </Text>
            </View>

            <Text style={styles.title}>
              {day.title}
            </Text>

            <Text style={styles.subtitle}>
              {day.focus}
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

            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.workoutModeButton}
              onPress={() =>
                navigation.navigate('GymWorkoutMode', {
                  programId,
                  dayId,
                  plannedDay: day,
                  profile,
                })
              }
            >
              <Text style={styles.workoutModeButtonText}>
                {t('gym.startWorkoutMode', 'Start workout mode')}
              </Text>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={
          <TouchableOpacity
            activeOpacity={0.86}
            style={[
              styles.finishButton,
              (!allDone || finishing) && styles.finishButtonDisabled,
            ]}
            onPress={onFinishDay}
            disabled={!allDone || finishing}
          >
            <Text style={styles.finishButtonText}>
              {finishing
                ? t('common.saving', 'Saving...')
                : progress.completedAt
                  ? t('program.completed', 'Completed')
                  : t('gym.finishWorkoutDay', 'Finish workout day')}
            </Text>
          </TouchableOpacity>
        }
      />

      <GymRpeModal
        visible={sessionRpeVisible}
        title={t('gym.sessionRpeTitle', 'How hard was this workout?')}
        subtitle={t(
          'gym.sessionRpeSubtitle',
          'This helps the app adjust your next workout weight.',
        )}
        onSelect={completeWorkoutWithRpe}
        onClose={() => setSessionRpeVisible(false)}
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
  workoutModeButton: {
    marginTop: 14,
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  workoutModeButtonText: {
    color: BG,
    fontSize: 15,
    fontWeight: '900',
  },

  exerciseCard: {
    backgroundColor: 'rgba(11, 22, 36, 0.96)',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  exerciseCardDone: {
    borderColor: 'rgba(124, 255, 58, 0.5)',
    backgroundColor: 'rgba(12, 38, 27, 0.92)',
  },
  exerciseTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  setProgressText: {
    color: NEON,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 8,
  },

  setLogBox: {
    marginTop: 12,
    backgroundColor: '#06111D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.18)',
    padding: 10,
  },
  setHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  setHeaderText: {
    flex: 1,
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  setColSmall: {
    width: 42,
    flex: 0,
  },
  setDoneHeader: {
    width: 58,
    flex: 0,
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  setNumber: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '900',
  },
  setInput: {
    flex: 1,
    minHeight: 42,
    backgroundColor: '#0B1624',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    color: TEXT,
    paddingHorizontal: 10,
    marginRight: 8,
    fontWeight: '800',
  },
  setDoneButton: {
    width: 46,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setDoneButtonActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  setDoneText: {
    color: CYAN,
    fontSize: 18,
    fontWeight: '900',
  },
  setDoneTextActive: {
    color: BG,
  },
  restButton: {
    marginTop: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.4)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  restButtonText: {
    color: CYAN,
    fontSize: 13,
    fontWeight: '900',
  },

  rpeBox: {
    marginTop: 12,
    backgroundColor: '#06111D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.18)',
    padding: 10,
  },
  rpeTitle: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 8,
  },
  rpeRow: {
    flexDirection: 'row',
  },
  rpeButton: {
    flex: 1,
    height: 38,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  rpeButtonActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  rpeButtonText: {
    color: CYAN,
    fontSize: 14,
    fontWeight: '900',
  },
  rpeButtonTextActive: {
    color: BG,
  },

  demoBox: {
    marginTop: 12,
    backgroundColor: '#06111D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.22)',
    padding: 10,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  demoTitle: {
    color: '#E0F2FE',
    fontSize: 13,
    fontWeight: '900',
    flex: 1,
  },
  demoSize: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 8,
  },
  testBadge: {
    color: '#06111D',
    backgroundColor: '#FACC15',
    overflow: 'hidden',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 10,
    fontWeight: '900',
    marginLeft: 8,
  },
  videoWrap: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  lockedVideoBox: {
    minHeight: 116,
    borderRadius: 14,
    backgroundColor: 'rgba(2, 8, 23, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  lockedIcon: {
    fontSize: 26,
    marginBottom: 6,
  },
  lockedTitle: {
    color: '#FACC15',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  lockedText: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
    textAlign: 'center',
  },
  upgradeButton: {
    marginTop: 12,
    backgroundColor: NEON,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  upgradeButtonText: {
    color: BG,
    fontSize: 13,
    fontWeight: '900',
  },
  downloadButton: {
    minHeight: 44,
    borderRadius: 999,
    backgroundColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadSpinner: {
    marginRight: 8,
  },
  downloadText: {
    color: BG,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.65,
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