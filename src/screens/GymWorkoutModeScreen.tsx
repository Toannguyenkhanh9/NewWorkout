// FILE: src/screens/GymWorkoutModeScreen.tsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Video from 'react-native-video';

import type {
  SmartGymDay,
  SmartGymExercise,
} from '../data/gymSmartPlan';

import {
  appendGymWorkoutHistory,
  GymDayProgress,
  GymExerciseSetLog,
  loadGymDayProgress,
  loadGymWorkoutHistory,
  makeDefaultGymSets,
  markGymDayCompleted,
  markGymSessionRpe,
  updateGymExerciseRpe,
  updateGymExerciseSet,
  updatePersonalRecordsFromWorkout,
} from '../store/gymProgress';

import {
  getExerciseSwapSuggestion,
  getSuggestedWeightForExercise,
} from '../services/gymCoach';

import { markWorkoutActivity } from '../notifications/reminder';
import { markWorkoutCompleted } from '../services/gamification';
import { playRestFinishedAlert } from '../services/restAlert';

import GymRpeModal from '../components/GymRpeModal';
import {
  downloadWorkoutVideo,
  getGymExerciseOfflineKey,
  getOfflineVideoPath,
  getOfflineVideoSizeText,
} from '../services/offlineWorkoutVideo';
import { gateWorkout } from '../ads/adGate';
import { useSubscription } from '../iap/SubscriptionProvider';
import {
  translateExerciseName,
  translateExerciseNote,
  translateGymDayFocus,
  translateGymDayTitle,
  translateGymDynamicText,
} from '../utils/gymI18n';
import {
  adjustSuggestedWeight,
  buildGymWorkoutSummary,
  getLastExercisePerformanceFromHistory,
  GymReadiness,
  LastExercisePerformance,
} from '../services/gymRetention';

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

export const GymWorkoutModeScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { isPremium } =
    useSubscription?.() || { isPremium: false };

  const {
    programId = 'smart-gym',
    dayId = 'day-1',
    plannedDay,
    profile,
    daysPerWeek = 4,
    readiness = null,
  } = route.params || {};

  const readinessData =
    readiness as GymReadiness | null;

  const day = plannedDay as SmartGymDay | undefined;

  const [progress, setProgress] = useState<GymDayProgress>({
    completedExercises: {},
    exerciseLogs: {},
    sessionRpe: null,
    completedAt: null,
  });

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [weightKg, setWeightKg] = useState('');
  const [reps, setReps] = useState('');
  const [restRemaining, setRestRemaining] = useState(0);
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionReason, setSuggestionReason] = useState('');
  const [lastPerformance, setLastPerformance] =
    useState<LastExercisePerformance>(null);
  const sessionStartedAt = useRef(Date.now());
  const [exerciseRpeVisible, setExerciseRpeVisible] = useState(false);
  const [sessionRpeVisible, setSessionRpeVisible] = useState(false);
  const [finishing, setFinishing] = useState(false);

  const [videoPath, setVideoPath] = useState<string | null>(null);
  const [videoSize, setVideoSize] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [preparingReward, setPreparingReward] = useState(false);

  const exercise: SmartGymExercise | undefined =
    day?.exercises?.[exerciseIndex];

  /**
   * Phải dùng đúng cùng một khóa với GymWorkoutDayScreen.
   * Nhờ vậy video tải ở lịch tập và Workout Mode dùng chung file.
   */
  const offlineKey = useMemo(() => {
    if (!exercise) {
      return '';
    }

    return getGymExerciseOfflineKey(
      exercise.id,
      exercise.demoUrl,
    );
  }, [exercise?.id, exercise?.demoUrl]);

  const sets = useMemo(() => {
    if (!exercise) return [];

    return normalizeSets(
      progress.exerciseLogs[exercise.id]?.sets,
      exercise.sets,
      exercise.reps,
    );
  }, [progress.exerciseLogs, exercise]);

  const currentSet = sets[setIndex];

  const swapSuggestion = useMemo(() => {
    if (!exercise) return null;

    return getExerciseSwapSuggestion(exercise, profile);
  }, [exercise, profile]);

  const reloadVideoState = useCallback(async () => {
    if (!exercise?.demoUrl || !offlineKey) {
      setVideoPath(null);
      setVideoSize(null);
      return;
    }

    try {
      const path = await getOfflineVideoPath(offlineKey);
      const size = path
        ? await getOfflineVideoSizeText(offlineKey)
        : null;

      setVideoPath(path);
      setVideoSize(size);
    } catch (error) {
      console.log('[gym workout mode] reload video error', {
        exerciseId: exercise.id,
        demoUrl: exercise.demoUrl,
        offlineKey,
        error,
      });

      setVideoPath(null);
      setVideoSize(null);
    }
  }, [exercise?.id, exercise?.demoUrl, offlineKey]);

  useFocusEffect(
    useCallback(() => {
      if (day) {
        loadGymDayProgress(programId, dayId).then(setProgress);
      }

      reloadVideoState();
    }, [
      programId,
      dayId,
      day,
      reloadVideoState,
    ]),
  );

  /**
   * Workout Mode đổi bài ngay trong cùng màn hình nên useFocusEffect
   * không chạy lại. Effect này bắt buộc để tải trạng thái video của bài mới.
   */
  useEffect(() => {
    setVideoPath(null);
    setVideoSize(null);
    setDownloadProgress(0);

    reloadVideoState();
  }, [offlineKey, reloadVideoState]);

  useEffect(() => {
    if (!exercise || !currentSet) return;

    setWeightKg(currentSet.weightKg || '');
    setReps(currentSet.reps || exercise.reps || '');
  }, [exercise, currentSet]);

  useEffect(() => {
    let mounted = true;

    const loadSuggestion = async () => {
      if (!exercise) return;

      const history =
        await loadGymWorkoutHistory();

      const result =
        getSuggestedWeightForExercise(
          history,
          exercise,
        );

      const previous =
        getLastExercisePerformanceFromHistory(
          history,
          exercise.id,
        );

      if (!mounted) return;

      setLastPerformance(previous);
      setSuggestionText(result.text);
      setSuggestionReason(result.reason);

      if (
        !currentSet?.weightKg &&
        result.suggestedWeightKg
      ) {
        const adjusted =
          adjustSuggestedWeight(
            result.suggestedWeightKg,
            readinessData,
          );

        setWeightKg(
          adjusted ||
            result.suggestedWeightKg,
        );
      }
    };

    loadSuggestion();

    return () => {
      mounted = false;
    };
  }, [
    exercise?.id,
    currentSet?.weightKg,
    readinessData?.weightMultiplier,
  ]);

  useEffect(() => {
    if (restRemaining <= 0) return;

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

  const totalSets = day?.exercises.reduce(
    (sum, item) => sum + item.sets,
    0,
  ) || 0;

  const completedSets = day?.exercises.reduce((sum, item) => {
    const itemSets = normalizeSets(
      progress.exerciseLogs[item.id]?.sets,
      item.sets,
      item.reps,
    );

    return sum + itemSets.filter(x => x.completed).length;
  }, 0) || 0;

  const progressPercent =
    totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  const isLastSet =
    !!exercise && setIndex + 1 >= exercise.sets;

  const isLastExercise =
    !!day && exerciseIndex + 1 >= day.exercises.length;

  const effectiveRestSeconds =
    Math.max(
      30,
      Math.round(
        (exercise?.restSeconds || 60) *
          (readinessData?.restMultiplier || 1),
      ),
    );

  const goNext = () => {
    if (!day || !exercise) return;

    if (setIndex + 1 < exercise.sets) {
      setSetIndex(prev => prev + 1);
      return;
    }

    if (exerciseIndex + 1 < day.exercises.length) {
      setExerciseIndex(prev => prev + 1);
      setSetIndex(0);
      return;
    }

    setSessionRpeVisible(true);
  };

  const onDownloadVideo = async () => {
    if (!exercise?.demoUrl || !offlineKey) {
      Alert.alert(
        t('premium.errorTitle', 'Error'),
        t('gym.videoNotReady', 'Demo video is not available yet.'),
      );
      return;
    }

    if (downloading || preparingReward) {
      return;
    }

    if (!isPremium) {
      try {
        setPreparingReward(true);

        const rewardResult = await gateWorkout({
          isPremium,
          startTrialOnFirstUse: false,
        });

        if (rewardResult === 'closed') {
          Alert.alert(
            t('ads.rewardRequiredTitle', 'Watch the full ad'),
            t(
              'ads.need_full',
              'You need to watch the entire ad to continue.',
            ),
          );
          return;
        }

        if (rewardResult === 'not_ready') {
          Alert.alert(
            t('ads.not_ready_title', 'Ad not ready'),
            t(
              'ads.not_ready',
              'Ad is loading. Please try again in a few seconds.',
            ),
          );
          return;
        }

        if (rewardResult === 'error') {
          Alert.alert(
            t('ads.load_failed_title', 'Unable to load ad'),
            t(
              'ads.load_failed',
              'Unable to load the ad. Please check your connection and try again.',
            ),
          );
          return;
        }
      } finally {
        setPreparingReward(false);
      }
    }

    try {
      setDownloading(true);
      setDownloadProgress(0);

      await downloadWorkoutVideo(
        offlineKey,
        exercise.demoUrl,
        progressValue => {
          setDownloadProgress(
            Math.min(100, Math.max(0, progressValue)),
          );
        },
      );

      await reloadVideoState();
    } catch (error: any) {
      console.log('[gym workout mode] download error', {
        exerciseId: exercise.id,
        demoUrl: exercise.demoUrl,
        offlineKey,
        error,
      });

      Alert.alert(
        t('premium.errorTitle', 'Error'),
        error?.message ||
          t('video.downloadError', 'Unable to download video.'),
      );
    } finally {
      setDownloading(false);
    }
  };

  const finishWorkout = async (sessionRpe: number) => {
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
        exercises: day.exercises.map(item => ({
          exerciseId: item.id,
          exerciseName: item.name,
          exerciseRpe:
            latest.exerciseLogs[item.id]?.exerciseRpe || null,
          sets:
            latest.exerciseLogs[item.id]?.sets ||
            makeDefaultGymSets(item.sets, item.reps),
        })),
      };

      const newRecords =
        await updatePersonalRecordsFromWorkout(historyEntry);

      const savedEntry = {
        ...historyEntry,
        personalRecords: newRecords,
      };

      await appendGymWorkoutHistory(
        savedEntry,
      );

      const summary =
        await buildGymWorkoutSummary({
          entry: savedEntry,
          newRecords,
          durationSec:
            Math.max(
              60,
              Math.round(
                (
                  Date.now() -
                  sessionStartedAt.current
                ) / 1000,
              ),
            ),
          targetDays:
            daysPerWeek,
          readiness:
            readinessData,
        });

      navigation.replace(
        'GymWorkoutSummary',
        {
          summary,
        },
      );
    } finally {
      setFinishing(false);
    }
  };

  const onCompleteSet = async () => {
    if (!exercise || !day) return;

    const next = await updateGymExerciseSet(
      programId,
      dayId,
      exercise.id,
      setIndex,
      {
        weightKg,
        reps,
        completed: true,
      },
      exercise.sets,
      exercise.reps,
    );

    setProgress(next);

    if (isLastSet) {
      setExerciseRpeVisible(true);
      return;
    }

    setRestRemaining(effectiveRestSeconds);
    setSetIndex(prev => prev + 1);
  };

  const onSelectExerciseRpe = async (rpe: number) => {
    if (!exercise || !day) return;

    const next = await updateGymExerciseRpe(
      programId,
      dayId,
      exercise.id,
      rpe,
    );

    setProgress(next);
    setExerciseRpeVisible(false);

    if (isLastExercise) {
      setSessionRpeVisible(true);
      return;
    }

    setRestRemaining(effectiveRestSeconds);
    setExerciseIndex(prev => prev + 1);
    setSetIndex(0);
  };

  if (!day || !exercise) {
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.kickerPill}>
          <Text style={styles.kickerText}>
            {t('gym.workoutMode', 'WORKOUT MODE')}
          </Text>
        </View>

        <Text style={styles.dayTitle}>
          {translateGymDayTitle(day, t)}
        </Text>

        <Text style={styles.daySubtitle}>
          {completedSets}/{totalSets} {t('gym.setsCompleted', 'sets completed')} • {progressPercent}%
        </Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercent}%`,
              },
            ]}
          />
        </View>

        {readinessData ? (
          <View style={styles.readinessCard}>
            <Text style={styles.readinessKicker}>
              {t(
                'retention.readinessResult',
                'Today’s readiness',
              )}
            </Text>

            <Text style={styles.readinessTitle}>
              {t(
                `retention.readinessLevel.${readinessData.level}`,
                readinessData.level,
              )}{' '}
              • {readinessData.score}/5
            </Text>

            <Text style={styles.readinessText}>
              {t(
                readinessData.messageKey,
                'Follow today’s adjusted recommendation.',
              )}
            </Text>
          </View>
        ) : null}

        {restRemaining > 0 ? (
          <View style={styles.restBox}>
            <Text style={styles.restLabel}>
              {t('gym.resting', 'Resting')}
            </Text>

            <Text style={styles.restTime}>
              {formatTimer(restRemaining)}
            </Text>

            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.skipButton}
              onPress={() => setRestRemaining(0)}
            >
              <Text style={styles.skipButtonText}>
                {t('gym.skipRest', 'Skip rest')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.exerciseCard}>
          <Text style={styles.exerciseStep}>
            {t('gym.exercise', 'Exercise')} {exerciseIndex + 1}/{day.exercises.length}
          </Text>

          <Text style={styles.exerciseName}>
            {translateExerciseName(exercise, t)}
          </Text>

          <Text style={styles.exerciseMeta}>
            {t('gym.set', 'Set')} {setIndex + 1}/{exercise.sets} •{' '}
            {exercise.reps} • {t('gym.rest', 'Rest')} {formatRest(effectiveRestSeconds)}
          </Text>

          <Text style={styles.exerciseNote}>
            {translateExerciseNote(exercise, t)}
          </Text>

          <View style={styles.demoBox}>
            <View style={styles.demoHeader}>
              <Text style={styles.demoTitle}>
                {t('gym.videoDemo', 'Demo video')}
              </Text>

              {videoSize ? (
                <Text style={styles.demoSize}>{videoSize}</Text>
              ) : null}
            </View>

            {!exercise.demoUrl ? (
              <View style={styles.lockedVideoBox}>
                <Text style={styles.lockedTitle}>
                  {t(
                    'gym.videoNotReady',
                    'Demo video is not available yet.',
                  )}
                </Text>
              </View>
            ) : videoPath ? (
              <View style={styles.videoWrap}>
                <Video
                  key={offlineKey}
                  source={{ uri: toFileUri(videoPath) }}
                  style={styles.video}
                  controls
                  paused
                  resizeMode="contain"
                  playInBackground={false}
                  playWhenInactive={false}
                  onError={error => {
                    console.log(
                      '[gym workout mode] video error',
                      error,
                    );

                    Alert.alert(
                      t('premium.errorTitle', 'Error'),
                      t(
                        'video.error',
                        'Unable to play video. Please try again.',
                      ),
                    );
                  }}
                />
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.86}
                style={[
                  styles.downloadButton,
                  (downloading || preparingReward) &&
                    styles.buttonDisabled,
                ]}
                onPress={onDownloadVideo}
                disabled={downloading || preparingReward}
              >
                {preparingReward ? (
                  <View style={styles.downloadRow}>
                    <ActivityIndicator
                      color={BG}
                      style={styles.downloadSpinner}
                    />
                    <Text style={styles.downloadText}>
                      {t('ads.loading', 'Loading ad...')}
                    </Text>
                  </View>
                ) : downloading ? (
                  <View style={styles.downloadRow}>
                    <ActivityIndicator
                      color={BG}
                      style={styles.downloadSpinner}
                    />
                    <Text style={styles.downloadText}>
                      {t('video.downloading', 'Downloading')}{' '}
                      {downloadProgress}%
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.downloadText}>
                    {isPremium
                      ? t('gym.downloadVideo', 'Download video')
                      : t(
                          'gym.watchAdToDownloadVideo',
                          'Watch ad & download video',
                        )}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          {swapSuggestion ? (
            <View style={styles.warningBox}>
              <Text style={styles.warningTitle}>
                {translateGymDynamicText(
                  'swapSuggestionTitles',
                  swapSuggestion.title,
                  t,
                )}
              </Text>

              <Text style={styles.warningText}>
                {translateGymDynamicText(
                  'swapSuggestionTexts',
                  swapSuggestion.text,
                  t,
                )}
              </Text>
            </View>
          ) : null}

          <View style={styles.suggestionBox}>
            <Text style={styles.previousLabel}>
              {t(
                'retention.lastTime',
                'Last workout',
              )}
            </Text>

            <Text style={styles.previousValue}>
              {lastPerformance
                ? `${lastPerformance.weightKg}kg × ${lastPerformance.reps} • ${lastPerformance.sets} ${t(
                    'gym.sets',
                    'sets',
                  )}`
                : t(
                    'retention.noPreviousData',
                    'No previous result yet.',
                  )}
            </Text>

            <Text style={styles.suggestionTitle}>
              {t('gym.suggestedWeight', 'Suggested weight')}
            </Text>

            <Text style={styles.suggestionText}>
              {suggestionText
                ? translateGymDynamicText(
                    'coachSuggestions',
                    suggestionText,
                    t,
                  )
                : t('gym.startLight', {
                    defaultValue: 'Start light and focus on technique.',
                  })}
            </Text>

            {suggestionReason ? (
              <Text style={styles.suggestionReason}>
                {translateGymDynamicText('coachReasons', suggestionReason, t)}
              </Text>
            ) : null}
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>
                {t('gym.weightKg', 'Kg')}
              </Text>

              <TextInput
                value={weightKg}
                onChangeText={setWeightKg}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor="#64748B"
                style={styles.input}
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.inputLabel}>
                {t('gym.reps', 'Reps')}
              </Text>

              <TextInput
                value={reps}
                onChangeText={setReps}
                keyboardType="number-pad"
                placeholder={exercise.reps}
                placeholderTextColor="#64748B"
                style={styles.input}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.completeSetButton}
            onPress={onCompleteSet}
            disabled={finishing}
          >
            <Text style={styles.completeSetText}>
              {t('gym.completeSet', 'Complete set')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.secondaryButton}
            onPress={goNext}
            disabled={finishing}
          >
            <Text style={styles.secondaryButtonText}>
              {t('gym.nextStep', 'Next step')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <GymRpeModal
        visible={exerciseRpeVisible}
        title={t('gym.exerciseRpe', 'How hard was this exercise?')}
        subtitle={translateExerciseName(exercise, t)}
        onSelect={onSelectExerciseRpe}
        onClose={() => setExerciseRpeVisible(false)}
      />

      <GymRpeModal
        visible={sessionRpeVisible}
        title={t('gym.sessionRpeTitle', 'How hard was this workout?')}
        subtitle={t(
          'gym.sessionRpeSubtitle',
          'This helps the app adjust your next workout weight.',
        )}
        onSelect={(rpe) => {
          setSessionRpeVisible(false);
          finishWorkout(rpe);
        }}
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
  dayTitle: {
    color: TEXT,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  daySubtitle: {
    color: MUTED,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 8,
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#1F2A38',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 14,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: NEON,
    borderRadius: 999,
  },
  restBox: {
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
    borderColor: 'rgba(124, 255, 58, 0.35)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  restLabel: {
    color: NEON,
    fontWeight: '900',
    fontSize: 13,
  },
  restTime: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 42,
    marginTop: 4,
  },
  skipButton: {
    marginTop: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  skipButtonText: {
    color: NEON,
    fontWeight: '900',
  },
  exerciseCard: {
    backgroundColor: CARD,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 16,
  },
  exerciseStep: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  exerciseName: {
    color: TEXT,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
  },
  exerciseMeta: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 8,
  },
  exerciseNote: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  demoBox: {
    marginTop: 14,
    backgroundColor: '#06111D',
    borderRadius: 16,
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
  warningBox: {
    backgroundColor: 'rgba(250, 204, 21, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.35)',
    borderRadius: 16,
    padding: 12,
    marginTop: 14,
  },
  warningTitle: {
    color: '#FACC15',
    fontWeight: '900',
    fontSize: 13,
  },
  warningText: {
    color: '#FDE68A',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  readinessCard: {
    backgroundColor:
      'rgba(25, 230, 210, 0.09)',
    borderRadius: 17,
    borderWidth: 1,
    borderColor:
      'rgba(25, 230, 210, 0.28)',
    padding: 12,
    marginBottom: 14,
  },
  readinessKicker: {
    color: CYAN,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  readinessTitle: {
    color: NEON,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 5,
  },
  readinessText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  previousLabel: {
    color: MUTED,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  previousValue: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 4,
    marginBottom: 12,
  },
  suggestionBox: {
    backgroundColor: '#06111D',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.22)',
    borderRadius: 16,
    padding: 12,
    marginTop: 14,
  },
  suggestionTitle: {
    color: CYAN,
    fontWeight: '900',
    fontSize: 13,
  },
  suggestionText: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 15,
    marginTop: 5,
  },
  suggestionReason: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  inputBlock: {
    flex: 1,
    marginRight: 10,
  },
  inputLabel: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#06111D',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    borderRadius: 14,
    color: TEXT,
    minHeight: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '900',
  },
  completeSetButton: {
    marginTop: 18,
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  completeSetText: {
    color: BG,
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    marginTop: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.35)',
    paddingVertical: 13,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: NEON,
    fontSize: 15,
    fontWeight: '900',
  },
  notFound: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
    margin: 18,
  },
});

export default GymWorkoutModeScreen;