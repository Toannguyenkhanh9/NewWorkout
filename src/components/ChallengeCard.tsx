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

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {t('challenges.title', 'Challenges')}
      </Text>

      {active?.definition ? (
        <>
          <Text style={styles.challengeName}>{getTitle(active.definition.id)}</Text>
          <Text style={styles.challengeDesc}>{getDesc(active.definition.id)}</Text>

          <View style={styles.progressBox}>
            <Text style={styles.progressText}>
              {active.progress}/{active.target}
            </Text>
            <Text style={styles.subText}>
              {active.completed
                ? t('challenges.complete', 'Challenge completed')
                : t('challenges.daysLeft', '{{count}} day(s) left', { count: active.daysLeft })}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.challengeDesc}>
            {t('challenges.intro', 'Start a short challenge to stay consistent.')}
          </Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={onStart7}>
            <Text style={styles.primaryBtnText}>
              {t('challenges.start7', 'Start 7-day challenge')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={onStart30}>
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
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 10,
  },
  challengeName: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
  },
  challengeDesc: {
    color: '#64748B',
    lineHeight: 20,
    marginTop: 6,
  },
  progressBox: {
    marginTop: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressText: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 20,
  },
  subText: {
    color: '#0F766E',
    fontWeight: '800',
    marginTop: 4,
  },
  primaryBtn: {
    marginTop: 12,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  secondaryBtn: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#0F172A',
    fontWeight: '800',
  },
});

export default ChallengeCard;