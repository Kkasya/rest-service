import * as DB from '../../common/Db';
import {User} from './user.model';
import {UserProp} from "../../common/interfaces";

/**
 * Get all entries of Users
 * @return {Promise<User[]>} all users
 */

const getAll = async (): Promise<UserProp[]> => DB.getAll('Users');

/**
 * Get the user by the id
 * @param {String} id - the id of the user
 * @return {Promise<User>} the user by the id
 */

const getById = async (id: string): Promise<UserProp> => {
  const user: UserProp = await DB.getById('Users', id);
  if (!user) {
    throw new Error(`The user with id ${id} is not exist.`);
  }
  return user;
};

/**
 * Create new User
 * @param {User} User - the new User
 * @return {Promise<User>} new user
 */

const setNew = async ({name, login, password}: UserProp): Promise<UserProp> => {
  const user: UserProp = new User({name, login, password});
  return DB.create('Users', user);
};

/**
 * Update the user
 * @param {String} id - user id
 * @param {User} updatedUser - the updated user
 * @return {Promise<User>} updated user
 */

const update = async (id: string, updatedUser: UserProp): Promise<UserProp> => DB.update('Users', id, updatedUser)

/**
 * Remove the user by the id
 * @param {String} id - the user id
 * @return {Promise<UserProp>}
 */

const remove = async (id:string): Promise<UserProp> => {
  await DB.updateUserIdOfTask(id);
  return DB.remove('Users', id);
}

export { getAll, getById, setNew, update, remove };


