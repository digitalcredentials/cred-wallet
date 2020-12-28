import { TextStyle, ViewStyle } from 'react-native';

export interface HeaderProps {
  title: string;
  backButtonTitle?: string | null;
  style?: {
    container?: ViewStyle;
    titleRowContainer?: ViewStyle;
    backButtonIcon?: ViewStyle;
    backButtonTitle?: TextStyle;
    titleContainer?: ViewStyle;
    title?: TextStyle;
  };
}
