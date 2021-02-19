import process from 'process';
import buffer from 'buffer';
global.Buffer = buffer.Buffer;

import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';

import RootNavigator from './app/navigation/root-navigator';
import { ErrorAlertHandler, Loader } from './app/components';
import { store, persistor } from './app/redux';

import './shim';
import { PersistGate } from 'redux-persist/integration/react';

enableScreens();

const App: React.FC = () => {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <RootNavigator />
            <Loader />
            <ErrorAlertHandler />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
};

export default App;
