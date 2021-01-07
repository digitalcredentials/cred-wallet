import React, { useCallback, useMemo, useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { IMAGES } from '../../assets';
import {
  useCreateBackupCallback,
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

  const [key, setKey] = useState<string>('');

  const onCreatePress = useCallback(() => {
    onCreateBackup(key);
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
            onPress={onCreatePress}
            disabled={!key.length}
          >
            <Text style={styles.okButtonText}>CREATE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
