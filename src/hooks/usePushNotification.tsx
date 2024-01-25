import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {logNotificationEvent} from '../services/logger';

const usePushNotification = () => {
  /**
   * requestUserPermissionHandler: this function basically asks the user for permissions to receive push notifications.
   * In iOS is required you ask them, but on Android API level 32 and below, you do not need to request user permission, you have to ask in API level 33+.
   */
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      //Request iOS permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      //Request Android permission (For API level 33+, for 32 or below is not required)
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  /**
   * getFCMToken: with this function we get the device push token of the current device.
   */
  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  /**
   * listenToForegroundNotifications: this function listen for notifications, whenever a notifications is received with the app opened and in view (foreground).
   * @returns
   */
  const listenToForegroundNotifications = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      logNotificationEvent('listenToForegroundNotifications', {
        message: JSON.stringify(remoteMessage),
        description: 'A new message arrived! (FOREGROUND)',
        platform: Platform.OS,
      });
    });
    return unsubscribe;
  };

  /**
   * listenToBackgroundNotifications: this function listen for notifications, whenever a notifications is received with the app opened and in background (in homescreen or in other app).
   * @returns
   */
  const listenToBackgroundNotifications = async () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        logNotificationEvent('listenToBackgroundNotifications', {
          message: JSON.stringify(remoteMessage),
          description: 'A new message arrived! (BACKGROUND)',
          platform: Platform.OS,
        });
      },
    );
    return unsubscribe;
  };

  /**
   * onNotificationOpenedAppFromBackground: when a notification is arrived and the app is in background, if the user opens the app by tapping the notification, the callback of this function is going to be executed.
   * @returns
   */
  const onNotificationOpenedAppFromBackground = async () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        logNotificationEvent('onNotificationOpenedAppFromBackground', {
          message: JSON.stringify(remoteMessage),
          description: 'App opened from BACKGROUND by tapping notification',
          platform: Platform.OS,
        });
      },
    );
    return unsubscribe;
  };

  /**
   * onNotificationOpenedAppFromQuit: when a notification is arrived and the app is in closed (quit), if the user opens the app by tapping the notification, this function receives the notification, and you can do whatever you want with the data.
   */
  const onNotificationOpenedAppFromQuit = async () => {
    const message = await messaging().getInitialNotification();

    if (message) {
      logNotificationEvent('onNotificationOpenedAppFromQuit', {
        message: JSON.stringify(message),
        description: 'App opened from QUIT by tapping notification',
        platform: Platform.OS,
      });
    }
  };

  return {
    requestUserPermission,
    getFCMToken,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  };
};

export default usePushNotification;
