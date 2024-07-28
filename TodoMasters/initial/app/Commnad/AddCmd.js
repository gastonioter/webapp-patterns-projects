import TodoItem from "../TodoItem.js";
import TodoList from "../TodoList.js";

export default class AddCommnad {
  reciver = TodoList.getInstance();

  constructor(...params) {
    this.params = params;
  }

  execute() {
    var [text] = this.params;
    text = text.trim();
    var itemInList = this.reciver.findByText(text);

    if (text && !itemInList) {
      this.reciver.add(new TodoItem(text));
    }
  }
}
