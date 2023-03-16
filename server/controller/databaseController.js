const path = require('path');
const dotenv = require('dotenv');

const databaseController = {};
dotenv.config();

databaseController.getUserData = async (req, res, next) => {
  let responseObj = {};

  db.connection.connect((err) => {
    if (err) {
      next({
        status: 500,
        message: 'Error connecting to DB',
        log: err,
      });
    }
    db.connection.query(`SELECT *  FROM user_table WHERE email_address = ${req.session.user.email}`, (err, res, userDetails) => {
      if (err) {
        next({
          status: 500,
          message: 'Error with DB query',
          log: err,
        });
      }
      responseObj = {
        user_id: userDetails[0].user_id,
        email_address: userDetails[0].email_address,
        first_name: userDetails[0].first_name,
        last_name: userDetails[0].last_name,
      };
    });
  });

  req.session.user.userDetails = responseObj;

  return next();
};

databaseController.inputUserData = async (req, res, next) => {
  

  return next();
};

module.exports = databaseController;
