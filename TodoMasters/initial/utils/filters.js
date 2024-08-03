const filtersMap = new Map([
  ["", () => true],
  ["active", (todo) => !todo.done],
  ["done", (todo) => todo.done],
]);

export default filtersMap;
