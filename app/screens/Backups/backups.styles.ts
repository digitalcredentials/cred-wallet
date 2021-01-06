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
  backupsListContentContainer: ViewStyle;
  backupItemContainer: ViewStyle;
  backupItemText: TextStyle;
  backupItemImage: ImageStyle;
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
  backupsListContentContainer: {
    paddingBottom: 16,
  },
  backupItemContainer: {
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.LAVENDER_PURPLE}99`,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  backupItemText: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.CRUSTA,
  },
  backupItemImage: {
    height: 20,
    width: 22,
    marginRight: 8,
  },
});
