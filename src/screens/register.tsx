import React, { useState} from 'react';
import {View, 
  ImageBackground,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import axios from '../../node_modules/axios/index';
import {useGlobalStore} from '../stores/global';
import { getUniqueId } from 'react-native-device-info';
import Images from '../images/Images';
import PrimaryButton from '../components/Button/PrimaryButon';
import TextComponent from '../components/Text/Text';
import PasswordField from '../components/PasswordField/PasswordField';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LoginScreen({ navigation }) {
  const {fcmToken} = useGlobalStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async() => {
    try {
      const result = await axios.post('https://notiapi.toidoc.io/notification-core/v1/user/create', {
        email: email.toLowerCase(),
        password,
        guid: await getUniqueId(),
        phoneNumber, 
        username: userName
      });

      navigation.navigate('Login');

    } catch (e) {
      Alert.alert('Information',
      'You register unsuccessfully !', [
        {
          text: 'OK',
          style: 'ok',
        },
      ]);
    }
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
        onPress={() => {navigation.navigate("Login")}}>
          <Image source={Images.btnBack} style={{
            height: 40
          }}/>
        </TouchableOpacity>
      
      <View style={{marginTop: 50}}>
        <TextComponent text={'Name'} />
        <TextInput
          style={[
            styles.textInput
          ]}
          onChangeText={setUserName}/>
      </View>
      <View style={{marginTop: 20}}>
        <TextComponent text={'Email'} />
        <TextInput
          style={[
            styles.textInput
          ]}
          onChangeText={setEmail}/>
      </View>
      <View style={{marginTop: 20}}>
        <TextComponent text={'Phone number'} />
        <TextInput
          style={[
            styles.textInput
          ]}
          onChangeText={setPhoneNumber}/>
      </View>
      <View style={{marginTop: 20}}>
        <TextComponent text={'Password'} />
        <PasswordField changeValue={setPassword}/>
      </View>
      <PrimaryButton
        text={'Submit'}
        btnStyle={styles.btnStyle}
        onPress={handleSubmit}
      />
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
});

export default LoginScreen;
