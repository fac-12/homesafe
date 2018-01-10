const express = require("express");
const router = express.Router();



router.get('/', (req, res)=>{
  res.render("home");
})

router.get('/school_login_page', (req, res)=>{
  res.render('school_login')
})
router.get('/user_select', (req, res)=>{
  res.render('user_select.hbs')
})

module.exports = router;
