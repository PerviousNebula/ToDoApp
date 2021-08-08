import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private userService: UserService) {}

  canActivate(): boolean {
    return !this.userService.token.length;
  }

}
