// FILE: src/screens/PremiumScreen.tsx
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import { useSubscription } from '../iap/SubscriptionProvider';
import {
  PREMIUM_LIFETIME_PRODUCT_ID,
  PREMIUM_MONTHLY_SUB_ID,
} from '../iap/iapConfig';

const PREMIUM_KEY = 'app:isPremium';
const REMOVE_ADS_KEY = 'app:adsRemoved';

export const PremiumScreen: React.FC = () => {
  const { t } = useTranslation();

  const {
    isPremium,
    loading,
    purchasing,
    products,
    subscriptions,
    buyLifetime,
    buyMonthlySubscription,
    restorePurchases,
  } = useSubscription();

  const markPremiumActive = useCallback(async () => {
    await AsyncStorage.setItem(PREMIUM_KEY, 'true');
    await AsyncStorage.setItem(REMOVE_ADS_KEY, 'true');

    DeviceEventEmitter.emit('premiumChanged');
  }, []);

  useEffect(() => {
    if (isPremium) {
      markPremiumActive();
    }
  }, [isPremium, markPremiumActive]);

  const lifetimeProduct = useMemo(() => {
    return (
      products.find(
        (p: any) => p.productId === PREMIUM_LIFETIME_PRODUCT_ID,
      ) || null
    );
  }, [products]);

  const monthlySub = useMemo(() => {
    return (
      subscriptions.find(
        (s: any) => s.productId === PREMIUM_MONTHLY_SUB_ID,
      ) || null
    );
  }, [subscriptions]);

  const monthlyPrice = useMemo(() => {
    if (!monthlySub) return '$--';

    if (monthlySub.localizedPrice) return monthlySub.localizedPrice;
    if (monthlySub.price) return monthlySub.price;

    const androidPhase =
      monthlySub.subscriptionOfferDetails?.[0]?.pricingPhases
        ?.pricingPhaseList?.[0]?.formattedPrice;

    return androidPhase || '$--';
  }, [monthlySub]);

  const androidOfferToken = useMemo(() => {
    if (Platform.OS !== 'android') return undefined;

    return monthlySub?.subscriptionOfferDetails?.[0]?.offerToken;
  }, [monthlySub]);

  const onBuyMonthly = async () => {
    try {
      if (!monthlySub?.productId) {
        Alert.alert(
          t('premium.errorTitle', 'Purchase failed'),
          t(
            'premium.subUnavailable',
            'Monthly subscription not found. Please check Play Console / App Store setup.',
          ),
        );
        return;
      }

      await buyMonthlySubscription(monthlySub.productId, androidOfferToken);

      await markPremiumActive();

      Alert.alert(
        t('premium.restoreTitle', 'Premium'),
        t('premium.restoreSuccess', 'Premium restored successfully.'),
      );
    } catch (e: any) {
      Alert.alert(
        t('premium.errorTitle', 'Purchase failed'),
        e?.message || t('premium.errorText', 'Unable to complete purchase.'),
      );
    }
  };

  const onBuyLifetime = async () => {
    try {
      if (!lifetimeProduct?.productId) {
        Alert.alert(
          t('premium.errorTitle', 'Purchase failed'),
          t(
            'premium.productUnavailable',
            'Premium product not found. Please check Play Console / App Store setup.',
          ),
        );
        return;
      }

      await buyLifetime(lifetimeProduct.productId);

      await markPremiumActive();

      Alert.alert(
        t('premium.restoreTitle', 'Premium'),
        t('premium.restoreSuccess', 'Premium restored successfully.'),
      );
    } catch (e: any) {
      Alert.alert(
        t('premium.errorTitle', 'Purchase failed'),
        e?.message || t('premium.errorText', 'Unable to complete purchase.'),
      );
    }
  };

  const onRestore = async () => {
    try {
      const ok = await restorePurchases();

      if (ok) {
        await markPremiumActive();
      }

      Alert.alert(
        t('premium.restoreTitle', 'Restore purchases'),
        ok
          ? t('premium.restoreSuccess', 'Premium restored successfully.')
          : t('premium.restoreEmpty', 'No Premium purchase found.'),
      );
    } catch (e: any) {
      Alert.alert(
        t('premium.errorTitle', 'Purchase failed'),
        e?.message || t('premium.errorText', 'Unable to complete purchase.'),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('premium.title', 'Upgrade Premium')}
      </Text>

      <Text style={styles.text}>
        • {t('premium.removeAds', 'Remove ads')}
      </Text>

      <Text style={styles.text}>
        • {t('premium.allPrograms', 'Unlock the full experience')}
      </Text>

  <Text style={styles.text}>
    • {t(
      'premium.downloadOfflineVideos',
      'Download workout videos and watch offline',
    )}
  </Text>

  <Text style={styles.text}>
    • {t(
      'premium.advancedMealPlan',
      'Advanced meal plans and nutrition tools',
    )}
  </Text>

      {isPremium ? (
        <View style={styles.activeBox}>
          <Text style={styles.activeText}>
            {t('premium.active', 'Premium is active')}
          </Text>
        </View>
      ) : null}

      <View style={styles.planCard}>
        <Text style={styles.planName}>
          {t('premium.monthlyTitle', 'Monthly Premium')}
        </Text>

        <Text style={styles.planDesc}>
          {t(
            'premium.monthlyDesc',
            'Auto-renews every month to keep Premium active',
          )}
        </Text>

        <Text style={styles.priceValue}>
          {loading ? t('premium.loading', 'Loading...') : monthlyPrice}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            (loading || purchasing || isPremium) && styles.buttonDisabled,
          ]}
          onPress={onBuyMonthly}
          disabled={loading || purchasing || isPremium}
          activeOpacity={0.85}
        >
          {purchasing ? (
            <ActivityIndicator color="#0F172A" />
          ) : (
            <Text style={styles.buttonText}>
              {t('premium.subscribeMonthly', 'Subscribe monthly')}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planName}>
          {t('premium.lifetimeTitle', 'Lifetime Premium')}
        </Text>

        <Text style={styles.planDesc}>
          {t(
            'premium.lifetimeDesc',
            'One-time payment, keep Premium forever',
          )}
        </Text>

        <Text style={styles.priceValue}>
          {loading
            ? t('premium.loading', 'Loading...')
            : lifetimeProduct?.localizedPrice ||
              lifetimeProduct?.price ||
              '$--'}
        </Text>

        <TouchableOpacity
          style={[
            styles.buttonSecondary,
            (loading || purchasing || isPremium) && styles.buttonDisabled,
          ]}
          onPress={onBuyLifetime}
          disabled={loading || purchasing || isPremium}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonSecondaryText}>
            {t('premium.buyLifetime', 'Buy lifetime')}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.restoreButton,
          (loading || purchasing) && styles.buttonDisabled,
        ]}
        onPress={onRestore}
        disabled={loading || purchasing}
        activeOpacity={0.85}
      >
        <Text style={styles.restoreText}>
          {t('premium.restore', 'Restore purchases')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#020817',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 4,
  },
  activeBox: {
    marginTop: 16,
    marginBottom: 12,
    backgroundColor: '#0B3B2E',
    borderColor: '#10B981',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  activeText: {
    color: '#D1FAE5',
    fontWeight: '800',
    textAlign: 'center',
  },
  planCard: {
    marginTop: 16,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  planName: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '800',
  },
  planDesc: {
    color: '#9CA3AF',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  priceValue: {
    color: '#F9FAFB',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 14,
  },
  button: {
    marginTop: 14,
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonSecondary: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#0F172A',
    fontWeight: '800',
    fontSize: 16,
  },
  buttonSecondaryText: {
    textAlign: 'center',
    color: '#111827',
    fontWeight: '800',
    fontSize: 16,
  },
  restoreButton: {
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#374151',
  },
  restoreText: {
    textAlign: 'center',
    color: '#E5E7EB',
    fontWeight: '700',
    fontSize: 15,
  },
  benefitList: {
  marginBottom: 8,
},
});

export default PremiumScreen;