const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const setNew = (newUser) => usersRepo.setNew(newUser);

const update = (id, updatedUser) => usersRepo.update(id, updatedUser);

const remove = (id) => usersRepo.remove(id);

module.exports = { getAll, getById, setNew, update, remove };
