import routerDefault = require('express')
import {User} from './user.model';
import * as usersService from './user.service';

const router = routerDefault.Router();

router.route('/').get(async ({}, res) => {
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
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  try {
    const {id} = req.params;
    const updatedUser = req.body;
    const user = await usersService.update(id, updatedUser);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const {id} = req.params;
    const user = await usersService.remove(id);
    res.status(204).json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export {router};
