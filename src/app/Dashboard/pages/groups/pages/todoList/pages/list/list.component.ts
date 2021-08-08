import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import { getToDoList } from 'src/app/Core/store/actions/toDoList.actions';

import { ToDoList } from 'src/app/Core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isLoading = false;
  toDoList: ToDoList = {};

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id: toDoListId }) => {
      this.store.select('auth').subscribe(({ user: { id: userId } }) =>
        !!userId && this.store.dispatch(getToDoList({ userId, toDoListId }))
      );
    });

    this.store.select('toDoLists').subscribe(({ currentToDoList, loading }) => {
      this.toDoList = currentToDoList;
      this.isLoading = loading;
    });
  }

}
