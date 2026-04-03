const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');

// Setup Associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Product.belongsTo(User, { foreignKey: 'userId', constraints: false }); 
User.hasMany(Product, { foreignKey: 'userId', constraints: false });

module.exports = {
  sequelize,
  User,
  Product,
  Order
};
