import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginResp, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string;
  user: User;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    this.token = sessionStorage.getItem('token') || '';
    this.user = JSON.parse(sessionStorage.getItem('profile') || '{}');
  }

  updateProfile(id: string, user: User): Observable<null> {
    return this.http.put<null>(`${environment.apiUrl}/users/${id}`, user);
  }

  renewToken(): Observable<LoginResp> {
    return this.http.get<LoginResp>(`${environment.apiUrl}/users/renew_token`).pipe(
      tap(this.handleAuthWorkflow)
    );
  }

  signin(email: string, password: string): Observable<LoginResp> {
    return this.http.post<LoginResp>(`${environment.apiUrl}/users/signin`, { email, password })
      .pipe(
        tap(resp => (this.handleAuthWorkflow(resp)))
      );
  }

  signinSocial(user: User): Observable<LoginResp> {
    return this.http.post<LoginResp>(`${environment.apiUrl}/users/signin/social`, user)
    .pipe(
      tap(resp => (this.handleAuthWorkflow(resp)))
    );
  }

  signup(user: User): Observable<LoginResp> {
    return this.http.post<LoginResp>(`${environment.apiUrl}/users/signup`, user)
      .pipe(
        tap(resp => (this.handleAuthWorkflow(resp)))
      );
  }

  signupSocial(user: User): Observable<LoginResp> {
    return this.http.post<LoginResp>(`${environment.apiUrl}/users/signup/social`, user)
      .pipe(
        tap(resp => (this.handleAuthWorkflow(resp)))
      );
  }

  signout(): void {
    this.token = '';
    this.user = {};
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('profile');
    this.router.navigateByUrl('/login');
  }

  private handleAuthWorkflow({ token, user }: LoginResp): void {
    this.token = token;
    this.user = user;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('profile', JSON.stringify(user));
    this.router.navigateByUrl('/dashboard/main');
  }

}
