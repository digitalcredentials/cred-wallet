import React from 'react';
import { Text, View, Linking } from 'react-native';

import { SettingsHeader } from '../../components';
import { IAboutScreenProps } from './about.props';
import { styles } from './about.styles';

export const AboutScreen: React.FC<IAboutScreenProps> = () => {
  return (
    <View style={styles.container}>
      <SettingsHeader title="About for now" isBackButton />
      <View style={styles.textContainer}>
        <Text style={styles.introduction}>
          This mobile wallet was developed by the Digital Credentials
          Consortium, a network of leading international universities designing
          an open infrastructure for academic credentials. More information at{' '}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL('https://digitalcredentials.mit.edu')
            }
          >
            DC Home
          </Text>
          .{'\n'}
        </Text>
      </View>
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyright}>
          Copyright © 2021{'\n'}Massachusetts Institute of Technology
        </Text>
      </View>
    </View>
  );
};
