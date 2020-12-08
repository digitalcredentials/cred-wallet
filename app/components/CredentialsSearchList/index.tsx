import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { styles } from './credentials-search-list.styles';
import { CredentialsSearchListProps } from './credentials-search-list.props';
import { useCredentials } from '../../redux/certificates';
import { useKeyExtractor } from '../../utils/hooks';
import { ICredentials } from '../../utils/types';
import { COLORS } from '../../utils/colors';
import { Text } from '../Text';

export const CredentialsSearchList: React.FunctionComponent<CredentialsSearchListProps> = () => {
  const credentials = useCredentials();

  const renderItem = useCallback(
    ({ item }: { item: ICredentials }) => <View />,
    [],
  );

  const keyExtractor = useKeyExtractor<ICredentials>('credential-search');

  return credentials.length ? (
    <FlatList
      data={credentials}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    />
  ) : (
    <View style={styles.noResultsContainer}>
      <View style={styles.noResultsIconContainer}>
        <FontAwesomeIcon name="search" size={70} color={COLORS.SILVER} />
      </View>
      <Text style={styles.noResultsTitle}>No results</Text>
      <Text style={styles.noResultsSubtitle}>
        Change the request and try again
      </Text>
    </View>
  );
};
