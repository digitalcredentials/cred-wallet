import { all, takeLatest } from 'redux-saga/effects';
import { GetUserAccountAction, userActionTypes } from '../redux/user';

function* getUser() {}

export function* userSaga() {
  yield all([
    takeLatest<GetUserAccountAction>(userActionTypes.GET_USER, getUser),
  ]);
}
