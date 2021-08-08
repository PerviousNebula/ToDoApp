import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import { signupSocialUser, signupUser } from 'src/app/Core/store/actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupFg: FormGroup;
  isLoading = false;

  constructor(
    private store: Store<AppState>,
    private authService: SocialAuthService,
  ) {
    this.signupFg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.mismatchPassword });
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
  }

  mismatchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }

    return password.value !== confirmPassword.value ? { mismatch: true } : null;
  }

  signup(): void {
    if (this.signupFg.invalid) {
      return;
    }

    const user = this.signupFg.value;
    this.store.dispatch(signupUser(user));
  }

  async signupWithGoogle(event: Event): Promise<void> {
    event.preventDefault();

    const { email, firstName, lastName } = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.store.dispatch(signupSocialUser({ email, firstName, lastName, google: true }));
  }

  async signupWithFacebook(event: Event): Promise<void> {
    event.preventDefault();

    const { email, firstName, lastName } = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.store.dispatch(signupSocialUser({ email, firstName, lastName, facebook: true }));
  }

}
