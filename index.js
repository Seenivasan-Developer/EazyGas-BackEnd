const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require('dotenv')
const userRoute = require("./routes/userRoute")
const providerRoute = require('./routes/providerRoute');
const BookingRoute = require("./routes/BookingRoute");
dotenv.config();

const app = express();

const PORT = process.env.PORT;

//Middleware Injection
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to EazyGas...');
});
//Route Injection
app.use('/users', userRoute);
app.use('/providers', providerRoute);
app.use('/booking',BookingRoute)

//MongoDB Connection and Port Listening
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB is Connected!');
    app.listen(PORT, () => console.log(`Server Started`))
  }).catch((error) => {
    console.log('Error', error)
  })
