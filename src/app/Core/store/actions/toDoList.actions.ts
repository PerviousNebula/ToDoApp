import { createAction, props } from '@ngrx/store';

import { ToDoList, ToDoListsParams } from '../../models';

export const getToDoLists = createAction('[TODOLIST] Get ToDo lists', props<{userId: string, queryParams: ToDoListsParams}>());
export const getToDoListsSuccess = createAction('[TODOLIST] Get ToDo lists success', props<{toDoLists: ToDoList[]}>());
export const getToDoListsError = createAction('[TODOLIST] Get ToDo lists error', props<{payload: any}>());

export const getToDoList = createAction('[TODOLIST] Get ToDo list', props<{userId: string, toDoListId: string}>());
export const getToDoListSuccess = createAction('[TODOLIST] Get ToDo list success', props<ToDoList>());
export const getToDoListError = createAction('[TODOLIST] Get ToDo list error', props<{payload: any}>());

export const updateToDoList = createAction('[TODOLIST] Update ToDo list', props<ToDoList>());
export const updateToDoListSuccess = createAction('[TODOLIST] Update ToDo list success', props<ToDoList>());
export const updateToDoListError = createAction('[TODOLIST] Update ToDo list error', props<{payload: any}>());

export const updateToDoLists = createAction('[TODOLIST] Update ToDo lists', props<{ toDoLists: ToDoList[] }>());
export const updateToDoListsSuccess = createAction('[TODOLIST] Update ToDo lists success', props<{ toDoLists: ToDoList[] }>());
export const updateToDoListsError = createAction('[TODOLIST] Update ToDo lists error', props<{payload: any}>());

export const deleteToDoList = createAction('[TODOLIST] Remove ToDo list', props<{toDoListId: string}>());
export const deleteToDoListSuccess = createAction('[TODOLIST] Remove ToDo list success', props<{toDoListId: string}>());
export const deleteToDoListError = createAction('[TODOLIST] Remove ToDo list error', props<{payload: any}>());

export const removeToDoLists = createAction('[TODOLIST] Remove ToDo lists');
export const removeCurrentToDoList = createAction('[TODOLIST] Remove current ToDo list');

export const updateSelectedToDoLists = createAction('[TODOLIST] Update selected ToDo lists', props<{ toDoLists: ToDoList[] }>());

export const createToDoList = createAction('[TODO] Create ToDo list', props<ToDoList>());
export const createToDoListSuccess = createAction('[TODO] Create ToDo list success', props<ToDoList>());
export const createToDoListError = createAction('[TODO] Create ToDo list error', props<{payload: any}>());
