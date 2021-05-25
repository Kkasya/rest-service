import express  = require('express');
import swaggerUI  = require('swagger-ui-express');
import * as path from 'path';
import YAML  = require('yamljs');
import {router  as userRouter } from './resources/users/user.router';
import {router  as boardRouter } from './resources/boards/board.router';
import {router  as taskRouter } from './resources/tasks/task.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

export {app};
