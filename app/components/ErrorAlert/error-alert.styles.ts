import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface ErrorAlertStyles {
  container: ViewStyle;
  errorContainer: ViewStyle;
  errorText: TextStyle;
}

export const styles = StyleSheet.create<ErrorAlertStyles>({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  errorContainer: {
    paddingVertical: 6,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: COLORS.PIPPIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.THUNDERBIRD,
  },
});
