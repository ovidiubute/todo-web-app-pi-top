import { PartialTodoModel, TodoModel } from "../../types/TodoModels";

export const getPartialTodos = async (): Promise<PartialTodoModel[]> => {
  return fetch(
    "https://backend-test.pi-top.com/todo-test/v1/todos"
  ).then((data) => data.json());
};

export const getTodo = async (todoId: string): Promise<TodoModel> => {
  return fetch(
    `https://backend-test.pi-top.com/todo-test/v1/todos/${todoId}`
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

export const addTodo = async (todo: Omit<TodoModel, "id">) => {
  return fetch("https://backend-test.pi-top.com/todo-test/v1/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  }).then((data) => data.json());
};
