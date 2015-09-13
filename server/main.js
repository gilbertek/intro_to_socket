var express = require('express'),
    app     = express(),
    server  = require('http').Server(app),
    io      = require('socket.io')(server),
    fs      = require('fs');

app.use(express.static('app'));

function loadMessages() {
  var file = fs.readFileSync('./server/data/messages.json');
  return JSON.parse(file.toString());
}

function addMessage(msg) {
  var msgFile = './server/data/messages.json';

  fs.readFile(msgFile, function (err, data) {
    if (err) throw err;
    tmp = JSON.parse(data.toString())
    tmp.push(msg);

    fs.writeFile(msgFile, JSON.stringify(tmp, null, 4), function(err){
        if (err) throw err;
        console.log('File successfully written!');
    });
  });
}

io.on('connection', function(socket) {
  console.log('Something connected to socket.io');
  socket.emit('messages', loadMessages());

  socket.on('newMessage', function(data) {
    console.log(data);
    addMessage(data);
    io.sockets.emit('messages', loadMessages());
  });
});

server.listen(8080);
