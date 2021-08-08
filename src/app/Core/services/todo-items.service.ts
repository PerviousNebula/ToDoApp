import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ToDoItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  createToDoItem(toDoItem: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(`${environment.apiUrl}/ToDoItems`, toDoItem);
  }

  updateToDoItem(id: string, toDoItem: ToDoItem): Observable<null> {
    return this.http.put<null>(`${environment.apiUrl}/ToDoItems/${id}`, toDoItem);
  }

  deleteToDoItem(id: string): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/ToDoItems/${id}`);
  }

}
