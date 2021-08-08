import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import * as fromToDoListActions from 'src/app/Core/store/actions';

@Component({
  selector: 'app-navbar-controls',
  templateUrl: './navbar-controls.component.html'
})
export class NavbarControlsComponent implements OnInit {
  @Input() editMode = false;
  @Input() goBackRoute = '';
  @Input() topLeftTitle = '';
  @Input() showEditMode = true;
  @Output() handleEditMode: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  handleEdit(event: Event): void {
    event.preventDefault();
    if (!!this.editMode) {
      this.store.dispatch(fromToDoListActions.updateSelectedToDoLists({ toDoLists: [] }));
    }
    this.handleEditMode.emit(!this.editMode);
  }

}
