import { Alert, BackHandler } from 'react-native';
import * as reactNativeExceptionHandler from 'react-native-exception-handler';

const forceAppQuit = true;
const executeDefaultHandler = true;
const allowedInDevMode = true;

export const logInfo = (message: string) => {
  //console.tron?.log(message);
  console.log('logInfo: ' + message);
};

export const logError = (error: any) => {
  //console.tron?.log(error);
  console.log('logError: ' + error);
};

const reporter = (error: any) => {
  // TODO: Logic for reporting to devs; 
  //   Example : Log issues to github issues using github apis.
  logError(error);
};

const exceptionhandler = (exceptionString: string) => {
  logError(new Error(`Caught native exception ${exceptionString}`));
};

const errorHandler = (e: any, isFatal: boolean) => {
  console.log(`errorHandler: isFatal?=${isFatal}, e=${e}`);
  if (isFatal) {
    reporter(e);
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

        We have reported this to our team ! Please close the app and start again!
        `,
      [{
        text: 'Close',
        onPress: () => {
          BackHandler.exitApp();
        }
      }]
    );
  } else {
    logError(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

reactNativeExceptionHandler.setJSExceptionHandler(errorHandler, allowedInDevMode);

reactNativeExceptionHandler.setNativeExceptionHandler(
  exceptionhandler,
  forceAppQuit,
  executeDefaultHandler
);