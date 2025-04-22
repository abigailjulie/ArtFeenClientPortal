const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logfileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logsDir = path.join(__dirname, "../../logs");
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }

    await fsPromises.appendFile(path.join(logsDir, logfileName), logItem);
  } catch (error) {
    console.log(error);
  }
};

const reqLog = {
  log: "reqLog.txt",
};

const allowedOriginsToIgnore = ["http://localhost:5000"];

const logger = (req, res, next) => {
  const origin = req.headers.origin;

  if (!allowedOriginsToIgnore.includes(origin)) {
    logEvents(`${req.method}\t${req.url}\t${origin}`, reqLog.log);
    console.log(`${req.method} ${req.path}`);
  }

  next();
};

module.exports = { logEvents, logger };
