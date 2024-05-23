import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id: number;
  title: string;
  assignee: string;
  description: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { id: 0, title: '', assignee: '', description: '', isCompleted: false };
  apiUrl = 'https://todo3api.azurewebsites.net/api/Todo';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.http.get<Todo[]>(this.apiUrl)
      .subscribe(todos => this.todos = todos['result']['items']);
  }

  addTodo(): void {
    this.http.post<Todo>(this.apiUrl, this.newTodo)
      .subscribe(todo => {
        this.todos.unshift(todo['result']);
        console.log(todo)
        this.newTodo = { id: 0, title: '', assignee: '', description: '', isCompleted: false };
      });
  }

  markAsCompletedOrPending(todo: Todo): void {
    if (todo.isCompleted==false){
      todo.isCompleted = true;
    }
    else{
      todo.isCompleted = false;

    }
    this.http.put(`${this.apiUrl}/${todo.id}`, todo)
      .subscribe();
  }

  markAsPending(todo: Todo): void {
    todo.isCompleted = false;
    this.http.put(`${this.apiUrl}/${todo.id}`, todo)
      .subscribe();
  }

  deleteTodo(todo: Todo): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.http.delete(`${this.apiUrl}/${todo.id}`)
        .subscribe(() => {
          this.todos = this.todos.filter(t => t !== todo);
        });
    }
  }
}
