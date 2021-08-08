import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import { UserState } from 'src/app/Core/store/reducers';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user$: Observable<UserState>;

  constructor(
    private readonly store: Store<AppState>,
  ) {
    this.user$ = this.store.select('auth');
  }

  ngOnInit(): void { }

}
