import TodoList from "../TodoList.js";

export class ClearCmd {
  constructor(...params) {
    this.params = params;
  }

  execute() {
    TodoList.getInstance().replaceAll(new Set());
  }
}
