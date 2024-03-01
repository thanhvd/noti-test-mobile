import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import RegisterScreen from './screens/register';
import NotiScreen from './screens/notification';
import ConfigNotiScreen from './screens/confignoti';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {

  const [isLogin, setIsLogin] = useState('');

  useEffect(() => {
    const getLoginStatus = async() => {
      setIsLogin(await AsyncStorage.getItem('login'));
    }
    getLoginStatus();
    console.log('Logi status: ', isLogin);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Noti" component={NotiScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ConfigNoti" component={ConfigNotiScreen} options={{headerShown: false}}/>
      {/* {isLogin== null ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </>
      )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
