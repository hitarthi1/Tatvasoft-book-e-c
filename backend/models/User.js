const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    roleId: Number
     
      
//Admin-1
//Seller2
//Buyer3
  
  
});

module.exports = mongoose.model("User", UserInfoSchema);
