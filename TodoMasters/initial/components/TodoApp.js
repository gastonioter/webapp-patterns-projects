import AddCommnad from "../app/Commnad/AddCmd.js";
import { ClearCmd } from "../app/Commnad/ClearCmd.js";
import { Executor } from "../app/Commnad/Executor.js";
import TodoList from "../app/TodoList.js";
import filtersMap from "../utils/filters.js";

const todoList = TodoList.getInstance();
export class TodoApp extends HTMLElement {
  executor = new Executor();
  #data;

  constructor() {
    super();
    this.template = document.getElementById("todoapp-template");
    this.$ = (css) => this.querySelector(css);
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));

    this.input = this.$("#todo-input");
    this.ul = this.$("ul");
    this.activesCount = this.$("#items-count");
    this.footer = this.$(".footer");
    this.container = this.$(".container");

    this.setListeners();

    document.startViewTransition(() => {
      this.render();
    });
  }

  render() {
    this.ul.innerHTML = "";

    this.#data = todoList.getByFilter(filtersMap.get(this.dataset.filter));

    this.#data.forEach(this.createTodoItems.bind(this));
    this.activesCount.textContent = todoList.getByFilter(
      filtersMap.get("active")
    ).length;
    const isEmpty = todoList.isEmpty();
    this.footer.style.display = isEmpty ? "none" : "flex";
    this.container.classList.toggle("container--empty", isEmpty);
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
  setListeners() {
    window.addEventListener("keydown", this.shortcutHandler.bind(this));
    this.$("form").addEventListener("submit", this.sumbitHandler.bind(this));

    this.$("#clear").addEventListener(
      "click",
      this.handleClearClick.bind(this)
    );

    ["todoschange", "todosfilter"].forEach((event) => {
      todoList.addObserver(event, () => {
        this.render();
      });
    });

    this.addEventListener("keydown", this.cancelEdition.bind(this));

    this.addEventListener("keydown", this.applyChanges.bind(this));

    this.addEventListener("dblclick", this.initChangeOperation.bind(this));
  }

  cancelEdition(e) {
    if (!this.editing) return;

    if (e.key == "Escape" || e.code == "Escape") {
      this.editing.querySelector("li").classList.remove("todo-item--editing");
      this.editing.querySelector(".text").textContent =
        this.editing.dataset.text;
    }
  }

  applyChanges(e) {
    if (e.key == "Enter" || e.code == "Enter") {
      const oldText = this.editing.dataset.text;
      const newTodo = {
        text: this.editing.querySelector(".update-input").value,
      };
      TodoList.getInstance().editTodo(oldText, newTodo);
    }
  }

  initChangeOperation(e) {
    const todoItem = e.target.closest("todo-item");
    const oldValue = todoItem.dataset.text;

    this.editing = todoItem;

    const li = todoItem.querySelector("li");
    li.classList.add("todo-item--editing");

    const input = todoItem.querySelector(".update-input");
    input.value = oldValue;

    input.focus();
  }
}

customElements.define("todo-app", TodoApp);
