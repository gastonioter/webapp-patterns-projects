import AddCommnad from "../app/Commnad/AddCmd.js";
import { ClearCmd } from "../app/Commnad/ClearCmd.js";
import { Executor } from "../app/Commnad/Executor.js";
import TodoList from "../app/TodoList.js";

export class TodoApp extends HTMLElement {
  executor = new Executor();

  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });
    var template = document.getElementById("todoapp-template");
    this.root.appendChild(template.content.cloneNode(true));

    this.input = this.root.querySelector("#todo-input");
    this.ul = this.root.querySelector(".todo-list");
    this.form = this.root.querySelector("form");
    this.clear = this.root.querySelector("#clear");
  }

  connectedCallback() {
    this.render();
    TodoList.getInstance().addObserver(() => {
      this.render();
    });

    window.addEventListener("keydown", this.shortcutHandler.bind(this));
  }

  render() {
    const items = TodoList.getInstance().items;

    this.form.addEventListener("submit", this.sumbitHandler.bind(this));
    this.clear.addEventListener("click", this.handleClearClick.bind(this));

    this.ul.innerHTML = "";

    Array.from(items).forEach(this.createTodoItems.bind(this));
  }

  handleClearClick(e) {
    this.executor.setCommand(new ClearCmd());
    this.executor.executeCommand();
  }

  createTodoItems(todo) {
    const todoEl = document.createElement("todo-item");
    todoEl.dataset.text = todo.text;
    this.ul.appendChild(todoEl);
  }

  shortcutHandler(e) {
    if (e.ctrlKey && e.key == "p") {
      e.preventDefault();
      this.executor.setCommand(new AddCommnad(this.input.value));
      this.executor.executeCommand();
      this.input.value = "";
    }
  }
  sumbitHandler(e) {
    e.preventDefault();
    this.executor.setCommand(new AddCommnad(this.input.value));
    this.executor.executeCommand();
    this.input.value = "";
  }
}

customElements.define("todo-app", TodoApp);
