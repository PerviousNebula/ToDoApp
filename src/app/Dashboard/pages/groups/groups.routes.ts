import { Routes } from '@angular/router';

import { GroupListComponent } from './pages/group-list/group-list.component';

export const GroupsRoutes: Routes = [
    { path: '', component: GroupListComponent },
    {
        path: ':id',
        loadChildren: () => import('./pages/todoList/todo-list.module').then(m => m.TodoListModule),
        data: { title: 'ToDos' }
    },
];
