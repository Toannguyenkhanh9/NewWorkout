// FILE: src/screens/WeightChartScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { loadHistory } from '../weight/weightStore';
import { useTranslation } from 'react-i18next';

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

export const WeightChartScreen: React.FC = () => {
  const { t } = useTranslation();

  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const hist = await loadHistory();

      setLabels(hist.map((h) => h.dateISO.slice(5)));
      setData(hist.map((h) => h.kg));
    })();
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 36;

  const latestWeight = data.length > 0 ? data[data.length - 1] : null;
  const firstWeight = data.length > 0 ? data[0] : null;

  const diff = useMemo(() => {
    if (latestWeight === null || firstWeight === null) return null;
    return +(latestWeight - firstWeight).toFixed(1);
  }, [latestWeight, firstWeight]);

  const minWeight = useMemo(() => {
    if (!data.length) return null;
    return Math.min(...data);
  }, [data]);

  const maxWeight = useMemo(() => {
    if (!data.length) return null;
    return Math.max(...data);
  }, [data]);

  return (
    <View style={st.screen}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <View pointerEvents="none" style={st.glowTop} />
      <View pointerEvents="none" style={st.glowBottom} />

      <ScrollView
        style={st.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={st.content}
      >
        <View style={st.hero}>
          <View style={st.kickerPill}>
            <Text style={st.kickerText}>WEIGHT TRACKING</Text>
          </View>

          <Text style={st.title}>
            {t('weight.chart_title', 'Weight Tracking')}
          </Text>

          <Text style={st.subtitle}>
            {t(
              'weight.chart_subtitle',
              'Theo dõi cân nặng, xu hướng thay đổi và tiến độ cơ thể của bạn theo thời gian.',
            )}
          </Text>
        </View>

        {data.length === 0 ? (
          <View style={st.emptyCard}>
            <View style={st.emptyIcon}>
              <Text style={st.emptyIconText}>⚖️</Text>
            </View>

            <Text style={st.emptyTitle}>
              {t('weight.chart_empty_title', 'Chưa có dữ liệu cân nặng')}
            </Text>

            <Text style={st.emptyText}>
              {t(
                'weight.chart_empty',
                'Sau khi bạn nhập cân nặng, biểu đồ tiến độ sẽ hiển thị tại đây.',
              )}
            </Text>
          </View>
        ) : (
          <>
            <View style={st.statGrid}>
              <View style={st.statBox}>
                <Text style={st.statIcon}>⚖️</Text>
                <Text style={st.statValue}>
                  {latestWeight ?? '—'}
                  <Text style={st.statUnit}> kg</Text>
                </Text>
                <Text style={st.statLabel}>
                  {t('weight.latest', 'Latest')}
                </Text>
              </View>

              <View style={st.statBox}>
                <Text style={st.statIcon}>
                  {diff !== null && diff <= 0 ? '📉' : '📈'}
                </Text>
                <Text
                  style={[
                    st.statValue,
                    diff !== null && diff <= 0 ? st.goodValue : st.warnValue,
                  ]}
                >
                  {diff !== null && diff > 0 ? '+' : ''}
                  {diff ?? '—'}
                  <Text style={st.statUnit}> kg</Text>
                </Text>
                <Text style={st.statLabel}>
                  {t('weight.change', 'Change')}
                </Text>
              </View>
            </View>

            <View style={st.card}>
              <View style={st.cardHeader}>
                <View>
                  <Text style={st.cardTitle}>
                    {t('weight.progress', 'Progress chart')}
                  </Text>

                  <Text style={st.cardSub}>
                    {labels.length} {t('weight.records', 'records')}
                  </Text>
                </View>

                <View style={st.liveBadge}>
                  <Text style={st.liveBadgeText}>LIVE</Text>
                </View>
              </View>

              <LineChart
                data={{
                  labels,
                  datasets: [
                    {
                      data,
                      strokeWidth: 3,
                    },
                  ],
                }}
                width={chartWidth}
                height={250}
                yAxisSuffix=" kg"
                withInnerLines
                withOuterLines={false}
                withShadow={false}
                bezier
                chartConfig={{
                  backgroundColor: BG,
                  backgroundGradientFrom: '#0B1624',
                  backgroundGradientTo: '#101C2B',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(124, 255, 58, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(203, 213, 225, ${opacity})`,
                  propsForDots: {
                    r: '4',
                    strokeWidth: '2',
                    stroke: NEON,
                    fill: BG,
                  },
                  propsForBackgroundLines: {
                    stroke: 'rgba(148, 163, 184, 0.15)',
                    strokeDasharray: '4 6',
                  },
                }}
                style={st.chart}
              />
            </View>

            <View style={st.summaryCard}>
              <Text style={st.summaryTitle}>
                {t('weight.summary', 'Summary')}
              </Text>

              <View style={st.summaryRow}>
                <View style={st.summaryItem}>
                  <Text style={st.summaryLabel}>
                    {t('weight.min', 'Lowest')}
                  </Text>
                  <Text style={st.summaryValue}>
                    {minWeight ?? '—'} kg
                  </Text>
                </View>

                <View style={st.divider} />

                <View style={st.summaryItem}>
                  <Text style={st.summaryLabel}>
                    {t('weight.max', 'Highest')}
                  </Text>
                  <Text style={st.summaryValue}>
                    {maxWeight ?? '—'} kg
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const st = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 160,
  },

  glowTop: {
    position: 'absolute',
    top: -90,
    right: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(25, 230, 210, 0.22)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: 60,
    left: -110,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
  },

  hero: {
    marginBottom: 18,
  },
  kickerPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.75)',
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    marginBottom: 14,
  },
  kickerText: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  title: {
    color: TEXT,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  subtitle: {
    color: '#D8E4F0',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },

  statGrid: {
    flexDirection: 'row',
    marginHorizontal: -5,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 8,
  },
  statValue: {
    color: TEXT,
    fontSize: 25,
    fontWeight: '900',
  },
  statUnit: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '800',
  },
  statLabel: {
    color: MUTED,
    marginTop: 5,
    fontSize: 12,
    fontWeight: '800',
  },
  goodValue: {
    color: NEON,
  },
  warnValue: {
    color: '#F59E0B',
  },

  card: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    overflow: 'hidden',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 18,
  },
  cardSub: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '700',
  },
  liveBadge: {
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  liveBadgeText: {
    color: NEON,
    fontSize: 11,
    fontWeight: '900',
  },
  chart: {
    borderRadius: 18,
    marginLeft: -6,
  },

  summaryCard: {
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
  },
  summaryTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: CARD_2,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
    padding: 13,
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '800',
  },
  summaryValue: {
    color: TEXT,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 5,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.18)',
    marginHorizontal: 14,
  },

  emptyCard: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyIconText: {
    fontSize: 30,
  },
  emptyTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
  },
  emptyText: {
    color: MUTED,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },
});

export default WeightChartScreen;