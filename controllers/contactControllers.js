
const asyncHandle = require("express-async-handler")
const contacts = require("../models/contactmodel")

const getContacts = asyncHandle(async (req,res)=>{
    const contact = await contacts.find({user_id: req.user.id});
    res.status(200).json(contact);
})

const createContact = (async(req,res)=>{
    try{
        console.log(req.body)
    const{ name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("all fields are required")
    }
    console.log(req.user);

    const contact  = await contacts.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
   
    res.status(201).json(contact);

    }catch(err){
         res.status(500).json({message:err.message})
    }
    
})


const getContact = asyncHandle(async(req,res)=>{

    const contact = await contacts.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
});


const updateContact = asyncHandle(async (req,res)=>{
    const contact = await contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
        console.log(contact);
        console.log("entered");
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact)
})

const deleteContact = asyncHandle(async(req,res)=>{
    const contact  = await contacts.findByIdAndDelete(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Invalid Id");
    }
    
    res.status(200).json(contact);
})

module.exports= {getContacts, createContact, getContact, updateContact, deleteContact};