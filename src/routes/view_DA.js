const get_DA_details = require('../queries/get_DA_details');

exports.get = (req, res) => {
  if (req.session.loggedin) {
    get_DA_details(req.session.parent_id)
      .then((queryRes) => {
        console.log(queryRes,'I am in view_DA');
        const parse_query_result = JSON.parse(JSON.stringify(queryRes));
        const name = req.session.name;
        res.render('view_DA', {
          parse_query_result,
          name
        })
      })
      .catch((err) => {
        res.status(500).render('error', {
          layout: 'error',
          statusCode: 500,
          errorMessage: 'Server Error',
        })
      });
  } else {
    res.status(403).render('error', {
      layout: 'error',
      statusCode: 403,
      errorMessage: 'Forbidden path',
    });
  }

}
