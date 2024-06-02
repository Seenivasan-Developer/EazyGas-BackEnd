const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        providerdetails: { type: Array[{providername:{type:String, required:true}}, {providerid:{type:String, required:true}}], require: true },
        BookingDate: { type: Date, require: true },
        address: { type: Array, require: true },
        selectedSlot: { type: String, require: true },
        selectedSlotType: { type: String, require: true },
        BPNo: { type: String, require: true },
        remarks: { type: String, require: true },
        userDetails: { type: Array[{username:{type:String, required:true}}, {userid:{type:String, required:true}}], require: true },
        gasAmount: { type: Number, require: true },
        paymentMode: { type: String, require: true },
        isDelivered: { type: Boolean, require: true }

    },
    { timestamps: true }
);

const BookingModel=mongoose.model("Booking",BookingSchema);

module.exports=BookingModel;
