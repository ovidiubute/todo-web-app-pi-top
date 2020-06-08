import * as React from "react";
import { getTodo } from "../todo/services/todoService";
import { PartialTodoModel, TodoModel } from "../types/TodoModel";
import "./TodoCard.less";

export type TodoCardProps = PartialTodoModel & {
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const TodoCard = (props: TodoCardProps) => {
  const [todo, setTodo] = React.useState<TodoModel>({
    id: props.id,
    isDone: props.isDone,
    priority: props.priority,
    createdAt: props.createdAt,
    tags: [],
    description: "",
    title: props.title,
  });
  const [expanded, setExpanded] = React.useState<boolean>(false);

  // Update internal state if props change
  React.useEffect(() => {
    setTodo({
      id: props.id,
      isDone: props.isDone,
      priority: props.priority,
      createdAt: props.createdAt,
      tags: [],
      description: "",
      title: props.title,
    });
  }, [props.id, props.isDone, props.priority, props.createdAt, props.title]);

  return (
    <section className="todoCard">
      <div>
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={props.onToggle}
        />
      </div>
      <div>
        <label>{todo.title}</label>
      </div>
      <a
        href="#"
        onClick={async (e) => {
          e.preventDefault();

          if (expanded) {
            setExpanded(false);
            return;
          }

          try {
            const t = await getTodo(todo.id);
            setTodo(t);
            setExpanded(true);
          } catch (e) {
            // Nothing for now
          }
        }}
      >
        {expanded ? "Less" : "More..."}
      </a>
      {expanded && (
        <>
          <div>{todo.description}</div>
          <div>{todo.tags.join(", ")}</div>
        </>
      )}
    </section>
  );
};
