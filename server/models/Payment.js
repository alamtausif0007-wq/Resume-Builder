const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", // Points to your User collection
        required: true,
        index: true // Highly recommended for fast lookups
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    status: { type: String, default: "paid" },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);