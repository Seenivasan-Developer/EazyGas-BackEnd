const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const UserModel=require("./userModel");
const providerModel = require('./providerModel');

async function genHashPassword(password){
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);
return hashedPassword;
}

async function getUserNameByMobileNo(mobileNo){
return await UserModel.findOne({mobileNo});
}

async function createUser(name,mobileNo,password){
    const newUser= new UserModel({name,mobileNo,password});
return await newUser.save();
}


async function getProviderByProviderName(providername){
    return await providerModel.findOne({providername});
    }
    

module.exports={getUserNameByMobileNo, genHashPassword, createUser, getProviderByProviderName}