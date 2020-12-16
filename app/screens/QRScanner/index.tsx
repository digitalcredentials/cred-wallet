import React, { FunctionComponent, useCallback } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch } from 'react-redux';

import { QRScannerScreenProps } from './qr-scanner.props';
import { styles } from './qr-scanner.styles';
import { generateDid, parseCertificateDeeplink } from '../../utils';
import { useAddCertificateCallback } from '../../redux/certificates';
import { IMAGES } from '../../assets';
import { EXTENDED_HIT_SLOP } from '../../utils/constants';

export const QRScannerScreen: FunctionComponent<QRScannerScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const onAddCertificate = useAddCertificateCallback(dispatch);

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

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
      <QRCodeScanner
        onRead={onSuccess}
        // vibrate?: boolean;
        // reactivate?: boolean;
        // reactivateTimeout?: number;
        fadeIn
        showMarker
        // cameraType?: 'front' | 'back';
        // customMarker?: JSX.Element;
        // containerStyle?: StyleProp<ViewStyle>;
        cameraStyle={styles.cameraContainer}
        markerStyle={styles.cameraMarkerContiner}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
        // topContent?: JSX.Element | string;
        // bottomContent?: JSX.Element | string;
        // notAuthorizedView?: JSX.Element;
        // permissionDialogTitle?: string;
        // permissionDialogMessage?: string;
        // buttonPositive?: string;
        // checkAndroid6Permissions?: boolean;

        // cameraProps={{
        //   flashMode: RNCamera.Constants.FlashMode.torch}
        // }}
        // topContent={
        //   <TouchableOpacity
        //     onPress={goBack}
        //     style={styles.goBackZoneContainer}
        //   />
        // }
        // bottomContent={
        //   <TouchableOpacity onPress={goBack} style={styles.goBackZoneContainer}>
        //     <Text style={styles.descriptionText}>
        //       place the camera on the QR code
        //     </Text>
        //   </TouchableOpacity>
        // }
      />
      <TouchableOpacity
        onPress={goBack}
        style={styles.closeButtonContainer}
        hitSlop={EXTENDED_HIT_SLOP}
      >
        <Image source={IMAGES.CLOSE} />
      </TouchableOpacity>
      <View style={styles.mainAbsoluteContainer}>
        <Image source={IMAGES.PLACE_FOR_QR} />
      </View>
    </View>
  );
};
