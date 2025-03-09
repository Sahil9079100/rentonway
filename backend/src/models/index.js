import User from './User.js';
import Retailer from './Retailer.js';
import DeliveryPartner from './DeliveryPartner.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import MembershipPlan from './MembershipPlan.js';
import UserMembership from './UserMembership.js';
import Review from './Review.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';

// User relationships
User.hasMany(Order, { foreignKey: 'userId' });
User.hasOne(Cart, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });
User.hasMany(UserMembership, { foreignKey: 'userId' });

// Retailer relationships
Retailer.hasMany(Product, { foreignKey: 'retailerId' });
Retailer.hasMany(OrderItem, { foreignKey: 'retailerId' });

// DeliveryPartner relationships
DeliveryPartner.hasMany(Order, { foreignKey: 'deliveryPartnerId' });

// Product relationships
Product.belongsTo(Retailer, { foreignKey: 'retailerId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });
Product.hasMany(CartItem, { foreignKey: 'productId' });
Product.hasMany(Review, { foreignKey: 'productId' });

// Order relationships
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(DeliveryPartner, { foreignKey: 'deliveryPartnerId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
Order.hasMany(Review, { foreignKey: 'orderId' });

// OrderItem relationships
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
OrderItem.belongsTo(Retailer, { foreignKey: 'retailerId' });

// MembershipPlan relationships
MembershipPlan.hasMany(UserMembership, { foreignKey: 'membershipPlanId' });

// UserMembership relationships
UserMembership.belongsTo(User, { foreignKey: 'userId' });
UserMembership.belongsTo(MembershipPlan, { foreignKey: 'membershipPlanId' });

// Review relationships
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Product, { foreignKey: 'productId' });
Review.belongsTo(Order, { foreignKey: 'orderId' });

// Cart relationships
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.hasMany(CartItem, { foreignKey: 'cartId' });

// CartItem relationships
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

export {
  User,
  Retailer,
  DeliveryPartner,
  Product,
  Order,
  OrderItem,
  MembershipPlan,
  UserMembership,
  Review,
  Cart,
  CartItem
}; 