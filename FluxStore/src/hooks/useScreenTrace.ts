import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import perf, {FirebasePerformanceTypes} from '@react-native-firebase/perf';

// Interfaces
import {SCREENS} from '@/interfaces';
import {Platform} from 'react-native';

export const useScreenTrace = (screenName: SCREENS) => {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'ios') {
        return;
      }

      let trace: FirebasePerformanceTypes.ScreenTrace | null = null;

      const start = async () => {
        try {
          trace = await perf().startScreenTrace(screenName);
        } catch (e) {
          console.warn(`Start Screen ${screenName} Trace  failed`, e);
        }
      };

      const stop = async () => {
        if (trace) {
          try {
            await trace.stop();
          } catch (e) {
            console.warn(`End Screen ${screenName} Trace  failed`, e);
          }
        }
      };

      start();

      return () => {
        stop();
      };
    }, [screenName]),
  );
};
