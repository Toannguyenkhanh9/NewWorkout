// FILE: src/screens/UserProfileScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

type Gender = 'male' | 'female' | 'other';

type UserProfile = {
  name: string;
  age?: number;
  gender?: Gender;
  heightCm?: number;   // cm
  weightKg?: number;   // kg
  healthNote?: string; // general health notes
  injured?: boolean;
  injuryNote?: string;
};

const STORAGE_KEY = 'user:profile';
const RECO_KEY = 'user:recommendation';

// ===== Inline English resource (keys without quotes) =====
const enUserProfile = {
  UserProfile: {
    title: 'User Profile',
    subtitle: 'Enter your info to get personalized workout recommendations',

    name_label: 'Full name *',
    name_ph: 'e.g., John Doe',

    age_label: 'Age',
    age_ph: 'e.g., 28',

    gender_label: 'Gender',
    gender_male: 'Male',
    gender_female: 'Female',
    gender_other: 'Other',

    height_label: 'Height (cm)',
    height_ph: 'e.g., 170',

    weight_label: 'Weight (kg)',
    weight_ph: 'e.g., 65',

    bmi: 'BMI',
    bmi_label_under: 'Underweight',
    bmi_label_normal: 'Normal',
    bmi_label_over: 'Overweight',
    bmi_label_obese: 'Obese',

    health_label: 'Health status',
    health_ph: 'e.g., Blood pressure stable, sleeping well, just returning to training…',

    injured_q: 'Any injuries?',
    injury_label: 'Injury details',
    injury_ph: 'e.g., Left knee pain, avoid deep squats; shoulder pain when pressing…',

    hint_fill_hw: 'Enter height & weight to get suggestions.',
    rec_injured: 'Recommendation: prioritize light CORE/Upper sessions with more Rest days.',
    rec_overweight: 'Recommendation: Fat-loss plan (light → moderate HIIT) alternating with Lower/Core.',
    rec_general: 'Recommendation: Full-body plan (foundational strength + Core).',

    loading: 'Loading…',
    save_success_title: 'Saved',
    save_error_title: 'Error',
    save_error_msg: "Couldn't save your data. Please try again.",

    btn_delete: 'Delete',
    btn_save: 'Save',
  },
};

// Merge English bundle (idempotent, deep merge)
try {
  i18n.addResourceBundle('en', 'translation', enUserProfile, true, true);
} catch { /* no-op */ }

export const UserProfileScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: undefined,
    gender: undefined,
    heightCm: undefined,
    weightKg: undefined,
    healthNote: '',
    injured: false,
    injuryNote: '',
  });
  const [loading, setLoading] = useState(true);

  // Load saved profile
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setProfile(JSON.parse(json));
      } catch {}
      setLoading(false);
    })();
  }, []);

  const setField = <K extends keyof UserProfile>(k: K, v: UserProfile[K]) =>
    setProfile((p) => ({ ...p, [k]: v }));

  // BMI & label
  const bmi = useMemo(() => {
    if (!profile.heightCm || !profile.weightKg) return undefined;
    const h = profile.heightCm / 100;
    if (h <= 0) return undefined;
    return +(profile.weightKg / (h * h)).toFixed(1);
  }, [profile.heightCm, profile.weightKg]);

  const bmiLabel = useMemo(() => {
    if (bmi === undefined) return '';
    if (bmi < 18.5) return t('UserProfile.bmi_label_under');
    if (bmi < 25) return t('UserProfile.bmi_label_normal');
    if (bmi < 30) return t('UserProfile.bmi_label_over');
    return t('UserProfile.bmi_label_obese');
  }, [bmi, t]);

  // Recommendation logic
  const recommendation = useMemo(() => {
    if (profile.injured) {
      return t('UserProfile.rec_injured');
    }
    if (bmi === undefined) return t('UserProfile.hint_fill_hw');
    if (bmi >= 25) return t('UserProfile.rec_overweight');
    return t('UserProfile.rec_general');
  }, [bmi, profile.injured, t]);

  const valid = useMemo(() => profile.name.trim().length >= 2, [profile.name]);

  const save = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      await AsyncStorage.setItem(RECO_KEY, recommendation);
      Alert.alert(t('UserProfile.save_success_title'), recommendation);
      navigation.goBack?.();
    } catch (e) {
      Alert.alert(t('UserProfile.save_error_title'), t('UserProfile.save_error_msg'));
    }
  };

  const clear = async () => {
    setProfile({
      name: '',
      age: undefined,
      gender: undefined,
      heightCm: undefined,
      weightKg: undefined,
      healthNote: '',
      injured: false,
      injuryNote: '',
    });
    await AsyncStorage.multiRemove([STORAGE_KEY, RECO_KEY]);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#64748B' }}>{t('UserProfile.loading')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>{t('UserProfile.title')}</Text>
          <Text style={styles.caption}>{t('UserProfile.subtitle')}</Text>

          {/* Name */}
          <Label>{t('UserProfile.name_label')}</Label>
          <Input
            placeholder={t('UserProfile.name_ph')}
            value={profile.name}
            onChangeText={(v) => setField('name', v)}
            returnKeyType="next"
          />

          {/* Age + Gender */}
          <Row>
            <Col>
              <Label>{t('UserProfile.age_label')}</Label>
              <Input
                placeholder={t('UserProfile.age_ph')}
                keyboardType="number-pad"
                value={profile.age?.toString() ?? ''}
                onChangeText={(v) => setField('age', v ? parseInt(v, 10) || undefined : undefined)}
              />
            </Col>
            <Col>
              <Label>{t('UserProfile.gender_label')}</Label>
              <Segment
                value={profile.gender}
                options={[
                  { key: 'male', label: t('UserProfile.gender_male') },
                  { key: 'female', label: t('UserProfile.gender_female') },
                  { key: 'other', label: t('UserProfile.gender_other') },
                ]}
                onChange={(g) => setField('gender', g as Gender)}
              />
            </Col>
          </Row>

          {/* Height + Weight */}
          <Row>
            <Col>
              <Label>{t('UserProfile.height_label')}</Label>
              <Input
                placeholder={t('UserProfile.height_ph')}
                keyboardType="number-pad"
                value={profile.heightCm?.toString() ?? ''}
                onChangeText={(v) => setField('heightCm', v ? parseFloat(v) || undefined : undefined)}
              />
            </Col>
            <Col>
              <Label>{t('UserProfile.weight_label')}</Label>
              <Input
                placeholder={t('UserProfile.weight_ph')}
                keyboardType="decimal-pad"
                value={profile.weightKg?.toString() ?? ''}
                onChangeText={(v) => setField('weightKg', v ? parseFloat(v) || undefined : undefined)}
              />
            </Col>
          </Row>

          {/* BMI */}
          <InfoBox>
            <Text style={styles.infoText}>
              {t('UserProfile.bmi')}: {bmi ?? '—'} {bmi ? `(${bmiLabel})` : ''}
            </Text>
          </InfoBox>

          {/* Health status */}
          <Label>{t('UserProfile.health_label')}</Label>
          <Input
            placeholder={t('UserProfile.health_ph')}
            value={profile.healthNote}
            onChangeText={(v) => setField('healthNote', v)}
            multiline
            style={{ height: 80, textAlignVertical: 'top' }}
          />

          {/* Injury */}
          <Row style={{ alignItems: 'center', marginTop: 8 }}>
            <Text style={[styles.label, { marginBottom: 0 }]}>{t('UserProfile.injured_q')}</Text>
            <Switch
              value={!!profile.injured}
              onValueChange={(v) => setField('injured', v)}
              trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
              thumbColor={profile.injured ? '#10B981' : '#E5E7EB'}
              style={{ marginLeft: 8 }}
            />
          </Row>

          {profile.injured && (
            <>
              <Label>{t('UserProfile.injury_label')}</Label>
              <Input
                placeholder={t('UserProfile.injury_ph')}
                value={profile.injuryNote}
                onChangeText={(v) => setField('injuryNote', v)}
                multiline
                style={{ height: 80, textAlignVertical: 'top' }}
              />
            </>
          )}

          {/* Recommendation */}
          <InfoBox>
            <Text style={styles.infoText}>{recommendation}</Text>
          </InfoBox>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={clear}>
              <Text style={[styles.btnText, { color: '#334155' }]}>{t('UserProfile.btn_delete')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, valid ? styles.btnPrimary : styles.btnDisabled]}
              onPress={save}
              disabled={!valid}
            >
              <Text style={[styles.btnText, { color: valid ? '#fff' : '#94A3B8' }]}>{t('UserProfile.btn_save')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/* ---------- UI helpers ---------- */
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.label}>{children}</Text>
);

const Input: React.FC<React.ComponentProps<typeof TextInput>> = (props) => (
  <TextInput {...props} placeholderTextColor="#9CA3AF" style={[styles.input, props.style]} />
);

const Row: React.FC<{ children: React.ReactNode; style?: any }> = ({ children, style }) => (
  <View style={[styles.row, style]}>{children}</View>
);
const Col: React.FC<{ children: React.ReactNode }> = ({ children }) => <View style={styles.col}>{children}</View>;

const Segment: React.FC<{
  value?: string;
  options: { key: string; label: string }[];
  onChange: (v: string) => void;
}> = ({ value, options, onChange }) => (
  <View style={styles.segmentWrap}>
    {options.map((o) => {
      const active = value === o.key;
      return (
        <TouchableOpacity key={o.key} onPress={() => onChange(o.key)} style={[styles.segmentItem, active && styles.segmentActive]}>
          <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{o.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const InfoBox: React.FC<{ children: React.ReactNode }> = ({ children }) => <View style={styles.infoBox}>{children}</View>;

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F7FB' },
  container: { padding: 16, paddingBottom: 24 },
  title: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  caption: { fontSize: 12, color: '#64748B', marginTop: 4, marginBottom: 12 },

  label: { color: '#334155', fontWeight: '700', marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#0F172A',
    fontSize: 14,
  },

  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },

  segmentWrap: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  segmentItem: { flex: 1, borderRadius: 10, paddingVertical: 8, alignItems: 'center' },
  segmentActive: { backgroundColor: '#10B981' },
  segmentText: { color: '#334155', fontWeight: '700' },
  segmentTextActive: { color: '#fff' },

  infoBox: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
  },
  infoText: { color: '#0F172A' },

  actions: { flexDirection: 'row', gap: 12, marginTop: 16 },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  btnPrimary: { backgroundColor: '#10B981', borderColor: '#10B981' },
  btnDisabled: { backgroundColor: '#F1F5F9', borderColor: '#E5E7EB' },
  btnGhost: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  btnText: { fontWeight: '800', fontSize: 14 },
});

export default UserProfileScreen;
