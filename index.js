const express = require("express");
const http = require("http");
const { createConnection } = require("mysql");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
// var mysql = require("mysql");
const connection = require("./db/db");
const cron = require("node-cron");
const axios = require("axios");
const path = require("path");
const router = require("./src/router/router");
const cors = require("cors");
const { exit } = require("process");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = http.createServer(app);
// const host = "192.168.0.121";
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

//////////////////////////// socket.io notification start//////////////////////////
const io = socketIo(server, {
  cors: {
    origin: " * ",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  },
});

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
server.listen(3000, () => {
  console.log("listening");
});

var extractedData = new Array();
// console.log("ghgtfhtgfh");
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    // console.log("msg", msg.user_id);

    var time = new Array();
    var id = msg.user_id;
    const socket_notifier = async (req, res) => {
      // exit()
      const sql = "select * from follow_ups where user_id=? order by id desc";
      connection.query(sql, [id], (err, results) => {
        // console.log(JSON.stringify(results));
        for (let i = 0; i < results.length; i++) {
          var date = new Date(results[i].notification_time);
          var today = new Date();
          // var today_date =
          //   today.getFullYear() +
          //   "-" +
          //   (today.getMonth() + 1) +
          //   "-" +
          //   today.getDate();
          // var date_from_db =
          //   date.getFullYear() +
          //   "-" +
          //   (date.getMonth() + 1) +
          //   "-" +
          //   date.getDate();
          // var today_hour = today.getHours();
          // today_hour = String(today_hour).padStart(2, "0");

          // var db_hour = date.getHours();
          // db_hour = String(db_hour).padStart(2, "0");

          // var today_minute = today.getMinutes();
          // today_minute = String(today_minute).padStart(2, "0");

          // var db_minute = date.getMinutes();
          console.log("current date", today);
          console.log("db date", date);
          // if (today_date >= date_from_db) {
          //   console.log("fdgfgf");
          //   if (today_hour >= db_hour) {
          if (today >= date) {
            console.log("timezone");
            time.push(results[i]);
          }
          //   }
          // }
        }
        io.sockets.emit("message", time);
      });
    };

    socket_notifier();
  });

  // socket.on("messages", (msg) => {
  //   var id = msg.user_id;
  //   console.log(id);
  //   const getReminders = () => {
  //     const sql = "select * from follow_ups where user_id=?";
  //     connection.query(sql, [id], (err, results) => {
  //       if (err) {
  //         console.error("Error fetching reminders:", err);
  //         return; // Exit early if there's an error
  //       }
  //       const extractedData = results.map((rowDataPacket) => {
  //         return {
  //           id: rowDataPacket.id,
  //           title: rowDataPacket.title,
  //           start: rowDataPacket.start,
  //           end: rowDataPacket.end,
  //           description: rowDataPacket.description,
  //           user_id: rowDataPacket.user_id,
  //           priority: rowDataPacket.priority,
  //           status: rowDataPacket.status,
  //           delete_status: rowDataPacket.delete_status,
  //           notification_time: rowDataPacket.notification_time,
  //           created_at: rowDataPacket.created_at,
  //           updated_at: rowDataPacket.updated_at,
  //         };
  //       });
  //       console.log(extractedData);
  //       // Emit the "data" event with the extracted data
  //       socket.emit("messages", extractedData); // Emit to the specific client
  //       // If you want to emit to all connected clients, use io.emit instead:
  //       // io.emit("data", extractedData);
  //     });
  //   };
  //   getReminders();
  // });
}),
  // io.on("connection", (socket) => {

  // });
  app.use("/api", router);

//////////////////////////// socket.io notification end//////////////////////////
