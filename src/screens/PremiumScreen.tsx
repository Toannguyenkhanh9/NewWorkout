// FILE: src/screens/PremiumScreen.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { useSubscription } from '../iap/SubscriptionProvider';
import {
  PREMIUM_LIFETIME_PRODUCT_ID,
  PREMIUM_MONTHLY_SUB_ID,
  PREMIUM_PLUS_LIFETIME_PRODUCT_ID,
  PREMIUM_PLUS_MONTHLY_SUB_ID,
} from '../iap/iapConfig';

import {
  loadPremiumPlan,
  type PremiumPlan,
} from '../services/premiumAccess';

export const PremiumScreen: React.FC = () => {
  const { t } = useTranslation();

  const {
    isPremium,
    connected,
    loading,
    purchasing,
    iapError,
    products,
    subscriptions,
    reloadProducts,
    buyLifetime,
    buyMonthlySubscription,
    restorePurchases,
  } = useSubscription();

  const [activePlan, setActivePlan] = useState<PremiumPlan>('none');

  const reloadPlan = useCallback(async () => {
    const plan = await loadPremiumPlan();
    setActivePlan(plan);
  }, []);

  useEffect(() => {
    void reloadPlan();
  }, [isPremium, reloadPlan]);

  const getItemId = useCallback((item: any) => {
    return (
      item?.productId ||
      item?.id ||
      item?.productIds?.[0] ||
      ''
    );
  }, []);

  const findProduct = useCallback(
    (productId: string) => {
      return (
        products.find(
          (product: any) =>
            getItemId(product) === productId,
        ) || null
      );
    },
    [getItemId, products],
  );

  const findSubscription = useCallback(
    (productId: string) => {
      return (
        subscriptions.find(
          (subscription: any) =>
            getItemId(subscription) === productId,
        ) || null
      );
    },
    [getItemId, subscriptions],
  );

  const premiumLifetimeProduct = useMemo(() => {
    return findProduct(PREMIUM_LIFETIME_PRODUCT_ID);
  }, [findProduct]);

  const plusLifetimeProduct = useMemo(() => {
    return findProduct(PREMIUM_PLUS_LIFETIME_PRODUCT_ID);
  }, [findProduct]);

  const premiumMonthlySub = useMemo(() => {
    return findSubscription(PREMIUM_MONTHLY_SUB_ID);
  }, [findSubscription]);

  const plusMonthlySub = useMemo(() => {
    return findSubscription(PREMIUM_PLUS_MONTHLY_SUB_ID);
  }, [findSubscription]);

  const getAndroidSubscriptionOffer = useCallback(
    (subscription: any) => {
      return (
        subscription?.subscriptionOfferDetailsAndroid?.[0] ||
        subscription?.subscriptionOfferDetails?.[0] ||
        null
      );
    },
    [],
  );

  const getSubPrice = useCallback(
    (subscription: any) => {
      if (!subscription) {
        return t(
          'premium.unavailable',
          'Unavailable',
        );
      }

      const phasePrice =
        getAndroidSubscriptionOffer(subscription)
          ?.pricingPhases
          ?.pricingPhaseList?.[0]
          ?.formattedPrice;

      return (
        subscription.displayPrice ||
        subscription.localizedPrice ||
        phasePrice ||
        (typeof subscription.price === 'string'
          ? subscription.price
          : '') ||
        t(
          'premium.unavailable',
          'Unavailable',
        )
      );
    },
    [getAndroidSubscriptionOffer, t],
  );

  const getProductPrice = useCallback(
    (product: any) => {
      if (!product) {
        return t(
          'premium.unavailable',
          'Unavailable',
        );
      }

      const androidPrice =
        product?.oneTimePurchaseOfferDetailsAndroid
          ?.formattedPrice ||
        product?.oneTimePurchaseOfferDetails
          ?.formattedPrice;

      return (
        product.displayPrice ||
        product.localizedPrice ||
        androidPrice ||
        (typeof product.price === 'string'
          ? product.price
          : '') ||
        t(
          'premium.unavailable',
          'Unavailable',
        )
      );
    },
    [t],
  );

  const getAndroidOfferToken = useCallback(
    (subscription: any) => {
      if (Platform.OS !== 'android') {
        return undefined;
      }

      return (
        getAndroidSubscriptionOffer(subscription)
          ?.offerToken ||
        undefined
      );
    },
    [getAndroidSubscriptionOffer],
  );

  const onBuyPremiumMonthly = async () => {
    try {
      if (!getItemId(premiumMonthlySub)) {
        Alert.alert(
          t('premium.errorTitle', 'Purchase failed'),
          t(
            'premium.subUnavailable',
            'Monthly subscription not found. Please check Play Console / App Store setup.',
          ),
        );
        return;
      }

      await buyMonthlySubscription(
        getItemId(premiumMonthlySub),
        getAndroidOfferToken(premiumMonthlySub),
      );

    } catch (e: any) {
      Alert.alert(
        t('premium.errorTitle', 'Purchase failed'),
        e?.message || t('premium.errorText', 'Unable to complete purchase.'),
      );
    }
  };

  const onBuyPremiumLifetime = async () => {
    try {
      if (!getItemId(premiumLifetimeProduct)) {
        Alert.alert(
          t('premium.errorTitle', 'Purchase failed'),
          t(
            'premium.productUnavailable',
            'Premium product not found. Please check Play Console / App Store setup.',
          ),
        );
        return;
      }

      await buyLifetime(getItemId(premiumLifetimeProduct));

    } catch (e: any) {
      Alert.alert(
        t('premium.errorTitle', 'Purchase failed'),
        e?.message || t('premium.errorText', 'Unable to complete purchase.'),
      );
    }
  };

  const onBuyPlusMonthly = async () => {
    try {
      if (!getItemId(plusMonthlySub)) {
        Alert.alert(
          t('premium.errorTitle', 'Purchase failed'),
          t(
            'premium.plusSubUnavailable',
            'Premium Plus subscription not found. Please check Play Console / App Store setup.',
          ),
        );
        return;
      }

      await buyMonthlySubscription(
        getItemId(plusMonthlySub),
        getAndroidOfferToken(plusMonthlySub),
      );

    } catch (e: any) {
      Alert.alert(
        t('premium.errorTitle', 'Purchase failed'),
        e?.message || t('premium.errorText', 'Unable to complete purchase.'),
      );
    }
  };

  const onBuyPlusLifetime = async () => {
    try {
      if (!getItemId(plusLifetimeProduct)) {
        Alert.alert(
          t('premium.errorTitle', 'Purchase failed'),
          t(
            'premium.plusProductUnavailable',
            'Premium Plus product not found. Please check Play Console / App Store setup.',
          ),
        );
        return;
      }

      await buyLifetime(getItemId(plusLifetimeProduct));

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
        /**
         * Lưu ý:
         * Phần restore chính xác Premium hay Premium Plus nên xử lý trong SubscriptionProvider.
         * Ở đây chỉ reload lại key đã được Provider lưu.
         */
        await reloadPlan();
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

  const isPremiumOnlyActive = activePlan === 'premium';
  const isPlusActive = activePlan === 'premium_plus';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        {t('premium.title', 'Upgrade Premium')}
      </Text>

      {!connected ? (
        <View style={styles.storeStatusBox}>
          <ActivityIndicator
            color="#7CFF3A"
          />

          <Text style={styles.storeStatusText}>
            {t(
              'premium.connectingStore',
              'Connecting to the store…',
            )}
          </Text>
        </View>
      ) : null}

      {iapError ? (
        <View style={styles.storeErrorBox}>
          <Text style={styles.storeErrorText}>
            {iapError}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              void reloadProducts();
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.retryText}>
              {t('common.retry', 'Retry')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {activePlan !== 'none' ? (
        <View style={styles.activeBox}>
          <Text style={styles.activeText}>
            {isPlusActive
              ? t('premium.plusActive', 'Premium Plus is active')
              : t('premium.active', 'Premium is active')}
          </Text>
        </View>
      ) : null}

      <View style={styles.planCard}>
        <View style={styles.planHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.planName}>
              {t('premium.premiumTitle', 'Premium')}
            </Text>

            <Text style={styles.planDesc}>
              {t(
                'premium.premiumDesc',
                'Best for removing ads and unlocking the main experience.',
              )}
            </Text>
          </View>

          {isPremiumOnlyActive ? (
            <View style={styles.currentPill}>
              <Text style={styles.currentPillText}>
                {t('premium.currentPlan', 'Current')}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.benefitList}>
          <Text style={styles.text}>
            • {t('premium.removeAds', 'Remove ads')}
          </Text>

          <Text style={styles.text}>
            • {t('premium.allPrograms', 'Unlock the full experience')}
          </Text>

          <Text style={styles.text}>
            • {t(
              'premium.advancedMealPlan',
              'Advanced meal plans and nutrition tools',
            )}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceValue}>
            {loading
              ? t('premium.loading', 'Loading...')
              : getSubPrice(premiumMonthlySub)}
          </Text>

          <TouchableOpacity
            style={[
              styles.button,
              (!connected || loading || purchasing || isPremiumOnlyActive || isPlusActive) &&
                styles.buttonDisabled,
            ]}
            onPress={onBuyPremiumMonthly}
            disabled={
              !connected || loading || purchasing || isPremiumOnlyActive || isPlusActive
            }
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

        <View style={styles.priceRow}>
          <Text style={styles.priceValue}>
            {loading
              ? t('premium.loading', 'Loading...')
              : getProductPrice(premiumLifetimeProduct)}
          </Text>

          <TouchableOpacity
            style={[
              styles.buttonSecondary,
              (!connected || loading || purchasing || isPremiumOnlyActive || isPlusActive) &&
                styles.buttonDisabled,
            ]}
            onPress={onBuyPremiumLifetime}
            disabled={
              !connected || loading || purchasing || isPremiumOnlyActive || isPlusActive
            }
            activeOpacity={0.85}
          >
            <Text style={styles.buttonSecondaryText}>
              {t('premium.buyLifetime', 'Buy lifetime')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.planCard, styles.plusCard]}>
        <View style={styles.planHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.plusName}>
              {t('premium.plusTitle', 'Premium Plus')}
            </Text>

            <Text style={styles.planDesc}>
              {t(
                'premium.plusDesc',
                'Includes Premium and unlocks offline workout video downloads.',
              )}
            </Text>
          </View>

          {isPlusActive ? (
            <View style={styles.plusPill}>
              <Text style={styles.plusPillText}>
                {t('premium.currentPlan', 'Current')}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.benefitList}>
          <Text style={styles.text}>
            • {t('premium.everythingInPremium', 'Everything in Premium')}
          </Text>

          <Text style={styles.text}>
            • {t(
              'premium.downloadOfflineVideos',
              'Download workout videos and watch offline',
            )}
          </Text>

          <Text style={styles.text}>
            • {t(
              'premium.offlineRepeatBenefit',
              'Download once and use it for repeated workout days',
            )}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceValue}>
            {loading
              ? t('premium.loading', 'Loading...')
              : getSubPrice(plusMonthlySub)}
          </Text>

          <TouchableOpacity
            style={[
              styles.plusButton,
              (!connected || loading || purchasing || isPlusActive) && styles.buttonDisabled,
            ]}
            onPress={onBuyPlusMonthly}
            disabled={!connected || loading || purchasing || isPlusActive}
            activeOpacity={0.85}
          >
            {purchasing ? (
              <ActivityIndicator color="#06111D" />
            ) : (
              <Text style={styles.plusButtonText}>
                {t('premium.subscribePlusMonthly', 'Subscribe Plus')}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceValue}>
            {loading
              ? t('premium.loading', 'Loading...')
              : getProductPrice(plusLifetimeProduct)}
          </Text>

          <TouchableOpacity
            style={[
              styles.plusButtonSecondary,
              (!connected || loading || purchasing || isPlusActive) && styles.buttonDisabled,
            ]}
            onPress={onBuyPlusLifetime}
            disabled={!connected || loading || purchasing || isPlusActive}
            activeOpacity={0.85}
          >
            <Text style={styles.plusButtonSecondaryText}>
              {t('premium.buyPlusLifetime', 'Buy Plus lifetime')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.restoreButton,
          (!connected || loading || purchasing) && styles.buttonDisabled,
        ]}
        onPress={onRestore}
        disabled={!connected || loading || purchasing}
        activeOpacity={0.85}
      >
        <Text style={styles.restoreText}>
          {t('premium.restore', 'Restore purchases')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020817',
  },
  content: {
    padding: 16,
    paddingBottom: 170,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#F9FAFB',
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 6,
    lineHeight: 20,
  },
  storeStatusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  storeStatusText: {
    flex: 1,
    marginLeft: 10,
    color: '#D1D5DB',
    fontSize: 12,
  },
  storeErrorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  storeErrorText: {
    color: '#FCA5A5',
    fontSize: 11,
    lineHeight: 17,
  },
  retryButton: {
    alignSelf: 'flex-start',
    marginTop: 9,
    backgroundColor: '#F9FAFB',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  retryText: {
    color: '#111827',
    fontSize: 11,
    fontWeight: '900',
  },
  activeBox: {
    marginBottom: 14,
    backgroundColor: '#0B3B2E',
    borderColor: '#10B981',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },
  activeText: {
    color: '#D1FAE5',
    fontWeight: '900',
    textAlign: 'center',
  },
  planCard: {
    marginTop: 16,
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  plusCard: {
    borderColor: 'rgba(124, 255, 58, 0.45)',
    backgroundColor: '#0B1F17',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  planName: {
    color: '#F9FAFB',
    fontSize: 21,
    fontWeight: '900',
  },
  plusName: {
    color: '#7CFF3A',
    fontSize: 22,
    fontWeight: '900',
  },
  planDesc: {
    color: '#9CA3AF',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },
  benefitList: {
    marginTop: 4,
    marginBottom: 8,
  },
  currentPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.45)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  currentPillText: {
    color: '#7DD3FC',
    fontSize: 11,
    fontWeight: '900',
  },
  plusPill: {
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.55)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  plusPillText: {
    color: '#7CFF3A',
    fontSize: 11,
    fontWeight: '900',
  },
  priceRow: {
    marginTop: 12,
  },
  priceValue: {
    color: '#F9FAFB',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 999,
  },
  plusButton: {
    backgroundColor: '#7CFF3A',
    paddingVertical: 12,
    borderRadius: 999,
  },
  plusButtonSecondary: {
    backgroundColor: '#FACC15',
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 16,
  },
  buttonSecondaryText: {
    textAlign: 'center',
    color: '#111827',
    fontWeight: '900',
    fontSize: 16,
  },
  plusButtonText: {
    textAlign: 'center',
    color: '#06111D',
    fontWeight: '900',
    fontSize: 16,
  },
  plusButtonSecondaryText: {
    textAlign: 'center',
    color: '#111827',
    fontWeight: '900',
    fontSize: 16,
  },
  restoreButton: {
    marginTop: 20,
    paddingVertical: 13,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#374151',
  },
  restoreText: {
    textAlign: 'center',
    color: '#E5E7EB',
    fontWeight: '800',
    fontSize: 15,
  },
});

export default PremiumScreen;