import * as DB from '../../common/Db';
import {Board} from './board.model';

/**
 * Get all entries of Board
 * @return {Array<Board>} all boards
 */

const getAll = async () => DB.getAll('Boards');

/**
 * Get the board by the id
 * @param {String} id - the id of the board
 * @return {Board} the board by the id
 */

const getById = async (id) => {
  const board = await DB.getById('Boards', id, undefined);
  if (!board) {
    throw new Error(`The board with id ${id} is not exist.`);
  }

  return board;
};

/**
 * Create new Board
 * @param {Board} Board - the new Board
 * @return {Board} new board
 */

const setNew = async ({title, columns}) => {
  const board = new Board({title, columns});
  return DB.create('Boards', board);
};

/**
 * Update the board
 * @param {String} id - board id
 * @param {Board} updatedBoard - the updated board
 * @return {Board} updated board
 */

const update = async (id, updatedBoard) => DB.update('Boards', id, updatedBoard);

/**
 * Remove the board by the id
 * @param {String} id - the board id
 * @return {void}
 */

const remove = async (id) => {
  await DB.removeTasksByBoard(id);
  return DB.remove('Boards', id);
};

export { getAll, getById, setNew, update, remove };


