import TodoItem from "./TodoItem.js";
import TodoList from "./TodoList.js";

export const LocalStorage = {
  load() {
    if (localStorage.getItem("todos")) {
      const todosArray = JSON.parse(localStorage.getItem("todos"));
      todosArray.forEach((todo) => {
        TodoList.getInstance().add(new TodoItem(todo.text, todo.done));
      });
    }
  },

  save() {
    const todosList = TodoList.getInstance().items;
    const todosArray = Array.from(todosList);
    localStorage.setItem("todos", JSON.stringify(todosArray));
  },
};

TodoList.getInstance().addObserver("todoschange", LocalStorage.save);
