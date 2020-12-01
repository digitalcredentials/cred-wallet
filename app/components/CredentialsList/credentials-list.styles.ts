import { ViewStyle, StyleSheet, ImageStyle, TextStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IssuersListStyles {
  container: ViewStyle;
  issuerContainer: ViewStyle;
  issuerImage: ImageStyle;
  issuerTitle: TextStyle;
  issuerCertificates: TextStyle;
}

export const styles: IssuersListStyles = StyleSheet.create<IssuersListStyles>({
  container: {
    flex: 1,
    padding: 20,
  },
  issuerContainer: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 6,
    borderRadius: 14,
    overflow: 'hidden',
    margin: 10,
    borderWidth: 1,
    borderColor: `${COLORS.BUNTING}99`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  issuerImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  issuerTitle: {
    fontFamily: FONTS.POPPINS_600,
    fontSize: 17,
    lineHeight: 25,
  },
  issuerCertificates: {
    marginTop: 1,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BUNTING,
    fontSize: 12,
    lineHeight: 14,
  },
});
