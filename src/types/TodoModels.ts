export type TodoModel = CommonTodoFields & {
  description: string;
  tags: string[];
};

type CommonTodoFields = {
  id: string;
  createdAt: string;
  title: string;
  // Inconsistent back-end API
  priority: string | number;
  isDone: boolean;
};

export type PartialTodoModel = CommonTodoFields;
