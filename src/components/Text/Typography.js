import React from 'react';
import {Text} from 'react-native';

const Typography = ({children, props}) => {
  return <Text {...props}>{children}</Text>;
};

export default Typography;
