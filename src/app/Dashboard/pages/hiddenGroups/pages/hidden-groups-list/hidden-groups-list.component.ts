import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import * as fromToDoListsActions from '../../../../../Core/store/actions/toDoList.actions';

import { ToDoList, ToDoListsParams } from 'src/app/Core/models';

@Component({
  selector: 'app-hidden-groups-list',
  templateUrl: './hidden-groups-list.component.html',
  styles: [`
    .li-edit:hover {
      background-color: rgba(255, 255, 255, 0);
      cursor: pointer;
    }
  `]
})
export class HiddenGroupsListComponent implements OnInit {
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
      archive: new FormControl(true),
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getToDoLists();
  }

  getUserProfile(): void {
    this.store.select('auth').subscribe(({ user: { id: userId } }) => {
      if (userId) {
        this.userId = userId;
        const queryParams: ToDoListsParams = { archive: true };
        this.store.dispatch(fromToDoListsActions.getToDoLists({ userId, queryParams }));
      }
    });
  }

  getToDoLists(): void {
    this.store.select('toDoLists').subscribe(({ toDoLists, toDoListsSelected }) => {
      this.toDoListsSelected = toDoListsSelected;
      this.toDoLists = toDoLists.filter(tl => tl.archive);
    });
  }

  handleEditLists(canEdit: boolean): void {
    this.editMode = canEdit;
  }

  handleListsFilter(): void {
    const queryParams: ToDoListsParams = { ...this.filterFg.value };
    this.store.dispatch(fromToDoListsActions.getToDoLists({ userId: this.userId, queryParams }));
  }

  handleUnarchiveElems(): void {
    const toDoLists = this.toDoListsSelected.map(tl => ({ ...tl, archive: false }));
    this.store.dispatch(fromToDoListsActions.updateToDoLists({ toDoLists }));
    this.store.dispatch(fromToDoListsActions.updateSelectedToDoLists({ toDoLists: [] }));
  }

}
