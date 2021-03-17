import { ViewStyle, StyleSheet, TextStyle, ViewBase } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface SearchBarStyles {
  container: ViewStyle;
  input: TextStyle;
  searchContainer: ViewStyle;
}

export const styles: SearchBarStyles = StyleSheet.create<SearchBarStyles>({
  container: {
    backgroundColor: COLORS.BUNTING,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  searchContainer: {
    margin: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: COLORS.ALABASTER,
  },
  input: {
    flex: 1,
    paddingBottom: 1,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 17,
    lineHeight: 25,
    paddingHorizontal: 5,
    textAlignVertical: 'center',
  },
});
