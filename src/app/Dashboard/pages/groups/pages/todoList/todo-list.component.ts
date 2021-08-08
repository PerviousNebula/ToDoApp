import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  template: `<router-outlet></router-outlet>`
})
export class TodoListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
