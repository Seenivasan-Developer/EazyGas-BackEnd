const router = require('express').Router();
const Razorpay=require('razorpay');
const crypto=require('crypto');
const { error } = require('console');

//create order
router.post('/order', async(req,res)=>{
try {
    var instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
    });
    var options = {
        amount: req.body.amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };
      instance.orders.create(options, function(error, order) {
        if(error){
            console.log(error);
            return res.status(500).json({message: "Something Went Wrong!"});
        }
        res.status(200).json({data:order});
      });

} catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal Server Error"});
}
});

//payment verify
router.post("/verify", async(req,res)=>{
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        }=req.body;
        const sign=razorpay_order_id+"|"+razorpay_payment_id;
        generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);

        const expectedSign = crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        return res.status(200).json({ message: "Payment verified successfully" });
    } else {
        return res.status(400).json({ message: "Invalid signature sent!" });
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports=router;