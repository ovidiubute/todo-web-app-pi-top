import * as React from "react";
import { TodoModel } from "../types/TodoModel";
import "./TodoCard.less";

export type TodoCardProps = TodoModel & {
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

export const TodoCard = (props: TodoCardProps) => {
  return (
    <section className="todoCard">
      <div>
        <input
          type="checkbox"
          checked={props.isDone}
          onChange={props.onToggle}
        />
      </div>
      <div>
        <label>{props.title}</label>
      </div>
    </section>
  );
};
