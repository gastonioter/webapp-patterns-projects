import TodoList from "./TodoList.js";

export const TodoHistory = {
  history: [],

  push(state) {
    /* a need to create a brand new collection */

    this.history.push(new Set([...state]));
  },

  pop() {
    if (this.history.length > 1) {
      this.history.pop();

      return this.history.pop();
    }
  },
};

const todoList = TodoList.getInstance();

todoList.addObserver("todoschange", () => {
  TodoHistory.push(todoList.items);
});
