//CONNECTING TO OUR DATABASE
require('dotenv').config();
const mysql = require("mysql");

const DB_PASSWORD = process.env.DB_PASSWORD;

var connection = mysql.createConnection({
  host: 'weatherbeatsdb.cxqjdq6uqtfw.us-east-2.rds.amazonaws.com',
  user: "admin",
  password: DB_PASSWORD,
  port: "3306",
  database: "weatherbeats",
});

connection.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
  connection.query("SHOW TABLES", (err, results) => {
    if (err) {
      console.log("error");
      console.error("Error executing query: " + err.stack);
      return;
    }
    console.log("Tables in database:");
    results.forEach((result) => {
      console.log(result.Tables_in_weatherbeats);
    });
  });
});

module.exports = connection;
