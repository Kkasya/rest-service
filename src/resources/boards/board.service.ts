import boardsRepo = require('./board.memory.repository.ts');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const setNew = (newBoard) => boardsRepo.setNew(newBoard);

const update = (id, updatedBoard) => boardsRepo.update(id, updatedBoard);

const remove = (id) => boardsRepo.remove(id);

module.exports = { getAll, getById, setNew, update, remove };
