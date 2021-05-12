const DB = require('../../common/Db');
const User = require('./user.model');

const getAll = async () => DB.getAllUsers();

const getById = async (id) => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Error(`The user with id ${id} is not exist.`);
  }

  return user;
};

const setNew = async ({name, login, password}) => {
  const user = new User({name, login, password});
  return DB.addUser(user);
};

module.exports = { getAll, getById, setNew };


