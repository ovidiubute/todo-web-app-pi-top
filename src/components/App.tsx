import * as React from "react";
import { getTodos, setDone } from "../todo/services/todoService";
import { TodoModel } from "../types/TodoModel";
import "./App.less";
import { Header } from "./Header";
import { TodoCard } from "./TodoCard";

export const App = () => {
  const [todos, setTodos] = React.useState<TodoModel[]>([]);

  React.useEffect(() => {
    async function loadAllTodos() {
      const results = await getTodos();
      setTodos(results);
    }

    loadAllTodos();
  }, []);

  return (
    <div>
      <Header />
      <div className="view">
        {todos.map((t) => (
          <TodoCard
            key={t.id}
            {...t}
            onToggle={async (e: React.ChangeEvent<HTMLInputElement>) => {
              const newTodoData = await setDone({
                id: t.id,
                isDone: e.target.checked,
              });

              const updatedTodos: TodoModel[] = [];
              for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === t.id) {
                  updatedTodos.push(newTodoData);
                } else {
                  updatedTodos.push(todos[i]);
                }
              }

              setTodos(updatedTodos);
            }}
          />
        ))}
      </div>
    </div>
  );
};
