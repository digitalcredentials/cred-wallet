import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface CertificateCarouselStyles {
  container: ViewStyle;
  itemContainer: ViewStyle;
  dot: Object;
  dotContainer: Object;
  inactiveDot: Object;
}

export const styles = StyleSheet.create<CertificateCarouselStyles>({
  container: {},
  itemContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    backgroundColor: 'red',
  },
  dot: {
    backgroundColor: COLORS.CRUSTA,
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  dotContainer: {
    marginHorizontal: 2.5,
  },
  inactiveDot: {
    backgroundColor: '#C4C4C4',
  },
});
