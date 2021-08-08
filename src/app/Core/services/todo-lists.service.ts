import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ToDoList, ToDoListsParams } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodoListsService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getToDoLists(userId: string, queryParams: ToDoListsParams): Observable<ToDoList[]> {
    let url = `${environment.apiUrl}/users/${userId}/ToDoLists?`;
    const {name, important, archive} = queryParams;
    url += name ? `&name=${name}` : '';
    url += important || important === false ? `&important=${important}` : '';
    url += archive || archive === false ? `&archive=${archive}` : '';
    return this.http.get<ToDoList[]>(url);
  }

  getToDoList(userId: string, toDoListId: string): Observable<ToDoList> {
    return this.http.get<ToDoList>(`${environment.apiUrl}/users/${userId}/ToDoLists/${toDoListId}`);
  }

  createToDoList(tl: ToDoList): Observable<ToDoList> {
    return this.http.post<ToDoList>(`${environment.apiUrl}/ToDoLists`, tl);
  }

  updateToDoList(id: string, tl: ToDoList): Observable<null> {
    return this.http.put<null>(`${environment.apiUrl}/ToDoLists/${id}`, tl);
  }

  updateToDoLists(tls: ToDoList[]): Observable<null> {
    return this.http.put<null>(`${environment.apiUrl}/ToDoLists/`, tls);
  }

  deleteToDoList(id: string): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/ToDoLists/${id}`);
  }

}
