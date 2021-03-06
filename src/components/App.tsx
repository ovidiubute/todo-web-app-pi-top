import * as React from "react";
import {
  addTodo,
  getPartialTodos,
  setDone,
} from "../todo/services/todoService";
import { PartialTodoModel } from "../types/TodoModels";
import "./App.less";
import { Header } from "./Header";
import { TodoCard } from "./TodoCard";
import { TodoTitleInput } from "./TodoTitleInput";

export const App = () => {
  const [todos, setTodos] = React.useState<PartialTodoModel[]>([]);
  const [newTitle, setNewTitle] = React.useState<string>("");
  const [formExpanded, setFormExpanded] = React.useState<boolean>(false);
  const [newDescription, setNewDescription] = React.useState<string>("");

  // Load initial data
  React.useEffect(() => {
    async function loadAllTodos() {
      const results = await getPartialTodos();
      setTodos(results);
    }

    loadAllTodos();
  }, []);

  // Focus on textarea when it renders
  const textareaEl = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    const node = textareaEl?.current;
    node?.focus();
  }, [formExpanded]);

  return (
    <div>
      <Header />
      <div className="view">
        <form
          data-testid="todo-new-form"
          className="newTodoForm"
          onSubmit={async (e) => {
            e.preventDefault();

            if (!formExpanded) {
              setFormExpanded(true);
              return;
            }

            await addTodo({
              title: newTitle,
              description: newDescription,
              tags: [],
              priority: 1,
              createdAt: new Date().toISOString(),
              isDone: false,
            });

            const results = await getPartialTodos();
            setTodos(results);
            setFormExpanded(false);
            setNewDescription("");
            setNewTitle("");
          }}
        >
          <TodoTitleInput
            data-testid="todo-new-title"
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={formExpanded}
            value={newTitle}
          />
          {formExpanded && (
            <div data-testid="todo-new-form-expanded">
              <textarea
                ref={textareaEl}
                className="newTodoDescription"
                data-testid="todo-textarea"
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                placeholder={"Can you be more specific?"}
              ></textarea>
              <div>
                <button type="submit" className="button">
                  OK
                </button>
                <button
                  className="button"
                  type="reset"
                  onClick={() => {
                    setFormExpanded(false);
                    setNewDescription("");
                    setNewTitle("");
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </form>
        {todos.map((t) => (
          <TodoCard
            key={t.id}
            {...t}
            onToggle={async (e: React.ChangeEvent<HTMLInputElement>) => {
              const checked = e.currentTarget.checked;
              const newTodoData = await setDone({
                id: t.id,
                isDone: checked,
              });

              const updatedTodos: PartialTodoModel[] = [];
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
