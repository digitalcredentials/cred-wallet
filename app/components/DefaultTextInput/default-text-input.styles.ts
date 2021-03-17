import { ViewStyle, StyleSheet } from 'react-native';

interface DefaultTextInputStyles {
  input: ViewStyle;
}

export const styles: DefaultTextInputStyles = StyleSheet.create<
  DefaultTextInputStyles
>({
  input: {
    fontSize: 14,
  },
});
