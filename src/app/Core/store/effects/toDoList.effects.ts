import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as toDoListsActions from '../actions/toDoList.actions';

import { TodoListsService } from '../../services/todo-lists.service';

@Injectable()
export class ToDoListffects {

  constructor(
    private readonly actions$: Actions,
    private readonly toDoListsService: TodoListsService,
  ) {}

  getToDoLists$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(toDoListsActions.getToDoLists),
      mergeMap(
        ({ userId, queryParams }) => this.toDoListsService.getToDoLists(userId, queryParams).pipe(
          map(resp => toDoListsActions.getToDoListsSuccess({ toDoLists: resp}))
        )
      )
    )
  );

  getToDoList$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(toDoListsActions.getToDoList),
      mergeMap(
        ({ toDoListId, userId }) => this.toDoListsService.getToDoList(userId, toDoListId).pipe(
          map(toDoList => toDoListsActions.getToDoListSuccess(toDoList))
        )
      )
    )
  );

  createToDoList$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(toDoListsActions.createToDoList),
      mergeMap(
        (toDoList) => this.toDoListsService.createToDoList(toDoList).pipe(
          map(resp => toDoListsActions.createToDoListSuccess(resp))
        )
      )
    )
  );

  updateToDoList$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(toDoListsActions.updateToDoList),
      mergeMap(
        (toDoList) => this.toDoListsService.updateToDoList(toDoList.id || '', toDoList).pipe(
          map(() => toDoListsActions.updateToDoListSuccess(toDoList))
        )
      )
    )
  );

  updateToDoListBulk$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(toDoListsActions.updateToDoLists),
      mergeMap(
        ({ toDoLists }) => this.toDoListsService.updateToDoLists(toDoLists).pipe(
          map(() => toDoListsActions.updateToDoListsSuccess({ toDoLists }))
        )
      )
    )
  );

  deleteToDoList$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(toDoListsActions.deleteToDoList),
      mergeMap(
        ({ toDoListId }) => this.toDoListsService.deleteToDoList(toDoListId).pipe(
          map(() => toDoListsActions.deleteToDoListSuccess({toDoListId}))
        )
      )
    )
  );

}
