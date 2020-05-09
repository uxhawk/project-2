// Server.js - the initial starting point for the Node/Express server
const express = require('express');
const session = require('express-session');

const passport = require('./config/passport');

// set up the express app
const app = express();
const PORT = process.env.PORT || 8080;

// requiring models for syncing
const db = require('./models');

// set up the express app to handle data parsing
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(session({secret: 'keyboard cat',
  resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// set up handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// static directory
app.use(express.static('public'));

// routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

// sync sequelize models and then starting the express app
db.sequelize.sync({
  // force: false,
}).then(function() {
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}.`);
  });
});
