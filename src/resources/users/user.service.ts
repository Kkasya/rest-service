import * as usersRepo from './user.memory.repository';
import {UserProp} from "../../common/interfaces";

const getAll = (): Promise<UserProp[]> => usersRepo.getAll();

const getById = (id: string): Promise<UserProp> => usersRepo.getById(id);

const setNew = (newUser: UserProp): Promise<UserProp> => usersRepo.setNew(newUser);

const update = (id: string, updatedUser: UserProp): Promise<UserProp> => usersRepo.update(id, updatedUser);

const remove = (id: string): Promise<UserProp> => usersRepo.remove(id);

export { getAll, getById, setNew, update, remove };
