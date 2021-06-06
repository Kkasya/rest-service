import {BoardProp} from "../../common/interfaces";
import boardsRepo = require('./board.memory.repository');

const getAll = (): Promise<BoardProp[]> => boardsRepo.getAll();

const getById = (id: string): Promise<BoardProp> => boardsRepo.getById(id);

const setNew = (newBoard: BoardProp): Promise<BoardProp> => boardsRepo.setNew(newBoard);

const update = (id: string, updatedBoard: BoardProp): Promise<BoardProp> => boardsRepo.update(id, updatedBoard);

const remove = (id: string): Promise<BoardProp> => boardsRepo.remove(id);

export { getAll, getById, setNew, update, remove };
