class TodoItem {
  constructor(text, done = false) {
    this.text = text;
    this.done = done;
  }

  equals(other) {
    return this.text === other.text;
  }

  completition(value) {
    this.done = value;
  }

  isDone() {
    this.done;
  }
}

export default TodoItem;
