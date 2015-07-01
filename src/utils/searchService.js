import elasticsearch from 'elasticsearch'

import config from './config';
import logger from './logger';

var client = new elasticsearch.Client({
  host: config.elasticSearch.host,
  log: config.elasticSearch.log
});

module.exports = client;
