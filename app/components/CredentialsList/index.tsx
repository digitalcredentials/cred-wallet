import React from 'react';
import { FlatList, View, Image, Text } from 'react-native';

import { styles } from './credentials-list.styles';
import { CredentialsListProps } from './credentials-list.props';
import { IMAGES } from '../../assets';
import { useKeyExtractor } from '../../utils/hooks';
import { ICredentials } from '../../utils/types';
import { useCredentials } from '../../redux/certificates';

export const CredentialsList: React.FunctionComponent<CredentialsListProps> = ({}) => {
  const credentials = useCredentials();

  const keyExtractor = useKeyExtractor<ICredentials>('credential');

  return (
    <FlatList
      data={credentials}
      renderItem={({ item }) => (
        <View style={styles.issuerContainer}>
          <Image style={styles.issuerImage} source={IMAGES.GRADUATION} />
          <Text style={styles.issuerTitle}>{item.issuer.name}</Text>
          <Text style={styles.issuerCertificates}>
            {item.certificates.length} certificates
          </Text>
        </View>
      )}
      numColumns={2}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    />
  );
};
