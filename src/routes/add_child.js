const {
  formatDate
} = require('../validators')
const add_child = require('../queries/add_child')
const get_school_id = require('../queries/get_school_id')

exports.post = (req, res) => {
  if (req.session.loggedin === true) {
    return get_school_id(req.body.school_name).then((queryRes) => {
      const child_details = {};
      child_details.parent_id = req.session.parent_id;
      child_details.school_id = queryRes[0].id;
      child_details.first_name = req.body.first_name;
      child_details.last_name = req.body.last_name;
      child_details.year = req.body.year;
      child_details.dob = req.body.dob;
      return add_child(child_details)
    }).then(() => {
      req.flash('success', 'Your child has been added.')
      res.redirect('/parent_profile')
    }).catch((err) => {
      req.flash("error_msg", err.message);
      res.redirect('/parent_profile');
    })
  } else {
    res.status(403).render('error', {
      layout: 'error',
      statusCode: 403,
      errorMessage: 'Forbidden path',
    });
  }
}
