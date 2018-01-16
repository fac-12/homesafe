const parent_child_da_id = require('../queries/parent_child_da_id')
const add_pickup = require('../queries/add_pickup');
const get_parent_da_email = require('../queries/get_parent_da_email')
const nodemailer = require('nodemailer');
const {
  parent_pickup_confirmation_email,
  da_pickup_confirmation_email
} = require('../emails');


exports.post = (req, res) => {
  parent_child_da_id(req.session.parent_id, req.body.child_name, req.body.da_name).then((queryRes) => {
      return queryRes;
    }).then(queryRes => {
      const schedule_info = {};
      schedule_info.parent_id = req.session.parent_id,
        schedule_info.child_id = queryRes[0].child_id,
        schedule_info.da_id = queryRes[0].da_id,
        schedule_info.pickup_date = req.body.pickup_date,
        schedule_info.keyword = req.body.keyword
      return add_pickup(schedule_info);
    }).then(queryRes => {
      return get_parent_da_email(queryRes[0].designated_adult_id, queryRes[0].parent_id);
    }).then((emails) => {
      parent_pickup_confirmation_email(emails[0].email);
      da_pickup_confirmation_email(emails[0].da_email, req.body.keyword);
    return;
    })
    .then(() => {
      req.flash('success', `Your pickup schedule has been added. Your keyword is ${req.body.keyword}`)
      res.redirect('parent_profile')
    })
    .catch((err) => {
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Server Error',
      })
    })
}
