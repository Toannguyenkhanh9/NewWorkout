// FILE: src/screens/GymBodyProgressScreen.tsx
import React, {
  useCallback,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  launchCamera,
  launchImageLibrary,
  type CameraOptions,
  type ImageLibraryOptions,
} from 'react-native-image-picker';

import {
  addBodyMeasurement,
  addProgressPhoto,
  BodyMeasurementEntry,
  loadBodyMeasurements,
  loadProgressPhotos,
  ProgressPhotoEntry,
} from '../services/gymAdvanced';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const formatDate = (time: number) => {
  const d = new Date(time);

  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const GymBodyProgressScreen: React.FC = () => {
  const { t } = useTranslation();

  const [measurements, setMeasurements] = useState<BodyMeasurementEntry[]>([]);
  const [photos, setPhotos] = useState<ProgressPhotoEntry[]>([]);

  const [weightKg, setWeightKg] = useState('');
  const [chestCm, setChestCm] = useState('');
  const [waistCm, setWaistCm] = useState('');
  const [hipsCm, setHipsCm] = useState('');
  const [thighCm, setThighCm] = useState('');
  const [armCm, setArmCm] = useState('');
  const [note, setNote] = useState('');

  const reload = useCallback(async () => {
    const [nextMeasurements, nextPhotos] = await Promise.all([
      loadBodyMeasurements(),
      loadProgressPhotos(),
    ]);

    setMeasurements(nextMeasurements);
    setPhotos(nextPhotos);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const saveMeasurement = async () => {
    if (
      !weightKg &&
      !chestCm &&
      !waistCm &&
      !hipsCm &&
      !thighCm &&
      !armCm
    ) {
      Alert.alert(
        t('premium.errorTitle', 'Error'),
        t('gym.enterMeasurement', 'Enter at least one measurement.'),
      );
      return;
    }

    const next = await addBodyMeasurement({
      weightKg,
      chestCm,
      waistCm,
      hipsCm,
      thighCm,
      armCm,
      note,
    });

    setMeasurements(next);

    setWeightKg('');
    setChestCm('');
    setWaistCm('');
    setHipsCm('');
    setThighCm('');
    setArmCm('');
    setNote('');
  };

const savePhoto = async (
  source: 'camera' | 'library',
) => {
  const cameraOptions: CameraOptions = {
    mediaType: 'photo',
    quality: 0.8,
  };

  const libraryOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.8,
    selectionLimit: 1,
  };

  const result =
    source === 'camera'
      ? await launchCamera(cameraOptions)
      : await launchImageLibrary(libraryOptions);

  const uri = result.assets?.[0]?.uri;

  if (!uri) return;

  const next = await addProgressPhoto({
    uri,
    pose: 'front',
  });

  setPhotos(next);
};

  const latest = measurements[0];
  const first = measurements[measurements.length - 1];

  const waistChange =
    latest?.waistCm && first?.waistCm
      ? Number(latest.waistCm) - Number(first.waistCm)
      : null;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.kickerPill}>
          <Text style={styles.kickerText}>
            {t('gym.bodyProgressKicker', 'BODY PROGRESS')}
          </Text>
        </View>

        <Text style={styles.title}>
          {t('gym.bodyProgress', 'Body progress')}
        </Text>

        <Text style={styles.subtitle}>
          {t(
            'gym.bodyProgressSubtitle',
            'Track body measurements and progress photos across your training plan.',
          )}
        </Text>

        {waistChange !== null ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>
              {t('gym.waistChange', 'Waist change')}
            </Text>

            <Text style={styles.summaryValue}>
              {waistChange > 0 ? '+' : ''}
              {waistChange} cm
            </Text>
          </View>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t('gym.addMeasurement', 'Add measurement')}
          </Text>

          <View style={styles.inputRow}>
            <Input label={t('gym.measurements.weightKg', { defaultValue: 'Weight kg' })} value={weightKg} onChangeText={setWeightKg} />
            <Input label={t('gym.measurements.chestCm', { defaultValue: 'Chest cm' })} value={chestCm} onChangeText={setChestCm} />
          </View>

          <View style={styles.inputRow}>
            <Input label={t('gym.measurements.waistCm', { defaultValue: 'Waist cm' })} value={waistCm} onChangeText={setWaistCm} />
            <Input label={t('gym.measurements.hipsCm', { defaultValue: 'Hips cm' })} value={hipsCm} onChangeText={setHipsCm} />
          </View>

          <View style={styles.inputRow}>
            <Input label={t('gym.measurements.thighCm', { defaultValue: 'Thigh cm' })} value={thighCm} onChangeText={setThighCm} />
            <Input label={t('gym.measurements.armCm', { defaultValue: 'Arm cm' })} value={armCm} onChangeText={setArmCm} />
          </View>

          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder={t('gym.note', 'Note')}
            placeholderTextColor="#64748B"
            style={styles.noteInput}
          />

          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.primaryButton}
            onPress={saveMeasurement}
          >
            <Text style={styles.primaryButtonText}>
              {t('common.save', 'Save')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t('gym.progressPhotos', 'Progress photos')}
          </Text>

          <View style={styles.photoActions}>
            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.photoButton}
              onPress={() => savePhoto('camera')}
            >
              <Text style={styles.photoButtonText}>
                {t('gym.takePhoto', 'Take photo')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.photoButton}
              onPress={() => savePhoto('library')}
            >
              <Text style={styles.photoButtonText}>
                {t('gym.choosePhoto', 'Choose photo')}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.photoList}
          >
            {photos.map(item => (
              <View key={item.id} style={styles.photoCard}>
                <Image source={{ uri: item.uri }} style={styles.photo} />

                <Text style={styles.photoDate}>
                  {formatDate(item.createdAt)}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t('gym.measurementHistory', 'Measurement history')}
          </Text>

          {measurements.map(item => (
            <View key={item.id} style={styles.historyItem}>
              <Text style={styles.historyDate}>
                {formatDate(item.createdAt)}
              </Text>

              <Text style={styles.historyText}>
                {[
                  item.weightKg ? `${item.weightKg}kg` : '',
                  item.waistCm ? `Waist ${item.waistCm}cm` : '',
                  item.chestCm ? `Chest ${item.chestCm}cm` : '',
                  item.hipsCm ? `Hips ${item.hipsCm}cm` : '',
                ]
                  .filter(Boolean)
                  .join(' • ')}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

type InputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.inputBlock}>
      <Text style={styles.inputLabel}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder="0"
        placeholderTextColor="#64748B"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 18,
    paddingBottom: 170,
  },
  kickerPill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(25, 230, 210, 0.7)',
    backgroundColor: 'rgba(25, 230, 210, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 14,
  },
  kickerText: {
    color: CYAN,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: TEXT,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  subtitle: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: 'rgba(124, 255, 58, 0.12)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.35)',
    padding: 14,
    marginBottom: 14,
  },
  summaryTitle: {
    color: NEON,
    fontSize: 13,
    fontWeight: '900',
  },
  summaryValue: {
    color: TEXT,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 4,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 14,
    marginBottom: 14,
  },
  cardTitle: {
    color: TEXT,
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
  },
  inputBlock: {
    flex: 1,
    marginRight: 8,
    marginBottom: 10,
  },
  inputLabel: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#06111D',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    borderRadius: 14,
    color: TEXT,
    minHeight: 46,
    paddingHorizontal: 12,
    fontWeight: '900',
  },
  noteInput: {
    backgroundColor: '#06111D',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    borderRadius: 14,
    color: TEXT,
    minHeight: 46,
    paddingHorizontal: 12,
    fontWeight: '900',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: NEON,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: BG,
    fontSize: 15,
    fontWeight: '900',
  },
  photoActions: {
    flexDirection: 'row',
  },
  photoButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.4)',
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  photoButtonText: {
    color: NEON,
    fontSize: 13,
    fontWeight: '900',
  },
  photoList: {
    marginTop: 14,
  },
  photoCard: {
    width: 130,
    marginRight: 10,
  },
  photo: {
    width: 130,
    height: 170,
    borderRadius: 16,
    backgroundColor: '#06111D',
  },
  photoDate: {
    color: MUTED,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: '#06111D',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  historyDate: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
  },
  historyText: {
    color: TEXT,
    fontSize: 13,
    marginTop: 4,
  },
});

export default GymBodyProgressScreen;