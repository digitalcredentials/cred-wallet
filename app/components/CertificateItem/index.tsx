import React, { useMemo } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { IMAGES } from '../../assets';
import {
  CertificateItemPresets,
  CertificateItemProps,
} from './certificate-item.props';
import { presetStyles } from './certificate-item.styles';
import { EXTENDED_HIT_SLOP } from '../../utils/constants';

export const CertificateItem: React.FC<CertificateItemProps> = ({
  certificate,
  issuer,
  onPress = () => {},
  onSharePress = () => {},
  preset,
}) => {
  const styles = useMemo(() => presetStyles[preset], [preset]);

  return (
    <View style={styles.container}>
      <View style={styles.modalLine} />

      <View style={styles.titleContainer}>
        <Text>Issued By</Text>
      </View>
      <Image
        style={styles.titleImage}
        source={issuer.image ? { uri: issuer.image } : IMAGES.MAN}
      />
      <Text style={styles.titleIssuer}>{issuer.name}</Text>
      <Text style={styles.did}>DID: {issuer.id}</Text>

      <View style={styles.separatorContainer} />

      <View style={styles.titleContainer}>
        <Text>Issued To</Text>
      </View>
      <Text style={styles.name}>{certificate.credentialSubject.name}</Text>
      <Text style={styles.did}>DID: {certificate.credentialSubject.id}</Text>

      <View style={styles.separatorContainer} />

      <View style={styles.titleContainer}>
        <Text>Credential</Text>
      </View>

      <Text style={styles.titleIssuer}>{certificate.credentialSubject.hasCredential.name}</Text>
      <Text style={styles.description}>{certificate.credentialSubject.hasCredential.description}</Text>

      <Text>
        <Text style={styles.valueTitle}>Issuance date:</Text>
        <Text style={styles.value}>
          {' '}
          {moment(certificate.issuanceDate).format('YYYY-MM-DD')}
        </Text>
      </Text>

      {preset === CertificateItemPresets.Modal && (
        <TouchableOpacity
          style={styles.buttonShareContainer}
          onPress={() => onSharePress(certificate)}
        >
          <Image source={IMAGES.SHARE_ICON} />
        </TouchableOpacity>
      )}

      {preset === CertificateItemPresets.Carousel && (
        <TouchableOpacity
          onPress={() => onPress(certificate, issuer)}
          style={styles.moreButtonContainer!}
          hitSlop={EXTENDED_HIT_SLOP}
        >
          <Image source={IMAGES.MORE} style={styles.moreButtonImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};
