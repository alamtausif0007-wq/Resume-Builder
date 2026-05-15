const express = require("express");
const router = express.Router();
const protect=require('../middlewares/authMiddleware')
const paymentController = require("../controllers/PaymentController");

router.post("/create-order",protect, paymentController.createOrder);
router.post("/verify",protect, paymentController.verifyPayment);

module.exports = router;