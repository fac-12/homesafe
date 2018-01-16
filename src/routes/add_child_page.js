const all_schools = require('../queries/all_schools');

exports.get = (req, res) => {
  if (req.session.loggedin) {
    all_schools().then((queryRes) => {
      const parseQueryRes = JSON.parse(JSON.stringify(queryRes));
      res.render('add_child', {
        schools: parseQueryRes
      })
    })
  } else {
    res.status(403).render('error', {
      layout: 'error',
      statusCode: 403,
      errorMessage: 'Forbidden path',
    });
  }
}
