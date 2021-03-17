import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface HomeScreenStyles {
  root: ViewStyle;
  flexContainer: ViewStyle;
  description: TextStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  root: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  flexContainer: {
    flex: 1,
  },
  description: {
    marginTop: 15,
  },
});
