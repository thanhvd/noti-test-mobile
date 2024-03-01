import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Images from '../../images/Images';

const NotificationButton = ({
  navigation,
  btnStyle,
}) => {

  const gotoNotifications = () => {
    navigation.navigate("Noti");
  };

  return (
    <TouchableOpacity onPress={gotoNotifications} style={btnStyle}>
      <View>
        <View style={styles.btn} >
          <Image source={Images.notificationIcon} style={styles.notiIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default NotificationButton;
