import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface DotsProgressStyles {
  container: ViewStyle;
  dotContainer: ViewStyle;
  activeDotContainer: ViewStyle;
}

export const styles = StyleSheet.create<DotsProgressStyles>({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  dotContainer: {
    width: 13,
    height: 13,
    marginHorizontal: 14,
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: COLORS.BUNTING,
  },
  activeDotContainer: {
    borderColor: COLORS.CRUSTA,
    backgroundColor: COLORS.CRUSTA,
  },
});
