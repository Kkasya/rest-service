const DB = require('../../common/Db');
const User = require('./user.model');

const getAll = async () => DB.getAll('Users');

const getById = async (id) => {
  const user = await DB.getById('Users', id);
  if (!user) {
    throw new Error(`The user with id ${id} is not exist.`);
  }
  return user;
};

const setNew = async ({name, login, password}) => {
  const user = new User({name, login, password});
  return DB.create('Users', user);
};


const update = async (id, updatedUser) => DB.update('Users', id, updatedUser);

const remove = async (id) => {
  await DB.updateUserIdOfTask(id);
  return DB.remove('Users', id);
}

module.exports = { getAll, getById, setNew, update, remove };


