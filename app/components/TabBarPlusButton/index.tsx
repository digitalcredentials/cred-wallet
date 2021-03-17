import React, { useCallback } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IMAGES } from '../../assets';
import { TabBarPlusButtonProps } from './tab-bar-plus-button.props';
import { styles } from './tab-bar-plus-button.styles';

export const TabBarPlusButton: React.FC<TabBarPlusButtonProps> = () => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('QRScanner');
  }, [navigation]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={IMAGES.PLUS_ICON} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};
