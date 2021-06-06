import * as path from 'path';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import {router  as userRouter } from './resources/users/user.router';
import {router  as boardRouter } from './resources/boards/board.router';
import {router  as taskRouter } from './resources/tasks/task.router';
import expressWinston from "express-winston";
import {logger} from "./logger";
import fs from 'fs';
import {ValidationError} from "./logger";

const {INTERNAL_SERVER_ERROR, getStatusText} = require('http-status-codes');



const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger);
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

// app.use('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);



app.use((req:any, res:any, _next:any) => {
  console.log(res.statusCode );
  if (!req.query.param || req.query.param !== 'value'){
    //if(res.statusCode === 400) {

    throw new ValidationError();

  }

  throw new Error();

});

app.use((err:any, _req:any, res:any, next:any) => {
  //if ()
  if (err instanceof ValidationError) {
    res.status(err.status).send(err.text);
    fs.appendFileSync('./log/error.log', `\nVadidation error: ${err.status} ${err.text}`);
    console.log(`\nVadidation error: ${err.status} ${err.text}` );
    return;
  }
  next(err);
});

app.use((_err:any, _req:any, res:any, _next:any) => {
  fs.appendFileSync('./log/error.log', `\n ${getStatusText(INTERNAL_SERVER_ERROR)} ${INTERNAL_SERVER_ERROR}` );
  console.log(`\nError: ${INTERNAL_SERVER_ERROR} ${getStatusText(INTERNAL_SERVER_ERROR)}` );
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});
// setTimeout(() => {
//   throw new Error('Oops!');
// }, 1500);

process.on('uncaughtException', (err:any, _origin:any) => {
  console.error(`Exception error: ${err.message}`);
  fs.appendFileSync('./log/error.log', `\nException error: ${err.message}`);
  process.exit(1);
});

// setTimeout(() => {
//   Promise.reject(new Error('Oops!'))
// }, 1500);

process.on('unhandledRejection', (reason:any, _promise) => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  fs.appendFileSync('./log/error.log', `\nUnhandled rejection detected: ${reason.message}`);
  process.exit(1);
});


export {app};
