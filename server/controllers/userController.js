const User=require('../models/User')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const resume=require('../models/resume')
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
//prepare token
const generateToken = (id) => {
    return jwt.sign({userId:id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  };
// REGISTER
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        
        const newuser = new User({
            name,
            email,
            password: hashedpassword
        });

        await newuser.save();
        const token=generateToken(newuser._id);

        // Sending back user info (name & subscription) for your Redux store
        res.status(201).json({ 
            message: "User created successfully", 
            token, 
            user: { 
                name: newuser.name, 
                email: newuser.email, 
                isSubscribed: newuser.isSubscribed 
            } 
        });

    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No user found with this email" });
        }

        const validpassword = await bcrypt.compare(password, user.password);
        if (!validpassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }

const token=generateToken(user._id);
        // IMPORTANT: Sending isSubscribed so RTK can manage watermark visibility
        res.status(200).json({ 
            token, 
            user: { 
                name: user.name, 
                email: user.email, 
                isSubscribed: user.isSubscribed 
            } 
        });
        
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};
//get user by id
exports.getUserById=async(req,res)=>{
    try {
        const userId=req.userId;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};
//get all user resumes:  get:/api/users/resumes
exports.getAllResumes=async(req,res)=>{
    try {
        const userId=req.userId;
// Use this instead:
const resumes = await resume.find({ userId: userId });
        if(!resumes){
            return res.status(404).json({message:"Resumes not found"})
        }
        res.status(200).json({resumes});
    } catch (error) {
        res.status(400).json({message:error.message});
        console.log("Error while fetching resumes")
    }
}

// FORGOT PASSWORD (SEND OTP)
exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found with this email" });
        }

        // Generate a 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP and expiration time (10 mins)
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        // Send Email
        const message = `Your password reset OTP is ${otp}. It is valid for 10 minutes.\nIf you didn't request this, please ignore this email.`;
        await sendEmail({
            email: user.email,
            subject: "Password Reset OTP - Resume Builder",
            message
        });

        res.status(200).json({ message: "OTP sent successfully to your email" });
    } catch (error) {
        console.log("Error sending OTP:", error);
        res.status(500).json({ message: "Error sending OTP, please try again" });
    }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.resetPasswordOTP !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ message: "New password is same as current password" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        // Clear OTP fields
        user.resetPasswordOTP = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successfully! You can now login." });
    } catch (error) {
        console.log("Error resetting password:", error);
        res.status(500).json({ message: "Error resetting password, please try again" });
    }
};