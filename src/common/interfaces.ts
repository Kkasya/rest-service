interface UserProp {
  id?: string;
  name: string;
  login: string;
  password?: string;
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

type Table =   'Users'| 'Boards' | 'Tasks';

interface DbProp {
  [table: string]: any[];
 }

export {UserProp, BoardProp, TaskProp, DbProp, Table};