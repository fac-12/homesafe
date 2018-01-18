const search_pickups = require('../queries/search_pickups');
const {today_date} = require('../validators');

exports.post = (req, res) => {
  let date = req.body.calendar__date;
  if (date === '') {
    date = today_date();
  }
  search_pickups(req.session.school_id, date)
    .then((queryRes) => {
      const query_result = JSON.parse(JSON.stringify(queryRes));
      const name = req.session.name;
      res.render('school_profile', {
        query_result,
        name
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
