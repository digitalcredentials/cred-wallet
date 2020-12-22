import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Text, View, Easing, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';

import { useErrors } from '../../redux/app';
import { styles } from './error-alert.styles';

const ANIMATION_DURATION = 1000;
const HOLD_DURATION = 3000;
const [MIN_HEIGHT, MAX_HEIGHT] = [0, 0.04 * Dimensions.get('window').height];

export const ErrorAlert: React.FC = () => {
  const animatedSize = useRef(new Animated.Value(MIN_HEIGHT));

  const errors = useErrors();
  const [errorType, error] = useMemo(
    () => _.find(Object.entries(errors), (someError) => !!someError[1]) ?? [],
    [errors],
  );

  const startErrorAnimation = useCallback(() => {
    Animated.timing(animatedSize.current, {
      toValue: MAX_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
      easing: Easing.cubic,
    }).start(() => {
      setTimeout(finishErrorAnimation, HOLD_DURATION);
    });
  }, [animatedSize]);

  const stopErrorAnimation = useCallback(() => {
    animatedSize.current.stopAnimation();
  }, []);

  const finishErrorAnimation = useCallback(() => {
    Animated.timing(animatedSize.current, {
      toValue: MIN_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
      easing: Easing.cubic,
    }).start();
  }, []);

  useEffect(() => {
    stopErrorAnimation();
    startErrorAnimation();
  }, [errorType, error]);

  return error ? (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View
        style={[styles.errorContainer, { height: animatedSize.current }]}
      >
        <Text style={styles.errorText}>{error}</Text>
      </Animated.View>
    </SafeAreaView>
  ) : null;
};
