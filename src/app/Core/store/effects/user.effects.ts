import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';

import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  updateUserProfile$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(userActions.updateUserProfile),
      mergeMap(
        user => this.userService.updateProfile(user.id || '', user).pipe(
          map(() => userActions.updateUserProfileSuccess(user))
        )
      )
    )
  );

  loginUser$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(userActions.loginUser),
      mergeMap(
        ({ email, password }) => this.userService.signin(email, password).pipe(
          map(resp => userActions.loginUserSuccess(resp))
        )
      )
    )
  );

  logiSocialUser$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(userActions.loginSocialUser),
      mergeMap(
        (credentials) => this.userService.signinSocial(credentials).pipe(
          map(resp => userActions.loginUserSuccess(resp))
        )
      )
    )
  );

  signupUser$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(userActions.signupUser),
      mergeMap(
        (user) => this.userService.signup(user).pipe(
          map(resp => userActions.loginUserSuccess(resp))
        )
      )
    )
  );

  signupSocialUser$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(userActions.signupSocialUser),
      mergeMap(
        (user) => this.userService.signupSocial(user).pipe(
          map(resp => userActions.loginUserSuccess(resp))
        )
      )
    )
  );

}
