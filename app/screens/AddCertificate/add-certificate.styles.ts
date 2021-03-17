import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface AddCertificateScreenStyles {
  container: ViewStyle;
  requestContainer: ViewStyle;
  requestTitle: TextStyle;
  certificateInfoContainer: ViewStyle;
  certificateInfoTitleContainer: ViewStyle;
  certificateInfoTitleImage: ImageStyle;
  certificateInfoTitle: ViewStyle;
  certificateInfoIssuer: TextStyle;
  certificateInfoFieldContainer: ViewStyle;
  certificateInfoFieldName: TextStyle;
  certificateInfoFieldValue: TextStyle;
  buttonsContainer: ViewStyle;
  noButtonContainer: ViewStyle;
  noButtonText: TextStyle;
  yesButtonContainer: ViewStyle;
  yesButtonText: TextStyle;
}

export const styles = StyleSheet.create<AddCertificateScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_TRANSPARENT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestContainer: {
    width: '90%',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: COLORS.ALABASTER_LIGHT,
  },
  requestTitle: {
    fontFamily: FONTS.POPPINS_500,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 29,
    marginBottom: 16,
    color: COLORS.BUNTING,
  },
  certificateInfoContainer: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: COLORS.FRENCH_LILAC,
    borderRadius: 10,
  },
  certificateInfoTitleContainer: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    marginBottom: 16,
  },
  certificateInfoTitleImage: {
    borderRadius: 13,
    width: 26,
    height: 26,
    marginRight: 14,
    backgroundColor: COLORS.ALABASTER_LIGHT,
  },
  certificateInfoTitle: {
    fontFamily: FONTS.POPPINS_600,
    fontSize: 17,
    lineHeight: 25.5,
    color: COLORS.BUNTING,
  },
  certificateInfoIssuer: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  certificateInfoFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: 2,
    width: '100%',
  },
  certificateInfoFieldName: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 14,
    lineHeight: 21,
    marginRight: 5,
  },
  certificateInfoFieldValue: {
    fontFamily: FONTS.POPPINS_300,
    fontSize: 11,
  },
  buttonsContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noButtonContainer: {
    width: '47%',
    padding: 8,
    borderRadius: 100,
    backgroundColor: COLORS.ALABASTER_LIGHT,
    borderWidth: 1,
    borderColor: COLORS.BUNTING,
  },
  noButtonText: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.BAY_OF_MANY,
    textAlign: 'center',
  },
  yesButtonContainer: {
    width: '47%',
    padding: 8,
    borderRadius: 100,
    backgroundColor: COLORS.BUNTING,
    borderWidth: 1,
    borderColor: COLORS.BUNTING,
  },
  yesButtonText: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
