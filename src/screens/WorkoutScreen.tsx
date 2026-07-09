// FILE: src/screens/WorkoutScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { PROGRAMS } from '../data/programs';
import {
  getProgramCatalogMeta,
  getProgramDurationBucket,
  ProgramDurationBucket,
  ProgramEquipmentNeed,
  ProgramGoalTag,
  ProgramLevel,
  getAverageWorkoutDuration,
} from '../data/programCatalog';
import { useSubscription } from '../iap/SubscriptionProvider';
import { ensureTrialAccess } from '../ads/trial';

type LevelFilter = 'all' | ProgramLevel;
type GoalFilter = 'all' | ProgramGoalTag;
type EquipmentFilter = 'all' | ProgramEquipmentNeed;
type DurationFilter = 'all' | ProgramDurationBucket;

const BG = '#06111D';
const CARD = '#0B1624';
const CARD_2 = '#101C2B';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const Chip: React.FC<{
  label: string;
  active: boolean;
  onPress: () => void;
}> = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, active && styles.chipActive]}
    activeOpacity={0.85}
  >
    <Text
      style={[styles.chipText, active && styles.chipTextActive]}
      numberOfLines={1}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export const WorkoutScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { isPremium } = useSubscription?.() || { isPremium: false };

  const [level, setLevel] = useState<LevelFilter>('all');
  const [goal, setGoal] = useState<GoalFilter>('all');
  const [equipment, setEquipment] = useState<EquipmentFilter>('all');
  const [duration, setDuration] = useState<DurationFilter>('all');

  const goPremium = () => {
    try {
      navigation.getParent()?.navigate('Settings', {
        screen: 'Premium',
      });
    } catch {
      navigation.navigate('Premium');
    }
  };

  const openProgram = async (item: any) => {
    let trial = false;

    if (!isPremium) {
      trial = await ensureTrialAccess();
    }

    const locked = !!item.premium && !isPremium && !trial;

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
            onPress: goPremium,
          },
        ],
      );
      return;
    }

    try {
      navigation.navigate('ProgramDetail' as never, {
        programId: item.id,
      } as never);
    } catch {
      navigation.getParent()?.navigate('Workout', {
        screen: 'ProgramDetail',
        params: {
          programId: item.id,
        },
      } as never);
    }
  };

  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter((program) => {
      const meta = getProgramCatalogMeta(program.id);
      const durationBucket = getProgramDurationBucket(program);

      if (level !== 'all' && meta.level !== level) return false;
      if (goal !== 'all' && !meta.goals.includes(goal)) return false;
      if (equipment !== 'all' && meta.equipment !== equipment) return false;
      if (duration !== 'all' && durationBucket !== duration) return false;

      return true;
    });
  }, [level, goal, equipment, duration]);

  const getLevelColor = (programLevel: ProgramLevel) => {
    if (programLevel === 'beginner') return NEON;
    if (programLevel === 'intermediate') return '#FACC15';
    return '#FB7185';
  };

  const renderItem = ({ item }: any) => {
    const programTitle =
      item.title ?? (item.titleKey ? t(item.titleKey) : item.id);

    const meta = getProgramCatalogMeta(item.id);
    const avgDuration = getAverageWorkoutDuration(item);
    const levelColor = getLevelColor(meta.level);

    return (
      <TouchableOpacity
        style={styles.resultCard}
        activeOpacity={0.88}
        onPress={() => openProgram(item)}
      >
        <View style={styles.resultImageWrap}>
          <Image source={item.icon} style={styles.resultImage} resizeMode="cover" />
          <View style={styles.imageShade} />

          {item.premium ? (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PRO</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.resultBody}>
          <Text style={styles.resultTitle} numberOfLines={2}>
            {programTitle}
          </Text>

          <Text style={styles.resultMeta} numberOfLines={1}>
            {avgDuration} {t('workouts.min', 'min')} ·{' '}
            {t(`filters.equipment.${meta.equipment}`, meta.equipment)}
          </Text>

          <Text style={[styles.levelText, { color: levelColor }]} numberOfLines={1}>
            {t(`filters.level.${meta.level}`, meta.level)}
          </Text>
        </View>

        <View style={styles.bookmarkWrap}>
          <Text style={styles.bookmark}>♡</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <FlatList
        data={filteredPrograms}
        keyExtractor={(x) => x.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 160,
        }}
        ListHeaderComponent={
          <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>WORKOUT LIBRARY</Text>
            </View>

            <Text style={styles.h1}>
              {t('workouts.heroTitle', 'Your daily workout plan')}
            </Text>

            <Text style={styles.sub}>
              {t(
                'workouts.pickOne',
                'Choose a lesson plan to get started',
              )}
            </Text>

            <View style={styles.filterPanel}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterPanelTitle}>
                  {t('filters.title', 'Smart filter')}
                </Text>

                <Text style={styles.resultCount}>
                  {filteredPrograms.length} {t('workouts.results', 'results')}
                </Text>
              </View>

              <Text style={styles.filterTitle}>
                {t('filters.levelTitle', 'Level')}
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip
                  label={t('filters.all', 'All')}
                  active={level === 'all'}
                  onPress={() => setLevel('all')}
                />
                <Chip
                  label={t('filters.level.beginner', 'Beginner')}
                  active={level === 'beginner'}
                  onPress={() => setLevel('beginner')}
                />
                <Chip
                  label={t('filters.level.intermediate', 'Intermediate')}
                  active={level === 'intermediate'}
                  onPress={() => setLevel('intermediate')}
                />
                <Chip
                  label={t('filters.level.advanced', 'Advanced')}
                  active={level === 'advanced'}
                  onPress={() => setLevel('advanced')}
                />
              </ScrollView>

              <Text style={styles.filterTitle}>
                {t('filters.goalTitle', 'Focus')}
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip
                  label={t('filters.all', 'All')}
                  active={goal === 'all'}
                  onPress={() => setGoal('all')}
                />
                <Chip
                  label={t('filters.goal.lose_weight', 'Lose weight')}
                  active={goal === 'lose_weight'}
                  onPress={() => setGoal('lose_weight')}
                />
                <Chip
                  label={t('filters.goal.build_muscle', 'Build muscle')}
                  active={goal === 'build_muscle'}
                  onPress={() => setGoal('build_muscle')}
                />
                <Chip
                  label={t('filters.goal.cardio', 'Cardio')}
                  active={goal === 'cardio'}
                  onPress={() => setGoal('cardio')}
                />
                <Chip
                  label={t('filters.goal.core', 'Core')}
                  active={goal === 'core'}
                  onPress={() => setGoal('core')}
                />
                <Chip
                  label={t('filters.goal.mobility', 'Mobility')}
                  active={goal === 'mobility'}
                  onPress={() => setGoal('mobility')}
                />
              </ScrollView>

              <Text style={styles.filterTitle}>
                {t('filters.equipmentTitle', 'Equipment')}
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip
                  label={t('filters.all', 'All')}
                  active={equipment === 'all'}
                  onPress={() => setEquipment('all')}
                />
                <Chip
                  label={t('filters.equipment.no_equipment', 'No equipment')}
                  active={equipment === 'no_equipment'}
                  onPress={() => setEquipment('no_equipment')}
                />
                <Chip
                  label={t('filters.equipment.with_equipment', 'With equipment')}
                  active={equipment === 'with_equipment'}
                  onPress={() => setEquipment('with_equipment')}
                />
              </ScrollView>

              <Text style={styles.filterTitle}>
                {t('filters.durationTitle', 'Duration')}
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip
                  label={t('filters.all', 'All')}
                  active={duration === 'all'}
                  onPress={() => setDuration('all')}
                />
                <Chip
                  label={t('filters.duration.short', 'Short')}
                  active={duration === 'short'}
                  onPress={() => setDuration('short')}
                />
                <Chip
                  label={t('filters.duration.medium', 'Medium')}
                  active={duration === 'medium'}
                  onPress={() => setDuration('medium')}
                />
                <Chip
                  label={t('filters.duration.long', 'Long')}
                  active={duration === 'long'}
                  onPress={() => setDuration('long')}
                />
              </ScrollView>
            </View>

            <Text style={styles.resultTitleHeader}>
              {t('workouts.matchingResults', 'Matching results')} ({filteredPrograms.length})
            </Text>

            {filteredPrograms.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>
                  {t('filters.noResultsTitle', 'No matching programs')}
                </Text>
                <Text style={styles.emptyText}>
                  {t('filters.noResultsText', 'Try changing one or more filters.')}
                </Text>
              </View>
            ) : null}
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
    bottom: 60,
    left: -110,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },

  header: {
    marginBottom: 10,
  },
  kickerPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.8)',
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    marginBottom: 14,
  },
  kickerText: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  h1: {
    color: TEXT,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  sub: {
    color: '#D8E4F0',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 16,
    maxWidth: 330,
  },

  filterPanel: {
    backgroundColor: 'rgba(11, 22, 36, 0.96)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 14,
    marginBottom: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterPanelTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
  },
  resultCount: {
    color: NEON,
    fontSize: 12,
    fontWeight: '900',
  },
  filterTitle: {
    color: MUTED,
    fontWeight: '900',
    marginBottom: 8,
    marginTop: 14,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  chip: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: CARD_2,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.22)',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  chipText: {
    color: '#CBD5E1',
    fontWeight: '800',
    fontSize: 13,
  },
  chipTextActive: {
    color: BG,
  },

  resultTitleHeader: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 12,
  },

  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderRadius: 18,
    padding: 9,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.075)',
  },
  resultImageWrap: {
    width: 118,
    height: 88,
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: CARD_2,
    marginRight: 13,
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 7, 18, 0.08)',
  },
  premiumBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
  },
  premiumBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  resultBody: {
    flex: 1,
  },
  resultTitle: {
    color: TEXT,
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '900',
  },
  resultMeta: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 5,
  },
  levelText: {
    fontSize: 13,
    fontWeight: '900',
    marginTop: 7,
  },
  bookmarkWrap: {
    width: 32,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  bookmark: {
    color: TEXT,
    fontSize: 28,
    fontWeight: '300',
  },

  emptyBox: {
    backgroundColor: 'rgba(11, 22, 36, 0.96)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    marginBottom: 14,
  },
  emptyTitle: {
    color: '#FDE68A',
    fontWeight: '900',
    fontSize: 15,
  },
  emptyText: {
    color: MUTED,
    marginTop: 6,
  },
});

export default WorkoutScreen;