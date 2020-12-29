import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface DefaultButtonStyles {
  container: ViewStyle;
  text: TextStyle;
}

export const styles = StyleSheet.create<DefaultButtonStyles>({
  container: {
    backgroundColor: COLORS.BAY_OF_MANY,
    borderRadius: 100,
    paddingHorizontal: 40,
    paddingVertical: 9,
  },
  text: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 17,
    lineHeight: 25,
    color: COLORS.WHITE,
  },
});
