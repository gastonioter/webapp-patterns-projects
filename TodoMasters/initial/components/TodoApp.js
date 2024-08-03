import AddCommnad from "../app/Commnad/AddCmd.js";
import { ClearCmd } from "../app/Commnad/ClearCmd.js";
import { Executor } from "../app/Commnad/Executor.js";
import TodoList from "../app/TodoList.js";
import { interpolate } from "../utils/interpolate.js";

export class TodoApp extends HTMLElement {
  executor = new Executor();
  isEditing = false;
  #data;
  constructor() {
    super();
    this.template = document.getElementById("todoapp-template");
    this.$ = (css) => this.querySelector(css);
  }

  connectedCallback() {
    this.#data = TodoList.getInstance().items;
    this.appendChild(this.template.content.cloneNode(true));

    this.input = this.$("#todo-input");
    this.ul = this.$("ul");
    this.activesCount = this.$("#items-count");
    this.footer = this.$(".footer");

    this.render();
    window.addEventListener("keydown", this.shortcutHandler.bind(this));
    this.$("form").addEventListener("submit", this.sumbitHandler.bind(this));
    this.$("#clear").addEventListener(
      "click",
      this.handleClearClick.bind(this)
    );

    TodoList.getInstance().addObserver(() => {
      this.render();
    });
  }

  render() {
    this.ul.innerHTML = "";
    Array.from(this.#data).forEach(this.createTodoItems.bind(this));
    this.activesCount.textContent = TodoList.getInstance().getActives().length;
    const isEmpty = TodoList.getInstance().isEmpty();
    this.footer.style.display = isEmpty ? "none" : "flex";
    this.$(".container").classList.toggle("container--empty", isEmpty);
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
    if (this.isEditing) {
      console.log("edited");

      return;
    }
    this.executor.setCommand(new AddCommnad(this.input.value));
    this.executor.executeCommand();
    this.input.value = "";
  }
}

customElements.define("todo-app", TodoApp);
