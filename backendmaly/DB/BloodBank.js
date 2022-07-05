const mongoose = require('mongoose');

const bloodbankSchema = new mongoose.Schema({
    name:String,
    address:String,
    area:String,
    city:String,
    contact_no:Number,
    location:String,
    AP:String,
    AN:String,
    BP:String,
    BN:String,
    ABP:String,
    ABN:String,
    OP:String,
    ON:String,
});

module.exports = mongoose.model('bloodbank', bloodbankSchema)