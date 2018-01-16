const parent_children_and_da = require('../queries/parent_children_and_da');
const {
  unique_names
} = require('../validators');

exports.get = (req, res) => {
  if (req.session.loggedin) {
    parent_children_and_da(req.session.parent_id)
      .then((queryRes) => {
        const parse_query_result = JSON.parse(JSON.stringify(queryRes));
        res.render('schedule_new_pickup', {
          children: unique_names(parse_query_result, 'child_name'),
          da: unique_names(parse_query_result, 'da_name')
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
