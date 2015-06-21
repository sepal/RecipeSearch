var express = require('express');
var bodyParser = require('body-parser');

var middleware = require('./source/middleware');
var config = require('./src/utils/config');
var logger = require('./src/utils/logger');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

require('./source/api')(app);
app.use(middleware.errors());

app.listen(config.port, function () {
  logger.info('App listening on port ' + config.port);
});
