import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { CertificatesScreen, HomeScreen } from '../../screens';
import { WITHOUT_HEADER_OPTIONS } from '../options';

export type HomeStackParams = {
  Home: undefined;
  Certificates: { credentialsId: string };
};

const Stack = createNativeStackNavigator<HomeStackParams>();

export const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={WITHOUT_HEADER_OPTIONS}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Certificates" component={CertificatesScreen} />
  </Stack.Navigator>
);
