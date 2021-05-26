import * as DB from '../../common/Db';
import {Task} from './task.model';
import {TaskProp} from "../../common/interfaces";

/**
 * Get all entries of Tasks of the board
 * @param {String} boardId - the board id
 * @return {Promise<Task[]>} all tasks of the board
 */

const getAll = async (boardId: string): Promise<TaskProp[]> => DB.getTasksOfBoards(boardId);

/**
 * Get the task by the id
 * @param {String} id - the id of the task
 * @param {String} boardId - the board id
 * @return {Promise<Task>} the task by the id
 */

const getById = async (id: string, boardId: string): Promise<TaskProp> => {
  const task = await DB.getById('Tasks', id, boardId);
  if (!task) {
    throw new Error(`The task with id ${id} is not exist.`);
  }
  return task;
};

/**
 * Create new Task
 * @param {Task} newTask - the new Task
 * @return {Promise<Task>} new task
 */

const setNew = async (newTask: TaskProp): Promise<TaskProp> => {
  const task = new Task(newTask);
  return DB.create('Tasks', task);
};

/**
 * Update the task
 * @param {String} id - task id
 * @param {Task} updatedTask - the updated task
 * @return {Promise<Task>} updated task
 */

const update = async (id: string, updatedTask: TaskProp): Promise<TaskProp> => DB.update('Tasks', id, updatedTask);

/**
 * Remove the task by the id
 * @param {String} id - the task id
 * @return {Promise<Task>}
 */

const remove = async (id: string): Promise<TaskProp> => DB.remove('Tasks', id);

export { getAll, getById, setNew, update, remove };


