let express = require('express');
let app = express();
let server = app.listen(3000);
let socket = require('socket.io');
let io = socket(server);
let nn = require(__dirname + '/public/js/nn.js');
let fs = require('fs');

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Player connected.');
    socket.on('disconnect', () => console.log('Player disconnected.'));

    let array = [];
    socket.on('generateTrainingsData', (snakeData) => {
        snakeData.input = nn.normalizeInputData(snakeData.input); // normalize the data

        array.push(JSON.stringify(snakeData));
        fs.writeFile('trainingsdata.json', '[' + array + ']', 'utf8', (err) => {
            if (err) {
                console.log(err);
            }
        });
    });

    // read the trainings data, probably make this a separate get request, to train the network 
    socket.on('trainNetwork', () => {
        fs.readFile('trainingsdata.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                nn.trainNetwork(data);
            }
        });
    });

    // activate the network and generate an ouput array
    socket.on('activateNetwork', (snakeData) => {
        let response = nn.activateNetwork(snakeData.input);
        // send the response back to the client
        socket.emit('networkResponse', response);
    });
});


