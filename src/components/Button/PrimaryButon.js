import React from 'react';
import {StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextComponent from '../Text';
import Button from './Button';


const PrimaryButton = ({
  text,
  btnStyle,
  btnTextStyle,
  icon,
  iconStyle,
  backgroundStyle,
  colors,
  notLinearGradient,
  start,
  end,
  iconStyleRight,
  iconRight,
  onPress,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      showChildren={true}
      onPress={onPress}
      style={[styles.btn, btnStyle, rest.disabled && styles.disabled]}>
      {!notLinearGradient && (
        <LinearGradient
          colors={colors || ['#8554DB', '#51028A']}
          start={start || {x: 0, y: 1}}
          end={end || {x: 1, y: 0}}
          style={[styles.background, backgroundStyle]}
        />
      )}
      {!!icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
      {!!text && (
        <TextComponent text={text} style={[styles.btnText, btnTextStyle]} />
      )}
      {!!iconRight && (
        <Image source={iconRight} style={[styles.icon, iconStyleRight]} />
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: '#ffffff',
  },
  btn: {
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default PrimaryButton;
