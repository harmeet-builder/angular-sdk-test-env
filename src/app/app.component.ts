// fails because type imports cannot be injected
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  Component,
  ChangeDetectorRef,
  Input,
  afterRender,
} from '@angular/core';
import { _processContentResult, fetchOneEntry } from '@builder.io/sdk-angular';

interface BuilderProps {
  apiVersion: string;
  canTrack?: boolean;
  trustedHosts?: undefined;
  apiKey: string;
  model: string;
  content: any;
}

@Component({
  selector: 'app-root',
  template: `
    <content-variants
      [model]="model"
      [content]="content"
      [apiKey]="apiKey"
      [customComponents]="customComponents"
    ></content-variants>
  `,
})
export class AppComponent {
  title = 'angular';
  apiKey: BuilderProps['apiKey'] = 'ad30f9a246614faaa6a03374f83554c9';
  model: BuilderProps['model'] = 'page';
  content: BuilderProps['content'];

  customComponents = [
    {
      component: HelloComponent,
      name: 'Hello',
      inputs: [
        {
          name: 'name',
          type: 'string',
          defaultValue: 'World',
        },
      ],
    },
    {
      component: TodoComponent,
      name: 'Todo',
      inputs: [],
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {
    // const startTime = Date.now();
    // let timeoutId: any;
    // afterRender(() => {
    //   if (timeoutId) {
    //     clearTimeout(timeoutId);
    //   }
    //   timeoutId = setTimeout(() => {
    //     console.log('Render time:', Date.now() - startTime - 1000);
    //   }, 1000);
    // });
  }

  async ngOnInit() {
    // const urlPath = window.location.pathname || '';

    const builderContent = await fetchOneEntry({
      model: 'page',
      apiKey: 'ad30f9a246614faaa6a03374f83554c9',
      userAttributes: {
        urlPath: '/portfolio',
      },
    });

    if (!builderContent) {
      return;
    }

    this.content = builderContent;

    this.cdr.detectChanges();
  }
}

@Component({
  selector: 'app-todo',
  template: `
    <div class="todo-container">
      <h1>To-Do List</h1>
      <input
        [(ngModel)]="newTodo"
        placeholder="Add a new to-do"
        (keyup.enter)="addTodo()"
      />
      <button (click)="addTodo()">Add</button>
      <ul>
        <li *ngFor="let todo of todos; let i = index">
          {{ todo }}
          <button (click)="removeTodo(i)">Remove</button>
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .todo-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        text-align: center;
        font-size: 24px;
      }
      input {
        width: calc(100% - 70px);
        padding: 10px;
        margin-right: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        padding: 10px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #ccc;
      }
      li button {
        background-color: #dc3545;
      }
      li button:hover {
        background-color: #c82333;
      }
    `,
  ],
})
export class TodoComponent {
  newTodo: string = '';
  todos: string[] = [];

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push(this.newTodo.trim());
      this.newTodo = '';
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }
}

@Component({
  selector: 'hello',
  template: ` <h1>hello {{ name }}</h1> `,
})
export class HelloComponent {
  @Input() name!: string;
}
