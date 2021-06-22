import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { IMAGES } from '../../assets';
import { useSaveCertificateCallback } from '../../redux/certificates';
import { IAddCertificateScreenProps } from './add-certificate.props';
import { styles } from './add-certificate.styles';
import { FIELDS } from './add-certificate.data';

export const AddCertificateScreen: React.FC<IAddCertificateScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const saveCertificate = useSaveCertificateCallback(dispatch);

  const certificate = useMemo(() => route.params.certificate, [route.params]);
  const issuer = useMemo(() => route.params.issuer, [route.params]);

  const onYesPress = () => {
    saveCertificate(certificate, issuer);
    navigation.goBack();
  };

  const onNoPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.requestContainer}>
        <Text style={styles.requestTitle}>Do you want to add?</Text>
        <View style={styles.certificateInfoContainer}>
          <View style={styles.certificateInfoTitleContainer}>
            <Text style={styles.certificateInfoTitle}>
              {certificate.credentialSubject?.hasCredential.name}
            </Text>
          </View>

          <View style={styles.certificateInfoFieldContainer} key='issuer'>
            <Text style={styles.certificateInfoFieldName}>Issuer: </Text>
            <Text style={styles.certificateInfoFieldValue}>
              {issuer.name}
            </Text>
          </View>

          {_.map(FIELDS, ({ fieldName, getFieldValue }, index) => (
            <View style={styles.certificateInfoFieldContainer} key={index}>
              <Text style={styles.certificateInfoFieldName}>{fieldName}: </Text>
              <Text style={styles.certificateInfoFieldValue}>
                {getFieldValue(certificate)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.noButtonContainer}
            onPress={onNoPress}
          >
            <Text style={styles.noButtonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.yesButtonContainer}
            onPress={onYesPress}
          >
            <Text style={styles.yesButtonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
