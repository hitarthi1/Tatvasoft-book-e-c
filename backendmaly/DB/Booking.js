const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    pname:String,
    dname:String,
    contact_no:Number,
    proof: String,
    proof_no: String,
    slot: String,
    adate:String,
});

module.exports = mongoose.model('booking', bookingSchema)