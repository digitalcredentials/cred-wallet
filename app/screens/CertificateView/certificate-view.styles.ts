import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface CertificateViewScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  flexContainer: ViewStyle;
}

export const styles = StyleSheet.create<CertificateViewScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_TRANSPARENT_BACKGROUND,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    height: '70%',
  },
  flexContainer: {
    flex: 1,
  },
});
