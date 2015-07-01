import _ from 'lodash';
import mongoose from 'mongoose';
import logger from '../utils/logger'
import search from '../utils/searchService';

var ingredientSchema = mongoose.Schema({
  name: String,
  amount: Number,
  unit: String
});

var recipeSchema = mongoose.Schema({
  name: String,
  author: String,
  type: String,
  method: String,
  ingredients: [ingredientSchema]
});

recipeSchema.statics.search = function(searchString) {
  var query = {
    match_all: {}
  };

  if (searchString) {
    query = {
      query_string: {
        query: searchString
      }
    };
  }

  return search.search({
    index: 'recipe_search',
    type: 'recipe',
    body: {
      fields: ["id", "name", "author", "type"],
      query: {
        filtered: {
          query: query
        }
      },
      size: 40
    }
  }).then((result) => {
    return Promise.all(result.hits.hits.map((hit) => {
      let obj = {
        id: hit.fields.id.pop(),
        name: hit.fields.name.pop(),
        author: hit.fields.author.pop(),
        type: hit.fields.type.pop()
      };

      return obj;
    }));
  });
};

recipeSchema.post('save', (doc) => {
  let ingredients = _.map(doc.ingredients, (ingredient) => {
    return ingredient.name
  });

  search.index({
    index: 'recipe_search',
    type: 'recipe',
    id: doc.id,
    body: {
      id: doc.id,
      name: doc.name,
      author: doc.author,
      type: doc.type,
      method: doc.method,
      ingredients: ingredients
    }
  }).then(() => {
    logger.info(`Finished adding and indexing recipe ${doc.name}`);
  }).catch((err) => {
    logger.warn('Error while trying to index recipe: ', err);
  });
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
