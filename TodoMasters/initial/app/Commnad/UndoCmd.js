import { TodoHistory } from "../memento.js";
import TodoList from "../TodoList.js";

export class UndoCommand {
  constructor(...params) {
    this.params = params;
  }

  execute() {
    const previousState = TodoHistory.pop();
    console.log(previousState);

    if (previousState) {
      TodoList.getInstance().replaceAll(previousState);
    }
  }
}
