import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IAboutScreenStyles {
  container: ViewStyle;
  textContainer: ViewStyle;
  introduction: TextStyle;
  link: TextStyle;
  copyright: TextStyle;
}

export const styles = StyleSheet.create<IAboutScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  textContainer: {
    marginHorizontal: 7,
    marginTop: 15,
  },
  introduction: {
    fontSize: 18,
    fontFamily: FONTS.POPPINS_500,
    color: COLORS.LAVENDER_PURPLE,
  },
  link: { color: COLORS.BAY_OF_MANY },
  copyright: {
    textAlign: 'center',
  },
});
