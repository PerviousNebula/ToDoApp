import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import * as fromToDoListsActions from '../../../../../Core/store/actions/toDoList.actions';

import { ToDoList, ToDoListsParams } from 'src/app/Core/models';

@Component({
  selector: 'app-important-groups-list',
  templateUrl: './important-groups-list.component.html'
})
export class ImportantGroupsListComponent implements OnInit {
  editMode = false;
  filterFg: FormGroup;
  toDoLists: ToDoList[] = [];
  toDoListsSelected: ToDoList[] = [];
  userId = '';

  constructor(
    private readonly store: Store<AppState>,
  ) {
    this.filterFg = new FormGroup({
      name: new FormControl(''),
      archive: new FormControl(false),
      important: new FormControl(true),
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getToDoLists();
  }

  getToDoLists(): void {
    this.store.select('toDoLists').subscribe(({ toDoLists, toDoListsSelected }) => {
      this.toDoListsSelected = toDoListsSelected;
      this.toDoLists = toDoLists.filter(tl => !tl.archive && tl.important);
    });
  }

  getUserProfile(): void {
    this.store.select('auth').subscribe(({ user: { id: userId } }) => {
      if (userId) {
        this.userId = userId;
        const queryParams: ToDoListsParams = { archive: false, important: true };
        this.store.dispatch(fromToDoListsActions.getToDoLists({ userId, queryParams }));
      }
    });
  }

  handleDownplayElems(): void {
    const toDoLists = this.toDoListsSelected.map(tl => ({ ...tl, important: false }));
    this.store.dispatch(fromToDoListsActions.updateToDoLists({ toDoLists }));
    this.store.dispatch(fromToDoListsActions.updateSelectedToDoLists({ toDoLists: [] }));
  }

  handleEditLists(canEdit: boolean): void {
    this.editMode = canEdit;
  }

  handleListsFilter(): void {
    const queryParams: ToDoListsParams = { ...this.filterFg.value };
    this.store.dispatch(fromToDoListsActions.getToDoLists({ userId: this.userId, queryParams }));
  }

}
