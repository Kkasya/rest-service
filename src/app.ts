import * as path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import expressWinston from "express-winston";
import {INTERNAL_SERVER_ERROR, getStatusText} from 'http-status-codes';
import {router  as userRouter } from './resources/users/user.router';
import {router  as boardRouter } from './resources/boards/board.router';
import {router  as taskRouter } from './resources/tasks/task.router';
import {logger,ValidationError, ErrorHandling} from "./logger";

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger);
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use('/', (req:Request, res:Response, next:NextFunction) => {
  if (req.originalUrl === '/'){
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((err:Error, _req:Request, res:Response, next:NextFunction) => {
  if (err instanceof ValidationError) {
    res.status(err.status).send(err.text);
    ErrorHandling( `\nVadidation error: ${err.status} ${err.text}`);
    return;
  }
  next(err);
});

app.use((_err:Error, _req:Request, res:Response) => {
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
  ErrorHandling(`${getStatusText(INTERNAL_SERVER_ERROR)} ${INTERNAL_SERVER_ERROR}`);
});

process.on('uncaughtException', (err:Error) => {
  ErrorHandling(`Exception error: ${err.message}`);
});

process.on('unhandledRejection', (reason: Error) => {
  ErrorHandling(`Unhandled rejection detected: ${reason.message}`);
});
console.log('hi');

export {app};
