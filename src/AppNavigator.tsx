// FILE: src/AppNavigator.tsx
import React from 'react';
import { Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import i18n from './i18n';

import { MainScreen } from './screens/MainScreen';
import { NutritionScreen } from './screens/NutritionScreen';
import { GuideScreen } from './screens/GuideScreen';
import { PremiumScreen } from './screens/PremiumScreen';
import { ProgramDetailScreen } from './screens/ProgramDetailScreen';
import { WorkoutVideoScreen } from './screens/WorkoutVideoScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { WeightChartScreen } from './screens/WeightChartScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ===== Inline English resource (no-quote keys) ===== */
const enNavigator = {
  Navigator: {
    stack: {
      program: 'Program',
      workout: 'Workout',
      more: 'More',
      profile: 'User Profile',
      guide: 'Guide',
      premium: 'Premium',
      weightChart: 'Weight Tracking',
    },
    tabs: {
      main: 'PulseFit',
      workout: 'Workout',
      nutrition: 'Nutrition',
      more: 'More',
    },
  },
};
// Merge (idempotent)
try {
  i18n.addResourceBundle('en', 'translation', enNavigator, true, true);
} catch { /* no-op */ }

/** Stacks có i18n bên trong để dùng t(...) cho header */
const MainStack: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProgramDetail"
        component={ProgramDetailScreen}
        options={{ headerTitle: t('tabs.program') }}
      />
      <Stack.Screen
        name="WorkoutVideo"
        component={WorkoutVideoScreen}
        options={{ title: t('tabs.workout') }}
      />
      <Stack.Screen
        name="WorkoutWeb"
        component={WorkoutVideoScreen as any}
        options={{ title: t('tabs.workout') }}
      />
    </Stack.Navigator>
  );
};

// More/Settings stack: đưa Guide & Premium vào đây
const SettingsStack: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="MoreHome" component={SettingsScreen} options={{ headerTitle: t('tabs.more') }} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: t('tabs.profile') }} />
      <Stack.Screen name="Guide" component={GuideScreen} options={{ title: t('tabs.guide') }} />
      <Stack.Screen name="Premium" component={PremiumScreen} options={{ title: t('tabs.premium') }} />
      <Stack.Screen name="WeightChart" component={WeightChartScreen} options={{ title: t('tabs.weightChart') }} />
    </Stack.Navigator>
  );
};

const WorkoutStack: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="WorkoutHome" component={WorkoutScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} options={{ title: t('tabs.program') }} />
      <Stack.Screen name="WorkoutVideo" component={WorkoutVideoScreen} options={{ title: t('tabs.workout') }} />
            <Stack.Screen
        name="WorkoutWeb"
        component={WorkoutVideoScreen as any}
        options={{ title: t('Navigator.stack.workout') }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const extraBottom = Platform.OS === 'android' ? Math.max(insets.bottom, 16) : insets.bottom;
  const tabHeight = 56 + extraBottom;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: tabHeight,
          paddingBottom: extraBottom,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700', marginBottom: 2 },
        tabBarIconStyle: { marginTop: 2 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainStack}
        options={{ tabBarLabel: t('tabs.main'), tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text> }}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutStack}
        options={{ tabBarLabel: t('tabs.workout'), tabBarIcon: ({ color }) => <Text style={{ color }}>🏋️‍♂️</Text> }}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionScreen}
        options={{ tabBarLabel: t('tabs.nutrition'), tabBarIcon: ({ color }) => <Text style={{ color }}>🥗</Text> }}
      />
      {/* Guide & Premium chuyển sang tab More */}
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{ tabBarLabel: t('tabs.more'), tabBarIcon: ({ color }) => <Text style={{ color }}>⚙️</Text> }}
      />
    </Tab.Navigator>
  );
};
