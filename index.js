var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  io.emit('status', "A player has joined.");
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  })
  socket.on('disconnect', function(){
    io.emit('status', "A player has left.");
  });
  socket.on('guess', function(msg){
    socket.broadcast.emit('guess', msg);
  })
  socket.on('myside', function(msg){
    socket.emit('myside', msg);
  })
  socket.on('board', function(msg){
    socket.broadcast.emit('board',msg);
  })
  socket.on('status', function(msg){
    io.emit('status', msg);
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
