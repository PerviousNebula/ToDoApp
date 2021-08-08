import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import * as fromActions from 'src/app/Core/store/actions';

import { UserService } from 'src/app/Core/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    public userService: UserService,
  ) { }

  ngOnInit(): void { }

  signout(event: Event): void {
    event.preventDefault();

    this.store.dispatch(fromActions.logoutUser());
    this.store.dispatch(fromActions.removeToDoLists());
    this.userService.signout();
  }

}
