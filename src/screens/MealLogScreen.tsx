// FILE: src/screens/MealLogScreen.tsx
import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useFocusEffect,
} from '@react-navigation/native';
import {
  useTranslation,
} from 'react-i18next';

import {
  calculateDailyNutrition,
  deleteMealLog,
  getNutritionDateKey,
  loadMealLogs,
  MealLog,
} from '../nutrition/mealLog';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const dateFromKey = (
  key: string,
) => {
  const [
    year,
    month,
    day,
  ] = key.split('-').map(Number);

  return new Date(
    year,
    month - 1,
    day,
    12,
    0,
    0,
  );
};

const shiftDateKey = (
  key: string,
  amount: number,
) => {
  const date =
    dateFromKey(key);

  date.setDate(
    date.getDate() +
      amount,
  );

  return getNutritionDateKey(
    date,
  );
};

export const MealLogScreen:
React.FC = () => {
  const {t, i18n} =
    useTranslation();

  const [
    dateKey,
    setDateKey,
  ] = useState(
    getNutritionDateKey(),
  );

  const [
    meals,
    setMeals,
  ] = useState<MealLog[]>([]);

  const reload =
    useCallback(
      async () => {
        setMeals(
          await loadMealLogs(
            dateKey,
          ),
        );
      },
      [dateKey],
    );

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const total = useMemo(
    () =>
      calculateDailyNutrition(
        meals,
      ),
    [meals],
  );

  const deleteMeal = (
    meal: MealLog,
  ) => {
    Alert.alert(
      t(
        'mealScan.deleteMealTitle',
        'Delete meal?',
      ),
      t(
        'mealScan.deleteMealBody',
        'This meal will be removed from the daily total.',
      ),
      [
        {
          text: t(
            'common.cancel',
            'Cancel',
          ),
          style: 'cancel',
        },
        {
          text: t(
            'common.delete',
            'Delete',
          ),
          style:
            'destructive',
          onPress: async () => {
            setMeals(
              await deleteMealLog(
                dateKey,
                meal.id,
              ),
            );
          },
        },
      ],
    );
  };

  const formattedDate =
    new Intl.DateTimeFormat(
      i18n.resolvedLanguage ||
      i18n.language ||
      'en',
      {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      },
    ).format(
      dateFromKey(
        dateKey,
      ),
    );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.title}>
          {t(
            'mealScan.logTitle',
            'Food log',
          )}
        </Text>

        <View style={styles.dateRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dateButton}
            onPress={() =>
              setDateKey(
                current =>
                  shiftDateKey(
                    current,
                    -1,
                  ),
              )
            }
          >
            <Text style={styles.dateButtonText}>
              ‹
            </Text>
          </TouchableOpacity>

          <Text style={styles.dateText}>
            {formattedDate}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dateButton}
            onPress={() =>
              setDateKey(
                current =>
                  shiftDateKey(
                    current,
                    1,
                  ),
              )
            }
          >
            <Text style={styles.dateButtonText}>
              ›
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryCalories}>
            {total.calories}{' '}
            kcal
          </Text>

          <Text style={styles.summaryMacros}>
            {total.proteinG}g P •{' '}
            {total.carbsG}g C •{' '}
            {total.fatsG}g F
          </Text>
        </View>

        {meals.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>
              🥗
            </Text>

            <Text style={styles.emptyTitle}>
              {t(
                'mealScan.noMeals',
                'No food has been logged today.',
              )}
            </Text>
          </View>
        ) : (
          meals.map(
            meal => {
              const mealTotal =
                calculateDailyNutrition(
                  [meal],
                );

              return (
                <View
                  key={meal.id}
                  style={styles.mealCard}
                >
                  <View style={styles.mealHeader}>
                    <View style={styles.mealHeaderBody}>
                      <Text style={styles.mealType}>
                        {t(
                          `mealScan.${meal.mealType}`,
                          meal.mealType,
                        )}
                      </Text>

                      <Text style={styles.mealCalories}>
                        {mealTotal.calories}
                        {' kcal'}
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        deleteMeal(meal)
                      }
                    >
                      <Text style={styles.deleteText}>
                        {t(
                          'common.delete',
                          'Delete',
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {meal.foods.map(
                    food => (
                      <View
                        key={food.id}
                        style={styles.foodRow}
                      >
                        <View style={styles.foodBody}>
                          <Text style={styles.foodName}>
                            {food.name}
                          </Text>

                          <Text style={styles.foodMeta}>
                            {food.grams}g •{' '}
                            {food.proteinG}g P •{' '}
                            {food.carbsG}g C •{' '}
                            {food.fatsG}g F
                          </Text>
                        </View>

                        <Text style={styles.foodCalories}>
                          {food.calories}{' '}
                          kcal
                        </Text>
                      </View>
                    ),
                  )}
                </View>
              );
            },
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG,
    },
    content: {
      padding: 18,
      paddingBottom: 80,
    },
    title: {
      color: TEXT,
      fontSize: 30,
      fontWeight: '900',
    },
    dateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 14,
    },
    dateButton: {
      width: 42,
      height: 42,
      borderRadius: 15,
      backgroundColor: CARD,
      borderWidth: 1,
      borderColor:
        'rgba(148, 163, 184, 0.16)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dateButtonText: {
      color: NEON,
      fontSize: 30,
      lineHeight: 32,
    },
    dateText: {
      flex: 1,
      color: TEXT,
      fontSize: 14,
      fontWeight: '900',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    summary: {
      backgroundColor:
        'rgba(124, 255, 58, 0.1)',
      borderWidth: 1,
      borderColor:
        'rgba(124, 255, 58, 0.3)',
      borderRadius: 20,
      padding: 15,
      marginTop: 15,
    },
    summaryCalories: {
      color: NEON,
      fontSize: 29,
      fontWeight: '900',
    },
    summaryMacros: {
      color: TEXT,
      fontSize: 12,
      fontWeight: '800',
      marginTop: 4,
    },
    emptyCard: {
      backgroundColor: CARD,
      borderRadius: 20,
      padding: 25,
      alignItems: 'center',
      marginTop: 14,
    },
    emptyIcon: {
      fontSize: 38,
    },
    emptyTitle: {
      color: MUTED,
      fontSize: 13,
      fontWeight: '800',
      marginTop: 10,
    },
    mealCard: {
      backgroundColor: CARD,
      borderRadius: 19,
      borderWidth: 1,
      borderColor:
        'rgba(148, 163, 184, 0.15)',
      padding: 13,
      marginTop: 12,
    },
    mealHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    mealHeaderBody: {
      flex: 1,
    },
    mealType: {
      color: CYAN,
      fontSize: 12,
      fontWeight: '900',
      textTransform: 'uppercase',
    },
    mealCalories: {
      color: TEXT,
      fontSize: 18,
      fontWeight: '900',
      marginTop: 3,
    },
    deleteText: {
      color: '#FB7185',
      fontSize: 12,
      fontWeight: '900',
    },
    foodRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: BG,
      borderRadius: 14,
      padding: 10,
      marginTop: 7,
    },
    foodBody: {
      flex: 1,
    },
    foodName: {
      color: TEXT,
      fontSize: 13,
      fontWeight: '900',
    },
    foodMeta: {
      color: MUTED,
      fontSize: 10,
      marginTop: 3,
    },
    foodCalories: {
      color: NEON,
      fontSize: 12,
      fontWeight: '900',
      marginLeft: 8,
    },
  });

export default MealLogScreen;
