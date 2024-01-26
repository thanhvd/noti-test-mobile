import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import usePushNotification from './hooks/usePushNotification';
import {useGlobalStore} from './stores/global';

const App = () => {
  const {fcmToken} = useGlobalStore();
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(fcmToken);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 40,
        }}>
        Push Notification Demo APP
      </Text>
      <TouchableOpacity onPress={copyToClipboard}>
        <Text>Click here to copy FCM Token to Clipboard</Text>
        <Text>FCM Token: {fcmToken}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
