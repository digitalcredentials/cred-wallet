import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface SettingsHeaderStyles {
  container: ViewStyle;
  backButtonIcon: ViewStyle;
  title: TextStyle;
}

export const styles = StyleSheet.create<SettingsHeaderStyles>({
  container: {
    backgroundColor: COLORS.BUNTING,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButtonIcon: {
    marginRight: -4,
  },
  title: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 30,
    lineHeight: 36.6,
    color: COLORS.WHITE,
    marginTop: 3,
  },
});
