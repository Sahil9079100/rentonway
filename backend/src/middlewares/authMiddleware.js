import jwt from 'jsonwebtoken';
import { User, Retailer, DeliveryPartner } from '../models/index.js';

// Protect routes - User authentication
export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check user type and set user in request
    if (decoded.type === 'user') {
      req.user = await User.findByPk(decoded.id);
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }
    } else if (decoded.type === 'retailer') {
      req.user = await Retailer.findByPk(decoded.id);
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Retailer not found'
        });
      }
      req.userType = 'retailer';
    } else if (decoded.type === 'deliveryPartner') {
      req.user = await DeliveryPartner.findByPk(decoded.id);
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Delivery partner not found'
        });
      }
      req.userType = 'deliveryPartner';
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Admin only middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Not authorized as an admin'
    });
  }
};

// Retailer only middleware
export const retailer = (req, res, next) => {
  if (req.userType === 'retailer') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Not authorized as a retailer'
    });
  }
};

// Delivery partner only middleware
export const deliveryPartner = (req, res, next) => {
  if (req.userType === 'deliveryPartner') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Not authorized as a delivery partner'
    });
  }
};