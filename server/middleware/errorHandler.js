import { logEvents } from "./logger.js";

const errLog = {
  log: "errLog.txt",
};

const errorHandler = (err, req, res, next) => {
  const origin = req.headers.origin;

  logEvents(
    `${err.name}:${err.message}\t${err.method}\t${err.url}\t${origin}`,
    errLog.log
  );
  console.log(`${err.stack}`);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status);

  res.json({ message: err.message, isError: true });
};

export default errorHandler;
