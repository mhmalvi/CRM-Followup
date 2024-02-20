var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crm_user",
});

conn.connect((err) => {
  if (!err) {
    console.log("connected");
  } else console.log(err);
});

module.exports = conn;
