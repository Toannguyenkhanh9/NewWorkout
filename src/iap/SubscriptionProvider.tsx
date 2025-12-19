// FILE: src/iap/SubscriptionProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNIap from 'react-native-iap';
import {
  PREMIUM_LIFETIME_PRODUCT_ID,
  PREMIUM_MONTHLY_SUB_ID,
  PREMIUM_PRODUCT_IDS,
  PREMIUM_SUB_IDS,
  PREMIUM_STATE_KEY,
} from './iapConfig';

type IapItem = {
  productId: string;
  title?: string;
  description?: string;
  price?: string;
  localizedPrice?: string;
  subscriptionOfferDetails?: Array<{
    offerToken?: string;
    pricingPhases?: {
      pricingPhaseList?: Array<{
        formattedPrice?: string;
      }>;
    };
  }>;
};

type CtxType = {
  isPremium: boolean;
  loading: boolean;
  purchasing: boolean;
  products: IapItem[];
  subscriptions: IapItem[];
  buyLifetime: (sku?: string) => Promise<void>;
  buyMonthlySubscription: (sku?: string, offerToken?: string) => Promise<void>;
  restorePurchases: () => Promise<boolean>;
};

const SubscriptionContext = createContext<CtxType>({
  isPremium: false,
  loading: true,
  purchasing: false,
  products: [],
  subscriptions: [],
  buyLifetime: async () => {},
  buyMonthlySubscription: async () => {},
  restorePurchases: async () => false,
});

async function loadProducts(): Promise<IapItem[]> {
  try {
    const items = await (RNIap as any).getProducts({ skus: PREMIUM_PRODUCT_IDS });
    return Array.isArray(items) ? items : [];
  } catch (e) {
    console.log('[iap] getProducts error', e);
    return [];
  }
}

async function loadSubscriptions(): Promise<IapItem[]> {
  try {
    const items = await (RNIap as any).getSubscriptions({ skus: PREMIUM_SUB_IDS });
    return Array.isArray(items) ? items : [];
  } catch (e) {
    console.log('[iap] getSubscriptions error', e);
    return [];
  }
}

async function requestLifetimePurchase(sku: string) {
  if (Platform.OS === 'android') {
    return await (RNIap as any).requestPurchase({
      skus: [sku],
    });
  }

  return await (RNIap as any).requestPurchase({
    sku,
  });
}

async function requestMonthlySubscription(sku: string, offerToken?: string) {
  if (Platform.OS === 'android') {
    const payload: any = { sku };

    // Android subscription thường cần offerToken nếu dùng base plan / offer
    if (offerToken) {
      payload.subscriptionOffers = [{ sku, offerToken }];
    }

    return await (RNIap as any).requestSubscription(payload);
  }

  return await (RNIap as any).requestSubscription({
    sku,
  });
}

async function finishPurchaseSafe(purchase: any) {
  try {
    await (RNIap as any).finishTransaction({
      purchase,
      isConsumable: false,
    });
  } catch (e) {
    console.log('[iap] finishTransaction error', e);
  }
}

function isPremiumPurchase(productId?: string) {
  return (
    productId === PREMIUM_LIFETIME_PRODUCT_ID ||
    productId === PREMIUM_MONTHLY_SUB_ID
  );
}

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [products, setProducts] = useState<IapItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<IapItem[]>([]);

  useEffect(() => {
    let mounted = true;
    let purchaseUpdateSub: any;
    let purchaseErrorSub: any;

    const init = async () => {
      try {
        const cached = await AsyncStorage.getItem(PREMIUM_STATE_KEY);
        if (mounted && cached === '1') {
          setIsPremium(true);
        }

        await RNIap.initConnection();

        if (
          Platform.OS === 'android' &&
          typeof (RNIap as any).flushFailedPurchasesCachedAsPendingAndroid === 'function'
        ) {
          try {
            await (RNIap as any).flushFailedPurchasesCachedAsPendingAndroid();
          } catch (e) {
            console.log('[iap] flush pending error', e);
          }
        }

        const [loadedProducts, loadedSubs] = await Promise.all([
          loadProducts(),
          loadSubscriptions(),
        ]);

        console.log('[iap] loaded products =', loadedProducts);
        console.log('[iap] loaded subscriptions =', loadedSubs);

        if (mounted) {
          setProducts(loadedProducts);
          setSubscriptions(loadedSubs);
        }

        purchaseUpdateSub = RNIap.purchaseUpdatedListener(async (purchase: any) => {
          try {
            console.log('[iap] purchase updated', purchase);

            if (isPremiumPurchase(purchase?.productId)) {
              await AsyncStorage.setItem(PREMIUM_STATE_KEY, '1');
              if (mounted) setIsPremium(true);
            }

            await finishPurchaseSafe(purchase);
          } catch (e) {
            console.log('[iap] purchaseUpdatedListener error', e);
          } finally {
            if (mounted) setPurchasing(false);
          }
        });

        purchaseErrorSub = RNIap.purchaseErrorListener((error: any) => {
          console.log('[iap] purchase error listener', error);
          if (mounted) setPurchasing(false);
        });

        await restoreOwnedPurchasesSilently(mounted, setIsPremium);
      } catch (e) {
        console.log('[iap] init error', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
      purchaseUpdateSub?.remove?.();
      purchaseErrorSub?.remove?.();
      RNIap.endConnection().catch(() => {});
    };
  }, []);

  const buyLifetime = async (sku = PREMIUM_LIFETIME_PRODUCT_ID) => {
    try {
      setPurchasing(true);
      await requestLifetimePurchase(sku);
    } catch (e) {
      setPurchasing(false);
      console.log('[iap] buyLifetime error', e);
      throw e;
    }
  };

  const buyMonthlySubscription = async (
    sku = PREMIUM_MONTHLY_SUB_ID,
    offerToken?: string
  ) => {
    try {
      setPurchasing(true);
      await requestMonthlySubscription(sku, offerToken);
    } catch (e) {
      setPurchasing(false);
      console.log('[iap] buyMonthlySubscription error', e);
      throw e;
    }
  };

  const restorePurchases = async () => {
    return await restoreOwnedPurchasesSilently(true, setIsPremium, true);
  };

  const value = useMemo(
    () => ({
      isPremium,
      loading,
      purchasing,
      products,
      subscriptions,
      buyLifetime,
      buyMonthlySubscription,
      restorePurchases,
    }),
    [isPremium, loading, purchasing, products, subscriptions]
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

async function restoreOwnedPurchasesSilently(
  mounted: boolean,
  setIsPremium: (v: boolean) => void,
  _forceReturn = false
): Promise<boolean> {
  try {
    const purchases = await RNIap.getAvailablePurchases();
    console.log('[iap] restore purchases =', purchases);

    const owned = purchases.some((p: any) => isPremiumPurchase(p.productId));

    if (owned) {
      await AsyncStorage.setItem(PREMIUM_STATE_KEY, '1');
      if (mounted) setIsPremium(true);
      return true;
    }

    await AsyncStorage.removeItem(PREMIUM_STATE_KEY);
    if (mounted) setIsPremium(false);
    return false;
  } catch (e) {
    console.log('[iap] restore error', e);
    return false;
  }
}

export const useSubscription = () => useContext(SubscriptionContext);