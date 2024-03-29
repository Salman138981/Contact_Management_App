
const asyncHandle = require('express-async-handler');
const User = require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
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
    const {email, password} = req.body;

    if(!email || !password){
        res.json(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id : user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '10m'
            }
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }


})

//private method only logged in user can see info
const currentUser = asyncHandle(async(req,res)=>{
    res.json(req.user);
})


module.exports= {registerUser, loginUser, currentUser};