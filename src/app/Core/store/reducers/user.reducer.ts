import { createReducer, on } from '@ngrx/store';
import * as fromUserActions from '../actions/user.actions';

import { User } from '../../models';

export interface UserState {
  user: User;
  token: string;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const userInitialState: UserState = {
  user: JSON.parse(sessionStorage.getItem('profile') || '{}'),
  token: sessionStorage.getItem('token') || '',
  loaded: false,
  loading: false,
  error: {},
};

const _userReducer = createReducer(
  userInitialState,
  on(fromUserActions.updateUserProfile, state => ({ ...state, loading: true })),
  on(fromUserActions.updateUserProfileSuccess, (state, user) => ({
    ...state,
    loading: false,
    loaded: true,
    user,
  })),
  on(fromUserActions.updateUserProfileError, (state, payload) => ({
    ...state,
    loading: false,
    loaded: true,
    error: payload,
  })),

  on(fromUserActions.loginUser, (state) => ({ ...state, loading: true })),
  on(fromUserActions.loginUserSuccess, (state, { user, token }) => ({
    ...state,
    loading: false,
    loaded: true,
    user,
    token,
  })),
  on(fromUserActions.loginUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(fromUserActions.loginSocialUser, (state) => ({ ...state, loading: true })),

  on(fromUserActions.signupUser, (state) => ({ ...state, loading: true })),
  on(fromUserActions.signupSocialUser, (state) => ({ ...state, loading: true })),

  on(fromUserActions.logoutUser, () => ({
    user: {},
    token: '',
    loading: false,
    loaded: false,
    error: null,
  })),
);

export function userReducer(state: any, action: any): UserState {
  return _userReducer(state, action);
}
