import { StyleSheet, ViewStyle } from 'react-native';

interface CertificateCarouselItemStyles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<CertificateCarouselItemStyles>({
  container: {
    width: '100%',
    height: 400,
    backgroundColor: 'red',
  },
});
