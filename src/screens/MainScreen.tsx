// FILE: src/screens/MainScreen.tsx
import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PROGRAMS, WorkoutProgram } from '../data/programs';
import { getActiveIds } from '../store/activePrograms';
import { AdBanner } from '../components/AdBanner';
import { shouldPromptNow } from '../weight/weightStore';
import { WeightPrompt } from '../components/WeightPrompt';
import { ActiveProgramsCard, ActiveItem } from '../components/ActiveProgramsCard';
import { useSubscription } from '../iap/SubscriptionProvider';
import { isTrialActive } from '../ads/trial';
import { ensureTrialAccess } from '../ads/trial';


const BG = require('../../assets/images/backgound.png');
const BMI_KEY = 'user:bmi';
const RECO_KEY = 'user:recommendation';

export const MainScreen: React.FC<any> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { isPremium } = useSubscription?.() || { isPremium: false };

  const [activePrograms, setActivePrograms] = useState<WorkoutProgram[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [showWeight, setShowWeight] = useState(false);

  const [bmi, setBmi] = useState<number | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  

  const computeProgress = useCallback(async (ids: string[]) => {
    const obj: Record<string, number> = {};
    for (const id of ids) {
      const key = `program:${id}:completed`;
      try {
        const json = await AsyncStorage.getItem(key);
        const map = json ? (JSON.parse(json) as Record<string, boolean>) : {};
        obj[id] = Object.values(map).filter(Boolean).length;
      } catch {
        obj[id] = 0;
      }
    }
    setProgress(obj);
  }, []);

  const loadHealthAdvice = useCallback(async () => {
    try {
      const [bmiStr, reco] = await Promise.all([
        AsyncStorage.getItem(BMI_KEY),
        AsyncStorage.getItem(RECO_KEY),
      ]);
      setBmi(bmiStr ? parseFloat(bmiStr) : null);
      setAdvice(reco || null);
    } catch {
      setBmi(null);
      setAdvice(null);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const ids = await getActiveIds();
        const list = PROGRAMS.filter(p => ids.includes(p.id));
        setActivePrograms(list);
        await computeProgress(ids);
        await loadHealthAdvice();

        if (await shouldPromptNow()) setShowWeight(true);
      })();
    }, [computeProgress, loadHealthAdvice]),
  );

  const items: ActiveItem[] = useMemo(
    () =>
      activePrograms.map(p => ({
        id: p.id,
        title: t(p.titleKey) as string,
        daysDone: progress[p.id] ?? 0,
        daysTotal: p.durationDays,
        icon: p.icon,
      })),
    [activePrograms, progress, t],
  );

const goPremium = () => {
  try {
    navigation.getParent()?.navigate('Settings', {
      screen: 'Premium',
    });
  } catch {
    navigation.navigate('Premium');
  }
};

const openProgramById = async (programId: string) => {
  const program = PROGRAMS.find(p => p.id === programId);
  if (!program) return;

  let trial = false;

  if (!isPremium) {
    trial = await ensureTrialAccess();
  }

  const locked = !!program.premium && !isPremium && !trial;

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

  navigation.navigate('ProgramDetail', { programId });
};
  return (
    <ImageBackground source={BG} style={styles.bg}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.headingWrap}>
            <Text style={styles.appName}>Insanity Deluxe Edition</Text>
            <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
          </View>

          {advice ? (
            <View style={styles.adviceCard}>
              <Text style={styles.adviceTitle}>
                {t('home.health_overview')}
              </Text>
              <Text style={styles.adviceBMI}>
                {t('onboard.bmi')}: {bmi ?? '—'}
              </Text>
              <Text style={styles.adviceText}>{advice}</Text>
            </View>
          ) : null}

          <View style={styles.bottomArea}>
            <ActiveProgramsCard
              items={items}
              onOpenProgram={openProgramById}
              title={t('home.activeTitle', 'Đang tập luyện')}
            />

            <View style={{ marginTop: 10 }}>
              <AdBanner />
            </View>

            <Text style={styles.footer}>
              {t('footer.devBy', { name: 'Kevin' })}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <WeightPrompt
        visible={showWeight}
        onClose={() => setShowWeight(false)}
        onSaved={loadHealthAdvice}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingBottom: 12 },

  headingWrap: { alignItems: 'center', marginTop: 8 },
  appName: {
    fontSize: 30,
    fontWeight: '900',
    color: '#01010d',
    letterSpacing: 1.2,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#080a71',
    opacity: 0.95,
    marginTop: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  adviceCard: {
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  adviceTitle: {
    color: '#0F172A',
    fontWeight: '900',
    marginBottom: 4,
    fontSize: 16,
  },
  adviceBMI: { color: '#065F46', fontWeight: '800', marginBottom: 4 },
  adviceText: { color: '#334155', lineHeight: 20 },

  bottomArea: { marginTop: 'auto', paddingTop: 8, paddingBottom: 6 },

  footer: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 12,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default MainScreen;