import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import * as fromToDoListActions from 'src/app/Core/store/actions';

import { ToDoList } from 'src/app/Core/models';

@Component({
  selector: 'app-footer-controls',
  templateUrl: './footer-controls.component.html',
  styles: [
    `
      .navbar-position {
        bottom: 10px;
        width: 95%;
      }
    `
  ]
})
export class FooterControlsComponent implements OnInit {
  todoGroupCheckboxes: HTMLInputElement[] = [];
  toDoLists: ToDoList[] = [];
  toDoListsSelected: ToDoList[] = [];

  @Input() editMode = false;
  @Input() bottomRightOptionTxt = '';
  @Output() execAction: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.initToDoLists();
  }

  initToDoLists(): void {
    this.store.select('toDoLists').subscribe(({ toDoLists, toDoListsSelected }) => {
      this.toDoLists = toDoLists;
      this.toDoListsSelected = toDoListsSelected;
    });
  }

  handleCheckBulk(event: Event, checkAll: boolean): void {
    event.preventDefault();

    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    if (checkAll) {
      checkboxes.forEach(c => (c as HTMLInputElement).checked = true);
      this.store.dispatch(fromToDoListActions.updateSelectedToDoLists({ toDoLists: this.toDoLists }));
    } else {
      checkboxes.forEach(c => (c as HTMLInputElement).checked = false);
      this.store.dispatch(fromToDoListActions.updateSelectedToDoLists({ toDoLists: [] }));
    }
  }

  handleUpdateAction(event: Event): void {
    event.preventDefault();
    this.execAction.emit(true);
  }

}
