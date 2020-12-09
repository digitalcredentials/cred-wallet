import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface AddCertificateScreenStyles {
  container: ViewStyle;
  requestContainer: ViewStyle;
  requestTitle: TextStyle;
  certificateInfoContainer: ViewStyle;
  certificateInfoTitle: TextStyle;
  certificateInfoPhotoArea: ViewStyle;
  certificateInfoPhotoContainer: ViewStyle;
  certificateInfoPhoto: ImageStyle;
  certificateInfoFieldsContainer: ViewStyle;
  certificateInfoFieldContainer: ViewStyle;
  certificateInfoFieldName: TextStyle;
  certificateInfoFieldValue: TextStyle;
  certificateInfoSeparator: ViewStyle;
  certificateInfoUsernameRow: ViewStyle;
  certificateInfoUsername: TextStyle;
  certificateInfoSignIcon: ImageStyle;
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
    backgroundColor: COLORS.WHITE,
  },
  requestTitle: {
    // TODO: fontFamily
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 25,
    marginBottom: 16,
  },
  certificateInfoContainer: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: COLORS.MISCHKA,
    borderRadius: 10,
  },
  certificateInfoTitle: {
    // TODO: fontFamily
    fontSize: 14,
    lineHeight: 17.5,
    fontWeight: '500',
    marginBottom: 16,
  },
  certificateInfoPhotoArea: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  certificateInfoPhotoContainer: {
    width: 59,
    height: 64,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: COLORS.WHITE,
  },
  certificateInfoPhoto: {},
  certificateInfoFieldsContainer: {
    justifyContent: 'center',
  },
  certificateInfoFieldContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    width: '78%',
  },
  certificateInfoFieldName: {
    // TODO: fontFamily
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 13.75,
    marginRight: 4,
  },
  certificateInfoFieldValue: {
    // TODO: fontFamily
    fontSize: 11,
    lineHeight: 13.75,
  },
  certificateInfoSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.BLACK,
  },
  certificateInfoSignIcon: {
    width: 32,
    height: 32,
    position: 'absolute',
    right: 0,
  },
  certificateInfoUsernameRow: {
    marginTop: 16,
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificateInfoUsername: {
    // TODO: fontFamily
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
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
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BAY_OF_MANY,
  },
  noButtonText: {
    // TODO: fontFamily
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.BAY_OF_MANY,
    textAlign: 'center',
  },
  yesButtonContainer: {
    width: '47%',
    padding: 8,
    borderRadius: 100,
    backgroundColor: COLORS.BAY_OF_MANY,
    borderWidth: 1,
    borderColor: COLORS.BAY_OF_MANY,
  },
  yesButtonText: {
    // TODO: fontFamuly
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
