// FILE: src/screens/GymProgramDetailScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { GYM_PROGRAMS, GymWorkoutDay } from '../data/gymPrograms';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const GymProgramDetailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { programId } = route.params || {};
  const program = GYM_PROGRAMS.find((item) => item.id === programId);

  if (!program) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>
          {t('gym.programNotFound', 'Gym program not found')}
        </Text>
      </View>
    );
  }

  const openDay = (day: GymWorkoutDay) => {
    navigation.navigate('GymWorkoutDay', {
      programId: program.id,
      dayId: day.id,
    });
  };

  const renderItem = ({ item }: { item: GymWorkoutDay }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        style={styles.dayCard}
        onPress={() => openDay(item)}
      >
        <View style={styles.dayCircle}>
          <Text style={styles.dayNumber}>{item.dayNumber}</Text>
        </View>

        <View style={styles.dayBody}>
          <Text style={styles.dayTitle}>
            {t(item.titleKey, item.defaultTitle)}
          </Text>

          <Text style={styles.dayFocus}>
            {t(item.focusKey, item.defaultFocus)}
          </Text>

          <Text style={styles.dayMeta}>
            {item.durationMin} {t('workouts.min', 'min')} •{' '}
            {item.exercises.length} {t('gym.exercises', 'exercises')}
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <FlatList
        data={program.days}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>
                {t('gym.plan', 'GYM PLAN')}
              </Text>
            </View>

            <Text style={styles.title}>
              {t(program.titleKey, program.defaultTitle)}
            </Text>

            <Text style={styles.subtitle}>
              {t(program.descKey, program.defaultDesc)}
            </Text>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>
                {program.weeks} {t('gym.weeks', 'weeks')} •{' '}
                {program.daysPerWeek} {t('gym.daysPerWeek', 'days/week')} •{' '}
                {t(`filters.level.${program.level}`, program.level)}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>
              {t('gym.trainingDays', 'Training days')}
            </Text>
          </View>
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
    marginBottom: 12,
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
  summaryCard: {
    marginTop: 16,
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
  },
  summaryText: {
    color: NEON,
    fontSize: 13,
    fontWeight: '900',
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 20,
    marginBottom: 10,
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
  dayCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 255, 58, 0.16)',
    borderWidth: 1,
    borderColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dayNumber: {
    color: NEON,
    fontSize: 16,
    fontWeight: '900',
  },
  dayBody: {
    flex: 1,
  },
  dayTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
  },
  dayFocus: {
    color: MUTED,
    fontSize: 13,
    marginTop: 4,
  },
  dayMeta: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 5,
  },
  arrow: {
    color: NEON,
    fontSize: 34,
    fontWeight: '300',
    marginLeft: 8,
  },
  notFound: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
    margin: 18,
  },
});

export default GymProgramDetailScreen;