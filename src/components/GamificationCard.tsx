// FILE: src/components/GamificationCard.tsx
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  ACHIEVEMENTS,
  AchievementId,
  DailyMission,
  GAMIFICATION_CHANGED_EVENT,
  GamificationState,
  completeDailyMission,
  getLevelInfo,
  loadGamification,
  markWaterGoalCompleted,
} from '../services/gamification';

type Props = {
  t: (key: string, defaultValue?: string, options?: any) => string;
  onStartWorkout?: () => void;
};

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const GamificationCard: React.FC<Props> = ({ t, onStartWorkout }) => {
  const [state, setState] = useState<GamificationState | null>(null);
  const [lastUnlocked, setLastUnlocked] = useState<AchievementId | null>(null);

  const reload = useCallback(async () => {
    const next = await loadGamification();
    setState(next);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener(
      GAMIFICATION_CHANGED_EVENT,
      (payload) => {
        if (payload?.state) {
          setState(payload.state);
        } else {
          reload();
        }

        const first = payload?.unlockedAchievements?.[0];

        if (first) {
          setLastUnlocked(first);
        }
      },
    );

    return () => {
      sub.remove();
    };
  }, [reload]);

  const onPressMission = async (mission: DailyMission) => {
    if (mission.completed) return;

    if (mission.id === 'workout' && onStartWorkout) {
      onStartWorkout();
      return;
    }

    const result =
      mission.id === 'water'
        ? await markWaterGoalCompleted()
        : await completeDailyMission(mission.id);

    setState(result.state);

    if (result.unlockedAchievements[0]) {
      setLastUnlocked(result.unlockedAchievements[0]);
    }
  };

  if (!state) {
    return null;
  }

  const levelInfo = getLevelInfo(state.totalXp);
  const unlockedAchievement = lastUnlocked
    ? ACHIEVEMENTS.find((item) => item.id === lastUnlocked)
    : null;

  return (
    <View style={styles.card}>
      <View style={styles.glow} />

      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>
            {t('gamification.kicker', 'YOUR PROGRESS')}
          </Text>

          <Text style={styles.title}>
            {t('gamification.title', 'Fitness journey')}
          </Text>

          <Text style={styles.subtitle}>
            {t(
              'gamification.subtitle',
              'Complete missions, build your streak and level up.',
            )}
          </Text>
        </View>

        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>
            {t('gamification.level', 'Level')} {levelInfo.level}
          </Text>
        </View>
      </View>

      {unlockedAchievement ? (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.unlockedBox}
          onPress={() => setLastUnlocked(null)}
        >
          <Text style={styles.unlockedEmoji}>
            {unlockedAchievement.emoji}
          </Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.unlockedTitle}>
              {t('gamification.unlocked', 'Achievement unlocked!')}
            </Text>

            <Text style={styles.unlockedText}>
              {t(
                unlockedAchievement.titleKey,
                unlockedAchievement.defaultTitle,
              )}
            </Text>
          </View>

          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.xpBox}>
        <View style={styles.xpHeader}>
          <Text style={styles.xpText}>
            {levelInfo.currentXp} / {levelInfo.nextXp} XP
          </Text>

          <Text style={styles.xpPercent}>
            {levelInfo.progressPercent}%
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${levelInfo.progressPercent}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>🔥 {state.streak}</Text>
          <Text style={styles.statLabel}>
            {t('gamification.todayStreak', 'Streak')}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>🏆 {state.bestStreak}</Text>
          <Text style={styles.statLabel}>
            {t('gamification.bestStreak', 'Best')}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>💪 {state.completedWorkouts}</Text>
          <Text style={styles.statLabel}>
            {t('gamification.workouts', 'Workouts')}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        {t('gamification.dailyMissions', 'Daily missions')}
      </Text>

      <View style={styles.missionList}>
        {state.missions.map((mission) => {
          const done = mission.completed;

          return (
            <TouchableOpacity
              key={mission.id}
              activeOpacity={0.86}
              style={[
                styles.missionRow,
                done && styles.missionRowDone,
              ]}
              onPress={() => onPressMission(mission)}
            >
              <View style={[styles.checkCircle, done && styles.checkDone]}>
                <Text style={styles.checkText}>
                  {done ? '✓' : '+'}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.missionTitle,
                    done && styles.missionTitleDone,
                  ]}
                >
                  {t(mission.titleKey, mission.defaultTitle)}
                </Text>

                <Text style={styles.missionXp}>+{mission.xp} XP</Text>
              </View>

              <Text style={done ? styles.doneText : styles.claimText}>
                {done
                  ? t('gamification.completed', 'Done')
                  : mission.id === 'workout'
                    ? t('gamification.startWorkout', 'Start')
                    : t('gamification.claim', 'Claim')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>
{t('gamification.achievementsTitle', 'Achievements')}
      </Text>

      <View style={styles.badgeGrid}>
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = state.achievements.includes(achievement.id);

          return (
            <View
              key={achievement.id}
              style={[
                styles.badge,
                unlocked && styles.badgeUnlocked,
              ]}
            >
              <Text
                style={[
                  styles.badgeEmoji,
                  !unlocked && styles.badgeLockedEmoji,
                ]}
              >
                {achievement.emoji}
              </Text>

              <Text
                style={[
                  styles.badgeText,
                  unlocked && styles.badgeTextUnlocked,
                ]}
                numberOfLines={2}
              >
                {t(achievement.titleKey, achievement.defaultTitle)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 26,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.25)',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -90,
    top: -80,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  kicker: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    marginBottom: 4,
  },
  title: {
    color: TEXT,
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
    maxWidth: 230,
  },
  levelBadge: {
    marginLeft: 'auto',
    backgroundColor: NEON,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  levelText: {
    color: BG,
    fontSize: 12,
    fontWeight: '900',
  },

  unlockedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 255, 58, 0.13)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.35)',
    borderRadius: 18,
    padding: 12,
    marginTop: 14,
  },
  unlockedEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  unlockedTitle: {
    color: NEON,
    fontSize: 13,
    fontWeight: '900',
  },
  unlockedText: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 2,
  },
  closeText: {
    color: MUTED,
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 8,
  },

  xpBox: {
    marginTop: 16,
    backgroundColor: CARD_2,
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
  },
  xpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  xpText: {
    color: TEXT,
    fontSize: 13,
    fontWeight: '900',
    flex: 1,
  },
  xpPercent: {
    color: NEON,
    fontSize: 13,
    fontWeight: '900',
  },
  progressTrack: {
    height: 9,
    borderRadius: 999,
    backgroundColor: 'rgba(148, 163, 184, 0.18)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: NEON,
  },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: CARD_2,
    borderRadius: 16,
    padding: 11,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },
  statValue: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
  },
  statLabel: {
    color: MUTED,
    fontSize: 12,
    marginTop: 5,
    fontWeight: '700',
  },

  sectionTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 10,
  },
  missionList: {
    gap: 8,
  },
  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_2,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
  },
  missionRowDone: {
    borderColor: 'rgba(124, 255, 58, 0.32)',
    backgroundColor: 'rgba(12, 38, 27, 0.9)',
  },
  checkCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(124, 255, 58, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.26)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  checkDone: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  checkText: {
    color: BG,
    fontWeight: '900',
    fontSize: 17,
  },
  missionTitle: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '900',
  },
  missionTitleDone: {
    color: NEON,
  },
  missionXp: {
    color: MUTED,
    fontSize: 12,
    marginTop: 3,
    fontWeight: '700',
  },
  claimText: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 8,
  },
  doneText: {
    color: NEON,
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 8,
  },

  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  badge: {
    width: '31.8%',
    minHeight: 96,
    marginHorizontal: 4,
    marginBottom: 8,
    backgroundColor: CARD_2,
    borderRadius: 16,
    padding: 9,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.45,
  },
  badgeUnlocked: {
    opacity: 1,
    borderColor: 'rgba(124, 255, 58, 0.38)',
    backgroundColor: 'rgba(12, 38, 27, 0.9)',
  },
  badgeEmoji: {
    fontSize: 25,
    marginBottom: 6,
  },
  badgeLockedEmoji: {
    opacity: 0.6,
  },
  badgeText: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 15,
  },
  badgeTextUnlocked: {
    color: TEXT,
  },
});

export default GamificationCard;