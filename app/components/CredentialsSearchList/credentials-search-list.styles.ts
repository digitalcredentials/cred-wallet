import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IssuersListStyles {
  container: ViewStyle;
  noResultsContainer: ViewStyle;
  noResultsIconContainer: TextStyle;
  noResultsTitle: TextStyle;
  noResultsSubtitle: TextStyle;
  foundCredentialContainer: ViewStyle;
  foundCredentialImage: ImageStyle;
  foundCredentialSubjectName: TextStyle;
  foundCredentialIssuerName: TextStyle;
  foundCredentialSeparator: ViewStyle;
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
  foundCredentialContainer: {
    borderRadius: 20,
    marginVertical: 15,
    paddingVertical: 7,
    paddingHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foundCredentialImage: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  foundCredentialSubjectName: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 14,
    lineHeight: 21,
    marginRight: 5,
  },
  foundCredentialIssuerName: {
    color: COLORS.SILVER_CHALICE,
    fontFamily: FONTS.POPPINS_300,
    fontSize: 11,
    lineHeight: 16.5,
  },
  foundCredentialSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.GALLERY,
  },
});
