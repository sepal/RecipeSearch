import logger from '../utils/logger'

import searchService from '../utils/searchService';

exports.search = (req, res) => {
  searchService.client.search({
    index: 'recipes',
    type: 'recipe',
    body: {
      query: {
        filtered: {
          query: {
            "query_string": {
              "query": req.query.search
            }
          }
        }
      }
    }
  }).then((resp) => {
    res.send(resp.hits.hits);
  }).catch((err) => {
    logger.error("Error while trying quering to elastic search: ", err);
    res.status('500').send('Server error');
  });
};
