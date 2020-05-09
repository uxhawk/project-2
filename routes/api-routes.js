// Requiring our models
const db = require('../models');
// var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.get('/api/vocab', (req, res) => {
    db.vocab.findAll({}).then((data) => {
      res.json(data);
    });
  });

  app.get('/api/languages', (req, res) => {
    db.language.findAll({}).then((data) => {
      res.json(data);
    });
  });

  app.put('api/vocab/:id', (req, res) => {
    db.vocab.update({
      eng_phrase: req.body.newPhrase,
      translation: req.body.newTranslation,
    }, {
      where: {
        id: req.body.id,
      },
    },
    );
  });
};
