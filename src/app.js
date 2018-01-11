const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'main'
  })
);

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000000}
}))

app.use((req, res, next)=>{
  res.locals.success = req.flash('success');
  res.locals.error_msg = req.flash('error_msg');
  next();
})


app.set('port', process.env.PORT || 3000);
app.use("/public", express.static(path.join(__dirname, '..', 'public')));
app.use("/build", express.static(path.join(__dirname, '..', 'build')));
app.use(routes);
module.exports = app;
