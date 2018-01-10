const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes.js');

const app = express();

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

app.set('port', process.env.PORT || 3000);
app.use("/public", express.static(path.join(__dirname, '..', 'public')));
app.use("/build", express.static(path.join(__dirname, '..', 'build')));
app.use(routes);
module.exports = app;
