import { createAction, props } from '@ngrx/store';

import { LoginResp, User } from '../../models';

export const updateUserProfile = createAction('[USER] Update user profile', props<User>());
export const updateUserProfileSuccess = createAction('[USER] user profile success', props<User>());
export const updateUserProfileError = createAction('[USER] Update user profile error', props<{ payload: any }>());

export const loginUser = createAction('[USER] Login user', props<{ email: string, password: string }>());
export const loginSocialUser = createAction('[USER] Login social user', props<{ email: string, google: boolean, facebook: boolean }>());

export const signupUser = createAction('[USER] Signup user', props<User>());
export const signupSocialUser = createAction('[USER] Signup social user', props<User>());

export const loginUserSuccess = createAction('[USER] Login user success', props<LoginResp>());
export const loginUserError = createAction('[USER] Login user error', props<{payload: any}>());

export const logoutUser = createAction('[USER] Logout user');
