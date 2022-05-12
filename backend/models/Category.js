const mongoose = require("mongoose");

const categoryInfoSchema = new mongoose.Schema({
    Id:Number,
    Name:String
  
});

module.exports = mongoose.model("category", categoryInfoSchema);
