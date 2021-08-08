import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Core/store/app.reducers';
import * as fromToDoItemActions from '../../../../../../../Core/store/actions/toDoItem.actions';

import { Status } from 'src/app/Core/enums';
import { ToDoItem, ToDoList } from 'src/app/Core/models';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {
  toDoList: Partial<ToDoList> = {};
  toDoItemsFg = new FormGroup({});

  @ViewChildren('toDoInput') toDoInputs!: QueryList<any>;

  @Input() badgeColor = '';
  @Input() badgeTxt = '';
  @Input() cardStatus = Status.ToDo;

  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('toDoLists').subscribe(({ currentToDoList }) => {
      this.toDoList = {...currentToDoList};
      this.toDoList.toDos = this.toDoList.toDos?.filter(t => t.statusId === this.cardStatus);
    });
    this.toDoItemsFg = new FormGroup({
      items: new FormArray([])
    });
    this.createForm();
  }

  get toDoItemsFAry(): FormArray {
    return this.toDoItemsFg.get('items') as FormArray;
  }

  getFAryControls(): AbstractControl[] {
    return (this.toDoItemsFg.get('items') as FormArray).controls;
  }

  createForm(): void {
    for (const { id, title, statusId } of this.toDoList.toDos || []) {
      this.toDoItemsFAry.push(new FormGroup({
        id: new FormControl(id),
        title: new FormControl(title, [Validators.required]),
        statusId: new FormControl(statusId, [Validators.required]),
        archive: new FormControl(false, [Validators.required])
      }));
    }
  }

  addToDoItem({
    id = '',
    title = '',
    statusId = this.cardStatus,
    archive = false
  }: Partial<ToDoItem>): void {
    const item = new FormGroup({
      id: new FormControl(id),
      title: new FormControl(title, [Validators.required]),
      statusId: new FormControl(statusId, [Validators.required]),
      archive: new FormControl(archive, [Validators.required]),
      toDoListId: new FormControl(this.toDoList.id)
    });
    this.toDoItemsFAry.push(item);
    setTimeout(() => (this.toDoInputs.last?.nativeElement.focus()), 50);
  }

  drop(event: CdkDragDrop<ToDoItem[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      let [toDoItemMoved] = this.toDoList.toDos?.filter(t => t.statusId !== this.cardStatus) || [];
      if (toDoItemMoved) {
        toDoItemMoved = {...toDoItemMoved, statusId: this.cardStatus};
        this.addToDoItem(toDoItemMoved);
        this.store.dispatch(fromToDoItemActions.updateToDoItem(toDoItemMoved));
      }
    }
  }

  removeToDo(event: Event, index: number): void {
    event.preventDefault();
    event.stopPropagation();

    const { id: toDoItemId } = this.toDoItemsFAry.value[index] as ToDoItem;
    if (toDoItemId) {
      this.store.dispatch(fromToDoItemActions.deleteToDoItem({ toDoItemId }));
    } else {
      this.toDoItemsFAry.removeAt(index);
    }
  }

  handleToDoItemChange(title: string, index: number): void {
    if (!title.length) {
      this.toDoItemsFAry.removeAt(index);
      return;
    }

    const toDoItem: ToDoItem = this.toDoItemsFAry.value[index];
    toDoItem.toDoListId = this.toDoList.id;
    if (!toDoItem.id) {
      delete toDoItem.id;
      this.store.dispatch(fromToDoItemActions.createToDoItem(toDoItem));
    } else {
      this.store.dispatch(fromToDoItemActions.updateToDoItem(toDoItem));
    }
  }

}
