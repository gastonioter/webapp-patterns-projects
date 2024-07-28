import TodoList from "../TodoList.js";
import TodoItem from "../TodoItem.js";

export class Command {
  /* the request, becomes an object */
  /* in the pattern this is usually an interface  */

  name;
  args;

  constructor(name, ...args) {
    this.name = name;
    this.args = args;
  }
}

// Singleton
export const Commands = {
  ADD: "add",
  DELETE: "delete",
  DELETE_ALL: "delete_all",
};

export const CommnadExecutor = {
  execute(commnand) {
    const todoList = TodoList.getInstance();

    switch (commnand.name) {
      case Commands.ADD:
        var todoInp = globalThis.DOM.todoInput;
        var todoText = todoInp.value.trim();
        var itemInList = todoList.findByText(todoText);

        if (todoText && !itemInList) {
          todoList.add(new TodoItem(todoText));
          todoInp.value = "";
        }
        break;

      case Commands.DELETE:
        const [textTodo] = commnand.args;
        console.log(textTodo);

        todoList.delete(textTodo);

        break;

      default:
        break;
    }
  },
};
