import React from 'react';
import { View, Image, Text } from 'react-native';
import moment from 'moment';

import { IMAGES } from '../../assets';
import { CertificateItemProps } from './certificate-item.props';
import { styles } from './certificate-item.styles';

export const CertificateItem: React.FC<CertificateItemProps> = ({
  certificate,
  issuer,
}) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Image
        style={styles.titleImage}
        source={issuer.image ? { uri: issuer.image } : IMAGES.MAN}
      />
      <Text style={styles.titleIssuer}>{issuer.name}</Text>
    </View>

    <Text style={styles.name}>{certificate.credentialSubject.name}</Text>

    <View style={styles.separatorContainer} />

    <Text style={styles.description}>Some description here</Text>

    <View style={styles.separatorContainer} />

    <Text>
      <Text style={styles.valueTitle}>DID:</Text>
      <Text style={styles.value}> {certificate.credentialSubject.id}</Text>
    </Text>

    <View style={styles.separatorContainer} />

    <Text>
      <Text style={styles.valueTitle}>Start date:</Text>
      <Text style={styles.value}>
        {' '}
        {moment(certificate.issuanceDate).format('YYYY-MM-DD')}
      </Text>
    </Text>
    <Text>
      <Text style={styles.valueTitle}>End date:</Text>
      <Text style={styles.value}>
        {' '}
        {moment(certificate.issuanceDate).format('YYYY-MM-DD')}
      </Text>
    </Text>
  </View>
);
