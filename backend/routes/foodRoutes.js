// routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController'); 
const nutrientsController = require('../controllers/nutrientsController');

// Using a controller to handle search requests
router.get('/search', foodController.searchFood);

// Get detailed information about a specific food
router.get('/:fdcId', nutrientsController.getFoodDetail);

module.exports = router;
