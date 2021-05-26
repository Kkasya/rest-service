import routerDefault = require('express');
import * as tasksService from './task.sercive';
import {TaskProp} from "../../common/interfaces";

const router = routerDefault.Router({mergeParams: true});

router.route('/').get(async (req, res) => {
  const {boardId} = req.params;
  if (boardId) {
    const tasks = await tasksService.getAll(boardId);
    res.json(tasks);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const {id, boardId} = req.params;
    if (id) {
      if (boardId) {
        const task: TaskProp = await tasksService.getById(id, boardId);
        res.json(task);
      }
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const {boardId} = req.params;
  if (boardId) {
    const newTask: TaskProp = {...req.body, boardId};
    const task: TaskProp = await tasksService.setNew(newTask);
    res.status(201).json(task);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const {id} = req.params;
    const updatedTask = req.body;
    if (id) {
      const task: TaskProp = await tasksService.update(id, updatedTask);
      res.json(task);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const {id} = req.params;
    if (id) {
      const task: TaskProp = await tasksService.remove(id);
      res.status(204).send(task);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export {router};
