// FILE: src/screens/NutritionScreen.tsx
import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { buildNutritionPlan } from '../nutrition/nutritionPlanner';
import { ProfileInput } from '../recommendation/programRecommender';
import { AdBanner } from '../components/AdBanner';

const PROFILE_KEY = 'user:profile';

export const NutritionScreen: React.FC = () => {
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

  const plan = useMemo(() => buildNutritionPlan(profile), [profile]);

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('nutrition.title', 'Nutrition')}</Text>
        <Text style={styles.subtitle}>
          {t(
            'nutrition.subtitle',
            'Your daily targets are personalized based on your current profile and goal.'
          )}
        </Text>

        {!plan ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              {t('nutrition.noProfileTitle', 'Complete your profile first')}
            </Text>
            <Text style={styles.emptyText}>
              {t(
                'nutrition.noProfileText',
                'Add your height, weight and goal to get calorie, macro and hydration recommendations.'
              )}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t('nutrition.targets', 'Daily targets')}</Text>
              <View style={styles.metricGrid}>
                <View style={styles.metricBox}>
                  <Text style={styles.metricValue}>{plan.calories}</Text>
                  <Text style={styles.metricLabel}>{t('nutrition.calories', 'Calories')}</Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.metricValue}>{plan.waterLiters}L</Text>
                  <Text style={styles.metricLabel}>{t('nutrition.water', 'Water')}</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t('nutrition.macros', 'Macro split')}</Text>
              <View style={styles.metricGrid}>
                <View style={styles.metricBox}>
                  <Text style={styles.metricValue}>{plan.proteinG}g</Text>
                  <Text style={styles.metricLabel}>{t('nutrition.protein', 'Protein')}</Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.metricValue}>{plan.carbsG}g</Text>
                  <Text style={styles.metricLabel}>{t('nutrition.carbs', 'Carbs')}</Text>
                </View>
                <View style={styles.metricBox}>
                  <Text style={styles.metricValue}>{plan.fatsG}g</Text>
                  <Text style={styles.metricLabel}>{t('nutrition.fats', 'Fats')}</Text>
                </View>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t('nutrition.sampleMeals', 'Sample meal plan')}</Text>
              {plan.meals.map((meal) => (
                <Text key={meal} style={styles.lineText}>• {meal}</Text>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t('nutrition.tips', 'Tips')}</Text>
              {plan.tips.map((tip) => (
                <Text key={tip} style={styles.lineText}>• {tip}</Text>
              ))}
            </View>
          </>
        )}

        <View style={styles.bannerWrap}>
          <AdBanner />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
  },
  subtitle: {
    color: '#64748B',
    marginTop: 6,
    marginBottom: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTitle: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 10,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricBox: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  metricValue: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 20,
  },
  metricLabel: {
    color: '#64748B',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },
  lineText: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyTitle: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: '#475569',
    lineHeight: 21,
  },
  bannerWrap: {
    marginTop: 8,
    alignItems: 'center',
  },
});

export default NutritionScreen;