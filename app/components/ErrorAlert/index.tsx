import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Text, Easing, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';

import { useErrors, useResetErrorsCallback } from '../../redux/app';
import { styles } from './error-alert.styles';
import { useDispatch } from 'react-redux';

const ANIMATION_DURATION = 1000;
const HOLD_DURATION = 3000;
const [MIN_HEIGHT, MAX_HEIGHT] = [0, 0.05 * Dimensions.get('window').height];

export const ErrorAlert: React.FC = () => {
  const animatedHeight = useRef(new Animated.Value(MIN_HEIGHT));

  const dispatch = useDispatch();
  const onResetErrors = useResetErrorsCallback(dispatch);

  const errors = useErrors();
  const [errorType, error] = useMemo(
    () => _.find(Object.entries(errors), (someError) => !!someError[1]) ?? [],
    [errors],
  );

  const startErrorAnimation = useCallback(() => {
    Animated.timing(animatedHeight.current, {
      toValue: MAX_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
      easing: Easing.cubic,
    }).start(() => {
      setTimeout(finishErrorAnimation, HOLD_DURATION);
    });
  }, [animatedHeight]);

  const stopErrorAnimation = useCallback(() => {
    animatedHeight.current.stopAnimation();
  }, []);

  const finishErrorAnimation = useCallback(() => {
    Animated.timing(animatedHeight.current, {
      toValue: MIN_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
      easing: Easing.cubic,
    }).start(onResetErrors);
  }, []);

  useEffect(() => {
    if (errorType && error) {
      stopErrorAnimation();
      startErrorAnimation();
    }
  }, [errorType, error]);

  return error ? (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View
        style={[styles.errorContainer, { height: animatedHeight.current }]}
      >
        <Text style={styles.errorText}>{error}</Text>
      </Animated.View>
    </SafeAreaView>
  ) : null;
};
