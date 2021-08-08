import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html'
})
export class SignupFormComponent implements OnInit {
  isLoading = false;

  @Input() signupFg: FormGroup = new FormGroup({});
  @Output() formSubmitted: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(({ loading }) => this.isLoading = loading);
  }

  submitForm(): void {
    if (this.signupFg.invalid) {
      return;
    }

    this.formSubmitted.emit(true);
  }

}
