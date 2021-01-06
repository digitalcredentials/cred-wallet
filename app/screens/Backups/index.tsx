import React, { useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { IMAGES } from '../../assets';
import { DefaultButton, SettingsHeader } from '../../components';
import { useBackups, useCreateBackupCallback } from '../../redux/certificates';
import { BackupsScreenProps } from './backups.props';
import { styles } from './backups.styles';

export const BackupsScreen: React.FC<BackupsScreenProps> = () => {
  const dispatch = useDispatch();
  const onCreateBackup = useCreateBackupCallback(dispatch);
  const backups = useBackups();

  const onCreateBackupPress = useCallback(() => {
    // TODO remove hardcode
    onCreateBackup('1234');
  }, [onCreateBackup]);

  return (
    <View style={styles.container}>
      <SettingsHeader title="Settings" isBackButton />

      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Cloud storage</Text>

        <View style={styles.cloudImageContainer}>
          <Image source={IMAGES.CLOUD} style={styles.cloudImage} />
        </View>

        <Text style={styles.sectionTitle}>My backups</Text>

        <FlatList
          data={backups}
          renderItem={({ item }) => (
            <Text style={styles.backupItem}>
              {moment(item.date).format('YYYY/MM/DD HH:mm')}
            </Text>
          )}
        />

        <DefaultButton title="Create Backup" onPress={onCreateBackupPress} />
      </View>
    </View>
  );
};
