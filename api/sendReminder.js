// Simple debug version first - test this in Postman
module.exports = async (req, res) => {
  console.log("=== API Called ===");
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  
  // Set JSON response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: "Only POST method allowed" 
    });
  }

  try {
    console.log("Body:", req.body);

    // Check if body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "No body received",
        debug: {
          contentType: req.headers['content-type'],
          bodyType: typeof req.body
        }
      });
    }

    const { email, name, bookingDate, journeyDate, daysUntil } = req.body;

    // Validate fields
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
        received: { email, name, bookingDate, journeyDate, daysUntil }
      });
    }

    // Check for Resend API key
    const hasApiKey = !!process.env.RESEND_API_KEY;
    console.log("Has API Key:", hasApiKey);

    if (!hasApiKey) {
      return res.status(500).json({
        success: false,
        message: "RESEND_API_KEY not found in environment variables",
        debug: {
          env: Object.keys(process.env).filter(k => k.includes('RESEND'))
        }
      });
    }

    // Try to import Resend
    let Resend;
    try {
      const resendModule = require("resend");
      Resend = resendModule.Resend;
      console.log("Resend imported successfully");
    } catch (importError) {
      console.error("Resend import error:", importError);
      return res.status(500).json({
        success: false,
        message: "Failed to import Resend library",
        error: importError.message,
        debug: "Make sure 'resend' is in package.json dependencies"
      });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log("Resend initialized");

    // Send email
    console.log("Attempting to send email to:", email);
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `🚆 IRCTC Booking Reminder - ${daysUntil} day${daysUntil !== 1 ? 's' : ''} to go!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: white; margin: 0;">🚆 IRCTC Booking Reminder</h1>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9; border-radius: 10px; margin-top: 20px;">
            <p>Hello <strong>${name}</strong>,</p>
            <p>Your IRCTC booking reminder has been set! ✅</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>📅 Booking Date:</strong> ${bookingDate}</p>
              <p><strong>🚂 Journey Date:</strong> ${journeyDate}</p>
              <p><strong>⏰ Days Until:</strong> ${daysUntil} day${daysUntil !== 1 ? 's' : ''}</p>
            </div>
            
            <p>Thanks for using IRCTC Date2Book! 🙏</p>
          </div>
        </div>
      `,
      text: `Hello ${name},\n\nBooking Date: ${bookingDate}\nJourney Date: ${journeyDate}\nDays Until: ${daysUntil}\n\nThanks!`
    });

    console.log("Email sent successfully:", result);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully!",
      result: result
    });

  } catch (error) {
    console.error("❌ Error:", error);
    
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      type: error.constructor.name
    });
  }
};