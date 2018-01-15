const express = require("express");
const router = express.Router();
const register_parent = require("./register_parent");
const {registerSchool, verifySchool} = require('./register_school')
const login_parent = require('./parent_profile');
const add_designated_adult = require('./add_designated_adult');
const error = require('./error');

const add_child = require('./add_child')
const schedule_pickup = require('./schedule_pickup')
const parent_children_and_da = require('../queries/parent_children_and_da');
const unique_names = require('../validators');
const school_login = require('./school_login');

const checkCookie = (req, res, renderPage) => {
  if (req.session.loggedin) {
    res.render(renderPage)
  } else {
    res.status(403).render('error', {
      layout: 'error',
      statusCode: 403,
      errorMessage: 'Forbidden path',
    });
  }
}

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
   checkCookie(req, res, 'parent_profile');
});

router.post('/login_parent', login_parent.post);
router.post('/register_parent', register_parent.post);
router.post('/add_child', add_child.post);
router.post('/login_school', school_login.post);

router.get('/schedule_pickup', (req, res) => {
  if (req.session.loggedin) {
  parent_children_and_da(req.session.parent_id).then((queryRes) => {
    const query_result = JSON.stringify(queryRes);
    const parse_query_result = JSON.parse(query_result);



    res.render('schedule_new_pickup', {
      children: unique_names(parse_query_result, 'child_name'),
      da: unique_names(parse_query_result, 'da_name')
    })
  })
}else {
  res.status(403).render('error', {
    layout: 'error',
    statusCode: 403,
    errorMessage: 'Forbidden path',
  });
}

})
router.post('/schedule_pickup', schedule_pickup.post)
router.post('/add__child', add_child.post)

router.get('/add_child_page', (req, res) => {
  checkCookie(req, res, 'add_child');
})
router.get('/add_da_page', (req, res) => {
  checkCookie(req, res, 'add_da');
})

router.post('/add_da', add_designated_adult.post)

router.get('/school_registration_form', (req, res)=>{
  res.render('school_registration_form')
})
router.post('/register_parent', register_parent.post)
router.post('/register_school',(req, res)=>{
  registerSchool(req, res)
})

router.get('/verify',(req, res)=>{
  verifySchool(req, res)
})
router.get('/school_profile', (req, res)=>{
  res.render('school_profile')
})
router.use(error.client);
router.use(error.server);


module.exports = router;
