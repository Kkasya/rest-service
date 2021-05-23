const DB = require('../../common/Db');
const User = require('./user.model');


/**
 * Get all entries of Users
 * @return {Array<User>}
 */

const getAll = async () => DB.getAll('Users');

/**
 * Get the entry of Users by the id
 * @param {String} id - the id of the entry
 * @return {User}
 */

const getById = async (id) => {
  const user = await DB.getById('Users', id);
  if (!user) {
    throw new Error(`The user with id ${id} is not exist.`);
  }
  return user;
};

/**
 * Create new User
 * @param {User} User - the new User
 * @return {User}
 */

const setNew = async ({name, login, password}) => {
  const user = new User({name, login, password});
  return DB.create('Users', user);
};

/**
 * Update the user
 * @param {String} id - user id
 * @param {User} updatedUser - the updated user
 * @return {User}
 */

const update = async (id, updatedUser) => DB.update('Users', id, updatedUser);

/**
 * Remove the user by the id
 * @param {String} id - the user id
 * @return {void}
 */

const remove = async (id) => {
  await DB.updateUserIdOfTask(id);
  return DB.remove('Users', id);
}

module.exports = { getAll, getById, setNew, update, remove };


