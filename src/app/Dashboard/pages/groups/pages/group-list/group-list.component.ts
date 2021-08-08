import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import * as fromToDoListActions from '../../../../../Core/store/actions/toDoList.actions';

import { ToDoList, ToDoListsParams } from 'src/app/Core/models';

import { ModalService } from 'src/app/Core/services/modal.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  editMode = false;
  filterFg: FormGroup;
  toDoLists: ToDoList[] = [];
  toDoListsSelected: ToDoList[] = [];
  userId = '';

  constructor(
    private readonly modalService: ModalService,
    private readonly store: Store<AppState>,
  ) {
    this.filterFg = new FormGroup({
      name: new FormControl(''),
      archive: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getToDoLists();
  }


  getToDoLists(): void {
    this.store.select('toDoLists').subscribe(({ toDoLists, toDoListsSelected }) => {
      this.toDoListsSelected = toDoListsSelected;
      this.toDoLists = toDoLists.filter(tl => !tl.archive);
    });
  }

  getUserProfile(): void {
    this.store.select('auth').subscribe(({ user: { id: userId } }) => {
      if (userId) {
        this.userId = userId;
        const queryParams: ToDoListsParams = { archive: false };
        this.store.dispatch(fromToDoListActions.getToDoLists({ userId, queryParams }));
      }
    });
  }

  addGroup(event: Event): void {
    event.preventDefault();
    this.store.dispatch(fromToDoListActions.removeCurrentToDoList());
    this.modalService.showModal = true;
  }

  filterByName(): void {
    const queryParams: ToDoListsParams = { ...this.filterFg.value };
    this.store.dispatch(fromToDoListActions.getToDoLists({ userId: this.userId, queryParams }));
  }

  handleArchiveElems(): void {
    const toDoLists = this.toDoListsSelected.map(tl => ({ ...tl, archive: true }));
    this.store.dispatch(fromToDoListActions.updateToDoLists({ toDoLists }));
    this.store.dispatch(fromToDoListActions.updateSelectedToDoLists({ toDoLists: [] }));
  }

  handleEditLists(canEdit: boolean): void {
    this.editMode = canEdit;
  }

  handleEditToDoList({ id: toDoListId }: ToDoList): void {
    if (toDoListId) {
      this.store.dispatch(fromToDoListActions.getToDoList({ userId: this.userId, toDoListId }));
      this.modalService.showModal = true;
    }
  }

}
