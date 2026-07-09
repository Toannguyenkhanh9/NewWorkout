// FILE: src/components/ActiveProgramsCard.tsx
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
  icon?: any;
};

type Props = {
  items: ActiveItem[];
  onOpenProgram: (id: string) => void;
  title?: string;
};

const NEON = '#7CFF3A';
const CYAN = '#19E6D2';
const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';

export const ActiveProgramsCard: React.FC<Props> = ({
  items,
  onOpenProgram,
  title,
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const total = items.length;

  const summary = useMemo(() => {
    if (!total) return '';

    const pct =
      Math.round(
        (items.reduce(
          (s, it) => s + it.daysDone / Math.max(1, it.daysTotal),
          0,
        ) /
          total) *
          100,
      ) || 0;

    return `${total} • ${pct}%`;
  }, [items, total]);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpanded((prev) => {
      const next = !prev;

      Animated.timing(rotate, {
        toValue: next ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }).start();

      return next;
    });
  };

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.card}>
      <View style={styles.glow} />

      <TouchableOpacity
        style={styles.header}
        onPress={toggle}
        activeOpacity={0.82}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>🏋️</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>ACTIVE</Text>

          <Text style={styles.title}>
            {title || t('main.activeNow', 'Đang tập luyện')}
          </Text>

          <Text style={styles.subtitle}>
            {total
              ? summary
              : t('home.noActive', 'Chưa có chương trình đang tập')}
          </Text>
        </View>

        <Animated.Text style={[styles.chev, { transform: [{ rotate: spin }] }]}>
          ›
        </Animated.Text>
      </TouchableOpacity>

      {expanded && total > 0 ? (
        <View style={styles.list}>
          {items.map((it) => {
            const percent = Math.min(
              100,
              Math.round((it.daysDone / Math.max(1, it.daysTotal)) * 100),
            );

            return (
              <TouchableOpacity
                key={it.id}
                style={styles.item}
                activeOpacity={0.85}
                onPress={() => onOpenProgram(it.id)}
              >
                {it.icon ? (
                  <Image source={it.icon} style={styles.icon} />
                ) : (
                  <View style={styles.iconPlaceholder}>
                    <Text style={styles.iconPlaceholderText}>▶</Text>
                  </View>
                )}

                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {it.title}
                  </Text>

                  <Text style={styles.progress}>
                    {it.daysDone}/{it.daysTotal} {t('workout.days', 'days')}
                  </Text>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${percent}%`,
                        },
                      ]}
                    />
                  </View>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 14,
    shadowColor: '#00FFD1',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(25, 230, 210, 0.11)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(124, 255, 58, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 22,
  },
  kicker: {
    color: CYAN,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
    marginBottom: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: TEXT,
  },
  subtitle: {
    marginTop: 4,
    color: MUTED,
    fontSize: 12,
    fontWeight: '700',
  },
  chev: {
    fontSize: 28,
    color: NEON,
    marginLeft: 8,
    fontWeight: '300',
  },
  list: {
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_2,
    borderRadius: 18,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
  },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: '#020617',
  },
  iconPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPlaceholderText: {
    color: NEON,
    fontSize: 16,
    fontWeight: '900',
  },
  itemTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 14,
  },
  progress: {
    color: MUTED,
    marginTop: 3,
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    height: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(148, 163, 184, 0.18)',
    overflow: 'hidden',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: NEON,
  },
  arrow: {
    color: NEON,
    fontSize: 24,
    marginLeft: 8,
  },
});

export default ActiveProgramsCard;