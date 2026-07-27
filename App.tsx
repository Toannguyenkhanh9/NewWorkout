// FILE: App.tsx
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import './src/i18n';

import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import mobileAds
  from 'react-native-google-mobile-ads';

import {
  SubscriptionProvider,
} from './src/iap/SubscriptionProvider';
import {
  AppNavigator,
} from './src/AppNavigator';
import OnboardingProfileScreen
  from './src/screens/OnboardingProfileScreen';
import {
  preloadRewarded,
} from './src/ads/rewarded';
import {
  ToastProvider,
} from './src/ui/Toast';
import {
  initNotifications,
} from './src/notifications/reminder';
import {
  getOnboardingState,
  markOnboardingCompleted,
} from './src/store/onboarding';

const BG = '#06111D';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';

export default function App() {
  const [
    ready,
    setReady,
  ] = useState(false);

  const [
    needsOnboard,
    setNeedsOnboard,
  ] = useState(false);

  useEffect(() => {
    let mounted = true;

    const bootstrap =
      async () => {
        try {
          try {
            await mobileAds()
              .initialize();

            preloadRewarded();
          } catch (error) {
            console.log(
              '[app] mobile ads init error',
              error,
            );
          }

          try {
            await initNotifications();
          } catch (error) {
            console.log(
              '[app] notifications init error',
              error,
            );
          }

          const onboarding =
            await getOnboardingState();

          console.log(
            '[app] onboarding state',
            onboarding,
          );

          if (mounted) {
            setNeedsOnboard(
              !onboarding.completed,
            );
          }
        } catch (error) {
          console.log(
            '[app] onboarding state error',
            error,
          );

          if (mounted) {
            setNeedsOnboard(true);
          }
        } finally {
          if (mounted) {
            setReady(true);
          }
        }
      };

    bootstrap();

    return () => {
      mounted = false;
    };
  }, []);

  const completeOnboarding =
    useCallback(() => {
      /**
       * Chuyển sang Home ngay lập tức.
       * Không chặn UI để chờ AsyncStorage.
       */
      setNeedsOnboard(false);

      void markOnboardingCompleted()
        .catch(error => {
          console.log(
            '[app] save onboarding error',
            error,
          );
        });
    }, []);

  if (!ready) {
    return (
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={BG}
        />

        <View
          style={
            styles.loadingContainer
          }
        >
          <View
            style={
              styles.logoBadge
            }
          >
            <Text
              style={
                styles.logoText
              }
            >
              IDE
            </Text>
          </View>

          <Text
            style={styles.appName}
          >
            Insanity Deluxe Edition
          </Text>

          <ActivityIndicator
            color={NEON}
            size="large"
            style={styles.spinner}
          />

          <Text
            style={
              styles.loadingText
            }
          >
            Preparing your training plan...
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BG}
      />

      <ToastProvider>
        <SubscriptionProvider>
          {needsOnboard ? (
            <OnboardingProfileScreen
              onDone={
                completeOnboarding
              }
            />
          ) : (
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          )}
        </SubscriptionProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}

const styles =
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor: BG,
      alignItems: 'center',
      justifyContent:
        'center',
      padding: 24,
    },
    logoBadge: {
      width: 82,
      height: 82,
      borderRadius: 24,
      backgroundColor:
        'rgba(124, 255, 58, 0.12)',
      borderWidth: 1,
      borderColor:
        'rgba(124, 255, 58, 0.5)',
      alignItems: 'center',
      justifyContent:
        'center',
    },
    logoText: {
      color: NEON,
      fontSize: 30,
      fontWeight: '900',
    },
    appName: {
      color: TEXT,
      fontSize: 28,
      fontWeight: '900',
      marginTop: 14,
    },
    spinner: {
      marginTop: 24,
    },
    loadingText: {
      color: MUTED,
      fontSize: 13,
      marginTop: 12,
      textAlign: 'center',
    },
  });