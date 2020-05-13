// Requiring path to so we can use relative routes to our HTML files
const path = require('path');
const db = require('../models');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {
  app.get('/', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
      // res.render('index');
    }
    res.sendFile(path.join(__dirname, '../public/assets/login.html'));
  });

  app.get('/signup', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
      return;
      // res.render('index');
    }
    res.sendFile(path.join(__dirname, '../public/assets/signup.html'));
  });

  app.get('/login', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/members');
      return;
      // res.render('index');
    }
    res.sendFile(path.join(__dirname, '../public/assets/login.html'));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they
  // will be redirected to the signup page
  app.get('/members', isAuthenticated, function(req, res) {
    // get the user id for the authenticated user
    const userPhrases = [];
    db.vocab.findAll({
      where: {
        user_id: req.user.id,
      }}).then((data) =>{
      data.forEach((row) =>{
        const current = {
          id: row.id,
          orig_phrase: row.orig_phrase,
          translation: row.translation,
        };
        userPhrases.push(current);
      });
      console.log(userPhrases);
      res.render('index', {phrases: userPhrases});
    });
  });

  app.get('/metrics', isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, '../public/assets/members.html'));
    res.render('metrics');
  });
  app.get('/study', isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, '../public/assets/members.html'));
    res.render('study');
  });
};
