import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import { IAboutScreenProps } from './about.props';
import { styles } from './about.styles';
import { SettingsHeader } from '../../components';
import { name as app_name, version as app_version }  from '../../../package.json';

export const AboutScreen: React.FC<IAboutScreenProps> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <SettingsHeader title="About" />
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>
          { app_name } { app_version }
        </Text>
        <Text style={styles.paragraph}>
          This mobile wallet was developed by the Digital Credentials Consortium, a network of leading international universities designing an open infrastructure for academic credentials.
        </Text>
        <Text style={styles.paragraph}>
            More information at <Text style={styles.link} onPress={() => Linking.openURL('https://digitalcredentials.mit.edu')} >https://digitalcredentials.mit.edu</Text>.
        </Text>
        <Text style={styles.paragraph}>
          Copyright 2021 Massachusetts Institute of Technology
        </Text>
      </View>
    </View>
  );
};
