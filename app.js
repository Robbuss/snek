var express = require('express');
var app = express();
var server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);
var nn = require(__dirname + '/public/js/nn.js');
var normalizer = require(__dirname + '/public/js/normalizer.js');

app.use(express.static('public'));

io.on('connection', function(socket){
    console.log('Player connected.');
    socket.on('disconnect', function(){
        console.log('Player disconnected.');
    });

    socket.on('snakeMove', function (snakeData) {
        if(snakeData){
            normalizer.Normalizer([snakeData.x, snakeData.y]);
            normalizer.setOutputProperties(['moved']);
            normalizer.normalize();
            // find useful information about your data
            // to pass to your neural network
            const nbrInputs = normalizer.getInputLength();
            const nbrOutputs = normalizer.getOutputLength();

            const metadata = normalizer.getDatasetMetaData();
            const inputs = normalizer.getBinaryInputDataset();
            const outputs = normalizer.getBinaryOutputDataset();

            console.log(metadata);
            console.log(inputs);
            console.log(outputs);
        }

    });

});


