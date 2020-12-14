import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';

import { VerifyPanel } from '../../components';
import { PinScreenProps } from './pin.props';
import { styles } from './pin.styles';
import {
  generateDid,
  isAndroid,
  isIOS,
  parseCertificateDeeplink,
} from '../../utils';
import { useMount } from '../../utils/hooks';
import { Linking } from 'react-native';
import { ICertificateDeeplink } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { useAddCertificateCallback } from '../../redux/certificates';

export const PinScreen: React.FC<PinScreenProps> = ({ navigation, route }) => {
  const [deeplinkData, setDeeplinkData] = useState<ICertificateDeeplink | null>(
    null,
  );

  const dispatch = useDispatch();
  const addCertificate = useAddCertificateCallback(dispatch);

  useMount(() => {
    const handleInitialDeeplinkURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const parsedUrl = parseCertificateDeeplink(url);
        setDeeplinkData(parsedUrl);
      }
    };

    handleInitialDeeplinkURL();
  });

  const onVerifySuccess = useCallback(async () => {
    if (deeplinkData) {
      addCertificate({
        did: await generateDid(),
        ...deeplinkData,
      });
    }

    const isPushedParam = route.params?.isPushed;
    if (isPushedParam) {
      navigation.goBack();
    } else {
      navigation.replace('MainTabs');
    }
  }, [navigation, route.params, deeplinkData]);

  const mainPageContent = useMemo(
    () => (
      <SafeAreaView
        style={[
          styles.safeAreaContainer,
          isAndroid ? styles.backgroundWhite : null,
        ]}
      >
        <VerifyPanel onVerifySuccess={onVerifySuccess} />
      </SafeAreaView>
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
