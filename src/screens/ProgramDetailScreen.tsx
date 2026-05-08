import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { PROGRAMS, generateProgramDays, WorkoutDay } from '../data/programs';
import { DayItem } from '../components/DayItem';
import { AdBanner } from '../components/AdBanner';
import { markActive } from '../store/activePrograms';
import { gateWorkout } from '../ads/adGate';
import { useSubscription } from '../iap/SubscriptionProvider';
import { useToast } from '../ui/Toast';
import { trackWorkoutTapAndMaybeAsk } from '../review/rate';
import { markWorkoutActivity } from '../notifications/reminder';
import { ensureTrialAccess } from '../ads/trial';
import { Alert } from 'react-native';
import { markSessionCompleted } from '../store/progressStats';
import { addWorkoutHistory } from '../store/workoutHistory';
type Section = { title: string; data: WorkoutDay[] };

export const ProgramDetailScreen: React.FC = () => {
  const { isPremium } = useSubscription?.() || { isPremium: false };
  const { t } = useTranslation();
    const toast = useToast();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { programId } = route.params || {};
  const program = PROGRAMS.find(p => p.id === programId);

  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>(
    {},
  );
  const STORAGE_KEY = `program:${programId}:completed`;

  useEffect(() => {
    if (program) navigation.setOptions({ title: t(program.titleKey) });
  }, [navigation, program, t]);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setCompletedDays(JSON.parse(json));
      } catch {}
    })();
  }, [STORAGE_KEY]);
  useEffect(() => {
    if (program) {
      navigation.setOptions({ title: t(program.titleKey) });
      // ✅ đánh dấu chương trình là đang tập
      markActive(program.id).catch(() => {});
    }
  }, [navigation, program, t]);
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
          'This program is available for Premium users only. Upgrade to continue.'
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
        ]
      );
    }
  })();
}, [program, isPremium, navigation, t]);
  if (!program) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#EF4444', padding: 16 }}>Program not found</Text>
      </View>
    );
  }

  const days = useMemo(() => generateProgramDays(program), [program]);

  const sections: Section[] = useMemo(() => {
    const out: Section[] = [];
    for (let i = 0; i < days.length; i += 7) {
      const chunk = days.slice(i, i + 7);
      const weekNo = Math.floor(i / 7) + 1;
      out.push({ title: t('program.weekTitle', { n: weekNo }), data: chunk });
    }
    return out;
  }, [days, t]);

const onPressDay = async (day: WorkoutDay) => {
  if (day.isRest) return;

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

  const wasCompleted = !!completedDays[day.id];
  const updated = { ...completedDays, [day.id]: true };
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
  });
};

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DayItem
            day={item}
            completed={!!completedDays[item.id]}
            onPress={() => onPressDay(item)}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.section}>{section.title}</Text>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.programTitle}>{t(program.titleKey)}</Text>
            <Text style={styles.programMeta}>
              {t('home.daysSuffix', { count: program.durationDays })}
            </Text>
          </View>
        }
        stickySectionHeadersEnabled
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      />
       <View style={{ paddingHorizontal: 16 }}>
        <AdBanner />
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB' },
  header: { marginBottom: 8 },
  programTitle: { color: '#0F172A', fontSize: 20, fontWeight: '900' },
  programMeta: { color: '#6B7280', fontSize: 12, marginTop: 4 },
  section: {
    color: '#0F172A',
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 8,
    fontSize: 16,
  },
});
