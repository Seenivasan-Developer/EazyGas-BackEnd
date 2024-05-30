const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { genHashPassword, getUserNameByMobileNo, createUser } = require('../models/helper');
const { auth } = require('../middleware/auth');

const router = express.Router();

//to Register a user
router.post("/register", async (req, res) => {
    try {
        const { name, mobileNo, password } = req.body;
        const isUserExist = await getUserNameByMobileNo(mobileNo);
        if (isUserExist) {
            res.status(400).send("Mobile No already regitered");
            return
        }
        const hashedPassword = await genHashPassword(password);
        const result = await createUser(name, mobileNo, hashedPassword);
        res.send(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
})

// User Login
router.post("/login", async (req, res) => {
    const { mobileNo, password } = req.body;
    const userFromDB = await getUserNameByMobileNo(mobileNo);
    if (!userFromDB) {
        res.status(400).send("Invalid Credentials");
        return
    }
    const storedPassword = userFromDB.password;
    //password verification
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    if (!isPasswordMatch) {
        res.status(400).send("Invalid Credentials");
        return
    }
    //generate token
    const token = jwt.sign({ id: userFromDB._id, userName: userFromDB.name, mobileNo: userFromDB.mobileNo, role: userFromDB.role }, process.env.SECRET_KEY);
    res.status(200).send({ message: "Login Successful", token });
})


module.exports = router