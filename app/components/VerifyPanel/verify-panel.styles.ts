import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

interface VerifyPanelStyles {
  container: ViewStyle;
  panelHeaderContainer: ViewStyle;
  panelHeaderTitle: TextStyle;
  panelHeaderAnimatedDotsContainer: ViewStyle;
  listContainer: ViewStyle;
  listContentContainer: ViewStyle;
}

export const styles = StyleSheet.create<VerifyPanelStyles>({
  container: {
    flex: 1,
  },
  panelHeaderContainer: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  panelHeaderTitle: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 34,
  },
  panelHeaderAnimatedDotsContainer: {},
  listContainer: {
    flex: 1,
    flexGrow: 3,
  },
  listContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

interface CipherRowStyles {
  container: ViewStyle;
  emptyContainer: ViewStyle;
  cipherContainer: ViewStyle;
  cipherText: TextStyle;
  biometricImage: ImageStyle;
}

export const cipherRowStyles = StyleSheet.create<CipherRowStyles>({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  emptyContainer: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cipherContainer: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cipherText: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: FONTS.SF_PRO_DISPLAY_REGULAR,
  },
  biometricImage: {
    width: 75,
    height: 75,
  },
});
