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
import { AdBanner } from '../components/AdBanner';
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
import { addWorkoutHistory, getWorkoutHistory, getWeeklyWorkoutCount, getTotalWorkoutMinutes, WorkoutHistoryEntry } from '../store/workoutHistory';
import { getAchievements, AchievementItem } from '../store/achievements';
import { getActiveChallengeState, startChallenge, ActiveChallengeState } from '../store/challenges';
import { WorkoutHistoryCard } from '../components/WorkoutHistoryCard';
import { AchievementsCard } from '../components/AchievementsCard';
import { ChallengeCard } from '../components/ChallengeCard';

const BG = require('../../assets/images/backgound.png');
const BMI_KEY = 'user:bmi';
const RECO_KEY = 'user:recommendation';

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
    const [history, weekCount, minutes, achievementItems, challengeState] = await Promise.all([
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

        if (await shouldPromptNow()) setShowWeight(true);
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
        t('premium.lockedText', 'This program is available for Premium users only. Upgrade to continue.'),
        [
          { text: t('common.cancel', 'Cancel'), style: 'cancel' },
          {
            text: t('premium.cta', 'Upgrade now'),
            onPress: () =>
              navigation.getParent()?.navigate('Settings', { screen: 'Premium' }),
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
        t('premium.lockedText', 'This program is available for Premium users only. Upgrade to continue.'),
        [
          { text: t('common.cancel', 'Cancel'), style: 'cancel' },
          {
            text: t('premium.cta', 'Upgrade now'),
            onPress: () =>
              navigation.getParent()?.navigate('Settings', { screen: 'Premium' }),
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
      toast.show(t('ads.need_full', 'You need to watch the entire ad to continue'));
      return;
    }

    if (result === 'not_ready') {
      toast.show(t('ads.not_ready', 'Ad is loading, please try again in a few seconds'));
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
        workoutName: day.name,
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
    <ImageBackground source={BG} style={styles.bg}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.headingWrap}>
              <Text style={styles.appName}>Insanity Deluxe Edition</Text>
              <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
            </View>

            {advice ? (
              <View style={styles.adviceCard}>
                <Text style={styles.adviceTitle}>{t('home.health_overview')}</Text>
                <Text style={styles.adviceBMI}>
                  {t('onboard.bmi')}: {bmi ?? '—'}
                </Text>
                <Text style={styles.adviceText}>{advice}</Text>
              </View>
            ) : null}

            <View style={styles.beginnerCard}>
              <View style={styles.beginnerHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.beginnerTitle}>
                    {t('beginner.modeTitle', 'Beginner mode')}
                  </Text>
                  <Text style={styles.beginnerSub}>
                    {t('beginner.modeDesc', 'Simple explanations and quick guidance for new users.')}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[styles.beginnerToggle, beginnerMode && styles.beginnerToggleActive]}
                  onPress={onToggleBeginnerMode}
                >
                  <Text
                    style={[
                      styles.beginnerToggleText,
                      beginnerMode && styles.beginnerToggleTextActive,
                    ]}
                  >
                    {beginnerMode ? t('common.on', 'ON') : t('common.off', 'OFF')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {todayWorkout && !isRestToday ? (
              <View style={styles.todayCard}>
                <Text style={styles.todayLabel}>
                  {t('todayWorkout.title', "Today's workout")}
                </Text>
                <Text style={styles.todayWorkoutName}>
                  {(todayWorkout as any).day.name || t('todayWorkout.fallback', 'Workout')}
                </Text>
                <Text style={styles.todayWorkoutMeta}>
                  {(t((todayWorkout as any).program.titleKey) as string)} • {t('program.day', 'Day')} {(todayWorkout as any).day.dayNumber}
                </Text>

                <TouchableOpacity style={styles.todayButton} onPress={openTodayWorkout}>
                  <Text style={styles.todayButtonText}>
                    {t('todayWorkout.startNow', 'Start now')}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {isRestToday ? (
              <View style={styles.restCard}>
                <Text style={styles.restLabel}>
                  {t('todayWorkout.restTitle', 'Today is a recovery day')}
                </Text>
                <Text style={styles.restText}>
                  {t('todayWorkout.restText', 'Take a break, stretch gently, drink water, and get ready for your next workout.')}
                </Text>
              </View>
            ) : null}

            {beginnerMode ? <BeginnerGlossaryCard /> : null}

<WorkoutHistoryCard
  items={historyItems}
  weeklyCount={weeklyCount}
  weeklyMinutes={weeklyMinutes}
  t={t as any}
  onPressViewAll={() => navigation.navigate('WorkoutHistory')}
/>

<AchievementsCard items={achievements} t={t as any} />

<ChallengeCard
  active={activeChallenge}
  onStart7={onStart7Day}
  onStart30={onStart30Day}
  t={t as any}
/>

            <View style={styles.bottomArea}>
              <ActiveProgramsCard
                items={items}
                onOpenProgram={openProgramById}
                title={t('home.activeTitle', 'Đang tập luyện')}
              />

              <View style={{ marginTop: 10 }}>
                <AdBanner />
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
  bg: { flex: 1 },
  safe: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  container: { paddingHorizontal: 16, paddingBottom: 12 },

  headingWrap: { alignItems: 'center', marginTop: 8 },
  appName: {
    fontSize: 30,
    fontWeight: '900',
    color: '#33e06dff',
    letterSpacing: 1.2,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#1d1b1bff',
    opacity: 0.95,
    marginTop: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  adviceCard: {
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
  adviceTitle: {
    color: '#0F172A',
    fontWeight: '900',
    marginBottom: 4,
    fontSize: 16,
  },
  adviceBMI: { color: '#065F46', fontWeight: '800', marginBottom: 4 },
  adviceText: { color: '#334155', lineHeight: 20 },

  beginnerCard: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  beginnerHeader: { flexDirection: 'row', alignItems: 'center' },
  beginnerTitle: { color: '#0F172A', fontWeight: '900', fontSize: 16 },
  beginnerSub: { color: '#64748B', marginTop: 4, fontSize: 13, lineHeight: 19 },
  beginnerToggle: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginLeft: 12,
  },
  beginnerToggleActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  beginnerToggleText: { color: '#334155', fontWeight: '900', fontSize: 12 },
  beginnerToggleTextActive: { color: '#065F46' },

  todayCard: {
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
  todayLabel: {
    color: '#0F766E',
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  todayWorkoutName: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 18,
    marginTop: 6,
  },
  todayWorkoutMeta: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
  },
  todayButton: {
    marginTop: 12,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  todayButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  restCard: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  restLabel: {
    color: '#B45309',
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  restText: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  bottomArea: {
    paddingTop: 10,
    paddingBottom: 6,
  },

  footer: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 12,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default MainScreen;