/**
 * @format
 */

import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {logNotificationEvent} from './src/services/logger';
import AppFake from './src/AppFake';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  console.log('notifee.onBackgroundEvent', {type, detail});
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API
    // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //   method: 'POST',
    // });
    // // Remove the notification
    // await notifee.cancelNotification(notification.id);
  }
});

// Handle background messages using setBackgroundMessageHandler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  logNotificationEvent('listenToQuitNotifications', {
    message: JSON.stringify(remoteMessage),
    description: 'A new message arrived! (QUIT)',
    platform: Platform.OS,
  });
});

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return <AppFake />;
  }

  // Render the app component on foreground launch
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
