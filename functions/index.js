const functions = require('firebase-functions');
const twilio = require('twilio');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const fromNumber = functions.config().twilio.from;

const client = twilio(accountSid, authToken);

exports.sendSmsNotification = functions.https.onCall(async (data, context) => {
  const { phoneNumber, message } = data;

  if (!phoneNumber || !message) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'two arguments "phoneNumber" and "message" containing the phone number and message text.');
  }

  try {
    const messageResponse = await client.messages.create({
      body: message,
      from: fromNumber,
      to: phoneNumber.startsWith('+') ? phoneNumber : '+63' + phoneNumber.replace(/^0+/, ''),
    });
    return { success: true, sid: messageResponse.sid };
  } catch (error) {
    throw new functions.https.HttpsError('unknown', 'Failed to send SMS: ' + error.message);
  }
});
