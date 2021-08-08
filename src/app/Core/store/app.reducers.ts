import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  auth: reducers.UserState;
  toDoLists: reducers.ToDoListState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: reducers.userReducer,
  toDoLists: reducers.toDoListReducer,
};
