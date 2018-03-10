var express = require('express');
var app = express();
var server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);
var nn = require(__dirname + '/public/js/nn.js');

app.use(express.static('public'));

io.on('connection', function(socket){
    console.log('Player connected.');
    socket.on('disconnect', function(){
        console.log('Player disconnected.');
    });

    socket.on('sendSnakeData', function (snakeData) {
        snakeData.input = nn.normalizeInputData(snakeData.input); // normalize the data
        //console.log(snakeData);

        let decision = nn.inputData(snakeData); // send the normalized data to the NN
        //io.emit('receiveSnakeData', decision); // send the data back to the sketch to make the snake move

    });

});


