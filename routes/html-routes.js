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
    const userPhrases = [];
    const languages = [];

    try {
      db.language.findAll({}).then((data) => {
        data.forEach((row) => {
          const currentRow = {
            id: row.id,
            lang_code: row.lang_code,
            lang: row.lang,
          };
          languages.push(currentRow);
        });
      });
    } catch (error) {
      throw error;
    }

    try {
      db.vocab.findAll({
        where: {
          user_id: req.user.id,
        },
        include: [db.language],
        order: [['createdAt', 'DESC']],
      }).then((data) =>{
        console.log(data);
        data.forEach((row) =>{
          const current = {
            id: row.id,
            orig_phrase: row.orig_phrase,
            translation: row.translation,
          };
          userPhrases.push(current);
        });
        res.render('index', {
          phrases: userPhrases,
          languages: languages,
        });
      });
    } catch (error) {
      throw error;
    }
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

// ajax.get() words in this user's DB and return that as JSON, and save to a local array

// SORTING FUNCTION
// on select value change, clear out the wordbank
// jquery.empty()

// perform function on the local array - alphabetize / arrange

// display and print out the cards into the empty wordbank section

