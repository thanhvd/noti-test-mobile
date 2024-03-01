import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';

const TextComponent = ({
  text,
  style,
  values = {},
  color,
  pointerEvents,
  numberOfLines,
  message,
}) => {
  const {t} = useTranslation();
  return (
    <Text
      numberOfLines={numberOfLines}
      pointerEvents={pointerEvents}
      testID={'Text'}
      style={[style, color && {color}]}>
      {t(text || message, values)}
    </Text>
  );
};

export default TextComponent;
