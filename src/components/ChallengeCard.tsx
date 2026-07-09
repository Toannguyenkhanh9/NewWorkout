// FILE: src/components/ChallengeCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ActiveChallengeState } from '../store/challenges';

type Props = {
  active: ActiveChallengeState | null;
  onStart7: () => void;
  onStart30: () => void;
  t: (key: string, defaultValue?: string, options?: any) => string;
};

const NEON = '#7CFF3A';
const CYAN = '#19E6D2';
const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';

export const ChallengeCard: React.FC<Props> = ({
  active,
  onStart7,
  onStart30,
  t,
}) => {
  const getTitle = (id?: string) => {
    switch (id) {
      case 'starter_7':
        return t('challenges.starter7Title', '7-Day Starter Challenge');
      case 'consistency_30':
        return t('challenges.consistency30Title', '30-Day Consistency Challenge');
      default:
        return '';
    }
  };

  const getDesc = (id?: string) => {
    switch (id) {
      case 'starter_7':
        return t('challenges.starter7Desc', 'Complete 5 workouts in 7 days.');
      case 'consistency_30':
        return t('challenges.consistency30Desc', 'Complete 20 workouts in 30 days.');
      default:
        return '';
    }
  };

  const percent =
    active?.definition
      ? Math.min(100, Math.round((active.progress / Math.max(1, active.target)) * 100))
      : 0;

  return (
    <View style={styles.card}>
      <View style={styles.glow} />

      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>CHALLENGE</Text>
          <Text style={styles.title}>
            {t('challenges.title', 'Challenges')}
          </Text>
        </View>

        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>⚡</Text>
        </View>
      </View>

      {active?.definition ? (
        <>
          <Text style={styles.challengeName}>
            {getTitle(active.definition.id)}
          </Text>

          <Text style={styles.challengeDesc}>
            {getDesc(active.definition.id)}
          </Text>

          <View style={styles.progressBox}>
            <View style={styles.progressTop}>
              <Text style={styles.progressText}>
                {active.progress}/{active.target}
              </Text>

              <Text style={styles.percentText}>{percent}%</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>

            <Text style={styles.subText}>
              {active.completed
                ? t('challenges.complete', 'Challenge completed')
                : t('challenges.daysLeft', '{{count}} day(s) left', {
                    count: active.daysLeft,
                  })}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.challengeDesc}>
            {t('challenges.intro', 'Start a short challenge to stay consistent.')}
          </Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onStart7}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryBtnText}>
              {t('challenges.start7', 'Start 7-day challenge')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={onStart30}
            activeOpacity={0.88}
          >
            <Text style={styles.secondaryBtnText}>
              {t('challenges.start30', 'Start 30-day challenge')}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(124, 255, 58, 0.10)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
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
    fontWeight: '900',
    fontSize: 18,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 255, 58, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
  },
  challengeName: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 17,
  },
  challengeDesc: {
    color: MUTED,
    lineHeight: 21,
    marginTop: 6,
    fontSize: 14,
  },
  progressBox: {
    marginTop: 14,
    backgroundColor: CARD_2,
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 22,
  },
  percentText: {
    color: NEON,
    fontWeight: '900',
    fontSize: 14,
  },
  progressTrack: {
    height: 10,
    backgroundColor: 'rgba(148, 163, 184, 0.18)',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: NEON,
  },
  subText: {
    color: CYAN,
    fontWeight: '800',
    marginTop: 10,
  },
  primaryBtn: {
    marginTop: 14,
    backgroundColor: NEON,
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: BG,
    fontWeight: '900',
  },
  secondaryBtn: {
    marginTop: 9,
    backgroundColor: CARD_2,
    borderColor: 'rgba(25, 230, 210, 0.35)',
    borderWidth: 1,
    paddingVertical: 13,
    borderRadius: 15,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: CYAN,
    fontWeight: '900',
  },
});

export default ChallengeCard;