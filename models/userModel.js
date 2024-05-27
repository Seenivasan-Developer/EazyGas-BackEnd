const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
    name: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user", enum: ["admin", "user"] }
},
{timestamps:true}
);

const UserModel=mongoose.model("users",userSchema);

module.exports=UserModel;