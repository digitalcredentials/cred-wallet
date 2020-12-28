import React, { useMemo } from 'react';
import { View } from 'react-native';

import { CertificateSearchViewScreenProps } from './certificate-search-view.props';
import { styles } from './certificate-search-view.styles';
import { CertificateItem, Header } from '../../components';
import { useCertificateWithIssuer } from '../../redux/certificates';
import { CertificateItemPresets } from '../../components/CertificateItem/certificate-item.props';

export const CertificateSearchViewScreen: React.FC<CertificateSearchViewScreenProps> = ({
  // navigation,
  route,
}) => {
  const certificateId = useMemo(() => route.params?.certificateId, [
    route.params,
  ]);
  const issuerId = useMemo(() => route.params?.issuerId, [route.params]);

  const { certificate, issuer } = useCertificateWithIssuer(
    certificateId,
    issuerId,
  );

  return (
    <View style={styles.container}>
      <Header backButtonTitle="Home" title="Certificate" />

      <View style={styles.contentContainer}>
        <CertificateItem
          certificate={certificate}
          issuer={issuer}
          preset={CertificateItemPresets.Fullscreen}
        />
      </View>
    </View>
  );
};
