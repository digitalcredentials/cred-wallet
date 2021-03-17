import { ViewStyle, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../utils/colors';

const { width } = Dimensions.get('screen');

interface SceneStyles {
  root: ViewStyle;
  safeArea: ViewStyle;
  accentHeader: ViewStyle;
}

export type ScenePreset = 'default' | 'accent';

type ScenePresetStyles = {
  [preset in ScenePreset]: SceneStyles;
};

const styles: ScenePresetStyles = {
  default: StyleSheet.create<SceneStyles>({
    root: {
      flex: 1,
    },
    accentHeader: {
      display: 'none',
    },
    safeArea: {
      flex: 1,
    },
  }),
  accent: StyleSheet.create<SceneStyles>({
    root: {
      flex: 1,
    },
    accentHeader: {
      position: 'absolute',
      top: -(width * 3 - 100),
      width: width * 3,
      height: width * 3,
      borderRadius: width * 1.5,
      alignSelf: 'center',
      backgroundColor: COLORS.PRIMARY,
    },
    safeArea: {
      flex: 1,
    },
  }),
};

export default styles;
