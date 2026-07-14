// FILE: src/screens/GymPersonalRecordsScreen.tsx
import React, {
  useCallback,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  GymPersonalRecord,
  loadGymPersonalRecords,
} from '../store/gymProgress';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const formatDate = (time: number) => {
  const d = new Date(time);

  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const GymPersonalRecordsScreen: React.FC = () => {
  const { t } = useTranslation();

  const [records, setRecords] = useState<GymPersonalRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      loadGymPersonalRecords().then(items => {
        if (!mounted) return;

        setRecords(items);
      });

      return () => {
        mounted = false;
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={records}
        keyExtractor={(item) => item.exerciseId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>
                {t('gym.personalRecordsKicker', 'PERSONAL RECORDS')}
              </Text>
            </View>

            <Text style={styles.title}>
              {t('gym.personalRecordsTitle', 'Personal Records')}
            </Text>

            <Text style={styles.subtitle}>
              {t(
                'gym.personalRecordsSubtitle',
                'Your best recorded performance for each exercise.',
              )}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.recordCard}>
            <View style={styles.recordTop}>
              <Text style={styles.exerciseName}>
                {item.exerciseName}
              </Text>

              <Text style={styles.prBadge}>PR</Text>
            </View>

            <Text style={styles.recordValue}>
              {item.weightKg}kg × {item.reps}
            </Text>

            <Text style={styles.recordMeta}>
              {t('gym.estimatedOneRepMax', 'Estimated 1RM')}: {item.estimatedOneRepMax}kg
            </Text>

            <Text style={styles.recordDate}>
              {formatDate(item.achievedAt)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              {t('gym.noPersonalRecords', 'No personal records yet.')}
            </Text>

            <Text style={styles.emptyText}>
              {t(
                'gym.noPersonalRecordsText',
                'Complete gym workouts and enter kg/reps to create your first PR.',
              )}
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
    paddingBottom: 170,
  },
  header: {
    marginBottom: 14,
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
  recordCard: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    padding: 16,
    marginBottom: 12,
  },
  recordTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseName: {
    flex: 1,
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
  },
  prBadge: {
    color: BG,
    backgroundColor: NEON,
    overflow: 'hidden',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '900',
  },
  recordValue: {
    color: NEON,
    fontSize: 26,
    fontWeight: '900',
    marginTop: 10,
  },
  recordMeta: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 6,
  },
  recordDate: {
    color: MUTED,
    fontSize: 12,
    marginTop: 6,
  },
  emptyCard: {
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.3)',
  },
  emptyTitle: {
    color: '#FACC15',
    fontSize: 15,
    fontWeight: '900',
  },
  emptyText: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
});

export default GymPersonalRecordsScreen;