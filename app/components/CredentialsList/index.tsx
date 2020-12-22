import React, { useCallback } from 'react';
import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';

import { styles } from './credentials-list.styles';
import { CredentialsListProps } from './credentials-list.props';
import { IMAGES } from '../../assets';
import { useKeyExtractor } from '../../utils/hooks';
import { ICredentials } from '../../utils/types';
import { useCredentials } from '../../redux/certificates';

export const CredentialsList: React.FC<CredentialsListProps> = ({
  onCredentialsPress,
}) => {
  const credentials = useCredentials();

  const renderItem = useCallback(
    ({ item }: { item: ICredentials }) => (
      <TouchableOpacity
        onPress={() => onCredentialsPress(item)}
        style={styles.issuerContainer}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.issuerTitle}>{item.issuer.name}</Text>
          <Image style={styles.issuerImage} source={IMAGES.GRADUATION_ORANGE} />
        </View>
        <View style={styles.issuerCertificatesContainer}>
          <Text style={styles.issuerCertificates}>
            {item.certificates.length} certificates
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const keyExtractor = useKeyExtractor<ICredentials>('credential');

  return (
    <FlatList
      data={credentials}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    />
  );
};
