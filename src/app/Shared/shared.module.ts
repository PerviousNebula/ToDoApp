import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoListModalComponent } from './components/todo-list-modal/todo-list-modal.component';
import { FilterGroupsFormComponent } from './components/filter-groups-form/filter-groups-form.component';
import { FooterControlsComponent } from './components/footer-controls/footer-controls.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavbarControlsComponent } from './components/navbar-controls/navbar-controls.component';
import { NoRecordsComponent } from './components/no-records/no-records.component';
import { SelectableGroupListComponent } from './components/selectable-group-list/selectable-group-list.component';

@NgModule({
  declarations: [
    TodoListModalComponent,
    FilterGroupsFormComponent,
    FooterControlsComponent,
    LoadingSpinnerComponent,
    NavbarControlsComponent,
    NoRecordsComponent,
    SelectableGroupListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    TodoListModalComponent,
    FilterGroupsFormComponent,
    FooterControlsComponent,
    LoadingSpinnerComponent,
    NavbarControlsComponent,
    NoRecordsComponent,
    SelectableGroupListComponent,
  ]
})
export class SharedModule { }
