//   _______  __   __  _______  ______    _______    __   __  _______  __    _  ______
//  |       ||  |_|  ||   _   ||    _ |  |       |  |  | |  ||   _   ||  |  | ||      |
//  |  _____||       ||  |_|  ||   | ||  |_     _|  |  |_|  ||  |_|  ||   |_| ||  _    |
//  | |_____ |       ||       ||   |_||_   |   |    |       ||       ||       || | |   |
//  |_____  ||       ||       ||    __  |  |   |    |  |-|  ||       ||  _    || |_|   |
//   _____| || ||_|| ||   _   ||   |  | |  |   |    |  | |  ||   _   || | |   ||       |
//  |_______||_|   |_||__| |__||___|  |_|  |___|    |__| |__||__| |__||_|  |__||______|
//
//  Created by: EliTheCoder
//
//  Copyright (C) 2019 Eli Frigo
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <https://www.gnu.org/licenses/>.

"use strict";

// port
const port = 8080;

// require modules
const path = require("path");
const fs = require("fs");
const eliapi = require("eliapi");
const util = require("util");
const express = require("express");
const xss = require("xss");
const Filter = require("bad-words");
const filter = new Filter();

// declaring varibles
let rooms = [];
let logs = {};

// initalizing express
const app = express();

// starting express server
app.use(express.static(path.join(__dirname, "/static")));

const server = app.listen(process.env.PORT || port, () => {
  eliapi.logMessage(0, "web server running on port: " + port);
});

// starting socket.io server
const io = require("socket.io")(server);
eliapi.logMessage(0, "socket.io server running on port: " + port);

// managing socket.io connections
io.on("connection", socket => {

  // logging socket"s ip address
  eliapi.logMessage(0, "socket client connected with ip: " + socket.request.connection.remoteAddress.split(":").slice(3)[0]);

  // sending all sockets to default room
  socket.join("default");

  // letting sockets pick their rooms
  socket.on("connectroom", data => {
    socket.join(data);
    socket.leave("default");
    eliapi.logMessage(0, "connectroom event: " + data);
  });

  // generating rooms for teacher clients
  socket.on("teacher", data => {
    let newCode = makeId();
    socket.emit("sendCode", newCode);
    eliapi.logMessage(0, "teacher event");
  });

  // broadcasting message deletions to everyone
  socket.on("remove", data => {
    eliapi.logMessage(0, "removal id: " + data);
    io.emit("remove", data);
  })

  // broadcasting message deletions to everyone
  socket.on("ban", data => {
    eliapi.logMessage(0, "ban id: " + data.id);
    io.to(`${logs[data.id].author}`).emit("ban", data.pin);
  })

  // broadcasting new question to room
  socket.on("question", data => {
    let msgId = makeMsgId();
    logs[msgId] = {
      id: msgId,
      time: new Date(),
      pin: data.pin,
      author: socket.id
    }
    if (data.question.startsWith("###")) {
      io.emit("question", {
        pin: data.pin,
        question: data.question.substring(3),
        id: msgId
      });
    } else {
      io.emit("question", {
        pin: data.pin,
        question: filter.clean(xss(data.question)),
        id: msgId
      });
    }
    eliapi.logMessage(4, "pin: " + data.pin + "question: " + data.question);
  });

});

// function for generating random codes
function makeId() {
  var text = "";
  var possible = "abcdefghijkmnopqrstuvwxyz123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function makeMsgId() {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
