# Lrn It Language Translator
[![Build Status](https://travis-ci.com/uxhawk/project-2.svg?branch=master)](https://travis-ci.com/uxhawk/project-2)

This app is for people interested in learning new languages. Built with [MySQL](https://www.mysql.com/), [Node](https://nodejs.org/en/), [Express](https://www.npmjs.com/package/express), [Handlebars](https://www.npmjs.com/package/handlebars), [Sequelize](https://sequelize.org/), [Chart.js](https://www.chartjs.org/), [Passport](http://www.passportjs.org/), and [Bootstrap](https://getbootstrap.com/), users can create accounts and embark on their language learning journey. Project highlights:
* Utilizes [IBM Watson Language Translator](https://www.ibm.com/watson/services/language-translator/)
* Test your knowledge of words and phrases in an interactive study mode
* Review word bank metrics to see how many words you're learning

Get started using the application here:
https://fathomless-basin-48742.herokuapp.com/

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Testing](#testing)
* [Contributing](#contributing)

## Installation
Run `npm i` to install the following dependencies:
* bcryptjs
* eslint-cli
* express
* express-handlebars
* express-session
* ibm-watson
* mysql
* mysql2
* nodemon
* passport
* passport-local
* sequelize

For the database, look in the db directory for `db/schema.sql`. Use this schema to create a `vocabulary_db` database. [Sequelize](https://sequelize.org/) will create three tables in this database.

## Usage
Launch the app with either `node server.js` or `npm run watch`. The second command will launch the app with nodemon, which restarts the server after changes to a file are saved. 

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Testing
This project uses Google's [eslint configuration](https://github.com/google/eslint-config-google) and [Travis CI](https://travis-ci.org/).

## Contributing
[<img src="https://avatars.githubusercontent.com/u/16821657?" width="60px" style="border-radius:30px">](https://github.com/uxhawk)
[<img src="https://avatars.githubusercontent.com/u/60454736?" width="60px" style="border-radius:30px">](https://github.com/canil2)
[<img src="https://avatars.githubusercontent.com/u/59083594?" width="60px" style="border-radius:30px">](https://github.com/hmsalmans)
[<img src="https://avatars.githubusercontent.com/u/58053159?" width="60px" style="border-radius:30px">](https://github.com/papy1974)


