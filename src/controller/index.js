import front from './front'
import searchController from './searchController'

module.exports = function(app) {
  app.get('/', front);
  app.get('/search', searchController.search)
};
