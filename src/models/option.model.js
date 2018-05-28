const mongoose = require('mongoose');
var option = new mongoose.Schema({
    offer: {type:String},
    tarif: {type:Number}
});
// Create a model
const Option = mongoose.model('Option', option);

// Export the model
module.exports = Option;