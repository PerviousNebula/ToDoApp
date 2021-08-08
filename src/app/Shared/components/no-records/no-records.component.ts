import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-records',
  template: `
    <div class="text-center">
      <h1><i class="fas fa-heart-broken"></i></h1>
      <h6>No records were found...</h6>
    </div>
  `
})
export class NoRecordsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
