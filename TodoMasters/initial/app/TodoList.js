import observerMixin from "./mixin.js";

class TodoList {
  // instance private fileds
  #data = new Set();

  //public static fields
  static instance = null;

  // initialization block
  static {
    TodoList.instance = new TodoList();
  }

  static getInstance() {
    return TodoList.instance;
  }

  constructor() {
    if (TodoList.instance) {
      throw new Error("Use TodoList.getInstance() to access the list");
    }
  }

  // getters and setters

  get items() {
    return this.#data;
  }

  // Behaivor

  add(todo) {
    const todos = Array.from(this.#data);
    const alreadyExists = todos.some((t) => t.equals(todo));
    if (!alreadyExists) {
      this.#data.add(todo);
      this.notify();
    }
  }
  mark(text, value) {
    this.findByText(text).completition(value);
    this.notify();
  }
  delete(text) {
    const todos = Array.from(this.#data);
    const toDelete = todos.find((t) => t.text == text);
    this.#data.delete(toDelete);
    this.notify();
  }
  findByText(text) {
    const todos = Array.from(this.#data);
    return todos.find((t) => t.text == text);
  }
  replaceAll(list) {
    this.#data = list;

    this.notify();
  }
}

Object.assign(TodoList.prototype, observerMixin);

export default TodoList;
