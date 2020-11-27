import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import { styles } from './credentials-search-list.styles';
import { CredentialsSearchListProps } from './credentials-search-list.props';
import { useCredentials } from '../../redux/certificates';
import { useKeyExtractor } from '../../utils/hooks';
import { ICredentials } from '../../utils/types';

export const CredentialsSearchList: React.FunctionComponent<CredentialsSearchListProps> = () => {
  const credentials = useCredentials();

  const renderItem = useCallback(
    ({ item }: { item: ICredentials }) => <View />,
    [],
  );

  const keyExtractor = useKeyExtractor<ICredentials>('credential-search');

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
