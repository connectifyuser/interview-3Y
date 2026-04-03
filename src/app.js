const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');
const { swaggerUi, specs } = require('./swagger');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // Must be before routes

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start server and sync DB
const PORT = process.env.PORT || 3000; 

sequelize.sync({ alter: true }).then(() => {
  console.log('Database connected and synced');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
  });
}); 
