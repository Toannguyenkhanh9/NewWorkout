// FILE: src/components/WorkoutHistoryCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WorkoutHistoryEntry } from '../store/workoutHistory';

type Props = {
  items: WorkoutHistoryEntry[];
  weeklyCount: number;
  weeklyMinutes: number;
  onPressViewAll?: () => void;
  t: (key: string, defaultValue?: string, options?: any) => string;
};

const NEON = '#7CFF3A';
const CYAN = '#19E6D2';
const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';

export const WorkoutHistoryCard: React.FC<Props> = ({
  items,
  weeklyCount,
  weeklyMinutes,
  onPressViewAll,
  t,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.glow} />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>HISTORY</Text>
          <Text style={styles.title}>
            {t('history.title', 'Workout History')}
          </Text>
        </View>

        {onPressViewAll ? (
          <TouchableOpacity
            onPress={onPressViewAll}
            activeOpacity={0.85}
            style={styles.viewAllBtn}
          >
            <Text style={styles.viewAll}>
              {t('history.viewAll', 'View all')}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryIcon}>🔥</Text>
          <Text style={styles.summaryValue}>{weeklyCount}</Text>
          <Text style={styles.summaryLabel}>
            {t('history.thisWeek', 'This week')}
          </Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryIcon}>⏱️</Text>
          <Text style={styles.summaryValue}>{weeklyMinutes}</Text>
          <Text style={styles.summaryLabel}>
            {t('history.minutes', 'Minutes')}
          </Text>
        </View>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyIcon}>🏋️</Text>
          <Text style={styles.empty}>
            {t('history.empty', 'No completed workouts yet.')}
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {items.slice(0, 5).map((item, index) => (
            <View key={item.id} style={styles.row}>
              <View style={styles.indexCircle}>
                <Text style={styles.indexText}>{index + 1}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.workoutName}
                </Text>

                <Text style={styles.meta}>
                  {new Date(item.completedAt).toLocaleDateString()}
                </Text>
              </View>

              {item.durationMin ? (
                <View style={styles.durationPill}>
                  <Text style={styles.duration}>
                    {item.durationMin} {t('workouts.min', 'min')}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
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
    top: -80,
    right: -80,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(124, 255, 58, 0.10)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  viewAllBtn: {
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
  },
  viewAll: {
    color: NEON,
    fontWeight: '900',
    fontSize: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginBottom: 12,
  },
  summaryBox: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: CARD_2,
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  summaryIcon: {
    fontSize: 18,
    marginBottom: 6,
  },
  summaryValue: {
    color: TEXT,
    fontSize: 24,
    fontWeight: '900',
  },
  summaryLabel: {
    color: MUTED,
    marginTop: 4,
    fontWeight: '700',
    fontSize: 12,
  },
  emptyBox: {
    backgroundColor: CARD_2,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 26,
    marginBottom: 6,
  },
  empty: {
    color: MUTED,
    lineHeight: 20,
    textAlign: 'center',
  },
  list: {
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_2,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
    marginTop: 8,
  },
  indexCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  indexText: {
    color: NEON,
    fontWeight: '900',
    fontSize: 13,
  },
  name: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 14,
  },
  meta: {
    color: MUTED,
    marginTop: 3,
    fontSize: 12,
  },
  durationPill: {
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.35)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 8,
  },
  duration: {
    color: CYAN,
    fontWeight: '900',
    fontSize: 11,
  },
});

export default WorkoutHistoryCard;