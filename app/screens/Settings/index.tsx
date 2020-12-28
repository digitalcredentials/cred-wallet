import React from 'react';
import { View } from 'react-native';

import { SettingsScreenProps } from './settings.props';
import { styles } from './settings.styles';
import { Header } from '../../components';

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  // const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Header title="Settings" />
    </View>
  );
};
