#!/usr/bin/env babel-node

var fs = require('fs');
var elasticSearch  = require('elasticsearch');

var config = require('../src/utils/config');
var logger = require('../src/utils/logger');

var client = elasticSearch.Client({
  host: config.elasticSearch.host
});
