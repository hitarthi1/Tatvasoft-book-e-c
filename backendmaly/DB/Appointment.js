const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    pname:String,
    dname:String,
    contact_no: String,
    proof: String,
    proofNo: String,
    slot: String,
    adate: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema)