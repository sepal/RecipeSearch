#!/usr/bin/env babel-node

import fs from 'fs';
import elasticSearch  from 'elasticsearch';
import nconf from 'nconf';

import config from '../src/utils/config';
import logger from '../src/utils/logger';

function readFile(filename, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, options, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};


function readLineSeperatedJSON(filename) {
  return new Promise((resolve, reject) => {
    readFile(filename, {encoding: 'utf-8'}).then((data) => {
      var jsonObjects = data.split('\n').slice(0, 20000).reduce((prev, current) => {
        if (current != '') {
          var obj, recipe;
          try {
            obj = JSON.parse(current);
          } catch (e) {
            reject(e);
            return prev;
          }

          recipe = {
            id: obj._id.$oid, // Was originally a mongodb entry
            name: obj.name,
            source: obj.source,
            url: obj.url,
            recipeYield: obj.recipeYield,
            ingredients: obj.ingredients.split('\n'),
            prepTime: obj.prepTime,
            cookTime: obj.cookTime,
            datePublished: obj.datePublished,
            description: obj.description
          };

          prev.push({index: {_index: 'recipes', _type: 'recipe', _id: recipe.id}});
          prev.push(recipe);
          return prev;
        }
      }, []);
      resolve(jsonObjects);
    });
  });
}

nconf.argv({
  "file": {
    alias: 'f',
    describe: 'The json file which should imported.',
    demand: true
  }
});

var client = elasticSearch.Client({
  host: config.elasticSearch.host
});

var recipies = readLineSeperatedJSON(nconf.get('file')).then((data) => {
  var busy = false;

  var callback = (err, resp) => {
    if (err) logger.error('Error while trying to send bulk operation', err);
    busy = false;
  };

  var tryInsert = function() {
    if (!busy) {
      busy = true;
      client.bulk({
        body: data.slice(0, 1000)
      }, callback);
      data = data.slice(1000);
      console.log(data.length);
    }

    if (data.length > 0) {
      setTimeout(tryInsert, 10);
    } else {
      console.log('Inserted all records.');
    }
  };

  tryInsert();
}).catch((err) => {
  logger.error('Error trying to open json file:', err);
});
