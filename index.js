const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('joined', function(username){
    io.emit('joined', username )
  })

  socket.on('connect', function(){
    console.log('user connected');
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
