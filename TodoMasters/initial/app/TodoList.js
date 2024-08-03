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

  // ========================
  // ========================

  add(todo) {
    const todos = Array.from(this.#data);
    const alreadyExists = todos.some((t) => t.equals(todo));
    if (!alreadyExists) {
      this.#data.add(todo);
      this.notify();
    }
  }
  isEmpty() {
    return this.#data.size == 0;
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
    console.log("replaced:", list);

    this.notify();
  }

  // ========================
  // ========================

  getActives() {
    return Array.from(this.#data).filter((todo) => !todo.done);
  }
  clearCompleted() {
    const pendings = Array.from(this.#data).filter((todo) => todo.done);
    pendings.forEach((p) => {
      this.#data.delete(p);
    });
    this.notify();
  }
  active() {}
  completed() {}
  all() {}
}

Object.assign(TodoList.prototype, observerMixin);

export default TodoList;
