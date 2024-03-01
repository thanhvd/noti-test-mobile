import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from '../../../node_modules/axios/index';
import Images from '../../images/Images';
import TextComponent from '../Text/Text';

const NotiItem = ({
  item,
  refreshData,
}) => {

  const readNoti = async() => {
    try {
      await axios.get(`https://notiapi.toidoc.io/notification-core/v1/user/message/${item?.id}/read`);
      refreshData();
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <TouchableOpacity onPress={readNoti}>
      <View style={styles.content}>
        <Image source={Images.settingIcon} style={styles.icon} resizeMode="contain" />
        <View style={styles.column}>
          <TextComponent
              text={item?.titleMessage}
              style={[styles.title, item?.status === 'READ' && styles.textColorLabel]}
            />
          <TextComponent
            text={item?.contentMessage}
            style={styles.label}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#E6E8EC',
    marginTop: 20,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 8,
  },
  column: {
    flexDirection: 'column',
  },
  title: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    color: '#000',
    marginBottom: 4,
  },
  textColorLabel: {
    color: '#B5B5B5',
  },
  label: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    color: '#B5B5B5',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  });

export default NotiItem;
