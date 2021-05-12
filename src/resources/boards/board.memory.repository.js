const DB = require('../../common/Db');
const Board = require('./board.model');

const getAll = async () => DB.getAll('Boards');

const getById = async (id) => {
  const board = await DB.getById('Boards', id);
  if (!board) {
    throw new Error(`The board with id ${id} is not exist.`);
  }

  return board;
};

const setNew = async ({title, columns}) => {
  const board = new Board({title, columns});
  return DB.create('Boards', board);
};


const update = async (id, updatedBoard) => DB.update('Boards', id, updatedBoard);

const remove = async (id) => DB.remove('Boards', id);

module.exports = { getAll, getById, setNew, update, remove };


