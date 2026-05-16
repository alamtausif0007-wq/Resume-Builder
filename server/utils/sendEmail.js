const nodemailer = require("nodemailer");
require('dns').setDefaultResultOrder('ipv4first');

const sendEmail = async (options) => {
  // If email credentials are not set, just log to console for testing
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("====================================");
    console.log(`[TEST MODE] Email to: ${options.email}`);
    console.log(`[TEST MODE] Subject: ${options.subject}`);
    console.log(`[TEST MODE] Message: ${options.message}`);
    console.log("====================================");
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: `Resume Builder <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
