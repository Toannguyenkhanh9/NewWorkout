// src/screens/WorkoutScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { PROGRAMS } from '../data/programs';

export const WorkoutScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const { width } = Dimensions.get('window');
  const COLS = 2;
  const HPAD = 16;
  const GAP = 12;
  const tileWidth = Math.floor((width - HPAD * 2 - GAP * (COLS - 1)) / COLS);

const renderItem = ({ item, index }: any) => {
  const isLeft = index % 2 === 0;

  // ✅ Lấy tiêu đề từ title hoặc titleKey
  const programTitle =
    item.title ?? (item.titleKey ? t(item.titleKey) : item.id);

  return (
    <TouchableOpacity
      style={[
        styles.tile,
        { width: tileWidth, marginRight: isLeft ? GAP : 0, marginBottom: 14 },
      ]}
      activeOpacity={0.85}
onPress={() => {
  // thử điều hướng trong stack hiện tại
  try {
    navigation.navigate('ProgramDetail' as never, { programId: item.id } as never);
  } catch {
    // fallback: điều hướng qua parent Tab tới stack Workout rồi vào ProgramDetail
    navigation.getParent()?.navigate('Workout', {
      screen: 'ProgramDetail',
      params: { programId: item.id },
    } as never);
  }
}}
    >
      <View style={styles.thumbWrap}>
        <Image source={item.icon} style={styles.thumb} resizeMode="cover" />
        <View style={styles.playBadge}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      </View>

      {/* ✅ Dùng programTitle thay vì item.title */}
      <Text style={styles.tileTitle} numberOfLines={2}>
        {programTitle}
      </Text>
      <Text style={styles.tileDays}>
        {item.durationDays} {t('workout.days', 'days')}
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
              {t('workout.pickOne', 'Chọn một giáo án để bắt đầu')}
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

  // VUÔNG: aspectRatio = 1
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

  // Tên bài tập: to + đậm + canh giữa
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
