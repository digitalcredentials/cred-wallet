import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { CertificateViewScreenProps } from './certificate-view.props';
import { styles } from './certificate-view.styles';
import { CertificateItem } from '../../components';
import {
  useCertificateWithIssuer,
  useShareCertificateCallback,
} from '../../redux/certificates';
import { CertificateItemPresets } from '../../components/CertificateItem/certificate-item.props';
import { ICertificate } from '../../utils/types';

export const CertificateViewScreen: React.FC<CertificateViewScreenProps> = ({
  navigation,
  route,
}) => {
  const certificateId = useMemo(() => route.params.certificateId, [
    route.params,
  ]);
  const issuerId = useMemo(() => route.params.issuerId, [route.params]);

  const { certificate, issuer } = useCertificateWithIssuer(
    certificateId,
    issuerId,
  );

  const dispatch = useDispatch();
  const onShareCertificate = useShareCertificateCallback(dispatch);

  const onSharePress = useCallback(
    (certificate: ICertificate) => {
      onShareCertificate(certificate);
    },
    [certificate],
  );

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.flexContainer}
        activeOpacity={1}
        onPress={goBack}
      />
      <View style={styles.contentContainer}>
        <CertificateItem
          certificate={certificate}
          issuer={issuer}
          onSharePress={onSharePress}
          preset={CertificateItemPresets.Modal}
        />
      </View>
    </View>
  );
};
