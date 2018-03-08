var synaptic = require('synaptic'); // this line is not needed in the browser

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var snakeNet = new Architect.Perceptron(3, 7, 1)
var trainer = new Trainer(snakeNet)

var trainingSet = [
    {
        input: [0, 0],
        output: [0]
    },
    {
        input: [0, 1],
        output: [1]
    },
    {
        input: [1, 0],
        output: [1]
    },
    {
        input: [1, 1],
        output: [0]
    },
]

return module.exports = {
    //snakeData: function (snakeCoordinates) {
        // we should normalize the data 

        // then train the network

        // let the network decide if the snake should move, and in what direction
        // we want to receive the snake.x, snake.y, snake.dir
        // so the outsput are moveLeft[1,0] moveright[0,1], dontmove[0,0]
        
        // return the response
        //console.log(snakeNet.activate(snakeCoordinates));
    //}
};
trainer.train(trainingSet);
//console.log(snakeNet.activate([1, 1]));
