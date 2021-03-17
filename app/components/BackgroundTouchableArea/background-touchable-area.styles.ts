import { StyleSheet, ViewStyle } from 'react-native';

interface BackgroundTouchableAreaStyles {
  container: ViewStyle;
}

export const styles = StyleSheet.create<BackgroundTouchableAreaStyles>({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
