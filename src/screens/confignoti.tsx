import React, {useEffect, useState} from 'react';
import {View, 
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import axios from '../../node_modules/axios/index';
import Images from '../images/Images';
import TextComponent from '../components/Text/Text';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ConfigNotiScreen({ navigation }) {
  const [typeEmail, setTypeEmail] = useState('');
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isSendSMS, setIsSendSMS] = useState(false);
  const [isSendPush, setIsSendPush] = useState(false);

  useEffect(() => {
    const getData = async() => {
      const userId = await AsyncStorage.getItem('userId');
      const result = await axios.get(`https://notiapi.toidoc.io/notification-core/v1/user/${userId}/noti/list`);
      console.log('getData: ', result?.data);
      if (result?.data?.data) {
        setTypeEmail(result.data.data.indexOf('EMAIL') !== -1 ? 'EMAIL' : '');
        setIsSendEmail(result.data.data.indexOf('EMAIL') !== -1);
        setIsSendPush(result.data.data.indexOf('PUSH') !== -1);
        setIsSendSMS(result.data.data.indexOf('SMS') !== -1);
      }
    }
    getData();
    
  }, [])
  
  useEffect(() => {
    const settingEmail = async() => {
      const userId = await AsyncStorage.getItem('userId');
      await axios.post(`https://notiapi.toidoc.io/notification-core/v1/user/${userId}/noti/setup`, {
        isSendEmail,
        isSendPush,
        isSendSMS
        });
    }
    settingEmail();
  }, [isSendEmail, isSendPush, isSendSMS]);

  const emailSwitch = (value) => {
    setIsSendEmail(value);
  };
  const pushSwitch = (value) => {
    setIsSendPush(value);
  };

  const smsSwitch = (value) => {
    setIsSendSMS(value);
  };

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground 
        source={Images.bg2}
        resizeMode="cover"
        style={{
          height: 150,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
      }}/>
      <TouchableOpacity style ={{
              position: 'absolute',
              top: 70,
              right: 0,
              bottom: 0,
              left: 20,
              height: 40,
              borderRadius: 40,
              width: 40,
              backgroundColor: '#ffffff',
              alignItems: 'center',
            }}
        onPress={() => {navigation.navigate("Home")}}>
          <Image source={Images.btnBack} style={{
            height: 40
          }}/>
        </TouchableOpacity>
      <View style={{width: '100%', paddingHorizontal: 20, top: 220}}>
        <View style={styles.rowBetween}>
          <TextComponent text={'Allow Push Notification'} />
          <Switch
            trackColor={{false: '#767577', true: '#51028A'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#CCCCCC"
            onValueChange={pushSwitch}
            value={isSendPush}
          />
        </View>
        <View style={styles.rowBetween}>
          <TextComponent text={'Allow Send Email'} />
          <Switch
            trackColor={{false: '#767577', true: '#51028A'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#CCCCCC"
            onValueChange={(val) => emailSwitch(val)}
            value={isSendEmail}
          />
        </View>
        <View style={styles.rowBetween}>
          <TextComponent text={'Allow Send SMS'} />
          <Switch
            trackColor={{false: '#767577', true: '#51028A'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#CCCCCC"
            onValueChange={smsSwitch}
            value={isSendSMS}
          />
        </View>
      </View>
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
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16
  },
});

export default ConfigNotiScreen;
