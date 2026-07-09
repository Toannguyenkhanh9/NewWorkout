// FILE: src/components/ProgramCard.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { WorkoutProgram } from '../data/programs';

interface Props {
  program: WorkoutProgram;
  onPress: () => void;
}

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const ProgramCard: React.FC<Props> = ({ program, onPress }) => {
  const { t } = useTranslation();
  const accent = program.iconColor || NEON;
  const isPremium = !!(program as any).premium;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.glow} />

      <View
        style={[
          styles.iconWrap,
          {
            borderColor: accent,
            backgroundColor: `${accent}22`,
          },
        ]}
      >
        <Image source={program.icon} style={styles.icon} resizeMode="cover" />

        <View style={styles.iconShade} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {t(program.titleKey)}
          </Text>

          {isPremium ? (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumText}>PRO</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.days}>
          {t('home.daysSuffix', { count: program.durationDays })}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>🔥 Workout</Text>
          </View>

          <View style={styles.metaPill}>
            <Text style={styles.metaText}>
              {program.durationDays} {t('workouts.days', 'days')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.chevronCircle}>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 22,
    backgroundColor: CARD,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
    overflow: 'hidden',
  },

  glow: {
    position: 'absolute',
    top: -70,
    right: -70,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(124, 255, 58, 0.09)',
  },

  iconWrap: {
    width: 62,
    height: 62,
    borderRadius: 18,
    marginRight: 14,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  iconShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 7, 18, 0.08)',
  },

  body: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '900',
    color: TEXT,
  },
  days: {
    fontSize: 13,
    color: MUTED,
    marginTop: 5,
    fontWeight: '700',
  },

  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  metaPill: {
    backgroundColor: 'rgba(25, 230, 210, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.28)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  metaText: {
    color: CYAN,
    fontSize: 10,
    fontWeight: '900',
  },

  premiumBadge: {
    backgroundColor: '#F59E0B',
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginLeft: 8,
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },

  chevronCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  chevron: {
    fontSize: 26,
    color: NEON,
    marginTop: -2,
    fontWeight: '300',
  },
});

export default ProgramCard;