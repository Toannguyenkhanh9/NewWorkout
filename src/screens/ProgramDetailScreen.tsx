// FILE: src/screens/ProgramDetailScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  SectionList,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import { PROGRAMS, generateProgramDays, WorkoutDay } from '../data/programs';
import { markActive } from '../store/activePrograms';
import { gateWorkout } from '../ads/adGate';
import { useSubscription } from '../iap/SubscriptionProvider';
import { useToast } from '../ui/Toast';
import { trackWorkoutTapAndMaybeAsk } from '../review/rate';
import { markWorkoutActivity } from '../notifications/reminder';
import { ensureTrialAccess } from '../ads/trial';
import { markSessionCompleted } from '../store/progressStats';
import { addWorkoutHistory } from '../store/workoutHistory';

type Section = {
  title: string;
  data: WorkoutDay[];
};

const BG = '#06111D';
const CARD = '#0B1624';
const CARD_2 = '#101C2B';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const DayRow: React.FC<{
  day: WorkoutDay;
  completed: boolean;
  onPress: () => void;
  t: any;
}> = ({ day, completed, onPress, t }) => {
  const isRest = !!day.isRest;

  return (
    <TouchableOpacity
      activeOpacity={isRest ? 1 : 0.86}
      onPress={onPress}
      disabled={isRest}
      style={[
        styles.dayCard,
        completed && styles.dayCardDone,
        isRest && styles.dayCardRest,
      ]}
    >
      <View style={styles.dayLeft}>
        <View
          style={[
            styles.dayNumberCircle,
            completed && styles.dayNumberDone,
            isRest && styles.dayNumberRest,
          ]}
        >
          <Text
            style={[
              styles.dayNumberText,
              completed && styles.dayNumberTextDone,
              isRest && styles.dayNumberTextRest,
            ]}
          >
            {isRest ? '💤' : day.dayNumber || '•'}
          </Text>
        </View>
      </View>

      <View style={styles.dayMiddle}>
        <Text style={styles.dayTitle} numberOfLines={1}>
          {isRest
            ? t('program.restDay', 'Recovery / Rest')
            : day.name || t('program.dayTitle', { n: day.dayNumber || '' })}
        </Text>

        <Text style={styles.dayMeta} numberOfLines={1}>
          {isRest
            ? t('program.restDesc', 'Stretch, hydrate and recover')
            : `${day.durationMin || 0} ${t('workouts.min', 'min')}`}
        </Text>
      </View>

      <View style={styles.dayRight}>
        {completed ? (
          <View style={styles.checkCircle}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        ) : isRest ? (
          <Text style={styles.restEmoji}>🛏️</Text>
        ) : (
          <View style={styles.playCircle}>
            <Text style={styles.playText}>▶</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export const ProgramDetailScreen: React.FC = () => {
  const { isPremium } = useSubscription?.() || { isPremium: false };
  const { t } = useTranslation();
  const toast = useToast();

  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { programId } = route.params || {};

  const program = PROGRAMS.find((p) => p.id === programId);
  const STORAGE_KEY = `program:${programId}:completed`;

  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});

  const days = useMemo(() => {
    return program ? generateProgramDays(program) : [];
  }, [program]);

  const workoutDaysCount = useMemo(() => {
    return days.filter((d) => !d.isRest).length;
  }, [days]);

  const completedCount = useMemo(() => {
    return Object.values(completedDays).filter(Boolean).length;
  }, [completedDays]);

  const progressPercent = useMemo(() => {
    if (!workoutDaysCount) return 0;
    return Math.min(100, Math.round((completedCount / workoutDaysCount) * 100));
  }, [completedCount, workoutDaysCount]);

  const sections: Section[] = useMemo(() => {
    const out: Section[] = [];

    for (let i = 0; i < days.length; i += 7) {
      const chunk = days.slice(i, i + 7);
      const weekNo = Math.floor(i / 7) + 1;

      out.push({
title: t('program.weekTitle', {
  n: weekNo,
  defaultValue: 'Week {{n}}',
}),
        data: chunk,
      });
    }

    return out;
  }, [days, t]);

  useEffect(() => {
    if (!program) return;

    navigation.setOptions({
      title: t(program.titleKey),
      headerStyle: {
        backgroundColor: BG,
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: '900',
      },
    });

    markActive(program.id).catch(() => {});
  }, [navigation, program, t]);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          setCompletedDays(JSON.parse(json));
        }
      } catch {
        setCompletedDays({});
      }
    })();
  }, [STORAGE_KEY]);

  useEffect(() => {
    (async () => {
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
              onPress: () => navigation.goBack(),
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
      }
    })();
  }, [program, isPremium, navigation, t]);

  const onPressDay = async (day: WorkoutDay) => {
    if (!program) return;
    if (day.isRest) return;

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

    const wasCompleted = !!completedDays[day.id];
    const updated = {
      ...completedDays,
      [day.id]: true,
    };

    setCompletedDays(updated);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => {});

    if (!wasCompleted) {
      await markSessionCompleted(programId, day.id);

      await addWorkoutHistory({
        programId,
        dayId: day.id,
        workoutName: day.name || `Day ${day.dayNumber || ''}`.trim(),
        durationMin: (day as any).durationMin,
      });
    }

navigation.navigate('WorkoutWeb', {
  programId,
  dayId: day.id,
  sessionKey: day.sessionKey,
  videoUrl: day.webUrl ?? day.videoUrl,
  name: day.name,
  durationMinutes: day.durationMin || 25,
  downloadVideos: day.downloadVideos || [],
});
  };

  if (!program) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.notFoundCard}>
<Text style={styles.notFoundTitle}>
  {t('program.notFoundTitle', 'Program not found')}
</Text>

<Text style={styles.notFoundText}>
  {t(
    'program.notFoundText',
    'This workout program is not available.',
  )}
</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View pointerEvents="none" style={styles.bgGlowOne} />
      <View pointerEvents="none" style={styles.bgGlowTwo} />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.kickerPill}>
<Text style={styles.kickerText}>
  {program.premium
    ? t('program.premiumProgram', 'PREMIUM PROGRAM')
    : t('program.workoutProgram', 'WORKOUT PROGRAM')}
</Text>
            </View>

            <Text style={styles.programTitle}>{t(program.titleKey)}</Text>

            <Text style={styles.programMeta}>
              {program.durationDays} {t('workouts.days', 'days')} •{' '}
              {completedCount}/{workoutDaysCount}{' '}
              {t('program.completed', 'completed')}
            </Text>

            <View style={styles.progressCard}>
              <View style={styles.progressTop}>
                <Text style={styles.progressTitle}>
                  {t('program.weeklyPlan', 'Weekly training plan')}
                </Text>
                <Text style={styles.progressPercent}>{progressPercent}%</Text>
              </View>

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

              <Text style={styles.progressDesc}>
                {t(
                  'program.planDesc',
                  'Open each training day, follow the workout video and stay consistent week by week.',
                )}
              </Text>
            </View>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.section}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <DayRow
            day={item}
            completed={!!completedDays[item.id]}
            onPress={() => onPressDay(item)}
            t={t}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  bgGlowOne: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(25, 230, 210, 0.24)',
  },
  bgGlowTwo: {
    position: 'absolute',
    bottom: 60,
    left: -120,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },

  listContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 150,
  },

  header: {
    marginBottom: 16,
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
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1,
  },
  programTitle: {
    color: TEXT,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  programMeta: {
    color: MUTED,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },

  progressCard: {
    backgroundColor: 'rgba(11, 22, 36, 0.96)',
    borderRadius: 22,
    padding: 16,
    marginTop: 18,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
  },
  progressPercent: {
    color: NEON,
    fontSize: 18,
    fontWeight: '900',
  },
  progressTrack: {
    height: 11,
    backgroundColor: '#1F2A38',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 14,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: NEON,
  },
  progressDesc: {
    color: MUTED,
    marginTop: 12,
    lineHeight: 20,
    fontSize: 13,
  },

  sectionHeader: {
    marginTop: 10,
    marginBottom: 8,
  },
  section: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 20,
  },

  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 22, 36, 0.96)',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  dayCardDone: {
    borderColor: 'rgba(124, 255, 58, 0.55)',
    backgroundColor: 'rgba(12, 38, 27, 0.96)',
  },
  dayCardRest: {
    backgroundColor: 'rgba(15, 23, 42, 0.78)',
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },

  dayLeft: {
    marginRight: 12,
  },
  dayNumberCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumberDone: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  dayNumberRest: {
    backgroundColor: 'rgba(148, 163, 184, 0.12)',
    borderColor: 'rgba(148, 163, 184, 0.25)',
  },
  dayNumberText: {
    color: CYAN,
    fontWeight: '900',
    fontSize: 16,
  },
  dayNumberTextDone: {
    color: BG,
  },
  dayNumberTextRest: {
    color: MUTED,
    fontSize: 17,
  },

  dayMiddle: {
    flex: 1,
  },
  dayTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 16,
  },
  dayMeta: {
    color: MUTED,
    fontSize: 13,
    marginTop: 5,
    fontWeight: '600',
  },
  dayRight: {
    marginLeft: 10,
  },
  checkCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: BG,
    fontSize: 18,
    fontWeight: '900',
  },
  playCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(124, 255, 58, 0.16)',
    borderWidth: 1,
    borderColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: {
    color: NEON,
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 2,
  },
  restEmoji: {
    fontSize: 22,
  },

  notFoundCard: {
    margin: 18,
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
  },
  notFoundTitle: {
    color: '#FCA5A5',
    fontWeight: '900',
    fontSize: 18,
  },
  notFoundText: {
    color: MUTED,
    marginTop: 8,
    lineHeight: 20,
  },
});

export default ProgramDetailScreen;