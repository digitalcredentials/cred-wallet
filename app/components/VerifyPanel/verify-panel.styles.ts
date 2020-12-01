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
    alignItems: 'center',
  },
  panelHeaderTitle: {
    marginTop: 40,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BUNTING,
    fontSize: 34,
  },
  panelHeaderAnimatedDotsContainer: {
    marginTop: 30,
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

interface CipherRowStyles {
  container: ViewStyle;
  emptyContainer: ViewStyle;
  cipherContainer: ViewStyle;
  cipherText: TextStyle;
  cipherLettersText: TextStyle;
  biometricImage: ImageStyle;
}

export const cipherRowStyles = StyleSheet.create<CipherRowStyles>({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 47,
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
    borderWidth: 1,
    borderColor: COLORS.BUNTING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cipherText: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: FONTS.SF_PRO_DISPLAY_REGULAR,
    color: COLORS.BUNTING,
  },
  cipherLettersText: {
    marginTop: -3,
    fontSize: 10,
    fontFamily: FONTS.SF_PRO_DISPLAY_REGULAR,
    letterSpacing: 0.7,
    lineHeight: 12,
  },
  biometricImage: {
    width: 75,
    height: 75,
  },
});
