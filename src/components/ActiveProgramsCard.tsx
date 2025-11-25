// src/components/ActiveProgramsCard.tsx
import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export type ActiveItem = {
  id: string;
  title: string;
  daysDone: number;
  daysTotal: number;
  icon?: any; // ImageSource
};

type Props = {
  items: ActiveItem[];
  onOpenProgram: (id: string) => void;
  title?: string; // i18n key/string
};

export const ActiveProgramsCard: React.FC<Props> = ({
  items,
  onOpenProgram,
  title,
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const total = items.length;

  const summary = useMemo(() => {
    // tổng tiến độ (đơn giản: cộng %)
    if (!total) return '';
    const pct =
      Math.round(
        (items.reduce((s, it) => s + (it.daysDone / Math.max(1, it.daysTotal)), 0) / total) *
          100,
      ) || 0;
    return `${total} • ${pct}%`;
  }, [items, total]);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(v => !v);
    Animated.timing(rotate, {
      toValue: expanded ? 0 : 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={toggle} activeOpacity={0.8}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            {title || t('main.activeNow', 'Đang tập luyện')}
          </Text>
          <Text style={styles.subtitle}>
            {total ? summary : t('main.noActive', 'Chưa có chương trình đang tập')}
          </Text>
        </View>
        <Animated.Text style={[styles.chev, { transform: [{ rotate: spin }] }]}>›</Animated.Text>
      </TouchableOpacity>

      {expanded && total > 0 && (
        <View style={styles.list}>
          {items.map(it => (
            <TouchableOpacity
              key={it.id}
              style={styles.item}
              activeOpacity={0.85}
              onPress={() => onOpenProgram(it.id)}
            >
              {it.icon ? <Image source={it.icon} style={styles.icon} /> : <View style={styles.iconPlaceholder} />}
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle} numberOfLines={1}>{it.title}</Text>
                <Text style={styles.progress}>
                  {it.daysDone}/{it.daysTotal} {t('workout.days', 'days')}
                </Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  subtitle: { marginTop: 4, color: '#64748B', fontSize: 12 },
  chev: { fontSize: 26, color: '#94A3B8', marginLeft: 8 },
  list: { marginTop: 8 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  icon: { width: 42, height: 42, borderRadius: 9, marginRight: 12 },
  iconPlaceholder: {
    width: 42, height: 42, borderRadius: 9, marginRight: 12, backgroundColor: '#E2E8F0',
  },
  itemTitle: { color: '#0F172A', fontWeight: '700', fontSize: 14 },
  progress: { color: '#0EA5E9', marginTop: 2, fontSize: 12, fontWeight: '600' },
  arrow: { color: '#94A3B8', fontSize: 22, marginLeft: 8 },
});
