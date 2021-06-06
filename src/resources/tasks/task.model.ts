let initialId = 0;

class Task {
  id?: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
                title = 'First',
                order = 0,
                description = 'Description',
                userId = '',
                boardId = '',
                columnId = ''
              } = {}) {
    this.id = Task.getId();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static getId(): string {
    initialId += 1;
    return initialId.toString();
  }
}

export {Task};