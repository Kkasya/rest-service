import routerDefault = require('express');
import * as tasksService from './task.sercive';

const router = routerDefault.Router({mergeParams: true});

router.route('/').get(async (req, res) => {
  const {boardId} = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const {id, boardId} = req.params;
    const task = await tasksService.getById(id, boardId);
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const {boardId} = req.params;
  const newTask = {...req.body, boardId};
  const task = await tasksService.setNew(newTask);
  res.status(201).json(task);
});

router.route('/:id').put(async (req, res) => {
  try {
    const {id} = req.params;
    const updatedTask = req.body;
    const task = await tasksService.update(id, updatedTask);
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const {id} = req.params;
    const task = await tasksService.remove(id);
    res.status(204).send(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export {router};
