const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

DB.Users.push(new User(), new User());
DB.Boards.push(new Board());

/**
 * Get the size of the table
 * @param {String} table - the name the table in the DB
 * @return {Number}
 */

const getSize = async (table) => DB[table].length;

/**
 * Get all entries of the table
 * @param {String} table - the name the table in the DB
 * @return {Array}
 */

const getAll = async (table) => JSON.parse(JSON.stringify(DB[table]));

/**
 * Get the entry of the table by the id
 * @param {String} table - the name table in the DB
 * @param {String} id - the id of the entry
 * @param {Number} [boardId] - the id of the board
 * @return {Object}
 */

const getById = async (table, id, boardId) => {
  const data = boardId ?
    DB[table].filter((item) => item.boardId === boardId) :
    DB[table];
  return data.filter((item) => item.id === id)[0];
}

/**
 * Create the entry of the table
 * @param {String} table - the name table in the DB
 * @param {Object} item - the new item for the table
 * @return {Object}
 */

const create = async (table, item) => {
  DB[table].push(item);
  return item;
};

/**
 * Update the entry of the table
 * @param {String} table - the name table in the DB
 * @param {String} id - id of the entry
 * @param {Object} updatedItem - the updated item for the table
 * @return {Object}
 */

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

/**
 * Get all tasks of the board
 * @param {String} boardId -  the id of the board
 * @return {Array}
 */

const getTasksOfBoards = async (boardId) => DB.Tasks.filter((task) => task.boardId === boardId)

/**
 * Remove all tasks of the board
 * @param {String} boardId -  the id of the board
 * @return {void}
 */

const removeTasksByBoard = async (boardId) => {
  const tasks = await getAll('Tasks');
  const updatedTasks = [];
  tasks.forEach((item) => {
    if (item.boardId !== boardId) updatedTasks.push(item);
  });
  DB.Tasks = updatedTasks;
};

/**
 * Update all tasks having the user with userId
 * @param {String} userId - the id of the user
 * @return {void}
 */

const updateUserIdOfTask = async (userId) => {
  const tasks = await getAll('Tasks');
  const updatedTasks = [];
  tasks.forEach((task) => {
    if (task.userId === userId) updatedTasks.push({...task, userId: null});
  });
  DB.Tasks = updatedTasks;
};

/**
 * Remove the item of the table
 * @param {String} table - the table of the DB
 * @param {String} id - the id of the item
 * @return {Array}
 */

const remove = async (table, id) => {
  const index = await DB[table].findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`The entity with id ${id} is not exist.`);
  }
  if (table === 'Board') await removeTasksByBoard(id);
  return DB[table].splice(index, 1);
};

module.exports = {getAll, getById, create, update, remove, getTasksOfBoards, removeTasksByBoard, updateUserIdOfTask, getSize};