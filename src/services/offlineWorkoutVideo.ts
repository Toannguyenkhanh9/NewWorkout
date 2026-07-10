// FILE: src/services/offlineWorkoutVideo.ts
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OFFLINE_VIDEO_KEY = 'offlineWorkoutVideos:v1';

const VIDEO_DIR = `${RNFS.DocumentDirectoryPath}/workout-videos`;

export type OfflineVideoMap = Record<string, string>;

const CDN_BASE = 'https://insanity-workouts-cdn.b-cdn.net';

/**
 * Map video HTML trong app sang video MP4 trên Bunny.
 *
 * Vì app của bạn hiện đang mở WebView bằng index1.html, findex1.html...
 * còn Bunny là file mp4, nên cần map.
 *
 * Ví dụ screenshot của bạn:
 * https://insanity-workouts-cdn.b-cdn.net/T25Focus/ab_intervals.mp4
 */
const BUNNY_VIDEO_MAP: Record<string, string> = {
  /**
   * Format key:
   * programId|videoUrl
   *
   * Bạn thêm dần các video thật ở đây.
   */

  // Focus T25
  'FocusT25|findex1.html': `${CDN_BASE}/T25Focus/ab_intervals.mp4`,

  // Ví dụ nếu bạn upload theo tên file giống html:
  // 'Insanity|index1.html': `${CDN_BASE}/Insanity/index1.mp4`,
  // 'Insanity|index2.html': `${CDN_BASE}/Insanity/index2.mp4`,
  // 'FocusT25|findex2.html': `${CDN_BASE}/T25Focus/findex2.mp4`,
};

const ensureVideoDir = async () => {
  const exists = await RNFS.exists(VIDEO_DIR);

  if (!exists) {
    await RNFS.mkdir(VIDEO_DIR);
  }
};

const hashText = (text: string) => {
  let hash = 0;

  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash).toString(36);
};

const safeFileName = (key: string) => {
  return `${hashText(key)}.mp4`;
};

const normalizeProgramId = (programId: string) => {
  return String(programId || '').trim();
};

const normalizeVideoUrl = (videoUrl: string) => {
  return String(videoUrl || '').trim();
};

export const getOfflineVideoKey = (
  programId: string,
  videoUrl: string,
) => {
  return `${normalizeProgramId(programId)}|${normalizeVideoUrl(videoUrl)}`;
};

export const getWorkoutDownloadUrl = (
  programId: string,
  videoUrl: string,
) => {
  const key = getOfflineVideoKey(programId, videoUrl);

  return BUNNY_VIDEO_MAP[key] || null;
};

export const loadOfflineVideos = async (): Promise<OfflineVideoMap> => {
  try {
    const raw = await AsyncStorage.getItem(OFFLINE_VIDEO_KEY);

    if (!raw) return {};

    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const saveOfflineVideos = async (map: OfflineVideoMap) => {
  await AsyncStorage.setItem(OFFLINE_VIDEO_KEY, JSON.stringify(map));
};

export const getOfflineVideoPath = async (
  offlineKey: string,
): Promise<string | null> => {
  const map = await loadOfflineVideos();
  const path = map[offlineKey];

  if (!path) return null;

  const exists = await RNFS.exists(path);

  if (!exists) {
    delete map[offlineKey];
    await saveOfflineVideos(map);
    return null;
  }

  return path;
};

export const getOfflineVideoSizeText = async (
  offlineKey: string,
) => {
  const path = await getOfflineVideoPath(offlineKey);

  if (!path) return null;

  const stat = await RNFS.stat(path);
  const size = Number(stat.size || 0);

  if (size >= 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
};

export const downloadWorkoutVideo = async (
  offlineKey: string,
  downloadUrl: string,
  onProgress?: (progress: number) => void,
) => {
  await ensureVideoDir();

  const filePath = `${VIDEO_DIR}/${safeFileName(offlineKey)}`;

  const exists = await RNFS.exists(filePath);

  if (exists) {
    const map = await loadOfflineVideos();
    map[offlineKey] = filePath;
    await saveOfflineVideos(map);

    onProgress?.(100);

    return filePath;
  }

  const result = RNFS.downloadFile({
    fromUrl: downloadUrl,
    toFile: filePath,
    background: true,
    discretionary: true,
    progressDivider: 1,
    progress: (res) => {
      if (!res.contentLength) return;

      const percent = Math.round(
        (res.bytesWritten / res.contentLength) * 100,
      );

      onProgress?.(Math.min(100, Math.max(0, percent)));
    },
  });

  const response = await result.promise;

  if (response.statusCode && response.statusCode >= 400) {
    throw new Error(`Download failed: ${response.statusCode}`);
  }

  const map = await loadOfflineVideos();
  map[offlineKey] = filePath;
  await saveOfflineVideos(map);

  onProgress?.(100);

  return filePath;
};

export const deleteOfflineVideo = async (offlineKey: string) => {
  const map = await loadOfflineVideos();
  const path = map[offlineKey];

  if (path) {
    const exists = await RNFS.exists(path);

    if (exists) {
      await RNFS.unlink(path);
    }
  }

  delete map[offlineKey];
  await saveOfflineVideos(map);
};