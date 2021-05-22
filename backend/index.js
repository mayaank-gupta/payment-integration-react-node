require('dotenv').config()
const app = require("express")();
const Razorpay = require("razorpay");
const cors = require("cors");

//Just for tetsing purpose. Do not use it on Prod Server
app.use(cors());

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAYKEY,
  key_secret: process.env.RAZORPAYSECRET
})

app.post('/razorpay', async (req, res) => {

  const paymentcapture = 1;
  const amount = 500;
  const currency = "INR";

  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: "AHVXXU3654",
    payment_capture: paymentcapture
  }

  try {
    const rezRes = await razorpay.orders.create(options);
    return res.json({
      id: rezRes.id,
      amount: rezRes.amount,
      currency: rezRes.currency,
      receipt_id: rezRes.receipt
    })

  } catch (err) {
    console.log(err);

  }

})


app.listen(3005, () => {
  console.log("Listening on 3005");
})