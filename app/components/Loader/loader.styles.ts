import { ImageStyle, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface LoaderStyles {
  container: ViewStyle;
  loaderContainer: ViewStyle;
  timerImage: ImageStyle;
  timerDescription: TextStyle;
}

export const styles = StyleSheet.create<LoaderStyles>({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: COLORS.GRAY_TRANSPARENT_BACKGROUND,
  },
  loaderContainer: {
    padding: 30,
    backgroundColor: `${COLORS.WHITE}BB`,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
  },
  timerImage: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  timerDescription: {
    color: COLORS.BAY_OF_MANY,
    fontFamily: FONTS.POPPINS_300,
    fontSize: 17,
    lineHeight: 25,
  },
});
