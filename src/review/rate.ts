import { Platform, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InAppReview from 'react-native-in-app-review';

const KEY_TAP_COUNT   = 'review:tapCount';
const KEY_LAST_PROMPT = 'review:lastPrompt';
const KEY_NEVER       = 'review:never';

const TAP_THRESHOLD = 5;      // Bấm 5 lần mới hỏi
const COOL_DOWN_DAYS = 60;    // Làm nguội 60 ngày
const ONE_DAY = 24 * 60 * 60 * 1000;

// 🔧 Thay nếu package/bundle id khác
export const APP_PACKAGE = 'com.nexus.FulseFit';
// 🔧 iOS App Store ID (nếu có): dạng 'id1234567890'
export const APP_STORE_ID = 'id0000000000';

export async function trackWorkoutTapAndMaybeAsk() {
  const never = await AsyncStorage.getItem(KEY_NEVER);
  if (never === '1') return;

  const now = Date.now();
  const last = Number(await AsyncStorage.getItem(KEY_LAST_PROMPT) || 0);

  let count = Number(await AsyncStorage.getItem(KEY_TAP_COUNT) || 0) + 1;
  await AsyncStorage.setItem(KEY_TAP_COUNT, String(count));

  // Chưa đủ số lần hoặc đang trong thời gian làm nguội
  if (count < TAP_THRESHOLD || (last && now - last < COOL_DOWN_DAYS * ONE_DAY)) return;

  try {
    if (InAppReview.isAvailable()) {
      // Có thể hiển thị hoặc không tùy Play Core / SKStoreReviewController
      await InAppReview.RequestInAppReview();
    } else {
      await openStoreListing();
    }
  } catch {
    await openStoreListing();
  } finally {
    await AsyncStorage.multiSet([
      [KEY_LAST_PROMPT, String(now)],
      [KEY_TAP_COUNT, '0'],
    ]);
  }
}

export async function openStoreListing() {
  if (Platform.OS === 'android') {
    const market = `market://details?id=${APP_PACKAGE}`;
    const web = `https://play.google.com/store/apps/details?id=${APP_PACKAGE}`;
    try { await Linking.openURL(market); } catch { await Linking.openURL(web); }
  } else {
    const url = `itms-apps://itunes.apple.com/app/${APP_STORE_ID}?action=write-review`;
    const web = `https://apps.apple.com/app/${APP_STORE_ID}`;
    try { await Linking.openURL(url); } catch { await Linking.openURL(web); }
  }
}

// Tuỳ chọn: người dùng chọn “Đừng hỏi lại”
export async function neverAskForReview() {
  await AsyncStorage.setItem(KEY_NEVER, '1');
}
