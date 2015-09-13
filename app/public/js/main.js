var socket = io.connect('http://localhost:8080', {'forceNew': true});

socket.on('messages', function (data) {
  var html = data.map(function(elem) {
    return (`
      <div class='name'>
        ${elem.userName}
      </div>
      <a href=${elem.content.link} class='message' target=blank>
        ${elem.content.text}
      </a>
    `);
  }).join(' ');

  document.getElementById('messages').innerHTML = html;
});

function addMessage (e) {
  var payload = {
    userName: document.getElementById('username').value,
    content: {
      text: document.getElementById('userMessage').value,
      link: document.getElementById('linkAddress').value
    },
    ts: Date.now()
  };

  console.log(payload);
  socket.emit('newMessage', payload);
  return false;
}
