import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { PROGRAMS } from '../data/programs';
import { useSubscription } from '../iap/SubscriptionProvider';
import { isTrialActive } from '../ads/trial';
import { ensureTrialAccess } from '../ads/trial';
export const WorkoutScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { isPremium } = useSubscription?.() || { isPremium: false };

  const { width } = Dimensions.get('window');
  const COLS = 2;
  const HPAD = 16;
  const GAP = 12;
  const tileWidth = Math.floor((width - HPAD * 2 - GAP * (COLS - 1)) / COLS);

  const goPremium = () => {
    try {
      navigation.getParent()?.navigate('Settings', {
        screen: 'Premium',
      });
    } catch {
      navigation.navigate('Premium');
    }
  };

const openProgram = async (item: any) => {
  let trial = false;

  if (!isPremium) {
    trial = await ensureTrialAccess();
  }

  const locked = !!item.premium && !isPremium && !trial;

  if (locked) {
    Alert.alert(
      t('premium.lockedTitle', 'Premium required'),
      t(
        'premium.lockedText',
        'This program is available for Premium users only. Upgrade to continue.'
      ),
      [
        { text: t('common.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('premium.cta', 'Upgrade now'),
          onPress: goPremium,
        },
      ]
    );
    return;
  }

  try {
    navigation.navigate('ProgramDetail' as never, { programId: item.id } as never);
  } catch {
    navigation.getParent()?.navigate('Workout', {
      screen: 'ProgramDetail',
      params: { programId: item.id },
    } as never);
  }
};

  const renderItem = ({ item, index }: any) => {
    const isLeft = index % 2 === 0;
    const programTitle = item.title ?? (item.titleKey ? t(item.titleKey) : item.id);

    return (
      <TouchableOpacity
        style={[
          styles.tile,
          { width: tileWidth, marginRight: isLeft ? GAP : 0, marginBottom: 14 },
        ]}
        activeOpacity={0.85}
        onPress={() => openProgram(item)}
      >
        <View style={styles.thumbWrap}>
          <Image source={item.icon} style={styles.thumb} resizeMode="cover" />

          <View style={styles.playBadge}>
            <Text style={styles.playIcon}>▶</Text>
          </View>

          {item.premium ? (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PREMIUM</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.tileTitle} numberOfLines={2}>
          {programTitle}
        </Text>
        <Text style={styles.tileDays}>
          {item.durationDays} {t('workouts.days', 'days')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={PROGRAMS}
        keyExtractor={(x) => x.id}
        numColumns={COLS}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: HPAD, paddingBottom: 24 }}
        ListHeaderComponent={
          <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
            <Text style={styles.h1}>{t('tabs.workout', 'Workout')}</Text>
            <Text style={styles.sub}>
              {t('workouts.pickOne', 'Chọn một giáo án để bắt đầu')}
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 4 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB' },

  header: { alignItems: 'center', marginBottom: 12 },
  h1: { fontSize: 28, fontWeight: '800', color: '#0F172A', letterSpacing: 0.2 },
  sub: { marginTop: 6, color: '#475569', fontSize: 13 },

  tile: { alignItems: 'center' },

  thumbWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  thumb: { width: '100%', height: '100%' },

  playBadge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -18,
    marginLeft: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15,23,42,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },

  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  premiumBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  tileTitle: {
    textAlign: 'center',
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
    paddingHorizontal: 4,
  },
  tileDays: { textAlign: 'center', color: '#64748B', fontSize: 12, marginTop: 2 },
});

export default WorkoutScreen;