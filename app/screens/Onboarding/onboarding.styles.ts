import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface IOnboardingScreenStyles {
  container: ViewStyle;
  swiperItemContainer: ViewStyle;
  swiperItemBodyContainer: any;
  swiperItemTitle: TextStyle;
  swiperItemDescription: TextStyle;
  buttonSkipText: TextStyle;
  paginationContainer: ViewStyle;
  paginationText: TextStyle;
  activeDot: ViewStyle;
  dot: ViewStyle;
}

export const styles = StyleSheet.create<IOnboardingScreenStyles>({
  container: {
    flex: 1,
  },
  swiperItemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  swiperItemBodyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  swiperItemTitle: {
    color: COLORS.BUNTING,
    fontSize: 30,
    fontFamily: FONTS.POPPINS_500,
    textAlign: 'center',
    lineHeight: 37,
    marginTop: 50,
  },
  swiperItemDescription: {
    fontFamily: FONTS.POPPINS_300,
    color: COLORS.SILVER_CHALICE,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    margin: 20,
  },

  buttonSkipText: {
    textAlign: 'center',
    fontFamily: FONTS.POPPINS_300,
    fontSize: 11,
    lineHeight: 14,
    color: COLORS.BUNTING,
    textDecorationLine: 'underline',
    marginBottom: 40,
  },
  paginationContainer: {
    marginRight: 50,
    alignItems: 'flex-end',
  },
  paginationText: {
    fontFamily: FONTS.POPPINS_500,
    fontSize: 30,
    color: COLORS.ORANGE_TRANSPARENT,
  },
  dot: {
    width: 6,
    height: 6,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
    marginBottom: 5,
  },
  activeDot: {
    backgroundColor: COLORS.BLACK,
  },
});
