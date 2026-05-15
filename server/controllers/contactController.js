const sendEmail = require('../utils/sendEmail');

const sendContactEmail = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const emailOptions = {
      email: "alamtausif0007@gmail.com",
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      message: `You have received a new message from your Resume Builder contact form.
        
Name: ${firstName} ${lastName}
Email: ${email}
        
Message:
${message}`
    };

    await sendEmail(emailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
};

module.exports = {
  sendContactEmail
};
