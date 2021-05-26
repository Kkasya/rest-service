import {User} from '../resources/users/user.model';
import {Board} from '../resources/boards/board.model';
import {BoardProp, TaskProp, UserProp} from "./interfaces";
// { [key: string]: Array<{id: string, name: string, login: string, password: string}> } |
// {[key: string]:Array<{id: string,  title: string, columns: Array<{ order: number, title: string }>}> } |
// {[key: string]:Array<{id: string, title: string,  order: number,  description: string,  userId: string,  boardId: string, columnId: string}>
// }

interface DbProp {
  [table: string]:  Array<UserProp> | Array<BoardProp> | Array<TaskProp>;
}
const DB: DbProp  = {
  Users: [],
  Boards: [],
  Tasks: []
};

 DB['Users'].push(new User(), new User());
 DB['Boards'].push(new Board());

/**
 * A User
 * @typedef {Object} User
 * @property {String} [id] - User id
 * @property {String} name - User name
 * @property {String} login - User login
 * @property {String} password - User password
 */

/**
 * A Column
 * @typedef {Object} Column
 * @property {String} title - Column title
 * @property {Number} order - Column order
 */

/**
 * A Board
 * @typedef {Object} Board
 * @property {String} [id] - Board id
 * @property {String} title - Board title
 * @property {Array<Column>} columns - Board columns
 */

/**
 * A Task
 * @typedef {Object} Task
 * @property {String} [id] - Task id
 * @property {String} title - Task title
 * @property {Number} order - Task order
 * @property {String} description - Task description
 * @property {String|null} userId - Task userId
 * @property {String} boardId - Task boardId
 * @property {String} columnId - Task columnId
 */

/**
 * Get the size of the table
 * @param {String} table - the name the table in the DB
 * @return {Number} the size of the table
 */

const getSize = async (table: string) => DB[table].length;

/**
 * Get all entries of the table
 * @param {String} table - the name the table in the DB
 * @return {Array<User|Board|Task>} all entries of the table
 */

const getAll = async (table: string) => JSON.parse(JSON.stringify(DB[table]));

/**
 * Get the entry of the table by the id
 * @param {String} table - the name table in the DB
 * @param {String} id - the id of the entry
 * @param {String} [boardId] - the id of the board
 * @return {User|Board|Task} the entry of the table
 */

const getById = async (table: string, id: string, boardId?: string) => {
  const data = boardId ?
    DB[table].filter((item: TaskProp) => item.boardId === boardId) :
    DB[table];
  return data.filter((item: UserProp|BoardProp|TaskProp) => item.id === id)[0];
}

/**
 * Create the entry of the table
 * @param {String} table - the name table in the DB
 * @param {User|Board|Task} item - the new item for the table
 * @return {User|Board|Task} the entry of the table
 */

const create = async (table: string, item: UserProp|BoardProp|TaskProp) => {
  const length: number = DB[table].push(item);
  return DB[table][length - 1];
};

/**
 * Update the entry of the table
 * @param {String} table - the name table in the DB
 * @param {String} id - id of the entry
 * @param {User|Board|Task} updatedItem - the updated item for the table
 * @return {User|Board|Task} the entry of the table
 */

const update = async (table: string, id: string, updatedItem: UserProp|BoardProp|TaskProp) => {
  const index = await DB[table].findIndex((item: UserProp|BoardProp|TaskProp) => item.id === id);
  if (index === -1) {
    throw new Error(`The entity with id ${id} is not exist.`);
  }
  const oldItem = DB[table][index];
  const newItem = {...oldItem, ...updatedItem};
  DB[table].splice(index, 1, newItem);

  return newItem;
};

/**
 * Get all tasks of the board
 * @param {String} boardId -  the id of the board
 * @return {Array<User|Board|Task>} all tasks of the board
 */

const getTasksOfBoards = async (boardId: string) => {
  return DB['Tasks'].filter((task: TaskProp) => task.boardId === boardId);
}

/**
 * Remove all tasks of the board
 * @param {String} boardId -  the id of the board
 * @return {void}
 */

const removeTasksByBoard = async (boardId: string) => {
  const tasks = await getAll('Tasks');
  const updatedTasks: TaskProp[] = [];
  tasks.forEach((item: TaskProp) => {
    if (item.boardId !== boardId) updatedTasks.push(item);
  });
  DB['Tasks'] = updatedTasks;
};

/**
 * Update all tasks having the user with userId
 * @param {String} userId - the id of the user
 * @return {void}
 */

const updateUserIdOfTask = async (userId: string) => {
  const tasks = await getAll('Tasks');
  const updatedTasks: TaskProp[] = [];
  tasks.forEach((task: TaskProp) => {
    if (task.userId === userId) updatedTasks.push({...task, userId: null});
  });
  DB['Tasks'] = updatedTasks;
};

/**
 * Remove the item of the table
 * @param {String} table - the table of the DB
 * @param {String} id - the id of the item
 * @return {Array<User|Board|Task>} removed item of the table
 */

const remove = async (table: string, id: string) => {
  const index = await DB[table].findIndex((item: UserProp|BoardProp|TaskProp) => item.id === id);
  if (index === -1) {
    throw new Error(`The entity with id ${id} is not exist.`);
  }
  if (table === 'Board') await removeTasksByBoard(id);
  return DB[table].splice(index, 1);
};

export {getAll, getById, create, update, remove, getTasksOfBoards, removeTasksByBoard, updateUserIdOfTask, getSize};