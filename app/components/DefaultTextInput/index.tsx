import React from 'react';
import { TextInput } from 'react-native';
import { COLORS } from '../../utils/colors';

import { DefaultTextInputProps } from './default-text-input.props';
import { styles } from './default-text-input.styles';

export const DefaultTextInput: React.ForwardRefExoticComponent<DefaultTextInputProps> = React.forwardRef(
  ({ style: propStyle = {}, ...rest }, ref) => {
    return (
      <TextInput
        ref={ref}
        selectionColor={COLORS.BLACK}
        placeholderTextColor={COLORS.SILVER}
        autoCorrect={false}
        autoCapitalize="none"
        {...rest}
        style={[styles.input, propStyle]}
      />
    );
  },
);
