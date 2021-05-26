interface UserProp {
  id?: string;
  name: string;
  login: string;
  password: string;
}

interface BoardProp {
  id: string;
  title: string;
  columns: Array<{ order: number, title: string }>;
}

interface TaskProp {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}

export {UserProp, BoardProp, TaskProp};