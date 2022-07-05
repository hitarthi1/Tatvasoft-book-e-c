const mongoose = require('mongoose');

const doctorsSchema = new mongoose.Schema({
    name:String,
    address:String,
    area:String,
    city:String,
    contact_no:Number,
    specialization:String,
    experience:Number   ,
    degree:String,
    clinic_name:String,
    opening_time:Number,
    closing_time:Number,
    location:String,
    icu_aval:String,
    bed_aval:String,
});

module.exports = mongoose.model('doctors', doctorsSchema)