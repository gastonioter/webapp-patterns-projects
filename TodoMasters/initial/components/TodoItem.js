import DeleteCommand from "../app/Commnad/DeleteCmd.js";
import { Executor } from "../app/Commnad/Executor.js";

export class TodoItem extends HTMLElement {
  executor = new Executor();
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("todo-item-template");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    const text = this.dataset.text;

    this.querySelector("li").insertAdjacentText("afterbegin", text);
    this.querySelector(".delete-btn").addEventListener(
      "click",
      this.removeTodo.bind(this)
    );
  }

  removeTodo(e) {
    this.executor.setCommand(new DeleteCommand(this.dataset.text));
    this.executor.executeCommand();
    console.log("executed");
  }
}

customElements.define("todo-item", TodoItem);
