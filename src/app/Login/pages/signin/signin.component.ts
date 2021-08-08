import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import { loginSocialUser, loginUser } from 'src/app/Core/store/actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinFg: FormGroup;

  constructor(
    private store: Store<AppState>,
    private authService: SocialAuthService,
  ) {
    this.signinFg = new FormGroup({
      email: new FormControl('arturo@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('1234', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.signinFg.invalid) {
      return;
    }

    const credentials = this.signinFg.value;
    this.store.dispatch(loginUser(credentials));
  }

  async signinWithGoogle(event: Event): Promise<void> {
    event.preventDefault();

    const { email } = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.store.dispatch(loginSocialUser({ email, google: true, facebook: false }));
  }

  async signinWithFacebook(event: Event): Promise<void> {
    event.preventDefault();

    const { email } = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.store.dispatch(loginSocialUser({ email, google: false, facebook: true }));
  }

}
