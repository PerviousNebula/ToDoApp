import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import { createToDoList, updateToDoList } from 'src/app/Core/store/actions/toDoList.actions';

import { ToDoList } from 'src/app/Core/models';

import { ModalService } from 'src/app/Core/services/modal.service';

@Component({
  selector: 'app-todo-list-modal',
  templateUrl: './todo-list-modal.component.html'
})
export class TodoListModalComponent implements OnInit {
  toDoList: ToDoList = {};
  toDoListFg: FormGroup;

  constructor(
    private readonly store: Store<AppState>,
    public readonly modalService: ModalService,
  ) {
    this.toDoListFg = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      important: new FormControl(false),
      archive: new FormControl(false),
      userId: new FormControl(null),
    });

  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCurrentOrResetGroupListFgValues();
  }

  closeModal(): void {
    this.toDoListFg.reset({
      id: null,
      name: null,
      archive: false,
    });
    this.modalService.showModal = false;
  }

  getCurrentUser(): void {
    this.store.select('auth').subscribe(({ user: { id: userId } }) => {
      this.toDoListFg.patchValue({ userId });
    });
  }

  getCurrentOrResetGroupListFgValues(): void {
    this.store.select('toDoLists').subscribe(({ currentToDoList }) => {
      if (!currentToDoList || !currentToDoList.id) {
        this.toDoListFg.patchValue({ id: null, name: null, important: false, archive: false });
      } else {
        this.toDoListFg.patchValue({ ...currentToDoList });
      }
    });
  }

  handleArchiveUpdate(): void {
    const { archive } = this.toDoListFg.value;
    this.toDoListFg.patchValue({ archive: !archive });
  }

  handleImportantUpdate(): void {
    const { important } = this.toDoListFg.value;
    this.toDoListFg.patchValue({ important: !important });
  }

  handleSubmit(): void {
    const { value: formValue } = this.toDoListFg;
    if (!formValue.id) {
      delete formValue.id;
      this.store.dispatch(createToDoList(formValue));
    } else {
      this.store.dispatch(updateToDoList(formValue));
    }
    this.closeModal();
  }

}
