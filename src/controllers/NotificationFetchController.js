const express = require("express");
const axios = require("axios");
const { createConnection } = require("mysql");
const connection = require("../../db/db");
const { isExists } = require("date-fns");
// const config = require("../../config/config");

const fetchAll = (req, res) => {
  // const hostname = os.hostname();
  // console.log(config);
  const sql = "select * from follow_ups where user_id = ?";
  connection.query(sql, [req.body.user_id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json({
        message: "Success",
        status: 201,
        data: result,
      });
    }
  });
};
module.exports = { fetchAll };
