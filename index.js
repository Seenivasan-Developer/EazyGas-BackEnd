const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv')
const userRoute = require("./routes/userRoute")
const providerRoute = require('./routes/providerRoute');
const BookingRoute = require("./routes/BookingRoute");
const PaymentRoute=require("./routes/PaymentRoute");
dotenv.config();

const app = express();

const PORT = process.env.PORT;

//Middleware Injection
app.use(express.json());
app.use(cors());
//app.use(auth);

app.get('/', (req, res) => {
  res.send('Welcome to EazyGas...');
});
//Route Injection
app.use('/users', userRoute);
app.use('/providers', providerRoute);
app.use('/booking',BookingRoute)
app.use('/payment',PaymentRoute)

//MongoDB Connection and Port Listening
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB is Connected!');
    app.listen(PORT, () => console.log(`Server Started`))
  }).catch((error) => {
    console.log('Error', error)
  })
