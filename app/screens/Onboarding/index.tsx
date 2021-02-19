import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { Text } from '../../components';
import { useSetIsShownOnboarding } from '../../redux/cache';
import { OnboardingScreenProps } from './onboarding.props';
import { styles } from './onboarding.styles';
import { SWIPER_ITEMS } from './onboaring.data';
import { ISwiperItem } from '../../utils/types';

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const onSetIsShownOnboarding = useSetIsShownOnboarding(dispatch);
  const onSkipPress = useCallback(() => {
    navigation.replace('Pin', { isPushed: false });
    onSetIsShownOnboarding(true);
  }, [navigation]);

  const renderSwiperItem = useCallback(
    (item: ISwiperItem, index: number, items: ISwiperItem[]) => (
      <View style={styles.swiperItemContainer} key={item.id}>
        <View style={styles.swiperItemBodyContainer}>
          <Image source={item.image} />
          <Text style={styles.swiperItemTitle}>{item.title}</Text>
          <Text style={styles.swiperItemDescription}>{item.description}</Text>
        </View>
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>
            {index + 1}/{items.length}
          </Text>
        </View>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        activeDotStyle={[styles.dot, styles.activeDot]}
        dotStyle={styles.dot}
      >
        {_.map(SWIPER_ITEMS, renderSwiperItem)}
      </Swiper>

      <Text style={styles.buttonSkipText} onPress={onSkipPress}>
        Skip
      </Text>
    </SafeAreaView>
  );
};
