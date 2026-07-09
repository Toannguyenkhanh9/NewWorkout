// FILE: src/screens/AdvancedMealPlanScreen.tsx
import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { buildNutritionPlan } from '../nutrition/nutritionPlanner';
import { ProfileInput } from '../recommendation/programRecommender';
import { AdvancedMealPlanCard } from '../components/AdvancedMealPlanCard';

const PROFILE_KEY = 'user:profile';

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const AdvancedMealPlanScreen: React.FC = () => {
  const { t } = useTranslation();

  const [profile, setProfile] = useState<ProfileInput | null>(null);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const raw = await AsyncStorage.getItem(PROFILE_KEY);
          setProfile(raw ? JSON.parse(raw) : null);
        } catch {
          setProfile(null);
        }
      })();
    }, []),
  );

  const plan = useMemo(
    () => buildNutritionPlan(profile, t as any),
    [profile, t],
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <View style={styles.kickerPill}>
            <Text style={styles.kickerText}>
              {t('nutrition.advancedMealPlanKicker', 'MEAL OPTIONS')}
            </Text>
          </View>

          <Text style={styles.title}>
            {t('nutrition.advancedMealPlan', 'Advanced meal plan')}
          </Text>

          <Text style={styles.subtitle}>
            {t(
              'nutrition.advancedMealPlanDesc',
              'Choose from multiple meals for each time of day. Calories and macros are estimated for easier planning.',
            )}
          </Text>
        </View>

        {!plan ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🥗</Text>

            <Text style={styles.emptyTitle}>
              {t('nutrition.noProfileTitle', 'Complete your profile first')}
            </Text>

            <Text style={styles.emptyText}>
              {t(
                'nutrition.noProfileText',
                'Add your height, weight and goal to get personalized calories, macros and water targets.',
              )}
            </Text>
          </View>
        ) : (
          <AdvancedMealPlanCard mealGroups={plan.mealGroups} t={t as any} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 160,
  },

  glowTop: {
    position: 'absolute',
    top: -90,
    right: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(25, 230, 210, 0.22)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: 60,
    left: -110,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },

  hero: {
    marginBottom: 16,
  },
  kickerPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.75)',
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    marginBottom: 14,
  },
  kickerText: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  title: {
    color: TEXT,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  subtitle: {
    color: '#D8E4F0',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },

  emptyCard: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
  },
  emptyEmoji: {
    fontSize: 34,
    marginBottom: 12,
  },
  emptyTitle: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  emptyText: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 22,
  },
});

export default AdvancedMealPlanScreen;