let initialId: number = 0;

class Board {
  id: string;
  title: string;
  columns: Array<{ order: number, title: string }>;

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

export {Board};
