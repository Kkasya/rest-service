const router = require('express').Router();
// const Board = require('board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const {id} = req.params;
    const board = await boardService.getById(id);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const newBoard = req.body;
  const board = await boardService.setNew(newBoard);
  res.status(201).send(board);
});

router.route('/:id').put(async (req, res) => {
  try {
    const {id} = req.params;
    const updatedBoard = req.body;
    const board = await boardService.update(id, updatedBoard);
    res.json(board);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const {id} = req.params;
    const board = await boardService.remove(id);
    res.status(204).send(res.json(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;