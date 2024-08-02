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

    this.addEventListener("dblclick", (e) => {});

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
