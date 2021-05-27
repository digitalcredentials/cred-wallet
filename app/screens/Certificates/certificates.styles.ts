import { StyleSheet, ViewStyle } from 'react-native';

import { COLORS } from '../../utils/colors';

interface ICertificatesScreenStyles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<ICertificatesScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
