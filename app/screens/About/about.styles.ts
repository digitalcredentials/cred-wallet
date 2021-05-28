import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface ISettingsScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  sectionTitle: TextStyle;
  itemImage: ImageStyle;
  itemTitle: TextStyle;
  itemContainer: ViewStyle;
  itemChevron: ImageStyle;
}

export const styles = StyleSheet.create<ISettingsScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 10,
    marginTop: 20,
    color: COLORS.CRUSTA,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 11,
    lineHeight: 14,
  },
  itemImage: {
    width: 26,
    height: 19,
    marginRight: 10,
  },
  itemTitle: {
    fontFamily: FONTS.POPPINS_600,
    fontSize: 17,
    lineHeight: 25.5,
    flex: 1,
    color: COLORS.BAY_OF_MANY,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.FRENCH_LILAC}99`,
  },
  itemChevron: {
    marginLeft: 10,
  },
});
