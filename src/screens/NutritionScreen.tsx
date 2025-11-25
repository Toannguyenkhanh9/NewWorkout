// src/screens/NutritionScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const NutritionScreen: React.FC = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
    >
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.h1}>{t('tabs.nutrition', 'Nutrition')}</Text>
        <Text style={styles.sub}>
          {t('nutrition.subtitle', 'Gợi ý dinh dưỡng cho từng chương trình')}
        </Text>
      </View>

      {/* Nội dung tạm thời, sau thay bằng data thật */}
      <Text style={styles.text}>{t('nutrition.content')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB' },
  header: { alignItems: 'center', marginBottom: 12 },
  h1: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  sub: { marginTop: 6, color: '#475569', fontSize: 13 },
  text: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    marginTop: 8,
  },
});
