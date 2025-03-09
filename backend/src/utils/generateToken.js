import jwt from 'jsonwebtoken';

/**
 * Generate JWT token for authentication
 * @param {string} id - User ID
 * @param {string} type - User type (user, retailer, deliveryPartner)
 * @returns {string} JWT token
 */
const generateToken = (id, type = 'user') => {
  return jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

export default generateToken; 