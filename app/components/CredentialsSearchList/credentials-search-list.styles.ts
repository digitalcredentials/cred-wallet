import { ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IssuersListStyles {
  container: ViewStyle;
  noResultsContainer: ViewStyle;
  noResultsIconContainer: TextStyle;
  noResultsTitle: TextStyle;
  noResultsSubtitle: TextStyle;
}

export const styles: IssuersListStyles = StyleSheet.create<IssuersListStyles>({
  container: {
    flex: 1,
    padding: 16,
  },
  noResultsContainer: {
    flex: 1,
    paddingTop: 74,
    alignItems: 'center',
  },
  noResultsIconContainer: {
    marginBottom: 30,
  },
  noResultsTitle: {
    marginBottom: 10,
    fontFamily: FONTS.POPPINS_500,
    fontSize: 17,
    lineHeight: 25.5,
  },
  noResultsSubtitle: {
    fontFamily: FONTS.POPPINS_300,
    color: COLORS.SILVER,
    fontSize: 11,
    lineHeight: 14,
  },
});
