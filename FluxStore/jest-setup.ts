import '@testing-library/react-native';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {Gesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
    GestureDetector: ({children}: {children: Element}) => children,
    Gesture: {
      Tap: () => ({
        onStart: () => {},
        onBegin: () => {},
        onEnd: () => {},
        onFinalize: () => {},
        runOnJS: () => {},
      }),
      LongPress: () => ({
        onStart: () => {},
        onBegin: () => {},
        onEnd: () => {},
        onFinalize: () => {},
        runOnJS: () => {},
      }),
      Pan: () => ({
        onStart: () => {},
        onBegin: () => {},
        onEnd: () => {},
        onFinalize: () => {},
        runOnJS: () => {},
      }),
      Simultaneous: (gesture: Gesture) => gesture,
    },
  };
});

// Mock Firebase
jest.mock('@react-native-firebase/app', () => {
  return {
    firebase: {
      app: jest.fn(() => ({
        messaging: jest.fn(),
      })),
    },
  };
});

jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    requestPermission: jest.fn(),
    getToken: jest.fn(),
    onMessage: jest.fn(),
    setBackgroundMessageHandler: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(),
  });
});

// Mock Notifee
jest.mock('@notifee/react-native', () => ({
  requestPermission: jest.fn(),
  createChannel: jest.fn(),
  displayNotification: jest.fn(),
  onForegroundEvent: jest.fn(),
  getNotificationSettings: jest.fn(() =>
    Promise.resolve({
      authorizationStatus: 1,
    }),
  ),
}));

jest.mock('@react-native-firebase/perf', () => {
  const startTraceMock = jest.fn(async () => ({
    stop: jest.fn(),
  }));

  const perfMock = jest.fn(() => ({
    startTrace: startTraceMock,
    newHttpMetric: jest.fn(() => ({
      start: jest.fn(),
      stop: jest.fn(),
      setHttpResponseCode: jest.fn(),
      setRequestPayloadSize: jest.fn(),
      setResponseContentType: jest.fn(),
      setResponsePayloadSize: jest.fn(),
      putAttribute: jest.fn(),
    })),
  }));

  return {
    __esModule: true,
    default: perfMock,
    FirebasePerformanceTypes: {},
  };
});

jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    log: jest.fn(),
    recordError: jest.fn(),
    setUserId: jest.fn(),
    setAttribute: jest.fn(),
    setAttributes: jest.fn(),
    crash: jest.fn(),
    isCrashlyticsCollectionEnabled: true,
    setCrashlyticsCollectionEnabled: jest.fn(),
  });
});
