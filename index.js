const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {path:"/test"});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
        console.log(msg)
    });
  });
  
  server.listen(5000, () => {
    console.log('listening on *:5000');
  }); 