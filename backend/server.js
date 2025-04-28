const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const logger = require('./logs/logger');

// Import route
const myFoodRoutes = require('./routes/myFoodRoutes');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes'); 

const app = express();

// Connect to DB
connectDB()
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Handle cross-domain issues
app.use(express.json()); // Parse JSON data

// Define routes
app.use('/api/myfood', myFoodRoutes);
app.use('/api/user', userRoutes);
app.use('/api/food', foodRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unexpected error: ${err.message}`, err.stack); 
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
