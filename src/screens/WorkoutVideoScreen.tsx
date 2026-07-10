// FILE: src/screens/WorkoutVideoScreen.tsx
import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

import { markWorkoutCompleted } from '../services/gamification';
import { markWorkoutActivity } from '../notifications/reminder';
import { useSubscription } from '../iap/SubscriptionProvider';

import {
  downloadWorkoutVideo,
  getOfflineVideoKey,
  getOfflineVideoPath,
  getOfflineVideoSizeText,
  getWorkoutDownloadUrl,
} from '../services/offlineWorkoutVideo';

type WorkoutDownloadVideo = {
  title: string;
  url: string;
};

type OfflineItem = WorkoutDownloadVideo & {
  index: number;
  path: string | null;
  size: string | null;
};

type RootStackParamList = {
  WorkoutVideo: {
    programId: string;
    dayId: string;
    videoUrl: string;
    downloadUrl?: string;
    downloadVideos?: WorkoutDownloadVideo[];
    sessionKey: string;
    name: string;
    durationMinutes?: number;
  };
};

type WorkoutVideoRouteProp = RouteProp<
  RootStackParamList,
  'WorkoutVideo'
>;

export const WorkoutVideoScreen: React.FC = () => {
  useKeepAwake();

  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<WorkoutVideoRouteProp>();
  const { isPremium } = useSubscription();

  const {
    programId,
    videoUrl,
    name,
    durationMinutes = 25,
    downloadUrl: routeDownloadUrl,
    downloadVideos = [],
  } = route.params;

  const [completed, setCompleted] = React.useState(false);
  const [offlineItems, setOfflineItems] = React.useState<OfflineItem[]>([]);
  const [downloading, setDownloading] = React.useState(false);
  const [downloadProgress, setDownloadProgress] = React.useState(0);

  const offlineKey = React.useMemo(() => {
    return getOfflineVideoKey(programId, videoUrl);
  }, [programId, videoUrl]);

  const offlineSources = React.useMemo<WorkoutDownloadVideo[]>(() => {
    const validVideos = Array.isArray(downloadVideos)
      ? downloadVideos.filter((item) => !!item?.url)
      : [];

    if (validVideos.length > 0) {
      return validVideos;
    }

    const fallbackUrl =
      routeDownloadUrl || getWorkoutDownloadUrl(programId, videoUrl);

    if (fallbackUrl) {
      return [
        {
          title: name,
          url: fallbackUrl,
        },
      ];
    }

    return [];
  }, [
    downloadVideos,
    routeDownloadUrl,
    programId,
    videoUrl,
    name,
  ]);

  const getItemOfflineKey = useCallback(
    (index: number) => {
      /**
       * Nếu chỉ có 1 video thì dùng key cũ để tránh user phải download lại
       * nếu trước đó đã tải bằng bản code cũ.
       */
      if (offlineSources.length <= 1) {
        return offlineKey;
      }

      /**
       * Nếu 1 buổi có nhiều video thì mỗi video có key riêng.
       */
      return `${offlineKey}#${index}`;
    },
    [offlineKey, offlineSources.length],
  );

  const reloadOfflineState = useCallback(async () => {
    const items = await Promise.all(
      offlineSources.map(async (item, index) => {
        const itemKey = getItemOfflineKey(index);
        const path = await getOfflineVideoPath(itemKey);
        const size = path
          ? await getOfflineVideoSizeText(itemKey)
          : null;

        return {
          ...item,
          index,
          path,
          size,
        };
      }),
    );

    setOfflineItems(items);
  }, [offlineSources, getItemOfflineKey]);

  useEffect(() => {
    reloadOfflineState();
  }, [reloadOfflineState]);

  const hasOfflineSources = offlineSources.length > 0;

  const downloadedCount = offlineItems.filter(
    (item) => !!item.path,
  ).length;

  const allVideosDownloaded =
    hasOfflineSources &&
    offlineItems.length === offlineSources.length &&
    offlineItems.every((item) => !!item.path);

  /**
   * Offline là tính năng Premium.
   * Nếu user không còn Premium thì vẫn stream WebView như bình thường.
   */
  const canUseOffline = isPremium && allVideosDownloaded;

  const downloadedSizeText = React.useMemo(() => {
    const sizes = offlineItems
      .map((item) => item.size)
      .filter(Boolean);

    if (sizes.length === 1) {
      return sizes[0];
    }

    return null;
  }, [offlineItems]);

  const onDownloadOffline = async () => {
    if (!isPremium) {
      Alert.alert(
        t('premium.lockedTitle', 'Premium required'),
        t(
          'premium.downloadOfflinePremium',
          'Upgrade Premium to download workout videos and watch offline.',
        ),
        [
          {
            text: t('common.cancel', 'Cancel'),
            style: 'cancel',
          },
          {
            text: t('premium.cta', 'Upgrade now'),
            onPress: () =>
              navigation.getParent()?.navigate('Settings', {
                screen: 'Premium',
              }),
          },
        ],
      );
      return;
    }

    if (!hasOfflineSources) {
      Alert.alert(
        t('premium.errorTitle', 'Error'),
        t(
          'video.downloadUrlMissing',
          'Offline video is not available for this workout yet.',
        ),
      );
      return;
    }

    try {
      setDownloading(true);
      setDownloadProgress(0);

      for (let i = 0; i < offlineSources.length; i += 1) {
        const item = offlineSources[i];
        const itemKey = getItemOfflineKey(i);

        await downloadWorkoutVideo(
          itemKey,
          item.url,
          (progress) => {
            const totalProgress = Math.round(
              ((i + progress / 100) / offlineSources.length) * 100,
            );

            setDownloadProgress(
              Math.min(100, Math.max(0, totalProgress)),
            );
          },
        );
      }

      await reloadOfflineState();

      Alert.alert(
        t('common.success', 'Success'),
        t(
          'video.downloadSuccess',
          'Video downloaded for offline use.',
        ),
      );
    } catch (e: any) {
      Alert.alert(
        t('premium.errorTitle', 'Error'),
        e?.message ||
          t('video.downloadError', 'Unable to download video.'),
      );
    } finally {
      setDownloading(false);
    }
  };

  const onCompleteWorkout = async () => {
    if (completed) {
      Alert.alert(
        t('program.completed', 'Completed'),
        t(
          'gamification.alreadyCompletedToday',
          'This workout has already been completed.',
        ),
      );
      return;
    }

    try {
      await markWorkoutCompleted(durationMinutes);
      await markWorkoutActivity();

      setCompleted(true);

      Alert.alert(
        t('program.completed', 'Completed'),
        t(
          'gamification.workoutCompletedMessage',
          'Great job! XP and streak updated.',
        ),
      );
    } catch (e) {
      Alert.alert(
        t('premium.errorTitle', 'Error'),
        t(
          'video.error',
          'Unable to complete this action. Please try again.',
        ),
      );
    }
  };

  const renderPlayer = () => {
    if (canUseOffline) {
      if (offlineItems.length === 1 && offlineItems[0]?.path) {
        return (
          <View style={styles.videoBox}>
            <Video
              source={{ uri: `file://${offlineItems[0].path}` }}
              style={styles.video}
              controls
              resizeMode="contain"
              paused={false}
              playInBackground={false}
              playWhenInactive={false}
              onError={(e) => {
                console.log('Offline video error:', e);

                Alert.alert(
                  t('premium.errorTitle', 'Error'),
                  t(
                    'video.error',
                    'Unable to play this video.',
                  ),
                );
              }}
            />
          </View>
        );
      }

      return (
        <ScrollView
          style={styles.offlinePlayerScroll}
          contentContainerStyle={styles.offlinePlayerContent}
          showsVerticalScrollIndicator={false}
        >
          {offlineItems.map((item) => {
            if (!item.path) return null;

            return (
              <View
                key={`${item.url}-${item.index}`}
                style={styles.offlineVideoBlock}
              >
                <Text style={styles.offlineVideoTitle}>
                  {item.title}
                </Text>

                <View style={styles.videoBoxSmall}>
                  <Video
                    source={{ uri: `file://${item.path}` }}
                    style={styles.video}
                    controls
                    resizeMode="contain"
                    paused
                    playInBackground={false}
                    playWhenInactive={false}
                    onError={(e) => {
                      console.log('Offline video error:', e);

                      Alert.alert(
                        t('premium.errorTitle', 'Error'),
                        t(
                          'video.error',
                          'Unable to play this video.',
                        ),
                      );
                    }}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      );
    }

    return (
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        source={{ uri: 'file:///android_asset/' + videoUrl }}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        allowsInlineMediaPlayback
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderPlayer()}

      <Text style={styles.workoutName}>
        {name}
      </Text>

      <Text style={styles.helper}>
        {canUseOffline
          ? t('video.playingOffline', 'Playing offline')
          : t('video.play', 'Start workout')}
      </Text>

      <View style={styles.offlineCard}>
        <View style={styles.offlineLeft}>
          <Text style={styles.offlineTitle}>
            {t('video.offlineMode', 'Offline video')}
          </Text>

          <Text style={styles.offlineDesc}>
            {canUseOffline
              ? offlineItems.length > 1
                ? `${t('video.downloaded', 'Downloaded')} • ${downloadedCount}/${offlineSources.length}`
                : `${t('video.downloaded', 'Downloaded')}${
                    downloadedSizeText ? ` • ${downloadedSizeText}` : ''
                  }`
              : isPremium
                ? hasOfflineSources
                  ? offlineSources.length > 1
                    ? t(
                        'video.downloadMultipleOfflineDesc',
                        'Download all videos in this workout once and use them offline.',
                      )
                    : t(
                        'video.downloadOfflineDesc',
                        'Download once and use it for every repeated day of this workout.',
                      )
                  : t(
                      'video.downloadUrlMissing',
                      'Offline video is not available for this workout yet.',
                    )
                : t(
                    'premium.downloadOfflinePremium',
                    'Upgrade Premium to download workout videos and watch offline.',
                  )}
          </Text>
        </View>

        {canUseOffline ? (
          <View style={styles.downloadedPill}>
            <Text style={styles.downloadedPillText}>
              {t('video.downloaded', 'Downloaded')}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.smallDownloadButton,
              downloading && styles.buttonDisabled,
              !isPremium && styles.premiumLockedButton,
            ]}
            onPress={onDownloadOffline}
            disabled={downloading}
          >
            {downloading ? (
              <ActivityIndicator color="#06111D" />
            ) : (
              <Text style={styles.smallDownloadText}>
                {isPremium
                  ? hasOfflineSources
                    ? t('video.downloadOffline', 'Download')
                    : t('video.notAvailable', 'N/A')
                  : t('premium.premium', 'Premium')}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {downloading ? (
        <Text style={styles.progressText}>
          {t('video.downloading', 'Downloading')} {downloadProgress}%
        </Text>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.completeButton,
          completed && styles.completeButtonDone,
        ]}
        onPress={onCompleteWorkout}
      >
        <Text
          style={[
            styles.completeButtonText,
            completed && styles.completeButtonTextDone,
          ]}
        >
          {completed
            ? t('program.completed', 'Completed')
            : t('gamification.completeWorkout', 'Complete workout')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020817',
    padding: 16,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoBox: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },

  offlinePlayerScroll: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 12,
  },
  offlinePlayerContent: {
    padding: 12,
  },
  offlineVideoBlock: {
    marginBottom: 18,
  },
  offlineVideoTitle: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 8,
  },
  videoBoxSmall: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },

  workoutName: {
    marginTop: 16,
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '800',
  },
  helper: {
    marginTop: 4,
    color: '#9CA3AF',
    fontSize: 13,
  },

  offlineCard: {
    marginTop: 14,
    backgroundColor: '#071827',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.28)',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  offlineLeft: {
    flex: 1,
    paddingRight: 10,
  },
  offlineTitle: {
    color: '#E0F2FE',
    fontSize: 14,
    fontWeight: '900',
  },
  offlineDesc: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
  },

  smallDownloadButton: {
    minWidth: 92,
    height: 38,
    borderRadius: 999,
    backgroundColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  premiumLockedButton: {
    backgroundColor: '#7CFF3A',
  },
  smallDownloadText: {
    color: '#06111D',
    fontSize: 12,
    fontWeight: '900',
  },
  downloadedPill: {
    minWidth: 104,
    height: 38,
    borderRadius: 999,
    backgroundColor: 'rgba(124, 255, 58, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 58, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  downloadedPillText: {
    color: '#7CFF3A',
    fontSize: 12,
    fontWeight: '900',
  },
  progressText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 8,
  },

  completeButton: {
    marginTop: 16,
    backgroundColor: '#7CFF3A',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonDone: {
    backgroundColor: '#0B3B2E',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  completeButtonText: {
    color: '#06111D',
    fontSize: 16,
    fontWeight: '900',
  },
  completeButtonTextDone: {
    color: '#D1FAE5',
  },
  buttonDisabled: {
    opacity: 0.55,
  },
});

export default WorkoutVideoScreen;