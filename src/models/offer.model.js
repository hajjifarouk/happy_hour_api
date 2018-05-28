const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const offerSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    type: {
        type: String,
        enum:['happy_hour', 'petit_dejeune', 'dejeune'],
        required : true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    period:  {
        from: {
            startTime: {type:String},
            endTime: {type:String},
            date: {type:String}
        },
        to: {
            startTime: {type:String},
            endTime: {type:String},
            date: {type:String}
        },
    },
    options : [{
        offer: {type:String},
        tarif: {type:Number}
    }]
});

// Create a model
const Offer = mongoose.model('offer', offerSchema);

// Export the model
module.exports = Offer;