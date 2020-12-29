import { TextStyle, ViewStyle } from 'react-native';

export interface SettingsHeaderProps {
  title: string;
  isBackButton?: boolean;
  style?: {
    container?: ViewStyle;
    title?: TextStyle;
    backButtonIcon?: ViewStyle;
  };
}
