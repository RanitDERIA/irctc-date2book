const { Resend } = require("resend");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    // Manually parse JSON body for Vercel
    let body = "";
    await new Promise((resolve) => {
      req.on("data", (chunk) => { body += chunk; });
      req.on("end", resolve);
    });

    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid JSON" });
    }

    const { email, name, bookingDate, journeyDate, daysUntil } = parsed;

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ success: false, message: "Missing RESEND_API_KEY" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "IRCTC Date2Book <reminder@yourdomain.com>",
      to: email,
      subject: "Your IRCTC Booking Reminder",
      text: `
Hello ${name},

Your IRCTC booking reminder is set.

Booking Date: ${bookingDate}
Journey Date: ${journeyDate}
Days Until Booking: ${daysUntil}

Thanks for using IRCTC Date2Book 🚆
      `,
    });

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Email sending failed",
      error: error.message,
    });
  }
};
