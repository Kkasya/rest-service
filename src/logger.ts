import expressWinston from 'express-winston';

import winston from 'winston';
import {BAD_REQUEST, getStatusText} from 'http-status-codes';

const logger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: './log/info.log', level: 'info' })],
  msg: "",
  expressFormat: true,
  colorize: true,
  ignoreRoute  () { return false; }
});


class ValidationError extends Error {
  status = BAD_REQUEST;

  text = getStatusText(this.status);
}

export {logger, ValidationError};