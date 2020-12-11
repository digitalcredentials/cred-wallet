import { Dimensions, StyleSheet, ViewStyle } from 'react-native';

interface CertificateCarouselStyles {
  container: ViewStyle;
  itemContainer: ViewStyle;
}

export const styles = StyleSheet.create<CertificateCarouselStyles>({
  container: {},
  itemContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    backgroundColor: 'red',
  },
});
