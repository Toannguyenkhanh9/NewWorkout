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
  markPremiumActive,
  markPremiumPlusActive,
  type PremiumPlan,
} from '../services/premiumAccess';

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

  const [activePlan, setActivePlan] = useState<PremiumPlan>('none');

  const reloadPlan = useCallback(async () => {
    const plan = await loadPremiumPlan();
    setActivePlan(plan);
  }, []);

  useEffect(() => {
    reloadPlan();
  }, [reloadPlan]);

  useEffect(() => {
    if (isPremium) {
      markPremiumActive().then(reloadPlan).catch(() => {});
    }
  }, [isPremium, reloadPlan]);

  const findProduct = useCallback(
    (productId: string) => {
      return products.find((p: any) => p.productId === productId) || null;
    },
    [products],
  );

  const findSubscription = useCallback(
    (productId: string) => {
      return subscriptions.find((s: any) => s.productId === productId) || null;
    },
    [subscriptions],
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

  const getSubPrice = useCallback((sub: any) => {
    if (!sub) return '$--';

    if (sub.localizedPrice) return sub.localizedPrice;
    if (sub.price) return sub.price;

    const androidPhase =
      sub.subscriptionOfferDetails?.[0]?.pricingPhases
        ?.pricingPhaseList?.[0]?.formattedPrice;

    return androidPhase || '$--';
  }, []);

  const getProductPrice = useCallback((product: any) => {
    if (!product) return '$--';

    return product.localizedPrice || product.price || '$--';
  }, []);

  const getAndroidOfferToken = useCallback((sub: any) => {
    if (Platform.OS !== 'android') return undefined;

    return sub?.subscriptionOfferDetails?.[0]?.offerToken;
  }, []);

  const onBuyPremiumMonthly = async () => {
    try {
      if (!premiumMonthlySub?.productId) {
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
        premiumMonthlySub.productId,
        getAndroidOfferToken(premiumMonthlySub),
      );

      await markPremiumActive();
      await reloadPlan();

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

  const onBuyPremiumLifetime = async () => {
    try {
      if (!premiumLifetimeProduct?.productId) {
        Alert.alert(
          t('premium.errorTitle', 'Purchase failed'),
          t(
            'premium.productUnavailable',
            'Premium product not found. Please check Play Console / App Store setup.',
          ),
        );
        return;
      }

      await buyLifetime(premiumLifetimeProduct.productId);

      await markPremiumActive();
      await reloadPlan();

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

  const onBuyPlusMonthly = async () => {
    try {
      if (!plusMonthlySub?.productId) {
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
        plusMonthlySub.productId,
        getAndroidOfferToken(plusMonthlySub),
      );

      await markPremiumPlusActive();
      await reloadPlan();

      Alert.alert(
        t('premium.restoreTitle', 'Premium Plus'),
        t(
          'premium.plusSuccess',
          'Premium Plus is active. Offline video download unlocked.',
        ),
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
      if (!plusLifetimeProduct?.productId) {
        Alert.alert(
          t('premium.errorTitle', 'Purchase failed'),
          t(
            'premium.plusProductUnavailable',
            'Premium Plus product not found. Please check Play Console / App Store setup.',
          ),
        );
        return;
      }

      await buyLifetime(plusLifetimeProduct.productId);

      await markPremiumPlusActive();
      await reloadPlan();

      Alert.alert(
        t('premium.restoreTitle', 'Premium Plus'),
        t(
          'premium.plusSuccess',
          'Premium Plus is active. Offline video download unlocked.',
        ),
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
              (loading || purchasing || isPremiumOnlyActive || isPlusActive) &&
                styles.buttonDisabled,
            ]}
            onPress={onBuyPremiumMonthly}
            disabled={
              loading || purchasing || isPremiumOnlyActive || isPlusActive
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
              (loading || purchasing || isPremiumOnlyActive || isPlusActive) &&
                styles.buttonDisabled,
            ]}
            onPress={onBuyPremiumLifetime}
            disabled={
              loading || purchasing || isPremiumOnlyActive || isPlusActive
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
              (loading || purchasing || isPlusActive) && styles.buttonDisabled,
            ]}
            onPress={onBuyPlusMonthly}
            disabled={loading || purchasing || isPlusActive}
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
              (loading || purchasing || isPlusActive) && styles.buttonDisabled,
            ]}
            onPress={onBuyPlusLifetime}
            disabled={loading || purchasing || isPlusActive}
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