// FILE: src/screens/GuideScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';

const STEP_IMAGES = {
  step1: require('../../assets/images/guide_step_1.jpg'),
  step2: require('../../assets/images/guide_step_2.jpg'),
  step3: require('../../assets/images/guide_step_3.jpg'),
  step4: require('../../assets/images/guide_step_4.jpg'),
};

const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

type StepCardProps = {
  step: string;
  title: string;
  desc: string;
  image: any;
};

const StepCard: React.FC<StepCardProps> = ({ step, title, desc, image }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardGlow} />

      <View style={styles.cardTop}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>{step}</Text>
        </View>

        <View style={styles.stepIcon}>
          <Text style={styles.stepIconText}>✓</Text>
        </View>
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{desc}</Text>

      <View style={styles.imageWrap}>
        <Image source={image} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.imageShade} />
      </View>
    </View>
  );
};

export const GuideScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.kickerPill}>
            <Text style={styles.kickerText}>GUIDE</Text>
          </View>

          <Text style={styles.title}>
            {t('guide.title', 'Hướng dẫn tập luyện')}
          </Text>

          <Text style={styles.subtitle}>
            {t(
              'guide.subtitle',
              'Làm theo từng bước để bắt đầu chương trình tập luyện hiệu quả hơn.',
            )}
          </Text>
        </View>

        <StepCard
          step={t('guide.steps.step1.badge', 'Step 1')}
          title={t('guide.steps.step1.title', 'Chọn chương trình phù hợp')}
          desc={t(
            'guide.steps.step1.desc',
            'Dựa vào mục tiêu, cấp độ và thời gian của bạn để chọn chương trình phù hợp.',
          )}
          image={STEP_IMAGES.step1}
        />

        <StepCard
          step={t('guide.steps.step2.badge', 'Step 2')}
          title={t('guide.steps.step2.title', 'Theo dõi kế hoạch hằng tuần')}
          desc={t(
            'guide.steps.step2.desc',
            'Mở từng ngày tập, hoàn thành buổi tập và giữ lịch tập đều đặn.',
          )}
          image={STEP_IMAGES.step2}
        />

        <StepCard
          step={t('guide.steps.step3.badge', 'Step 3')}
          title={t('guide.steps.step3.title', 'Tập cùng video hướng dẫn')}
          desc={t(
            'guide.steps.step3.desc',
            'Xem video, tập theo động tác và xoay ngang màn hình để xem rõ hơn.',
          )}
          image={STEP_IMAGES.step3}
        />

        <StepCard
          step={t('guide.steps.step4.badge', 'Step 4')}
          title={t('guide.steps.step4.title', 'Theo dõi tiến độ')}
          desc={t(
            'guide.steps.step4.desc',
            'Kiểm tra lịch sử tập, thành tích và duy trì động lực mỗi ngày.',
          )}
          image={STEP_IMAGES.step4}
        />

        <View style={styles.noteBox}>
          <View style={styles.noteIcon}>
            <Text style={styles.noteIconText}>💡</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.noteTitle}>
              {t('guide.noteTitle', 'Lưu ý')}
            </Text>

            <Text style={styles.noteText}>
              {t(
                'guide.note',
                'Hãy khởi động trước khi tập, uống đủ nước và nghỉ ngơi khi cơ thể cần phục hồi.',
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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

  card: {
    backgroundColor: CARD,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    padding: 16,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#00FFD1',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cardGlow: {
    position: 'absolute',
    top: -70,
    right: -70,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(124, 255, 58, 0.10)',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(124, 255, 58, 0.14)',
    borderColor: 'rgba(124, 255, 58, 0.45)',
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
  },
  stepBadgeText: {
    color: NEON,
    fontSize: 12,
    fontWeight: '900',
  },
  stepIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconText: {
    color: BG,
    fontSize: 18,
    fontWeight: '900',
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: TEXT,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: MUTED,
    lineHeight: 21,
    marginBottom: 14,
  },
  imageWrap: {
    width: '100%',
    height: 195,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: CARD_2,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 7, 18, 0.08)',
  },

  noteBox: {
    marginTop: 4,
    backgroundColor: 'rgba(69, 40, 12, 0.88)',
    borderColor: 'rgba(245, 158, 11, 0.45)',
    borderWidth: 1,
    borderRadius: 22,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noteIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(245, 158, 11, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  noteIconText: {
    fontSize: 22,
  },
  noteTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FDE68A',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 14,
    color: '#FFF7ED',
    lineHeight: 21,
  },
});

export default GuideScreen;