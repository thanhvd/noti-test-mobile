import React from 'react';
import {StyleSheet, Image} from 'react-native';
import TextComponent from '../Text';
import Button from './Button';

const SecondaryButton = ({text, style, children, btnText, icon, ...rest}) => {
  return (
    <Button {...rest} showChildren={true} style={[styles.btn, style]}>
      {icon && <Image source={icon} style={styles.icon} />}

      {children || (
        <TextComponent text={text} style={[styles.btnText, btnText]} />
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  btn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F8FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E8EC',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
});

export default SecondaryButton;
