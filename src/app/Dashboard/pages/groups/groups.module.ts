import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GroupsRoutes } from './groups.routes';

import { SharedModule } from 'src/app/Shared/shared.module';

import { GroupListComponent } from './pages/group-list/group-list.component';
import { TodoListComponent } from './pages/todoList/todo-list.component';

@NgModule({
  declarations: [
    GroupListComponent,
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(GroupsRoutes),
    SharedModule,
  ]
})
export class GroupsModule { }
