import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import {
  TRANSPARENT_MODAL_WITH_FADE_ANIM_OPTIONS,
  WITHOUT_HEADER_OPTIONS,
} from '../options';
import {
  BackupsScreen,
  SettingsScreen,
  CreateBackupScreen,
} from '../../screens';

export type SettingsStackParams = {
  Settings: undefined;
  Backups: undefined;
  CreateBackup: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParams>();

export const SettingsStackNavigator = () => (
  <Stack.Navigator screenOptions={WITHOUT_HEADER_OPTIONS}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Backups" component={BackupsScreen} />
    <Stack.Screen
      name="CreateBackup"
      component={CreateBackupScreen}
      options={TRANSPARENT_MODAL_WITH_FADE_ANIM_OPTIONS}
    />
  </Stack.Navigator>
);
