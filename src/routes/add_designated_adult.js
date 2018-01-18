const add_designated_adult = require('../queries/add_designated_adult');



exports.post = (req, res) => {

  if (req.session.loggedin === true) {
    const adult_details = req.body;
    console.log(req.session);
    adult_details.parent_id = req.session.parent_id;
    add_designated_adult(adult_details).then(() => {

        req.flash('success', 'Designated Adult added');
        res.redirect('/parent_profile');

      })
      .catch((err) => {
        req.flash("error_msg", err.message);
        res.redirect('/add_da_page');
      })

  } else {
    res.status(403).render('error', {
      layout: 'error',
      statusCode: 403,
      errorMessage: 'Forbidden path',
    });
  }
}
