import { ViewStyle } from 'react-native';

export interface DotsProgressProps {
  dotsAmount: number;
  filledDotsAmount: number;
  style?: {
    container?: ViewStyle;
  };
}

export interface DotProps {
  isFilled: boolean;
}
