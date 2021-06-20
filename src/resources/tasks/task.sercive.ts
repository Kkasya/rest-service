import * as taskRepo from './task.memory.repository';
import {TaskProp} from "../../common/interfaces";

const getAll = (boardId: string): Promise<TaskProp[]> => taskRepo.getAll(boardId);

const getById = (id: string, boardId: string): Promise<TaskProp> => taskRepo.getById(id, boardId);

const setNew = (newTask: TaskProp): Promise<TaskProp> => taskRepo.setNew(newTask);

const update = (id: string, updatedTask: TaskProp): Promise<TaskProp> => taskRepo.update(id, updatedTask);

const remove = (id: string): Promise<TaskProp> => taskRepo.remove(id);

export { getAll, getById, setNew, update, remove };
