// FILE: src/AppNavigator.tsx
import React from 'react';
import {
  Text,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
import { AdBanner } from './components/AdBanner';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/* ===== Inline English resource ===== */
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
      main: 'Insanity Deluxe Edition',
      workout: 'Workout',
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

const MainStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />

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

      <Stack.Screen
        name="WorkoutHistory"
        component={WorkoutHistoryScreen}
        options={{ title: t('history.screenTitle', 'Workout History') }}
      />
    </Stack.Navigator>
  );
};

const NutritionStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NutritionHome"
        component={NutritionScreen}
        options={{ headerShown: false }}
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
    <Stack.Navigator>
      <Stack.Screen
        name="MoreHome"
        component={SettingsScreen}
        options={{ headerTitle: t('tabs.more') }}
      />

      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ title: t('tabs.profile') }}
      />

      <Stack.Screen
        name="Guide"
        component={GuideScreen}
        options={{ title: t('tabs.guide') }}
      />

      <Stack.Screen
        name="Premium"
        component={PremiumScreen}
        options={{ title: t('tabs.premium') }}
      />

      <Stack.Screen
        name="WeightChart"
        component={WeightChartScreen}
        options={{ title: t('tabs.weightChart') }}
      />

      <Stack.Screen
        name="WorkoutHistory"
        component={WorkoutHistoryScreen}
        options={{ title: t('history.screenTitle', 'Workout History') }}
      />
    </Stack.Navigator>
  );
};

const WorkoutStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WorkoutHome"
        component={WorkoutScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProgramDetail"
        component={ProgramDetailScreen}
        options={{ title: t('tabs.program') }}
      />

      <Stack.Screen
        name="WorkoutVideo"
        component={WorkoutVideoScreen}
        options={{ title: t('tabs.workout') }}
      />

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

  const extraBottom =
    Platform.OS === 'android'
      ? Math.max(insets.bottom, 8)
      : Math.max(insets.bottom, 8);

  const tabButtonHeight = 56 + extraBottom;

  /**
   * Banner test của bạn đang là 468x60.
   * Cộng thêm padding trên/dưới => 68.
   */
  const bannerHeight = 68;

  /**
   * Tab bar phải cao hơn để chừa chỗ cho banner,
   * nếu không banner absolute sẽ đè lên nội dung page.
   */
  const totalBottomHeight = tabButtonHeight + bannerHeight;

  return (
    <View style={styles.root}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E7EB',
            height: totalBottomHeight,

            /**
             * Đẩy icon + label xuống dưới banner
             */
            paddingTop: bannerHeight + 6,
            paddingBottom: extraBottom,
          },
          tabBarActiveTintColor: '#10B981',
          tabBarInactiveTintColor: '#64748B',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
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
            tabBarLabel: t('tabs.main'),
            tabBarIcon: ({ color }) => (
              <Text style={{ color }}>🏠</Text>
            ),
          }}
        />

        <Tab.Screen
          name="Workout"
          component={WorkoutStack}
          options={{
            tabBarLabel: t('tabs.workout'),
            tabBarIcon: ({ color }) => (
              <Text style={{ color }}>🏋️‍♂️</Text>
            ),
          }}
        />

        <Tab.Screen
          name="Nutrition"
          component={NutritionStack}
          options={{
            tabBarLabel: t('tabs.nutrition'),
            tabBarIcon: ({ color }) => (
              <Text style={{ color }}>🥗</Text>
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarLabel: t('tabs.more'),
            tabBarIcon: ({ color }) => (
              <Text style={{ color }}>⚙️</Text>
            ),
          }}
        />
      </Tab.Navigator>

      {/* Banner cố định nằm phía trên icon bottom tab */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  bannerAboveTab: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    elevation: 999,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    borderBottomColor: '#E5E7EB',
    paddingTop: 4,
    paddingBottom: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;
