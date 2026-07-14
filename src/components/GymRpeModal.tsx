// FILE: src/components/GymRpeModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const BG = '#06111D';
const CARD = '#0B1624';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

const RPE_OPTIONS = [
  {
    value: 6,
    label: 'Easy',
    desc: 'Could do 4+ more reps',
  },
  {
    value: 7,
    label: 'Good',
    desc: 'Could do 3 more reps',
  },
  {
    value: 8,
    label: 'Hard',
    desc: 'Could do 2 more reps',
  },
  {
    value: 9,
    label: 'Very hard',
    desc: 'Could do 1 more rep',
  },
  {
    value: 10,
    label: 'Max',
    desc: 'No reps left',
  },
];

type Props = {
  visible: boolean;
  title: string;
  subtitle?: string;
  onSelect: (rpe: number) => void;
  onClose?: () => void;
};

export const GymRpeModal: React.FC<Props> = ({
  visible,
  title,
  subtitle,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.kicker}>RPE</Text>

          <Text style={styles.title}>
            {title}
          </Text>

          {subtitle ? (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}

          {RPE_OPTIONS.map(item => (
            <TouchableOpacity
              key={item.value}
              activeOpacity={0.86}
              style={styles.option}
              onPress={() => onSelect(item.value)}
            >
              <View style={styles.rpeCircle}>
                <Text style={styles.rpeNumber}>
                  {item.value}
                </Text>
              </View>

              <View style={styles.optionBody}>
                <Text style={styles.optionTitle}>
                  {item.label}
                </Text>

                <Text style={styles.optionDesc}>
                  {item.desc}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {onClose ? (
            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeText}>
                Skip
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.82)',
    justifyContent: 'center',
    padding: 18,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.25)',
    padding: 18,
  },
  kicker: {
    color: CYAN,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: TEXT,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    marginTop: 8,
  },
  subtitle: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 12,
    marginTop: 10,
  },
  rpeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(124, 255, 58, 0.16)',
    borderWidth: 1,
    borderColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rpeNumber: {
    color: NEON,
    fontSize: 18,
    fontWeight: '900',
  },
  optionBody: {
    flex: 1,
  },
  optionTitle: {
    color: TEXT,
    fontSize: 15,
    fontWeight: '900',
  },
  optionDesc: {
    color: MUTED,
    fontSize: 12,
    marginTop: 3,
  },
  closeButton: {
    marginTop: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeText: {
    color: MUTED,
    fontSize: 14,
    fontWeight: '900',
  },
});

export default GymRpeModal;