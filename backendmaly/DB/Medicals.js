const mongoose = require('mongoose');

const medicalSchema = new mongoose.Schema({
    name:String,
    address:String,
    area:String,
    city:String,
    contact_no:Number,
    location:String,
});

module.exports = mongoose.model('medicals', medicalSchema)