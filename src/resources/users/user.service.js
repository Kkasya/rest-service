const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const setNew = (newUser) => usersRepo.setNew(newUser);

module.exports = { getAll, getById, setNew };
