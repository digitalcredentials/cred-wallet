import * as Sentry from "@sentry/react-native";
export const logInfo = (message: string) => {
  if (__DEV__) {
    console.tron?.log!(message);
  } else {
    Sentry.captureMessage(message);
  }
  console.log('logInfo: ' + message);
};

export const logError = (error: any) => {
  if (__DEV__) {
    console.tron?.log!(error);
  } else {
    Sentry.captureException(error);
  }
  console.log('logError: ' + error);
};
