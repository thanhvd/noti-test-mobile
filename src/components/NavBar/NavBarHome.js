import React, {useEffect, useMemo} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Button from '../Button';
import Images from '../../images/Images';

const {width} = Dimensions.get('window');

const NavBarHome = ({
  componentId,
  navigation,
}) => {

  const gotoNotifications = () => {
    navigator.push({
      componentId,
      name: 'com.maple.stories.notifications',
    });
  };

  return (
    <View style={{flexDirection: 'row', marginHorizontal: 20}}>
      <Button
        style={[styles.btnBack]}
        onPress={() => {
          navigation.pop('Login');
        }}>
        <Image source={Images.btnBack} style={styles.backIcon} />
      </Button>
      <TouchableOpacity onPress={gotoNotifications}>
        <View>
          <View style={styles.btn} >
            <Image source={Images.notificationIcon} style={styles.notiIcon} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    btnBack: {
      paddingLeft: 20,
    },
    backIcon: {
      width: 50,
      height: 50,
      marginLeft: -6,
    },
    btn: {
      width: 40,
      height: 40,
      borderRadius: 15,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      position: 'relative',
      zIndex: 999,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    notiIcon: {
      width: 24,
      height: 24,
      color: '#4A5568',
    },
  });

export default NavBarHome;
