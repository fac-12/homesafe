const express = require("express");
const router = express.Router();
const register_parent = require("./register_parent");
const {registerSchool, verifySchool} = require('./register_school')

router.get('/', (req, res)=>{
  res.render("home");
})

router.get('/school_login_page', (req, res)=>{
  res.render('school_login')
})
router.get('/user_select', (req, res)=>{
  res.render('user_select.hbs')
})
router.get('/user_select_register', (req, res)=>{
  res.render('user_select_register')
})
router.get('/parent_registration_form', (req, res)=>{
  res.render('parent_registration_form')
})
router.get('/parent_profile', (req, res)=>{
  res.render('parent_profile')
})
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

module.exports = router;
