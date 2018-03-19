var synaptic = require('synaptic'); // this line is not needed in the browser

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

var snakeNet = new Architect.Perceptron(5, 20, 4);
var trainer = new Trainer(snakeNet);

module.exports = {
    // normalizes the input data
    normalizeInputData: (array) => {
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
    trainNetwork: (trainingsData) => {
        trainer.train(trainingsData);
    },

    activateNetwork: (normalizedInputData) => {
        let response = snakeNet.activate(normalizedInputData);
        // make sure this is has [0, 0, 0, 0] format, 
        if(response.length != 4){
            console.log(response);
        } else {
            return response;
        }
    }
};
//console.log();
