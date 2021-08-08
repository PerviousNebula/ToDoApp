import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import * as toDoItemsActions from '../actions/toDoItem.actions';

import { TodoItemsService } from '../../services/todo-items.service';

@Injectable()
export class ToDoItemffects {

  constructor(
    private readonly actions$: Actions,
    private readonly toDoItemsService: TodoItemsService,
  ) {}

  createToDoItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(toDoItemsActions.createToDoItem),
      mergeMap(
        toDoItem => this.toDoItemsService.createToDoItem(toDoItem).pipe(
          map(toDoItemsActions.createToDoItemSuccess)
        )
      )
    )
  );

  updateToDoItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(toDoItemsActions.updateToDoItem),
      mergeMap(
        (toDoItem) => this.toDoItemsService.updateToDoItem(toDoItem.id || '', toDoItem).pipe(
          map(() => toDoItemsActions.updateToDoItemSuccess(toDoItem))
        )
      )
    )
  );

  deleteToDoItem$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(toDoItemsActions.deleteToDoItem),
      mergeMap(
        ({ toDoItemId }) => this.toDoItemsService.deleteToDoItem(toDoItemId).pipe(
          map(() => toDoItemsActions.deleteToDoItemSuccess({ toDoItemId }))
        )
      )
    )
  );

}
