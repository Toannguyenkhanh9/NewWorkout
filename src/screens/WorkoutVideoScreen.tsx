// FILE: src/screens/WorkoutVideoScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { WebView } from 'react-native-webview';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

import { markWorkoutCompleted } from '../services/gamification';
import { markWorkoutActivity } from '../notifications/reminder';

type RootStackParamList = {
  WorkoutVideo: {
    programId: string;
    dayId: string;
    videoUrl: string;
    sessionKey: string;
    name: string;
  };
};

type WorkoutVideoRouteProp = RouteProp<
  RootStackParamList,
  'WorkoutVideo'
>;

export const WorkoutVideoScreen: React.FC = () => {
  useKeepAwake();

  const { t } = useTranslation();
  const route = useRoute<WorkoutVideoRouteProp>();

  const { videoUrl, name } = route.params;

  const [completed, setCompleted] = React.useState(false);

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
      await markWorkoutCompleted(25);

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

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        source={{ uri: 'file:///android_asset/' + videoUrl }}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        allowsInlineMediaPlayback
      />

      <Text style={styles.workoutName}>
        {name}
      </Text>

      <Text style={styles.helper}>
        {t('video.play', 'Start workout')}
      </Text>

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
  workoutName: {
    marginTop: 16,
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: '600',
  },
  helper: {
    marginTop: 4,
    color: '#9CA3AF',
    fontSize: 13,
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
});

export default WorkoutVideoScreen;