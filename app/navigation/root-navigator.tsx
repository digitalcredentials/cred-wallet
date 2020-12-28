import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { PinScreen, QRScannerScreen, AddCertificateScreen } from '../screens';
import { MainTabNavigator } from './main-tab-navigator';
import {
  MODAL_OPTIONS,
  TRANSPARENT_MODAL_WITH_FADE_ANIM_OPTIONS,
  WITHOUT_HEADER_OPTIONS,
} from './options';
import { navigationRef } from '../services/navigator';
import { ICertificate, IIssuer } from '../utils/types';

export type RootParams = {
  Pin: { isPushed: boolean };
  QRScanner: undefined;
  AddCertificate: { certificate: ICertificate; issuer: IIssuer };
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootParams>();

const RootNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator screenOptions={WITHOUT_HEADER_OPTIONS}>
      <Stack.Screen
        name="Pin"
        component={PinScreen}
        options={TRANSPARENT_MODAL_WITH_FADE_ANIM_OPTIONS}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={MODAL_OPTIONS}
      />
      <Stack.Screen
        name="AddCertificate"
        component={AddCertificateScreen}
        options={TRANSPARENT_MODAL_WITH_FADE_ANIM_OPTIONS}
      />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
