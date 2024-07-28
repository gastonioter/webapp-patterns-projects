import { Executor } from "./app/Commnad/Executor.js";
import { LocalStorage } from "./app/storage.js";
import { UndoCommand } from "./app/Commnad/UndoCmd.js";

import "./components/TodoApp.js";
import "./components/TodoItem.js";

const executor = new Executor();

document.addEventListener("DOMContentLoaded", renderApp);
document.addEventListener("DOMContentLoaded", bindListeners);
document.addEventListener("DOMContentLoaded", loadFromStorage);

function renderApp() {
  document.body.appendChild(document.createElement("todo-app"));
}

function bindListeners() {
  document.addEventListener("keydown", addTodoShortcut);
  document.addEventListener("keydown", undo);
}
function loadFromStorage() {
  LocalStorage.load();
}
function undo(e) {
  if (e.ctrlKey && e.key == "z") {
    executor.setCommand(new UndoCommand());
    executor.executeCommand();
  }
}
function addTodoShortcut(e) {
  if (e.ctrlKey && e.key == "p") {
    e.preventDefault();
    addTodo();
  }
}
