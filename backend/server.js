const express = require('express');
const socket = require('socket.io');

const app = express();


const server = app.listen(5000, () => {
  console.log('server is running on port 5000');
});

const io = socket(server);

const chat_log = [];

io.on('connection', (socket) => {
  console.log(socket.id);


  socket.on('LOGIN', () => {
    console.log('user login');
    io.emit('RECEIVE_MESSAGE_LOG', chat_log);
    console.log('sending chatlog');
    console.log(chat_log);
  });

  socket.on('SEND_MESSAGE', (data) => {
    chat_log.push(data);
    io.emit('RECEIVE_MESSAGE', data);
  });
});

