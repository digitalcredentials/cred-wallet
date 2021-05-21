import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import {
  useCreateBackupCallback,
  useLoadBackupCallback,
} from '../../redux/certificates';
import { ICreateBackupScreenProps } from './create-backup.props';
import { styles } from './create-backup.styles';
import { DefaultTextInput } from '../../components';

export const CreateBackupScreen: React.FC<ICreateBackupScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const onCreateBackup = useCreateBackupCallback(dispatch);
  const onLoadBackup = useLoadBackupCallback(dispatch);

  const params = useMemo(() => route.params, []);

  const [key, setKey] = useState<string>('');

  const onSubmitPress = () => {
    if (params.isLoadBackup) {
      onLoadBackup(params.backupPath!, key);
    } else {
      onCreateBackup(key);
    }
  };

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
            onPress={navigation.goBack}
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
