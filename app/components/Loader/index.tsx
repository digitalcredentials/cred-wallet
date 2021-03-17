import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, View, Text } from 'react-native';

import { IMAGES } from '../../assets';
import { useIsLoading } from '../../redux/app';
import { styles } from './loader.styles';

const ANIMATION_PAUSE = 400;

export const Loader: React.FC = () => {
  const isLoading = useIsLoading();

  const [activeImage, setActiveImage] = useState<any>(IMAGES.TIMER);

  const setNextActiveMessage = useCallback(() => {
    switch (activeImage) {
      case IMAGES.TIMER:
        setActiveImage(IMAGES.TIMER_POS_2);
        break;
      case IMAGES.TIMER_POS_2:
        setActiveImage(IMAGES.TIMER_POS_3);
        break;
      case IMAGES.TIMER_POS_3:
        setActiveImage(IMAGES.TIMER);
        break;
    }
  }, [activeImage, setActiveImage]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setNextActiveMessage(), ANIMATION_PAUSE);
    }
  }, [isLoading, activeImage]);

  return isLoading ? (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <Image source={activeImage} style={styles.timerImage} />
        <Text style={styles.timerDescription}>give me a sec...</Text>
      </View>
    </View>
  ) : null;
};
