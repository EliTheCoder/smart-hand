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

// declaring varibles
let rooms = [];

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

  // logging socket's ip address
  eliapi.logMessage(0, "socket client connected with ip:" + socket.request.connection.remoteAddress.split(":").slice(3)[0]);

  // sending all sockets to default room
  socket.join("default");

  // letting sockets pick their rooms
  socket.on("connectroom", data => {
    socket.join(data);
  });
});
