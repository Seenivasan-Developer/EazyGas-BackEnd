const mongoose =require('mongoose');

const providerSchema = mongoose.Schema(
    {
providername:{type:String, required:true},
providericon:{type:String, required:true},
availableTimeSlots:{type:Array, required:true},
PreferredTimeSlots:{type:Array, required:true},
ExtraCharges:{type:Number,required:true},
gasAmount:{type:Number,required:true}
    },
    {timestamps:true}
)

const providerModel=mongoose.model("providers",providerSchema);

module.exports=providerModel;