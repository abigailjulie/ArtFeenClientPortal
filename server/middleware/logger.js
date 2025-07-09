import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

export { logEvents, logger };
