import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface PinScreenStyles {
  container: ViewStyle;
  safeAreaContainer: ViewStyle;
  backgroundWhite: ViewStyle;
}

export const styles = StyleSheet.create<PinScreenStyles>({
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
