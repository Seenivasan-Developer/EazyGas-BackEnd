const express = require("express");
const BookingModel = require("../models/BookingModel");
const auth = require("../middleware/auth");


const router = express.Router();

//add New Booking
router.post("/newBooking",auth, async (req, res) => {
    try {
        const newBooking = new BookingModel(req.body);
        await newBooking.save();//to create newBooking
        res.send("new Booking added Sucessfully");
    } catch (error) {
        res.status(400).json(error);
    }
})

//getAllBooking
router.get("/getAllBooking",auth, async (req, res) => {
    try {
        const Bookings = await BookingModel.find();
        res.send(Bookings);
    } catch (error) {
        res.status(400).json(error);
    }
})

//getBookingByUserID
router.get("/getBookingByUserID",auth, async (req, res) => {
    try {
        const {userid}=req.query;
        const Bookings = await BookingModel.find({'userDetails.userid':userid});
        res.send(Bookings);
    } catch (error) {
        res.status(400).json(error);
    }
})

//CancelBookingByID
router.post("/CancelBookingByID",auth, async (req, res) => {
    try {
        const {bookingid}=req.body;
        await BookingModel.findOneAndUpdate({_id:bookingid},{$set:{DeliveryStatus:'Cancelled'}});
        res.send({message:"Booking cancelled Sucessfully"});
    } catch (error) {
        res.status(400).json(error);
    }
})

//UpdateBookingByID
router.post("/UpdateBookingByID",auth, async (req, res) => {
    try {
        const {bookingid,formData}=req.body;
        await BookingModel.findOneAndUpdate({ _id: bookingid }, formData)
        res.send({message:"Booking Details updated successfully"})
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports=router