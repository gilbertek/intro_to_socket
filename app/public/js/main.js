// var uuid      = require('uuid');

var socket = io.connect('http://localhost:8080', {'forceNew': true});
var userId = localStorage.getItem('userId') || randomId();
var messageStorage;

localStorage.setItem('userId', userId);
console.log(userId);

socket.on('messages', function (data) {
  console.log(data);
  messageStorage = data;

  render();
});

function render() {

  var data = messageStorage;

  var html = data.map(function(elem, index) {
    return (`
      <form class="message" onsubmit="return likeMessage(messageStorage[${index}])">
        <div class='name'>
          ${elem.userName}
        </div>
        <a href=${elem.content.link} class='message' target=blank>
          ${elem.content.text}
        </a>
        <div class='time'>${elem.ts}</div>
        <input type=submit class="likes-count" value="${elem.likedBy.length} Likes">
      </form>
    `);
  }).join(' ');

  document.getElementById('messages').innerHTML = html;
}

function addMessage (e) {
  var payload = {
    messageId: randomId(),
    userName: document.getElementById('username').value,
    content: {
      text: document.getElementById('userMessage').value,
      link: document.getElementById('linkAddress').value
    },
    likedBy: [],
    ts: Date.now()
  };

  console.log(payload);
  socket.emit('newMessage', payload);
  return false;
}

function likeMessage (msg) {
  var idx = msg.likedBy.indexOf(userId);
  if (idx < 0) {
    msg.likedBy.push(userId);
  } else {
    msg.likedBy.splice(idx, 1)
  }
  socket.emit('updateMessage', msg);
  render();

  return false;
}

function randomId () {
  return Math.floor(Math.random() * 1e11);
}
