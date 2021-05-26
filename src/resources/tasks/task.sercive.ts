import * as taskRepo from './task.memory.repository';
import {TaskProp} from "../../common/interfaces";

const getAll = (boardId: string) => taskRepo.getAll(boardId);

const getById = (id: string, boardId: string) => taskRepo.getById(id, boardId);

const setNew = (newTask: TaskProp) => taskRepo.setNew(newTask);

const update = (id: string, updatedTask: TaskProp) => taskRepo.update(id, updatedTask);

const remove = (id: string) => taskRepo.remove(id);

export { getAll, getById, setNew, update, remove };
