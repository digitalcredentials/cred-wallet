import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Header } from '../../components';
import { CertificateCarousel } from '../../components/CertificateCarousel';

import { useCredentialsById } from '../../redux/certificates';
import { CertificatesScreenProps } from './certificates.props';
import { styles } from './certificates.styles';

export const CertificatesScreen: React.FC<CertificatesScreenProps> = ({
  navigation,
  route,
}) => {
  const credentialsId = useMemo(() => route.params.credentialsId, [route]);
  const currentCredentials = useCredentialsById(credentialsId);

  return (
    <View style={styles.container}>
      <Header backButtonTitle="Home" title="Certificates" />

      <CertificateCarousel
        certificates={currentCredentials?.certificates || []}
        issuer={currentCredentials?.issuer!}
      />
    </View>
  );
};
