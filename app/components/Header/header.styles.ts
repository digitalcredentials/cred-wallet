import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface HeaderStyles {
  container: ViewStyle;
  row: ViewStyle;
  emptyContainer: ViewStyle;
  titleRowContainer: ViewStyle;
  backButtonIcon: ViewStyle;
  backButtonTitle: TextStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
}

export const styles = StyleSheet.create<HeaderStyles>({
  container: {
    backgroundColor: COLORS.BUNTING,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    margin: 16,
    height: 8,
  },
  titleRowContainer: {
    padding: 16,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  backButtonIcon: {
    marginRight: -4,
  },
  backButtonTitle: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.FRENCH_LILAC,
    fontSize: 14,
    lineHeight: 21,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 17,
    lineHeight: 25.5,
    color: COLORS.WHITE,
  },
});
