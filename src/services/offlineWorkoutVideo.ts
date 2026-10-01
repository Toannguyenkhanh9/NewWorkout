// FILE: src/services/offlineWorkoutVideo.ts
import ReactNativeBlobUtil
  from 'react-native-blob-util';
import AsyncStorage
  from '@react-native-async-storage/async-storage';

const OFFLINE_VIDEO_KEY =
  'offlineWorkoutVideos:v1';

const VIDEO_DIR =
  `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/workout-videos`;

export type OfflineVideoMap =
  Record<string, string>;

const CDN_BASE =
  'https://insanity-workouts-cdn.b-cdn.net';

const BUNNY_VIDEO_MAP:
Record<string, string> = {
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

const ensureVideoDir =
  async () => {
    const exists =
      await ReactNativeBlobUtil
        .fs
        .exists(
          VIDEO_DIR,
        );

    if (!exists) {
      await ReactNativeBlobUtil
        .fs
        .mkdir(
          VIDEO_DIR,
        );
    }
  };

const hashText = (
  text:
    string,
) => {
  let hash = 0;

  for (
    let index = 0;
    index < text.length;
    index += 1
  ) {
    hash =
      (
        hash << 5
      ) -
      hash +
      text.charCodeAt(
        index,
      );

    hash |= 0;
  }

  return Math.abs(
    hash,
  ).toString(36);
};

const safeFileName = (
  key:
    string,
) =>
  `${hashText(key)}.mp4`;

const normalize = (
  value:
    | string
    | undefined
    | null,
) =>
  String(
    value || '',
  ).trim();

const removeFileIfExists =
  async (
    path:
      string,
  ) => {
    try {
      const exists =
        await ReactNativeBlobUtil
          .fs
          .exists(
            path,
          );

      if (exists) {
        await ReactNativeBlobUtil
          .fs
          .unlink(
            path,
          );
      }
    } catch {}
  };

const getErrorMessage = (
  error:
    unknown,
) => {
  if (
    error instanceof Error
  ) {
    return error.message;
  }

  if (
    error &&
    typeof error ===
      'object' &&
    'message' in error
  ) {
    return String(
      (
        error as {
          message?: unknown;
        }
      ).message ||
        '',
    );
  }

  return String(
    error ||
      'Unable to download video.',
  );
};

export const getOfflineVideoKey = (
  programId:
    string,
  videoUrl:
    string,
) =>
  `${normalize(programId)}|${normalize(videoUrl)}`;

export const getWorkoutDownloadUrl = (
  programId:
    string,
  videoUrl:
    string,
) => {
  const key =
    getOfflineVideoKey(
      programId,
      videoUrl,
    );

  return (
    BUNNY_VIDEO_MAP[
      key
    ] ||
    null
  );
};

export const loadOfflineVideos =
  async (): Promise<OfflineVideoMap> => {
    try {
      const raw =
        await AsyncStorage
          .getItem(
            OFFLINE_VIDEO_KEY,
          );

      if (!raw) {
        return {};
      }

      const parsed =
        JSON.parse(
          raw,
        );

      if (
        !parsed ||
        typeof parsed !==
          'object' ||
        Array.isArray(
          parsed,
        )
      ) {
        return {};
      }

      return parsed as OfflineVideoMap;
    } catch {
      return {};
    }
  };

const saveOfflineVideos =
  async (
    map:
      OfflineVideoMap,
  ) => {
    await AsyncStorage
      .setItem(
        OFFLINE_VIDEO_KEY,
        JSON.stringify(
          map,
        ),
      );
  };

export const getOfflineVideoPath =
  async (
    offlineKey:
      string,
  ): Promise<string | null> => {
    try {
      const map =
        await loadOfflineVideos();

      const path =
        map[
          offlineKey
        ];

      if (!path) {
        return null;
      }

      const exists =
        await ReactNativeBlobUtil
          .fs
          .exists(
            path,
          );

      if (!exists) {
        delete map[
          offlineKey
        ];

        await saveOfflineVideos(
          map,
        );

        return null;
      }

      return path;
    } catch {
      return null;
    }
  };

export const getOfflineVideoSizeText =
  async (
    offlineKey:
      string,
  ) => {
    try {
      const path =
        await getOfflineVideoPath(
          offlineKey,
        );

      if (!path) {
        return null;
      }

      const stat =
        await ReactNativeBlobUtil
          .fs
          .stat(
            path,
          );

      const size =
        Number(
          stat.size ||
          0,
        );

      if (
        size >=
        1024 *
          1024 *
          1024
      ) {
        return `${
          (
            size /
            1024 /
            1024 /
            1024
          ).toFixed(2)
        } GB`;
      }

      return `${
        (
          size /
          1024 /
          1024
        ).toFixed(1)
      } MB`;
    } catch {
      return null;
    }
  };

export const downloadWorkoutVideo =
  async (
    offlineKey:
      string,
    downloadUrl:
      string,
    onProgress?: (
      progress:
        number,
    ) => void,
  ) => {
    const url =
      normalize(
        downloadUrl,
      );

    if (!url) {
      throw new Error(
        'Download URL is empty.',
      );
    }

    await ensureVideoDir();

    const filePath =
      `${VIDEO_DIR}/${safeFileName(offlineKey)}`;

    const exists =
      await ReactNativeBlobUtil
        .fs
        .exists(
          filePath,
        );

    if (exists) {
      const map =
        await loadOfflineVideos();

      map[
        offlineKey
      ] =
        filePath;

      await saveOfflineVideos(
        map,
      );

      onProgress?.(
        100,
      );

      return filePath;
    }

    console.log(
      `[offline video] start ${JSON.stringify({
        url,
        filePath,
        offlineKey,
      })}`,
    );

    try {
      /**
       * Giữ đúng cấu hình đang hoạt động trong GymForge:
       * - tải trực tiếp vào filePath
       * - fileCache: true
       * - không thêm custom header
       * - không dùng file .part
       * - không ép followRedirect / overwrite
       */
      const task =
        ReactNativeBlobUtil
          .config({
            path:
              filePath,
            fileCache:
              true,
          })
          .fetch(
            'GET',
            url,
          );

      task.progress(
        {
          interval:
            250,
        },
        (
          received,
          total,
        ) => {
          const totalNumber =
            Number(
              total,
            );

          const receivedNumber =
            Number(
              received,
            );

          if (
            !totalNumber ||
            totalNumber <= 0
          ) {
            return;
          }

          const percent =
            Math.round(
              (
                receivedNumber /
                totalNumber
              ) *
                100,
            );

          onProgress?.(
            Math.min(
              100,
              Math.max(
                0,
                percent,
              ),
            ),
          );
        },
      );

      const response =
        await task;

      const info =
        response.info();

      const status =
        Number(
          info.status ||
          0,
        );

      console.log(
        `[offline video] response ${JSON.stringify({
          status,
          path:
            response.path(),
          url,
        })}`,
      );

      if (
        status >= 400 ||
        (
          status > 0 &&
          status < 200
        )
      ) {
        await removeFileIfExists(
          filePath,
        );

        throw new Error(
          `Download failed: ${status}`,
        );
      }

      const downloadedExists =
        await ReactNativeBlobUtil
          .fs
          .exists(
            filePath,
          );

      if (!downloadedExists) {
        throw new Error(
          'Downloaded file was not created.',
        );
      }

      const map =
        await loadOfflineVideos();

      map[
        offlineKey
      ] =
        filePath;

      await saveOfflineVideos(
        map,
      );

      onProgress?.(
        100,
      );

      console.log(
        `[offline video] completed ${JSON.stringify({
          filePath,
          offlineKey,
        })}`,
      );

      return filePath;
    } catch (error) {
      await removeFileIfExists(
        filePath,
      );

      const message =
        getErrorMessage(
          error,
        );

      console.log(
        `[offline video] failed ${JSON.stringify({
          message,
          url,
          filePath,
          offlineKey,
        })}`,
      );

      throw new Error(
        message,
      );
    }
  };

export const getGymExerciseOfflineKey = (
  exerciseId:
    string,
  demoUrl?:
    | string
    | null,
) =>
  getOfflineVideoKey(
    'gym-exercise',
    `${exerciseId}|${demoUrl || ''}`,
  );