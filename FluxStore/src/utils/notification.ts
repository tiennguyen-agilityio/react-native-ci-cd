import {getApp} from '@react-native-firebase/app';
import {getMessaging} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {CHANNEL_NOTIFICATION, LINKING_URLS} from '@/constants';
import {DeepLinkData} from '@/interfaces';

/**
 * Builds a deep link URL from the provided notification data.
 *
 * This function extracts the `navigationId` and `postId` from the notification
 * data and constructs a URL based on these values. If the `navigationId` is
 * "browse", it returns the browse link. If a valid `postId` is provided, it
 * returns the product detail link for that post. Otherwise, it defaults to
 * the home link.
 *
 * @param data - An object containing the notification data, which may include
 * `navigationId` and `postId` properties.
 *
 * @returns A string representing the deep link URL based on the notification
 * data, or null if a URL cannot be constructed.
 */
export const buildDeepLinkFromNotificationData = (data?: DeepLinkData): string | null => {
  const {id, isProductList} = data || {};
  if (typeof id === 'string') {
    return LINKING_URLS.PRODUCT_DETAIL(id);
  } else if (isProductList) {
    return LINKING_URLS.PRODUCTS;
  }

  return LINKING_URLS.HOME;
};

/**
 * Retrieves the current device's FCM token for push notifications.
 *
 * Uses Firebase Cloud Messaging to get a unique token for the device, which can be
 * used to send targeted notifications from a server.
 *
 * @returns A Promise that resolves to the FCM token as a string, or `undefined` if it fails.
 */
export const getDeviceToken = async () => {
  try {
    const messagingInstance = getMessaging(getApp());
    const token = await messagingInstance.getToken();

    console.log('Token', token);
    return token;
  } catch (error) {
    console.log('Error getting FCM Token', error);
  }
};

/**
 * Creates a notification channel for Android.
 *
 * Android requires notification channels for push/local notifications.
 * This function sets up a high-importance default channel if on Android.
 * No-op on iOS, as channels are Android-specific.
 */
export const createNotificationChannel = async () => {
  // if (Platform.OS !== 'android') return;
  await notifee.createChannel({
    id: CHANNEL_NOTIFICATION.DEFAULT.id,
    name: CHANNEL_NOTIFICATION.DEFAULT.name,
    importance: AndroidImportance.HIGH,
  });
};
