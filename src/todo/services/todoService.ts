export const getTodos = async () => {
  return fetch(
    "https://backend-test.pi-top.com/todo-test/v1/todos"
  ).then((data) => data.json());
};
