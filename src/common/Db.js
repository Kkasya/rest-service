const User = require('../resources/users/user.model');

const DB = [];

DB.push(new User(), new User());

const getAllUsers = async () => 
   JSON.parse(JSON.stringify(DB))
 // return [...DB];
;

const getUser = async (id) => DB.filter((user) => user.id === id)[0];

const addUser = async (user) => {
  DB.push(user);
  const newUser = await getUser(user.id);
  return newUser;
}

module.exports = {getAllUsers, getUser, addUser};