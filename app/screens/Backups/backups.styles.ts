import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface BackupsScreenStyles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<BackupsScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
