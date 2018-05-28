const mongoose = require('mongoose');
var period = new mongoose.Schema({
    startTime: {type:String},
    endTime: {type:String},
    date: {type:String}
});
mongoose.model('Period', period);