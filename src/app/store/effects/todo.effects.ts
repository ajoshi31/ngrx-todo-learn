import {Injectable} from '@angular/core';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {Store, select} from '@ngrx/store';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {IAppState} from '../state/index';
import {
  GetTodos, GetTodosSuccess, TodoActionTypes
} from '../actions/todo.actions';

import {TodoService} from "../../services/todo.service";
import {ITodo} from "../../models/todo";
import {ITodoHttp} from "../../models/http-todo";
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class TodoEffects {

  @Effect()
  getUsers$ = this._actions$.pipe(
    ofType<GetTodos>(<string>TodoActionTypes.LOAD_TODOS),
    switchMap(() => this._todoService.getTodos().pipe(
      switchMap((item: ITodoHttp) => {
        return of(new GetTodosSuccess(item));
      }),
      catchError(() => "") // call error action
    ))
  );

  constructor(private _todoService: TodoService,
              private _actions$: Actions,
              private _store: Store<IAppState>) {
  }
}
