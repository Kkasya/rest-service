import boardsRepo = require('./board.memory.repository');
import {BoardProp} from "../../common/interfaces";

const getAll = () => boardsRepo.getAll();

const getById = (id: string) => boardsRepo.getById(id);

const setNew = (newBoard: BoardProp) => boardsRepo.setNew(newBoard);

const update = (id: string, updatedBoard: BoardProp) => boardsRepo.update(id, updatedBoard);

const remove = (id: string) => boardsRepo.remove(id);

export { getAll, getById, setNew, update, remove };
