const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const {id} = req.params;
    const user = await usersService.getById(id);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const newUser = req.body;
  const user = await usersService.setNew(newUser);
  res.status(201).send(res.json(User.toResponse(user)));
});

module.exports = router;
