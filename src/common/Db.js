const User = require('../resources/users/user.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

DB.Users.push(new User(), new User());

const getAllUsers = async () =>
  JSON.parse(JSON.stringify(DB.Users))
;

const getUser = async (id) => DB.Users.filter((user) => user.id === id)[0];

const addUser = async (user) => {
  DB.Users.push(user);
  const newUser = await getUser(user.id);
  return newUser;
};

const updateUser = async (id, {name, login, password}) => {
  const user = await getUser(id);
  if (!user) {
    throw new Error(`The user with id ${id} is not exist.`);
  }
  user.name = name;
  user.login = login;
  user.password = password;

  return user;
}

const removeUser = async (id) => {
  const index = await DB.Users.findIndex((user) => user.id === id);
  if (index === -1) {
    throw new Error(`The user with id ${id} is not exist.`);
  }
  const removedUser = DB.Users.splice(index, 1);

  return removedUser;
}

module.exports = {getAllUsers, getUser, addUser, updateUser, removeUser};