import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface CertificateCarouselItemStyles {
  container: ViewStyle;
  titleContainer: ViewStyle;
  titleImage: ImageStyle;
  titleIssuer: TextStyle;
  name: TextStyle;
  description: TextStyle;
  valueTitle: TextStyle;
  value: TextStyle;
  separatorContainer: ViewStyle;
}

export const styles = StyleSheet.create<CertificateCarouselItemStyles>({
  container: {
    width: '100%',
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.FRENCH_LILAC,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  titleImage: {
    width: 64,
    height: 40,
    marginRight: 16,
  },
  titleIssuer: {
    fontFamily: FONTS.POPPINS_600,
    fontSize: 17,
    lineHeight: 25.5,
    color: COLORS.BAY_OF_MANY,
  },
  name: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 14,
    lineHeight: 21,
  },
  description: {
    fontFamily: FONTS.POPPINS_300,
    fontSize: 11,
    lineHeight: 13,
  },
  valueTitle: {
    color: COLORS.BAY_OF_MANY,
    fontFamily: FONTS.POPPINS_500,
    fontSize: 14,
    lineHeight: 21,
  },
  value: {
    fontFamily: FONTS.POPPINS_300,
    fontSize: 11,
    lineHeight: 13,
  },
  separatorContainer: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: COLORS.LAVENDER_PURPLE,
  },
});
