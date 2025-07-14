const functions = require('firebase-functions');
const plivo = require('plivo');

const authId = functions.config().plivo.auth_id;
const authToken = functions.config().plivo.auth_token;
const srcNumber = functions.config().plivo.src_number;

const client = new plivo.Client(authId, authToken);

exports.sendSmsNotification = functions.https.onCall(async (data, context) => {
  const { phoneNumber, message } = data;

  if (!phoneNumber || !message) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
      'two arguments "phoneNumber" and "message" containing the phone number and message text.');
  }

  try {
    const response = await client.messages.create(
      srcNumber,
      phoneNumber.startsWith('+') ? phoneNumber : '+63' + phoneNumber.replace(/^0+/, ''),
      message
    );
    return { success: true, messageUuid: response.messageUuid };
  } catch (error) {
    throw new functions.https.HttpsError('unknown', 'Failed to send SMS: ' + error.message);
  }
});
