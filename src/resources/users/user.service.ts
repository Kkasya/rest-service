import * as usersRepo from './user.memory.repository';
import {UserProp} from "../../common/interfaces";

const getAll = () => usersRepo.getAll();

const getById = (id: string) => usersRepo.getById(id);

const setNew = (newUser: UserProp) => usersRepo.setNew(newUser);

const update = (id: string, updatedUser: UserProp) => usersRepo.update(id, updatedUser);

const remove = (id: string) => usersRepo.remove(id);

export { getAll, getById, setNew, update, remove };
