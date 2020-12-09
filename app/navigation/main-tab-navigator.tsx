import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator, SettingsStackNavigator } from './stacks';
import { TabBarPlusButton } from '../components';
import { tabOptions, ScreenStub } from './options';

export type MainTabParams = {
  Home: undefined;
  TabBarPlusButton: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParams>();

export const MainTabNavigator = () => (
  <Tab.Navigator>
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
      name="Settings"
      component={SettingsStackNavigator}
      options={tabOptions.Settings}
    />
  </Tab.Navigator>
);
