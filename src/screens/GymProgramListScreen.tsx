// FILE: src/screens/GymProgramListScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { GYM_PROGRAMS, GymProgram } from '../data/gymPrograms';
import { useSubscription } from '../iap/SubscriptionProvider';

const BG = '#06111D';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const GymProgramListScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { isPremium } = useSubscription?.() || { isPremium: false };

  const openPremium = () => {
    navigation.getParent()?.navigate('Settings', {
      screen: 'Premium',
    });
  };

  const openProgram = (program: GymProgram) => {
    if (program.premium && !isPremium) {
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
            onPress: openPremium,
          },
        ],
      );
      return;
    }

    navigation.navigate('GymProgramDetail', {
      programId: program.id,
    });
  };

  const renderItem = ({ item }: { item: GymProgram }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        style={styles.card}
        onPress={() => openProgram(item)}
      >
        <View style={styles.cardGlow} />

        <View style={styles.cardTop}>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>🏋️</Text>
          </View>

          {item.premium ? (
            <View style={styles.premiumPill}>
              <Text style={styles.premiumText}>PRO</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.programTitle}>
          {t(item.titleKey, item.defaultTitle)}
        </Text>

        <Text style={styles.programDesc}>
          {t(item.descKey, item.defaultDesc)}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaText}>
              {t(`filters.level.${item.level}`, item.level)}
            </Text>
          </View>

          <View style={styles.metaPill}>
            <Text style={styles.metaText}>
              {item.weeks} {t('gym.weeks', 'weeks')}
            </Text>
          </View>

          <View style={styles.metaPill}>
            <Text style={styles.metaText}>
              {item.daysPerWeek} {t('gym.daysPerWeek', 'days/week')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <View pointerEvents="none" style={styles.glowOne} />
      <View pointerEvents="none" style={styles.glowTwo} />

      <FlatList
        data={GYM_PROGRAMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.kickerPill}>
              <Text style={styles.kickerText}>
                {t('gym.kicker', 'GYM TRAINING')}
              </Text>
            </View>

            <Text style={styles.title}>
              {t('gym.title', 'Gym workout plans')}
            </Text>

            <Text style={styles.subtitle}>
              {t(
                'gym.subtitle',
                'Follow structured gym programs with exercises, sets, reps and rest time.',
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
  glowOne: {
    position: 'absolute',
    right: -100,
    top: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(25, 230, 210, 0.22)',
  },
  glowTwo: {
    position: 'absolute',
    left: -120,
    bottom: 80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },
  content: {
    padding: 18,
    paddingBottom: 160,
  },
  header: {
    marginBottom: 18,
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
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  subtitle: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  card: {
    backgroundColor: 'rgba(11, 22, 36, 0.96)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    right: -50,
    top: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(124, 255, 58, 0.10)',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: 'rgba(124, 255, 58, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 25,
  },
  premiumPill: {
    marginLeft: 'auto',
    backgroundColor: '#F59E0B',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  premiumText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  programTitle: {
    color: TEXT,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 14,
  },
  programDesc: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  metaPill: {
    backgroundColor: '#101C2B',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
  },
  metaText: {
    color: NEON,
    fontSize: 12,
    fontWeight: '900',
  },
});

export default GymProgramListScreen;