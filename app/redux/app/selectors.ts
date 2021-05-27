import { RootState } from '..';

export const AppSelectors = {
  selectIsVerificationProcess: (state: RootState): boolean =>
    state.app.isVerificationProcess,
};
