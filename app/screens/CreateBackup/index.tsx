import React, { useCallback, useMemo, useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { IMAGES } from '../../assets';
import {
  useCreateBackupCallback,
  useLoadBackupCallback,
  useSaveCertificateCallback,
} from '../../redux/certificates';
import { CreateBackupScreenProps } from './create-backup.props';
import { styles } from './create-backup.styles';
import { DefaultTextInput } from '../../components';

export const CreateBackupScreen: React.FC<CreateBackupScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const onCreateBackup = useCreateBackupCallback(dispatch);
  const onLoadBackup = useLoadBackupCallback(dispatch);

  const params = useMemo(() => route.params, []);

  const [key, setKey] = useState<string>('');

  const onSubmitPress = useCallback(() => {
    if (params.isLoadBackup) {
      onLoadBackup(params.backupPath!, key);
    } else {
      onCreateBackup(key);
    }
  }, [key]);

  const onCancelPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Enter the key for backup</Text>
        <View style={styles.inputContainer}>
          <DefaultTextInput
            value={key}
            onChangeText={setKey}
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus
            style={styles.input}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.cancelButtonContainer}
            onPress={onCancelPress}
          >
            <Text style={styles.cancelButtonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.okButtonContainer}
            onPress={onSubmitPress}
            disabled={!key.length}
          >
            <Text style={styles.okButtonText}>
              {params.isLoadBackup ? 'LOAD' : 'CREATE'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
