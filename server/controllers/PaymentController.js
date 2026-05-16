const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const User = require("../models/User");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId=req.userId

    if (!amount || !userId) {
      return res.status(400).json({ success: false, message: "amount and userId required" });
    }

    const user = await User.findById(userId);
    if (user?.isSubscribed) {
      return res.status(403).json({ success: false, message: "You already have an active subscription." });
    }

    // ✅ short receipt (avoid Razorpay length error)
    const shortuser = String(userId).slice(-8);
    const shortTime = String(Date.now()).slice(-6);
    const receipt = `user_${shortuser}_${shortTime}`;

    const order = await razorpay.orders.create({
      amount: Number(amount)*100,
      currency: "INR",
      receipt,
    });

    return res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err?.error?.description || err?.message || "Order create failed",
    });
  }
};

// ✅ VERIFY PAYMENT
const verifyPayment = async (req, res) => {
  try {
    const userId=req.userId
    const {
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !userId ||
      !amount ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({ success: false, message: "Missing payment fields" });
    }

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`) // ✅ no spaces
      .digest("hex");

    if (sign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const payment = await Payment.create({
      userId,
      amount,
      currency: "INR",
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: "paid",
    });

    await User.findByIdAndUpdate(userId, { isSubscribed: true });

    return res.status(200).json({
      success: true,
      message: "Payment verified",
      payment,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err?.message || "Not verified" });
  }
};

module.exports = { createOrder, verifyPayment };