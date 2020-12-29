import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { styles } from './default-button.styles';
import { DefaultButtonProps } from './default-button.props';

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  title,
  style: containerStyle,
  ...rest
}) => {
  return (
    <TouchableOpacity {...rest} style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
