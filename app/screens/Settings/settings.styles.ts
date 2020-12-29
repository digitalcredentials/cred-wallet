import { StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface SettingsScreenStyles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<SettingsScreenStyles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
