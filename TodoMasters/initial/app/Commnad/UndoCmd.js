import { TodoHistory } from "../memento.js";
import TodoList from "../TodoList.js";

export class UndoCommand {
  execute() {
    const previousState = TodoHistory.pop();
    if (previousState) {
      console.log("poped: ", previousState);

      TodoList.getInstance().replaceAll(previousState);
    }
  }
}
