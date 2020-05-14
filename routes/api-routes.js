// Requiring our models
const db = require('../models');
const passport = require('../config/passport');

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: 'SfvrtzaNC-VGMaIpgnE32z7ErRU6zUKLhH0MhfnEBkg8',
  }),
  url: 'https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/d4b6215b-805b-43ec-956b-f27f76eaf6f9',
});

module.exports = function(app) {
  // **************************************
  // START ALL AUTHENTICATION RELATED ROUTES
  // **************************************
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password
  // is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the
  // user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function(req, res) {
    db.user.create({
      email: req.body.email,
      password: req.body.password,
    })
        .then(function() {
          res.redirect(307, '/api/login');
        })
        .catch(function(err) {
          res.status(401).json(err);
        });
  });

  // Route for logging user out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
  // **************************************
  // END ALL AUTHENTICATION RELATED ROUTES
  // **************************************


  // **************************************
  // START ALL VOCAB/LANGUAGE RELATED CALLS
  // **************************************
  app.get('/api/vocab', (req, res) => {
    db.vocab.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [db.language],
    }).then((data) => {
      res.json(data);
    });
  });

  app.get('/api/vocab/details', (req, res) => {
    db.vocab.findAll({
      where: {
        user_id: req.user.id,
      },
      order: [['orig_phrase', 'ASC']],
    }).then((data)=> {
      res.json(data);
    });
  });

  app.get('/api/languages', (req, res) => {
    db.language.findAll({}).then((data) => {
      res.json(data);
    });
  });

  app.post('/api/vocab', (req, res)=> {
    const translateParams = {
      text: req.body.orig_phrase,
      modelId: `${req.body.lang_from}-${req.body.lang_to}`,
    };

    languageTranslator.translate(translateParams)
        .then((translationResult) => {
          db.vocab.create({
            orig_phrase: req.body.orig_phrase,
            translation: translationResult.result.translations[0].translation,
            word_count: translationResult.result.word_count,
            character_count: translationResult.result.character_count,
            from_id: req.body.from_id,
            target_id: req.body.target_id,
            user_id: req.user.id,
          }).then((data)=> {
            res.json(data);
          });
          // console.log(JSON.stringify(translationResult, null, 2));
        })
        .catch((err) => {
          console.log('error:', err);
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

  app.delete('/api/vocab/:id', function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.vocab.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(data) {
      res.json(data);
    });
  });
};
