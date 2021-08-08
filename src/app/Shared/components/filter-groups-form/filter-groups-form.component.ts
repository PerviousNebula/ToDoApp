import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-groups-form',
  templateUrl: './filter-groups-form.component.html',
  styles: [`
    .form-control {
      transition: none;
    }
    .form-control:focus {
      border: none;
      box-shadow: none;
    }
    .input-group-text {
        border: none;
    }
  `]
})
export class FilterGroupsFormComponent implements OnInit {
  @Input() filterFg: FormGroup = new FormGroup({});
  @Output() formSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('groupNameInput') groupNameInput?: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  submitForm(): void {
    this.formSubmitted.emit(true);
  }

  clearInput(event: Event): void {
    event.preventDefault();

    this.filterFg.get('name')?.setValue(null);
    this.groupNameInput?.nativeElement.focus();
    this.formSubmitted.emit(true);
  }

}
