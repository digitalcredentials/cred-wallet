import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { COLORS } from '../../utils/colors';

interface IHomeScreenStyles {
  root: ViewStyle;
  flexContainer: ViewStyle;
  description: TextStyle;
}

export const styles = StyleSheet.create<IHomeScreenStyles>({
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
