const DB = require('../../common/Db');
const Task = require('./task.model');

const getAll = async (boardId) => DB.getTasksOfBoards(boardId);

const getById = async (id, boardId) => {
  const task = await DB.getById('Tasks', id, boardId);
  if (!task) {
    throw new Error(`The task with id ${id} is not exist.`);
  }
  return task;
};

const setNew = async (newTask) => {
  const task = new Task(newTask);
  return DB.create('Tasks', task);
};


const update = async (id, updatedTask) => DB.update('Tasks', id, updatedTask);

const remove = async (id) => DB.remove('Tasks', id);

module.exports = { getAll, getById, setNew, update, remove };


