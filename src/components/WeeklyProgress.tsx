// FILE: src/components/WeeklyProgress.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const WeeklyProgress = ({ done }: { done: number }) => {
  const total = 7;
  const safeDone = Math.max(0, Math.min(total, done));
  const pct = Math.max(0, Math.min(1, safeDone / total));
  const percent = Math.round(pct * 100);

  return (
    <View style={styles.card}>
      <View style={styles.glow} />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.kicker}>WEEKLY</Text>
          <Text style={styles.title}>This week</Text>
        </View>

        <View style={styles.percentPill}>
          <Text style={styles.percentText}>{percent}%</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Progress</Text>
        <Text style={styles.value}>
          {safeDone}/{total}
        </Text>
      </View>

      <View style={styles.barWrap}>
        <View style={[styles.barFill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -70,
    right: -70,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(124, 255, 58, 0.10)',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  kicker: {
    color: CYAN,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
    marginBottom: 3,
  },
  title: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '900',
  },

  percentPill: {
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  percentText: {
    color: NEON,
    fontSize: 12,
    fontWeight: '900',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '800',
  },
  value: {
    color: TEXT,
    fontSize: 12,
    fontWeight: '900',
  },

  barWrap: {
    height: 11,
    backgroundColor: 'rgba(148, 163, 184, 0.18)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: NEON,
    borderRadius: 999,
  },
});

export default WeeklyProgress;