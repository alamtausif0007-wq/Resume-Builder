const sendEmail = async (options) => {
  // If API key is not set, just log to console for testing
  if (!process.env.BREVO_API_KEY) {
    console.log("====================================");
    console.log(`[TEST MODE] Email to: ${options.email}`);
    console.log(`[TEST MODE] Subject: ${options.subject}`);
    console.log(`[TEST MODE] Message: ${options.message}`);
    console.log("====================================");
    return;
  }

  // Define email payload for Brevo HTTP API
  const payload = {
    sender: {
      name: "Resume Builder",
      email: process.env.EMAIL_USER // Make sure this is a verified sender in Brevo
    },
    to: [
      {
        email: options.email
      }
    ],
    subject: options.subject,
    textContent: options.message,
  };

  try {
    // Call Brevo's HTTP API (bypasses Render's SMTP block)
    // We use Node's native fetch which is available in Node 18+
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Brevo API Error:", errorData);
      throw new Error(`Failed to send email: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

module.exports = sendEmail;
