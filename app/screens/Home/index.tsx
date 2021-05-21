import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  StatusBar,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { CredentialsSearchList, SearchBar } from '../../components';
import { IHomeScreenProps } from './home.props';
import { styles } from './home.styles';
import { CredentialsList } from '../../components/CredentialsList';
import { useSearchCredentialsCallback } from '../../redux/search';
import { COLORS } from '../../utils/colors';
import { ICredentials } from '../../utils/types';
import { useMount } from '../../utils/hooks';
import { isBackupUrl } from '../../utils';
import { useSetDeeplinkUrlCallback } from '../../redux/app';

const ANIMATION_DURATION = 250;

export const HomeScreen: React.FC<IHomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const onSearch = useSearchCredentialsCallback(dispatch);
  const onSetDeeplinkUrl = useSetDeeplinkUrlCallback(dispatch);

  /* ------ State ------ */
  const extendedListOpacity = useRef(new Animated.Value(1));

  const [searchValue, setSearchValue] = useState<string>('');
  const [isExtendedList, setIsExtendedList] = useState<boolean>(true);

  // TODO: remove this maybe (use deeplink saga)
  useMount(() => {
    // Handle late deeplink urls
    Linking.addEventListener('url', (data) => {
      const isBackupOpened = isBackupUrl(data.url);
      if (isBackupOpened) {
        navigation.navigate('CreateBackup', {
          isLoadBackup: true,
          backupPath: data.url,
        });
      } else {
        onSetDeeplinkUrl(data.url);
      }
    });
    return () => Linking.removeAllListeners('url');
  });

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue, isExtendedList]);

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

  const onCredentialsPress = useCallback(
    (pressedCredentials: ICredentials) => {
      navigation.navigate('Certificates', {
        credentialsId: pressedCredentials.id,
      });
    },
    [navigation],
  );

  const onSearchFocus = useCallback(() => {
    startExtendedListAnimation(0, () => setIsExtendedList(false));
  }, [setIsExtendedList, startExtendedListAnimation]);

  const onSearchBlur = useCallback(() => {
    setIsExtendedList(true);
    startExtendedListAnimation(1);
  }, [startExtendedListAnimation]);

  const renderExtendedList = () => (
    <Animated.View
      style={[styles.flexContainer, { opacity: extendedListOpacity.current }]}
    >
      <CredentialsList onCredentialsPress={onCredentialsPress} />
    </Animated.View>
  );

  const renderCurrentList = useCallback(
    () => (isExtendedList ? renderExtendedList() : <CredentialsSearchList />),
    [isExtendedList, renderExtendedList],
  );

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior="padding" style={styles.flexContainer}>
        <StatusBar backgroundColor={COLORS.BUNTING} barStyle="light-content" />
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
        />
        {renderCurrentList()}
      </KeyboardAvoidingView>
    </View>
  );
};
