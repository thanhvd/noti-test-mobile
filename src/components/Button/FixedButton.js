import React, {Component, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import debounce from 'lodash/debounce';
import AppColors from '../../commons/AppColors';

const FixedButton = ({
  children,
  style,
  loading,
  loadingColor,
  options = {},
  disabled,
  activeOpacity,
  showChildren,
  disableDebounce,
  keepKeyboard,
  onPress,
  ...rest
}) => {
  const _touchActivatePositionRef = useRef(null);

  function _onPressIn(e) {
    const {pageX, pageY} = e.nativeEvent;

    _touchActivatePositionRef.current = {
      pageX,
      pageY,
    };
  }

  function _onPress(e) {
    const {pageX, pageY} = e.nativeEvent;

    const absX = Math.abs(_touchActivatePositionRef.current.pageX - pageX);
    const absY = Math.abs(_touchActivatePositionRef.current.pageY - pageY);

    const dragged = absX > 2 || absY > 2;
    if (!dragged) {
      debounce(debouncedOnPress, 400, {leading: true, trailing: false})();
    }
  }

  const debouncedOnPress = () => {
    if (onPress) {
      onPress();
      if (!keepKeyboard) {
        Keyboard.dismiss();
      }
    }
  };

  return (
    <TouchableOpacity
      testID="Button"
      style={[styles.btn, style]}
      {...options}
      {...rest}
      disabled={loading || disabled}
      activeOpacity={activeOpacity || 0.2}
      onPress={_onPress}
      onPressIn={_onPressIn}>
      {(!loading || showChildren) && children}
      {loading && (
        <ActivityIndicator
          style={showChildren && styles.indicator}
          color={loadingColor || AppColors.White}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    marginLeft: 7,
  },
});

export default FixedButton;
