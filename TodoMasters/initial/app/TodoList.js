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

  add(todo) {
    const alreadyExists = this.isRepeted(todo);
    if (!alreadyExists) {
      this.#data.add(todo);
      this.notify("todoschange");
    }
  }
  isEmpty() {
    return this.#data.size == 0;
  }
  mark(text, value) {
    this.findByText(text).completition(value);
    this.notify("todoschange");
  }
  delete(text) {
    const todos = Array.from(this.#data);
    const toDelete = todos.find((t) => t.text == text);
    this.#data.delete(toDelete);
    this.notify("todoschange");
  }
  findByText(text) {
    const todos = Array.from(this.#data);
    return todos.find((t) => t.text == text);
  }
  replaceAll(list) {
    this.#data = list;
    this.notify("todoschange");
  }

  isRepeted(todo) {
    return Array.from(this.#data).some((t) => t.equals(todo));
  }
  editTodo(text, newData) {
    const todo = this.findByText(text);
    const repetedText = this.findByText(newData.text);
    if (!repetedText) {
      todo.text = newData.text;
      this.notify("todoschange");
    }
  }

  getByFilter(filterFn) {
    return Array.from(this.#data).filter((todo) => filterFn(todo));
  }

  clearCompleted() {
    const completed = this.getByFilter((todo) => todo.done);
    completed.forEach((p) => {
      this.#data.delete(p);
    });
    this.notify("todoschange");
  }
}

Object.assign(TodoList.prototype, observerMixin);

export default TodoList;
