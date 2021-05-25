import * as usersRepo from './user.memory.repository';

const getAll = () => usersRepo.getAll();

const getById = (id: string) => usersRepo.getById(id);

const setNew = (newUser: {name: string, login: string, password: string}) => usersRepo.setNew(newUser);

const update = (id: string, updatedUser: {name: string, login: string, password: string}) => usersRepo.update(id, updatedUser);

const remove = (id: string) => usersRepo.remove(id);

export { getAll, getById, setNew, update, remove };
