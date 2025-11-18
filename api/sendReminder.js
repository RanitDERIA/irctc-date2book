import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const {
      email,
      name,
      bookingDate,
      journeyDate,
      daysUntil
    } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'IRCTC Date2Book <reminder@yourdomain.com>',
      to: email,
      subject: 'Your IRCTC Booking Reminder',
      text: `
Hello ${name},

Your IRCTC booking reminder is scheduled.

📅 Booking Date: ${bookingDate}
🛤 Journey Date: ${journeyDate}
⏳ Days Until Booking Opens: ${daysUntil}

We will notify you exactly 24 hours before booking opens.
Thanks for using IRCTC Date2Book 🚆
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
