import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Easing,
  StatusBar,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import _ from 'lodash';

import { CredentialsSearchList, SearchBar } from '../../components';
import { HomeScreenProps } from './home.props';
import { styles } from './home.styles';
import { CredentialsList } from '../../components/CredentialsList';
import { useDispatch } from 'react-redux';
import { useSearchCredentialsCallback } from '../../redux/search';
import { COLORS } from '../../utils/colors';
import { ICredentials } from '../../utils/types';
import { useAddCertificateCallback } from '../../redux/certificates';
import { useMount } from '../../utils/hooks';
import {
  generateDid,
  isBackupUrl,
  parseCertificateDeeplink,
} from '../../utils';
import {
  useDeeplinkUrl,
  useIsVerificationProcess,
  useSetDeeplinkUrlCallback,
} from '../../redux/app';

const ANIMATION_DURATION = 250;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const isVerificationProcess = useIsVerificationProcess();
  const deeplinkUrl = useDeeplinkUrl();
  const onSearch = useSearchCredentialsCallback(dispatch);
  const onSetDeeplinkUrl = useSetDeeplinkUrlCallback(dispatch);
  const onAddCertificate = useAddCertificateCallback(dispatch);

  /* ------ State ------ */
  const extendedListOpacity = useRef(new Animated.Value(1));

  const [searchValue, setSearchValue] = useState<string>('');
  const [isExtendedList, setIsExtendedList] = useState<boolean>(true);
  const prevIsVerificationProcess = useRef(true);

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

  // Dispatch addCertificate action only when isVerificationProcess === false
  useEffect(() => {
    if (
      deeplinkUrl &&
      prevIsVerificationProcess.current &&
      !isVerificationProcess
    ) {
      const parseUrlAndDispatch = async () => {
        const isBackupOpened = isBackupUrl(deeplinkUrl);

        if (isBackupOpened) {
          navigation.navigate('CreateBackup', {
            isLoadBackup: true,
            backupPath: deeplinkUrl,
          });
        } else {
          const parsedCertificateDeeplink = parseCertificateDeeplink(
            deeplinkUrl,
          );
          onAddCertificate({
            // instead of passing just the DID to vc_request_url, create the DID and sign it with the challenge (resulting in REQUEST_PAYLOAD)
            // I created this convenience function, but can't quite figure out how to wire it in
            // generateAndProveDid(challenge)
            did: await generateDid(),
            ...parsedCertificateDeeplink,
          });
        }

        onSetDeeplinkUrl(null);
      };

      parseUrlAndDispatch();
    }

    prevIsVerificationProcess.current = isVerificationProcess;
  }, [deeplinkUrl, isVerificationProcess]);

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

  const renderExtendedList = useCallback(
    () => (
      <Animated.View
        style={[styles.flexContainer, { opacity: extendedListOpacity.current }]}
      >
        <CredentialsList onCredentialsPress={onCredentialsPress} />
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
