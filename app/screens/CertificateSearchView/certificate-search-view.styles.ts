import { StyleSheet, ViewStyle } from 'react-native';

interface ICertificateViewScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  flexContainer: ViewStyle;
}

export const styles = StyleSheet.create<ICertificateViewScreenStyles>({
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
