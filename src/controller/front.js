import React from 'react';
import _ from 'lodash';

import logger from '../utils/logger';
import searchService from '../utils/searchService';
import Recipes from '../components/Recipes';
import RecipesSearch from '../components/recipe/RecipeSearch';
import RecipeModel from '../models/Recipe';

module.exports = (req, res) => {
  RecipeModel.search(req.query.search).then((recipeArray) => {
    _.map(recipeArray, (recipe) => {
      recipe['url'] = `/recipe/${recipe.id}`;
      return recipe;
    });
    var state = {
      recipes: {
        recipes: recipeArray
      },
      recipeSearch: {
        search: req.query.search,
        target: '/'
      }
    };

    var headerElement = <RecipesSearch {...state.recipeSearch} />;
    var headerMarkup = React.renderToString(headerElement);

    var bodyElemet = <Recipes {...state.recipes} />;
    var bodyMarkup = React.renderToString(bodyElemet);

    res.render('home', {
      header_markup: headerMarkup,
      markup_body: bodyMarkup,
      state: JSON.stringify(state)
    });
  });
};
