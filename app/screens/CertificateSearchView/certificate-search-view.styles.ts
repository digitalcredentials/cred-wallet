import { StyleSheet, ViewStyle } from 'react-native';

interface CertificateViewScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  flexContainer: ViewStyle;
}

export const styles = StyleSheet.create<CertificateViewScreenStyles>({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  flexContainer: {
    flex: 1,
  },
});
