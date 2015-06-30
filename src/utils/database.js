import mongoose from 'mongoose';

import {database} from './config';
import logger from './logger.js';

var options = {};

if (database.user && database.password) {
  options = {
    user: database.user,
    pass: database.password
  };
}

mongoose.connect(database.url, options);

db = mongoose.connection;

db.on('error', () => {
  logger.error('Error while trying to connect to the database.');
});


db.once('open', function (callback) {
  logger.info('Opened connection to mongodb');
});

module.exports = db;
