import { createAction, props } from '@ngrx/store';

import { ToDoItem } from '../../models';

export const createToDoItem = createAction('[TODOITEM] Create ToDo item', props<ToDoItem>());
export const createToDoItemSuccess = createAction('[TODOITEM] Create ToDo item success', props<ToDoItem>());
export const createToDoItemError = createAction('[TODOITEM] Create ToDo item error', props<{payload: any}>());

export const updateToDoItem = createAction('[TODOITEM] Update ToDo item', props<ToDoItem>());
export const updateToDoItemSuccess = createAction('[TODOITEM] Update ToDo item success', props<ToDoItem>());
export const updateToDoItemError = createAction('[TODOITEM] Update ToDo item error', props<{payload: any}>());

export const deleteToDoItem = createAction('[TODOITEM] Delete ToDo item', props<{toDoItemId: string}>());
export const deleteToDoItemSuccess = createAction('[TODOITEM] Delete ToDo item success', props<{toDoItemId: string}>());
export const deleteToDoItemError = createAction('[TODOITEM] Delete ToDo item error', props<{payload: any}>());
