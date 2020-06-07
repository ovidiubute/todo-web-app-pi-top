import { TodoModel } from "../../types/TodoModel";

export const getTodos = async (): Promise<TodoModel[]> => {
  return fetch(
    "https://backend-test.pi-top.com/todo-test/v1/todos"
  ).then((data) => data.json());
};

export const setDone = async ({
  id,
  isDone,
}: Partial<TodoModel>): Promise<TodoModel> => {
  return fetch(`https://backend-test.pi-top.com/todo-test/v1/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isDone,
    }),
  }).then((data) => data.json());
};
