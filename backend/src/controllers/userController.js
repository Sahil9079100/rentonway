import { Op } from 'sequelize';
import { User, UserMembership, MembershipPlan, Order } from '../models/index.js';
import generateToken from '../utils/generateToken.js';
import { generateOTP, sendOTP, verifyOTP } from '../utils/otpUtils.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ 
      where: { 
        [Op.or]: [{ email }, { phone }] 
      } 
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    if (user) {
      // Generate OTP for phone verification
      const otp = generateOTP();
      
      // In a real app, store OTP in database or cache with expiry
      // For demo, we'll just log it
      console.log(`OTP for ${phone}: ${otp}`);
      
      // Send OTP via Twilio (commented out to avoid actual SMS)
      // const otpResult = await sendOTP(phone, otp);

      res.status(201).json({
        success: true,
        message: 'User registered successfully. Please verify your phone number.',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          // Don't send OTP in response in production
          otp: otp // Remove this in production
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid user data'
      });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Verify user phone with OTP
// @route   POST /api/users/verify-otp
// @access  Public
export const verifyUserOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    // In a real app, retrieve stored OTP from database or cache
    // For demo, we'll just check if OTP is '123456'
    const isValid = otp === '123456'; // Replace with actual verification

    if (isValid) {
      // Update user as verified
      const user = await User.findByPk(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      // Generate token
      const token = generateToken(user.id);
      
      res.status(200).json({
        success: true,
        message: 'Phone verified successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          token
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
      
      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          token: generateToken(user.id)
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (user) {
      res.status(200).json({
        success: true,
        data: user
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      user.state = req.body.state || user.state;
      user.pincode = req.body.pincode || user.pincode;
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        data: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
          city: updatedUser.city,
          state: updatedUser.state,
          pincode: updatedUser.pincode,
          token: generateToken(updatedUser.id)
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user membership details
// @route   GET /api/users/membership
// @access  Private
export const getUserMembership = async (req, res) => {
  try {
    const userMembership = await UserMembership.findOne({
      where: { 
        userId: req.user.id,
        isActive: true
      },
      include: [
        {
          model: MembershipPlan,
          attributes: ['id', 'name', 'description', 'price', 'features', 'discountPercentage']
        }
      ]
    });

    if (userMembership) {
      res.status(200).json({
        success: true,
        data: userMembership
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'No active membership found',
        data: null
      });
    }
  } catch (error) {
    console.error('Error getting user membership:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user orders
// @route   GET /api/users/orders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('Error getting user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};