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
import {useGlobalStore} from '../stores/global';
import { getUniqueId } from 'react-native-device-info';
import Images from '../images/Images';
import NotificationButton from '../components/Button/NotificationButton';
import PrimaryButton from '../components/Button/PrimaryButon';
import SecondaryButton from '../components/Button/SecondaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const AuthContext = React.createContext();

const HomeScreen = ({navigation}) => {

  // React.useEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: '',
  //     headerRight: () => (
  //       <NotificationButton navigation={navigation} />
  //     ),
  //   });
  // }, [navigation]);

  const handleLogout = async() => {
    await AsyncStorage.setItem('login', null);
    await AsyncStorage.setItem('profile', '');
    await AsyncStorage.setItem('userId', null);
    navigation.pop();
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
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
      }}/>
        <NotificationButton navigation={navigation} btnStyle={styles.notiStyle}/>
        <Text style={{
          fontSize: 28,
          fontWeight: '700',
          color: '#fff',
        }}>Welcome to Demo App !</Text>
        <View style={styles.boxButton}>
          <SecondaryButton
            text={'Config Notificationn'}
            style={styles.btnStyle}
            onPress={() => {
              navigation.navigate("ConfigNoti")
            }} />
          <SecondaryButton
            text={'Logout'}
            style={styles.btnStyle}
            onPress={handleLogout} />
        </View>
          
    </View>
  );
};

const styles = StyleSheet.create({
  boxButton: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 50,
  },
  btnStyle: {
    width: 300,
    height: 50,
    marginTop: 20,
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
  },
  notiStyle: {
    position: 'absolute',
    top: 70,
    right: 20,
    bottom: 0,
    // left: 0,
  }
});

export default HomeScreen;
