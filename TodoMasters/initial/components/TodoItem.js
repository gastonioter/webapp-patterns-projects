import DeleteCommand from "../app/Commnad/DeleteCmd.js";
import { Executor } from "../app/Commnad/Executor.js";
import { interpolate } from "../utils/interpolate.js";

export class TodoItem extends HTMLElement {
  executor = new Executor();
  constructor() {
    super();
    this.template = document.getElementById("todo-item-template");
  }

  connectedCallback() {
    const text = this.dataset.text;

    this.innerHTML = interpolate(this.template.innerHTML, {
      text,
    });

    this.querySelector(".delete-btn").addEventListener(
      "click",
      this.removeTodo.bind(this)
    );
  }

  removeTodo(e) {
    this.executor.setCommand(new DeleteCommand(this.dataset.text));
    this.executor.executeCommand();
  }
}

customElements.define("todo-item", TodoItem);
