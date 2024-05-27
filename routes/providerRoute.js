const express =require("express");
const providerModel = require("../models/providerModel");
const { getProviderByProviderName } = require("../models/helper");


const router=express.Router();

//add Provider
router.post("/addProvider",async (req, res)=>{
    try {
        const providername=req.body.providername;
        const isProviderExists=await getProviderByProviderName(providername);
        if(isProviderExists){
            res.status(400).send("Provider Already Exists");
            return
        }
        const newProvider=new providerModel(req.body);
        await newProvider.save();//to create new provider
        res.send("Provider added Successfully")
    } catch (error) {
        res.status(400).json(error);
    }
})

//get all providers
router.get("/getAllProviders",async (req,res)=>{
    try{
    const providers=await providerModel.find();
    res.send(providers);
    }catch (error) {
        res.status(400).json(error);
    }
})

module.exports=router