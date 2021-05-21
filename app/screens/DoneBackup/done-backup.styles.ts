import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IDoneBackupStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  title: TextStyle;
  dateTitle: TextStyle;
  date: TextStyle;
  separator: ViewStyle;
  okButtonContainer: ViewStyle;
  okButtonText: TextStyle;
}

export const styles = StyleSheet.create<IDoneBackupStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_TRANSPARENT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '75%',
    margin: 32,
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: COLORS.ALABASTER,
  },
  title: {
    fontFamily: FONTS.POPPINS_500,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 10,
  },
  dateTitle: {
    textAlign: 'center',
    color: COLORS.LAVENDER_PURPLE,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
  date: {
    textAlign: 'center',
    fontFamily: FONTS.POPPINS_500,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.BAY_OF_MANY,
    marginBottom: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.FRENCH_LILAC,
  },
  okButtonContainer: {
    marginTop: 14,
    alignSelf: 'center',
    width: '50%',
    padding: 8,
    borderRadius: 100,
    backgroundColor: COLORS.BAY_OF_MANY,
    borderWidth: 1,
    borderColor: COLORS.BAY_OF_MANY,
  },
  okButtonText: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
