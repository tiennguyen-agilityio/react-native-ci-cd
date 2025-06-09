import type {LinkingOptions} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {Linking} from 'react-native';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Constants
import {CHANNEL_NOTIFICATION, LINKING_URLS, PATH_PREFIX} from '@/constants';

// Stores
import {useAuthStore, useDeepLinkStore} from '@/stores';

// Utils
import {buildDeepLinkFromNotificationData, getDeviceToken} from '@/utils';

const subscribe = (listener: (url: string) => void) => {
  const onReceiveURL = ({url}: {url: string}) => listener(url);

  // Listen to incoming links from deep linking
  const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

  // onNotificationOpenedApp: When the application is running, but in the background.
  const unsubscribeBackground = messaging().onNotificationOpenedApp(message => {
    const url = buildDeepLinkFromNotificationData(message?.data);

    if (typeof url === 'string') {
      listener(url);
    }
  });

  // onMessage: When the application is in the foreground.
  messaging().onMessage(async remoteMessage => {
    if (remoteMessage.notification) {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId: CHANNEL_NOTIFICATION.DEFAULT.id,
          smallIcon: 'ic_notification',
          pressAction: {
            id: CHANNEL_NOTIFICATION.DEFAULT.id,
          },
          importance: AndroidImportance.HIGH,
          showTimestamp: true,
        },
        data: remoteMessage.data,
      });
    }
  });

  // Listen for notification click event (foreground)
  const unsubscribeForeground = notifee.onForegroundEvent(({type, detail: {notification}}) => {
    if (type === EventType.PRESS) {
      const url = buildDeepLinkFromNotificationData(notification?.data);

      if (typeof url === 'string') {
        listener(url);
      }
    }
  });

  return () => {
    linkingSubscription.remove();
    unsubscribeBackground();
    unsubscribeForeground();
  };
};

const getInitialURL = async () => {
  getDeviceToken();
  const {isAuthenticated} = useAuthStore.getState();
  const {setPendingDeepLink} = useDeepLinkStore.getState();
  const url = await Linking.getInitialURL();

  if (url) {
    if (!isAuthenticated) {
      setPendingDeepLink(url);
      return null;
    }

    return url;
  }

  const message = await messaging().getInitialNotification();

  if (message) {
    const deepLink = buildDeepLinkFromNotificationData(message?.data);
    if (deepLink) {
      if (!isAuthenticated) {
        setPendingDeepLink(deepLink);
        return null;
      }
      return deepLink;
    }
  }

  return null;
};

export const linking: LinkingOptions<AppStackParamList> = {
  prefixes: [LINKING_URLS.BASE],
  config: {
    screens: {
      [SCREENS.TABS]: {
        screens: {
          [SCREENS.HOME]: 'home',
        },
      },

      [SCREENS.PRODUCT_STACK]: {
        screens: {
          [SCREENS.PRODUCTS]: 'products',
          [SCREENS.PRODUCT_DETAIL]: 'product/:id',
        },
      },
    },
  },
  subscribe,
  getInitialURL,
};

export const parseDeepLink = (url: string) => {
  const regex = new RegExp(`${PATH_PREFIX}([^/]+)\\/?(\\d+)?`);
  const match = url.match(regex);
  if (!match) return null;

  const screen = match[1];
  const id = match[2];

  switch (screen) {
    case SCREENS.PRODUCTS:
      return {
        stack: SCREENS.PRODUCT_STACK,
        screen: SCREENS.PRODUCTS,
      };

    case SCREENS.PRODUCT_DETAIL:
      return {
        stack: SCREENS.PRODUCT_STACK,
        screen: SCREENS.PRODUCT_DETAIL,
        params: {id},
      };
    default:
      return null;
  }
};
