import perf, {FirebasePerformanceTypes} from '@react-native-firebase/perf';

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
