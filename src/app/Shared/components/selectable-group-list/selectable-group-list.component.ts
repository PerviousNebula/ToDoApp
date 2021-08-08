import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import * as fromToDoListActions from 'src/app/Core/store/actions/toDoList.actions';

import { ToDoList } from 'src/app/Core/models';

@Component({
  selector: 'app-selectable-group-list',
  templateUrl: './selectable-group-list.component.html',
  styles: [`
    li:hover {
      background-color: rgba(255, 255, 255, 0);
      cursor: pointer;
    }
  `]
})
export class SelectableGroupListComponent implements OnInit {
  isLoading = false;
  toDoListsSelected: ToDoList[] = [];

  @Input() editMode = false;
  @Input() canNavigate = true;
  @Input() canEdit = false;
  @Input() toDoLists: ToDoList[] = [];
  @Output() execEdit: EventEmitter<ToDoList> = new EventEmitter();

  @ViewChildren('todoGroupCheckbox') todoGroupCheckbox?: QueryList<ElementRef>;

  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.initToDoLists();
  }

  initToDoLists(): void {
    this.store.select('toDoLists').subscribe(({ loading, toDoListsSelected }) => {
      this.isLoading = loading;
      this.toDoListsSelected = toDoListsSelected;
    });
  }

  handleClickList(event: any, toDoList: ToDoList): void {
    if (!this.editMode && this.canNavigate) {
      this.router.navigateByUrl(`/dashboard/groups/${toDoList.id}`);
      return;
    }

    const radioBtn = event.target.firstElementChild;
    if (radioBtn) {
      radioBtn.checked = !radioBtn.checked;
      this.checkPristineCheckboxes(toDoList, radioBtn.checked);
    }
  }

  handleEditList(event: Event, tl: ToDoList): void {
    event.preventDefault();
    this.execEdit.emit(tl);
  }

  checkPristineCheckboxes(toDoList: ToDoList, checked: boolean): void {
    this.toDoListsSelected = checked ? [...this.toDoListsSelected, toDoList] :
      this.toDoListsSelected.filter(tl => tl.id !== toDoList.id);
    this.store.dispatch(fromToDoListActions.updateSelectedToDoLists({ toDoLists: this.toDoListsSelected }));
  }

}
