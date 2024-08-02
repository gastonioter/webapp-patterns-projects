import { Executor } from "./app/Commnad/Executor.js";
import { LocalStorage } from "./app/storage.js";
import { UndoCommand } from "./app/Commnad/UndoCmd.js";
import "./components/TodoApp.js";
import "./components/TodoItem.js";
import router from "./router.js";

HTMLElement.on = function (event, listener) {
  this.addEventListener(event, listener);
};

const executor = new Executor();

document.addEventListener("DOMContentLoaded", renderApp);
document.addEventListener("DOMContentLoaded", bindListeners);
document.addEventListener("DOMContentLoaded", loadFromStorage);

function renderApp() {
  document.body.appendChild(document.createElement("todo-app"));
  router.init();
}

function bindListeners() {
  window.addEventListener("keydown", undo);
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
