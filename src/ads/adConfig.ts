// src/ads/adConfig.ts
import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

export const ADMOB = {
  android: {
    appId: 'ca-app-pub-7270703936050310~4564431234',
    banner: __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxx/your_banner_id',
    rewarded: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxx/your_rewarded_id',
    interstitial: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxx/your_interstitial_id',
  },
  ios: {
    appId: 'ca-app-pub-xxxxxxxx~xxxxxxxx',
    banner: __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxx/your_banner_id',
    rewarded: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxx/your_rewarded_id',
    interstitial: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxx/your_interstitial_id',
  },
};

export const BANNER_UNIT = Platform.OS === 'android' ? ADMOB.android.banner : ADMOB.ios.banner;
