const express = require('express');
const socket = require('socket.io');

const app = express();


const server = app.listen(5000, () => {
  console.log('server is running on port 5000');
});

const io = socket(server);

const chatLog = [];

io.on('connection', (socket) => {
  console.log(`Socket ID: ${socket.id} connected`);


  socket.on('LOGIN', (name) => {
    console.log(`User ${name} login`);
    socket.emit('MESSAGE_LOG', {
      log: chatLog,
      usr: name,
    });
  });

  socket.on('SEND_MESSAGE', (data) => {
    chatLog.push(data);
    io.emit('RECEIVE_MESSAGE', data);
  });
});

