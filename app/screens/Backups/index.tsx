import React, { useCallback, useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { IMAGES } from '../../assets';
import { DefaultButton, SettingsHeader } from '../../components';
import { useBackups, useCreateBackupCallback } from '../../redux/certificates';
import { BackupsScreenProps } from './backups.props';
import { styles } from './backups.styles';
import { useKeyExtractor, useSpecificKeyExtractor } from '../../utils/hooks';
import { IBackupInfo } from '../../utils/types';
import { getSocialShareImageSource } from '../../utils';

export const BackupsScreen: React.FC<BackupsScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const backups = useBackups();
  const backupsByDate = useMemo(() => _.orderBy(backups, 'date', 'desc'), [
    backups,
  ]);

  const onCreateBackupPress = useCallback(() => {
    navigation.navigate('CreateBackup');
  }, [navigation]);

  const backupListKeyExtractor = useSpecificKeyExtractor<IBackupInfo>(
    'backup-item',
    'date',
  );

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
          data={backupsByDate}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.backupItemContainer}>
              <Image
                source={getSocialShareImageSource(item.activityType!)}
                style={styles.backupItemImage}
              />
              <Text style={styles.backupItemText}>
                {moment(item.date).format('YYYY/MM/DD HH:mm')}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.backupsListContentContainer}
          keyExtractor={backupListKeyExtractor}
        />

        <DefaultButton title="Create Backup" onPress={onCreateBackupPress} />
      </View>
    </View>
  );
};
