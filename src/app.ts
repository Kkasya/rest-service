import * as path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import expressWinston from "express-winston";
import fs from 'fs';
import {INTERNAL_SERVER_ERROR, getStatusText} from 'http-status-codes';
import {router  as userRouter } from './resources/users/user.router';
import {router  as boardRouter } from './resources/boards/board.router';
import {router  as taskRouter } from './resources/tasks/task.router';
import {logger,ValidationError} from "./logger";

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

app.use((req:Request) => {
  if (!req.query["param"] ){
    throw new ValidationError();
  }
  throw new Error();
});

app.use((err:Error, _req:Request, res:Response, next:NextFunction) => {
  if (err instanceof ValidationError) {
    res.status(err.status).send(err.text);
    fs.appendFileSync('./log/error.log', `\nVadidation error: ${err.status} ${err.text}`);
    console.log(`\nVadidation error: ${err.status} ${err.text}` );
    return;
  }
  next(err);
});

app.use((_err:Error, _req:Request, res:Response) => {
  fs.appendFileSync('./log/error.log', `\n ${getStatusText(INTERNAL_SERVER_ERROR)} ${INTERNAL_SERVER_ERROR}` );
  console.log(`\nError: ${INTERNAL_SERVER_ERROR} ${getStatusText(INTERNAL_SERVER_ERROR)}` );
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
  process.exit(1);
});

// setTimeout(() => {
//   throw new Error('uncaughtException');
// }, 1500);

process.on('uncaughtException', (err:Error) => {
  console.error(`Exception error: ${err.message}`);
  fs.appendFileSync('./log/error.log', `\nException error: ${err.message}`);
  process.exit(1);
});

// setTimeout(() => {
//   Promise.reject(new Error('unhandledRejection'))
// }, 1500);

process.on('unhandledRejection', (reason: Error) => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  fs.appendFileSync('./log/error.log', `\nUnhandled rejection detected: ${reason.message}`);
  process.exit(1);
});


export {app};
