import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

const DeliveryPartner = sequelize.define('DeliveryPartner', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAadharVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vehicleType: {
    type: DataTypes.ENUM('bike', 'scooter', 'car', 'van'),
    allowNull: false
  },
  vehicleNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  drivingLicenseNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bankAccountNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ifscCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  currentLocation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  totalRatings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (partner) => {
      if (partner.password) {
        const salt = await bcrypt.genSalt(10);
        partner.password = await bcrypt.hash(partner.password, salt);
      }
    },
    beforeUpdate: async (partner) => {
      if (partner.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        partner.password = await bcrypt.hash(partner.password, salt);
      }
    }
  }
});

// Method to check if password matches
DeliveryPartner.prototype.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default DeliveryPartner; 