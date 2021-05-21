import React, { useCallback, useState } from 'react';
import { Image, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch } from 'react-redux';

import { QRScannerScreenProps } from './qr-scanner.props';
import { styles } from './qr-scanner.styles';
import { generateAndProveDid } from '../../didKey';
import { parseCertificateDeeplink } from '../../utils';
import { IMAGES } from '../../assets';
import { FocusStatus } from '../../utils/types';
import { useSetDeeplinkUrlCallback } from '../../redux/app';

export const QRScannerScreen: React.FC<QRScannerScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const onSetDeeplinkUrl = useSetDeeplinkUrlCallback(dispatch);

  const [focusStatus, setFocusStatus] = useState<FocusStatus>(
    FocusStatus.Focus,
  );

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  useFocusEffect(
    useCallback(() => {
      setFocusStatus(FocusStatus.Focus);

      return () => {
        setFocusStatus(FocusStatus.Blur);
      };
    }, [focusStatus, setFocusStatus]),
  );

  const onSuccess = useCallback(
    (result) => {
      onSetDeeplinkUrl(result.data);
      goBack();
    },
    [parseCertificateDeeplink, generateAndProveDid, goBack],
  );

  return (
    <View style={styles.root}>
      {focusStatus === FocusStatus.Focus && (
        <QRCodeScanner
          onRead={onSuccess}
          fadeIn
          showMarker
          cameraStyle={styles.cameraContainer}
          markerStyle={styles.cameraMarkerContiner}
          topViewStyle={styles.zeroContainer}
          bottomViewStyle={styles.zeroContainer}
        />
      )}
      <View style={styles.mainAbsoluteContainer}>
        <Image source={IMAGES.PLACE_FOR_QR} />
      </View>
    </View>
  );
};
