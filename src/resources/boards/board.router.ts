import routerDefault from 'express';
import * as boardService from './board.service';
import {BoardProp} from "../../common/interfaces";

const router = routerDefault.Router();

router.route('/').get(async (_req, res) => {
  const boards = await boardService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  try {
    const {id} = req.params;
    if (id) {
      const board = await boardService.getById(id);
      res.json(board);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  const newBoard: BoardProp = req.body;
  const board = await boardService.setNew(newBoard);
  res.status(201).send(board);
});

router.route('/:id').put(async (req, res) => {
  try {
    const {id} = req.params;
    if (id) {
      const updatedBoard: BoardProp = req.body;
      const board = await boardService.update(id, updatedBoard);
      res.json(board);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const {id} = req.params;
    if (id) {
      const board: BoardProp = await boardService.remove(id);
      res.status(204).json(board);
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

export  {router};