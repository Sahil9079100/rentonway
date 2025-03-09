import twilio from 'twilio';

// Initialize Twilio client only if credentials are available
const client = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via Twilio SMS
 * @param {string} phone - Phone number with country code
 * @param {string} otp - OTP to send
 * @returns {Promise} Twilio response
 */
const sendOTP = async (phone, otp) => {
  try {
    // Check if Twilio client is initialized
    if (!client) {
      console.log('Twilio client not initialized. Would have sent OTP:', otp, 'to phone:', phone);
      return {
        success: true,
        message: 'OTP logged (Twilio not configured)',
        sid: 'DEMO_MODE'
      };
    }
    
    const message = await client.messages.create({
      body: `Your RentOn verification code is: ${otp}. Valid for 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    
    return {
      success: true,
      message: 'OTP sent successfully',
      sid: message.sid
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Verify OTP (in a real app, this would check against a stored OTP)
 * @param {string} userOTP - OTP entered by user
 * @param {string} storedOTP - OTP stored in database/cache
 * @returns {boolean} Whether OTP is valid
 */
const verifyOTP = (userOTP, storedOTP) => {
  return userOTP === storedOTP;
};

export {
  generateOTP,
  sendOTP,
  verifyOTP
}; 