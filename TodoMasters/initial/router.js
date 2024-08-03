import TodoList from "./app/TodoList.js";

const links = [];

const router = {
  init,
  go,
};

function init() {
  go(location.pathname);

  document.querySelectorAll(".filter").forEach((link) => {
    link.classList.remove("filter--active");
    enhanceLink(link);
    links.push(link);
  });
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
    history.replaceState({ path }, null, path);
  }

  switch (path) {
    case "/":
      TodoList.getInstance().all();

      break;
    case "/active":
      TodoList.getInstance().active();
      break;
    case "/completed":
      TodoList.getInstance().completed();
      break;

    default:
      break;
  }

  setActiveLink(path);
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
