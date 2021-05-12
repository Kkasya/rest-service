const {v4: uuid} = require('uuid');

class Board {
  constructor({
                id = uuid(),
                title = 'First board',
                columns = [
                  {
                    title: 'Not started',
                    order: 0
                  }
                ]
              } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [...columns];
  }

  // static toResponse(board) {
  //   const { id, name, login } = user;
  //   return { id, name, login };
  // }
}

module.exports = Board;
