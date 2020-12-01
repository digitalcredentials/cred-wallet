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
    height: 150,
    borderRadius: 14,
    margin: 10,
    borderWidth: 1,
    borderColor: `${COLORS.BUNTING}99`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  issuerImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },
  issuerTitle: {
    // TODO: fontFamily
    fontFamily: FONTS.POPPINS_REGULAR,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17.5,
  },
  issuerCertificates: {
    // TODO: fontFamily
    fontSize: 11,
    lineHeight: 13,
    marginBottom: 10,
  },
});
