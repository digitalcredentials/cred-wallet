import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';
import { CertificateItemPresets } from './certificate-item.props';

interface CertificateItemStyles {
  container: ViewStyle;
  titleContainer: ViewStyle;
  titleText: TextStyle;
  titleImage: ImageStyle;
  credentialName: TextStyle;
  subjectName: TextStyle;
  fieldTitle: TextStyle;
  fieldValue: TextStyle;
  separatorContainer: ViewStyle;
  did: TextStyle;
  moreButtonContainer: ViewStyle;
  moreButtonImage: ImageStyle;
  modalLine: ViewStyle;
  buttonShareContainer: ViewStyle;
}

const baseStyles: CertificateItemStyles = {
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
    marginBottom: 10
  },
  titleText: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 12,
    lineHeight: 20,
  },
  titleImage: {
    width: 64,
    height: 40,
    marginRight: 16,
  },
  credentialName: {
    color: COLORS.BAY_OF_MANY,
    fontFamily: FONTS.POPPINS_500,
    fontSize: 14,
    lineHeight: 25.5,
  },
  subjectName: {
    color: COLORS.BAY_OF_MANY,
    fontFamily: FONTS.POPPINS_500,
    fontSize: 14,
    lineHeight: 25.5,
  },
  fieldTitle: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 12
  },
  fieldValue: {
    fontFamily: FONTS.POPPINS_300,
    fontSize: 12
  },
  separatorContainer: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: COLORS.LAVENDER_PURPLE,
  },
  did: {
    fontSize: 8,
    fontFamily: FONTS.POPPINS_300,
    lineHeight: 10,
  },
  moreButtonContainer: {},
  moreButtonImage: {},
  modalLine: {},
  buttonShareContainer: {},
};

const carouselStyles = StyleSheet.create<CertificateItemStyles>({
  ...baseStyles,
  moreButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  moreButtonImage: {
    width: 30,
    height: 30,
  },
});

const modalStyles = StyleSheet.create<CertificateItemStyles>({
  ...baseStyles,
  modalLine: {
    height: 3,
    borderRadius: 1.5,
    width: 40,
    alignSelf: 'center',
    backgroundColor: COLORS.LAVENDER_PURPLE,
    marginBottom: 19,
    marginTop: -6,
  },
  buttonShareContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: COLORS.LAVENDER_PURPLE,
    marginTop: -38,
    height: 40,
    width: 40,
    borderRadius: 8,
  },
});

export const presetStyles: Record<
  CertificateItemPresets,
  CertificateItemStyles
> = {
  [CertificateItemPresets.Carousel]: carouselStyles,
  [CertificateItemPresets.Modal]: modalStyles,
  [CertificateItemPresets.Fullscreen]: StyleSheet.create<CertificateItemStyles>(
    baseStyles,
  ),
};
