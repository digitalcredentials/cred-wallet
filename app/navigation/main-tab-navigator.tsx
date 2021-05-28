import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator, SettingsStackNavigator } from './stacks';
import { tabOptions, ScreenStub } from './options';
import { AboutScreen } from '../screens/About';

export type MainTabParams = {
  Home: undefined;
  TabBarPlusButton: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParams>();

export const MainTabNavigator = () => (
  <Tab.Navigator lazy={false}>
    <Tab.Screen
      name="Home"
      component={HomeStackNavigator}
      options={tabOptions.Home}
    />
    <Tab.Screen
      name="TabBarPlusButton"
      component={ScreenStub}
      options={tabOptions.TabBarPlusButton}
    />
    <Tab.Screen
      name="About"
      component={AboutScreen}
      options={tabOptions.About}
    />
  </Tab.Navigator>
);
