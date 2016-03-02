const http = require('http');
const express = require('express');

const app = express();

var votes = {};

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port, function () {
              console.log('Listening on port ' + port);
            });

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount); // sends to all clients

  socket.emit('statusMessage', 'You have connected.'); // sends to a single client

  socket.on('disconnect', function () {
    console.log('A user has disconnected', io.engine.clientsCount);
    delete votes[socket.id];
    console.log(votes);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      console.log(votes);
    }
  });
});

module.exports = server;
