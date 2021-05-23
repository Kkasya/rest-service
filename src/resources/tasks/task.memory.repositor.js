const DB = require('../../common/Db');
const Task = require('./task.model');

/**
 * Get all entries of Tasks of the board
 * @param {String} boardId - the board id
 * @return {Array<Task>} all tasks of the board
 */

const getAll = async (boardId) => DB.getTasksOfBoards(boardId);

/**
 * Get the task by the id
 * @param {String} id - the id of the task
 * @param {String} boardId - the board id
 * @return {Task} the task by the id
 */

const getById = async (id, boardId) => {
  const task = await DB.getById('Tasks', id, boardId);
  if (!task) {
    throw new Error(`The task with id ${id} is not exist.`);
  }
  return task;
};

/**
 * Create new Task
 * @param {Task} newTask - the new Task
 * @return {Task} new task
 */

const setNew = async (newTask) => {
  const task = new Task(newTask);
  return DB.create('Tasks', task);
};

/**
 * Update the task
 * @param {String} id - task id
 * @param {Task} updatedTask - the updated task
 * @return {Task} updated task
 */

const update = async (id, updatedTask) => DB.update('Tasks', id, updatedTask);

/**
 * Remove the task by the id
 * @param {String} id - the task id
 * @return {void}
 */

const remove = async (id) => DB.remove('Tasks', id);

module.exports = { getAll, getById, setNew, update, remove };


