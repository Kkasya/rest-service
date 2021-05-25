import * as DB from '../../common/Db';
import {User} from './user.model';

/**
 * Get all entries of Users
 * @return {Array<User>} all users
 */

const getAll = async () => DB.getAll('Users');

/**
 * Get the user by the id
 * @param {String} id - the id of the user
 * @return {User} the user by the id
 */

const getById = async (id: string) => {
  const user: {id: string, name: string, login: string, password: string} = await DB.getById('Users', id);
  if (!user) {
    throw new Error(`The user with id ${id} is not exist.`);
  }
  return user;
};

/**
 * Create new User
 * @param {User} User - the new User
 * @return {User} new user
 */

const setNew = async ({name, login, password}: {name: string, login: string, password: string}) => {
  const user = new User({name, login, password});
  return DB.create('Users', user);
};

/**
 * Update the user
 * @param {String} id - user id
 * @param {User} updatedUser - the updated user
 * @return {User} updated user
 */

const update = async (id: string, updatedUser: {name: string, login: string, password: string}) => {
  return DB.update('Users', id, updatedUser);
}

/**
 * Remove the user by the id
 * @param {String} id - the user id
 * @return {void}
 */

const remove = async (id:string) => {
  await DB.updateUserIdOfTask(id);
  return DB.remove('Users', id);
}

export { getAll, getById, setNew, update, remove };


