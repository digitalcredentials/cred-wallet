import { ViewStyle, StyleSheet } from 'react-native';

interface IssuersListStyles {
  container: ViewStyle;
}

export const styles: IssuersListStyles = StyleSheet.create<IssuersListStyles>({
  container: {
    flex: 1,
    padding: 16,
  },
});
