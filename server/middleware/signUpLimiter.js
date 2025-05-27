const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const signUpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many accounts created from this IP, pleease try again after a 60 sec pause.",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t ${req.method}\t ${req.url}\t ${req.headers.origins}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = signUpLimiter;
