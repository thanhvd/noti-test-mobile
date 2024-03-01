import React, {useEffect, useState} from 'react';
import {View, 
  TouchableOpacity, 
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from '../../node_modules/axios/index';
import Images from '../images/Images';
import NotiItem from '../components/notification/NotiItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const AuthContext = React.createContext();

const NotiScreen = ({navigation}) => {

  const [dataNoti, setDataNoti] = useState([]);

  useEffect(() => {
    const getListNoti = async() => {
      const userId = await AsyncStorage.getItem('userId');
      const result = await axios.get(`https://notiapi.toidoc.io/notification-core/v1/user/${userId}/messages`);
      console.log("List message: ", result?.data?.data);
      setDataNoti(result?.data?.data);
    }
    getListNoti();
  }, []);

  const refreshData = async() => {
    const userId = await AsyncStorage.getItem('userId');
    const result = await axios.get(`https://notiapi.toidoc.io/notification-core/v1/user/${userId}/messages`);
    console.log("List message: ", result?.data?.data);
    setDataNoti(result?.data?.data);
  }

  const renderItem = ({item}) => {
    return <NotiItem item={item} refreshData={refreshData} />;
  };

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
        <ImageBackground 
        source={Images.bg2}
        resizeMode="cover"
        style={{
          height: 110,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
      }}/>
        <TouchableOpacity style ={{
              position: 'absolute',
              top: 60,
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
        <View style={{marginHorizontal: 20, marginTop: 115, flexWrap: 'wrap',}}>
        <FlatList
            data={dataNoti}
            keyExtractor={(item, index) => `${item?.id}`}
            renderItem={renderItem}
            // ItemSeparatorComponent={<View style={styles.ItemSeparator} />}
            // ListFooterComponent={<View style={styles.menuBottom} />}
            showsVerticalScrollIndicator={true}
          />
          {/* {dataNoti && dataNoti?.map((item, i) => (
            <NotiItem
              key={i}
              item={item}
              refreshData={refreshData}
            />
          ))} */}
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

export default NotiScreen;
