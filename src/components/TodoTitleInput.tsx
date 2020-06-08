import * as React from "react";
import "./TodoTitleInput.less";

export type TodoTitleInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const TodoTitleInput = (props: TodoTitleInputProps) => {
  // Focus on title input
  const titleInputEl = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const node = titleInputEl?.current;
    node?.focus();
  }, []);

  return (
    <input
      ref={titleInputEl}
      className="todoTitleInput"
      type="text"
      placeholder="What's on your mind?"
      {...props}
    />
  );
};
