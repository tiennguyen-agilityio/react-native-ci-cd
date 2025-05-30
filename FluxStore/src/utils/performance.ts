import {User} from '@/interfaces';
import perf, {FirebasePerformanceTypes} from '@react-native-firebase/perf';
import crashlytics from '@react-native-firebase/crashlytics';

interface CustomTraceReturn {
  trace: FirebasePerformanceTypes.Trace;
  traceStop: () => Promise<null>;
}

export const customTrace = async (name: string): Promise<CustomTraceReturn> => {
  const trace = await perf().newTrace(name);
  await trace.start();

  return {
    trace,
    traceStop: () => trace.stop(),
  };
};

export const mockCrashlyticLogin = async (user: User) => {
  crashlytics().log('User mock crash app.');
  await Promise.all([
    crashlytics().setUserId(user.id),
    crashlytics().setAttributes({
      email: user.email,
      username: user.name,
    }),
  ]);
  return crashlytics().crash();
};
