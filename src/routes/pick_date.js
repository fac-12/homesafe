const search_pickups = require('../queries/search_pickups');

exports.post = (req, res) => {
  const date = req.body;

  search_pickups(req.session.school_id, date.calendar__date)
    .then((queryRes) => {
      const query_result = JSON.parse(JSON.stringify(queryRes));
      res.render('school_profile', {
        query_result
      });
    })
    .catch((err) => {
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Server Error',

      });
    });
    
}
