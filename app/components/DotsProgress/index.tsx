import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, View, Easing } from 'react-native';
import _ from 'lodash';

import { DotsProgressProps, DotProps } from './dots-progress.props';
import { getShakeStyle, styles } from './dots-progress.styles';
import { useErrors } from '../../redux/app';
import {
  ANIMATION_END_VALUE,
  ANIMATION_START_VALUE,
  INTERPOLATED_SHAKE_VALUE,
  SHAKE_DURATION,
} from './dots-progress.data';

const DotView: React.FC<DotProps> = ({ isFilled }) => (
  <View
    style={[styles.dotContainer, isFilled ? [styles.activeDotContainer] : null]}
  />
);

export const DotsProgress: React.FC<DotsProgressProps> = ({
  dotsAmount,
  filledDotsAmount,
  style: propStyle = {},
}) => {
  const animatedShakeValue = useRef(new Animated.Value(ANIMATION_START_VALUE));

  const anim = useMemo(
    () =>
      Animated.timing(animatedShakeValue.current, {
        toValue: ANIMATION_END_VALUE,
        easing: Easing.linear,
        duration: SHAKE_DURATION,
        useNativeDriver: true,
      }),
    [],
  );

  const { wrongPin: wrongPinError } = useErrors();

  useEffect(() => {
    if (wrongPinError) {
      anim.stop();
      animatedShakeValue.current.setValue(ANIMATION_START_VALUE);
      anim.start();
    }
  }, [anim, wrongPinError]);

  const interpolatedShakeValue = animatedShakeValue.current.interpolate({
    inputRange: INTERPOLATED_SHAKE_VALUE.INPUT_RANGE_SHAKE,
    outputRange: INTERPOLATED_SHAKE_VALUE.OUTPUT_RANGE_SHAKE,
  });

  const shakeAnimatedStyle = getShakeStyle(interpolatedShakeValue);

  return (
    <Animated.View
      style={[shakeAnimatedStyle, styles.container, propStyle.container]}
    >
      {_.map(new Array(dotsAmount), (el, index) => (
        <DotView isFilled={index < filledDotsAmount} key={`dot-${index}`} />
      ))}
    </Animated.View>
  );
};
