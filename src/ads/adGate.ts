// src/ads/adGate.ts
import { ensureTrialStarted, isTrialActive } from './trial';
import { showRewarded, RewardedResult } from './rewarded';

export async function gateWorkout({
  isPremium,
  startTrialOnFirstUse = true,
}: {
  isPremium?: boolean;
  startTrialOnFirstUse?: boolean;
}): Promise<RewardedResult | 'pass'> {
  if (isPremium) return 'pass';

  if (startTrialOnFirstUse) {
    await ensureTrialStarted();
  }

  const active = await isTrialActive();
  if (active) return 'pass';

  return await showRewarded();
}

// ✅ thêm lại hàm này cho banner
export async function canShowBanner(isPremium?: boolean): Promise<boolean> {
  if (isPremium) return false;

  const active = await isTrialActive();
  return !active;
}