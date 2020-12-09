import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../utils/colors';

interface NavigationStyles {
  tabBar: ViewStyle;
  tabBarIcon: ImageStyle;
  tabBarIconContaier: ViewStyle;
  tabBarIconActiveContainer: ViewStyle;
}

export const styles = StyleSheet.create<NavigationStyles>({
  tabBar: {
    backgroundColor: COLORS.ALABASTER,
  },
  tabBarIcon: {
    width: 20,
    height: 20,
  },
  tabBarIconContaier: {
    marginBottom: -14,
  },
  tabBarIconActiveContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: `${COLORS.CRUSTA}33`,
  },
});
