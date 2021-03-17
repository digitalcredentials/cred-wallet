import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface CreateBackupStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  title: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  buttonsContainer: ViewStyle;
  cancelButtonContainer: ViewStyle;
  cancelButtonText: TextStyle;
  okButtonContainer: ViewStyle;
  okButtonText: TextStyle;
}

export const styles = StyleSheet.create<CreateBackupStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_TRANSPARENT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '90%',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
  },
  title: {
    fontFamily: FONTS.POPPINS_500,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 25,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 20,
    paddingVertical: 6,
    borderBottomColor: `${COLORS.BAY_OF_MANY}99`,
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButtonContainer: {
    width: '47%',
    padding: 8,
    borderRadius: 100,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BAY_OF_MANY,
  },
  cancelButtonText: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.BAY_OF_MANY,
    textAlign: 'center',
  },
  okButtonContainer: {
    width: '47%',
    padding: 8,
    borderRadius: 100,
    backgroundColor: COLORS.BAY_OF_MANY,
    borderWidth: 1,
    borderColor: COLORS.BAY_OF_MANY,
  },
  okButtonText: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
