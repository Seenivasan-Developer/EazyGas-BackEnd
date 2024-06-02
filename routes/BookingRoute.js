const express = require("express");
const BookingModel = require("../models/BookingModel");


const router = express.Router();

//add New Booking
router.post("/newBooking", async (req, res) => {
    try {
        const newBooking = new BookingModel(req.body);
        await newBooking.save();//to create newBooking
        res.send("new Booking added Sucessfully");
    } catch (error) {
        res.status(400).json(error);
    }
})

//getAllBooking
router.get("/getAllBooking", async (req, res) => {
    try {
        const Bookings = await BookingModel.find();
        res.send(Bookings);
    } catch (error) {
        res.status(400).json(error);
    }
})

//getBookingByUserID
router.get("/getBookingByUserID", async (req, res) => {
    try {
        const {userid}=req.query;
        const Bookings = await BookingModel.find({'userDetails.userid':userid});
        res.send(Bookings);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports=router