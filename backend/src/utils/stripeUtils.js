import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Create a payment intent with Stripe
 * @param {number} amount - Amount in smallest currency unit (e.g., cents for USD)
 * @param {string} currency - Currency code (e.g., 'inr', 'usd')
 * @param {string} description - Payment description
 * @param {object} metadata - Additional metadata
 * @returns {Promise} Stripe payment intent
 */
const createPaymentIntent = async (amount, currency = 'inr', description, metadata = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      metadata
    });
    
    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Confirm a payment intent
 * @param {string} paymentIntentId - Stripe payment intent ID
 * @returns {Promise} Confirmed payment intent
 */
const confirmPaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    return {
      success: true,
      status: paymentIntent.status,
      paymentIntent
    };
  } catch (error) {
    console.error('Error confirming payment intent:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Create a refund
 * @param {string} paymentIntentId - Stripe payment intent ID
 * @param {number} amount - Amount to refund (optional, defaults to full amount)
 * @returns {Promise} Refund result
 */
const createRefund = async (paymentIntentId, amount = null) => {
  try {
    const refundParams = {
      payment_intent: paymentIntentId
    };
    
    if (amount) {
      refundParams.amount = amount;
    }
    
    const refund = await stripe.refunds.create(refundParams);
    
    return {
      success: true,
      refundId: refund.id,
      status: refund.status
    };
  } catch (error) {
    console.error('Error creating refund:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

export {
  createPaymentIntent,
  confirmPaymentIntent,
  createRefund
}; 