const winston = require('winston');
import expressWinston from 'express-winston';
const {BAD_REQUEST, getStatusText} = require('http-status-codes');

const logger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: './log/info.log', level: 'info' })],
  msg: "",
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (_req:any, _res:any) { return false; }
});


class ValidationError extends Error {
  status = BAD_REQUEST;
  text = getStatusText(this.status);
}

export {logger, ValidationError};