import {User} from '@/interfaces';
import perf, {FirebasePerformanceTypes} from '@react-native-firebase/perf';
import crashlytics from '@react-native-firebase/crashlytics';

interface CustomTraceReturn {
  trace: FirebasePerformanceTypes.Trace;
  traceStop: () => Promise<null>;
}

/**
 * Starts a custom Firebase Performance Monitoring trace.
 *
 * - Creates a new performance trace with the given name.
 * - Starts the trace and returns a reference along with a stop function.
 *
 * @param name - The name of the custom trace.
 * @returns An object containing the trace instance and a `traceStop` method to stop it.
 */
export const customTrace = async (name: string): Promise<CustomTraceReturn> => {
  const trace = await perf().newTrace(name);
  await trace.start();

  return {
    trace,
    traceStop: () => trace.stop(),
  };
};

/**
 * Simulates a crash in the app and logs user info to Firebase Crashlytics.
 *
 * - Logs a message indicating a mock crash.
 * - Sets user ID and attributes (email, username) for Crashlytics context.
 * - Triggers a deliberate crash (useful for testing Crashlytics setup).
 *
 * @param user - The user object containing `id`, `email`, and `name` fields.
 * @returns A promise that resolves when the crash is triggered.
 */
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
