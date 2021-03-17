import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface CertificateCarouselStyles {
  container: ViewStyle;
  carouselContainer: Object;
  dot: Object;
  dotContainer: Object;
  inactiveDot: Object;
}

export const styles = StyleSheet.create<CertificateCarouselStyles>({
  container: {
    paddingTop: 32,
    paddingBottom: 64,
    flex: 1,
  },
  carouselContainer: {
    justifyContent: 'center',
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
