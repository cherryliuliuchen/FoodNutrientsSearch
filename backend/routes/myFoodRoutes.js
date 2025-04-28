const express = require('express');
const router = express.Router();
const myFoodController = require('../controllers/myFoodController');
const auth = require('../middleware/auth');

// Add to MyFoodList
router.post('/', auth, myFoodController.addToMyFood);

// Get MyFoodList
router.get('/', auth, myFoodController.getMyFoodList);

// Delete MyFood by fdcId
router.delete('/:fdcId', auth, myFoodController.deleteMyFood);

// Update MyFood
router.put('/:id', auth, myFoodController.updateMyFood);

module.exports = router;
