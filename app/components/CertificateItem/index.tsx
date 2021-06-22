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
  onPress = () => { },
  onSharePress = () => { },
  preset,
}) => {
  const styles = useMemo(() => presetStyles[preset], [preset]);

  return (
    <View style={styles.container}>
      <View style={styles.modalLine} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Issuer</Text>
      </View>

      { issuer.image ?
        <Image
          style={styles.titleImage}
          source={issuer.image ? { uri: issuer.image } : IMAGES.MAN}
        />
        : <Text></Text>
      }

      <Text style={styles.credentialName}>{issuer.name}</Text>
      <Text style={styles.did}>{issuer.id}</Text>

      <View style={styles.separatorContainer} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Issued To</Text>
      </View>
      <Text style={styles.subjectName}>{certificate.credentialSubject.name}</Text>
      <Text style={styles.did}>{certificate.credentialSubject.id}</Text>

      <View style={styles.separatorContainer} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Credential</Text>
      </View>

      <Text style={styles.credentialName}>{certificate.credentialSubject.hasCredential.name}</Text>
      <Text>
        <Text style={styles.fieldTitle}>Type: </Text>
        <Text style={styles.fieldValue}>{Array.isArray(certificate.credentialSubject.hasCredential.type) ? certificate.credentialSubject.hasCredential.type.join(', '): certificate.credentialSubject.hasCredential.type}</Text>
      </Text>

      <Text>
        <Text style={styles.fieldTitle}>Description: </Text>
        <Text style={styles.fieldValue}>{certificate.credentialSubject.hasCredential.description}</Text>
      </Text>

      <Text>
        <Text style={styles.fieldTitle}>Issuance date:</Text>
        <Text style={styles.fieldValue}>
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
