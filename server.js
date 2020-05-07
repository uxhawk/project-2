// Server.js - the initial starting point for the Node/Express server
const express = require('express');

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

// set up handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// static directory
app.use(express.static('public'));

// routes
require('./routes/api-routes.js');
require('./routes/html-routes.js');

// sync sequelize models and then starting the express app
db.sequelize.sync({
  force: true,
}).then(function() {
  app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}.`);
  });
});
