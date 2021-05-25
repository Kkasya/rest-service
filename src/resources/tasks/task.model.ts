let initialId: number = 0;

class Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;

  constructor({
                title = 'First',
                order = 0,
                description = 'Description',
                userId = null,
                boardId = null,
                columnId = null
              } = {}) {
    this.id = Task.getId();;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static getId() {
    initialId += 1;
    return initialId.toString();
  }
}

export {Task};