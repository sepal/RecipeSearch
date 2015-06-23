import searchController from './searchController'

module.exports = function (app) {
  app.get('/', searchController);
};
