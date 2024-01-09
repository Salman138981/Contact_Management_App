
const asyncHandle = require('express-async-handler');
const User = require('../models/usermodel')
const bcrypt = require('bcrypt');
const registerUser = asyncHandle(async(req,res)=>{
    
    const { username ,email, password} = req.body;
    if(!username || !email || !password) {
       res.status(400);
       throw new Error("All the fields are mandatory!");
    }

    const availableUser = await User.findOne({email})
    if(availableUser){
        res.status(400);
        throw new Error("User already Registered!");
    }

    //Hash password
    const hashedPassword  = await bcrypt.hash(password, 10);
    console.log("Hashed Password : ", hashedPassword);

    const user  = await User.create({
        username,
        email,
        password : hashedPassword
    })

    if(user){
        res.status(201).json({_id: user.id, email: user.email});

    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
 
})


const loginUser =  asyncHandle(async(req,res)=>{
    res.json({message: "loginUser"});
})

//private method only logged in user can see info
const currentUser = asyncHandle(async(req,res)=>{
    res.json({message: "current User"})
})


module.exports= {registerUser, loginUser, currentUser};