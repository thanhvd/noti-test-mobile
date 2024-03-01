import React from 'react';
import {StyleSheet, Image} from 'react-native';
import TextComponent from '../Text';
import Button from './Button';

const LinkButton = ({
  styleImg,
  imgRight,
  text,
  textStyle,
  btnStyle,
  disabled,
  imgLeft,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      showChildren={true}
      style={[styles.btn, btnStyle, disabled && {opacity: 0.7}]}
      disabled={disabled}>
      {imgLeft && <Image source={imgLeft} style={styleImg} />}
      <TextComponent text={text} style={[styles.btnText, textStyle]} />
      {imgRight && <Image source={imgRight} style={styleImg} />}
    </Button>
  );
};

const styles = StyleSheet.create({
  btnText: {fontSize: 16, lineHeight: 22, fontWeight: '600', color: '#5C95C6'},
  btn: {
    height: 40,
  },
});

export default LinkButton;
