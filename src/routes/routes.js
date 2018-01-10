const express = require("express");
const router = express.Router();



router.get('/', (req, res)=>{
  res.render("home");
})

router.get('/school_login', (req, res)=>{
  res.render('school_login')
})

module.exports = router;
