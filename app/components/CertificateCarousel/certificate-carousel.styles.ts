import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface CertificateCarouselStyles {
  container: ViewStyle;
  dot: Object;
  dotContainer: Object;
  inactiveDot: Object;
}

export const styles = StyleSheet.create<CertificateCarouselStyles>({
  container: {
    paddingTop: 32,
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
