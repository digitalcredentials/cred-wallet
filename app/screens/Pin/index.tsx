import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';

import { ErrorAlert, VerifyPanel } from '../../components';
import { PinScreenProps } from './pin.props';
import { styles } from './pin.styles';
import { isAndroid, isIOS } from '../../utils';
import { useMount } from '../../utils/hooks';
import {
  useIsFirstVerification,
  useSetDeeplinkUrlCallback,
  useSetFirstVerificationCallback,
  useSetVerificationProcessCallback,
} from '../../redux/app';

export const PinScreen: React.FC<PinScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFirstVerification = useIsFirstVerification();
  const onSetFirstVerification = useSetFirstVerificationCallback(dispatch);
  const onSetVerificationProcess = useSetVerificationProcessCallback(dispatch);
  const onSetDeeplinkUrl = useSetDeeplinkUrlCallback(dispatch);

  useMount(() => {
    const handleInitialDeeplinkURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        onSetDeeplinkUrl(url);
      }
    };

    if (isFirstVerification) {
      handleInitialDeeplinkURL();
    }

    onSetVerificationProcess(true);
    return () => {
      onSetVerificationProcess(false);
      if (isFirstVerification) {
        onSetFirstVerification(false);
      }
    };
  });

  const onVerifySuccess = useCallback(() => {
    const isPushedParam = route.params?.isPushed;
    if (isPushedParam) {
      navigation.goBack();
    } else {
      navigation.replace('MainTabs');
    }
  }, [navigation, route.params]);

  const mainPageContent = useMemo(
    () => (
      <>
        <SafeAreaView
          style={[
            styles.safeAreaContainer,
            isAndroid ? styles.backgroundWhite : null,
          ]}
        >
          <VerifyPanel onVerifySuccess={onVerifySuccess} />
        </SafeAreaView>
        <ErrorAlert />
      </>
    ),
    [isAndroid, onVerifySuccess],
  );

  // Render BlurView only for iOS
  return isIOS ? (
    <BlurView style={styles.container} blurAmount={10} blurType="light">
      {mainPageContent}
    </BlurView>
  ) : (
    mainPageContent
  );
};
