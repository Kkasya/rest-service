import * as DB from '../../common/Db';
import {Board} from './board.model';
import {BoardProp} from "../../common/interfaces";

/**
 * Get all entries of Board
 * @return {Promise<Board[]>} all boards
 */

const getAll = async (): Promise<BoardProp[]> => DB.getAll('Boards');

/**
 * Get the board by the id
 * @param {String} id - the id of the board
 * @return {Promise<Board>} the board by the id
 */

const getById = async (id:string): Promise<BoardProp> => {
  const board: BoardProp = await DB.getById('Boards', id, undefined);
  if (!board) {
    throw new Error(`The board with id ${id} is not exist.`);
  }

  return board;
};

/**
 * Create new Board
 * @param {Board} Board - the new Board
 * @return {Promise<Board>} new board
 */

const setNew = async ({title, columns}: BoardProp): Promise<BoardProp> => {
  const board: BoardProp = new Board({title, columns});
  return DB.create('Boards', board);
};

/**
 * Update the board
 * @param {String} id - board id
 * @param {Board} updatedBoard - the updated board
 * @return {Promise<Board>} updated board
 */

const update = async (id: string, updatedBoard: BoardProp): Promise<BoardProp> => DB.update('Boards', id, updatedBoard);

/**
 * Remove the board by the id
 * @param {String} id - the board id
 * @return {Promise<Board>}
 */

const remove = async (id: string): Promise<BoardProp> => {
  await DB.removeTasksByBoard(id);
  return DB.remove('Boards', id);
};

export { getAll, getById, setNew, update, remove };


