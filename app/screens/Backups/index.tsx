import React from 'react';
import { View } from 'react-native';
import { SettingsHeader } from '../../components';

import { BackupsScreenProps } from './backups.props';
import { styles } from './backups.styles';

export const BackupsScreen: React.FC<BackupsScreenProps> = () => {
  return (
    <View style={styles.container}>
      <SettingsHeader title="Settings" isBackButton />
    </View>
  );
};
