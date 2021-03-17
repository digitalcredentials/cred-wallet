import RNReactotron, { ReactotronReactNative } from 'reactotron-react-native';
import { NativeModules } from 'react-native';
import { Reactotron } from 'reactotron-core-client';
import AsyncStorage from '@react-native-community/async-storage';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

let reactotron: Reactotron<ReactotronReactNative> | undefined;

// grabs the ip address
const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

__DEV__ &&
  (function reactotronSetup() {
    reactotron = RNReactotron.configure({
      host,
      port: 9090,
    }).useReactNative().setAsyncStorageHandler!(AsyncStorage)
      .use(reactotronRedux())
      .use(sagaPlugin({}))
      .connect();

    console.tron = reactotron;
  })();

declare global {
  interface Console {
    tron?: Reactotron<ReactotronReactNative>;
  }
}

export default reactotron;
