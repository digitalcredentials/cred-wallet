import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface QRScannerScreenStyles {
  root: ViewStyle;
}

export const styles = StyleSheet.create<QRScannerScreenStyles>({
  root: {
    flex: 1,
    backgroundColor: COLORS.GRAY_TRANSPARENT_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
