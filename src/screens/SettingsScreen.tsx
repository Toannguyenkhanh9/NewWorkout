// FILE: src/screens/SettingsScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n, { LANG_KEY } from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import {
  cancelDailyReminder,
  loadDailyReminderSettings,
  scheduleDailyReminder,
} from '../notifications/reminder';
import { useNavigation } from '@react-navigation/native';

const LANGS = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'th', label: 'ไทย' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'fil', label: 'Filipino' },
  { code: 'pt', label: 'Português' },
];
const BG = '#06111D';
const CARD = 'rgba(11, 22, 36, 0.96)';
const CARD_2 = 'rgba(16, 28, 43, 0.96)';
const TEXT = '#F8FAFC';
const MUTED = '#94A3B8';
const NEON = '#7CFF3A';
const CYAN = '#19E6D2';

type RowProps = {
  icon: string;
  title: string;
  value?: string;
  onPress: () => void;
  accent?: string;
};

const SettingRow: React.FC<RowProps> = ({
  icon,
  title,
  value,
  onPress,
  accent = NEON,
}) => {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.86}
    >
      <View style={[styles.rowIcon, { borderColor: accent }]}>
        <Text style={styles.rowIconText}>{icon}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.lang}>{title}</Text>
        {value ? <Text style={styles.value}>{value}</Text> : null}
      </View>

      <Text style={styles.chev}>›</Text>
    </TouchableOpacity>
  );
};
const ReminderTimeModal: React.FC<{
  visible: boolean;
  hour: number;
  minute: number;
  enabled: boolean;
  onChangeHour: (value: number) => void;
  onChangeMinute: (value: number) => void;
  onClose: () => void;
  onSave: () => void;
  onDisable: () => void;
  t: (key: string, defaultValue?: string, options?: any) => string;
}> = ({
  visible,
  hour,
  minute,
  enabled,
  onChangeHour,
  onChangeMinute,
  onClose,
  onSave,
  onDisable,
  t,
}) => {
  const incHour = () => onChangeHour(hour >= 23 ? 0 : hour + 1);
  const decHour = () => onChangeHour(hour <= 0 ? 23 : hour - 1);

  const incMinute = () => onChangeMinute(minute >= 55 ? 0 : minute + 5);
  const decMinute = () => onChangeMinute(minute <= 0 ? 55 : minute - 5);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.reminderOverlay} onPress={onClose}>
        <Pressable style={styles.reminderCard} onPress={() => {}}>
          <Text style={styles.reminderKicker}>
            {t('settings.workoutReminderKicker', 'WORKOUT REMINDER')}
          </Text>

          <Text style={styles.reminderTitle}>
            {t('settings.chooseWorkoutReminderTime', 'Choose reminder time')}
          </Text>

          <Text style={styles.reminderDesc}>
            {t(
              'settings.workoutReminderDesc',
              'Select the time you want to be reminded to train every day.',
            )}
          </Text>

          <View style={styles.timePickerRow}>
            <View style={styles.timePickerBox}>
              <TouchableOpacity style={styles.timeBtn} onPress={incHour}>
                <Text style={styles.timeBtnText}>＋</Text>
              </TouchableOpacity>

              <Text style={styles.timeValue}>
                {String(hour).padStart(2, '0')}
              </Text>

              <TouchableOpacity style={styles.timeBtn} onPress={decHour}>
                <Text style={styles.timeBtnText}>－</Text>
              </TouchableOpacity>

              <Text style={styles.timeLabel}>
                {t('settings.hour', 'Hour')}
              </Text>
            </View>

            <Text style={styles.timeColon}>:</Text>

            <View style={styles.timePickerBox}>
              <TouchableOpacity style={styles.timeBtn} onPress={incMinute}>
                <Text style={styles.timeBtnText}>＋</Text>
              </TouchableOpacity>

              <Text style={styles.timeValue}>
                {String(minute).padStart(2, '0')}
              </Text>

              <TouchableOpacity style={styles.timeBtn} onPress={decMinute}>
                <Text style={styles.timeBtnText}>－</Text>
              </TouchableOpacity>

              <Text style={styles.timeLabel}>
                {t('settings.minute', 'Minute')}
              </Text>
            </View>
          </View>

          <View style={styles.quickTimeRow}>
            {[
              { h: 7, m: 0 },
              { h: 12, m: 0 },
              { h: 18, m: 0 },
              { h: 20, m: 0 },
            ].map((item) => {
              const active = item.h === hour && item.m === minute;

              return (
                <TouchableOpacity
                  key={`${item.h}:${item.m}`}
                  style={[
                    styles.quickTimeBtn,
                    active && styles.quickTimeBtnActive,
                  ]}
                  onPress={() => {
                    onChangeHour(item.h);
                    onChangeMinute(item.m);
                  }}
                >
                  <Text
                    style={[
                      styles.quickTimeText,
                      active && styles.quickTimeTextActive,
                    ]}
                  >
                    {String(item.h).padStart(2, '0')}:
                    {String(item.m).padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.reminderActions}>
            <TouchableOpacity
              style={[styles.reminderActionBtn, styles.reminderCancelBtn]}
              onPress={onClose}
            >
              <Text style={styles.reminderCancelText}>
                {t('common.cancel', 'Cancel')}
              </Text>
            </TouchableOpacity>

            {enabled ? (
              <TouchableOpacity
                style={[styles.reminderActionBtn, styles.reminderDisableBtn]}
                onPress={onDisable}
              >
                <Text style={styles.reminderDisableText}>
                  {t('settings.disableReminder', 'Disable')}
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={[styles.reminderActionBtn, styles.reminderSaveBtn]}
              onPress={onSave}
            >
              <Text style={styles.reminderSaveText}>
                {t('settings.saveReminder', 'Save')}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const rawLanguage = i18n.language || 'en';
  const current =
    LANGS.find(
      (l) => rawLanguage === l.code || rawLanguage.startsWith(`${l.code}-`),
    )?.code || 'en';

  const [showLangPicker, setShowLangPicker] = useState(false);
const [reminderEnabled, setReminderEnabled] = useState(false);
const [time, setTime] = useState<{ h: number; m: number }>({
  h: 20,
  m: 0,
});

const [showReminderPicker, setShowReminderPicker] = useState(false);
const [draftHour, setDraftHour] = useState(20);
const [draftMinute, setDraftMinute] = useState(0);

  const screenH = Dimensions.get('window').height;
  const SHEET_HEIGHT = Math.max(360, Math.min(screenH * 0.85, 580));

  const currentLangLabel = useMemo(
    () => LANGS.find((l) => l.code === current)?.label || current,
    [current],
  );

  const changeLanguage = async (code: string) => {
    await AsyncStorage.setItem(LANG_KEY, code);
    await i18n.changeLanguage(code);
    setShowLangPicker(false);
  };

useEffect(() => {
  (async () => {
    try {
      const saved = await loadDailyReminderSettings();

      setReminderEnabled(saved.enabled);
      setTime({
        h: saved.hour,
        m: saved.minute,
      });
      setDraftHour(saved.hour);
      setDraftMinute(saved.minute);
    } catch {}
  })();
}, []);

const openReminderPicker = () => {
  setDraftHour(time.h);
  setDraftMinute(time.m);
  setShowReminderPicker(true);
};

const saveReminder = async () => {
  const ok = await scheduleDailyReminder(draftHour, draftMinute, {
    title: t('settings.dailyReminderTitle', "It's practice time! 💪"),
    body: t(
      'settings.dailyReminderBody',
      "Open Insanity Deluxe Edition and complete today's session.",
    ),
  });

  if (ok) {
    setReminderEnabled(true);
    setTime({
      h: draftHour,
      m: draftMinute,
    });
    setShowReminderPicker(false);
  }
};

const disableReminder = async () => {
  await cancelDailyReminder();

  setReminderEnabled(false);
  setShowReminderPicker(false);
};

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <View pointerEvents="none" style={styles.glowTop} />
      <View pointerEvents="none" style={styles.glowBottom} />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: 160 + insets.bottom,
          },
        ]}
      >
        <View style={styles.hero}>
          <View style={styles.kickerPill}>
            <Text style={styles.kickerText}>MORE</Text>
          </View>

          <Text style={styles.title}>
            {t('tabs.more', 'More')}
          </Text>

          <Text style={styles.subtitle}>
            {t(
              'settings.choose',
              'Manage your profile, reminders, language and app settings.',
            )}
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            {t('settings.general', 'General')}
          </Text>

          <SettingRow
            icon="🌐"
            title={t('settings.language', 'Language')}
            value={currentLangLabel}
            onPress={() => setShowLangPicker(true)}
            accent={CYAN}
          />

<SettingRow
  icon="⏰"
  title={t('settings.dailyReminder', 'Daily reminder')}
  value={
    reminderEnabled
      ? `${String(time.h).padStart(2, '0')}:${String(time.m).padStart(
          2,
          '0',
        )} • ${t('common.on', 'ON')}`
      : t('settings.reminderOffText', 'Off • tap to choose time')
  }
  onPress={openReminderPicker}
  accent={NEON}
/>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>
            {t('settings.accountAndTraining', 'Account & Training')}
          </Text>

          <SettingRow
            icon="👤"
            title={t('UserProfile.title', 'User Profile')}
            onPress={() => navigation.navigate('UserProfile')}
            accent={NEON}
          />

          <SettingRow
            icon="📖"
            title={t('tabs.guide', 'Guide')}
            onPress={() => navigation.navigate('Guide')}
            accent={CYAN}
          />

          <SettingRow
            icon="⭐"
            title={t('tabs.premium', 'Premium')}
            onPress={() => navigation.navigate('Premium')}
            accent="#F59E0B"
          />

          <SettingRow
            icon="📈"
            title={t('tabs.weightChart', 'Weight Chart')}
            onPress={() => navigation.navigate('WeightChart')}
            accent="#38BDF8"
          />

          <SettingRow
            icon="🕘"
            title={t('history.screenTitle', 'Workout History')}
            onPress={() => navigation.navigate('WorkoutHistory')}
            accent="#A78BFA"
          />
        </View>

        <View style={styles.footerBox}>
          <Text style={styles.footerTitle}>
            Insanity Deluxe Edition
          </Text>

          <Text style={styles.footerText}>
            {t('footer.devBy', { name: 'Kevin' })}
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={showLangPicker}
        animationType="fade"
        transparent
        onRequestClose={() => setShowLangPicker(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowLangPicker(false)}
        >
          <Pressable
            style={[
              styles.sheet,
              {
                height: SHEET_HEIGHT,
                paddingBottom: insets.bottom + 8,
              },
            ]}
            onPress={() => {}}
          >
            <View style={styles.sheetHandle} />

            <Text style={styles.sheetTitle}>
              {t('settings.language', 'Language')}
            </Text>

            <Text style={styles.sheetSub}>
              {t('settings.chooseLanguage', 'Choose your app language')}
            </Text>

            <View style={{ flex: 1, minHeight: 200 }}>
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 8 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
              >
                {LANGS.map((item) => {
                  const selected = item.code === current;

                  return (
                    <TouchableOpacity
                      key={item.code}
                      style={[styles.item, selected && styles.itemActive]}
                      onPress={() => changeLanguage(item.code)}
                      activeOpacity={0.86}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          selected && styles.itemTextActive,
                        ]}
                        numberOfLines={1}
                      >
                        {item.label}
                      </Text>

                      {selected ? (
                        <View style={styles.tickCircle}>
                          <Text style={styles.tick}>✓</Text>
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowLangPicker(false)}
              activeOpacity={0.86}
            >
              <Text style={styles.cancelTxt}>
                {t('common.cancel', 'Cancel')}
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
      <ReminderTimeModal
  visible={showReminderPicker}
  hour={draftHour}
  minute={draftMinute}
  enabled={reminderEnabled}
  onChangeHour={setDraftHour}
  onChangeMinute={setDraftMinute}
  onClose={() => setShowReminderPicker(false)}
  onSave={saveReminder}
  onDisable={disableReminder}
  t={t as any}
/>
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

  sectionCard: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.22)',
    overflow: 'hidden',
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },

  row: {
    backgroundColor: CARD_2,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
    padding: 13,
    marginBottom: 9,
  },
  rowIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowIconText: {
    fontSize: 20,
  },
  lang: {
    color: TEXT,
    fontSize: 15,
    flex: 1,
    fontWeight: '900',
  },
  value: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
  },
  chev: {
    color: NEON,
    fontSize: 26,
    marginLeft: 8,
  },

  footerBox: {
    backgroundColor: 'rgba(124, 255, 58, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.25)',
    borderRadius: 20,
    padding: 14,
    marginTop: 2,
  },
  footerTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 15,
  },
  footerText: {
    color: MUTED,
    marginTop: 4,
    fontSize: 12,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.62)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: BG,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.25)',
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(148, 163, 184, 0.45)',
    marginBottom: 12,
  },
  sheetTitle: {
    color: TEXT,
    fontWeight: '900',
    fontSize: 20,
  },
  sheetSub: {
    color: MUTED,
    marginTop: 4,
    marginBottom: 12,
    fontSize: 13,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
    marginBottom: 8,
  },
  itemActive: {
    borderColor: 'rgba(124, 255, 58, 0.55)',
    backgroundColor: 'rgba(12, 38, 27, 0.96)',
  },
  itemText: {
    color: '#E5E7EB',
    fontSize: 14,
    flex: 1,
    fontWeight: '700',
  },
  itemTextActive: {
    color: NEON,
    fontWeight: '900',
  },
  tickCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  tick: {
    color: BG,
    fontSize: 16,
    fontWeight: '900',
  },
  cancelBtn: {
    marginTop: 6,
    backgroundColor: CARD_2,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
  },
  cancelTxt: {
    color: TEXT,
    fontWeight: '900',
  },
  reminderOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.62)',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 18,
},
reminderCard: {
  width: '100%',
  backgroundColor: CARD,
  borderRadius: 24,
  padding: 18,
  borderWidth: 1,
  borderColor: 'rgba(124, 255, 58, 0.28)',
  shadowColor: '#00FFD1',
  shadowOpacity: 0.16,
  shadowRadius: 18,
  shadowOffset: {
    width: 0,
    height: 10,
  },
  elevation: 8,
},
reminderKicker: {
  color: CYAN,
  fontSize: 11,
  fontWeight: '900',
  letterSpacing: 1.1,
  marginBottom: 6,
},
reminderTitle: {
  color: TEXT,
  fontSize: 22,
  fontWeight: '900',
},
reminderDesc: {
  color: MUTED,
  fontSize: 14,
  lineHeight: 21,
  marginTop: 8,
  marginBottom: 18,
},
timePickerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
timePickerBox: {
  width: 120,
  backgroundColor: CARD_2,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: 'rgba(148, 163, 184, 0.18)',
  padding: 12,
  alignItems: 'center',
},
timeBtn: {
  width: 44,
  height: 36,
  borderRadius: 12,
  backgroundColor: 'rgba(124, 255, 58, 0.12)',
  borderWidth: 1,
  borderColor: 'rgba(124, 255, 58, 0.28)',
  alignItems: 'center',
  justifyContent: 'center',
},
timeBtnText: {
  color: NEON,
  fontSize: 20,
  fontWeight: '900',
},
timeValue: {
  color: TEXT,
  fontSize: 38,
  fontWeight: '900',
  marginVertical: 10,
},
timeLabel: {
  color: MUTED,
  fontSize: 12,
  fontWeight: '800',
},
timeColon: {
  color: NEON,
  fontSize: 36,
  fontWeight: '900',
  marginHorizontal: 10,
},
quickTimeRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
},
quickTimeBtn: {
  paddingHorizontal: 12,
  paddingVertical: 9,
  borderRadius: 999,
  backgroundColor: CARD_2,
  borderWidth: 1,
  borderColor: 'rgba(148, 163, 184, 0.18)',
  marginRight: 8,
  marginBottom: 8,
},
quickTimeBtnActive: {
  backgroundColor: NEON,
  borderColor: NEON,
},
quickTimeText: {
  color: '#CBD5E1',
  fontSize: 13,
  fontWeight: '900',
},
quickTimeTextActive: {
  color: BG,
},
reminderActions: {
  flexDirection: 'row',
  marginTop: 12,
},
reminderActionBtn: {
  flex: 1,
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
  borderWidth: 1,
  marginHorizontal: 4,
},
reminderCancelBtn: {
  backgroundColor: CARD_2,
  borderColor: 'rgba(148, 163, 184, 0.22)',
},
reminderDisableBtn: {
  backgroundColor: 'rgba(239, 68, 68, 0.12)',
  borderColor: 'rgba(239, 68, 68, 0.34)',
},
reminderSaveBtn: {
  backgroundColor: NEON,
  borderColor: NEON,
},
reminderCancelText: {
  color: '#E5E7EB',
  fontWeight: '900',
},
reminderDisableText: {
  color: '#FCA5A5',
  fontWeight: '900',
},
reminderSaveText: {
  color: BG,
  fontWeight: '900',
},
});

export default SettingsScreen;