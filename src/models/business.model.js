const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const businessSchema = new Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    category: {
        type: String,
        enum: ['bowling', 'patisserie' ,'boite_de_nuit', 'salon_de_the', 'bar', 'restaurant'],
        default: 'restaurant',
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    website:{
        type: String,
        required: false
    },
    capacity:{
        type: Number,
        required: false
    },
    phone:{
        type: String,
        required: false
    },
    workingHours:{
        from: {type: String, required:false},
        to: {type: String, required:false},
    },
    facebook: {
        type: String,
        required: false
    },
    whatsapp: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    youtube: {
        type: String,
        required: false
    },
    valid:{
        type: Boolean,
        required: true,
        default: false
    },
    score: {
        type: Number,
        required: false
    },
   offers:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    cover:{
        type: String,
        required: true,
    },
    address:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    email:{
        type: String,
        required:true
    },
    district:{
        type: String,
        enum: ['d1', 'd2' ,'d3', 'd4', 'd5', 'd6'],
        required:true
    },
    images:[{
        type: String,
        required: false
    }]
});

// Create a model
const Business = mongoose.model('business', businessSchema);

// Export the model
module.exports = Business;