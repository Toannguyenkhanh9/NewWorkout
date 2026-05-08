// FILE: src/components/AchievementsCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AchievementItem } from '../store/achievements';

type Props = {
  items: AchievementItem[];
  t: (key: string, defaultValue?: string, options?: any) => string;
};

export const AchievementsCard: React.FC<Props> = ({ items, t }) => {
  const getTitle = (id: string) => {
    switch (id) {
      case 'first_workout':
        return t('achievements.firstWorkout', 'First Workout');
      case 'ten_workouts':
        return t('achievements.tenWorkouts', '10 Workouts');
      case 'twentyfive_workouts':
        return t('achievements.twentyfiveWorkouts', '25 Workouts');
      case 'streak_3':
        return t('achievements.streak3', '3-Day Streak');
      case 'streak_7':
        return t('achievements.streak7', '7-Day Streak');
      case 'week_4':
        return t('achievements.week4', '4 Workouts This Week');
      case 'finish_program':
        return t('achievements.finishProgram', 'Complete 1 Program');
      default:
        return id;
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {t('achievements.title', 'Achievements')}
      </Text>

      <View style={styles.wrap}>
        {items.map((item) => (
          <View
            key={item.id}
            style={[styles.badge, item.unlocked ? styles.badgeOn : styles.badgeOff]}
          >
            <Text
              style={[styles.badgeTitle, item.unlocked ? styles.badgeTitleOn : styles.badgeTitleOff]}
              numberOfLines={2}
            >
              {getTitle(item.id)}
            </Text>
            <Text
              style={[styles.badgeProgress, item.unlocked ? styles.badgeTitleOn : styles.badgeTitleOff]}
            >
              {item.progress}/{item.target}
            </Text>
          </View>
        ))}
      </View>
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
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    minHeight: 82,
    justifyContent: 'space-between',
  },
  badgeOn: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  badgeOff: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  badgeTitle: {
    fontSize: 13,
    fontWeight: '900',
  },
  badgeTitleOn: {
    color: '#065F46',
  },
  badgeTitleOff: {
    color: '#475569',
  },
  badgeProgress: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 8,
  },
});

export default AchievementsCard;