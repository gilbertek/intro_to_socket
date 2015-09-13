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
    var tmp = JSON.parse(data.toString())

    var existingMsg = tmp.filter(function (message) {
      return message.messageId === msg.messageId;
    })[0];

    console.log(existingMsg);


    if (existingMsg) {
      console.log(existingMsg);

      for (var attrname in existingMsg) {
        existingMsg[attrname] = msg[attrname];
      }

      console.log(existingMsg);
    } else {
      tmp.push(msg);
    }

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

  socket.on('updateMessage', function(data) {
    console.log(data);
    var messages = loadMessages();
    var msg = messages.filter(function (message) {
      return message.messageId === data.messageId;
    })[0];
    msg.likedBy = data.likedBy;
    io.sockets.emit('messages', loadMessages());
    addMessage(data);
  });
});

server.listen(8080);
