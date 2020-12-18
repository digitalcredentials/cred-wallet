import React from 'react';
import { View, Image } from 'react-native';
import { BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from 'react-native-screens/native-stack';

import { IMAGES } from '../assets';
import { TabBarPlusButton } from '../components';
import { TabNavigatorOptions } from '../utils/types';
import { styles } from './styles';

export const WITHOUT_HEADER_OPTIONS = {
  headerShown: false,
};

export const TRANSPARENT_MODAL_WITH_FADE_ANIM_OPTIONS: NativeStackNavigationOptions = {
  stackAnimation: 'fade',
  stackPresentation: 'transparentModal',
};

export const TRANSPARENT_MODAL_OPTIONS: NativeStackNavigationOptions = {
  stackPresentation: 'transparentModal',
};

export const ScreenStub: React.FC = () => <View />;

export const tabBarOptions: BottomTabBarOptions = {
  style: styles.tabBar,
  // tabStyle: styles.tabButton,
  // activeBackgroundColor: COLORS.ALABASTER, // or primary color with opacity
};

export const tabOptions: TabNavigatorOptions = {
  Home: {
    title: '',
    tabBarIcon: ({ focused }) => (
      <View
        style={[
          styles.tabBarIconContaier,
          focused ? styles.tabBarIconActiveContainer : null,
        ]}
      >
        <Image
          source={focused ? IMAGES.HOME_ACTIVE : IMAGES.HOME_INACTIVE}
          style={styles.tabBarIcon}
        />
      </View>
    ),
  },
  TabBarPlusButton: {
    title: '',
    tabBarButton: () => <TabBarPlusButton />,
  },
  Settings: {
    title: '',
    tabBarIcon: ({ focused }) => (
      <View
        style={[
          styles.tabBarIconContaier,
          focused ? styles.tabBarIconActiveContainer : null,
        ]}
      >
        <Image
          source={focused ? IMAGES.SETTINGS_ACTIVE : IMAGES.SETTINGS_INACTIVE}
          style={styles.tabBarIcon}
        />
      </View>
    ),
  },
};
