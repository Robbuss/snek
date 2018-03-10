var synaptic = require('synaptic'); // this line is not needed in the browser

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var snakeNet = new Architect.Perceptron(5, 20, 4)
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

module.exports = {
    // normalizes the input data
    normalizeInputData: function (array) {
        // max range between -1 and 1 is 2, so speed / 2 +.5 gives ranges from 0 to 1 
        array.xspeed = (array.xspeed / 2) + 0.5;
        array.yspeed = (array.yspeed / 2) + 0.5;
        array.x = array.x / 500; // max value for x and y = 500
        array.y = array.y / 500;
        array.distance = array.distance / 710; // the max distance between snake and food = 707

        let input = [array.x, array.y, array.xspeed, array.yspeed, array.distance];

        return input
    },
    // Receives an object with input and output arrays
    trainingsSet: function(snakeData) {
        console.log(trainer);
    },

    inputData: function(normalizedData){
        //console.log(normalizedData);
    }
    //snakeData: function (snakeCoordinates) {
        // we should normalize the data 

        // then train the network

        // Outputs (4): 
        // [0, 0, 0, 0] = dont move
        // [1, 0, 0 , 0] = moveLeft
        // [0, 1, 0 , 0] = moveRight
        // [0, 0, 1 , 0] = moveUp
        // [0, 0, 0 , 1] = moveDown
        // return the response
        //console.log(snakeNet.activate(snakeCoordinates));
    //}
};
trainer.train(trainingSet);
//console.log(snakeNet.activate([1, 1]));
