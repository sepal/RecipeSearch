import front from './front'
import searchController from './searchController'
import recipeController from './recipeController'

module.exports = function(app) {
  app.get('/', front);
  app.get('/search', searchController.search);
  app.get('/recipe/:id', recipeController.read);
};
