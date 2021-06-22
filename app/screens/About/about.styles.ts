import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IAboutScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  sectionTitle: TextStyle;
  link: TextStyle;
  paragraph: TextStyle;
}

export const styles = StyleSheet.create<IAboutScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 10,
    marginTop: 20,
    color: COLORS.CRUSTA,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 11,
    lineHeight: 14,
  },
  paragraph: {
    marginBottom: 5,
    marginTop: 10,
  },
  link: {
    color: 'blue',
  },
});
