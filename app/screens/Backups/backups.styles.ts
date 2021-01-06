import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface BackupsScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  sectionTitle: TextStyle;
  cloudImageContainer: ViewStyle;
  cloudImage: ImageStyle;
  flexContainer: ViewStyle;
  backupItem: TextStyle;
}

export const styles = StyleSheet.create<BackupsScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 30,
    lineHeight: 36,
    marginVertical: 20,
    color: COLORS.LAVENDER_PURPLE,
  },
  cloudImageContainer: {},
  cloudImage: {
    alignSelf: 'center',
  },
  flexContainer: {
    flex: 1,
  },
  backupItem: {
    fontSize: 13,
    lineHeight: 20,
    paddingVertical: 5,
    marginBottom: 10,
    color: COLORS.CRUSTA,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.LAVENDER_PURPLE}99`,
  },
});
