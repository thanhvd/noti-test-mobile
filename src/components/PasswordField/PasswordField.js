import React, {Component} from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Images from '../../images/Images';

class PasswordField extends Component {
  state = {
    isFocus: false,
    showText: false,
  };

  handleChangeText = value => {
    const {changeValue} = this.props;
    changeValue(value);
  };

  handleBlur = () => {
    const {onBlur} = this.props;
    if (onBlur) {
      onBlur();
    }
    this.setState({
      isFocus: false,
    });
  };

  handleFocus = () => {
    this.setState({
      isFocus: true,
    });
  };

  handleShowText = () => {
    this.setState(prevState => ({
      ...prevState,
      showText: !prevState.showText,
    }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.autoFocus !== this.props.autoFocus) {
      setTimeout(() => {
        this.passwordRef.focus();
      }, 500);
    }
  }

  focusInput = () => {
    this.passwordRef.focus();
  };

  render() {
    const {value, placeholder, hasError, autoFocus, disabled} =
      this.props;
    const {showText, isFocus} = this.state;
    return (
      <View
        style={[
          styles.container,
          hasError && styles.containerError,
          disabled && styles.disabled,
          isFocus && styles.containerFocus,
          isFocus && hasError && styles.containerFocusError,
        ]}>
        <TextInput
          testID={'TextInput'}
          value={value}
          style={[styles.textInput, isFocus && styles.inputFocus]}
          onChangeText={this.handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#B5B5B5"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          secureTextEntry={!showText}
          autoFocus={autoFocus}
          ref={passwordRef => (this.passwordRef = passwordRef)}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.viewPasswordWrapper}
          onPress={this.handleShowText}>
          <Image
            source={showText ? Images.icoEyeVisible : Images.icoEye}
            style={[styles.icon]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: 'transparent',
      borderRadius: 8,
      backgroundColor: 'ffffff',
    },
    containerError: {
      borderWidth: 0,
    },
    disabled: {
      backgroundColor: '#F5F5F5',
      opacity: 0.5,
    },
    containerFocus: {
      borderWidth: 2,
      borderColor: 'rgba(26, 133, 224, 0.20)',
      backgroundColor: 'ffffff',
    },
    containerFocusError: {
      borderColor: '#FCA7A7',
      backgroundColor: 'ffffff',
      borderWidth: 1,
    },
    label: {
      fontSize: 12,
      lineHeight: 18,
      color: '#888888',
    },
    textInput: {
      height: 48,
      width: 300,
      fontSize: 14,
      color: '#000000',
      fontWeight: '600',
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#E6E8EC',
      borderRadius: 8,
    },
    inputFocus: {
      borderWidth: 1,
      borderColor: '#1A85E0',
      borderRadius: 6,
    },
    hasRightIcon: {
      paddingRight: 53,
    },
    rightIcon: {
      position: 'absolute',
      right: 20,
      width: 13,
      ...Platform.select({
        android: {
          top: 20,
        },
        ios: {
          top: 16,
        },
      }),
    },
    viewPasswordWrapper: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      ...Platform.select({
        android: {
          top: 20,
          right: 20
        },
        ios: {
          top: 16,
          right: 16
        },
      }),
    },
    icon: {
      width: 16,
    },
    textLeft: {
      textAlign: 'left',
    },
  });

export default PasswordField;
