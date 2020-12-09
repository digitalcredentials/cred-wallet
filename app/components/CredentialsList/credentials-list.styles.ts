import { ViewStyle, StyleSheet, ImageStyle, TextStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IssuersListStyles {
  container: ViewStyle;
  rowContainer: ViewStyle;
  issuerContainer: ViewStyle;
  issuerImage: ImageStyle;
  issuerTitle: TextStyle;
  issuerCertificatesContainer: ViewStyle;
  issuerCertificates: TextStyle;
}

export const styles: IssuersListStyles = StyleSheet.create<IssuersListStyles>({
  container: {
    flex: 1,
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  issuerContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
    margin: 10,
    borderWidth: 1,
    borderColor: `${COLORS.BUNTING}99`,
    justifyContent: 'center',
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
  issuerCertificatesContainer: {
    paddingTop: 3,
    paddingBottom: 2,
    backgroundColor: COLORS.LAVENDER_PURPLE,
    maxWidth: 110,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
  },
  issuerCertificates: {
    marginTop: 1,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.WHITE,
    fontSize: 12,
    lineHeight: 14,
  },
});
