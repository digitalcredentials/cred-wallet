import React, { useCallback, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch } from 'react-redux';

import { QRScannerScreenProps } from './qr-scanner.props';
import { styles } from './qr-scanner.styles';
import { generateDid, parseCertificateDeeplink } from '../../utils';
import { useAddCertificateCallback } from '../../redux/certificates';
import { IMAGES } from '../../assets';
import { EXTENDED_HIT_SLOP } from '../../utils/constants';
import { FocusStatus } from '../../utils/types';

export const QRScannerScreen: React.FC<QRScannerScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const onAddCertificate = useAddCertificateCallback(dispatch);

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
    async (result) => {
      const certificateDeeplink = parseCertificateDeeplink(result.data);
      onAddCertificate({
        did: await generateDid(),
        ...certificateDeeplink,
      });
      goBack();
    },
    [parseCertificateDeeplink, generateDid, goBack],
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
