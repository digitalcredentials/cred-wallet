import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../utils/colors';
import { SettingsHeaderProps } from './settings-header.props';
import { styles } from './settings-header.styles';
import { EXTENDED_HIT_SLOP } from '../../utils/constants';

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  isBackButton = false,
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
      {isBackButton && (
        <TouchableOpacity
          onPress={onBackButtonPress}
          hitSlop={EXTENDED_HIT_SLOP}
        >
          <View style={[styles.backButtonIcon, propStyle.backButtonIcon]}>
            <IoniconsIcon
              name="chevron-back"
              size={37}
              color={COLORS.FRENCH_LILAC}
            />
          </View>
        </TouchableOpacity>
      )}

      <Text style={[styles.title, propStyle.title]}>{title}</Text>
    </SafeAreaView>
  );
};
