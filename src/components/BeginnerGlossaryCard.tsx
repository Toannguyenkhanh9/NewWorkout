// FILE: src/components/BeginnerGlossaryCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export const BeginnerGlossaryCard: React.FC = () => {
  const { t } = useTranslation();

  const rows = [
    {
      key: 'restDay',
      title: t('beginner.terms.restDay.title', 'Rest day'),
      desc: t(
        'beginner.terms.restDay.desc',
        'A recovery day. Your body rests and rebuilds, so do not skip it.'
      ),
    },
    {
      key: 'warmUp',
      title: t('beginner.terms.warmUp.title', 'Warm-up'),
      desc: t(
        'beginner.terms.warmUp.desc',
        'Light movement before training to prepare your body and reduce injury risk.'
      ),
    },
    {
      key: 'cooldown',
      title: t('beginner.terms.cooldown.title', 'Cooldown'),
      desc: t(
        'beginner.terms.cooldown.desc',
        'Easy movement or stretching after training to help your body recover.'
      ),
    },
    {
      key: 'hiit',
      title: t('beginner.terms.hiit.title', 'HIIT'),
      desc: t(
        'beginner.terms.hiit.desc',
        'High-Intensity Interval Training: short bursts of hard work followed by short rest.'
      ),
    },
    {
      key: 'rep',
      title: t('beginner.terms.rep.title', 'Rep'),
      desc: t(
        'beginner.terms.rep.desc',
        'One complete movement of an exercise. Example: one squat = one rep.'
      ),
    },
    {
      key: 'set',
      title: t('beginner.terms.set.title', 'Set'),
      desc: t(
        'beginner.terms.set.desc',
        'A group of reps. Example: 10 squats done together = 1 set.'
      ),
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {t('beginner.glossaryTitle', 'Beginner guide')}
      </Text>

      {rows.map((row) => (
        <View key={row.key} style={styles.row}>
          <Text style={styles.term}>{row.title}</Text>
          <Text style={styles.desc}>{row.desc}</Text>
        </View>
      ))}
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
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  title: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F7',
  },
  term: {
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 14,
    marginBottom: 4,
  },
  desc: {
    color: '#475569',
    lineHeight: 20,
    fontSize: 13,
  },
});

export default BeginnerGlossaryCard;