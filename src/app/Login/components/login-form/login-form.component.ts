import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  isLoading = false;

  @Input() signinFg: FormGroup = new FormGroup({});
  @Output() submitted: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(({ loading }) => this.isLoading = loading);
  }

  submitForm(): void {
    if (this.signinFg.invalid) {
      return;
    }

    this.submitted.emit(true);
  }

}
