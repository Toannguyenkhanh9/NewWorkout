// src/components/AdBanner.tsx
import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { BannerAd, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';
import { BANNER_UNIT } from '../ads/adConfig';
// import { canShowBanner } from '../ads/adGate'; // bật lại khi cần

export const AdBanner: React.FC = () => {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(true); // để chắc chắn thấy test banner

  if (!visible) return null;

  return (
    <View style={{ alignItems: 'center', minHeight: 60 }}>
      <BannerAd
        unitId={BANNER_UNIT}
        // Adaptive cần width đo được:
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdLoaded={() => console.log('Banner loaded')}
        onAdFailedToLoad={(e) => console.log('Banner failed', e)}
      />
    </View>
  );
};
