import React, { useCallback } from 'react';
import { FlatList, View, Image, Text } from 'react-native';

import { styles } from './credentials-list.styles';
import { CredentialsListProps } from './credentials-list.props';
import { IMAGES } from '../../assets';
import { useKeyExtractor } from '../../utils/hooks';
import { ICredentials } from '../../utils/types';
import { useCredentials } from '../../redux/certificates';

export const CredentialsList: React.FunctionComponent<CredentialsListProps> = ({}) => {
  const credentials = useCredentials();

  const renderItem = useCallback(
    ({ item }: { item: ICredentials }) => (
      <View style={styles.issuerContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.issuerTitle}>{item.issuer.name}</Text>
          <Image style={styles.issuerImage} source={IMAGES.GRADUATION_ORANGE} />
        </View>
        <View style={styles.issuerCertificatesContainer}>
          <Text style={styles.issuerCertificates}>
            {item.certificates.length} certificates
          </Text>
        </View>
      </View>
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
