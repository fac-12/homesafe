const express = require("express");
const router = express.Router();
const register_parent = require("./register_parent");
const login_parent = require('./parent_profile');
const add_child = require('./add_child')
const schedule_pickup = require('./schedule_pickup')
const parent_children_and_da = require('../queries/parent_children_and_da');
const {
  unique_names
} = require('../validators')
router.get('/', (req, res) => {
  res.render("home");
})

router.get('/school_login_page', (req, res) => {
  res.render('school_login')
})
router.get('/parent_login_page', (req, res) => {
  res.render('parent_login')
})

router.get('/user_select', (req, res) => {
  res.render('user_select.hbs')
})
router.get('/user_select_register', (req, res) => {
  res.render('user_select_register')
})
router.get('/parent_registration_form', (req, res) => {
  res.render('parent_registration_form')
})
router.get('/parent_profile', (req, res) => {
  res.render('parent_profile')
})

router.post('/login_parent', login_parent.post);
router.post('/register_parent', register_parent.post)

router.get('/add_child', (req, res) => {
  res.render('add_child')
})
router.get('/schedule_pickup', (req, res) => {
  parent_children_and_da(req.session.parent_id).then((queryRes) => {
    const query_result = JSON.stringify(queryRes);
    const parse_query_result = JSON.parse(query_result);
    res.render('schedule_new_pickup', {
      children: unique_names(parse_query_result, 'child_name'),
      da: unique_names(parse_query_result, 'da_name')
    })
  })

})
router.post('/schedule_pickup', schedule_pickup.post)
router.post('/add__child', add_child.post)

module.exports = router;
