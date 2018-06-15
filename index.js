var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

var location1 = [2,2];
var location2 = [2,14];
var location3 = [12,2];
var location4 = [12,14];
var playerCount = 0;

var arrayLocationY;
var arrayLocationX;

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('newPlayer', function( playerId ){
    
    console.log("a user connected : " + playerId);
    playerCount++;
    if(playerCount == 1){
      arrayLocationY = location1[0];
      arrayLocationX = location1[1];
    }
    if(playerCount == 2){
      arrayLocationY = location2[0];
      arrayLocationX = location2[1];
    }
    if(playerCount == 3){
      arrayLocationY = location3[0];
      arrayLocationX = location3[1];
    }
    if(playerCount == 4){
      arrayLocationY = location4[0];
      arrayLocationX = location4[1];
    }
    if(playerCount > 4){
      arrayLocationY = 13;
      arrayLocationX = playerCount;
    }

    io.emit('newPlayer', arrayLocationY, arrayLocationX , playerId);
  });

    socket.on('deadPlayer', function(arrayLocationY, arrayLocationX, theID){
      var teleportDeadLocationY = 1;
      var teleportDeadLocationX = playerCount + 2;
      io.emit('deadPlayer', arrayLocationY, arrayLocationX, teleportDeadLocationY, teleportDeadLocationX, theID );

    }); 
  

  socket.on('sendNoramlBomb', function(xPosition, yPosition, power){
    
    socket.broadcast.emit('sendNoramlBomb', xPosition, yPosition, power);
  });
  socket.on('sendRedBomb', function(xPosition, yPosition, power){
    
    socket.broadcast.emit('sendRedBomb', xPosition, yPosition, power);
  });
  socket.on('sendBlueBomb', function(xPosition, yPosition, power){
    
    socket.broadcast.emit('sendBlueBomb', xPosition, yPosition, power);
  });
  socket.on('sendGreyBomb', function(xPosition, yPosition, power){
    
    socket.broadcast.emit('sendGreyBomb', xPosition, yPosition, power);
  });
  socket.on('sendGreenBomb', function(xPosition, yPosition, power){
    
    socket.broadcast.emit('sendGreenBomb', xPosition, yPosition, power);
  });

  socket.on('sendPlayer', function(locationY, locationX, direction){
    
    
    socket.broadcast.emit('sendPlayer',locationY, locationX, direction);
  });



  socket.on('disconnect', function(){
    playerCount--;
    console.log("user disconnected");
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
