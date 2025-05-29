import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Platform} from 'react-native';

export const handleGetDeviceToken = async () => {
  try {
    const token = await messaging().getToken();

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
