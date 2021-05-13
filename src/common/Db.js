const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

DB.Users.push(new User(), new User());
DB.Boards.push(new Board());

const getAll = async (table) => JSON.parse(JSON.stringify(DB[table]));

const getById = async (table, id) => DB[table].filter((user) => user.id === id)[0];

const create = async (table, item) => {
  DB[table].push(item);
  const newItem = await getById(table, item.id);
  return newItem;
};

const update = async (table, id, updatedItem) => {
  const index = await DB[table].findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`The entity with id ${id} is not exist.`);
  }
  const oldItem = DB[table][index];
  const newItem = {...oldItem, ...updatedItem};
  DB[table].splice(index, 1, newItem);

  return updatedItem;
};

const remove = async (table, id) => {
  const index = await DB[table].findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`The entity with id ${id} is not exist.`);
  }
  return DB[table].splice(index, 1);
};

const getTasksOfBoards = async (boardId) => DB.Tasks.filter((task) => task.boardId === boardId)

module.exports = {getAll, getById, create, update, remove, getTasksOfBoards};