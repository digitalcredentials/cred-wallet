import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import presets from './scene.presets';
import { SceneProps } from './scene.props';

export const Scene: React.FC<SceneProps> = ({ style, preset, ...rest }) => {
  const styles = presets[preset || 'default'];

  return (
    <View style={styles.root}>
      <View style={styles.accentHeader} />
      <SafeAreaView {...rest} style={[styles.safeArea, style]} />
    </View>
  );
};
