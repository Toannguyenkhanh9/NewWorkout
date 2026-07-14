// FILE: src/AppNavigator.tsx
import React, { useEffect, useState } from 'react';
import {
  Text,
  Platform,
  View,
  StyleSheet,
  Keyboard,
  AppState,
  DeviceEventEmitter,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from './i18n';

import { MainScreen } from './screens/MainScreen';
import { NutritionScreen } from './screens/NutritionScreen';
import PdfViewerScreen from './screens/PdfViewerScreen';
import { GuideScreen } from './screens/GuideScreen';
import { PremiumScreen } from './screens/PremiumScreen';
import { ProgramDetailScreen } from './screens/ProgramDetailScreen';
import { WorkoutVideoScreen } from './screens/WorkoutVideoScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { WeightChartScreen } from './screens/WeightChartScreen';
import { WorkoutHistoryScreen } from './screens/WorkoutHistoryScreen';
import { AdvancedMealPlanScreen } from './screens/AdvancedMealPlanScreen';

import GymProgramListScreen from './screens/GymProgramListScreen';
import GymProgramDetailScreen from './screens/GymProgramDetailScreen';
import GymWorkoutDayScreen from './screens/GymWorkoutDayScreen';
import GymWorkoutModeScreen from './screens/GymWorkoutModeScreen';
import GymProgressChartScreen from './screens/GymProgressChartScreen';
import GymPersonalRecordsScreen from './screens/GymPersonalRecordsScreen';
import GymInsightsScreen from './screens/GymInsightsScreen';
import GymBodyProgressScreen from './screens/GymBodyProgressScreen';
import GymQuickWorkoutScreen from './screens/GymQuickWorkoutScreen';
import GymOnboardingScreen from './screens/GymOnboardingScreen';
import GymCalendarScreen from './screens/GymCalendarScreen';

import { AdBanner } from './components/AdBanner';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';

const PREMIUM_KEY = 'app:isPremium';
const REMOVE_ADS_KEY = 'app:adsRemoved';

const enNavigator = {
  Navigator: {
    stack: {
      program: 'Program',
      workout: 'Workout',
      gym: 'Gym Training',
      gymPlan: 'Gym Plan',
      workoutDay: 'Workout Day',
      more: 'More',
      profile: 'User Profile',
      guide: 'Guide',
      premium: 'Premium',
      weightChart: 'Weight Tracking',
    },
    tabs: {
      main: 'Home',
      workout: 'Workout',
      gym: 'Gym',
      nutrition: 'Nutrition',
      more: 'More',
    },
  },
};

try {
  i18n.addResourceBundle('en', 'translation', enNavigator, true, true);
} catch {
  // no-op
}

const screenHeaderOptions = {
  headerStyle: {
    backgroundColor: BG,
  },
  headerTintColor: TEXT,
  headerTitleStyle: {
    color: TEXT,
    fontWeight: '900' as const,
    fontSize: 17,
  },
  headerShadowVisible: false,
  contentStyle: {
    backgroundColor: BG,
  },
};

const MainStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={screenHeaderOptions}>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProgramDetail"
        component={ProgramDetailScreen}
        options={{ title: t('tabs.program', 'Program') }}
      />

      <Stack.Screen
        name="WorkoutVideo"
        component={WorkoutVideoScreen}
        options={{ title: t('tabs.workout', 'Workout') }}
      />

      <Stack.Screen
        name="WorkoutWeb"
        component={WorkoutVideoScreen as any}
        options={{ title: t('tabs.workout', 'Workout') }}
      />

      <Stack.Screen
        name="WorkoutHistory"
        component={WorkoutHistoryScreen}
        options={{
          title: t('history.screenTitle', 'Workout History'),
        }}
      />
    </Stack.Navigator>
  );
};

const WorkoutStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={screenHeaderOptions}>
      <Stack.Screen
        name="WorkoutHome"
        component={WorkoutScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProgramDetail"
        component={ProgramDetailScreen}
        options={{ title: t('tabs.program', 'Program') }}
      />

      <Stack.Screen
        name="WorkoutVideo"
        component={WorkoutVideoScreen}
        options={{ title: t('tabs.workout', 'Workout') }}
      />

      <Stack.Screen
        name="WorkoutWeb"
        component={WorkoutVideoScreen as any}
        options={{
          title: t('Navigator.stack.workout', 'Workout'),
        }}
      />
    </Stack.Navigator>
  );
};

const GymStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={screenHeaderOptions}>
      <Stack.Screen
        name="GymHome"
        component={GymProgramListScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GymProgramDetail"
        component={GymProgramDetailScreen}
        options={{
          title: t('Navigator.stack.gymPlan', 'Gym Plan'),
        }}
      />

      <Stack.Screen
        name="GymWorkoutDay"
        component={GymWorkoutDayScreen}
        options={{
          title: t('Navigator.stack.workoutDay', 'Workout Day'),
        }}
      />
      <Stack.Screen
  name="GymWorkoutMode"
  component={GymWorkoutModeScreen}
  options={{
    title: t('gym.workoutMode', 'Workout Mode'),
  }}
/>

<Stack.Screen
  name="GymProgressChart"
  component={GymProgressChartScreen}
  options={{
    title: t('gym.progressTitle', 'Gym progress'),
  }}
/>
<Stack.Screen
  name="GymPersonalRecords"
  component={GymPersonalRecordsScreen}
  options={{
    title: t('gym.personalRecordsTitle', 'Personal Records'),
  }}
/>
<Stack.Screen
  name="GymInsights"
  component={GymInsightsScreen}
  options={{
    title: t('gym.insightsTitle', 'Training insights'),
  }}
/>

<Stack.Screen
  name="GymBodyProgress"
  component={GymBodyProgressScreen}
  options={{
    title: t('gym.bodyProgress', 'Body progress'),
  }}
/>

<Stack.Screen
  name="GymQuickWorkout"
  component={GymQuickWorkoutScreen}
  options={{
    title: t('gym.quickWorkout', 'Quick workout'),
  }}
/>
<Stack.Screen
  name="GymOnboarding"
  component={GymOnboardingScreen}
  options={{
    title: t('gym.onboardingTitle', 'Set up your gym plan'),
  }}
/>

<Stack.Screen
  name="GymCalendar"
  component={GymCalendarScreen}
  options={{
    title: t('gym.calendarTitle', 'Workout calendar'),
  }}
/>
    </Stack.Navigator>
  );
};

const NutritionStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={screenHeaderOptions}>
      <Stack.Screen
        name="NutritionHome"
        component={NutritionScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AdvancedMealPlan"
        component={AdvancedMealPlanScreen}
        options={{
          title: t('nutrition.advancedMealPlan', 'Advanced meal plan'),
        }}
      />

      <Stack.Screen
        name="PdfViewer"
        component={PdfViewerScreen}
        options={{ title: 'Nutrition PDF' }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={screenHeaderOptions}>
      <Stack.Screen
        name="MoreHome"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ title: t('tabs.profile', 'User Profile') }}
      />

      <Stack.Screen
        name="Guide"
        component={GuideScreen}
        options={{ title: t('tabs.guide', 'Guide') }}
      />

      <Stack.Screen
        name="Premium"
        component={PremiumScreen}
        options={{ title: t('tabs.premium', 'Premium') }}
      />

      <Stack.Screen
        name="WeightChart"
        component={WeightChartScreen}
        options={{ title: t('tabs.weightChart', 'Weight Tracking') }}
      />

      <Stack.Screen
        name="WorkoutHistory"
        component={WorkoutHistoryScreen}
        options={{
          title: t('history.screenTitle', 'Workout History'),
        }}
      />
    </Stack.Navigator>
  );
};

const TabIcon: React.FC<{
  icon: string;
  color: string;
  focused: boolean;
}> = ({ icon, color, focused }) => {
  return (
    <View style={[styles.tabIconWrap, focused && styles.tabIconWrapActive]}>
      <Text style={[styles.tabIcon, { color }]}>{icon}</Text>
    </View>
  );
};

export const AppNavigator: React.FC = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const loadPremiumState = async () => {
    try {
      const premiumRaw = await AsyncStorage.getItem(PREMIUM_KEY);
      const removeAdsRaw = await AsyncStorage.getItem(REMOVE_ADS_KEY);

      setIsPremium(
        premiumRaw === 'true' ||
          premiumRaw === '1' ||
          removeAdsRaw === 'true' ||
          removeAdsRaw === '1',
      );
    } catch {
      setIsPremium(false);
    }
  };

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    loadPremiumState();

    const premiumSub = DeviceEventEmitter.addListener(
      'premiumChanged',
      loadPremiumState,
    );

    const appStateSub = AppState.addEventListener('change', state => {
      if (state === 'active') {
        loadPremiumState();
      }
    });

    return () => {
      premiumSub.remove();
      appStateSub.remove();
    };
  }, []);

  const extraBottom =
    Platform.OS === 'android'
      ? Math.max(insets.bottom, 8)
      : Math.max(insets.bottom, 8);

  const tabButtonHeight = 58 + extraBottom;
  const bannerHeight = isPremium ? 0 : 68;
  const totalBottomHeight = tabButtonHeight + bannerHeight;

  return (
    <View style={styles.root}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: CARD,
            borderTopColor: 'rgba(124, 255, 58, 0.18)',
            borderTopWidth: 1,
            height: totalBottomHeight,
            paddingTop: bannerHeight + 6,
            paddingBottom: extraBottom,
            shadowColor: '#00FFD1',
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: {
              width: 0,
              height: -4,
            },
            elevation: 16,
          },
          tabBarActiveTintColor: NEON,
          tabBarInactiveTintColor: MUTED,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '900',
            marginBottom: 2,
          },
          tabBarIconStyle: {
            marginTop: 2,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Main"
          component={MainStack}
          options={{
            tabBarLabel: t('tabs.main', 'Home'),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="🏠" color={color} focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Workout"
          component={WorkoutStack}
          options={{
            tabBarLabel: t('tabs.workout', 'Workout'),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="💪" color={color} focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Gym"
          component={GymStack}
          options={{
            tabBarLabel: t('tabs.gym', 'Gym'),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="🏋️" color={color} focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Nutrition"
          component={NutritionStack}
          options={{
            tabBarLabel: t('tabs.nutrition', 'Nutrition'),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="🥗" color={color} focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarLabel: t('tabs.more', 'More'),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon="⚙️" color={color} focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>

      {!keyboardVisible && !isPremium ? (
        <View
          style={[
            styles.bannerAboveTab,
            {
              bottom: tabButtonHeight,
              height: bannerHeight,
            },
          ]}
        >
          <AdBanner />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  tabIconWrap: {
    minWidth: 34,
    height: 26,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconWrapActive: {
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.35)',
  },
  tabIcon: {
    fontSize: 17,
    fontWeight: '900',
  },

  bannerAboveTab: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    elevation: 999,
    backgroundColor: CARD,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(124, 255, 58, 0.22)',
    borderBottomColor: 'rgba(148, 163, 184, 0.12)',
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;