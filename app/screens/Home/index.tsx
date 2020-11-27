import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import _ from 'lodash';

import { CredentialsSearchList, SearchBar, Text } from '../../components';
import { HomeScreenProps } from './home.props';
import { styles } from './home.styles';
import { IMAGES } from '../../assets';
import { CredentialsList } from '../../components/CredentialsList';

const ANIMATION_DURATION = 250;

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({
  navigation,
}) => {
  /* ------ State ------ */
  const extendedListOpacity = useRef(new Animated.Value(1));

  const [searchValue, setSearchValue] = useState<string>('');
  const [isExtendedList, setIsExtendedList] = useState<boolean>(true);

  /* ------ Callbacks ------ */

  const startExtendedListAnimation = useCallback(
    (toValue: number, callback: () => void = _.noop) => {
      Animated.timing(extendedListOpacity.current, {
        toValue,
        easing: Easing.linear,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start(callback);
    },
    [extendedListOpacity],
  );

  const onSearchFocus = useCallback(() => {
    startExtendedListAnimation(0, () => setIsExtendedList(false));
  }, [setIsExtendedList, startExtendedListAnimation]);

  const onSearchBlur = useCallback(() => {
    setIsExtendedList(true);
    startExtendedListAnimation(1);
  }, [startExtendedListAnimation]);

  const renderExtendedList = useCallback(
    () => (
      <Animated.View
        style={[styles.flexContainer, { opacity: extendedListOpacity.current }]}
      >
        <CredentialsList />
      </Animated.View>
    ),
    [extendedListOpacity.current],
  );

  const renderCurrentList = useCallback(
    () => (isExtendedList ? renderExtendedList() : <CredentialsSearchList />),
    [isExtendedList, renderExtendedList],
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.flexContainer}>
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
        />
        {renderCurrentList()}
        <TouchableOpacity
          style={styles.addCertificateButtonContainer}
          onPress={() => navigation.navigate('QRScanner')}
        >
          <Text style={styles.addCertificateButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
