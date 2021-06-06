const winston = require('winston');
import expressWinston from 'express-winston';

const logger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: './log/info.log', level: 'info' })],
  msg: "",
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (_req:any, _res:any) { return false; }
});

const handleError = (err: any, res: any) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};
export {logger, handleError};