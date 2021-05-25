import * as usersRepo from './user.memory.repository';

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const setNew = (newUser) => usersRepo.setNew(newUser);

const update = (id, updatedUser) => usersRepo.update(id, updatedUser);

const remove = (id) => usersRepo.remove(id);

export { getAll, getById, setNew, update, remove };
