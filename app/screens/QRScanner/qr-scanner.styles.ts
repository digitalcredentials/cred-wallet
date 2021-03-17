import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../utils/colors';

interface QRScannerScreenStyles {
  root: ViewStyle;
  cameraContainer: ViewStyle;
  closeButtonContainer: ViewStyle;
  zeroContainer: ViewStyle;
  cameraMarkerContiner: ViewStyle;
  flex: ViewStyle;
  mainAbsoluteContainer: ViewStyle;
}

export const styles = StyleSheet.create<QRScannerScreenStyles>({
  root: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    height: Dimensions.get('screen').height,
    borderColor: COLORS.BLACK,
    alignSelf: 'center',
  },
  cameraMarkerContiner: {
    flex: 0,
    height: 0,
    borderWidth: 0,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 60,
    right: 32,
    zIndex: 10,
  },
  zeroContainer: {
    flex: 0,
    height: 0,
  },
  flex: {
    flex: 1,
  },
  mainAbsoluteContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
