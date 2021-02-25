import React, { useEffect, useMemo } from 'react';
import { Vibration } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast';
import _ from 'lodash';

import { useErrors, useResetErrorsCallback } from '../../redux/app';
import { COLORS } from '../../utils/colors';

const MIN_GAP: number = 6;

const TOAST_CONFIG = {
  duration: Toast.durations.LONG,
  backgroundColor: COLORS.PIPPIN,
  textColor: COLORS.THUNDERBIRD,
  shadow: false,
  animation: true,
  hideOnPress: true,
  delay: 0,
};

const DURATION_OF_VIBRATION = 400;

export const ErrorAlertHandler: React.FC = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const onResetErrors = useResetErrorsCallback(dispatch);

  const errors = useErrors();
  const [errorType, error] = useMemo(
    () => _.find(Object.entries(errors), (someError) => !!someError[1]) ?? [],
    [errors],
  );

  useEffect(() => {
    if (errorType && error) {
      Toast.show(error, { position: insets.top + MIN_GAP, ...TOAST_CONFIG });
      Vibration.vibrate(DURATION_OF_VIBRATION);
      onResetErrors();
    }
  }, [errorType, error]);

  return null;
};
