export type TodoModel = CommonTodoFields & {
  description: string;
  tags: string[];
};

type CommonTodoFields = {
  id: string;
  createdAt: string;
  title: string;
  priority: string;
  isDone: boolean;
};

export type PartialTodoModel = CommonTodoFields;
