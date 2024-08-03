import DeleteCommand from "../app/Commnad/DeleteCmd.js";
import { Executor } from "../app/Commnad/Executor.js";
import TodoList from "../app/TodoList.js";
import { interpolate } from "../utils/interpolate.js";

export class TodoItem extends HTMLElement {
  executor = new Executor();
  constructor() {
    super();
    this.$ = (css) => this.querySelector(css);
    this.template = document.getElementById("todo-item-template");
  }

  connectedCallback() {
    const text = this.dataset.text;

    const { done } = TodoList.getInstance().findByText(text);

    this.innerHTML = interpolate(this.template.innerHTML, {
      text,
    });

    this.$(".delete-btn").addEventListener("click", this.removeTodo.bind(this));

    this.addEventListener("dblclick", (e) => {
      const input = document.createElement("input");
      const todoItem = e.target.closest("todo-item");
      todoItem.querySelector("li").classList.add("todo-item--updating");
      input.value = todoItem.dataset.text;

      input.classList.add("update-input");

      e.target.replaceChildren(input);

      input.focus();

      input.addEventListener("change", (e) => {
        TodoList.getInstance().editText(text, e.target.value);
        todoItem.querySelector("li").classList.remove("todo-item--updating");
      });
    });

    this.$("[type='checkbox']").checked = done;

    this.$("[type='checkbox']").addEventListener("change", (e) => {
      TodoList.getInstance().mark(text, e.target.checked);
    });
  }

  removeTodo() {
    this.executor.setCommand(new DeleteCommand(this.dataset.text));
    this.executor.executeCommand();
  }
}

customElements.define("todo-item", TodoItem);
