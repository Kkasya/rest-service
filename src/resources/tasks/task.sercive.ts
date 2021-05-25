import * as taskRepo from './task.memory.repositor';

const getAll = (boardId) => taskRepo.getAll(boardId);

const getById = (id, boardId) => taskRepo.getById(id, boardId);

const setNew = (newTask) => taskRepo.setNew(newTask);

const update = (id, updatedTask) => taskRepo.update(id, updatedTask);

const remove = (id) => taskRepo.remove(id);

export { getAll, getById, setNew, update, remove };
