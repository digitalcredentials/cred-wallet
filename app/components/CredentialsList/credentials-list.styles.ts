import { ViewStyle, StyleSheet, ImageStyle, TextStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IssuersListStyles {
  container: ViewStyle;
  flexContainer: ViewStyle;
  rowContainer: ViewStyle;
  issuerContainer: ViewStyle;
  issuerContainerSelected: ViewStyle;
  issuerImage: ImageStyle;
  issuerTitle: TextStyle;
  issuerTitleSelected: TextStyle;
  issuerCertificates: TextStyle;
  issuerCertificatesSelected: TextStyle;
  chevronIcon: ImageStyle;
}

export const styles: IssuersListStyles = StyleSheet.create<IssuersListStyles>({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  flexContainer: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  issuerContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    marginVertical: 8,
    overflow: 'hidden',
    margin: 10,
    borderWidth: 1,
    borderColor: `${COLORS.BUNTING}33`,
    justifyContent: 'center',
  },
  issuerContainerSelected: {
    backgroundColor: COLORS.FRENCH_LILAC,
  },
  issuerImage: {
    width: 20,
    height: 13.7,
    marginLeft: 16,
  },
  issuerTitle: {
    color: COLORS.BAY_OF_MANY,
    fontFamily: FONTS.POPPINS_600,
    fontSize: 17,
    lineHeight: 25,
  },
  issuerTitleSelected: {
    color: COLORS.WHITE,
  },
  issuerCertificates: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 12,
    lineHeight: 14,
  },
  issuerCertificatesSelected: {
    color: COLORS.WHITE,
  },
  chevronIcon: {
    width: 10.77,
    height: 17.07,
  },
});
