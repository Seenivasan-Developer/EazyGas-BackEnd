const express = require("express");
const mongoose =require("mongoose")
const cors= require("cors")
const dotenv=require('dotenv')
const userRoute=require("./routes/userRoute")
dotenv.config();

const app=express();

const PORT="4000";

//Middleware Injection
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
res.send('Welcome to EazyGas...');
});
//Route Injection
app.use('/users', userRoute);

//MongoDB Connection and Port Listening
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB is Connected!');
    app.listen(PORT, ()=> console.log(`Server Started on Port ${PORT}`))
}).catch((error)=>{
    console.log('Error',error)
})
