import React from 'react';
import _ from 'lodash';

import logger from '../utils/logger'
import searchService from '../utils/searchService'
import Recipes from '../components/Recipes'


module.exports = (req, res) => {
  var query = {
    match_all: {}
  };

  if (req.query.search) {
    query = {
      query_string: {
        query: req.query.search
      }
    };
  }

  searchService.client.search({
    index: 'recipes',
    type: 'recipe',
    body: {
      fields: ["id", "name", "source", "url", "datePublished"],
      query: {
        filtered: {
          query: query
        }
      }
    }
  }).then((result) => {
    return Promise.all(result.hits.hits.map((hit) => {
      let id = hit.fields.id.pop();
      let obj = {
        id: id,
        name: hit.fields.name.pop(),
        source: hit.fields.source.pop(),
        source_url: hit.fields.url.pop(),
        url: `/recipe/${id}`
      };

      if (hit.fields.datePublished) {
        obj['datePublished'] = hit.fields.datePublished.pop();
      }

      return obj;
    }));
  }).then((recipeArray) => {
    var state = {
      recipes: recipeArray,
      query: {
        search: req.query.search,
        target: '/'
      }
    };

    var element = React.createElement(Recipes, state);
    var markup = React.renderToString(element);

    res.render('home', {
      markup: markup,
      state: JSON.stringify(state)
    });
  });
};
