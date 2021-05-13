let initialId = 0;

class Task {
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

module.exports = Task;