import process from 'process';
import buffer from 'buffer';
global.Buffer = buffer.Buffer;

import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigator from './app/navigation/root-navigator';
import { ErrorAlertHandler, Loader } from './app/components';
import { store, persistor } from './app/redux';
import * as Sentry from "@sentry/react-native";
import CONFIG from './app/config/env';

import './shim';

enableScreens();

if (!__DEV__) {
  Sentry.init({
    dsn: CONFIG.SENTRY_URL,
    integrations: [
      new Sentry.BrowserIntegrations.Breadcrumbs({
        dom: false
      }),
    ]
  });
}

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
