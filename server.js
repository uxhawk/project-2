// Server.js - the initial starting point for the
// Node/Express server
const express = require('express');
const session = require('express-session');
// Requiring passport as we've configured it
const passport = require('./config/passport');

// setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require('./models');

// Creating express app and configuring middleware//
// needed for authentication
const app = express();
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(express.static('public'));
// We need to use sessions to keep track of our
// user's login status
app.use(session({secret: 'keyboard cat',
  resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

// set up handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// sync sequelize models and then starting the express app
db.sequelize.sync({
  force: false,
}).then(function() {
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}.`);
  });
});
