import React from 'react';
import { Animated, View } from 'react-native';
import _ from 'lodash';

import { DotsProgressProps, DotProps } from './dots-progress.props';
import { styles } from './dots-progress.styles';

//TODO: animation
const DotView: React.FunctionComponent<DotProps> = ({ isFilled }) => {
  // const animatedView = useRef(new Animated.Value(0));

  return (
    <Animated.View
      style={[styles.dotContainer, isFilled ? styles.activeDotContainer : null]}
    />
  );
};

export const DotsProgress: React.FunctionComponent<DotsProgressProps> = ({
  dotsAmount,
  filledDotsAmount,
  style: propStyle = {},
}) => {
  return (
    <View style={[styles.container, propStyle.container]}>
      {_.map(new Array(dotsAmount), (el, index) => (
        <DotView isFilled={index < filledDotsAmount} key={`dot-${index}`} />
      ))}
    </View>
  );
};
