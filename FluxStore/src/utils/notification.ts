import {Platform} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import {getMessaging} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

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

export const createNotificationChannel = async () => {
  if (Platform.OS !== 'android') return;

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
};
