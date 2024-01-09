
const asyncHandle = require('express-async-handler');
const jwt = require("jsonwebtoken");

const validateToken = (async (req,res,next)=>{
    try {
        let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader){
        token = authHeader.split(" ")[1];
        //console.log(token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
            //console.log(err);
            if(err){
               return res.status(401).json({
                    isError:true,
                    message:"Unuhorised"
                });
                
            }
            //console.log(decoded)
            req.user = decoded.user;
            next();
        });

        if(!token){
           return res.status(400).json({
                isError:true,
                message:"Token required"
            });
        }
    }
        
    } catch (error) {
        res.status(500).json({
            isError:true,
            message:error.message
        });
    }
    
})

module.exports= validateToken;