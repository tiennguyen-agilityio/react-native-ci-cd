import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import perf, {FirebasePerformanceTypes} from '@react-native-firebase/perf';

// Interfaces
import {SCREENS} from '@/interfaces';

export const useScreenTrace = (screenName: SCREENS) => {
  useFocusEffect(
    useCallback(() => {
      let trace: FirebasePerformanceTypes.ScreenTrace | null = null;

      const start = async () => {
        try {
          trace = await perf().startScreenTrace(screenName);
        } catch (e) {
          console.warn('startScreenTrace failed', e);
        }
      };

      const stop = async () => {
        if (trace) {
          try {
            await trace.stop();
          } catch (e) {
            console.warn('stopScreenTrace failed', e);
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
