import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const STEP_IMAGES = {
  step1: require('../../assets/images/guide_step_1.jpg'),
  step2: require('../../assets/images/guide_step_2.jpg'),
  step3: require('../../assets/images/guide_step_3.jpg'),
  step4: require('../../assets/images/guide_step_4.jpg'),
};

type StepCardProps = {
  step: string;
  title: string;
  desc: string;
  image: any;
};

const StepCard: React.FC<StepCardProps> = ({ step, title, desc, image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepBadgeText}>{step}</Text>
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{desc}</Text>

      <Image source={image} style={styles.cardImage} resizeMode="cover" />
    </View>
  );
};

export const GuideScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{t('guide.title')}</Text>
      <Text style={styles.subtitle}>{t('guide.subtitle')}</Text>

      <StepCard
        step={t('guide.steps.step1.badge', 'Step 1')}
        title={t('guide.steps.step1.title')}
        desc={t('guide.steps.step1.desc')}
        image={STEP_IMAGES.step1}
      />

      <StepCard
        step={t('guide.steps.step2.badge', 'Step 2')}
        title={t('guide.steps.step2.title')}
        desc={t('guide.steps.step2.desc')}
        image={STEP_IMAGES.step2}
      />

      <StepCard
        step={t('guide.steps.step3.badge', 'Step 3')}
        title={t('guide.steps.step3.title')}
        desc={t('guide.steps.step3.desc')}
        image={STEP_IMAGES.step3}
      />

      <StepCard
        step={t('guide.steps.step4.badge', 'Step 4')}
        title={t('guide.steps.step4.title')}
        desc={t('guide.steps.step4.desc')}
        image={STEP_IMAGES.step4}
      />

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>{t('guide.noteTitle')}</Text>
        <Text style={styles.noteText}>{t('guide.note')}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 14,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 10,
  },
  stepBadgeText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '800',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 21,
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 190,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
  },
  noteBox: {
    marginTop: 4,
    backgroundColor: '#FEFCE8',
    borderColor: '#FDE68A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#854D0E',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 14,
    color: '#713F12',
    lineHeight: 21,
  },
});

export default GuideScreen;