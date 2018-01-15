const {formatDate} = require('../validators')
const add_child = require('../queries/add_child')


exports.post = (req, res) => {
if (req.session.loggedin === true) {
  const child_details = req.body;
  child_details.school_id = 2;
  child_details.parent_id = req.session.parent_id;
  add_child(child_details).then(()=>{
    req.flash('success', 'Your child has been added.')
    res.redirect('/parent_profile')
  }).catch((err)=>{
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
