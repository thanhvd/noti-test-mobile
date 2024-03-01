import React, {useEffect, useState} from 'react';
import {View, 
  Text, 
  TouchableOpacity, 
  Platform,
  ImageBackground,
  StyleSheet,
  TextInput,
  Alert} from 'react-native';
import axios from '../../node_modules/axios/index';
import usePushNotification from '../hooks/usePushNotification';
import {useGlobalStore} from '../stores/global';
import { getUniqueId } from 'react-native-device-info';
import Images from '../images/Images';
import PrimaryButton from '../components/Button/PrimaryButon';
import TextComponent from '../components/Text/Text';
import PasswordField from '../components/PasswordField/PasswordField';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({ navigation }) {
  const {fcmToken} = useGlobalStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {

    const saveDeviceId = async() => {
      axios.post('https://notiapi.toidoc.io/notification-core/v1/user/token/save', {
        guid: await getUniqueId(),
        token: await getFCMToken(),
        platform: Platform.OS.toUpperCase(),
      })
    }

    const listenToNotifications = async() => {
      try {
        await requestUserPermission();
        await getFCMToken();
        
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
        saveDeviceId();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
    
  }, []);

  const handleLogin = async() => {
    try {
      const result = await axios.post('https://notiapi.toidoc.io/notification-core/v1/auth/login', {
        email: email.toLowerCase(),
        password
      },{
        headers: {
            'guid': await getUniqueId(),
            'token': fcmToken,
        }
      });
      console.log('profile data ==>', result);
      await AsyncStorage.setItem('login', 'true');
      await AsyncStorage.setItem('profile', JSON.stringify(result.data));
      await AsyncStorage.setItem('userId', JSON.stringify(result.data?.data?.id));

      navigation.navigate('Home');

    } catch (e) {
      Alert.alert('Information',
      'You cannot login !', [
        {
          text: 'OK',
          style: 'ok',
        },
      ]);
    }
  }

  const handleRegister = () => {
    navigation.navigate("Register");
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground 
        source={Images.bg2}
        resizeMode="cover"
        style={{
          height: 200,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
      }}/>
      <View style={{marginTop: 50}}>
        <TextComponent text={'Email'} />
        <TextInput
          style={[
            styles.textInput
          ]}
          onChangeText={setEmail}/>
      </View>
      <View style={{marginTop: 20}}>
        <TextComponent text={'Password'} />
        <PasswordField changeValue={setPassword}/>
      </View>
      <PrimaryButton
        text={'Login'}
        btnStyle={styles.btnStyle}
        onPress={handleLogin}
      />
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <TextComponent 
          text={`Don't have an account ? `}
          style={{height: 40}}/>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={copyToClipboard}>
        <Text>Click here to copy FCM Token to Clipboard</Text>
        <Text>FCM Token: {fcmToken}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    width: 300,
    height: 50,
    marginTop: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E6E8EC',
    height: 48,
    width: 300,
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  register: {
    color: '#3B71FE',
    fontWeight: '700',
    fontSize: 14,
  }
});

export default LoginScreen;
