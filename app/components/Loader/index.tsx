import React from 'react';
import { Image, View, Text } from 'react-native';

import { IMAGES } from '../../assets';
import { styles } from './loader.styles';

export const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <Image source={IMAGES.TIMER} style={styles.timerImage} />
        <Text style={styles.timerDescription}>give me a sec...</Text>
      </View>
    </View>
  );
};
