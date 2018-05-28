const mongoose = require('mongoose');
var address = new mongoose.Schema({
    lng: Number,
    lat: Number,
    street: String,
    city: String,
    state: String,
    zip_code: Number
});
// Create a model
const Address = mongoose.model('Address', address);

// Export the model
module.exports = Address;