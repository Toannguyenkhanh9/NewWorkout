// FILE: src/screens/NutritionScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ORDER = ['how', 'plan', 'foods', 'samples', 'drinks', 'success'] as const;

export const NutritionScreen: React.FC = () => {
  const { t } = useTranslation();
    const navigation = useNavigation<any>();
  const [open, setOpen] = useState<string>('how');
  const insets = useSafeAreaInsets();
  const bullets = (sec: string) =>
    t(`nutrition.sections.${sec}.bullets`, { returnObjects: true }) as string[];

  const toggle = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setOpen(prev => (prev === id ? '' : id));
  };
const openPdf = () => {
    // Nếu muốn dùng URL thay vì bundle: truyền remoteUrl
    // navigation.navigate('PdfViewer', { remoteUrl: 'https://your.cdn/nutrition_guide.pdf' });
    navigation.navigate('PdfViewer');
  };
  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <Text style={s.h1}>{t('tabs.nutrition', 'Nutrition')}</Text>
        <Text style={s.sub}>
          {t('nutrition.subtitle', 'Gợi ý dinh dưỡng cho từng chương trình')}
        </Text>
                <TouchableOpacity style={s.pdfBtn} onPress={openPdf} activeOpacity={0.9}>
          <Text style={s.pdfTxt}>PDF</Text>
        </TouchableOpacity>
      </View>

      {ORDER.map((sec) => (
        <View key={sec} style={s.card}>
          <TouchableOpacity style={s.cardHeader} onPress={() => toggle(sec)} activeOpacity={0.85}>
            <Text style={s.cardTitle}>{t(`nutrition.sections.${sec}.title`)}</Text>
            <Text style={s.chev}>{open === sec ? '▾' : '▸'}</Text>
          </TouchableOpacity>

          {open === sec && (
            <View style={s.cardBody}>
              {bullets(sec).map((line, i) => (
                <View key={i} style={s.row}>
                  <Text style={s.dot}>•</Text>
                  <Text style={s.body}>{line}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB' },
  title: { fontSize: 22, fontWeight: '900', color: '#0F172A' },
  caption: { color: '#64748B', marginTop: 4, marginBottom: 10 },
  card: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 10, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 14 },
  cardTitle: { fontWeight: '900', color: '#0F172A', fontSize: 16 },
  chev: { color: '#64748B', fontSize: 18 },
  cardBody: { paddingHorizontal: 14, paddingBottom: 12 },
  row: { flexDirection: 'row', marginBottom: 6 },
  dot: { width: 18, color: '#0F172A', textAlign: 'center' },
  body: { flex: 1, color: '#334155', lineHeight: 20 },
  header: { alignItems: 'center', marginBottom: 12 },

  pdfBtn: {
    height: 36, paddingHorizontal: 12, borderRadius: 10,
    backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center',
  },
  pdfTxt: { color: '#fff', fontWeight: '900' },
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

export default NutritionScreen;
