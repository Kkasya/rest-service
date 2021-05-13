const router = require('express').Router({mergeParams: true});
const tasksService = require('./task.sercive');

router.route('/').get(async (req, res) => {
  const {boardId} = req.params;
  const tasks = await tasksService.getAll(boardId);
  console.log(tasks)
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const {id} = req.params;
    const task = await tasksService.getById(id);
    res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const {boardId} = req.params;
  const newTask = {...req.body, boardId};
  const task = await tasksService.setNew(newTask);
  res.status(201).send(res.json(task));
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

module.exports = router;
