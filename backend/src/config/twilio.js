let client = null;
let sendSMS = async () => { console.warn('[Twilio] SMS disabled — missing credentials'); };

try {
  const twilio = require('twilio');
  require('dotenv').config();

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    sendSMS = async (to, body) => {
      return client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
      });
    };
    console.log('[Twilio] SMS configured successfully');
  } else {
    console.warn('[Twilio] SMS disabled — missing credentials');
  }
} catch (err) {
  console.warn('[Twilio] Init skipped:', err.message);
}

module.exports = { sendSMS };
