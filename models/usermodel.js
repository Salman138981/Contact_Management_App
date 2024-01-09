const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  
    username : {
        type : String,
        required : [true, "Plase add the user name"],
    },
    
    email :{
        type :String,
        required: [true, "Please add the Email address"],
        unique : [true, "Email address already Taken"],
    },

    password: {
        type: String,
        required : [true, "Please add the user password"],
    },

        
  
},{
    timestapms : true,
})

module.exports = mongoose.model("User",userSchema);