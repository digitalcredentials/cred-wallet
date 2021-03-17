import * as React from 'react';
import { Text as ReactNativeText } from 'react-native';
import presets from './text.presets';
import { TextProps } from './text.props';

export const Text: React.FC<TextProps> = ({ style, preset, ...rest }) => {
  const styles = [presets[preset || 'default'], style];

  return <ReactNativeText {...rest} style={styles} />;
};
