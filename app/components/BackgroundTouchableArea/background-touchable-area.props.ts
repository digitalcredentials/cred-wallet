import { ViewStyle } from 'react-native';

export interface BackgroundTouchableAreaProps {
  onPress: () => void;
  zIndex?: number;
  containerStyle?: ViewStyle;
}
