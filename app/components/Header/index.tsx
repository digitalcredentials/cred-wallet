import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { HeaderProps } from './header.props';
import { styles } from './header.styles';
import { EXTENDED_HIT_SLOP } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/colors';

export const Header: React.FC<HeaderProps> = ({
  title,
  backButtonTitle,
  style: propStyle = {},
}) => {
  const navigation = useNavigation();

  const onBackButtonPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView
      style={[styles.container, propStyle.container]}
      edges={['top']}
    >
      <View style={[styles.titleRowContainer, propStyle.titleRowContainer]}>
        <TouchableOpacity
          onPress={onBackButtonPress}
          style={styles.row}
          hitSlop={EXTENDED_HIT_SLOP}
        >
          <View style={[styles.backButtonIcon, propStyle.backButtonIcon]}>
            <IoniconsIcon
              name="chevron-back"
              size={37}
              color={COLORS.FRENCH_LILAC}
            />
          </View>
          <Text style={[styles.backButtonTitle, propStyle.backButtonTitle]}>
            {backButtonTitle}
          </Text>
        </TouchableOpacity>

        <View
          style={[styles.titleContainer, propStyle.titleContainer]}
          pointerEvents="none"
        >
          <Text style={[styles.title, propStyle.title]}>{title}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
