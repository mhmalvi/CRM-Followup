const express = require("express");
const axios = require("axios");
const { createConnection } = require("mysql");
const connection = require("../../db/db");

const notificationView = (req, res) => {
  // console.log(req.body);
  if (req.body.id.length > 0) {
    const id = req.body.id;
    // console.log(id);
    id.forEach((element) => {
      const sql = "update follow_ups set status=? where id=?";
      connection.query(sql, [0, element]);
    });
    // if (result.affectedRows > 0) {
    res.status(201).json({
      message: "Viewed",
      status: 201,
    });
  } else {
    res.status(404).json({
      message: "Id not given",
      status: 404,
    });
  }
};
module.exports = { notificationView };
