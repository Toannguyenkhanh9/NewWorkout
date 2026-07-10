// FILE: src/screens/MainScreen.tsx
import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { PROGRAMS, WorkoutProgram } from '../data/programs';
import { getActiveIds } from '../store/activePrograms';
import { shouldPromptNow } from '../weight/weightStore';
import { WeightPrompt } from '../components/WeightPrompt';
import { ActiveProgramsCard, ActiveItem } from '../components/ActiveProgramsCard';
import { getBeginnerMode, toggleBeginnerMode } from '../store/beginnerMode';
import { BeginnerGlossaryCard } from '../components/BeginnerGlossaryCard';
import { getTodayWorkoutFromActivePrograms, TodayWorkout } from '../utils/todayWorkout';
import { useSubscription } from '../iap/SubscriptionProvider';
import { ensureTrialAccess } from '../ads/trial';
import { gateWorkout } from '../ads/adGate';
import { useToast } from '../ui/Toast';
import { trackWorkoutTapAndMaybeAsk } from '../review/rate';
import { markWorkoutActivity } from '../notifications/reminder';
import { markSessionCompleted } from '../store/progressStats';
import {
  addWorkoutHistory,
  getWorkoutHistory,
  getWeeklyWorkoutCount,
  getTotalWorkoutMinutes,
  WorkoutHistoryEntry,
} from '../store/workoutHistory';
import { getAchievements, AchievementItem } from '../store/achievements';
import {
  getActiveChallengeState,
  startChallenge,
  ActiveChallengeState,
} from '../store/challenges';
import { WorkoutHistoryCard } from '../components/WorkoutHistoryCard';
import { AchievementsCard } from '../components/AchievementsCard';
import { ChallengeCard } from '../components/ChallengeCard';
import { GamificationCard } from '../components/GamificationCard';

const BG_IMAGE = require('../../assets/images/backgound.png');

const BMI_KEY = 'user:bmi';
const RECO_KEY = 'user:recommendation';

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.94)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const MiniStat: React.FC<{
  label: string;
  value: string | number;
  icon: string;
}> = ({ label, value, icon }) => (
  <View style={styles.miniStat}>
    <Text style={styles.miniStatIcon}>{icon}</Text>
    <Text style={styles.miniStatValue}>{value}</Text>
    <Text style={styles.miniStatLabel}>{label}</Text>
  </View>
);

export const MainScreen: React.FC<any> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { isPremium } = useSubscription?.() || { isPremium: false };
  const toast = useToast();

  const [activePrograms, setActivePrograms] = useState<WorkoutProgram[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [completedMaps, setCompletedMaps] = useState<Record<string, Record<string, boolean>>>({});
  const [showWeight, setShowWeight] = useState(false);
  const [beginnerMode, setBeginnerModeState] = useState(false);

  const [bmi, setBmi] = useState<number | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);

  const [historyItems, setHistoryItems] = useState<WorkoutHistoryEntry[]>([]);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [weeklyMinutes, setWeeklyMinutes] = useState(0);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<ActiveChallengeState | null>(null);

  const computeProgress = useCallback(async (ids: string[]) => {
    const progressObj: Record<string, number> = {};
    const completedObj: Record<string, Record<string, boolean>> = {};

    for (const id of ids) {
      const key = `program:${id}:completed`;

      try {
        const json = await AsyncStorage.getItem(key);
        const map = json ? (JSON.parse(json) as Record<string, boolean>) : {};

        completedObj[id] = map;
        progressObj[id] = Object.values(map).filter(Boolean).length;
      } catch {
        completedObj[id] = {};
        progressObj[id] = 0;
      }
    }

    setCompletedMaps(completedObj);
    setProgress(progressObj);
  }, []);

  const loadHealthAdvice = useCallback(async () => {
    try {
      const [bmiStr, reco] = await Promise.all([
        AsyncStorage.getItem(BMI_KEY),
        AsyncStorage.getItem(RECO_KEY),
      ]);

      setBmi(bmiStr ? parseFloat(bmiStr) : null);
      setAdvice(reco || null);
    } catch {
      setBmi(null);
      setAdvice(null);
    }
  }, []);

  const loadBeginnerMode = useCallback(async () => {
    setBeginnerModeState(await getBeginnerMode());
  }, []);

  const loadExtraCards = useCallback(async () => {
    const [history, weekCount, minutes, achievementItems, challengeState] =
      await Promise.all([
        getWorkoutHistory(5),
        getWeeklyWorkoutCount(7),
        getTotalWorkoutMinutes(7),
        getAchievements(PROGRAMS),
        getActiveChallengeState(),
      ]);

    setHistoryItems(history);
    setWeeklyCount(weekCount);
    setWeeklyMinutes(minutes);
    setAchievements(achievementItems);
    setActiveChallenge(challengeState);
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const ids = await getActiveIds();
        const list = PROGRAMS.filter((p) => ids.includes(p.id));

        setActivePrograms(list);

        await Promise.all([
          computeProgress(ids),
          loadHealthAdvice(),
          loadBeginnerMode(),
          loadExtraCards(),
        ]);

        if (await shouldPromptNow()) {
          setShowWeight(true);
        }
      })();
    }, [computeProgress, loadHealthAdvice, loadBeginnerMode, loadExtraCards]),
  );

  const items: ActiveItem[] = useMemo(
    () =>
      activePrograms.map((p) => ({
        id: p.id,
        title: t(p.titleKey) as string,
        daysDone: progress[p.id] ?? 0,
        daysTotal: p.durationDays,
        icon: p.icon,
      })),
    [activePrograms, progress, t],
  );

  const todayWorkout = useMemo<TodayWorkout | null>(() => {
    return getTodayWorkoutFromActivePrograms(activePrograms, completedMaps);
  }, [activePrograms, completedMaps]);

  const openProgramById = async (programId: string) => {
    const program = PROGRAMS.find((p) => p.id === programId);
    if (!program) return;

    let trial = false;

    if (!isPremium) {
      trial = await ensureTrialAccess();
    }

    const locked = !!program.premium && !isPremium && !trial;

    if (locked) {
      Alert.alert(
        t('premium.lockedTitle', 'Premium required'),
        t(
          'premium.lockedText',
          'This program is available for Premium users only. Upgrade to continue.',
        ),
        [
          {
            text: t('common.cancel', 'Cancel'),
            style: 'cancel',
          },
          {
            text: t('premium.cta', 'Upgrade now'),
            onPress: () =>
              navigation.getParent()?.navigate('Settings', {
                screen: 'Premium',
              }),
          },
        ],
      );
      return;
    }

    navigation.navigate('ProgramDetail', { programId });
  };

  const openTodayWorkout = async () => {
    if (!todayWorkout || (todayWorkout as any).kind === 'rest') return;

    const workoutItem: any = todayWorkout;
    const { program, day } = workoutItem;

    let trial = false;

    if (!isPremium) {
      trial = await ensureTrialAccess();
    }

    const locked = !!program.premium && !isPremium && !trial;

    if (locked) {
      Alert.alert(
        t('premium.lockedTitle', 'Premium required'),
        t(
          'premium.lockedText',
          'This program is available for Premium users only. Upgrade to continue.',
        ),
        [
          {
            text: t('common.cancel', 'Cancel'),
            style: 'cancel',
          },
          {
            text: t('premium.cta', 'Upgrade now'),
            onPress: () =>
              navigation.getParent()?.navigate('Settings', {
                screen: 'Premium',
              }),
          },
        ],
      );
      return;
    }

    const result = await gateWorkout({
      isPremium,
      startTrialOnFirstUse: true,
    });

    if (result === 'closed') {
      toast.show(
        t('ads.need_full', 'You need to watch the entire ad to continue'),
      );
      return;
    }

    if (result === 'not_ready') {
      toast.show(
        t('ads.not_ready', 'Ad is loading, please try again in a few seconds'),
      );
      return;
    }

    if (result === 'error') {
      toast.show(t('ads.load_failed', 'Unable to load ad, please try again'));
      return;
    }

    await markWorkoutActivity();
    trackWorkoutTapAndMaybeAsk();

    const storageKey = `program:${program.id}:completed`;
    const currentCompleted = completedMaps[program.id] || {};
    const wasCompleted = !!currentCompleted[day.id];

    const updatedCompleted = {
      ...currentCompleted,
      [day.id]: true,
    };

    await AsyncStorage.setItem(storageKey, JSON.stringify(updatedCompleted)).catch(() => {});

    setCompletedMaps((prev) => ({
      ...prev,
      [program.id]: updatedCompleted,
    }));

    setProgress((prev) => ({
      ...prev,
      [program.id]: Object.values(updatedCompleted).filter(Boolean).length,
    }));

    if (!wasCompleted) {
      await markSessionCompleted(program.id, day.id);

      await addWorkoutHistory({
        programId: program.id,
        dayId: day.id,
        workoutName: day.name || `Day ${day.dayNumber || ''}`.trim(),
        durationMin: day.durationMin,
      });

      await loadExtraCards();
    }

    navigation.navigate('WorkoutWeb', {
      programId: program.id,
      dayId: day.id,
      sessionKey: day.sessionKey,
      videoUrl: day.webUrl ?? day.videoUrl,
      name: day.name,
    });
  };

  const onToggleBeginnerMode = async () => {
    const next = await toggleBeginnerMode();
    setBeginnerModeState(next);
  };

  const onStart7Day = async () => {
    await startChallenge('starter_7');
    setActiveChallenge(await getActiveChallengeState());
  };

  const onStart30Day = async () => {
    await startChallenge('consistency_30');
    setActiveChallenge(await getActiveChallengeState());
  };

  const isRestToday = !!todayWorkout && (todayWorkout as any).kind === 'rest';

  return (
    <ImageBackground source={BG_IMAGE} style={styles.bg} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={styles.darkOverlay} />
      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.hero}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>FITNESS APP</Text>
              </View>

              <Text style={styles.appName}>
                Insanity Deluxe
              </Text>

              <Text style={styles.appNameAccent}>
                Edition
              </Text>

              <Text style={styles.subtitle}>
                {t('home.subtitle', 'Pick a program and train daily')}
              </Text>
            </View>

            <View style={styles.statRow}>
              <MiniStat
                icon="🔥"
                value={weeklyCount}
                label={t('history.thisWeek', 'This week')}
              />

              <MiniStat
                icon="⏱️"
                value={weeklyMinutes}
                label={t('history.minutes', 'Minutes')}
              />

              <MiniStat
                icon="🏆"
                value={achievements.filter((x: any) => x.completed).length}
                label={t('achievements.title', 'Achievements')}
              />
            </View>

            {advice ? (
              <View style={styles.healthCard}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardTitle}>
                      {t('home.health_overview', 'Health overview')}
                    </Text>

                    <Text style={styles.cardSub}>
                      {t('onboard.bmi', 'BMI')}: {bmi ?? '—'}
                    </Text>
                  </View>

                  <View style={styles.roundIcon}>
                    <Text style={styles.roundIconText}>❤</Text>
                  </View>
                </View>

                <Text style={styles.healthText}>{advice}</Text>
              </View>
            ) : null}
            



            {todayWorkout && !isRestToday ? (
              <View style={styles.todayCard}>
                <Text style={styles.todayKicker}>
                  {t('todayWorkout.title', "Today's workout")}
                </Text>

                <Text style={styles.todayName}>
                  {(todayWorkout as any).day.name ||
                    t('todayWorkout.fallback', 'Workout')}
                </Text>

                <Text style={styles.todayMeta}>
                  {(t((todayWorkout as any).program.titleKey) as string)} •{' '}
                  {t('program.day', 'Day')}{' '}
                  {(todayWorkout as any).day.dayNumber}
                </Text>

                <TouchableOpacity
                  style={styles.startButton}
                  onPress={openTodayWorkout}
                  activeOpacity={0.88}
                >
                  <Text style={styles.startButtonText}>
                    {t('todayWorkout.startNow', 'Start now')}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {isRestToday ? (
              <View style={styles.restCard}>
                <Text style={styles.restTitle}>
                  {t('todayWorkout.restTitle', 'Today is a recovery day')}
                </Text>

                <Text style={styles.restText}>
                  {t(
                    'todayWorkout.restText',
                    'Take a break, stretch gently, drink water, and get ready for your next workout.',
                  )}
                </Text>
              </View>
            ) : null}
            <GamificationCard
  t={t as any}
  onStartWorkout={() => {
    navigation.getParent()?.navigate('Workout');
  }}
/>
            <View style={styles.modeCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>
                  {t('beginner.modeTitle', 'Beginner mode')}
                </Text>

                <Text style={styles.cardSub}>
                  {t(
                    'beginner.modeDesc',
                    'Simple explanations and quick guidance for new users.',
                  )}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  beginnerMode && styles.toggleButtonActive,
                ]}
                onPress={onToggleBeginnerMode}
                activeOpacity={0.86}
              >
                <Text
                  style={[
                    styles.toggleText,
                    beginnerMode && styles.toggleTextActive,
                  ]}
                >
                  {beginnerMode ? t('common.on', 'ON') : t('common.off', 'OFF')}
                </Text>
              </TouchableOpacity>
            </View>
            {beginnerMode ? (
              <View style={styles.lightComponentWrap}>
                <BeginnerGlossaryCard />
              </View>
            ) : null}

            <View style={styles.lightComponentWrap}>
              <WorkoutHistoryCard
                items={historyItems}
                weeklyCount={weeklyCount}
                weeklyMinutes={weeklyMinutes}
                t={t as any}
                onPressViewAll={() => navigation.navigate('WorkoutHistory')}
              />
            </View>

            <View style={styles.lightComponentWrap}>
              <AchievementsCard items={achievements} t={t as any} />
            </View>

            <View style={styles.lightComponentWrap}>
              <ChallengeCard
                active={activeChallenge}
                onStart7={onStart7Day}
                onStart30={onStart30Day}
                t={t as any}
              />
            </View>

            <View style={styles.bottomArea}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>
                  {t('home.activeTitle', 'Đang tập luyện')}
                </Text>
                <Text style={styles.sectionSub}>
                  {items.length} {t('workouts.programs', 'programs')}
                </Text>
              </View>

              <View style={styles.lightComponentWrap}>
                <ActiveProgramsCard
                  items={items}
                  onOpenProgram={openProgramById}
                  title={t('home.activeTitle', 'Đang tập luyện')}
                />
              </View>

              <Text style={styles.footer}>
                {t('footer.devBy', { name: 'Kevin' })}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <WeightPrompt
        visible={showWeight}
        onClose={() => setShowWeight(false)}
        onSaved={loadHealthAdvice}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: BG,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 7, 18, 0.78)',
  },
  glowTop: {
    position: 'absolute',
    top: -90,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(25, 230, 210, 0.22)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: 80,
    left: -120,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160,
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  hero: {
    paddingTop: 8,
    marginBottom: 16,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.8)',
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    marginBottom: 12,
  },
  heroBadgeText: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  appName: {
    color: TEXT,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  appNameAccent: {
    color: NEON,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: '#D8E4F0',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    maxWidth: 330,
  },

  statRow: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginBottom: 12,
  },
  miniStat: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  miniStatIcon: {
    fontSize: 20,
    marginBottom: 7,
  },
  miniStatValue: {
    color: TEXT,
    fontSize: 22,
    fontWeight: '900',
  },
  miniStatLabel: {
    color: MUTED,
    fontSize: 11,
    marginTop: 3,
    fontWeight: '700',
  },

  healthCard: {
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  todayCard: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.32)',
  },
  restCard: {
    backgroundColor: 'rgba(69, 40, 12, 0.88)',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 17,
  },
  cardSub: {
    color: MUTED,
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
  },
  healthText: {
    color: '#E5E7EB',
    lineHeight: 21,
    marginTop: 12,
    fontSize: 14,
  },
  roundIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 255, 58, 0.16)',
    borderWidth: 1,
    borderColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundIconText: {
    color: NEON,
    fontSize: 20,
    fontWeight: '900',
  },

  toggleButton: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: CARD_2,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.24)',
  },
  toggleButtonActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  toggleText: {
    color: MUTED,
    fontWeight: '900',
    fontSize: 12,
  },
  toggleTextActive: {
    color: BG,
  },

  todayKicker: {
    color: CYAN,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  todayName: {
    color: TEXT,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 8,
  },
  todayMeta: {
    color: MUTED,
    marginTop: 5,
    fontSize: 13,
    fontWeight: '700',
  },
  startButton: {
    backgroundColor: NEON,
    borderRadius: 15,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 14,
  },
  startButtonText: {
    color: BG,
    fontWeight: '900',
    fontSize: 15,
  },

  restTitle: {
    color: '#FDE68A',
    fontWeight: '900',
    fontSize: 17,
  },
  restText: {
    color: '#FFF7ED',
    lineHeight: 21,
    marginTop: 8,
  },

  lightComponentWrap: {
    marginBottom: 12,
    borderRadius: 22,
    overflow: 'hidden',
  },

  bottomArea: {
    paddingTop: 4,
  },
  sectionTitleRow: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 20,
  },
  sectionSub: {
    color: MUTED,
    fontSize: 12,
    marginTop: 3,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    color: MUTED,
    marginTop: 12,
    fontSize: 12,
  },
});

export default MainScreen;