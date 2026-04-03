require('dotenv').config();
const { sequelize } = require('./src/models');

sequelize.sync({ force: true }).then(() => {
  console.log('Database dropped and recreated successfully!');
  process.exit(0);
}).catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
