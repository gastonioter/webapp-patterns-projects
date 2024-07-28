class TodoItem {
  constructor(text) {
    this.text = text;
  }
  
  equals(other) {
    return this.text === other.text;
  }
}

export default TodoItem; 
