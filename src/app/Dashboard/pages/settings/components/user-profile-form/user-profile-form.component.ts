import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import * as fromUserActions from '../../../../../Core/store/actions/user.actions';

import { User } from 'src/app/Core/models';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {
  user: Partial<User> = {};
  userFg: FormGroup;
  loading = false;

  constructor(
    private readonly store: Store<AppState>
  ) {
    this.userFg = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null),
      archive: new FormControl(false, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe(({ user, loading }) => {
      this.loading = loading;
      this.user = {...user};
      this.userFg.patchValue({ ...user });
    });
  }

  handleUpdate(): void {
    if (this.userFg.invalid) {
      return;
    }

    const formValue: User = this.userFg.value;
    this.user = {
      ...this.user,
      ...formValue,
      updatedAt: new Date(),
    };
    this.store.dispatch(fromUserActions.updateUserProfile(this.user));
  }

}
