#!/usr/bin/env babel-node

import express from 'express';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';

import middleware from './src/middleware';
import config from './src/utils/config';
import logger from './src/utils/logger';

var app = express();
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

require('./src/api')(app);
app.use(middleware.errors());

app.listen(config.port, function () {
  logger.info('App listening on port ' + config.port);
});

app.get('/', function (req, res) {
  res.render('home');
});

