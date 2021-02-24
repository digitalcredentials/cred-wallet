import React from 'react';
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
  const styles = presetStyles[preset];

  return (
    <View style={styles.container}>
      <View style={styles.modalLine} />

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

      {preset === CertificateItemPresets.Modal && (
        <TouchableOpacity
          style={styles.buttonShareContainer}
          onPress={() => onSharePress(certificate)}
        >
          <Text style={styles.buttonShare}>SHARE</Text>
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
