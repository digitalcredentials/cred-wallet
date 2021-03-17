import { ImageStyle, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface TabBarPlusButtonStyles {
  container: ViewStyle;
  iconContainer: ViewStyle;
  icon: ImageStyle;
}

export const styles = StyleSheet.create<TabBarPlusButtonStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.BAY_OF_MANY,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
