import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface HomeScreenStyles {
  root: ViewStyle;
  flexContainer: ViewStyle;
  description: TextStyle;
  addCertificateButtonContainer: ViewStyle;
  // TODO: remove it
  addCertificateButtonText: TextStyle;
}

export const styles = StyleSheet.create<HomeScreenStyles>({
  root: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  flexContainer: {
    flex: 1,
  },
  description: {
    marginTop: 15,
  },
  addCertificateButtonContainer: {
    backgroundColor: COLORS.BAY_OF_MANY,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    borderRadius: 37.5,
    right: 16,
    bottom: 18,
  },
  // TODO: replace plus by Icon
  addCertificateButtonText: {
    marginTop: -8,
    fontSize: 64,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
});
