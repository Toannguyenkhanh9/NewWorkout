// FILE: src/screens/GymOnboardingScreen.tsx
import React, {
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  saveGymDaysPerWeek,
  TrainingDaysPerWeek,
} from '../data/gymSmartPlan';

import {
  GymEquipmentMode,
  saveGymEquipmentMode,
} from '../services/gymAdvanced';

import {
  applyGymOnboardingToUserProfile,
  getRecommendedDaysForGoal,
  GymGoal,
  saveGymOnboarding,
} from '../services/gymOnboarding';
import {
  normalizeGymKey,
  translateEquipmentMode,
} from '../utils/gymI18n';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const GOALS: {
  value: GymGoal;
  title: string;
  desc: string;
}[] = [
  {
    value: 'muscle_gain',
    title: 'Build muscle',
    desc: 'Balanced hypertrophy plan',
  },
  {
    value: 'fat_loss',
    title: 'Lose fat',
    desc: 'Weights + conditioning focus',
  },
  {
    value: 'tone',
    title: 'Tone body',
    desc: 'Shape, strength and consistency',
  },
  {
    value: 'strength',
    title: 'Get stronger',
    desc: 'Progressive overload focus',
  },
  {
    value: 'beginner',
    title: 'Beginner',
    desc: 'Safe and simple plan',
  },
];

const DAYS: TrainingDaysPerWeek[] = [3, 4, 5, 6];

const EQUIPMENTS: {
  value: GymEquipmentMode;
  label: string;
}[] = [
  {
    value: 'full_gym',
    label: 'Full gym',
  },
  {
    value: 'machines',
    label: 'Machines',
  },
  {
    value: 'dumbbell_only',
    label: 'Dumbbell',
  },
  {
    value: 'no_barbell',
    label: 'No barbell',
  },
  {
    value: 'home',
    label: 'Home',
  },
];

export const GymOnboardingScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [goal, setGoal] =
    useState<GymGoal>('muscle_gain');

  const [daysPerWeek, setDaysPerWeek] =
    useState<TrainingDaysPerWeek>(4);

  const [equipmentMode, setEquipmentMode] =
    useState<GymEquipmentMode>('full_gym');

  const [injured, setInjured] = useState(false);
  const [injuryNote, setInjuryNote] = useState('');

  const selectGoal = (value: GymGoal) => {
    setGoal(value);
    setDaysPerWeek(getRecommendedDaysForGoal(value));
  };

  const finish = async () => {
    const data = {
      goal,
      daysPerWeek,
      equipmentMode,
      injured,
      injuryNote,
      completedAt: Date.now(),
    };

    await saveGymOnboarding(data);
    await saveGymDaysPerWeek(daysPerWeek);
    await saveGymEquipmentMode(equipmentMode);
    await applyGymOnboardingToUserProfile(data);

    Alert.alert(
      t('gym.gymSetupCompleted', 'Gym setup completed'),
      t(
        'gym.gymSetupCompletedDesc',
        'Your smart gym plan is ready.',
      ),
      [
        {
          text: t('common.ok', 'OK'),
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.kickerPill}>
          <Text style={styles.kickerText}>
            {t('gym.onboardingKicker', 'GYM SETUP')}
          </Text>
        </View>

        <Text style={styles.title}>
          {t('gym.onboardingTitle', 'Set up your gym plan')}
        </Text>

        <Text style={styles.subtitle}>
          {t(
            'gym.onboardingSubtitle',
            'Answer a few questions so the app can build a better workout schedule for you.',
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {t('gym.goalQuestion', 'What is your main goal?')}
        </Text>

        {GOALS.map(item => {
          const active = goal === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              activeOpacity={0.86}
              style={[
                styles.optionCard,
                active && styles.optionCardActive,
              ]}
              onPress={() => selectGoal(item.value)}
            >
              <View style={styles.optionBody}>
                <Text
                  style={[
                    styles.optionTitle,
                    active && styles.optionTitleActive,
                  ]}
                >
                  {t(
                    `gym.goals.${normalizeGymKey(item.value)}.title`,
                    { defaultValue: item.title },
                  )}
                </Text>

                <Text
                  style={[
                    styles.optionDesc,
                    active && styles.optionDescActive,
                  ]}
                >
                  {t(
                    `gym.goals.${normalizeGymKey(item.value)}.desc`,
                    { defaultValue: item.desc },
                  )}
                </Text>
              </View>

              <Text
                style={[
                  styles.optionCheck,
                  active && styles.optionCheckActive,
                ]}
              >
                {active ? '✓' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.sectionTitle}>
          {t('gym.daysPerWeekQuestion', 'How many days per week?')}
        </Text>

        <View style={styles.daysRow}>
          {DAYS.map(item => {
            const active = daysPerWeek === item;

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.86}
                style={[
                  styles.dayBox,
                  active && styles.dayBoxActive,
                ]}
                onPress={() => setDaysPerWeek(item)}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    active && styles.dayNumberActive,
                  ]}
                >
                  {item}
                </Text>

                <Text
                  style={[
                    styles.dayText,
                    active && styles.dayNumberActive,
                  ]}
                >
                  {t('gym.day', 'days')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>
          {t('gym.availableEquipment', 'Available equipment')}
        </Text>

        <View style={styles.chips}>
          {EQUIPMENTS.map(item => {
            const active = equipmentMode === item.value;

            return (
              <TouchableOpacity
                key={item.value}
                activeOpacity={0.86}
                style={[
                  styles.chip,
                  active && styles.chipActive,
                ]}
                onPress={() => setEquipmentMode(item.value)}
              >
                <Text
                  style={[
                    styles.chipText,
                    active && styles.chipTextActive,
                  ]}
                >
                  {translateEquipmentMode(item.value, t, item.label)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>
          {t('gym.injuryQuestion', 'Any injury or limitation?')}
        </Text>

        <View style={styles.injuryRow}>
          <TouchableOpacity
            activeOpacity={0.86}
            style={[
              styles.injuryButton,
              !injured && styles.injuryButtonActive,
            ]}
            onPress={() => setInjured(false)}
          >
            <Text
              style={[
                styles.injuryText,
                !injured && styles.injuryTextActive,
              ]}
            >
              {t('common.no', 'No')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.86}
            style={[
              styles.injuryButton,
              injured && styles.injuryButtonActive,
            ]}
            onPress={() => setInjured(true)}
          >
            <Text
              style={[
                styles.injuryText,
                injured && styles.injuryTextActive,
              ]}
            >
              {t('common.yes', 'Yes')}
            </Text>
          </TouchableOpacity>
        </View>

        {injured ? (
          <TextInput
            value={injuryNote}
            onChangeText={setInjuryNote}
            placeholder={t(
              'gym.injuryPlaceholder',
              'Example: knee pain, lower back pain, shoulder issue...',
            )}
            placeholderTextColor="#64748B"
            multiline
            style={styles.injuryInput}
          />
        ) : null}

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.finishButton}
          onPress={finish}
        >
          <Text style={styles.finishText}>
            {t('gym.createMyGymPlan', 'Create my gym plan')}
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          {t(
            'gym.safetyDisclaimer',
            'This app provides general fitness guidance only. Stop if you feel pain and consult a professional if needed.',
          )}
        </Text>
      </ScrollView>
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
  kickerPill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.5)',
    backgroundColor: 'rgba(25, 230, 210, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
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
    lineHeight: 23,
    marginTop: 10,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 19,
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 14,
    marginBottom: 10,
  },
  optionCardActive: {
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
    borderColor: 'rgba(124, 255, 58, 0.45)',
  },
  optionBody: {
    flex: 1,
  },
  optionTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '900',
  },
  optionTitleActive: {
    color: NEON,
  },
  optionDesc: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  optionDescActive: {
    color: '#D9F99D',
  },
  optionCheck: {
    width: 28,
    color: MUTED,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'right',
  },
  optionCheckActive: {
    color: NEON,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: '23%',
    minHeight: 90,
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBoxActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  dayNumber: {
    color: TEXT,
    fontSize: 28,
    fontWeight: '900',
  },
  dayNumberActive: {
    color: BG,
  },
  dayText: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 5,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: CARD,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginRight: 8,
    marginBottom: 9,
  },
  chipActive: {
    backgroundColor: 'rgba(124, 255, 58, 0.15)',
    borderColor: NEON,
  },
  chipText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '900',
  },
  chipTextActive: {
    color: NEON,
  },
  injuryRow: {
    flexDirection: 'row',
  },
  injuryButton: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    paddingVertical: 13,
    alignItems: 'center',
    marginRight: 8,
  },
  injuryButtonActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  injuryText: {
    color: MUTED,
    fontSize: 14,
    fontWeight: '900',
  },
  injuryTextActive: {
    color: BG,
  },
  injuryInput: {
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.28)',
    color: TEXT,
    minHeight: 90,
    textAlignVertical: 'top',
    padding: 12,
    marginTop: 12,
  },
  finishButton: {
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 26,
  },
  finishText: {
    color: BG,
    fontSize: 16,
    fontWeight: '900',
  },
  disclaimer: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
  },
});

export default GymOnboardingScreen;