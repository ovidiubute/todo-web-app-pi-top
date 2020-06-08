import * as React from "react";
import "./TodoTitleInput.less";

export type TodoTitleInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const TodoTitleInput = (props: TodoTitleInputProps) => {
  return (
    <input
      className="todoTitleInput"
      type="text"
      placeholder="What's on your mind?"
      {...props}
    />
  );
};
