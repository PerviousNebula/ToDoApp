import { ToDoItem } from './';

export interface ToDoListsParams {
    name?: string;
    important?: boolean;
    archive?: boolean;
}

export interface ToDoList {
    id?: string;
    name?: string;
    archive?: boolean;
    important?: boolean;
    userId?: string;
    toDos?: ToDoItem[];
}
