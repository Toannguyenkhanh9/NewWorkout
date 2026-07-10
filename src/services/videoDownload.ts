// FILE: src/services/videoDownload.ts
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VIDEO_DOWNLOAD_KEY = 'offlineVideos:v1';

export type OfflineVideoMap = Record<string, string>;

const VIDEO_DIR = `${RNFS.DocumentDirectoryPath}/workout-videos`;

const ensureVideoDir = async () => {
  const exists = await RNFS.exists(VIDEO_DIR);

  if (!exists) {
    await RNFS.mkdir(VIDEO_DIR);
  }
};

const safeFileName = (videoId: string) => {
  return videoId.replace(/[^a-zA-Z0-9_-]/g, '_') + '.mp4';
};

export const loadOfflineVideos = async (): Promise<OfflineVideoMap> => {
  try {
    const raw = await AsyncStorage.getItem(VIDEO_DOWNLOAD_KEY);

    if (!raw) return {};

    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const saveOfflineVideos = async (map: OfflineVideoMap) => {
  await AsyncStorage.setItem(VIDEO_DOWNLOAD_KEY, JSON.stringify(map));
};

export const getOfflineVideoPath = async (
  videoId: string,
): Promise<string | null> => {
  const map = await loadOfflineVideos();
  const path = map[videoId];

  if (!path) return null;

  const exists = await RNFS.exists(path);

  if (!exists) {
    delete map[videoId];
    await saveOfflineVideos(map);
    return null;
  }

  return path;
};

export const isVideoDownloaded = async (videoId: string) => {
  const path = await getOfflineVideoPath(videoId);
  return !!path;
};

export const downloadWorkoutVideo = async (
  videoId: string,
  videoUrl: string,
  onProgress?: (progress: number) => void,
) => {
  await ensureVideoDir();

  const filePath = `${VIDEO_DIR}/${safeFileName(videoId)}`;

  const exists = await RNFS.exists(filePath);

  if (exists) {
    const map = await loadOfflineVideos();
    map[videoId] = filePath;
    await saveOfflineVideos(map);

    onProgress?.(100);

    return filePath;
  }

  const result = RNFS.downloadFile({
    fromUrl: videoUrl,
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

  await result.promise;

  const map = await loadOfflineVideos();
  map[videoId] = filePath;
  await saveOfflineVideos(map);

  onProgress?.(100);

  return filePath;
};

export const deleteOfflineVideo = async (videoId: string) => {
  const map = await loadOfflineVideos();
  const path = map[videoId];

  if (path) {
    const exists = await RNFS.exists(path);

    if (exists) {
      await RNFS.unlink(path);
    }
  }

  delete map[videoId];
  await saveOfflineVideos(map);
};

export const getOfflineVideoSizeText = async (videoId: string) => {
  const path = await getOfflineVideoPath(videoId);

  if (!path) return null;

  const stat = await RNFS.stat(path);
  const size = Number(stat.size || 0);

  if (size >= 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
};