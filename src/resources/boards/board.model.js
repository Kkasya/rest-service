let initialId = 0;

class Board {
  constructor({
                title = 'First board',
                columns = [
                  {
                    title: 'Not started',
                    order: 0
                  }
                ]
              } = {}) {
    this.id = Board.getId();
    this.title = title;
    this.columns = [...columns];
  }

  static getId() {
    initialId += 1;
    return initialId.toString();
  }
}

module.exports = Board;
