import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { WITHOUT_HEADER_OPTIONS } from '../options';
import { BackupsScreen, SettingsScreen } from '../../screens';

export type SettingsStackParams = {
  Settings: undefined;
  Backups: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParams>();

export const SettingsStackNavigator = () => (
  <Stack.Navigator screenOptions={WITHOUT_HEADER_OPTIONS}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Backups" component={BackupsScreen} />
  </Stack.Navigator>
);
