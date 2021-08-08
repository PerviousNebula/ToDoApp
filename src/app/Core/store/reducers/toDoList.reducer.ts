import { createReducer, on } from '@ngrx/store';
import * as fromToDoItemActions from '../actions/toDoItem.actions';
import * as fromToDoListActions from '../actions/toDoList.actions';

import { ToDoList } from '../../models';

export interface ToDoListState {
  currentToDoList: ToDoList;
  toDoLists: ToDoList[];
  toDoListsSelected: ToDoList[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const ToDosInitialState: ToDoListState = {
  currentToDoList: {},
  toDoLists: [],
  toDoListsSelected: [],
  loaded: false,
  loading: false,
  error: {},
};

const _toDoListReducer = createReducer(
  ToDosInitialState,
  on(fromToDoListActions.getToDoLists, state => ({ ...state, loading: true })),
  on(fromToDoListActions.getToDoListsSuccess, (state, { toDoLists }) => ({
    ...state,
    loading: false,
    loaded: true,
    toDoLists,
  })),
  on(fromToDoListActions.getToDoListsError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(fromToDoListActions.getToDoList, state => ({ ...state, loading: true, })),
  on(fromToDoListActions.getToDoListSuccess, (state, toDoList) => ({
    ...state,
    loading: false,
    loaded: true,
    currentToDoList: toDoList,
  })),

  on(fromToDoListActions.removeCurrentToDoList, (state) => ({ ...state, currentToDoList: {} })),
  on(fromToDoListActions.removeToDoLists, (state) => ({ ...state, toDoLists: [] })),

  on(fromToDoListActions.updateSelectedToDoLists, (state, { toDoLists }) => ({ ...state, toDoListsSelected: toDoLists })),

  on(fromToDoListActions.createToDoList, (state) => ({ ...state, loading: true })),
  on(fromToDoListActions.createToDoListSuccess, (state, toDoList) => ({
    ...state,
    loading: false,
    loaded: true,
    toDoLists: [...state.toDoLists, toDoList],
  })),
  on(fromToDoListActions.createToDoListError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(fromToDoListActions.updateToDoList, (state) => ({ ...state, loading: true })),
  on(fromToDoListActions.updateToDoListSuccess, (state, toDoList) => ({
    ...state,
    loading: false,
    loaded: true,
    toDoLists: state.toDoLists.map(tl => tl.id === toDoList.id ? {...toDoList} : tl),
    currentToDoList: {...toDoList},
  })),
  on(fromToDoListActions.updateToDoListError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: payload,
  })),

  on(fromToDoListActions.updateToDoLists, (state) => ({ ...state, loading: true })),
  on(fromToDoListActions.updateToDoListsSuccess, (state, { toDoLists }) => ({
    ...state,
    loading: false,
    loaded: true,
    toDoLists: state.toDoLists.map(tl => {
      const [tlToUpdate] = toDoLists.filter(elem => elem.id === tl.id);
      return (tlToUpdate) ? tlToUpdate : tl;
    }),
  })),
  on(fromToDoListActions.updateToDoListsError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: payload,
  })),

  on(fromToDoListActions.deleteToDoList, (state) => ({ ...state, loading: true })),
  on(fromToDoListActions.deleteToDoListSuccess, (state, { toDoListId }) => ({
    ...state,
    loading: false,
    loaded: true,
    toDoLists: state.toDoLists.filter(tl => tl.id !== toDoListId)
  })),
  on(fromToDoListActions.deleteToDoListError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),

  on(fromToDoItemActions.createToDoItem, (state) => ({ ...state, loading: true })),
  on(fromToDoItemActions.createToDoItemSuccess, (state, toDoItem) => ({
    ...state,
    loading: false,
    loaded: true,
    currentToDoList: {
      ...state.currentToDoList,
      toDos: [...state.currentToDoList.toDos || [], toDoItem],
    },
  })),
  on(fromToDoItemActions.createToDoItemError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),

  on(fromToDoItemActions.updateToDoItem, (state) => ({ ...state, loading: true })),
  on(fromToDoItemActions.updateToDoItemSuccess, (state, toDoItem) => ({
    ...state,
    loading: false,
    loaded: true,
    currentToDoList: {
      ...state.currentToDoList,
      toDos: state.currentToDoList.toDos?.map(t => t.id === toDoItem.id ? toDoItem : t)
    },
  })),
  on(fromToDoItemActions.updateToDoItemError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),

  on(fromToDoItemActions.deleteToDoItem, (state) => ({ ...state, loading: true })),
  on(fromToDoItemActions.deleteToDoItemSuccess, (state, { toDoItemId }) => ({
    ...state,
    loading: false,
    loaded: true,
    currentToDoList: {
      ...state.currentToDoList,
      toDos: state.currentToDoList.toDos?.filter(t => t.id !== toDoItemId),
    },
  })),
  on(fromToDoItemActions.deleteToDoItemError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),
);

export function toDoListReducer(state: any, action: any): ToDoListState {
  return _toDoListReducer(state, action);
}
