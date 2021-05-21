import { StyleSheet, ViewStyle } from 'react-native';

import { COLORS } from '../../utils/colors';

interface ICertificateViewScreenStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  flexContainer: ViewStyle;
}

export const styles = StyleSheet.create<ICertificateViewScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_TRANSPARENT_BACKGROUND,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    height: '70%',
  },
  flexContainer: {
    flex: 1,
  },
});
