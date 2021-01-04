import React, { useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';

import { IMAGES } from '../../assets';
import { DefaultButton, SettingsHeader } from '../../components';
import { useCreateBackupCallback } from '../../redux/certificates';
import { BackupsScreenProps } from './backups.props';
import { styles } from './backups.styles';

export const BackupsScreen: React.FC<BackupsScreenProps> = () => {
  const dispatch = useDispatch();
  const onCreateBackup = useCreateBackupCallback(dispatch);

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

        <View style={styles.flexContainer} />

        <DefaultButton title="Create Backup" onPress={onCreateBackupPress} />
      </View>
    </View>
  );
};
