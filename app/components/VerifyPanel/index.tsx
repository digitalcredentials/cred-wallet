import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import TouchID from 'react-native-touch-id';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import {
  BIOMETRY_OPTIONS,
  CIPHERS_BY_ROWS,
  CIPHER_LETTERS,
  PANEL_STATUS,
  PIN_LENGTH,
} from './verify-panel.options';
import { CipherRowProps, VerifyPanelProps } from './verify-panel.props';
import { styles, cipherRowStyles } from './verify-panel.styles';
import { DotsProgress } from '../DotsProgress';
import { ErrorType, VerifyPanelStatus } from '../../utils/types';
import { Keystore } from '../../services/keychain';
import { IMAGES } from '../../assets';
import { useDispatch } from 'react-redux';
import { useSetErrorCallback } from '../../redux/app';
import { useIsFirstLaunch, useSetFirstLaunchCallback } from '../../redux/cache';

// Keystore.resetPin();

const CipherRow: React.FC<CipherRowProps> = ({
  ciphers,
  biometricType,
  isDisabled,
  onCipherPress,
  onRemovePress = _.noop,
  onBiometricPress = _.noop,
}) => {
  const [isLatestRow] = useState<boolean>(ciphers.length < 3);

  const renderCipherCell = useCallback(
    (cipher: number) => {
      return (
        <TouchableOpacity
          disabled={isDisabled}
          key={`cipher-cell-${cipher}`}
          onPress={() => onCipherPress(cipher)}
          style={cipherRowStyles.cipherContainer}
        >
          <Text style={cipherRowStyles.cipherText}>{cipher}</Text>
          <Text style={cipherRowStyles.cipherLettersText}>
            {CIPHER_LETTERS[cipher].join(' ')}
          </Text>
        </TouchableOpacity>
      );
    },
    [onCipherPress, isDisabled],
  );

  const renderEmptyCell = useCallback(
    () => <View style={cipherRowStyles.emptyContainer} />,
    [],
  );

  const renderBiometricCell = useCallback(() => {
    if (!biometricType) {
      return renderEmptyCell();
    }

    let biometricImageSource = null;
    switch (biometricType) {
      case 'TouchID':
        biometricImageSource = IMAGES.FINGERPRINT;
        break;
      case 'FaceID':
        biometricImageSource = IMAGES.FACE_ID;
        break;
      default:
        break;
    }

    return (
      <TouchableOpacity
        disabled={isDisabled}
        onPress={onBiometricPress}
        style={cipherRowStyles.emptyContainer}
      >
        <Image
          source={biometricImageSource}
          style={cipherRowStyles.biometricImage}
        />
      </TouchableOpacity>
    );
  }, [isDisabled, biometricType, onBiometricPress]);

  const renderRemoveCell = useCallback(
    () => (
      <TouchableOpacity
        disabled={isDisabled}
        style={cipherRowStyles.emptyContainer}
        onPress={onRemovePress}
      >
        <Image source={IMAGES.CLOSE} />
      </TouchableOpacity>
    ),
    [isDisabled, onRemovePress],
  );

  return (
    <View style={cipherRowStyles.container}>
      {isLatestRow && renderBiometricCell()}
      {_.map(ciphers, renderCipherCell)}
      {isLatestRow && renderRemoveCell()}
    </View>
  );
};

export const VerifyPanel: React.FC<VerifyPanelProps> = ({
  onVerifySuccess,
}) => {
  /* ------ State ------ */
  const dispatch = useDispatch();
  const onSetError = useSetErrorCallback(dispatch);
  const onSetFirstLaunch = useSetFirstLaunchCallback(dispatch);

  const isFirstLaunch = useIsFirstLaunch();

  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [panelStatus, setPanelStatus] = useState<VerifyPanelStatus>(
    PANEL_STATUS.CHECK_FIRST_LAUNCH,
  );
  const [keychainPin, setKeychainPin] = useState<string | null>(null);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [createVerifyPin, setCreateVerifyPin] = useState<string>('');
  const [isEnterPinAvailable, setIsEnterPinAvailable] = useState<boolean>(
    false,
  );

  /* ----- Flow parts ------ */
  const checkFirstLaunch = useCallback(() => {
    const handleFirstLaunch = async () => {
      if (isFirstLaunch) {
        onSetFirstLaunch(false);
        return Keystore.resetPin();
      }
    };

    handleFirstLaunch().then(() => {
      setPanelStatus(PANEL_STATUS.CHECK_PIN_KEYCHAIN);
    });
  }, []);

  const checkBiometricVerify = useCallback(() => {
    TouchID.isSupported()
      .then((biometryType) => {
        setBiometricType(biometryType);
        setPanelStatus(PANEL_STATUS.BIOMETRIC_VERIFY);
      })
      .catch((error) => {
        setPanelStatus(PANEL_STATUS.PIN_ENTER);
      });
  }, [setPanelStatus, setBiometricType]);

  const checkPinKeychain = useCallback(() => {
    Keystore.getPin()
      // Got the key from keystore
      .then((pin) => {
        if (pin) {
          setKeychainPin(pin);
          setPanelStatus(PANEL_STATUS.CHECK_BIOMETRIC_VERIFY);
        } else {
          setPanelStatus(PANEL_STATUS.PIN_CREATE);
        }
      })
      // Key does not present
      .catch((err) => {
        setPanelStatus(PANEL_STATUS.PIN_CREATE);
      });
  }, [setPanelStatus, setKeychainPin]);

  const activatePinInput = useCallback(() => setIsEnterPinAvailable(true), [
    setPanelStatus,
    setIsEnterPinAvailable,
  ]);

  const savePinToKeychain = useCallback(() => {
    Keystore.savePin(enteredPin).then(() => {
      setKeychainPin(enteredPin);
      setEnteredPin('');
      setPanelStatus(PANEL_STATUS.VERIFIED);
    });
  }, [enteredPin, setPanelStatus, setKeychainPin]);

  const verifyEnteredPin = useCallback(() => {
    if (keychainPin === enteredPin) {
      setPanelStatus(PANEL_STATUS.VERIFIED);
    } else {
      onSetError(ErrorType.wrongPin, 'Wrong password');
      setEnteredPin('');
      setPanelStatus(PANEL_STATUS.PIN_ENTER);
    }
  }, [enteredPin, keychainPin, setPanelStatus]);

  const launchBiometricVerify = useCallback(() => {
    TouchID.authenticate('To access your accounts', BIOMETRY_OPTIONS)
      .then(() => setPanelStatus(PANEL_STATUS.VERIFIED))
      .catch(() => {
        setPanelStatus(PANEL_STATUS.PIN_ENTER);
      });
  }, [setPanelStatus]);

  /* ------ Main flow useEffects ------ */

  useEffect(() => {
    if (enteredPin.length === PIN_LENGTH) {
      switch (panelStatus) {
        case PANEL_STATUS.PIN_CREATE:
          setCreateVerifyPin(enteredPin);
          setIsEnterPinAvailable(false);
          setPanelStatus(PANEL_STATUS.PIN_CREATE_VERIFY);
          break;
        case PANEL_STATUS.PIN_CREATE_VERIFY:
          if (enteredPin === createVerifyPin) {
            setPanelStatus(PANEL_STATUS.SAVE_PIN_KEYCHAIN);
            setIsEnterPinAvailable(false);
          } else {
            onSetError(ErrorType.wrongPin, 'Wrong password');
            setEnteredPin('');
          }
          break;
        case PANEL_STATUS.PIN_ENTER:
          setPanelStatus(PANEL_STATUS.PIN_VERIFY);
          break;
      }
    }
  }, [enteredPin]);

  useEffect(() => {
    switch (panelStatus) {
      default:
      case PANEL_STATUS.CHECK_FIRST_LAUNCH:
        checkFirstLaunch();
        break;
      case PANEL_STATUS.CHECK_PIN_KEYCHAIN:
        checkPinKeychain();
        break;
      case PANEL_STATUS.PIN_CREATE:
        activatePinInput();
        break;
      case PANEL_STATUS.PIN_CREATE_VERIFY:
        setEnteredPin('');
        activatePinInput();
        break;
      case PANEL_STATUS.SAVE_PIN_KEYCHAIN:
        savePinToKeychain();
        break;
      case PANEL_STATUS.CHECK_BIOMETRIC_VERIFY:
        checkBiometricVerify();
        break;
      case PANEL_STATUS.PIN_ENTER:
        activatePinInput();
        break;
      case PANEL_STATUS.PIN_VERIFY:
        verifyEnteredPin();
        break;
      case PANEL_STATUS.BIOMETRIC_VERIFY:
        launchBiometricVerify();
        break;
      case PANEL_STATUS.VERIFIED:
        onVerifySuccess();
        break;
    }
  }, [panelStatus]);

  /* ------ UI callbacks ------ */

  const onBiometricPress = useCallback(
    () => setPanelStatus(PANEL_STATUS.BIOMETRIC_VERIFY),
    [setPanelStatus],
  );

  const onRemovePress = useCallback(
    () => setEnteredPin(enteredPin.slice(0, -1)),
    [enteredPin, setEnteredPin],
  );

  const onCipherPress = useCallback(
    (cipher: number) => setEnteredPin(enteredPin + cipher),
    [enteredPin, setEnteredPin],
  );

  const getStatusLabel = useCallback((): string => {
    switch (panelStatus) {
      default:
        return 'Loading..';
      case PANEL_STATUS.PIN_CREATE:
        return 'Create a pin';
      case PANEL_STATUS.PIN_CREATE_VERIFY:
        return 'Verify a pin';
      case PANEL_STATUS.PIN_ENTER:
      case PANEL_STATUS.PIN_VERIFY:
        return 'Enter a pin';
      case PANEL_STATUS.BIOMETRIC_VERIFY:
        return 'Biometric verify..';
      case PANEL_STATUS.VERIFIED:
        return 'Verified!';
    }
  }, [panelStatus]);

  return (
    <View style={styles.container}>
      <View style={styles.panelHeaderContainer}>
        <Text style={styles.panelHeaderTitle}>{getStatusLabel()}</Text>
        <DotsProgress
          filledDotsAmount={enteredPin.length}
          dotsAmount={PIN_LENGTH}
          style={{
            container: styles.panelHeaderAnimatedDotsContainer,
          }}
        />
      </View>
      <FlatList
        data={CIPHERS_BY_ROWS}
        renderItem={({ item: ciphers }) => (
          <CipherRow
            biometricType={
              panelStatus === PANEL_STATUS.PIN_ENTER ||
              panelStatus === PANEL_STATUS.BIOMETRIC_VERIFY
                ? biometricType
                : null
            }
            ciphers={ciphers}
            onCipherPress={onCipherPress}
            onRemovePress={onRemovePress}
            onBiometricPress={onBiometricPress}
            isDisabled={!isEnterPinAvailable}
          />
        )}
        extraData={isEnterPinAvailable}
        keyExtractor={(item, index) => `cipher-row-${item.join()}-${index}`}
        scrollEnabled={false}
        contentContainerStyle={styles.listContentContainer}
        style={styles.listContainer}
      />
    </View>
  );
};
