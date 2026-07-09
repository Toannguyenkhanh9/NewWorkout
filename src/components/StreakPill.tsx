// FILE: src/components/StreakPill.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BG = '#06111D';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const StreakPill = ({ streak }: { streak: number }) => {
  return (
    <View style={styles.pill}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>🔥</Text>
      </View>

      <Text style={styles.txt}>
        {streak} day streak
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 22, 36, 0.96)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
  iconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(124, 255, 58, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  icon: {
    fontSize: 15,
  },
  txt: {
    color: NEON,
    fontWeight: '900',
    fontSize: 13,
  },
});

export default StreakPill;