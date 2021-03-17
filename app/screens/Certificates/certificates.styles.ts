import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface CertificatesScreenStyles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<CertificatesScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
