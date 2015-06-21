var winston = require("winston");
var config = require("./config");

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: config.log.level
    }),
    new (winston.transports.File)({
      filename: config.log.file,
      level: config.log.level
    })
  ]
});

module.exports = logger;
