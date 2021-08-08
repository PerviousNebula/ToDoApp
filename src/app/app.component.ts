import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-todo-list-modal></app-todo-list-modal>
  `
})
export class AppComponent {

  constructor() {}

}
