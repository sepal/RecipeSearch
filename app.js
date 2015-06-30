#!/usr/bin/env babel-node

import express from 'express';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';

import config from './src/utils/config';
import logger from './src/utils/logger';
import middleware from './src/middleware';
import database from './src/utils/database';

/*
import searchService from './src/utils/searchService';

var app = express();
app.engine('.hbs', handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

require('./src/controller')(app);
app.use(middleware.errors());

app.listen(config.port, function () {
  logger.info('App listening on port ' + config.port);
});*/
