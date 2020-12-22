import { createReducer } from 'reduxsauce';
import { User } from '../../services/api/api.types';
import { UserAction } from './actions';

export interface UserState {
  account: User | null;
}

const INITIAL_STATE: UserState = {
  account: null,
};

type Handler<A> = (state: UserState, action: A) => UserState;

export const userReducer = createReducer<UserState, UserAction>(
  INITIAL_STATE,
  {},
);
