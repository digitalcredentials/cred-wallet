import React, { useCallback, useState } from 'react';
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

  const [selectedItem, setSelectedItem] = useState<ICredentials | null>(null);

  const renderItem = useCallback(
    ({ item }: { item: ICredentials }) => {
      const isSelected = selectedItem?.id === item.id;
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => setSelectedItem(item)}
          onPressOut={() => setSelectedItem(null)}
          onPress={() => onCredentialsPress(item)}
          style={[
            styles.issuerContainer,
            isSelected ? styles.issuerContainerSelected : null,
          ]}
        >
          <View style={styles.rowContainer}>
            <View style={styles.flexContainer}>
              <View style={styles.rowContainer}>
                <Text
                  style={[
                    styles.issuerTitle,
                    isSelected ? styles.issuerTitleSelected : null,
                  ]}
                >
                  {item.issuer.name}
                </Text>
                <Image
                  style={styles.issuerImage}
                  source={
                    isSelected
                      ? IMAGES.GRADUATION_WHITE
                      : IMAGES.GRADUATION_ORANGE
                  }
                />
              </View>
              <Text
                style={[
                  styles.issuerCertificates,
                  isSelected ? styles.issuerCertificatesSelected : null,
                ]}
              >
                {item.certificates.length} certificates
              </Text>
            </View>

            <Image
              style={styles.chevronIcon}
              source={
                isSelected
                  ? IMAGES.CHEVRON_RIGHT_WHITE
                  : IMAGES.CHEVRON_RIGHT_PURPLE
              }
            />
          </View>
        </TouchableOpacity>
      );
    },
    [selectedItem],
  );

  const keyExtractor = useKeyExtractor<ICredentials>('credential');

  return (
    <FlatList
      data={credentials}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      extraData={selectedItem}
      style={styles.container}
    />
  );
};
