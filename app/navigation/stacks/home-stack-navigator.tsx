import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import {
  CertificatesScreen,
  CertificateViewScreen,
  CertificateSearchViewScreen,
  HomeScreen,
} from '../../screens';
import { TRANSPARENT_MODAL_OPTIONS, WITHOUT_HEADER_OPTIONS } from '../options';

export type HomeStackParams = {
  Home: undefined;
  Certificates: { credentialsId: string };
  CertificateView: { certificateId: string; issuerId: string };
  CertificateSearchView: { certificateId: string; issuerId: string };
};

const Stack = createNativeStackNavigator<HomeStackParams>();

export const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={WITHOUT_HEADER_OPTIONS}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Certificates" component={CertificatesScreen} />
    <Stack.Screen
      name="CertificateView"
      component={CertificateViewScreen}
      options={TRANSPARENT_MODAL_OPTIONS}
    />
    <Stack.Screen
      name="CertificateSearchView"
      component={CertificateSearchViewScreen}
    />
  </Stack.Navigator>
);
