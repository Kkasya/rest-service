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

const getById = async (table, id, boardId) => {
  // if (boardId)
  const data = boardId ?
    DB[table].filter((item) => item.boardId === boardId) :
    DB[table];
  return data.filter((item) => item.id === id)[0];
}

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

const getTasksOfBoards = async (boardId) => DB.Tasks.filter((task) => task.boardId === boardId)

const removeTasksByBoard = async (boardId) => {
  const tasks = await getAll('Tasks');
  const updatedTasks = [];
  tasks.forEach((item) => {
    if (item.boardId !== boardId) updatedTasks.push(item);
  });
  DB.Tasks = updatedTasks;
};

const updateUserIdOfTask = async (userId) => {
  const tasks = await getAll('Tasks');
  const updatedTasks = [];
  tasks.forEach((task) => {
    if (task.userId === userId) updatedTasks.push({...task, userId: null});
  });
  DB.Tasks = updatedTasks;
};

const remove = async (table, id) => {
  const index = await DB[table].findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`The entity with id ${id} is not exist.`);
  }
  if (table === 'Board') await removeTasksByBoard(id);
  return DB[table].splice(index, 1);
};

module.exports = {getAll, getById, create, update, remove, getTasksOfBoards, removeTasksByBoard, updateUserIdOfTask};