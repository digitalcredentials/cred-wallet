import { StyleSheet, ViewStyle } from 'react-native';

import { COLORS } from '../../utils/colors';

interface IPinScreenStyles {
  container: ViewStyle;
  safeAreaContainer: ViewStyle;
  backgroundWhite: ViewStyle;
}

export const styles = StyleSheet.create<IPinScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  safeAreaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundWhite: {
    backgroundColor: COLORS.WHITE,
  },
});
