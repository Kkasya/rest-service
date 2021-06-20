import expressWinston from 'express-winston';
import winston from 'winston';
import {BAD_REQUEST, getStatusText} from 'http-status-codes';
import fs from "fs";

const logger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: './log/info.log', level: 'info' })],
  msg: "",
  expressFormat: true,
  colorize: true,
  ignoreRoute  () { return false; }
});

const ErrorHandling = (message: string): void => {
  console.error(message);
  fs.appendFileSync('./log/error.log', `\n${message}`);
  process.exit(1);
};

class ValidationError extends Error {
  status = BAD_REQUEST;
  text = getStatusText(this.status);
}

export {logger, ValidationError, ErrorHandling};