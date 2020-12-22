import React from 'react';
import { Image, View, Text } from 'react-native';

import { IMAGES } from '../../assets';
import { useIsLoading } from '../../redux/app';
import { styles } from './loader.styles';

export const Loader: React.FC = () => {
  const isLoading = useIsLoading();

  return isLoading ? (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <Image source={IMAGES.TIMER} style={styles.timerImage} />
        <Text style={styles.timerDescription}>give me a sec...</Text>
      </View>
    </View>
  ) : null;
};
