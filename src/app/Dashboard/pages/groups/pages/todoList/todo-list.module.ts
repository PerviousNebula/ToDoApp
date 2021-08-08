import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoListRoutes } from './todo-list.routes';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { SharedModule } from 'src/app/Shared/shared.module';

import { ListComponent } from './pages/list/list.component';
import { ListCardComponent } from './components/list-card/list-card.component';

@NgModule({
  declarations: [
    ListComponent,
    ListCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TodoListRoutes),
    DragDropModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class TodoListModule { }
