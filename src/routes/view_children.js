const get_children_details = require('../queries/get_children_details');


exports.get = (req, res)=>{
  if(req.session.loggedin){
    get_children_details(req.session.parent_id).then((queryRes)=>{
      const parse_query_result = JSON.parse(JSON.stringify(queryRes));
      res.render('my_children', {my_children: parse_query_result})
    }).catch((err)=>{
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Server Error',
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
