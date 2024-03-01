import React, {useState, useMemo, useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import PrimaryButton from './PrimaryButon';
import Images from '../../images/Images';
import Button from './Button';
import navigator from '../../commons/navigator';
import * as Api from '../../api/api';
import SessionStore from '../../stores/SessionStore';

const ButtonViewAds = ({componentId, btnStyle, btnText, onPressViewAds}) => {
  const [waitTime, setWaitTime] = useState(0);

  useEffect(() => {
    const getWaitTime = async () => {
      const result = await Api.customer.get({
        url: '/customer/video/watch/remain-time',
      });

      setWaitTime(result.data);
    };

    if (SessionStore.isLoggedIn) {
      getWaitTime();
    }
  }, [SessionStore.isLoggedIn]);

  const theme = useTheme();
  const styles = useMemo(() => {
    return stylesConfig(theme);
  }, [theme]);

  return waitTime > 0 ? (
    <Button style={[styles.btnWait, btnStyle]} onPress={() => {}}>
      <Image source={Images.clock} style={styles.clock} />
      <Text style={styles.wait}>Chờ</Text>
      <CountDown
        until={waitTime}
        onFinish={() => {
          setWaitTime(0);
        }}
        size={15}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{h: '', m: '', s: ''}}
        digitStyle={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          width: 20,
        }}
        showSeparator={true}
        digitTxtStyle={{color: theme?.colors?.text?.main}}
        separatorStyle={{color: theme?.colors?.text?.main}}
        onPress={() => {}}
      />
    </Button>
  ) : (
    <PrimaryButton
      text={btnText || 'Nhận thêm vé vàng'}
      btnStyle={btnStyle}
      onPress={onPressViewAds}
    />
  );
};

const stylesConfig = theme =>
  StyleSheet.create({
    btnWait: {
      height: 44,
      backgroundColor: theme?.colors?.background?.story8,
      borderRadius: 8,
    },
    clock: {
      width: 20,
      height: 20,
    },
    wait: {
      fontSize: 15,
      fontWeight: 'bold',
      color: theme?.colors?.text.main,
      marginRight: 2,
      marginLeft: 8,
    },
  });

export default ButtonViewAds;
