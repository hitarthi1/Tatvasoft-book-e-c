const mongoose = require("mongoose");

const BookInfoSchema = new mongoose.Schema({
    Id:Number,
    Name:String,
   Price:Number,
    Description:String,
    Base64Image:String,
    Category_id:Number
  
});

module.exports = mongoose.model("Books", BookInfoSchema);
