const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db")
connectDB();
const app = express();

const errorHandle = require("./middleware/errorhandler")
const port  = process.env.PORT ||8000;

app.use(express.json());
app.use('/api/contacts',require("./routes/contactsRoutes"));
app.use('/api/users',require("./routes/userRoutes"));

app.use(errorHandle)



app.listen(port,()=>{
    
    console.log(`server is running on ${port}`)
    
})



