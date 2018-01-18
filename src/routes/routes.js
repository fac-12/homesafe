const express = require("express");
const router = express.Router();
const register_parent = require("./register_parent");
const {registerSchool, verifySchool} = require('./register_school')
const {checkCookie} = require('../validators');
const login_parent = require('./parent_login');
const add_designated_adult = require('./add_designated_adult');
const error = require('./error');

const add_child = require('./add_child')
const schedule_pickup = require('./schedule_pickup')
const school_login = require('./school_login');
const search_pickups_parent = require('../queries/search_pickups_parent');
const pick_date = require('./pick_date');
const add_child_page = require('./add_child_page');
const get_schedule_pickups = require('./get_schedule_pickups');
const get_children_details = require('../queries/get_children_details')


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
router.get('/view_DA', (req, res) => {
  res.render('parent_registration_form')
})


router.get('/parent_profile', (req, res) => {
    if (req.session.loggedin) {

  search_pickups_parent(req.session.parent_id).then((queryRes) => {
    const parse_query_result = JSON.parse(JSON.stringify(queryRes));
      req.flash("name", req.session.name);
    res.render('parent_profile', {
      parse_query_result
    });
  })
} else {
  res.status(403).render('error', {
    layout: 'error',
    statusCode: 403,
    errorMessage: 'Forbidden path',
  });
}
});

router.get('/view_children', (req, res)=>{
  if(req.session.loggedin){
    get_children_details(req.session.parent_id).then((queryRes)=>{
      console.log(queryRes);
      const parse_query_result = JSON.parse(JSON.stringify(queryRes));
      console.log(parse_query_result);
      res.render('my_children', {my_children: parse_query_result})
    }).catch((err)=>{
      console.log(err);
    })
  }
  else {
    res.status(403).render('error', {
      layout: 'error',
      statusCode: 403,
      errorMessage: 'Forbidden path',
    });
  }

})

router.post('/login_parent', login_parent.post);
router.post('/register_parent', register_parent.post);
router.post('/add_child', add_child.post);
router.post('/login_school', school_login.post);
router.post('/add__da', add_designated_adult.post);
router.post('/schedule_pickup', schedule_pickup.post);
router.post('/register_parent', register_parent.post)
router.post('/register_school',(req, res)=>{
  registerSchool(req, res)
})
router.post('/pick_date', pick_date.post);


router.get('/schedule_pickup', get_schedule_pickups.get);
router.get('/add_child_page', add_child_page.get);
router.get('/add_da_page', (req, res) => {
  checkCookie(req, res, 'add_da');
})
router.get('/school_registration_form', (req, res)=>{
  res.render('school_registration_form')
})
router.get('/verify',(req, res)=>{
  verifySchool(req, res)
})
router.get('/school_profile', (req, res)=>{
  res.render('school_profile')
})
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/')
})

router.use(error.client);
router.use(error.server);


module.exports = router;
