import perf from '@react-native-firebase/perf';

export const customTrace = async (name: string, callback: () => void) => {
  const trace = await perf().newTrace(name);
  await trace.start();

  await callback();

  await trace.stop();
};
