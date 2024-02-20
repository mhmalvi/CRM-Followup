var mysql = require("mysql");
require("dotenv").config();
// const os = require("os");
// const hostname = os.hostname();
// console.log(hostname);
// var base_url = window.location.origin;
// console.log(base_url);
var conn = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "crm_user",
});

conn.connect((err) => {
  if (!err) {
    console.log("connected");
  } else console.log(err);
});

module.exports = conn;
