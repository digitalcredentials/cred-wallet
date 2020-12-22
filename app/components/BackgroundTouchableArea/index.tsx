import React from 'react';
import { TouchableOpacity } from 'react-native';

import { styles } from './background-touchable-area.styles';
import { BackgroundTouchableAreaProps } from './background-touchable-area.props';

const DEFAULT_Z_INDEX = -10;

export const BackgroundTouchableArea: React.FC<BackgroundTouchableAreaProps> = ({
  onPress,
  zIndex = DEFAULT_Z_INDEX,
  containerStyle = {},
}) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={onPress}
    style={[styles.container, { zIndex }, containerStyle]}
  ></TouchableOpacity>
);
