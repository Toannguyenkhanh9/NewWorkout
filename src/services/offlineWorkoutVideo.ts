// FILE: src/services/offlineWorkoutVideo.ts
import ReactNativeBlobUtil from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OFFLINE_VIDEO_KEY = 'offlineWorkoutVideos:v1';

const VIDEO_DIR = `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/workout-videos`;

export type OfflineVideoMap = Record<string, string>;

const CDN_BASE = 'https://insanity-workouts-cdn.b-cdn.net';

const BUNNY_VIDEO_MAP: Record<string, string> = {
  // Focus T25
  'FocusT25|findex1.html':
    `${CDN_BASE}/T25Focus/ab_intervals.mp4`,

  // Ví dụ:
  // 'FocusT25|findex2.html':
  //   `${CDN_BASE}/T25Focus/cardio.mp4`,
  //
  // 'Insanity|index1.html':
  //   `${CDN_BASE}/Insanity/fit_test.mp4`,
};

const ensureVideoDir = async () => {
  const exists = await ReactNativeBlobUtil.fs.exists(VIDEO_DIR);

  if (!exists) {
    await ReactNativeBlobUtil.fs.mkdir(VIDEO_DIR);
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

const normalize = (value: string | undefined | null) => {
  return String(value || '').trim();
};

export const getOfflineVideoKey = (
  programId: string,
  videoUrl: string,
) => {
  return `${normalize(programId)}|${normalize(videoUrl)}`;
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

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== 'object') {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
};

const saveOfflineVideos = async (map: OfflineVideoMap) => {
  await AsyncStorage.setItem(
    OFFLINE_VIDEO_KEY,
    JSON.stringify(map),
  );
};

export const getOfflineVideoPath = async (
  offlineKey: string,
): Promise<string | null> => {
  try {
    const map = await loadOfflineVideos();
    const path = map[offlineKey];

    if (!path) {
      return null;
    }

    const exists = await ReactNativeBlobUtil.fs.exists(path);

    if (!exists) {
      delete map[offlineKey];
      await saveOfflineVideos(map);
      return null;
    }

    return path;
  } catch {
    return null;
  }
};

export const getOfflineVideoSizeText = async (
  offlineKey: string,
) => {
  try {
    const path = await getOfflineVideoPath(offlineKey);

    if (!path) {
      return null;
    }

    const stat = await ReactNativeBlobUtil.fs.stat(path);
    const size = Number(stat.size || 0);

    if (size >= 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
    }

    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  } catch {
    return null;
  }
};

export const downloadWorkoutVideo = async (
  offlineKey: string,
  downloadUrl: string,
  onProgress?: (progress: number) => void,
) => {
  if (!downloadUrl) {
    throw new Error('Download URL is empty.');
  }

  await ensureVideoDir();

  const filePath = `${VIDEO_DIR}/${safeFileName(offlineKey)}`;

  const exists = await ReactNativeBlobUtil.fs.exists(filePath);

  if (exists) {
    const map = await loadOfflineVideos();
    map[offlineKey] = filePath;
    await saveOfflineVideos(map);

    onProgress?.(100);

    return filePath;
  }

  const task = ReactNativeBlobUtil.config({
    path: filePath,
    fileCache: true,
  }).fetch('GET', downloadUrl);

  task.progress(
    {
      interval: 250,
    },
    (received, total) => {
      const totalNum = Number(total);
      const receivedNum = Number(received);

      if (!totalNum) {
        return;
      }

      const percent = Math.round((receivedNum / totalNum) * 100);

      onProgress?.(
        Math.min(100, Math.max(0, percent)),
      );
    },
  );

  const response = await task;

  const status = response.info().status;

  if (status >= 400) {
    try {
      const failedExists = await ReactNativeBlobUtil.fs.exists(filePath);

      if (failedExists) {
        await ReactNativeBlobUtil.fs.unlink(filePath);
      }
    } catch {}

    throw new Error(`Download failed: ${status}`);
  }

  const map = await loadOfflineVideos();
  map[offlineKey] = filePath;
  await saveOfflineVideos(map);

  onProgress?.(100);

  return filePath;
};
export const getGymExerciseOfflineKey = (
  exerciseId: string,
  demoUrl?: string | null,
) => {
  return getOfflineVideoKey(
    'gym-exercise',
    `${exerciseId}|${demoUrl || ''}`,
  );
};