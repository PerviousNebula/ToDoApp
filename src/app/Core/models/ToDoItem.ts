import { Status } from '../enums';

export interface ToDoItem {
    id?: string;
    title?: string;
    archive?: boolean;
    toDoListId?: string;
    statusId?: Status;
}
