import AddCommnad from "../app/Commnad/AddCmd.js";
import { Executor } from "../app/Commnad/Executor.js";
import TodoList from "../app/TodoList.js";

export class TodoApp extends HTMLElement {
  constructor() {
    super();

    this.executor = new Executor();

    this.root = this.attachShadow({ mode: "open" });
    var template = document.getElementById("todoapp-template");
    var content = template.content.cloneNode(true);
    this.root.appendChild(content);

    this.input = this.root.querySelector("#todo-input");
  }

  connectedCallback() {
    this.render();
    TodoList.getInstance().addObserver(() => {
      this.render();
    });
  }

  render() {
    const items = TodoList.getInstance().items;

    this.root
      .querySelector("#add-btn")
      .addEventListener("click", this.addTodo.bind(this));

    const ul = this.root.querySelector(".todo-list");
    ul.innerHTML = "";

    Array.from(items).forEach((todo) => {
      const todoEl = document.createElement("todo-item");
      todoEl.dataset.text = todo.text;
      ul.appendChild(todoEl);
    });
  }

  addTodo(e) {
    this.executor.setCommand(new AddCommnad(this.input.value));
    this.executor.executeCommand();
    this.input.value = "";
  }
}

customElements.define("todo-app", TodoApp);
