import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import * as ed25519 from '@transmute/did-key-ed25519';
import { generateSecureRandom } from 'react-native-securerandom';
import _ from 'lodash';

import { CredentialsSearchList, SearchBar } from '../../components';
import { HomeScreenProps } from './home.props';
import { styles } from './home.styles';
import { CredentialsList } from '../../components/CredentialsList';
import { useDispatch } from 'react-redux';
import { useSearchCredentialsCallback } from '../../redux/search';
import { COLORS } from '../../utils/colors';

const ANIMATION_DURATION = 250;

export const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const onSearch = useSearchCredentialsCallback(dispatch);

  /* ------ State ------ */
  const extendedListOpacity = useRef(new Animated.Value(1));

  const [searchValue, setSearchValue] = useState<string>('');
  const [isExtendedList, setIsExtendedList] = useState<boolean>(true);

  useEffect(() => {
    const asyncTest = async () => {
      const randomBytes = await generateSecureRandom(32);
      const keyPair = await ed25519.Ed25519KeyPair.generate({
        secureRandom: () => randomBytes,
      });

      console.tron.log(keyPair);
    };

    asyncTest();
  });

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

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
    <View style={styles.root}>
      <StatusBar backgroundColor={COLORS.BUNTING} barStyle="light-content" />
      <SearchBar
        value={searchValue}
        onChangeText={setSearchValue}
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
      />
      {renderCurrentList()}
    </View>
  );
};
