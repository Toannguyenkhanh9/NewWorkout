// FILE: src/components/GymReadinessModal.tsx
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useTranslation,
} from 'react-i18next';

import {
  getReadinessRecommendation,
  GymReadiness,
  saveGymReadiness,
} from '../services/gymRetention';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

type Props = {
  visible: boolean;
  onClose: () => void;
  onContinue: (
    readiness: GymReadiness,
  ) => void;
};

const ScaleRow: React.FC<{
  title: string;
  value: number;
  onChange: (
    value: number,
  ) => void;
  lowLabel: string;
  highLabel: string;
}> = ({
  title,
  value,
  onChange,
  lowLabel,
  highLabel,
}) => {
  return (
    <View style={styles.scaleBlock}>
      <Text style={styles.scaleTitle}>
        {title}
      </Text>

      <View style={styles.scaleRow}>
        {[1, 2, 3, 4, 5].map(
          item => {
            const active =
              item === value;

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.86}
                style={[
                  styles.scaleButton,
                  active &&
                    styles.scaleButtonActive,
                ]}
                onPress={() =>
                  onChange(item)
                }
              >
                <Text
                  style={[
                    styles.scaleButtonText,
                    active &&
                      styles.scaleButtonTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          },
        )}
      </View>

      <View style={styles.scaleLabels}>
        <Text style={styles.scaleLabel}>
          {lowLabel}
        </Text>

        <Text style={styles.scaleLabel}>
          {highLabel}
        </Text>
      </View>
    </View>
  );
};

export const GymReadinessModal:
React.FC<Props> = ({
  visible,
  onClose,
  onContinue,
}) => {
  const {t} = useTranslation();

  const [
    energy,
    setEnergy,
  ] = useState(3);

  const [
    sleep,
    setSleep,
  ] = useState(3);

  const [
    soreness,
    setSoreness,
  ] = useState(2);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setEnergy(3);
    setSleep(3);
    setSoreness(2);
  }, [visible]);

  const readiness = useMemo(
    () =>
      getReadinessRecommendation({
        energy,
        sleep,
        soreness,
      }),
    [
      energy,
      sleep,
      soreness,
    ],
  );

  const continueWorkout =
    async () => {
      await saveGymReadiness(
        readiness,
      );

      onContinue(readiness);
    };

  const levelColor =
    readiness.level ===
    'normal'
      ? NEON
      : readiness.level ===
          'light'
        ? '#FACC15'
        : '#FB7185';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.kicker}>
            <Text style={styles.kickerText}>
              {t(
                'retention.readinessKicker',
                'DAILY CHECK-IN',
              )}
            </Text>
          </View>

          <Text style={styles.title}>
            {t(
              'retention.readinessTitle',
              'How are you feeling today?',
            )}
          </Text>

          <Text style={styles.subtitle}>
            {t(
              'retention.readinessSubtitle',
              'GymForge will adjust today’s recommendation based on your condition.',
            )}
          </Text>

          <ScaleRow
            title={t(
              'retention.energy',
              'Energy',
            )}
            value={energy}
            onChange={setEnergy}
            lowLabel={t(
              'retention.low',
              'Low',
            )}
            highLabel={t(
              'retention.high',
              'High',
            )}
          />

          <ScaleRow
            title={t(
              'retention.sleep',
              'Sleep quality',
            )}
            value={sleep}
            onChange={setSleep}
            lowLabel={t(
              'retention.poor',
              'Poor',
            )}
            highLabel={t(
              'retention.great',
              'Great',
            )}
          />

          <ScaleRow
            title={t(
              'retention.soreness',
              'Muscle soreness',
            )}
            value={soreness}
            onChange={setSoreness}
            lowLabel={t(
              'retention.none',
              'None',
            )}
            highLabel={t(
              'retention.verySore',
              'Very sore',
            )}
          />

          <View
            style={[
              styles.recommendation,
              {
                borderColor:
                  levelColor,
              },
            ]}
          >
            <Text
              style={[
                styles.recommendationTitle,
                {
                  color:
                    levelColor,
                },
              ]}
            >
              {t(
                `retention.readinessLevel.${readiness.level}`,
                readiness.level,
              )}
            </Text>

            <Text
              style={
                styles.recommendationText
              }
            >
              {t(
                readiness.messageKey,
                'Follow today’s adjusted recommendation.',
              )}
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>
                {t(
                  'common.cancel',
                  'Cancel',
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.continueButton}
              onPress={continueWorkout}
            >
              <Text style={styles.continueText}>
                {t(
                  'retention.continueWorkout',
                  'Continue',
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(2, 6, 23, 0.84)',
    justifyContent: 'center',
    padding: 18,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 26,
    borderWidth: 1,
    borderColor:
      'rgba(124, 255, 58, 0.28)',
    padding: 17,
  },
  kicker: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor:
      'rgba(25, 230, 210, 0.12)',
    borderWidth: 1,
    borderColor:
      'rgba(25, 230, 210, 0.42)',
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  kickerText: {
    color: CYAN,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: TEXT,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
    marginTop: 13,
  },
  subtitle: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
    marginBottom: 4,
  },
  scaleBlock: {
    marginTop: 14,
  },
  scaleTitle: {
    color: TEXT,
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 8,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
  },
  scaleButton: {
    width: 45,
    height: 42,
    borderRadius: 14,
    backgroundColor: BG,
    borderWidth: 1,
    borderColor:
      'rgba(148, 163, 184, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleButtonActive: {
    backgroundColor: NEON,
    borderColor: NEON,
  },
  scaleButtonText: {
    color: MUTED,
    fontSize: 15,
    fontWeight: '900',
  },
  scaleButtonTextActive: {
    color: BG,
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginTop: 5,
  },
  scaleLabel: {
    color: MUTED,
    fontSize: 10,
    fontWeight: '700',
  },
  recommendation: {
    backgroundColor:
      'rgba(6, 17, 29, 0.86)',
    borderRadius: 17,
    borderWidth: 1,
    padding: 12,
    marginTop: 16,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  recommendationText: {
    color: '#E2E8F0',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor:
      'rgba(148, 163, 184, 0.28)',
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelText: {
    color: MUTED,
    fontSize: 14,
    fontWeight: '900',
  },
  continueButton: {
    flex: 1,
    borderRadius: 999,
    backgroundColor: NEON,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  continueText: {
    color: BG,
    fontSize: 14,
    fontWeight: '900',
  },
});

export default GymReadinessModal;
