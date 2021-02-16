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
  DoneBackupScreen,
} from '../../screens';
import { IBackupInfo } from '../../utils/types';

export type SettingsStackParams = {
  Settings: undefined;
  Backups: undefined;
  CreateBackup: { isLoadBackup: boolean; backupPath?: string };
  DoneBackup: { backupInfo: IBackupInfo };
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
    <Stack.Screen
      name="DoneBackup"
      component={DoneBackupScreen}
      options={TRANSPARENT_MODAL_WITH_FADE_ANIM_OPTIONS}
    />
  </Stack.Navigator>
);
