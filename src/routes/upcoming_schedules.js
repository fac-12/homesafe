const search_pickups_parent = require('../queries/search_pickups_parent');

exports.get = (req, res) => {
  if (req.session.loggedin) {
    search_pickups_parent(req.session.parent_id).then((queryRes) => {
      const query_result = JSON.parse(JSON.stringify(queryRes));
      const name = req.session.name;
      res.render('upcoming_schedules', {
        query_result,
        name
      });
    });
  } else {
    res.status(403).render('error', {
      layout: 'error',
      statusCode: 403,
      errorMessage: 'Forbidden path',
    });
  }
};
