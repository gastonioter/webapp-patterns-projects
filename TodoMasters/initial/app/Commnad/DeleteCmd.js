import TodoList from "../TodoList.js";

export default class DeleteCommand {
  reciver = TodoList.getInstance();

  constructor(...params) {
    this.params = params;
  }
  execute() {
    const [textTodo] = this.params;
    console.log(textTodo);
    
    this.reciver.delete(textTodo);
  }
}
