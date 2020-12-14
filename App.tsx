import process from 'process';
import buffer from 'buffer';
global.Buffer = buffer.Buffer;

import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import RootNavigator from './app/navigation/root-navigator';
import { store } from './app/redux';

import './shim';

enableScreens();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
