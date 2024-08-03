import TodoList from "./app/TodoList.js";

const links = [];

const router = {
  init,
  go,
};

function init() {
  document.querySelectorAll(".filter").forEach((link) => {
    link.classList.remove("filter--active");
    links.push(link);
    enhanceLink(link);
  });

  window.addEventListener("popstate", (e) => {
    go(e.state.path, false);
  });

  go(location.pathname);
}

function enhanceLink(link) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    link.classList.add("filter--active");
    const goto = e.target.getAttribute("href");
    go(goto);
  });
}

function go(path, saveToHistory = true) {
  if (saveToHistory) {
    history.pushState({ path }, null, path);
  }

  setActiveLink(path);

  const todoapp = document.querySelector("todo-app");
  const [filter] = location.pathname.split("/").slice(1);
  todoapp.dataset.filter = filter;

  TodoList.getInstance().notify("todosfilter");
}

function setActiveLink(path) {
  links.forEach((link) => {
    link.classList.remove("filter--active");
  });

  links
    .find((link) => link.getAttribute("href") == path)
    ?.classList.add("filter--active");
}

export default router;
