import axios from 'axios';
import { Validator } from 'react';
import { getUniqueId } from 'react-native-device-info';
import {
  Alert,
} from 'react-native';

export const logNotificationEvent = async(
  eventName: string,
  data1: {
    message: string;
    platform: string;
    description?: string;
  },
) => {
  console.group(`Event: ${eventName}`);
  if (data1.description) {
    console.log(`Description: ${data1.description}`);
  }
  console.log(`Platform: ${data1.platform}`);
  console.log(`Message: ${data1.message}`);
  console.groupEnd();
  var bodyData = JSON.parse(data1.message);
  console.log(`bodyData: ${bodyData?.data}`);

  axios.get(`https://notiapi.toidoc.io/notification-core/v1/user/push/noti/log/received?key=${bodyData?.data?.key}`,{
    headers: {
        'guid': await getUniqueId(),
    }
  });

  if (eventName === 'listenToForegroundNotifications') {
    Alert.alert(bodyData?.notification?.title,
      bodyData?.notification?.body, [
      {
        text: 'OK',
        style: 'ok',
      },
    ]);
  }
  
};
