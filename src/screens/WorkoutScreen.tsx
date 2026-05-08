// FILE: src/screens/WorkoutScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
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
import { AdBanner } from '../components/AdBanner';

type LevelFilter = 'all' | ProgramLevel;
type GoalFilter = 'all' | ProgramGoalTag;
type EquipmentFilter = 'all' | ProgramEquipmentNeed;
type DurationFilter = 'all' | ProgramDurationBucket;

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
    <Text style={[styles.chipText, active && styles.chipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const InfoBadge: React.FC<{
  label: string;
  variant?: 'level' | 'goal' | 'equipment' | 'duration';
}> = ({ label, variant = 'goal' }) => (
  <View
    style={[
      styles.infoBadge,
      variant === 'level' && styles.badgeLevel,
      variant === 'goal' && styles.badgeGoal,
      variant === 'equipment' && styles.badgeEquipment,
      variant === 'duration' && styles.badgeDuration,
    ]}
  >
    <Text style={styles.infoBadgeText} numberOfLines={1}>
      {label}
    </Text>
  </View>
);

export const WorkoutScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { isPremium } = useSubscription?.() || { isPremium: false };

  const { width } = Dimensions.get('window');
  const COLS = 2;
  const HPAD = 16;
  const GAP = 12;
  const tileWidth = Math.floor((width - HPAD * 2 - GAP * (COLS - 1)) / COLS);

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
          'This program is available for Premium users only. Upgrade to continue.'
        ),
        [
          { text: t('common.cancel', 'Cancel'), style: 'cancel' },
          {
            text: t('premium.cta', 'Upgrade now'),
            onPress: goPremium,
          },
        ]
      );
      return;
    }

    try {
      navigation.navigate('ProgramDetail' as never, { programId: item.id } as never);
    } catch {
      navigation.getParent()?.navigate('Workout', {
        screen: 'ProgramDetail',
        params: { programId: item.id },
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

  const renderItem = ({ item, index }: any) => {
    const isLeft = index % 2 === 0;
    const programTitle = item.title ?? (item.titleKey ? t(item.titleKey) : item.id);
    const meta = getProgramCatalogMeta(item.id);
    const avgDuration = getAverageWorkoutDuration(item);
    const durationBucket = getProgramDurationBucket(item);
    const mainGoal = meta.goals[0];

    return (
      <TouchableOpacity
        style={[
          styles.tile,
          { width: tileWidth, marginRight: isLeft ? GAP : 0, marginBottom: 14 },
        ]}
        activeOpacity={0.88}
        onPress={() => openProgram(item)}
      >
        <View style={styles.thumbWrap}>
          <Image source={item.icon} style={styles.thumb} resizeMode="cover" />

          <View style={styles.playBadge}>
            <Text style={styles.playIcon}>▶</Text>
          </View>

          {item.premium ? (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PREMIUM</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.tileTitle} numberOfLines={2}>
          {programTitle}
        </Text>

        <View style={styles.badgesWrap}>
          <InfoBadge
            variant="level"
            label={t(`filters.level.${meta.level}`, meta.level)}
          />
          <InfoBadge
            variant="goal"
            label={t(`filters.goal.${mainGoal}`, mainGoal)}
          />
          <InfoBadge
            variant="equipment"
            label={t(`filters.equipment.${meta.equipment}`, meta.equipment)}
          />
          <InfoBadge
            variant="duration"
            label={t(`filters.duration.${durationBucket}`, durationBucket)}
          />
        </View>

        <Text style={styles.tileMeta}>
          {avgDuration} {t('workouts.min', 'min')} • {item.durationDays}{' '}
          {t('workouts.days', 'days')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPrograms}
        keyExtractor={(x) => x.id}
        numColumns={COLS}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: HPAD, paddingBottom: 24 }}
        ListHeaderComponent={
          <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <Text style={styles.h1}>{t('tabs.workout', 'Workout')}</Text>
            <Text style={styles.sub}>
              {t('workouts.pickOne', 'Choose a workout plan to get started')}
            </Text>

            <View style={styles.filterWrap}>
              <Text style={styles.filterTitle}>{t('filters.levelTitle', 'Level')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip label={t('filters.all', 'All')} active={level === 'all'} onPress={() => setLevel('all')} />
                <Chip label={t('filters.level.beginner', 'Beginner')} active={level === 'beginner'} onPress={() => setLevel('beginner')} />
                <Chip label={t('filters.level.intermediate', 'Intermediate')} active={level === 'intermediate'} onPress={() => setLevel('intermediate')} />
                <Chip label={t('filters.level.advanced', 'Advanced')} active={level === 'advanced'} onPress={() => setLevel('advanced')} />
              </ScrollView>

              <Text style={styles.filterTitle}>{t('filters.goalTitle', 'Focus')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip label={t('filters.all', 'All')} active={goal === 'all'} onPress={() => setGoal('all')} />
                <Chip label={t('filters.goal.lose_weight', 'Lose weight')} active={goal === 'lose_weight'} onPress={() => setGoal('lose_weight')} />
                <Chip label={t('filters.goal.build_muscle', 'Build muscle')} active={goal === 'build_muscle'} onPress={() => setGoal('build_muscle')} />
                <Chip label={t('filters.goal.cardio', 'Cardio')} active={goal === 'cardio'} onPress={() => setGoal('cardio')} />
                <Chip label={t('filters.goal.core', 'Core')} active={goal === 'core'} onPress={() => setGoal('core')} />
                <Chip label={t('filters.goal.mobility', 'Mobility')} active={goal === 'mobility'} onPress={() => setGoal('mobility')} />
              </ScrollView>

              <Text style={styles.filterTitle}>{t('filters.equipmentTitle', 'Equipment')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip label={t('filters.all', 'All')} active={equipment === 'all'} onPress={() => setEquipment('all')} />
                <Chip label={t('filters.equipment.no_equipment', 'No equipment')} active={equipment === 'no_equipment'} onPress={() => setEquipment('no_equipment')} />
                <Chip label={t('filters.equipment.with_equipment', 'With equipment')} active={equipment === 'with_equipment'} onPress={() => setEquipment('with_equipment')} />
              </ScrollView>

              <Text style={styles.filterTitle}>{t('filters.durationTitle', 'Duration')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip label={t('filters.all', 'All')} active={duration === 'all'} onPress={() => setDuration('all')} />
                <Chip label={t('filters.duration.short', 'Short')} active={duration === 'short'} onPress={() => setDuration('short')} />
                <Chip label={t('filters.duration.medium', 'Medium')} active={duration === 'medium'} onPress={() => setDuration('medium')} />
                <Chip label={t('filters.duration.long', 'Long')} active={duration === 'long'} onPress={() => setDuration('long')} />
              </ScrollView>
            </View>

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
        ListFooterComponent={
          <View style={styles.listFooter}>
            <AdBanner />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB' },

  header: { alignItems: 'center', marginBottom: 12 },
  h1: { fontSize: 28, fontWeight: '800', color: '#0F172A', letterSpacing: 0.2 },
  sub: { marginTop: 6, color: '#475569', fontSize: 13, marginBottom: 12 },

  filterWrap: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    marginBottom: 14,
  },
  filterTitle: {
    color: '#0F172A',
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
    marginBottom: 4,
  },
  chipActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  chipText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#065F46',
  },

  emptyBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyTitle: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 15,
  },
  emptyText: {
    color: '#64748B',
    marginTop: 6,
  },

  tile: {
    alignItems: 'center',
  },

  thumbWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  thumb: { width: '100%', height: '100%' },

  playBadge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -18,
    marginLeft: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15,23,42,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },

  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  premiumBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  tileTitle: {
    textAlign: 'center',
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
    paddingHorizontal: 4,
    minHeight: 42,
  },

  badgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 4,
    gap: 6,
  },
  infoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  infoBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
  },

  badgeLevel: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  badgeGoal: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  badgeEquipment: {
    backgroundColor: '#F5F3FF',
    borderColor: '#DDD6FE',
  },
  badgeDuration: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FED7AA',
  },

  tileMeta: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
  listFooter: {
    paddingTop: 8,
    alignItems: 'center',
  },
});

export default WorkoutScreen;